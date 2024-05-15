void Migration.correctionBoatMigration()
{
	c = 0;
	getBoatRec = Boat_Migration[ID != null] range from 800 to 1000;
	for each  getBoat in getBoatRec
	{
		info getBoat.ID;
		policyMap = Map();
		policyMap.put("Additional_Insured_1",getBoat.Additional_Insured_First_Name);
		policyMap.put("Additional_Insured_2",getBoat.Additional_Insured_Last_Name);
		policyMap.put("Policy_Status","ACTIVE");
		policyMap.put("Agree_to_terms_and_conditions",true);
		policyMap.put("Postal_code_ZIP_Code_of_Mailing_address",getBoat.Postal_Zip_Code);
		// 		
		if(getBoat.Please_select_the_province_your_boat_is_used_in == "Alberta")
		{
			policyMap.put("Province","AB");
		}
		else if(getBoat.Please_select_the_province_your_boat_is_used_in == "British Columbia")
		{
			policyMap.put("Province","BC");
		}
		else if(getBoat.Please_select_the_province_your_boat_is_used_in == "Ontario")
		{
			policyMap.put("Province","ON");
		}
		else if(getBoat.Please_select_the_province_your_boat_is_used_in == "Saskatchewan")
		{
			policyMap.put("Province","SK");
		}
		else
		{
			policyMap.put("Province",null);
		}
		policyMap.put("Payment_Date",if(getBoat.Payment_Date != null,getBoat.Payment_Date.toTime("yyyy-MM-dd'T'HH:mm:ss").toString("yyyy-MM-dd'T'HH:mm:ss"),null));
		policyMap.put("Sales_Date_1",if(getBoat.Payment_Date != null,getBoat.Payment_Date.toTime("yyyy-MM-dd'T'HH:mm:ss").toString("yyyy-MM-dd'T'HH:mm:ss"),null));
		policyMap.put("Inception_Date",if(getBoat.Bind_Date != null,getBoat.Bind_Date.toTime("yyyy-MM-dd'T'HH:mm:ss").toString("yyyy-MM-dd'T'HH:mm:ss"),null));
		policyMap.put("Effective_Date",getBoat.Effective_Date);
		policyMap.put("Expiry_Date",getBoat.End_Date);
		policyMap.put("Premium",getBoat.Premium);
		policyMap.put("Fee",getBoat.Fee);
		policyMap.put("Total",getBoat.Total);
		policyMap.put("Tax",getBoat.Tax);
		policyMap.put("Last_Modified",if(getBoat.Last_Modified != null,getBoat.Last_Modified.toTime("yyyy-MM-dd'T'HH:mm:ss").toString("yyyy-MM-dd'T'HH:mm:ss"),null));
		dealStatus = if(getBoat.Policy_Number != null && getBoat.Policy_Number != "","Policy",if(getBoat.Reference_Number != null && getBoat.Reference_Number != "","Quote",""));
		policyMap.put("Deal_Status",dealStatus);
		policyMap.put("Stage","Won");
		policyMap.put("Contact_Name",getBoat.CRM_Contact_ID);
		policyMap.put("Product_Name",getBoat.Product_Name);
		policyMap.put("Type","Boat");
		if(getBoat.Phone != null && getBoat.Phone != "")
		{
			formattedPhoneNumber = getBoat.Phone.replaceAll("[/\-\(\)_@#\^!\$%\&\*:;`~ ]","");
			formattedPhoneNumber = "+1" + formattedPhoneNumber;
		}
		else
		{
			formattedPhoneNumber = "";
		}
		policyMap.put("Phone",formattedPhoneNumber);
		policyMap.put("Deal_Name",if(getBoat.Policy_Number != "",getBoat.Policy_Number,if(getBoat.Reference_Number != "",getBoat.Reference_Number,"N/A")));
		policyMap.put("Policy_Number",getBoat.Policy_Number);
		policyMap.put("Quote_ID",getBoat.Reference_Number);
		policyMap.put("I_Deal",true);
		// 		info policyMap;
		updateCRMRec = zoho.crm.updateRecord("Deals",getBoat.CRM_Deal_ID.toLong(),policyMap);
		//info updateCRMRec;
	}
	//info c;
}