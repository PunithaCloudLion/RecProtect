void AddInsurerFunction()
{
	trailerInfo = TrailerQuote[Migrated == true] range from 2501 to 2700;
	for each  trailerDetails in trailerInfo
	{
		info trailerDetails.ID;
		if(trailerDetails != null)
		{
			dataMap = Map();
			count = 0;
			// 			info "12" ;
			for each  additionalNamesInfo in trailerDetails.Additional_Names
			{
				// 				info "1" ;
				if(additionalNamesInfo.Email == "" || additionalNamesInfo.Email == null)
				{
					count = count + 1;
					if(count > 0)
					{
						trailerDetails.Add_status_Additional_Insured_Flag_to_identify="Yes";
						// 						dataMap.put("Add_status_Additional_Insured_Flag_to_identify","Yes");
					}
				}
			}
			// 			if(dataMap.size() > 0)
			// 			{
			// 				if(boatDetails.Zoho_Crm_ID != "" && boatDetails.Zoho_Crm_ID != null)
			// 				{
			// 					updateDeal = zoho.crm.updateRecord("Deals",boatDetails.Zoho_Crm_ID.toLong(),dataMap);
			// 					info updateDeal;
			// 				}
			// 			}
		}
	}
}