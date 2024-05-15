void Renewal.Renewal_Update_To_CRM_Deal(int recid, string type)
{
	//---------------Jana-----------------
	if(type == "Boat")
	{
		policyInfo = BoatQuote[ID == recid];
		updateMap = Map();
		updateMap.put("Deal_Name",ifnull(policyInfo.Policy_Number,""));
		updateMap.put("Type","Boat");
		updateMap.put("Deal_Status","Policy");
		updateMap.put("Policy_Payment_Status","PAID");
		updateMap.put("Quote_ID",policyInfo.Quote_ID);
		// 	updateMap.put("Product_Name", policyInfo);
		updateMap.put("Policy_Status","ACTIVE");
		updateMap.put("How_many_boats_would_you_like_to_insure",policyInfo.How_many_boats_would_you_like_to_insure);
		boatProvince = null;
		if(policyInfo.Please_select_the_province_your_boat_is_used_in == "Alberta")
		{
			boatProvince = "AB";
		}
		else if(policyInfo.Please_select_the_province_your_boat_is_used_in == "Ontario")
		{
			boatProvince = "ON";
		}
		else if(policyInfo.Please_select_the_province_your_boat_is_used_in == "British Columbia")
		{
			boatProvince = "BC";
		}
		else if(policyInfo.Please_select_the_province_your_boat_is_used_in == "Saskatchewan")
		{
			boatProvince = "SK";
		}
		updateMap.put("Province",ifnull(boatProvince,""));
		updateMap.put("Agree_to_terms_and_conditions",policyInfo.Agree_to_terms_and_conditions);
		updateMap.put("Carrier",ifnull(policyInfo.Carrier,""));
		updateMap.put("Quote_Status",ifnull(policyInfo.Quote_Status,""));
		//----------Deal Dates-----------
		updateMap.put("Inception_Date",policyInfo.Inception_Date);
		updateMap.put("Payment_Date",if(policyInfo.Payment_Date != null,policyInfo.Payment_Date.toTime("yyyy-MM-dd'T'HH:mm:ss").toString("yyyy-MM-dd'T'HH:mm:ss-05:00"),null));
		updateMap.put("Sales_Date_1",if(policyInfo.Sales_Date != null,policyInfo.Sales_Date.toTime("yyyy-MM-dd'T'HH:mm:ss").toString("yyyy-MM-dd'T'HH:mm:ss-05:00"),null));
		updateMap.put("Expiry_Date",policyInfo.Expiry_Date);
		updateMap.put("Bind_Date",if(policyInfo.Bind_Date != null,policyInfo.Bind_Date.toTime("yyyy-MM-dd'T'HH:mm:ss").toString("yyyy-MM-dd'T'HH:mm:ss-05:00"),null));
		updateMap.put("Last_Modified",policyInfo.Last_Modified);
		//----------Subform----------
		subList = List();
		for each  subRec in policyInfo.Additional_Names
		{
			subMap = Map();
			subMap.put("Additional_Insured_Leads",ifnull(subRec.Additional_Insured_First_Name,""));
			subMap.put("Additional_Insured",ifnull(subRec.Additional_Insured_Last_Name,""));
			// 		subMap.put("Type", subRec.)
			subList.add(subMap);
		}
		updateMap.put("Subform_1",subList);
		//----------Premium-----
		updateMap.put("Premium",ifnull(policyInfo.Total_Premium_before_tax,null));
		updateMap.put("Fee",ifnull(policyInfo.Fee,null));
		updateMap.put("Tax",ifnull(policyInfo.Total_Tax,null));
		updateMap.put("Total",ifnull(policyInfo.Total_Payable_Premium_after_tax,null));
		//---------Adjusted premium-----------
		updateMap.put("Outstanding",ifnull(policyInfo.Outstanding,null));
		updateMap.put("Prorate_From",policyInfo.Prorate_From);
		updateMap.put("Prorated",ifnull(policyInfo.Prorated,null));
		updateMap.put("Waive_Fee",policyInfo.Waive_Free);
		//-------Deal Reference-----------
		updateMap.put("Policy_Number",policyInfo.Policy_Number);
		layoutMap = Map();
		layoutMap.put("id",5778486000007672001);
		updateMap.put("Layout",layoutMap);
		updateMap.put("Creator_ID",policyInfo.ID.toString());
		updateResp = zoho.crm.updateRecord("Deals",policyInfo.Zoho_Crm_ID.toLong(),updateMap);
	}
	else if(type == "Trailer")
	{
		trailerPolicyInfo = TrailerQuote[ID == recid];
		updateMap = Map();
		updateMap.put("Deal_Name",ifnull(trailerPolicyInfo.Policy_Number,""));
		updateMap.put("Type","Trailer");
		updateMap.put("Deal_Status","Policy");
		// 	updateMap.put("Product_Name", policyInfo);
		updateMap.put("Policy_Status","ACTIVE");
		updateMap.put("Quote_ID",trailerPolicyInfo.Quote_ID);
		trailerProvince = null;
		if(trailerPolicyInfo.Please_select_the_province_your_trailer_is_located_in == "Alberta")
		{
			trailerProvince = "AB";
		}
		else if(trailerPolicyInfo.Please_select_the_province_your_trailer_is_located_in == "Ontario")
		{
			trailerProvince = "ON";
		}
		else if(trailerPolicyInfo.Please_select_the_province_your_trailer_is_located_in == "British Columbia")
		{
			trailerProvince = "BC";
		}
		else if(trailerPolicyInfo.Please_select_the_province_your_trailer_is_located_in == "Saskatchewan")
		{
			trailerProvince = "SK";
		}
		updateMap.put("Province",ifnull(trailerProvince,""));
		updateMap.put("Agree_to_terms_and_conditions",trailerPolicyInfo.Agree_to_terms_and_conditions);
		updateMap.put("Carrier",ifnull(trailerPolicyInfo.Carrier,""));
		updateMap.put("Quote_Status",ifnull(trailerPolicyInfo.Quote_Status,""));
		updateMap.put("Contact_Name	",trailerPolicyInfo.Customer_ID.Zoho_Crm_ID);
		//----------Deal Dates-----------
		updateMap.put("Inception_Date",trailerPolicyInfo.Inception_Date);
		updateMap.put("Payment_Date",if(trailerPolicyInfo.Payment_Date != null,trailerPolicyInfo.Payment_Date.toTime("yyyy-MM-dd'T'HH:mm:ss").toString("yyyy-MM-dd'T'HH:mm:ss-05:00"),null));
		updateMap.put("Sales_Date_1",if(trailerPolicyInfo.Sales_Date != null,trailerPolicyInfo.Sales_Date.toTime("yyyy-MM-dd'T'HH:mm:ss").toString("yyyy-MM-dd'T'HH:mm:ss-05:00"),null));
		updateMap.put("Expiry_Date",trailerPolicyInfo.Expiry_Date);
		updateMap.put("Bind_Date",if(trailerPolicyInfo.Bind_Date != null,trailerPolicyInfo.Bind_Date.toTime("yyyy-MM-dd'T'HH:mm:ss").toString("yyyy-MM-dd'T'HH:mm:ss-05:00"),null));
		updateMap.put("Last_Modified",if(trailerPolicyInfo.Last_Modified_Date != null,trailerPolicyInfo.Last_Modified_Date.toTime("yyyy-MM-dd'T'HH:mm:ss").toString("yyyy-MM-dd'T'HH:mm:ss-05:00"),null));
		//----------Subform----------
		subList = List();
		for each  subRec in trailerPolicyInfo.Additional_Names
		{
			subMap = Map();
			subMap.put("Additional_Insured_Leads",ifnull(subRec.Additional_Insured_First_Name,""));
			subMap.put("Additional_Insured",ifnull(subRec.Additional_Insured_Last_Name,""));
			// 		subMap.put("Type", subRec.)
			subList.add(subMap);
		}
		updateMap.put("Subform_1",subList);
		//----------Premium-----
		updateMap.put("Premium",ifnull(trailerPolicyInfo.Total_Premium_before_tax,null));
		updateMap.put("Fee",ifnull(trailerPolicyInfo.Fee,null));
		updateMap.put("Tax",ifnull(trailerPolicyInfo.Total_Tax,null));
		updateMap.put("Total",ifnull(trailerPolicyInfo.Total_Payable_Premium_after_tax,null));
		//---------Adjusted premium-----------
		updateMap.put("Outstanding",ifnull(trailerPolicyInfo.Outstanding,null));
		updateMap.put("Prorate_From",trailerPolicyInfo.Prorate_From);
		updateMap.put("Prorated",ifnull(trailerPolicyInfo.Prorated,null));
		updateMap.put("Creator_ID",trailerPolicyInfo.ID.toString());
		//-------Deal Reference-----------
		updateMap.put("Policy_Number",trailerPolicyInfo.Policy_Number);
		layoutMap = Map();
		layoutMap.put("id",5778486000007672922);
		updateMap.put("Layout",layoutMap);
		updateResp = zoho.crm.updateRecord("Deals",trailerPolicyInfo.Zoho_Crm_ID.toLong(),updateMap);
	}
}