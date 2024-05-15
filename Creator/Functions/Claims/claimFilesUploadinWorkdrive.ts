void Claims.claimFilesUploadinWorkdrive(int ClaimID)
{
	getClaim = Claims[ID == ClaimID.tolong()];
	//info getClaim.Email;
	getPolicy = zoho.crm.getRecordById("Deals",getClaim.Deal_Name.toLong());
	//info getPolicy;
	getFolderID = getPolicy.get("Workdrive_Folder_ID");
	//Folder Creation in Zoho Workdrive
	claimFolder = zoho.workdrive.createFolder(getClaim.Policy_Number + " - " + getClaim.Select_Type_of_Boat_or_Trailer + " - Claims",getPolicy.get("Workdrive_Folder_ID"),"cl_workdrive");
	//info getClaim.Workdrive_Folder_ID;
	getClaim.Workdrive_Folder_ID=claimFolder.get("data").get("id");
	for each  rec in getClaim.Claim_Loss_Damage_Photos
	{
		tet = rec.Loss_Damage_Photos.getsuffix("image/");
		test = tet.getsuffix("_");
		test = test.getprefix("\"");
		//	info test;
		if(rec.Workdrive_File_ID == "" || rec.Workdrive_File_ID == null)
		{
			uploadFile = zoho.workdrive.uploadFile(rec.Loss_Damage_Photos,claimFolder.get("data").get("id"),test,true,"cl_workdrive");
			//		info uploadFile;
			getFileID = uploadFile.get("data").get(0).get("attributes");
			rec.Workdrive_File_ID=getFileID.get("resource_id");
		}
	}
	header2 = Map();
	header2.put("Accept","application/vnd.api+json");
	getAllFiles = invokeurl
	[
		url :"https://www.zohoapis.com/workdrive/api/v1/files/" + claimFolder.get("data").get("id") + "/files?page%5Blimit%5D=50&page%5Boffset%5D=0"
		type :GET
		headers:header2
		connection:"cl_workdrive"
	];
	//	info getAllFiles;
	for each  recFiles in getAllFiles.get("data")
	{
		getFile = Claim_Files[Workdrive_File_ID == recFiles.get("id")];
		if(getFile.count() == 1)
		{
			getFile.Thumbnail_ID=recFiles.get("attributes").get("thumbnail_url");
			getFile.Download_URL=recFiles.get("attributes").get("download_url");
		}
	}
}