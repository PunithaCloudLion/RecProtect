void Policy_Change_Declaration.Trailer_Policy_Change(int policy_id)
{
	try 
	{
		thisapp.Developer.addActivityLog("Trailer Policy Change - Create Combine Doc(Policy_Change_Declaration.Trailer_Policy_Change)--" + policy_id.toString(),"Create Combine Doc Trailer Policy","Funcation Call Start","");
		getChangeQuoteInfo = Trailer_Policy_Change_Request[ID == input.policy_id];
		paramList = list();
		input_options = Map();
		new_List = list();
		if(getChangeQuoteInfo.count() > 0)
		{
			trailerQuoteinfo = TrailerQuote[ID == getChangeQuoteInfo.TrailerQuote_ID];
			// ----- Record/Page Template Configuration -----
			combinedurl = "https://creatorapp.zohopublic.com//export/service_recprotect/quotation/pdf/Trailer_Policy_Declaraition/ROFPE5CUHaqRbCeW6DsQb0nSWbPJAWzORD0ajU9x3FQ7h8qxwyuH1xZ2QDsu53HHQQHDPGeNZb5T1jY1F4f20jSj9yOf5DXy1fQG/?trailerID=" + trailerQuoteinfo.ID + "&isc5page=true&zc_PdfSize=A4";
			fileobj1 = invokeurl
			[
				url :combinedurl
				type :GET
			];
			//	info "fileobj1" + fileobj1;
			fileobj1.setParamName("files");
			document_1 = {"page_ranges":"1,2"};
			// 			input_options.put("1",document_1);
			paramList.add({"paramName":"files","content":fileobj1});
			// --- End - Page/Record Template Config ---
			for each  rec in getChangeQuoteInfo.Trailer
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
			// ---- Combine Statutory document based on state - Start -------
			getStateMapping = State_and_Statutory_Mapping[State_Belongs_To.contains(getChangeQuoteInfo.Province)];
			if(getStateMapping.count() == 0)
			{
				StatutoryDocNameData = Static_Document_Configuration[Document_Name_List == getStateMapping.Document_Name && Type_field == "Trailer"];
			}
			else
			{
				StatutoryDocNameData = Static_Document_Configuration[Document_Name_List.Document_Name == "Statutory All" && Type_field == "Trailer"];
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
				//	info combinepdf_response;
				if(combinepdf_response != null)
				{
					thisapp.Developer.addActivityLog("Trailer Policy Change - Create Combine Doc(Policy_Change_Declaration.Trailer_Policy_Change)--" + policy_id.toString(),"Create Combine Doc Trailer Policy API Call Response",paramList.toString(),combinepdf_response.toString());
					getChangeQuoteInfo.Combined_Doc_Response=combinepdf_response;
					getChangeQuoteInfo.Combined_Doc_Status_Check_On=zoho.currenttime.addSeconds(45);
				}
			}
		}
		thisapp.Developer.addActivityLog("Trailer Policy Change - Create Combine Doc(Policy_Change_Declaration.Trailer_Policy_Change)--" + policy_id.toString(),"Create Combine Doc Trailer Policy","Funcation Call End","");
	}
	catch (e)
	{
		thisapp.Developer.addDeveloperLog("Trailer Quote - Policy Change","Policy Change - Generate Combined Doc(Policy_Change_Declaration.Trailer_Policy_Change)--" + policy_id.toString(),"Generate Combined Document Error Response","",e,"creator");
	}
}