void CRM.Sync_BoatQuote(int boatID)
{
	/*
	created by Nambi Rajan
    Sync function to create/update deal in crm and convert to lead or update in lead/contact based on quote status
	*/
	try 
	{
		thisapp.Developer.addActivityLog("Boat - Create Quote(CRM.Sync_BoatQuote)--" + boatID.toString(),"Boat - Create Quote Information in CRM","Funcation Call Start","");
		// ---------------- Contact/Lead Infromation Checking ----------------
		getBoat = BoatQuote[ID == boatID];
		if(getBoat.count() > 0)
		{
			updateMap = Map();
			fetchLayout = Layout[Layout_Name == "Boat Policy"];
			if(fetchLayout.count() > 0)
			{
				layoutid = Map();
				layoutid.put("id",fetchLayout.Layout_ID.tolong());
				updateMap.put("Layout",layoutid);
			}
			/*
			if(getBoat.Deal_Type == "Policy")
			{
				if(getBoat.Customer_ID != null)
				{
					getCustomer = Customer[ID == getBoat.Customer_ID];
					updateMap.put("Contact_Name",getCustomer.Zoho_Crm_ID);
					//	updateMap.put("Insured_Name",getCustomer.Zoho_Crm_ID);
				}
			}
			else if(getBoat.Deal_Type == "Quote")
			{
				if(getBoat.Customer_ID != null)
				{
					getCustomer = Customer[ID == getBoat.Customer_ID];
					updateMap.put("Deal_s_Lead",getCustomer.Zoho_Crm_ID);
				}
			}
			*/
			getCustomer = Customer[ID == getBoat.Customer_ID];
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
			// 			if(getCustomer.count() > 0)
			// 			{
			// 				if(getCustomer.Customer_Type == "Lead")
			// 				{
			// 					updateMap.put("Deal_s_Lead",getCustomer.Zoho_Crm_ID);
			// 				}
			// 				else
			// 				{
			// 					updateMap.put("Contact_Name",getCustomer.Zoho_Crm_ID);
			// 				}
			// 			}
			if(getBoat.Please_select_the_province_your_boat_is_used_in == "Alberta")
			{
				updateMap.put("Province","AB");
			}
			if(getBoat.Please_select_the_province_your_boat_is_used_in == "British Columbia")
			{
				updateMap.put("Province","BC");
			}
			if(getBoat.Please_select_the_province_your_boat_is_used_in == "Ontario")
			{
				updateMap.put("Province","ON");
			}
			if(getBoat.Please_select_the_province_your_boat_is_used_in == "Saskatchewan")
			{
				updateMap.put("Province","SK");
			}
			updateMap.put("Policy_Status",getBoat.Policy_Status);
			if(!isNull(getBoat.Policy_Number))
			{
				updateMap.put("Deal_Name",getBoat.Policy_Number);
			}
			else
			{
				updateMap.put("Deal_Name",getBoat.Quote_ID);
			}
			AdditionalInsured1 = "";
			AdditionalInsured2 = "";
			if(getBoat.Additional_Names != null)
			{
				getAdditionalNames = Additional_Names[ID == getBoat.Additional_Names];
				if(getAdditionalNames.count() > 0)
				{
					AdditionalInsured1 = getAdditionalNames.Additional_Insured_First_Name;
					AdditionalInsured2 = getAdditionalNames.Additional_Insured_Last_Name;
				}
			}
			// 			updateMap.put("Additional_Insured_1",AdditionalInsured1);
			// 			updateMap.put("Additional_Insured_2",AdditionalInsured2);
			// 		info updateMap;
			//----------------Bucket Name Mapping in CRM Stage------------------------------------------------------
			if(getBoat.Quote_Status == "Created")
			{
				updateMap.put("Stage","New Leads");
			}
			if(getBoat.Quote_Status == "In Progress")
			{
				if(getBoat.Where_Did_You_Find_Us == "Dealership")
				{
					updateMap.put("Stage","New Leads Business Referral");
				}
				else
				{
					updateMap.put("Stage","New Leads");
				}
			}
			if(getBoat.Quote_Status == "Referral")
			{
				updateMap.put("Stage","UW/RTB Referral");
			}
			if(getBoat.Quote_Status == "Return To Payment")
			{
				if(getBoat.Where_Did_You_Find_Us == "Dealership")
				{
					updateMap.put("Stage","New Leads Business Referral");
				}
				else
				{
					updateMap.put("Stage","New Leads");
				}
			}
			if(getBoat.Quote_Status == "Saved")
			{
				updateMap.put("Stage","Client Saved Quote");
			}
			if(getBoat.Quote_Status == "Return To Broker")
			{
				updateMap.put("Stage","UW/RTB Referral");
			}
			if(getBoat.Quote_Status == "Payment Pending")
			{
				if(getBoat.Where_Did_You_Find_Us == "Dealership")
				{
					updateMap.put("Stage","New Leads Business Referral");
				}
				else
				{
					updateMap.put("Stage","New Leads");
				}
			}
			if(getBoat.Quote_Status == "Completed")
			{
				updateMap.put("Stage","Won");
			}
			//------------------------------------------------------------------------------------------------------
			updateMap.put("Created_Source",getBoat.Created_Source);
			updateMap.put("Lead_Source",getBoat.Where_Did_You_Find_Us);
			updateMap.put("Policy_Number",getBoat.Policy_Number);
			updateMap.put("Quote_Status",getBoat.Quote_Status);
			updateMap.put("Quote_ID",getBoat.Quote_ID);
			// 			updateMap.put("Additional_Insured_1",getBoat.Insured_First_Name);
			// 			updateMap.put("Additional_Insured_2",getBoat.Insured_Last_Name);
			updateMap.put("Carrier",getBoat.Carrier);
			//	updateMap.put("Boat_approve_for_being_over_15_years_old",getBoat.Boat_approve_for_being_over_15_years_old);
			updateMap.put("Referral_Reason",getBoat.Referral_Reason);
			updateMap.put("How_many_boats_would_you_like_to_insure",getBoat.How_many_boats_would_you_like_to_insure);
			updateMap.put("Inception_Date",getBoat.Inception_Date);
			updateMap.put("Expiry_Date",getBoat.Expiry_Date);
			updateMap.put("Agree_to_terms_and_conditions",getBoat.Agree_to_terms_and_conditions);
			updateMap.put("Bind_Date",if(getBoat.Bind_Date != null,getBoat.Bind_Date.toTime("yyyy-MM-dd'T'HH:mm:ss").toString("yyyy-MM-dd'T'HH:mm:ss-05:00"),null));
			updateMap.put("Sales_Date_1",if(getBoat.Sales_Date != null,getBoat.Sales_Date.toTime("yyyy-MM-dd'T'HH:mm:ss").toString("yyyy-MM-dd'T'HH:mm:ss-05:00"),null));
			updateMap.put("Last_Modified",if(getBoat.Last_Modified != null,getBoat.Last_Modified.toTime("yyyy-MM-dd'T'HH:mm:ss").toString("yyyy-MM-dd'T'HH:mm:ss-05:00"),null));
			//updateMap.put("Please_select_the_province_your_boat_is_used_in1",getBoat.Please_select_the_province_your_boat_is_used_in);
			// 			updateMap.put("Trailer_Coverage_Current",getBoat.Trailer_Coverage_Current);
			// 			updateMap.put("Liability_coverage_Current",getBoat.Liability_Coverage_Current);
			// 			updateMap.put("Overland_Protection_Coverage_current",getBoat.Overland_Protection_Coverage_Current);
			// 			updateMap.put("Golf_Cart_Coverage_Current",getBoat.Golf_Cart_Coverage_Current);
			// 			updateMap.put("Premium_Subtotal_current",getBoat.Premium_Subtotal_current);
			// 			updateMap.put("Sales_Tax_Current",getBoat.Sales_Tax_Current);
			// 			updateMap.put("Current_Total",getBoat.Current_Total);
			updateMap.put("Outstanding",getBoat.Outstanding);
			updateMap.put("Prorated",getBoat.Prorated);
			if(getBoat.Prorate_From != null)
			{
				updateMap.put("Prorate_From",getBoat.Prorate_From);
			}
			updateMap.put("Waive_Fee",getBoat.Waive_Free);
			// ---- Newly Added -----
			// 			updateMap.put("Is_Watercraft_Ineligible_For_Coverage",getBoat.Is_Watercraft_Ineligible_For_Coverage);
			// 			updateMap.put("Does_Watercraft_Meet_Safety_And_Usage_Requirements",getBoat.Does_Watercraft_Meet_Safety_And_Usage_Requirements);
			// 			updateMap.put("Is_Applicant_Ineligible_For_Coverage",getBoat.Is_Applicant_Ineligible_For_Coverage);
			// 			updateMap.put("Is_Operator_Ineligible_For_Coverage",getBoat.Is_Operator_Ineligible_For_Coverage);
			//info getBoat.Payment_Date;
			updateMap.put("Payment_Date",if(getBoat.Payment_Date != null,getBoat.Payment_Date.toTime("yyyy-MM-dd'T'HH:mm:ss").toString("yyyy-MM-dd'T'HH:mm:ss-05:00"),null));
			//yyyy-MM-ddTHH:mm:ss±HH:mm
			//info "Payment date ----" + getBoat.Payment_Date.toTime("yyyy-MM-dd'T'HH:mm:ss").toString("yyyy-MM-dd'T'HH:mm:ss-05:00");
			// 			paymentDate = getBoat.Payment_Date.toString("MMM DD,YYYY");
			// 			paymentTime = getBoat.Payment_Date.toString("HH:mm:ss");
			// 			paymentFormat=paymentDate +" " +paymentTime;
			// 			info paymentFormat ;
			//info "Payment time ----" + getBoat.Payment_Date.toString("HH:mm:ss");
			updateMap.put("Reason_For_Rejection",getBoat.Reason_For_Rejection1);
			updateMap.put("Product_Name","Watercraft");
			updateMap.put("Deal_Status",getBoat.Deal_Type);
			//	updateMap.put("Enter_the_friend_s_name",getBoat.Name);
			//---New Map----------
			updateMap.put("Tax",getBoat.Total_Tax);
			updateMap.put("Total",getBoat.Total_Payable_Premium_after_tax);
			updateMap.put("Premium",getBoat.Total_Premium_before_tax);
			// 			updateMap.put("Premium",getBoat.Premium_Subtotal_current);
			// 			updateMap.put("Tax",getBoat.Sales_Tax_Current);
			// 			updateMap.put("Total",getBoat.Current_Total);
			//-------------------------Missing Fields Mapping ----------------------------------------------
			updateMap.put("Postal_code_ZIP_Code_of_Mailing_address",getBoat.Postal_code_ZIP_Code);
			//updateMap.put("Bind_Date",getBoat.Bind_Date);
			updateMap.put("Fee",getBoat.Fee);
			updateMap.put("Renewal_Eligibility",getBoat.Renewal_Eligibility);
			updateMap.put("Type","Boat");
			updateMap.put("Policy_AutoRenewal_Status",getBoat.Policy_AutoRenewal_Status);
			updateMap.put("Workdrive_URL",getBoat.Contact_Policy_Folder_Workdrive_Link);
			updateMap.put("Workdrive_Folder_ID",getBoat.Contact_Policy_Folder_Workdrive_Folder_ID);
			updateMap.put("Product_Name","Watercraft");
			updateMap.put("Quote_URL",getBoat.Quote_Access_URL1);
			updateMap.put("Business_Source",getBoat.Business_Source);
			if(getBoat.Created_Source == "CREATOR")
			{
				updateMap.put("Owner",getBoat.Deal_Owner.CRM_ID);
			}
			if(getBoat.Are_there_any_additional_names_on_the_boat_ownership == "Yes")
			{
				updateMap.put("Any_Additional_Insured","Yes");
			}
			else
			{
				updateMap.put("Any_Additional_Insured","No");
			}
			/*contact subform addition code added by sundaram on 08-03-2024*/
			sf_list = List();
			additionalList = List();
			if(getBoat.Additional_Names != null)
			{
				count = 0;
				for each  AddName in getBoat.Additional_Names
				{
					count = count + 1;
					if(AddName.Customer_ID != null)
					{
						getCustomer = Customer[ID == AddName.Customer_ID];
					}
					additionalList.add("Additional Insured 1");
					if(count > 1)
					{
						additionalList.add("Additional Insured 2");
					}
					if(getCustomer.count() > 0)
					{
						for each  customerSub in additionalList
						{
							subformMap = Map();
							getLead = zoho.crm.getRecordById("Leads",getCustomer.Zoho_Crm_ID.toLong());
							getContact = zoho.crm.getRecordById("Contacts",getCustomer.Zoho_Crm_ID.toLong());
							if(getContact.get("id") != null)
							{
								subformMap.put("Additional_Insured",getCustomer.Zoho_Crm_ID.toLong());
								subformMap.put("Type",customerSub);
							}
							else if(getLead.get("id") != null)
							{
								subformMap.put("Additional_Insured_Leads",getCustomer.Zoho_Crm_ID.toLong());
								subformMap.put("Type",customerSub);
							}
						}
						sf_list.add(subformMap);
					}
				}
				if(sf_list.size() > 0)
				{
					updateMap.put("Subform_1",sf_list);
				}
				// 					else
				// 					{
				// 						updateMap.put("Subform_1","");
				// 					}
			}
			/*------------------------------------------------*/
			if(getBoat.Deal_Type == "Quote" && getBoat.Customer_ID != null)
			{
				fetchcust = Customer[ID == getBoat.Customer_ID];
				//updateMap.put("Deal_s_Lead",fetchcust.Zoho_Crm_ID);
			}
			// 				if(getBoat.Additional_Names != null)
			// 				{
			// 					fetchcust = Customer[ID == getBoat.Additional_Names.Customer_ID];
			// 					updateMap.put("Additional_Insured",if(fetchcust.Zoho_Crm_ID != null && fetchcust.Zoho_Crm_ID != "",fetchcust.Zoho_Crm_ID.tolong(),null));
			// 				}
			//----------------------------------------------------------------------------------------------
			// --- end 
			updateMap.put("Creator_ID",getBoat.ID.tostring());
			if(getBoat.UPO_Data != null && getBoat.UPO_Data != "")
			{
				upoData = "{" + getBoat.UPO_Data + "}";
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
			// ---Update Deal Owner---- 
			// 	fect = Deal_Assign_Logic [ID != null];
			// 	for each rec in fect
			//     {
			// 		if (rec.Alphabets.contains(getBoat.Insured_Last_Name.subString(0,1).upper()) == true ) 
			//         {
			// 			updateMap.put("Owner",rec.CRM_ID);
			//         }
			//     } 
			// ---Update  End Deal Owner---- 
			if(getBoat.Zoho_Crm_ID == "")
			{
				// Create
				createRes = zoho.crm.createRecord("Deals",updateMap,{"trigger":{"workflow"}});
				info createRes;
				thisapp.Developer.addActivityLog("Boat - Create Quote(CRM.Sync_BoatQuote)--" + boatID.toString(),"Boat - Create API Call",updateMap.toString(),createRes.toString());
				if(createRes != null)
				{
					getBoat.Zoho_Crm_ID=createRes.get("id").tostring();
				}
			}
		}
		thisapp.Developer.addActivityLog("Boat - Create Quote(CRM.Sync_BoatQuote)--" + boatID.toString(),"Boat - Create Quote Information in CRM","Funcation Call End","");
	}
	catch (e)
	{
		info e;
		thisapp.Developer.addDeveloperLog("BoatQuote","Boat - Create Quote(CRM.Sync_BoatQuote)--" + boatID.toString(),"Boat - Create Quote Information Error","",e,"Creator");
	}
}