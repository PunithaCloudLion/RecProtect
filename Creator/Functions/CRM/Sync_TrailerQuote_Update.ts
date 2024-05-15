void CRM.Sync_TrailerQuote_Update(int trailerID)
{
	try 
	{
		thisapp.Developer.addActivityLog("Trailer - Update Quote(CRM.Sync_TrailerQuote_Update)--" + trailerID.toString(),"Trailer - Update Quote Information in CRM--" + trailerID.toString(),"Funcation Call Start","");
		getTrailer = TrailerQuote[ID == trailerID];
		//------------Start-------------
		updateMap = Map();
		fetchLayout = Layout[Layout_Name == "Trailer Policy"];
		layoutid = Map();
		layoutid.put("id",fetchLayout.Layout_ID.tolong());
		updateMap.put("Layout",layoutid);
		/*
		if(getTrailer.Deal_Type == "Policy")
		{
			if(getTrailer.Customer_ID != null)
			{
				getCustomer = Customer[ID == getTrailer.Customer_ID];
				updateMap.put("Contact_Name",getCustomer.Zoho_Crm_ID);
				//	updateMap.put("Insured_Name",getCustomer.Zoho_Crm_ID);
			}
		}
		else if(getTrailer.Deal_Type == "Quote")
		{
			if(getTrailer.Customer_ID != null)
			{
				getCustomer = Customer[ID == getTrailer.Customer_ID];
				updateMap.put("Deal_s_Lead",getCustomer.Zoho_Crm_ID);
			}
		}
		*/
		getCustomer = Customer[ID == getTrailer.Customer_ID];
		Search_recLeads = zoho.crm.searchRecords("Leads","(Email:equals:" + getCustomer.Email + ")");
		Search_recCusomer = zoho.crm.searchRecords("Contacts","(Email:equals:" + getCustomer.Email + ")");
		if(Search_recLeads.size() > 0)
		{
			updateMap.put("Deal_s_Lead",Search_recLeads.get(0).get("id"));
			updateMap.put("Customer_Type","Lead");
		}
		if(Search_recCusomer.size() > 0)
		{
			updateMap.put("Contact_Name",Search_recCusomer.get(0).get("id"));
			updateMap.put("Customer_Type","Contact");
		}
		//info updateMap ;
		// 		if(getCustomer.count() > 0)
		// 		{
		// 			if(getCustomer.Customer_Type == "Lead")
		// 			{
		// 				updateMap.put("Deal_s_Lead",getCustomer.Zoho_Crm_ID);
		// 			}
		// 			else
		// 			{
		// 				updateMap.put("Contact_Name",getCustomer.Zoho_Crm_ID);
		// 			}
		// 		}
		if(getTrailer.Please_select_the_province_your_trailer_is_located_in == "Alberta")
		{
			updateMap.put("Province","AB");
		}
		if(getTrailer.Please_select_the_province_your_trailer_is_located_in == "British Columbia")
		{
			updateMap.put("Province","BC");
		}
		if(getTrailer.Please_select_the_province_your_trailer_is_located_in == "Ontario")
		{
			updateMap.put("Province","ON");
		}
		if(getTrailer.Please_select_the_province_your_trailer_is_located_in == "Saskatchewan")
		{
			updateMap.put("Province","SK");
		}
		updateMap.put("Policy_Status",getTrailer.Policy_Status);
		if(!isNull(getTrailer.Policy_Number))
		{
			updateMap.put("Deal_Name",getTrailer.Policy_Number);
		}
		else
		{
			updateMap.put("Deal_Name",getTrailer.Quote_ID);
		}
		AdditionalInsured1 = "";
		AdditionalInsured2 = "";
		if(getTrailer.Additional_Names != null)
		{
			getAdditionalNamesTrailer = Additional_Names_Trailer[ID == getTrailer.Additional_Names];
			if(getAdditionalNamesTrailer.count() > 0)
			{
				AdditionalInsured1 = getAdditionalNamesTrailer.First_Name;
				AdditionalInsured2 = getAdditionalNamesTrailer.Last_Name;
			}
		}
		// 		updateMap.put("Additional_Insured_1",AdditionalInsured1);
		// 		updateMap.put("Additional_Insured_2",AdditionalInsured2);
		// 		if(getTrailer.Quote_Status == "Completed")
		// 		{
		// 			updateMap.put("Stage","Won");
		// 		}
		// 		else
		// 		{
		// 			updateMap.put("Stage","New Leads");
		// 		}
		//----------------Bucket Name Mapping in CRM Stage------------------------------------------------------
		if(getTrailer.Quote_Status == "Created")
		{
			updateMap.put("Stage","New Leads");
		}
		if(getTrailer.Quote_Status == "In Progress")
		{
			if(getTrailer.Where_Did_You_Find_Us == "Dealership")
			{
				updateMap.put("Stage","New Leads Business Referral");
			}
			else
			{
				updateMap.put("Stage","New Leads");
			}
		}
		if(getTrailer.Quote_Status == "Referral")
		{
			updateMap.put("Stage","UW/RTB Referral");
		}
		if(getTrailer.Quote_Status == "Return To Payment")
		{
			if(getTrailer.Where_Did_You_Find_Us == "Dealership")
			{
				updateMap.put("Stage","New Leads Business Referral");
			}
			else
			{
				updateMap.put("Stage","New Leads");
			}
		}
		if(getTrailer.Quote_Status == "Payment Pending")
		{
			if(getTrailer.Where_Did_You_Find_Us == "Dealership")
			{
				updateMap.put("Stage","New Leads Business Referral");
			}
			else
			{
				updateMap.put("Stage","New Leads");
			}
		}
		if(getTrailer.Quote_Status == "Completed")
		{
			updateMap.put("Stage","Won");
		}
		if(getTrailer.Quote_Status == "Saved")
		{
			updateMap.put("Stage","Client Saved Quote");
		}
		if(getTrailer.Quote_Status == "Return To Broker")
		{
			updateMap.put("Stage","UW/RTB Referral");
		}
		//------------------------------------------------------------------------------------------------------
		updateMap.put("Created_Source",getTrailer.Created_Source);
		updateMap.put("Lead_Source",getTrailer.Where_Did_You_Find_Us);
		updateMap.put("Policy_Number",getTrailer.Policy_Number);
		updateMap.put("Quote_Status",getTrailer.Quote_Status);
		updateMap.put("Quote_ID",getTrailer.Quote_ID);
		updateMap.put("Carrier",getTrailer.Carrier);
		updateMap.put("Referral_Reason",getTrailer.Referral_Reason);
		updateMap.put("How_many_trailers_would_you_like_to_insure",getTrailer.How_many_trailers_would_you_like_to_insure);
		updateMap.put("Inception_Date",getTrailer.Inception_Date);
		updateMap.put("Expiry_Date",getTrailer.Expiry_Date);
		updateMap.put("Last_Modified",if(getTrailer.Last_Modified_Date != null,getTrailer.Last_Modified_Date.toTime("yyyy-MM-dd'T'HH:mm:ss").toString("yyyy-MM-dd'T'HH:mm:ss-05:00"),null));
		updateMap.put("Payment_Date",if(getTrailer.Payment_Date != null,getTrailer.Payment_Date.toTime("yyyy-MM-dd'T'HH:mm:ss").toString("yyyy-MM-dd'T'HH:mm:ss-05:00"),null));
		updateMap.put("Agree_to_terms_and_conditions",getTrailer.Agree_to_terms_and_conditions);
		updateMap.put("Bind_Date",if(getTrailer.Bind_Date != null,getTrailer.Bind_Date.toTime("yyyy-MM-dd'T'HH:mm:ss").toString("yyyy-MM-dd'T'HH:mm:ss-05:00"),null));
		updateMap.put("Sales_Date_1",if(getTrailer.Sales_Date != null,getTrailer.Sales_Date.toTime("yyyy-MM-dd'T'HH:mm:ss").toString("yyyy-MM-dd'T'HH:mm:ss-05:00"),null));
		updateMap.put("Outstanding",getTrailer.Outstanding);
		updateMap.put("Prorated",getTrailer.Prorated);
		// ---- Newly Added ---
		updateMap.put("Reason_For_Rejection",getTrailer.Reason_For_Rejection1);
		//----------New field Map-------------
		updateMap.put("Tax",getTrailer.Total_Tax);
		updateMap.put("Total",getTrailer.Total_Payable_Premium_after_tax);
		updateMap.put("Premium",getTrailer.Total_Premium_before_tax);
		// ---- New Fields End ----
		if(getTrailer.Prorate_From != null)
		{
			updateMap.put("Prorate_From",getTrailer.Prorate_From);
		}
		updateMap.put("Waive_Fee",getTrailer.Waive_Fee);
		updateMap.put("Creator_ID",getTrailer.ID.tostring());
		if(getTrailer.Created_Source == "CREATOR")
		{
			updateMap.put("Owner",getTrailer.Deal_Owner.CRM_ID);
		}
		if(getTrailer.UPO_Data != null && getTrailer.UPO_Data != "")
		{
			upoData = "{" + getTrailer.UPO_Data + "}";
			if(upoData.getJson("upo_data") != null && upoData.getJson("upo_data") != "")
			{
				if(upoData.getJson("upo_data").get("card_number") != null && upoData.getJson("upo_data").get("card_number") != "")
				{
					cardNUmber = upoData.getJson("upo_data").get("card_number");
					lastCardNumber = cardNUmber.substring(cardNUmber.length() - 4,cardNUmber.length());
					updateMap.put("UPO_Card_Number",lastCardNumber);
				}
			}
		}
		updateMap.put("Type","Trailer");
		updateMap.put("Deal_Status",getTrailer.Deal_Type);
		updateMap.put("Postal_code_ZIP_Code_of_Mailing_address",getTrailer.Postal_code_ZIP_Code);
		updateMap.put("Policy_AutoRenewal_Status",getTrailer.Policy_AutoRenewal_Status);
		updateMap.put("Fee",getTrailer.Fee);
		updateMap.put("Product_Name","Trailer");
		updateMap.put("Quote_URL",getTrailer.Quote_Access_URL);
		updateMap.put("Business_Source",getTrailer.Business_Source);
		if(getTrailer.Deal_Type == "Quote" && getTrailer.Customer_ID != null)
		{
			// 			info "insude";
			fetchcust = Customer[ID == getTrailer.Customer_ID];
			// 			info fetchcust.Zoho_Crm_ID;
			//updateMap.put("Deal_s_Lead",fetchcust.Zoho_Crm_ID);
		}
		// 		info "no";
		// 		if(getTrailer.Additional_Names != null)
		// 		{
		// 			fetchcust = Customer[ID == getTrailer.Additional_Names.Customer_ID];
		// 			updateMap.put("Additional_Insured",if(fetchcust.Zoho_Crm_ID != null && fetchcust.Zoho_Crm_ID != "",fetchcust.Zoho_Crm_ID.tolong(),null));
		// 		}
		// 		updateMap.put("Workdrive_URL",getTrailer.Contact_Policy_Folder_Workdrive_Link);
		// 		updateMap.put("Workdrive_Folder_ID",getTrailer.Contact_Policy_Folder_Workdrive_Folder_ID);
		/*contact subform addition code added by sundaram on 08-03-2024*/
		if(getTrailer.Are_there_any_additional_names_on_the_trailer_ownership == "Yes")
		{
			updateMap.put("Any_Additional_Insured","Yes");
		}
		else
		{
			updateMap.put("Any_Additional_Insured","No");
		}
		if(getTrailer.Additional_Names != null)
		{
			sf_list = List();
			if(getTrailer.Zoho_Crm_ID != "" && getTrailer.Zoho_Crm_ID != null)
			{
				clearMap = Map();
				clearMap.put("Subform_1","");
				clearSubformRes = zoho.crm.updateRecord("Deals",getTrailer.Zoho_Crm_ID.tolong(),clearMap);
			}
			count = 0;
			additionalList = List();
			for each  AddName in getTrailer.Additional_Names
			{
				count = count + 1;
				additionalList.add("Additional Insured 1");
				if(count > 1)
				{
					additionalList.add("Additional Insured 2");
				}
				if(AddName.Customer_ID != null)
				{
					getCustomer = Customer[ID == AddName.Customer_ID];
				}
				if(getCustomer.count() > 0)
				{
					for each  customerSub in additionalList
					{
						subformMap = Map();
						// 						getLead = zoho.crm.getRecordById("Leads",getCustomer.Zoho_Crm_ID.toLong());
						// 						getContact = zoho.crm.getRecordById("Contacts",getCustomer.Zoho_Crm_ID.toLong());
						// 						if(getContact.get("id") != null)
						// 						{
						// 							subformMap.put("Additional_Insured",getCustomer.Zoho_Crm_ID.toLong());
						// 							subformMap.put("Type",customerSub);
						// 						}
						// 						else if(getLead.get("id") != null)
						// 						{
						// 							subformMap.put("Additional_Insured_Leads",getCustomer.Zoho_Crm_ID.toLong());
						// 							subformMap.put("Type",customerSub);
						// 						}
						if(getCustomer.Zoho_Crm_ID != null && getCustomer.Zoho_Crm_ID != "")
						{
							getLead = zoho.crm.getRecordById("Leads",getCustomer.Zoho_Crm_ID.toLong());
							if(getLead.get("id") != null)
							{
								subformMap.put("Additional_Insured_Leads",getCustomer.Zoho_Crm_ID.toLong());
								subformMap.put("Type",customerSub);
							}
						}
						if(getCustomer.Zoho_Crm_ID != null && getCustomer.Zoho_Crm_ID != "")
						{
							getContact = zoho.crm.getRecordById("Contacts",getCustomer.Zoho_Crm_ID.toLong());
							if(getContact.get("id") != null)
							{
								subformMap.put("Additional_Insured",getCustomer.Zoho_Crm_ID.toLong());
								subformMap.put("Type",customerSub);
							}
						}
					}
				}
				sf_list.add(subformMap);
			}
			if(sf_list.size() > 0)
			{
				updateMap.put("Subform_1",sf_list);
			}
			else
			{
				updateMap.put("Subform_1","");
			}
		}
		info updateMap;
		/*--------------------------------------------------------------*/
		// ---Update Deal Owner---- 
		// 	fect = Deal_Assign_Logic [ID != null];
		// 	for each rec in fect
		//     {
		// 		if (rec.Alphabets.contains(getTrailer.Insured_Last_Name.subString(0,1).upper()) == true ) 
		//         {
		// 			updateMap.put("Owner",rec.CRM_ID);
		//         }
		//     } 
		// ---Update  End Deal Owner---- 
		//----------End----------
		if(getTrailer.Zoho_Crm_ID != "" && getTrailer.Zoho_Crm_ID != null)
		{
			info "update";
			//--------Update-----------
			if(getTrailer.Policy_Status == "ACTIVE" || getTrailer.Policy_Status == "INACTIVE - RENEWAL PENDING" || getTrailer.Policy_Status == null || getTrailer.Policy_Status == "")
			{
				updateRes = zoho.crm.updateRecord("Deals",getTrailer.Zoho_Crm_ID.tolong(),updateMap,{"trigger":{"workflow"}});
				info updateRes;
				thisapp.Developer.addActivityLog("Trailer - Update Quote(CRM.Sync_TrailerQuote_Update)--" + trailerID.toString(),"Trailer - Update API Call Response",updateMap.toString(),updateRes.toString());
			}
		}
		thisapp.Developer.addActivityLog("Trailer - Update Quote(CRM.Sync_TrailerQuote_Update)--" + trailerID.toString(),"Trailer - Update Quote Information in CRM--" + trailerID.toString(),"Funcation Call Start","");
	}
	catch (e)
	{
		info e;
		thisapp.Developer.addDeveloperLog("TrailerQuote","Trailer - Update Quote(CRM.Sync_TrailerQuote_Update)--" + trailerID.toString(),"Trailer - Update Quote Information in CRM","",e,"creator");
	}
}