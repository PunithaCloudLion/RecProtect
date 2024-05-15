void Bulk_Update.TrailerInsurerInsert()
{
	// 	trailerInfo = TrailerQuote[Migrated == true && Quote_Record_ID_Server == "" || Quote_Record_ID_Server == null && Server_Migrated_Error_Resp != null && Server_Migrated_Error_Resp != ""]range from 6 to 15;
	// 	trailerInfo = TrailerQuote[Add_status_Additional_Insured_Flag_to_identify == "Yes"] range from 901 to 950;
	// 	trailerInfo =  TrailerQuote[ID != null && Add_status_Additional_Insured_Flag_to_identify == "" || Add_status_Additional_Insured_Flag_to_identify == null && Are_there_any_additional_names_on_the_trailer_ownership == "Yes" && !Insured_First_Name.contains("praveen")&& !Email.contains("test")];
	trailerInfo = TrailerQuote[ID == 4564627000000467422];
	info "totalTrailer Count----" + trailerInfo.count();
	quoteCount = 0;
	for each  trailerDetails in trailerInfo
	{
		quoteCount = quoteCount + 1;
		info "TrailerQuote ID-----" + trailerDetails.ID;
		if(trailerDetails != null)
		{
			if(trailerDetails.Email != "" && trailerDetails.Email != null)
			{
				count = 0;
				updateMap = Map();
				for each  additionNames in trailerDetails.Additional_Names
				{
					count = count + 1;
					EmailValue = trailerDetails.Email.getprefix("@");
					contactEmail = EmailValue + "+" + count + "@" + trailerDetails.Email.getsuffix("@");
					checkDup = Customer[Email == contactEmail];
					if(checkDup.count() == 0)
					{
						additionNames.Email=contactEmail;
						//----------------Insert to Creator Customer--------------
						customerResp = insert into Customer
						[
							Email=contactEmail
							First_Name=additionNames.First_Name
							Last_Name=additionNames.Last_Name
							Migrated_Additional_Insurer=true
							Quote_Type="Trailer"
							Migrated=true
							Added_User=zoho.loginuser
						];
						info "Creator Customer ID---- " + customerResp;
						additionNames.Customer_ID=customerResp;
						//---------------CRM Map Formation--------------
						dataMap = Map();
						dataMap.put("First_Name",additionNames.First_Name);
						dataMap.put("Last_Name",additionNames.Last_Name);
						dataMap.put("Email",contactEmail);
						dataMap.put("Phone","0123456789");
						dataMap.put("Status1","Active");
						dataMap.put("Mailing_Address","No Mailing Address");
						dataMap.put("Zoho_Creator_ID",customerResp.toString());
						dataMap.put("Insurer_with_Invalid_Email","Yes");
						fetchLayout = Layout[Layout_Name == "Client Layout"];
						layoutid = Map();
						layoutid.put("id",fetchLayout.Layout_ID.tolong());
						dataMap.put("Layout",layoutid);
						dataMap.put("Migrated",true);
						dataMap.put("Quote_Type","Trailer");
						//-------------------Create a Customer----------
						createContact = zoho.crm.createRecord("Contacts",dataMap);
						info "Email -- " + contactEmail;
						info "Customer Create Response --" + createContact;
						fetchCustoer = Customer[ID == customerResp];
						fetchCustoer.Zoho_Crm_ID=createContact.get("id").toString();
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
					info "#____" + quoteCount;
				}
				if(count > 0 && trailerDetails.Zoho_Crm_ID != "")
				{
					updateDeal = zoho.crm.updateRecord("Deals",trailerDetails.Zoho_Crm_ID.toLong(),updateMap);
					info "Deal Update Response --" + updateDeal;
				}
			}
			trailerDetails.Add_status_Additional_Insured_Flag_to_identify="Yes";
		}
	}
}