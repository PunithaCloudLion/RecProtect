void Combine_Document.Trailer_Policy(int recID)
{
	try 
	{
		thisapp.Developer.addActivityLog("Combined Doc - Trailer_Policy(Combine_Document.Trailer_Policy)--" + recID.tostring(),"Function Call Start","ID","null");
		getTrailerQuoteInfo = TrailerQuote[ID == input.recID];
		//	info getTrailerQuoteInfo;
		if(getTrailerQuoteInfo.count() > 0)
		{
			coverageType = "";
			paramList = list();
			input_options = Map();
			new_List = list();
			// ----- Record Template Configuration -----
			getTrailerInfo = Trailer[TrailerQuote == getTrailerQuoteInfo.ID];
			pageRanges = {"1":{"page_ranges":"1,2"},"2":{"page_ranges":"1,2,3"}};
			// combinedurl = "https://creatorapp.zohopublic.com//export/service_recprotect/quotation/pdf/Trailer_Policy_Declaraition/ROFPE5CUHaqRbCeW6DsQb0nSWbPJAWzORD0ajU9x3FQ7h8qxwyuH1xZ2QDsu53HHQQHDPGeNZb5T1jY1F4f20jSj9yOf5DXy1fQG/?trailerID=" + getTrailerQuoteInfo.ID + "&isc5page=true"; // &zc_PdfSize=A4
			combinedurl = Record_Template_Configuration[Name == "Trailer Declaration"].URL.replaceAll("CREATORRECID",getTrailerQuoteInfo.ID.toString());
			fileobj1 = invokeurl
			[
				url :combinedurl
				type :GET
			];
			fileobj1.setParamName("files");
			document_1 = pageRanges.get(getTrailerInfo.count().toString());
			// 			input_options.put("1",document_1);
			paramList.add({"paramName":"files","content":fileobj1});
			for each  rec in getTrailerQuoteInfo.Trailer
			{
				new_List.add(rec.Coverage_Type);
			}
			new_List = new_List.distinct();
			if(new_List.contains("All Risk") == true)
			{
				documentName = "All Risk Wordings";
				getStaticDocInfo = Static_Document_Configuration[Document_Name_List.Document_Name == documentName];
				if(getStaticDocInfo.count() > 0)
				{
					fileobj2 = invokeurl
					[
						url :getStaticDocInfo.Workdrive_Download_URL
						type :GET
						connection:"cl_workdrive"
					];
					fileobj2.setParamName("files");
					document_2 = getStaticDocInfo.Page_Numbers.toMap();
					// 					input_options.put("2",document_2);
					paramList.add({"paramName":"files1","content":fileobj2});
				}
			}
			if(new_List.contains("Named Perils") == true)
			{
				documentName = "Named Perils Wordings";
				getStaticDocInfo = Static_Document_Configuration[Document_Name_List.Document_Name == documentName];
				if(getStaticDocInfo.count() > 0)
				{
					fileobj3 = invokeurl
					[
						url :getStaticDocInfo.Workdrive_Download_URL
						type :GET
						connection:"cl_workdrive"
					];
					fileobj3.setParamName("files");
					document_3 = getStaticDocInfo.Page_Numbers.toMap();
					// 					input_options.put("3",document_3);
					paramList.add({"paramName":"files2","content":fileobj3});
				}
			}
			// 			// ---- Combine Statutory document based on state - Start -------
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
				fileobj4 = invokeurl
				[
					url :StatutoryDocNameData.Workdrive_Download_URL
					type :GET
					connection:"cl_workdrive"
				];
				fileobj4.setParamName("files");
				document_4 = StatutoryDocNameData.Page_Numbers.toMap();
				// 				input_options.put("4",document_4);
				paramList.add({"paramName":"files3","content":fileobj4});
			}
			// ---- Combine Statutory document - End --------
			// ----- BDCISRO - Static Document - Start ----
			getBDCISRO_Doc = Static_Document_Configuration[Document_Name_List.Document_Name == "BDCISRO" && Type_field == "Trailer"];
			if(getBDCISRO_Doc.count() > 0)
			{
				fileobj5 = invokeurl
				[
					url :getBDCISRO_Doc.Workdrive_Download_URL
					type :GET
					connection:"cl_workdrive"
				];
				fileobj5.setParamName("files");
				document_5 = getBDCISRO_Doc.Page_Numbers.toMap();
				// 				input_options.put("5",document_5);
				paramList.add({"paramName":"files4","content":fileobj5});
			}
			// ----- BDCISRO - Static Document - End ----
			if(paramList.isEmpty() == false)
			{
				output_settings = {"name":"combined-document"};
				paramList.add({"paramName":"output_settings","content":output_settings.toString(),"Content-Type":"application/json","stringPart":"true"});
				paramList.add({"paramName":"input_options","content":input_options.toString(),"Content-Type":"application/json","stringPart":"true"});
				combinepdf_response = invokeurl
				[
					url :"https://zohoapis.com/writer/api/v1/documents/pdf/combine"
					type :POST
					files:paramList
					connection:"cl_writer"
				];
				//			info "combinepdf_response";
				//			info " -------------------------------------";
				//			info combinepdf_response;
				thisapp.Developer.addActivityLog("Combined Doc - Trailer_Policy(Combine_Document.Trailer_Policy)--" + recID.tostring(),"Combined Doc API Call Response","ID---" + recID.tostring(),combinepdf_response.tostring());
				if(combinepdf_response != null)
				{
					getTrailerQuoteInfo.Combined_Doc_Response=combinepdf_response;
					getTrailerQuoteInfo.Combined_Doc_Status_Check_On=zoho.currenttime.addSeconds(45);
				}
			}
		}
		thisapp.Developer.addActivityLog("Combined Doc - Trailer_Policy(Combine_Document.Trailer_Policy)--" + recID.tostring(),"Function Call Ended and Record updated in webapp ","ID---" + recID.tostring(),combinepdf_response.tostring());
	}
	catch (e)
	{
		// 		info " -------------------";
		// 		info e;
		thisapp.Developer.addDeveloperLog("Combined Doc - Trailer_Policy(Combine_Document.Trailer_Policy) --- " + recID.tostring(),"Trailer_Policy:" + recID.tostring(),"Record updated in webapp",recID.tostring(),e,"creator");
	}
}