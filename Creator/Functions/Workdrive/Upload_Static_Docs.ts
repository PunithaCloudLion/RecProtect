void Workdrive.Upload_Static_Docs(string process, int recID, string urlData, string fileName, string docName)
{
	try 
	{
		// 		docName = "Static Document - Rishk Document";
		if(process == "Trailer")
		{
			getTrailerReponse = TrailerQuote[ID == input.recID];
			workdriverFolder = getTrailerReponse.Contact_Policy_Folder_Workdrive_Folder_ID;
			fileobj = invokeurl
			[
				url :urlData
				type :GET
			];
		}
		upload_response = zoho.workdrive.uploadFile(fileobj,workdriverFolder.toString(),fileName + ".pdf",true,"cl_workdrive");
		if(upload_response != null)
		{
			getUploadrep = upload_response.get("data").get(0);
			permalink = getUploadrep.get("attributes").get("Permalink");
			downloadlink = getUploadrep.get("attributes").get("download_url");
			upload_map = Map();
			upload_map.put("resource_ID",permalink.getsuffix("file/"));
			upload_map.put("recID",recID);
			get_fileuploadresponse = invokeurl
			[
				url :"https://www.zohoapis.com/crm/v2/functions/Quote_Attachment_Upload/actions/execute?auth_type=apikey&zapikey=1003.e22f3273bb04b81989500e60afe3e5d6.99dc1d6bafbf8dd22c72d8420f043dc3"
				type :GET
				parameters:upload_map
				connection:"zcrm"
			];
			uploadresp_ZFS = get_fileuploadresponse.get("details").get("output").toMap();
			attach_id = uploadresp_ZFS.get("data").getJSON("details").get("id");
			listValue = List();
			if(attach_id != null && attach_id != "")
			{
				// -------- Add Document into Subform - Start --------	
				if(process == "Trailer")
				{
					getTrailerQuoteInfo = TrailerQuote[ID == input.recID];
					listValue = getTrailerQuoteInfo.Email_List.toList();
					listValue.add(attach_id);
					getTrailerQuoteInfo.Email_List=listValue;
					rowInsertDoc = TrailerQuote.Trailer_Document_Information();
					rowInsertDoc.Document_Name=docName.getprefix("-");
					rowInsertDoc.Document_Type=Document_Type_List[Document_Type == docName.getsuffix("-")].ID;
					rowInsertDoc.Workdrive_URL=permalink;
					rowInsertDoc.Download_URL=downloadlink;
					rowInsertDoc.Created_Time=zoho.currenttime;
					getTrailerQuoteInfo.Trailer_Document_Information.insert(rowInsertDoc);
				}
				if(process == "Boat")
				{
					getBoatQuoteInfo = BoatQuote[ID == input.recID];
					listValue = getBoatQuoteInfo.Email_List.toList();
					listValue.add(attach_id);
					getBoatQuoteInfo.Email_List=listValue;
					rowInsertDocBoat = BoatQuote.Boat_Document_Information();
					rowInsertDocBoat.Document_Name=docName.getprefix("-");
					rowInsertDocBoat.Document_Type=Document_Type_List[Document_Type == docName.getsuffix("-")].ID;
					rowInsertDocBoat.Workdrive_URL=permalink;
					rowInsertDocBoat.Download_URL=downloadlink;
					rowInsertDocBoat.Created_Time=zoho.currenttime;
					getBoatQuoteInfo.Boat_Document_Information.insert(rowInsertDocBoat);
				}
			}
		}
	}
	catch (e)
	{
		sendmail
		[
			from :zoho.adminuserid
			to :"vignesh@cloudlion.org"
			subject :"Error on Upload Static Doc -- " + recID
			message :e
		]
	}
}