void GenerateDocManual.Generate_Doc_Button_Trailer(int recID)
{
	/*
	Last Modified By : Arun
	Date : 03/04/2024
	*/
	try 
	{
		thisapp.Developer.addActivityLog("Generate Doc Button - Trailer_Policy(GenerateDocManual.Generate_Doc_Button_Trailer) --- " + recID,"Function Call Start","ID","null");
		getTrailerQuoteInfo = TrailerQuote[ID == input.recID];
		if(getTrailerQuoteInfo.count() > 0)
		{
			getTrailerQuoteInfo.Email_List=null;
			//workdriveFolderID = getTrailerQuoteInfo.Contact_Policy_Folder_Workdrive_Folder_ID;
			workdriveFolderID = getTrailerQuoteInfo.NB_Workdrive_Folder_Link;
			combine_docName = getTrailerQuoteInfo.Policy_Number + " - Policy Declaration";
			if(getTrailerQuoteInfo.Policy_Number != "" && getTrailerQuoteInfo.Policy_Number != null)
			{
				Policy_Number = getTrailerQuoteInfo.Policy_Number;
			}
			if(workdriveFolderID != "" && workdriveFolderID != null)
			{
				Contact_Workdrive_FolderID = workdriveFolderID.getsuffix("folder/");
			}
			if(getTrailerQuoteInfo.Combined_Doc_Response != "" && getTrailerQuoteInfo.Combined_Doc_Response != null)
			{
				Combined_Doc_Response = getTrailerQuoteInfo.Combined_Doc_Response;
			}
			emailList = List();
			if(getTrailerQuoteInfo.Trailer_Document_Information != null)
			{
				for each  documentInfo in getTrailerQuoteInfo.Trailer_Document_Information
				{
					if(documentInfo.Document_Type.Document_Type == "Combined Document")
					{
						getTrailerQuoteInfo.Combined_Document_Process="Manualy Regenerated";
						thisapp.Combine_Document.Trailer_Policy(input.recID);
					}
					// 				else
					// 				{
					// 					if(documentInfo.Document_Type.Document_Type == "Receipt Document")
					// 					{
					// 						receipturl = Record_Template_Configuration[Name == "Trailer - Receipt Template"].URL.replaceAll("CREATORRECID",getTrailerQuoteInfo.ID.toString());
					// 						reciptorTempName = "Receipt Document";
					// 					}
					// 					else if(documentInfo.Document_Type.Document_Type == "Application Document")
					// 					{
					// 						receipturl = Record_Template_Configuration[Name == "Trailer - Application Download"].URL.replaceAll("CREATORRECID",getTrailerQuoteInfo.ID.toString());
					// 						reciptorTempName = "Application Document";
					// 					}
					// 					tempOrpageObj = invokeurl
					// 					[
					// 						url :receipturl
					// 						type :GET
					// 					];
					// 					//	info tempOrpageObj;
					// 					uploadResponse = zoho.workdrive.uploadFile(tempOrpageObj,Contact_Workdrive_FolderID,reciptorTempName + ".pdf",true,"cl_workdrive");
					// 					if(uploadResponse != null)
					// 						{
					// 							if(uploadResponse.get("data") != null)
					// 							{
					// 								resource_id = documentInfo.Workdrive_URL.getsuffix("file/");
					// 								upload_map = Map();
					// 								upload_map.put("resource_ID",resource_id);
					// 								upload_map.put("recID",getTrailerQuoteInfo.Zoho_Crm_ID);
					// 								get_fileuploadresponse = invokeurl
					// 								[
					// 									url :"https://www.zohoapis.com/crm/v2/functions/Quote_Attachment_Upload/actions/execute?auth_type=apikey&zapikey=1003.e22f3273bb04b81989500e60afe3e5d6.99dc1d6bafbf8dd22c72d8420f043dc3"
					// 									type :GET
					// 									parameters:upload_map
					// 									connection:"zcrm"
					// 								];
					// 								if(get_fileuploadresponse.get("code") == "success")
					// 								{
					// 									books_attachment_data = get_fileuploadresponse.get("details").get("output").toMap();
					// 									books_attach_id = books_attachment_data.get("data").getJSON("details").get("id");
					// 									emtpylist = List();
					// 									emtpylist = getTrailerQuoteInfo.Email_List.tolist();
					// 									emtpylist.add(books_attach_id);
					// 									getTrailerQuoteInfo.Email_List =emtpylist;
					// 								}
					// 							}
					// 						}
					// 					thisapp.Developer.addActivityLog("Generate Doc Button - Trailer_Policy(GenerateDocManual.Generate_Doc_Button_Trailer) ---" + recID,"Upload Other File in Workdrive API Call Response -- " + reciptorTempName,"",uploadResponse.toString());
					// 				}
				}
			}
			else
			{
				thisapp.Developer.addActivityLog("Generate Doc Button - Trailer_Policy(GenerateDocManual.Generate_Doc_Button_Trailer) --- " + recID,"Empty Subform Scenarion Called","ID","null");
				thisapp.Combine_Document.Trailer_Policy(input.recID);
			}
		}
		thisapp.Developer.addActivityLog("Generate Doc Button - Trailer_Policy(GenerateDocManual.Generate_Doc_Button_Trailer) ---" + recID,"Function Call End","ID","null");
	}
	catch (e)
	{
		thisapp.Developer.addDeveloperLog("Trailer Quote","Trailer - Generate Doc Button (GenerateDocManual.Generate_Doc_Button_Trailer)--" + recID.toString(),"Generate Doc Button Error Response","",e,"creator");
	}
}