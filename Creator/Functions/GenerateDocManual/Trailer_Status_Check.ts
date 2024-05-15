void GenerateDocManual.Trailer_Status_Check(int recID)
{
	try 
	{
		getTrailerQuoteInfo = TrailerQuote[ID == input.recID];
		if(getTrailerQuoteInfo.count() > 0)
		{
			// 			info "1";
			newDatalist = List();
			responseData = getTrailerQuoteInfo.Combined_Doc_Response.toMap();
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
			// ---------- Generate othe documents -------------------------
			for each  documentInfo in getTrailerQuoteInfo.Trailer_Document_Information
			{
				if(documentInfo.Document_Type.Document_Type != "Combined Document")
				{
					if(documentInfo.Document_Type.Document_Type == "Receipt Document")
					{
						receipturl = Record_Template_Configuration[Name == "Trailer - Receipt Template"].URL.replaceAll("CREATORRECID",getTrailerQuoteInfo.ID.toString());
						reciptorTempName = "Receipt Document";
					}
					else if(documentInfo.Document_Type.Document_Type == "Application Document")
					{
						receipturl = Record_Template_Configuration[Name == "Trailer - Application Download"].URL.replaceAll("CREATORRECID",getTrailerQuoteInfo.ID.toString());
						reciptorTempName = "Application Document";
					}
					tempOrpageObj = invokeurl
					[
						url :receipturl
						type :GET
					];
					uploadResponse = zoho.workdrive.uploadFile(tempOrpageObj,Contact_Workdrive_FolderID,getTrailerQuoteInfo.Policy_Number + " - " + reciptorTempName + ".pdf",true,"cl_workdrive");
					if(uploadResponse != null)
					{
						if(uploadResponse.get("data") != null)
						{
							resource_id = documentInfo.Workdrive_URL.getsuffix("file/");
							upload_map = Map();
							upload_map.put("resource_ID",resource_id);
							upload_map.put("recID",getTrailerQuoteInfo.Zoho_Crm_ID);
							get_fileuploadresponse = invokeurl
							[
								url :"https://www.zohoapis.com/crm/v2/functions/Quote_Attachment_Upload/actions/execute?auth_type=apikey&zapikey=1003.e22f3273bb04b81989500e60afe3e5d6.99dc1d6bafbf8dd22c72d8420f043dc3"
								type :GET
								parameters:upload_map
								connection:"zcrm"
							];
							if(get_fileuploadresponse.get("code") == "success")
							{
								books_attachment_data = get_fileuploadresponse.get("details").get("output").toMap();
								otherodcID = books_attachment_data.get("data").getJSON("details").get("id");
								newDatalist.add(otherodcID);
							}
						}
					}
				}
			}
			// ---------- Generate otehr documents end ---------------------
			thisapp.Developer.addActivityLog("Generate Doc Button - Trailer Status Check (GenerateDocManual.Trailer_Status_Check) --- " + recID,"Combined Doc Status Check back end start","ID","null");
			if(responseData.isEmpty() == false)
			{
				// 				info "2";
				if(responseData.get("status") == "inprogress")
				{
					urlVal = responseData.get("status_check_url");
					statuscheckResponse = invokeurl
					[
						url :urlVal
						type :GET
						connection:"cl_writer"
					];
					thisapp.Developer.addActivityLog("Generate Doc Butto Status Check- Trailer_Policy(GenerateDocManual.Trailer_Status_Check) --- " + recID,"Status check API call response","",statuscheckResponse);
					if(statuscheckResponse != null && statuscheckResponse.get("status") == "completed")
					{
						// 						info "3";
						downloadURL = statuscheckResponse.get("download_link");
						writerRespObj = invokeurl
						[
							url :downloadURL
							type :GET
							connection:"cl_writer"
						];
						// 						info writerRespObj ;
						thisapp.Developer.addActivityLog("Generate Doc Button - Trailer Status Check (GenerateDocManual.Trailer_Status_Check) ---" + recID,"download File API Call Response -- " + statuscheckResponse,"",writerRespObj);
						// ---- Upload file in Workdrive -----
						upload_workdrive = zoho.workdrive.uploadFile(writerRespObj,Contact_Workdrive_FolderID,combine_docName + ".pdf",true,"cl_workdrive");
						//		info "workupl----" + upload_workdrive;
						if(upload_workdrive != null)
						{
							// 							info "4";
							if(upload_workdrive.get("data") != null)
							{
								getTrailerQuoteInfo.Combined_Doc_Download_URL=upload_workdrive.get("data").get(0).get("attributes").get("Permalink");
								getTrailerQuoteInfo.Combined_Doc_Status_Check_On=null;
								permalink = upload_workdrive.get("data").get(0).get("attributes").get("Permalink");
								getTrailerQuoteInfo.Combined_Doc_Workdrive_URL=permalink;
								resource_id = permalink.getsuffix("file/");
								upload_map = Map();
								upload_map.put("resource_ID",resource_id);
								upload_map.put("recID",getTrailerQuoteInfo.Zoho_Crm_ID);
								get_fileuploadresponse = invokeurl
								[
									url :"https://www.zohoapis.com/crm/v2/functions/Quote_Attachment_Upload/actions/execute?auth_type=apikey&zapikey=1003.e22f3273bb04b81989500e60afe3e5d6.99dc1d6bafbf8dd22c72d8420f043dc3"
									type :GET
									parameters:upload_map
									connection:"zcrm"
								];
								if(get_fileuploadresponse.get("code") == "success")
								{
									books_attachment_data = get_fileuploadresponse.get("details").get("output").toMap();
									books_attach_id = books_attachment_data.get("data").getJSON("details").get("id");
									newDatalist.add(books_attach_id);
								}
								//			info get_fileuploadresponse;
								getTrailerQuoteInfo.Combined_Document_Process="";
								getTrailerQuoteInfo.Combined_Doc_Status_Check_On=null;
							}
						}
					}
				}
				if(newDatalist.size() > 0)
				{
					getTrailerQuoteInfo.Email_List=newDatalist;
					thisapp.Combine_Document.Send_Email_Through_CRM_API(input.recID,"Trailer");
				}
			}
			thisapp.Developer.addActivityLog("Generate Doc Button - Trailer Status Check (GenerateDocManual.Trailer_Status_Check) --- " + recID,"Function Call Ends","ID","null");
		}
	}
	catch (e)
	{
		thisapp.Developer.addDeveloperLog("Trailer Quote","Trailer - Trailer Status Check (GenerateDocManual.Trailer_Status_Check) --- " + recID.toString(),"Trailer Status Check Error Response","",e,"creator");
	}
}