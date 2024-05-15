void Policy_Change_Declaration.Boat_Status_Check(int recID)
{
	try 
	{
		thisapp.Developer.addActivityLog("Boat_Status_Check--" + recID,"Function Call Start","ID","null");
		boatPolicyChargeInfo = Boat_Policy_change_Request[ID == input.recID];
		getBoatQuoteInfo = BoatQuote[ID == boatPolicyChargeInfo.BoatQuote_ID];
		combine_docName = "# " + getBoatQuoteInfo.Policy_Number + "-Policy Declaration";
		if(boatPolicyChargeInfo.count() > 0)
		{
			Contact_Workdrive_FolderID = boatPolicyChargeInfo.Policy_Change_Workdrive_Folder_Link;
			if(boatPolicyChargeInfo.Policy_Number != "" && boatPolicyChargeInfo.Policy_Number != null)
			{
				Policy_Number = boatPolicyChargeInfo.Policy_Number;
			}
			if(Contact_Workdrive_FolderID != "" && Contact_Workdrive_FolderID != null)
			{
				Contact_Workdrive_FolderID = Contact_Workdrive_FolderID.getsuffix("folder/");
			}
			if(boatPolicyChargeInfo.Combined_Doc_Response != "" && boatPolicyChargeInfo.Combined_Doc_Response != null)
			{
				Combined_Doc_Response = boatPolicyChargeInfo.Combined_Doc_Response;
			}
			Combined_Attachment_response = invokeurl
			[
				url :"https://www.zohoapis.com/crm/v2/functions/Test_Combiined/actions/execute?auth_type=apikey&zapikey=1003.e22f3273bb04b81989500e60afe3e5d6.99dc1d6bafbf8dd22c72d8420f043dc3"
				type :GET
				parameters:{"Policy_Number":Policy_Number,"Combined_Doc_Response":Combined_Doc_Response,"Contact_Policy_Folder_Workdrive_Folder_ID":Contact_Workdrive_FolderID,"combine_docName":combine_docName}
				connection:"zcrm"
			];
			//	info "combineAttachement" + Combined_Attachment_response;
			if(Combined_Attachment_response != "")
			{
				returnData = Combined_Attachment_response.get("details").get("output").toMap();
				premaLink = returnData.get("permalink");
				downloadLink = returnData.get("downloadlink");
				getBoatQuoteInfo.Combined_Doc_Download_URL=premaLink;
				getBoatQuoteInfo.Combined_Doc_Status_Check_On=null;
				resource_id = premaLink.getsuffix("file/");
				upload_map = Map();
				upload_map.put("resource_ID",resource_id);
				upload_map.put("recID",boatPolicyChargeInfo.Zoho_Crm_ID);
				get_fileuploadresponse = invokeurl
				[
					url :"https://www.zohoapis.com/crm/v2/functions/Quote_Attachment_Upload/actions/execute?auth_type=apikey&zapikey=1003.e22f3273bb04b81989500e60afe3e5d6.99dc1d6bafbf8dd22c72d8420f043dc3"
					type :GET
					parameters:upload_map
					connection:"zcrm"
				];
				//	info "fileUploadResponse" + get_fileuploadresponse;
				uploadresp_ZFS = get_fileuploadresponse.get("details").get("output").toMap();
				attach_id = uploadresp_ZFS.get("data").getJSON("details").get("id");
				if(attach_id != null && attach_id != "")
				{
					// --------- Send Email Function ---------
					thisapp.Policy_Change_Declaration.Send_Email_Through_CRM_API_PolicyChange(recID,"Boat",attach_id);
				}
			}
			else
			{
				boatPolicyChargeInfo.Combined_Doc_Status_Check_On=zoho.currenttime.addSeconds(45);
			}
		}
	}
	catch (e)
	{
		thisapp.Developer.addDeveloperLog("Boat - Policy Change Request","Policy_Change_Declaration.Boat_Status_Check -- " + recID.tostring(),"Record updated in webapp",recID.tostring(),e,"creator");
	}
}