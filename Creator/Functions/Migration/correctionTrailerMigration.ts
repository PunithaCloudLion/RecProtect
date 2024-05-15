void Migration.correctionTrailerMigration()
{
	// 	getTrailerRec = Trailer_Migration[ID != 0] range from 0 to 1;
	getTrailerRec = Trailer_Migration[ID != null] range from 2200 to 2600;
	c = 0;
	for each  getTrailer in getTrailerRec
	{
		//info getTrailer.ID;
		if(getTrailer.CRM_Deal_ID != "" && getTrailer.CRM_Deal_ID != null)
		{
			c = c + 1;
			info getTrailer.ID;
			policyMap = Map();
			policyMap.put("Policy_Status","ACTIVE");
			dealStatus = if(getTrailer.Policy_Number != null && getTrailer.Policy_Number != "","Policy",if(getTrailer.Reference_Number != null && getTrailer.Reference_Number != "","Quote",""));
			policyMap.put("Deal_Status",dealStatus);
			policyMap.put("Contact_Name",getTrailer.CRM_Contact_ID);
			policyMap.put("Product_Name",getTrailer.Product_Name);
			policyMap.put("Type","Trailer");
			policyMap.put("Agree_to_terms_and_conditions",true);
			if(getTrailer.Phone != null && getTrailer.Phone != "")
			{
				formattedPhoneNumber = getTrailer.Phone.replaceAll("[/\-\(\)_@#\^!\$%\&\*:;`~ ]","");
				formattedPhoneNumber = "+1" + formattedPhoneNumber;
			}
			else
			{
				formattedPhoneNumber = "";
			}
			policyMap.put("Phone",formattedPhoneNumber);
			if(getTrailer.Please_select_the_province_your_trailer_is_located_in == "Alberta")
			{
				policyMap.put("Province","AB");
			}
			else if(getTrailer.Please_select_the_province_your_trailer_is_located_in == "British Columbia")
			{
				policyMap.put("Province","BC");
			}
			else if(getTrailer.Please_select_the_province_your_trailer_is_located_in == "Ontario")
			{
				policyMap.put("Province","ON");
			}
			else if(getTrailer.Please_select_the_province_your_trailer_is_located_in == "Saskatchewan")
			{
				policyMap.put("Province","SK");
			}
			else
			{
				policyMap.put("Province",null);
			}
			policyMap.put("Additional_Insured_1",getTrailer.Additional_Insured_First_Name);
			policyMap.put("Additional_Insured_2",getTrailer.Additional_Insured_Last_Name);
			policyMap.put("Payment_Date",if(getTrailer.Payment_Date1 != null,getTrailer.Payment_Date1.toTime("yyyy-MM-dd'T'HH:mm:ss").toString("yyyy-MM-dd'T'HH:mm:ss"),null));
			policyMap.put("Sales_Date_1",if(getTrailer.Payment_Date1 != null,getTrailer.Payment_Date1.toTime("yyyy-MM-dd'T'HH:mm:ss").toString("yyyy-MM-dd'T'HH:mm:ss"),null));
			policyMap.put("Inception_Date",if(getTrailer.Bind_Date != null,getTrailer.Bind_Date.toTime("yyyy-MM-dd'T'HH:mm:ss").toString("yyyy-MM-dd'T'HH:mm:ss"),null));
			policyMap.put("Effective_Date",getTrailer.Effective_Date);
			policyMap.put("Postal_code_ZIP_Code_of_Mailing_address",getTrailer.Postal_Zip_Code);
			policyMap.put("Expiry_Date",getTrailer.End_Date);
			policyMap.put("Premium",getTrailer.Premium);
			policyMap.put("Fee",getTrailer.Fee);
			policyMap.put("Total",getTrailer.Total1);
			policyMap.put("Tax",getTrailer.Tax);
			policyMap.put("Last_Modified",if(getTrailer.Last_Modified1 != null,getTrailer.Last_Modified1.toTime("yyyy-MM-dd'T'HH:mm:ss").toString("yyyy-MM-dd'T'HH:mm:ss"),null));
			policyMap.put("Stage","Won");
			policyMap.put("Deal_Name",if(getTrailer.Policy_Number != "",getTrailer.Policy_Number,if(getTrailer.Reference_Number != "",getTrailer.Reference_Number,"N/A")));
			policyMap.put("Policy_Number",getTrailer.Policy_Number);
			policyMap.put("Quote_ID",getTrailer.Reference_Number);
			policyMap.put("I_Deal",true);
			//info getTrailer.CRM_Deal_ID;
			updateCRMrec = zoho.crm.updateRecord("Deals",getTrailer.CRM_Deal_ID.toLong(),policyMap);
			//info updateCRMrec;
		}
	}
	//info c;
}