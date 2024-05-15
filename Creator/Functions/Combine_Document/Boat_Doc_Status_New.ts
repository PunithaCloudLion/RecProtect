void Combine_Document.Boat_Doc_Status_New(int recID)
{
	/*
	Last Modified By : Vignesh
	Date : 21/03/2024
	*/
	try 
	{
		thisapp.Developer.addActivityLog("Combined Doc Status Check- Boat_Policy(Combine_Document.Boat_Doc_Status_New) --- " + recID,"Function Call Start","ID","null");
		getBoatQuoteInfo = BoatQuote[ID == input.recID];
		if(getBoatQuoteInfo.count() > 0)
		{
			Contact_Workdrive_FolderID = getBoatQuoteInfo.NB_Workdrive_Folder_Link;
			responseData = getBoatQuoteInfo.Combined_Doc_Response.toMap();
			if(responseData.isEmpty() == false)
			{
				if(responseData.get("status") == "inprogress")
				{
					urlVal = responseData.get("status_check_url");
					statuscheckResponse = invokeurl
					[
						url :urlVal
						type :GET
						connection:"cl_writer"
					];
					thisapp.Developer.addActivityLog("Combined Doc Status Check- Boat_Policy(Combine_Document.Boat_Doc_Status_New) --- " + recID,"Status check API call response","",statuscheckResponse);
					if(statuscheckResponse != null && statuscheckResponse.get("status") == "completed")
					{
						combine_docName = getBoatQuoteInfo.Policy_Number + " - Policy Declaration";
						if(getBoatQuoteInfo.Policy_Number != "" && getBoatQuoteInfo.Policy_Number != null)
						{
							Policy_Number = getBoatQuoteInfo.Policy_Number;
						}
						if(Contact_Workdrive_FolderID != "" && Contact_Workdrive_FolderID != null)
						{
							Contact_Workdrive_FolderID = Contact_Workdrive_FolderID.getsuffix("folder/");
						}
						if(getBoatQuoteInfo.Combined_Doc_Response != "" && getBoatQuoteInfo.Combined_Doc_Response != null)
						{
							Combined_Doc_Response = getBoatQuoteInfo.Combined_Doc_Response;
						}
						parmp = {"Policy_Number":Policy_Number,"Combined_Doc_Response":Combined_Doc_Response,"Contact_Policy_Folder_Workdrive_Folder_ID":Contact_Workdrive_FolderID,"combine_docName":combine_docName};
						Combined_Attachment_response = invokeurl
						[
							url :"https://www.zohoapis.com/crm/v2/functions/Test_Combiined/actions/execute?auth_type=apikey&zapikey=1003.e22f3273bb04b81989500e60afe3e5d6.99dc1d6bafbf8dd22c72d8420f043dc3"
							type :GET
							parameters:parmp
							connection:"zcrm"
						];
						thisapp.Developer.addActivityLog("Combined Doc Status Check- Boat_Policy(Combine_Document.Boat_Doc_Status_New) --- " + recID,"Combined Doc Upload in Workdrive - API Call Response",parmp.toString(),Combined_Attachment_response);
						if(Combined_Attachment_response != "")
						{
							returnData = Combined_Attachment_response.get("details").get("output").toMap();
							premaLink = returnData.get("permalink");
							downloadlink = returnData.get("downloadlink");
							getBoatQuoteInfo.Combined_Doc_Download_URL=premaLink;
							getBoatQuoteInfo.Combined_Doc_Status_Check_On=null;
							resource_id = premaLink.getsuffix("file/");
							upload_map = Map();
							upload_map.put("resource_ID",resource_id);
							upload_map.put("recID",getBoatQuoteInfo.Zoho_Crm_ID);
							get_fileuploadresponse = invokeurl
							[
								url :"https://www.zohoapis.com/crm/v2/functions/Quote_Attachment_Upload/actions/execute?auth_type=apikey&zapikey=1003.e22f3273bb04b81989500e60afe3e5d6.99dc1d6bafbf8dd22c72d8420f043dc3"
								type :GET
								parameters:upload_map
								connection:"zcrm"
							];
							thisapp.Developer.addActivityLog("Combined Doc Status Check- Boat_Policy(Combine_Document.Boat_Doc_Status_New) --- " + recID,"Upload Combined Doc in ZFS - API Call Response",upload_map.toString(),get_fileuploadresponse);
							uploadresp_ZFS = get_fileuploadresponse.get("details").get("output").toMap();
							attach_id = uploadresp_ZFS.get("data").getJSON("details").get("id");
							if(attach_id != null && attach_id != "")
							{
								emailList = List();
								combine_docName = getBoatQuoteInfo.Policy_Number + " - Policy Declaration";
								// ----- Add document information in the subform ----
								// ** Combined Document Information **
								rowInsertDoc = BoatQuote.Boat_Document_Information();
								rowInsertDoc.Document_Name=combine_docName;
								rowInsertDoc.Document_Type=Document_Type_List[Document_Type == "Combined Document"].ID;
								rowInsertDoc.Workdrive_URL=premaLink;
								rowInsertDoc.Download_URL=downloadlink;
								rowInsertDoc.Created_Time=zoho.currenttime;
								getBoatQuoteInfo.Boat_Document_Information.insert(rowInsertDoc);
								emailList.add(attach_id);
								// ** Recepit Template & Application Page Information -- Start **
								OtherDocList = {"Receipt Document","Application Document"};
								for each  rec in OtherDocList
								{
									receipturl = Record_Template_Configuration[Name == "Boat - Receipt Template"].URL.replaceAll("CREATORRECID",getBoatQuoteInfo.ID.toString());
									reciptorTempName = getBoatQuoteInfo.Policy_Number + " - " + rec;
									if(rec == "Application Document")
									{
										receipturl = Record_Template_Configuration[Name == "Boat - Application Download"].URL.replaceAll("CREATORRECID",getBoatQuoteInfo.ID.toString());
									}
									tempOrpageObj = invokeurl
									[
										url :receipturl
										type :GET
									];
									uploadResponse = zoho.workdrive.uploadFile(tempOrpageObj,Contact_Workdrive_FolderID,reciptorTempName + ".pdf",true,"cl_workdrive");
									thisapp.Developer.addActivityLog("Combined Doc Status Check- Trailer_Policy(Combine_Document.Trailer_Doc_Status_New) --- " + recID,"Upload Other File in Workdrive API Call Response -- " + rec,"",uploadResponse.toString());
									if(uploadResponse != null)
									{
										if(uploadResponse.get("data") != null)
										{
											permalinkReceiptTemp = uploadResponse.get("data").get(0).get("attributes").get("Permalink");
											downloadURL = uploadResponse.get("data").get(0).get("attributes").get("download_url");
											rowInsertDoc = BoatQuote.Boat_Document_Information();
											rowInsertDoc.Document_Name=reciptorTempName;
											rowInsertDoc.Document_Type=Document_Type_List[Document_Type == rec].ID;
											rowInsertDoc.Workdrive_URL=permalinkReceiptTemp;
											rowInsertDoc.Download_URL=downloadlink;
											rowInsertDoc.Created_Time=zoho.currenttime;
											getBoatQuoteInfo.Boat_Document_Information.insert(rowInsertDoc);
											resource_id_tempReceipt = permalinkReceiptTemp.getsuffix("file/");
											upload_map_RT = Map();
											upload_map_RT.put("resource_ID",resource_id_tempReceipt);
											upload_map_RT.put("recID",getBoatQuoteInfo.Zoho_Crm_ID);
											get_tempReceiptResponse = invokeurl
											[
												url :"https://www.zohoapis.com/crm/v2/functions/Quote_Attachment_Upload/actions/execute?auth_type=apikey&zapikey=1003.e22f3273bb04b81989500e60afe3e5d6.99dc1d6bafbf8dd22c72d8420f043dc3"
												type :GET
												parameters:upload_map_RT
												connection:"zcrm"
											];
											thisapp.Developer.addActivityLog("Combined Doc Status Check- Boat_Policy(Combine_Document.Boat_Doc_Status_New) --- " + recID,"Upload Other File in Workdrive in ZFS -- " + rec,upload_map_RT.toString(),get_tempReceiptResponse.toString());
											uploadresp_ZFS_RT = get_tempReceiptResponse.get("details").get("output").toMap();
											attach_id_RT = uploadresp_ZFS_RT.get("data").get(0).get("details").get("id");
											// 											attach_id_RT = get_tempReceiptResponse.get("data").getJSON("details").get("id");
											if(attach_id_RT != null && attach_id_RT != "")
											{
												emailList.add(attach_id_RT);
											}
										}
									}
								}
								// ** Recepit Template & Application Page Information -- End **
								getBoatQuoteInfo.Email_List=emailList;
								// --------- Send Email Configuration ---------
								thisapp.Combine_Document.Send_Email_Through_CRM_API(recID,"Boat");
							}
						}
						else
						{
							getBoatQuoteInfo.Combined_Doc_Status_Check_On=zoho.currenttime.addSeconds(45);
						}
					}
					else
					{
						thisapp.Developer.addActivityLog("Combined Doc Status Check- Boat_Policy(Combine_Document.Boat_Doc_Status_New) --- " + recID,"Reset the schedule trigger time due to still in inprogress","ID","null");
						getBoatQuoteInfo.Combined_Doc_Status_Check_On=zoho.currenttime.addSeconds(45);
					}
				}
			}
		}
		thisapp.Developer.addActivityLog("Combined Doc Status Check- Boat_Policy(Combine_Document.Boat_Doc_Status_New) --- " + recID,"Function Call End","ID","null");
	}
	catch (e)
	{
		thisapp.Developer.addDeveloperLog("Combined Doc Status Check- Boat_Policy(Combine_Document.Boat_Doc_Status_New) -- " + recID.tostring(),"Trailer_Doc_Status:" + recID.tostring(),"Document Status Check - Cobined Document",recID.tostring(),e,"creator");
	}
}