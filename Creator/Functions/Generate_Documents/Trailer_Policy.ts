void Generate_Documents.Trailer_Policy(int recID)
{
	try 
	{
		thisapp.Developer.addActivityLog("Document Generation - Trailer_Policy(Generate_Documents.Trailer_Policy)--" + recID.tostring(),"Function Call Start","ID","null");
		getTrailerQuoteInfo = TrailerQuote[ID == input.recID];
		if(getTrailerQuoteInfo.count() > 0)
		{
			// ----- Record Template Configuration - Start-----
			// 			getTrailerInfo = Trailer[TrailerQuote == getTrailerQuoteInfo.ID];
			pageRanges = {"1":{"page_ranges":"1,2"},"2":{"page_ranges":"1,2,3"}};
			combinedurl = "https://creatorapp.zohopublic.com//export/service_recprotect/quotation/pdf/Trailer_Policy_Declaraition/ROFPE5CUHaqRbCeW6DsQb0nSWbPJAWzORD0ajU9x3FQ7h8qxwyuH1xZ2QDsu53HHQQHDPGeNZb5T1jY1F4f20jSj9yOf5DXy1fQG/?trailerID=" + getTrailerQuoteInfo.ID + "&isc5page=true&zc_PdfSize=A4";
			thisapp.Workdrive.Upload_Static_Docs("Trailer",recID,combinedurl,"Declaration","Static Document-Record Template");
			// ----- Record Template Configuration - End-----
			// ---- All Risks & Named Perils - Document Start -----
			new_List = List();
			for each  rec in getTrailerQuoteInfo.Trailer
			{
				new_List.add(rec.Coverage_Type);
			}
			new_List = new_List.distinct();
			if(new_List.contains("All Risk") == true)
			{
				getStaticDocInfo = Static_Document_Configuration[Document_Name_List.Document_Name == "All Risk Wordings"];
				thisapp.Workdrive.Upload_Static_Docs("Trailer",recID,getStaticDocInfo.Workdrive_Download_URL,"All Risk Windings","Static Document-All Risk Wordings");
			}
			if(new_List.contains("Named Perils") == true)
			{
				getStaticDocInfo = Static_Document_Configuration[Document_Name_List.Document_Name == "Named Perils Wordings"];
				thisapp.Workdrive.Upload_Static_Docs("Trailer",recID,getStaticDocInfo.Workdrive_Download_URL,"Named Perils Wordings","Static Document-Named Perils Wordings");
			}
			// ---- All Risks & Named Perils - Document Start -----
			// ---- Statutory document based on state - Start -------
			getStateMapping = State_and_Statutory_Mapping[State_Belongs_To.contains(getTrailerQuoteInfo.Province)];
			if(getStateMapping.count() == 0)
			{
				StatutoryDocNameData = Static_Document_Configuration[Document_Name_List == getStateMapping.Document_Name && Type_field == "Trailer"];
			}
			else
			{
				StatutoryDocNameData = Static_Document_Configuration[Document_Name_List.Document_Name == "Statutory All" && Type_field == "Both"];
			}
			if(StatutoryDocNameData.count() > 0)
			{
				thisapp.Workdrive.Upload_Static_Docs("Trailer",recID,StatutoryDocNameData.Workdrive_Download_URL,StatutoryDocNameData.Document_Name_List.Document_Name,"Static Document-" + StatutoryDocNameData.Document_Name_List.Document_Name);
			}
			// ----- Statutory document - End -------- 
			// ----- BDCISRO - Static Document - Start ----
			getBDCISRO_Doc = Static_Document_Configuration[Document_Name_List.Document_Name == "BDCISRO" && Type_field == "Trailer"];
			if(getBDCISRO_Doc.count() > 0)
			{
				thisapp.Workdrive.Upload_Static_Docs("Trailer",recID,getBDCISRO_Doc.Workdrive_Download_URL,"BDCISRO","Static Document-BDCISRO");
			}
			// ----- BDCISRO - Static Document - End ----
			// ------- Receipt & Application Document Generation - Start------
			OtherDocList = {"Receipt Document","Application Document"};
			for each  otherrec in OtherDocList
			{
				receipturl = Record_Template_Configuration[Name == "Trailer - Receipt Template"].URL.replaceAll("CREATORRECID",recID.toString());
				if(otherrec == "Application Document")
				{
					receipturl = Record_Template_Configuration[Name == "Trailer - Application Download"].URL.replaceAll("CREATORRECID",recID.toString());
				}
				thisapp.Workdrive.Upload_Static_Docs("Trailer",recID,receipturl,otherrec,"Static Document-" + otherrec);
			}
			// ------- Receipt & Application Document Generation - Start------
		}
	}
	catch (e)
	{
		info e;
		// 		sendmail
		//         [
		//         	from: zoho.adminuserid
		//         	to: "vignesh@cloudlion.org"
		//         	subject: "Error on Doc Generation -- " + recID
		//         	message: e
		//         ]
	}
}