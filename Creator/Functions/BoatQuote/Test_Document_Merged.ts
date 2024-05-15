void BoatQuote.Test_Document_Merged(int recID)
{
	getBoatQuoteInfo = BoatQuote[ID == recID];
	if(getBoatQuoteInfo.count() > 0)
	{
		coverageType = "";
		paramList = list();
		input_options = Map();
		count = 0;
		for each  rec in getBoatQuoteInfo.Boat
		{
			count = count + 1;
		}
		if(count == 1)
		{
			for each  boatdet in getBoatQuoteInfo.Boat
			{
				if(boatdet.Select_coverage_for_policy == "Replacement Value Coverage")
				{
					coverageType = "RC Watercraft Wording";
				}
				if(boatdet.Select_coverage_for_policy == "Current Market Value Coverage")
				{
					coverageType = "ACV Watercraft Wording";
				}
				getStaticDocInfo = Static_Document_Configuration[Document_Name_List.Document_Name == coverageType && Type_field == "Boat"];
				if(getStaticDocInfo.count() > 0)
				{
					fileobj1 = invokeurl
					[
						url :getStaticDocInfo.Workdrive_URL
						type :GET
						connection:"cl_workdrive"
					];
					info fileobj1;
					// 				       fileobj1.setParamName("files");
					// 				       paramList.add(fileobj1);	
					// 					   info paramList;
				}
			}
		}
		// 			Replacement_count = 0;
		// 			Current_count = 0;
		// 			 if(count > 1) 
		//              {
		// 				for each boatdetails in getBoatQuoteInfo.Boat
		// 				{
		// 					if(boatdetails.Select_coverage_for_policy == "Replacement Value Coverage")
		// 					{
		// 						Replacement_count = Replacement_count+1;
		// 					}
		// 					if(boatdetails.Select_coverage_for_policy == "Current Market Value Coverage")
		// 					{
		// 						Current_count = Current_count+1;
		// 					}
		// 				}
		// 				if(count == Replacement_count || count == Current_count)
		// 				{
		// 					if(count == Replacement_count)
		// 					{
		// 					  coverageType = "RC Watercraft Wording";
		// 					  getStaticDocInfo = Static_Document_Configuration[Document_Name_List.Document_Name == coverageType && Type_field == "Boat"];
		// 			          if(getStaticDocInfo.count() > 0)
		// 					  {
		// 					   fileobj2 = invokeurl
		// 				      [
		// 					    url :getStaticDocInfo.Workdrive_Download_URL
		// 					    type :GET
		// 					   connection:"cl_workdrive"
		// 				      ];
		// 				       fileobj2.setParamName("files");
		// 				       paramList.add(fileobj2);	
		// 					  }
		// 					}
		// 					if(count == Current_count)
		// 					{
		// 						coverageType = "ACV Watercraft Wording";
		// 						getStaticDocInfo = Static_Document_Configuration[Document_Name_List.Document_Name == coverageType && Type_field == "Boat"];
		// 						if(getStaticDocInfo.count() > 0)
		// 						{
		// 						fileobj3 = invokeurl
		// 				       [
		// 					    url :getStaticDocInfo.Workdrive_Download_URL
		// 					    type :GET
		// 					   connection:"cl_workdrive"
		// 				       ];
		// 				       fileobj3.setParamName("files");
		// 				       paramList.add(fileobj3);	
		// 						}
		// 					}
		// 				}
		// 				else
		// 				{
		// 					 coverageType = "RC Watercraft Wording";
		// 					 getStaticDocInfo1 = Static_Document_Configuration[Document_Name_List.Document_Name == coverageType && Type_field == "Boat"];
		// 					 if(getStaticDocInfo1.count() > 0)
		// 					 {
		//                         fileobj4 = invokeurl
		// 				      [
		// 					    url :getStaticDocInfo1.Workdrive_Download_URL
		// 					    type :GET
		// 					   connection:"cl_workdrive"
		// 				      ];
		// 				       fileobj4.setParamName("files");
		// 				       document_4 = getStaticDocInfo1.Page_Numbers.toMap();
		// 				       input_options.put("1",document_4);
		// 				       paramList.add({"paramName":"files1","content":fileobj4});						  
		// 				     }
		// 					 coverageType2 = "ACV Watercraft Wording";
		// 					 getStaticDocInfo2 = Static_Document_Configuration[Document_Name_List.Document_Name == coverageType2 && Type_field == "Boat"];
		// 					 if(getStaticDocInfo2.count() > 0)
		// 					 {
		// 						 fileobj5 = invokeurl
		// 				      [
		// 					    url :getStaticDocInfo2.Workdrive_Download_URL
		// 					    type :GET
		// 					   connection:"cl_workdrive"
		// 				      ];
		// 				       fileobj5.setParamName("files");
		// 				       document_5 = getStaticDocInfo2.Page_Numbers.toMap();
		// 				       input_options.put("2",document_5);
		// 				       paramList.add({"paramName":"files2","content":fileobj5});	
		// 					 }
		// 					 if(input_options.isEmpty() == false)
		// 			         {
		// 						 output_settings = {"name":"combined-document"};
		// 				         paramList.add({"paramName":"output_settings","content":output_settings.toString(),"Content-Type":"application/json","stringPart":"true"});
		// 				         paramList.add({"paramName":"input_options","content":input_options.toString(),"Content-Type":"application/json","stringPart":"true"});
		// 				         combinepdf_response = invokeurl
		// 				         [
		// 					      url :"https://zohoapis.com/writer/api/v1/documents/pdf/combine"
		// 					      type :POST
		// 					      files:paramList
		// 					      connection:"cl_writer"
		// 				          ];
		// 				          info combinepdf_response;
		// 						  if(combinepdf_response != null)
		// 				          {
		// 							 if(combinepdf_response.get("status") == "inprogress")
		// 							 {
		// 								 urlVal = combinepdf_response.get("status_check_url");
		// 								 statuscheckResponse = invokeurl
		// 					             [
		// 						          url :urlVal
		// 						          type :GET
		// 						          connection:"cl_writer"
		// 					              ];
		// 							 }
		// 						  }
		// 					 }
		// 				}
		// 		 }
	}
}