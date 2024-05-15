void Zoho_Sign.Download_Document_Upload_to_Workdrive(int id)
{
	get_rec = Zoho_Sign_Signature_Track[ID == id];
	get_cancellation = Cancellation[ID == get_rec.Cancellation_ID.toLong()];
	//	info get_cancellation;
	//	info get_cancellation.Crm_ID.toLong();
	//---------------------------Download in Zoho Sign------------
	download_doc = invokeurl
	[
		url :"https://sign.zoho.com/api/v1/requests/" + get_rec.Request_Id + "/documents/" + get_rec.Document_ID + "/pdf"
		type :GET
		connection:"zoho_sign"
	];
	//	info download_doc;
	//---------------------------Upload in Workdrive------------
	get_crm = zoho.crm.getRecordById("Deals",get_cancellation.Crm_Deal_ID.toLong());
	//	info get_crm;
	if(get_crm.size() > 0)
	{
		parent_id = get_crm.get("Workdrive_Folder_ID");
		create_folder = zoho.workdrive.createFolder("Cancellation",parent_id,"cl_workdrive");
		//		info "Creater Folder--" + create_folder;
		if(create_folder.get("data") != null)
		{
			upload = zoho.workdrive.uploadFile(download_doc,create_folder.get("data").get("id"),get_rec.Document_Name + ".pdf",false,"cl_workdrive");
			//			info "upload file--" + upload;
			if(upload != null)
			{
				if(upload.get("data") != null)
				{
					get_cancellation.LPV_Workdrive_URL=upload.get("data").get(0).get("attributes").get("Permalink");
				}
			}
		}
	}
}