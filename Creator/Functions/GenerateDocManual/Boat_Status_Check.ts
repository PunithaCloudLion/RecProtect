void GenerateDocManual.Boat_Status_Check(int recID)
{
	try 
	{
		thisapp.Developer.addActivityLog("Generate Doc Button - Boat Status Check (GenerateDocManual.Boat_Status_Check) ---" + recID,"Function Call Start","ID","null");
		getBoatQuoteInfo = BoatQuote[ID == input.recID];
		if(getBoatQuoteInfo.count() > 0)
		{
			newDatalist = List();
			responseData = getBoatQuoteInfo.Combined_Doc_Response.toMap();
			workdriveFolderID = getBoatQuoteInfo.NB_Workdrive_Folder_Link;
			combine_docName = getBoatQuoteInfo.Policy_Number + " - Policy Declaration";
			if(getBoatQuoteInfo.Policy_Number != "" && getBoatQuoteInfo.Policy_Number != null)
			{
				Policy_Number = getBoatQuoteInfo.Policy_Number;
			}
			if(workdriveFolderID != "" && workdriveFolderID != null)
			{
				Contact_Workdrive_FolderID = workdriveFolderID.getsuffix("folder/");
			}
			if(getBoatQuoteInfo.Combined_Doc_Response != "" && getBoatQuoteInfo.Combined_Doc_Response != null)
			{
				Combined_Doc_Response = getBoatQuoteInfo.Combined_Doc_Response;
			}
			combine_docName = getBoatQuoteInfo.Policy_Number + " - Policy Declaration";
			thisapp.Developer.addActivityLog("Generate Doc Button - Boat Status Check (GenerateDocManual.Boat_Status_Check) --- " + recID,"Function Call Start","ID","null");
			// ---------- Generate othe documents -----------------------------
			for each  documentInfo in getBoatQuoteInfo.Boat_Document_Information
			{
				if(documentInfo.Document_Type.Document_Type != "Combined Document")
				{
					if(documentInfo.Document_Type.Document_Type == "Receipt Document")
					{
						receipturl = Record_Template_Configuration[Name == "Boat - Receipt Template"].URL.replaceAll("CREATORRECID",getBoatQuoteInfo.ID.toString());
						reciptorTempName = "Receipt Document";
					}
					else if(documentInfo.Document_Type.Document_Type == "Application Document")
					{
						receipturl = Record_Template_Configuration[Name == "Boat - Application Download"].URL.replaceAll("CREATORRECID",getBoatQuoteInfo.ID.toString());
						reciptorTempName = "Application Document";
					}
					tempOrpageObj = invokeurl
					[
						url :receipturl
						type :GET
					];
					uploadResponse = zoho.workdrive.uploadFile(tempOrpageObj,Contact_Workdrive_FolderID,getBoatQuoteInfo.Policy_Number + " - " + reciptorTempName + ".pdf",true,"cl_workdrive");
					thisapp.Developer.addActivityLog("Generate Doc Button - Boat_Policy(GenerateDocManual.Boat_Status_Check) ---" + recID,"Upload Other File in Workdrive API Call Response -- " + reciptorTempName,"",uploadResponse.toString());
					if(uploadResponse != null)
					{
						if(uploadResponse.get("data") != null)
						{
							resource_id = documentInfo.Workdrive_URL.getsuffix("file/");
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
			thisapp.Developer.addActivityLog("Generate Doc Button - Boat Status Check (GenerateDocManual.Boat_Status_Check) --- " + recID,"Combined Doc Status Check back end start","ID","null");
			// ---------- Generate otehr documents end ---------------------
			if(responseData.isEmpty() == false)
			{
				//info "2" ;
				if(responseData.get("status") == "inprogress")
				{
					urlVal = responseData.get("status_check_url");
					statuscheckResponse = invokeurl
					[
						url :urlVal
						type :GET
						connection:"cl_writer"
					];
					if(statuscheckResponse != null && statuscheckResponse.get("status") == "completed")
					{
						downloadURL = statuscheckResponse.get("download_link");
						writerRespObj = invokeurl
						[
							url :statuscheckResponse.get("download_link")
							type :GET
							connection:"cl_writer"
						];
						thisapp.Developer.addActivityLog("Generate Doc Button - Boat Status Check (GenerateDocManual.Boat_Status_Check) ---" + recID,"download File API Call Response -- " + statuscheckResponse,"",writerRespObj.toString());
						// ---- Upload file in Workdrive -----
						upload_workdrive = zoho.workdrive.uploadFile(writerRespObj,Contact_Workdrive_FolderID,combine_docName + ".pdf",true,"cl_workdrive");
						//	info "workupl----" + upload_workdrive;
						if(upload_workdrive != null)
						{
							if(upload_workdrive.get("data") != null)
							{
								getBoatQuoteInfo.Combined_Doc_Download_URL=upload_workdrive.get("data").get(0).get("attributes").get("Permalink");
								getBoatQuoteInfo.Combined_Doc_Status_Check_On=null;
								permalink = upload_workdrive.get("data").get(0).get("attributes").get("Permalink");
								getBoatQuoteInfo.Combined_Doc_Workdrive_URL=permalink;
								resource_id = permalink.getsuffix("file/");
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
								if(get_fileuploadresponse.get("code") == "success")
								{
									books_attachment_data = get_fileuploadresponse.get("details").get("output").toMap();
									books_attach_id = books_attachment_data.get("data").getJSON("details").get("id");
									newDatalist.add(books_attach_id);
								}
								//	info get_fileuploadresponse;
								getBoatQuoteInfo.Combined_Document_Process="";
								getBoatQuoteInfo.Combined_Doc_Status_Check_On=null;
							}
						}
					}
				}
				if(newDatalist.size() > 0)
				{
					getBoatQuoteInfo.Email_List=newDatalist;
					thisapp.Combine_Document.Send_Email_Through_CRM_API(input.recID,"Boat");
				}
			}
		}
		thisapp.Developer.addActivityLog("Generate Doc Button - Boat Status Check (GenerateDocManual.Boat_Status_Check) ---" + recID,"Function Call Ends","ID","null");
	}
	catch (e)
	{
		thisapp.Developer.addDeveloperLog("Trailer Quote","Trailer - Generate Doc Button (GenerateDocManual.Generate_Doc_Button_Trailer)--" + recID.toString(),"Generate Doc Button Error Response","",e,"creator");
	}
}