void Policy_Change_Declaration.Boat_Policy_Change(int policy_id)
{
	try 
	{
		thisapp.Developer.addActivityLog("Boat Policy Change - Create Combine Doc(Policy_Change_Declaration.Boat_Policy_Change)--" + policy_id.toString(),"Create Combine Doc Boat Policy","Funcation Call Start","");
		getBoatQuoteChangeInfo = Boat_Policy_change_Request[ID == input.policy_id];
		if(getBoatQuoteChangeInfo.count() > 0)
		{
			boatQuoteInfo = BoatQuote[ID == getBoatQuoteChangeInfo.BoatQuote_ID];
			thisapp.Developer.addActivityLog("Policy_Change_Declaration.Boat_Policy_Change --" + policy_id.tostring(),"Function Call Start","ID","null");
			paramList = list();
			input_options = Map();
			new_List = list();
			combinedurl = "https://creatorapp.zohopublic.com//export/service_recprotect/quotation/pdf/Boat_Policy_Declaration/C8ntC5vMF39GZXZn9jfNtM2vYTf9dgFh64x31Q4T0Ar0U2WTdS05YCe2C36RjKUuwEm6prVY01tSZzEUH8JMMrjGh0Td6YQ7s623/?recID=" + boatQuoteInfo.ID + "&isc5page=true&zc_PdfSize=A4";
			filename = "Declaration of " + getBoatQuoteChangeInfo.Insured_First_Name + " " + getBoatQuoteChangeInfo.Insured_Last_Name + "--" + getBoatQuoteChangeInfo.Policy_Number;
			fileobj1 = invokeurl
			[
				url :combinedurl
				type :GET
			];
			fileobj1.setParamName("files");
			document_1 = {"page_ranges":"1,2"};
			// 			input_options.put("1",document_1);
			paramList.add({"paramName":"files","content":fileobj1});
			for each  rec in getBoatQuoteChangeInfo.Boat
			{
				new_List.add(rec.Select_coverage_for_policy);
			}
			new_List = new_List.distinct();
			if(new_List.contains("Replacement Value Coverage") == true)
			{
				documentName = "RC Watercraft Wording";
				getStaticDocInfo = Static_Document_Configuration[Document_Name_List.Document_Name == documentName && Type_field == "Boat"];
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
			if(new_List.contains("Current Market Value Coverage") == true)
			{
				documentName = "ACV Watercraft Wording";
				getStaticDocInfo = Static_Document_Configuration[Document_Name_List.Document_Name == documentName && Type_field == "Boat"];
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
			// --- Communication Dieases Exclusion Document - Start -----
			getCommDisDocument = Static_Document_Configuration[Document_Name_List.Document_Name == "Communicable Disease Exclusion" && Type_field == "Boat"];
			fileobj4 = invokeurl
			[
				url :getCommDisDocument.Workdrive_Download_URL
				type :GET
				connection:"cl_workdrive"
			];
			fileobj4.setParamName("files");
			document_4 = getCommDisDocument.Page_Numbers.toMap();
			// 			input_options.put("4",document_4);
			paramList.add({"paramName":"files3","content":fileobj4});
			// --- Communication Dieases Exclusion Document - End -----
			// ---- Combine Statutory document based on state - Start -------
			getStateMapping = State_and_Statutory_Mapping[State_Belongs_To.contains(getBoatQuoteChangeInfo.Province)];
			if(getStateMapping.count() == 0)
			{
				StatutoryDocNameData = Static_Document_Configuration[Document_Name_List == getStateMapping.Document_Name && Type_field == "Boat"];
			}
			else
			{
				StatutoryDocNameData = Static_Document_Configuration[Document_Name_List.Document_Name == "Statutory All" && Type_field == "Boat"];
			}
			if(StatutoryDocNameData.count() > 0)
			{
				fileobj5 = invokeurl
				[
					url :StatutoryDocNameData.Workdrive_Download_URL
					type :GET
					connection:"cl_workdrive"
				];
				fileobj5.setParamName("files");
				document_5 = StatutoryDocNameData.Page_Numbers.toMap();
				// 				input_options.put("5",document_5);
				paramList.add({"paramName":"files4","content":fileobj5});
			}
			// ---- Combine Statutory document - End --------
			// ----- BDCISRO - Static Document - Start ----
			getBDCISRO_Doc = Static_Document_Configuration[Document_Name_List.Document_Name == "BDCISRO" && Type_field == "Boat"];
			if(getBDCISRO_Doc.count() > 0)
			{
				fileobj6 = invokeurl
				[
					url :getBDCISRO_Doc.Workdrive_Download_URL
					type :GET
					connection:"cl_workdrive"
				];
				fileobj6.setParamName("files");
				document_6 = getBDCISRO_Doc.Page_Numbers.toMap();
				// 				input_options.put("6",document_6);
				paramList.add({"paramName":"files5","content":fileobj6});
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
				//		info combinepdf_response;
				if(combinepdf_response != null)
				{
					thisapp.Developer.addActivityLog("Boat Policy Change - Create Combine Doc(Policy_Change_Declaration.Boat_Policy_Change)--" + policy_id.toString(),"Create Combine Doc Boat Policy API Call Response","",combinepdf_response.toString());
					getBoatQuoteChangeInfo.Combined_Doc_Response=combinepdf_response;
					getBoatQuoteChangeInfo.Combined_Doc_Status_Check_On=zoho.currenttime.addMinutes(1);
				}
			}
		}
		thisapp.Developer.addActivityLog("Boat Policy Change - Create Combine Doc(Policy_Change_Declaration.Boat_Policy_Change)--" + policy_id.toString(),"Create Combine Doc Boat Policy","Funcation Call Ends","");
	}
	catch (e)
	{
		thisapp.Developer.addDeveloperLog("Policy_Change_Declaration.Boat_Policy_Change --- " + policy_id.tostring(),"Trailer_Policy:" + policy_id.tostring(),"Record updated in webapp",policy_id.tostring(),e,"creator");
	}
}