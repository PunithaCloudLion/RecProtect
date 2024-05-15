void Bulk_Update.BoatInsurerInsert()
{
	// 	boatcount = BoatQuote[Add_status_Additional_Insured_Flag_to_identify == "Yes"].count();
	// 	info "Overall Count" + boatcount;
	// 	boatInfo = BoatQuote[ID != null && Add_status_Additional_Insured_Flag_to_identify == "" || Add_status_Additional_Insured_Flag_to_identify == null && Are_there_any_additional_names_on_the_boat_ownership == "Yes"];
	boatInfo = BoatQuote[ID == 4564627000001927360];
	info boatInfo.count();
	q = 0;
	for each  boatDetails in boatInfo
	{
		q = q + 1;
		info "BoatQuote ID-----" + boatDetails.ID;
		if(boatDetails != null)
		{
			if(boatDetails.Email != "" && boatDetails.Email != null)
			{
				count = 0;
				updateMap = Map();
				for each  additionNames in boatDetails.Additional_Names
				{
					count = count + 1;
					EmailValue = boatDetails.Email.getprefix("@");
					contactEmail = EmailValue + "+1@" + boatDetails.Email.getsuffix("@");
					//----------------Insert to Creator Customer--------------
					checkDup = Customer[Email == contactEmail];
					info "checkDup---->" + checkDup;
					if(checkDup.count() == 0)
					{
						info "if";
						additionNames.Email=contactEmail;
						//----------------Insert to Creator Customer--------------
						customerResp = insert into Customer
						[
							Email=contactEmail
							First_Name=additionNames.Additional_Insured_First_Name
							Last_Name=additionNames.Additional_Insured_Last_Name
							Migrated_Additional_Insurer=true
							Migrated=true
							Quote_Type="Boat"
							Added_User=zoho.loginuser
						];
						// 						info "Creator Customer ID---- " + customerResp;
						additionNames.Customer_ID=customerResp;
						//---------------CRM Map Formation--------------
						dataMap = Map();
						dataMap.put("First_Name",additionNames.Additional_Insured_First_Name);
						dataMap.put("Last_Name",additionNames.Additional_Insured_Last_Name);
						dataMap.put("Email",contactEmail);
						dataMap.put("Phone","0123456789");
						dataMap.put("Status1","Active");
						dataMap.put("Mailing_Address","No Email");
						dataMap.put("Zoho_Creator_ID",customerResp.toString());
						dataMap.put("Insurer_with_Invalid_Email","Yes");
						fetchLayout = Layout[Layout_Name == "Client Layout"];
						layoutid = Map();
						layoutid.put("id",fetchLayout.Layout_ID.tolong());
						dataMap.put("Layout",layoutid);
						dataMap.put("Migrated",true);
						dataMap.put("Quote_Type","Boat");
						//-------------------Create a Customer----------
						createContact = zoho.crm.createRecord("Contacts",dataMap,{"trigger":{""}});
						info "Customer Create Response --" + createContact;
						fetchCustoer = Customer[ID == customerResp];
						fetchCustoer.Zoho_Crm_ID=createContact.get("id");
						info createContact.get("id");
						if(count == 1)
						{
							updateMap.put("Additional_Insured",createContact.get("id"));
						}
						else if(count == 2)
						{
							updateMap.put("Additional_Insured_Name",createContact.get("id"));
						}
					}
					else
					{
						info "else";
					}
				}
				info "#____" + q;
				if(count > 0 && boatDetails.Zoho_Crm_ID != "")
				{
					updateMap.put("Needs_to_add_Additional_Insured",true);
					updateDeal = zoho.crm.updateRecord("Deals",boatDetails.Zoho_Crm_ID.toLong(),updateMap);
					// 					info "Deal Update Response " + updateDeal;
				}
			}
		}
	}
}