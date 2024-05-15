void Policy_Change_Declaration.Trailer_Status_Check(int recID)
{
	try 
	{
		thisapp.Developer.addActivityLog("Combined Doc Status Check- Trailer_Policy(Policy_Change_Declaration.Trailer_Status_Check) --- " + recID,"Function Call Start","ID","null");
		getpolicychangeInfo = Trailer_Policy_Change_Request[ID == input.recID];
		trailerquotation = TrailerQuote[ID == getpolicychangeInfo.TrailerQuote_ID];
		if(getpolicychangeInfo.count() > 0)
		{
			responseData = getpolicychangeInfo.Combined_Doc_Response.toMap();
			Contact_Workdrive_FolderID = getpolicychangeInfo.Policy_Change_Workdrive_Folder_Link;
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
					thisapp.Developer.addActivityLog("Combined Doc Status Check- Trailer_Policy(Policy_Change_Declaration.Trailer_Status_Check) --- " + recID,"Status check API call response","",statuscheckResponse);
					if(statuscheckResponse != null && statuscheckResponse.get("status") == "completed")
					{
						combine_docName = "# " + getpolicychangeInfo.Policy_Number + "-Policy Declaration";
						if(getpolicychangeInfo.Policy_Number != "" && getpolicychangeInfo.Policy_Number != null)
						{
							Policy_Number = getpolicychangeInfo.Policy_Number;
						}
						if(Contact_Workdrive_FolderID != "" && Contact_Workdrive_FolderID != null)
						{
							Contact_Workdrive_FolderID = Contact_Workdrive_FolderID.getsuffix("folder/");
						}
						if(getpolicychangeInfo.Combined_Doc_Response != "" && getpolicychangeInfo.Combined_Doc_Response != null)
						{
							Combined_Doc_Response = getpolicychangeInfo.Combined_Doc_Response;
						}
						parmp = {"Policy_Number":Policy_Number,"Combined_Doc_Response":Combined_Doc_Response,"Contact_Policy_Folder_Workdrive_Folder_ID":Contact_Workdrive_FolderID,"combine_docName":combine_docName};
						Combined_Attachment_response = invokeurl
						[
							url :"https://www.zohoapis.com/crm/v2/functions/Test_Combiined/actions/execute?auth_type=apikey&zapikey=1003.e22f3273bb04b81989500e60afe3e5d6.99dc1d6bafbf8dd22c72d8420f043dc3"
							type :GET
							parameters:parmp
							connection:"zcrm"
						];
						thisapp.Developer.addActivityLog("Combined Doc Status Check- Trailer_Policy(Policy_Change_Declaration.Trailer_Status_Check) --- " + recID,"Combined Doc Upload in Workdrive - API Call Response",parmp.toString(),Combined_Attachment_response);
						if(Combined_Attachment_response != "")
						{
							returnData = Combined_Attachment_response.get("details").get("output").toMap();
							premaLink = returnData.get("permalink");
							downloadlink = returnData.get("downloadlink");
							emailList = List();
							getpolicychangeInfo.Combined_Doc_Status_Check_On=null;
							getpolicychangeInfo.Combined_Doc_Download_URL=premaLink;
							resource_id = premaLink.getsuffix("file/");
							upload_map = Map();
							upload_map.put("resource_ID",resource_id);
							upload_map.put("recID",getpolicychangeInfo.Zoho_Crm_ID);
							get_fileuploadresponse = invokeurl
							[
								url :"https://www.zohoapis.com/crm/v2/functions/Quote_Attachment_Upload/actions/execute?auth_type=apikey&zapikey=1003.e22f3273bb04b81989500e60afe3e5d6.99dc1d6bafbf8dd22c72d8420f043dc3"
								type :GET
								parameters:upload_map
								connection:"zcrm"
							];
							thisapp.Developer.addActivityLog("Combined Doc Status Check- Trailer_Policy(Policy_Change_Declaration.Trailer_Status_Check) --- " + recID,"Upload Combined Doc in ZFS - API Call Response",upload_map.toString(),get_fileuploadresponse);
							uploadresp_ZFS = get_fileuploadresponse.get("details").get("output").toMap();
							attach_id = uploadresp_ZFS.get("data").getJSON("details").get("id");
							if(attach_id != null && attach_id != "")
							{
								// --------- Send Email Configuration ---------
								thisapp.Policy_Change_Declaration.Send_Email_Through_CRM_API_PolicyChange(recID,"Trailer",attach_id);
							}
						}
						else
						{
							getpolicychangeInfo.Combined_Doc_Status_Check_On=zoho.currenttime.addSeconds(45);
						}
					}
					else
					{
						thisapp.Developer.addActivityLog("Combined Doc Status Check- Trailer_Policy(Policy_Change_Declaration.Trailer_Status_Check) --- " + recID,"Reset the schedule trigger time due to still in inprogress","ID","null");
						// 						getTrailerQuoteInfo.Combined_Doc_Status_Check_On=zoho.currenttime.addSeconds(45);
					}
				}
			}
		}
		thisapp.Developer.addActivityLog("Combined Doc Status Check- Trailer_Policy(Policy_Change_Declaration.Trailer_Status_Check) --- " + recID,"Function Call End","ID","null");
	}
	catch (e)
	{
		//	info e;
		thisapp.Developer.addDeveloperLog("Combined Doc Status Check- Trailer_Policy(Policy_Change_Declaration.Trailer_Status_Check) -- " + recID.tostring(),"Trailer_Doc_Status:" + recID.tostring(),"Document Status Check - Cobined Document",recID.tostring(),e,"creator");
	}
}