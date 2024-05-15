void boatAdditionalNameUpdate()
{
	c = 0;
	boatInfo = BoatQuote[ID != null && Add_status_Additional_Insured_Flag_to_identify == "" || Add_status_Additional_Insured_Flag_to_identify == null && Are_there_any_additional_names_on_the_boat_ownership == "Yes"];
	for each  rec in boatInfo
	{
		recAddi = Additional_Names[Boats == rec.ID];
		// 		info recAddi.Customer_ID.Zoho_Crm_ID;
		if(recAddi.Customer_ID != null)
		{
			if(recAddi.Customer_ID.Zoho_Crm_ID == null)
			{
				info recAddi.Email;
			}
		}
		// 		if(recAddi.Customer_ID == null)
		// 		{
		// 			c = c + 1;
		// 			info recAddi.Customer_ID;
		// 			dataMap = Map();
		// 						dataMap.put("First_Name",recAddi.Additional_Insured_First_Name);
		// 						dataMap.put("Last_Name",recAddi.Additional_Insured_Last_Name);
		// 						dataMap.put("Email",recAddi.Email);
		// 						dataMap.put("Phone","012345789");
		// 						dataMap.put("Status1","Active");
		// 						dataMap.put("Mailing_Address","No Email");
		// 						dataMap.put("Zoho_Creator_ID",recAddi.Customer_ID.toString());
		// 						dataMap.put("Insurer_with_Invalid_Email","Yes");
		// 						fetchLayout = Layout[Layout_Name == "Client Layout"];
		// 						layoutid = Map();
		// 						layoutid.put("id",fetchLayout.Layout_ID.tolong());
		// 						dataMap.put("Layout",layoutid);
		// 						dataMap.put("Migrated",true);
		// 						dataMap.put("Quote_Type","Boat");
		// 						//-------------------Create a Customer----------
		// // 						createContact = zoho.crm.createRecord("Contacts",dataMap,{"trigger":{""}});
		// // 						info "Customer Create Response --" + createContact;
		// // 						fetchCustoer = Customer[ID == recAddi.Customer_ID];
		// // 						fetchCustoer.Zoho_Crm_ID=createContact.get("id");
		// // 						info createContact.get("id");
		// 		}
	}
	info c;
}