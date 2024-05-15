if(input.Inception_Date == null)
	{
		input.Expiry_Date = null;
	}
	if(input.Payment_Link_URL != "" && input.Payment_Link_URL != null)
	{
		mp = Map();
		mp.put("value","URL");
		mp.put("url",input.Payment_Link_URL);
		mp.put("title",input.Payment_Link_URL);
		datamap = Map();
		datamap.put("Payment_URL",mp);
		otherMap = Map();
		response = zoho.creator.updateRecord("service_recprotect","quotation","Policy_Premium_Generating_BoatQuote_Report",input.ID,datamap,otherMap,"creator");
	}
	//---------------referral reason---------
	if(input.Boat != null)
	{
		overAllReferralReason = "";
		count = 0;
		for each  boat in input.Boat
		{
			referralReason = "";
			count = count + 1;
			if(boat.Referral_Replacement_cost == true && boat.RCV_Exceeding_Limits_UW_Approved == false)
			{
				referralReason = referralReason + "Replacment cost";
			}
			if(boat.Referral_Actual_Cash_Value == true && boat.ACV_Exceeding_Limits_UW_Approved == false)
			{
				referralReason = referralReason + "Actual cash value";
			}
			if(boat.Referral_Boat_Model_Year == true)
			{
				referralReason = referralReason + "Boat Model Year";
			}
			if(boat.Referral_Principal_operator_20_years == true)
			{
				referralReason = referralReason + "Principal Operator more than 20 years";
			}
			if(boat.Referral_Has_the_principal_operator_had_their_driver_s_license_suspended == true)
			{
				referralReason = referralReason + "Has the principal operator had their driver's license suspended";
			}
			if(boat.Referral_Does_the_operator_hold_a_Pleasure_Craft_Operator_Card_PCOC == true)
			{
				referralReason = referralReason + "Does the operator hold a Pleasure Craft Operator Card PCOC";
			}
			if(boat.Referral_Watercraft_Type == true)
			{
				referralReason = referralReason + "Watercraft Type";
			}
			if(boat.Referral_How_many_motor_vehicle_claims == true)
			{
				referralReason = referralReason + "How many motor vehicle claims";
			}
			if(boat.Referral_How_many_motor_vehicle_Convictions == true)
			{
				referralReason = referralReason + "How many motor vehicle Convictions";
			}
			if(boat.Referral_Hull_Type == true)
			{
				referralReason = referralReason + "Hull Type";
			}
			if(boat.Referral_Tender_lenght == true)
			{
				referralReason = referralReason + "Tender lenght";
			}
			if(boat.Referral_Main_engine == true)
			{
				referralReason = referralReason + "Main engine 1";
			}
			if(Boat.Referral_Main_engine_2 == true)
			{
				referralReason = referralReason + "Main engine 2";
			}
			if(boat.Referral_Do_any_of_the_above_statements_apply_to_the_watercraft == true)
			{
				referralReason = referralReason + "Do any of the above statements apply to the watercraft1";
			}
			if(boat.Referral_Do_any_of_the_above_statements_apply_to_the_watercraft1 == true)
			{
				referralReason = referralReason + "Do any of the above statements apply to the watercraft2";
			}
			if(boat.Referral_Do_any_of_the_above_apply_to_the_watercraft == true)
			{
				referralReason = referralReason + "Do any of the above apply to the watercraft";
			}
			if(boat.Referral_Do_any_of_the_above_apply_to_the_Applicant == true)
			{
				referralReason = referralReason + "Do any of the above apply to the Applicant";
			}
			if(boat.Referral_Length == true)
			{
				referralReason = referralReason + "Length";
			}
			if(boat.Referral_Trailer_Length == true)
			{
				referralReason = referralReason + "Trailer Length";
			}
			boat.Referral_Reason="Referral triggers for - " + referralReason;
			referralREasontemp = referralReason;
			if(referralREasontemp != "")
			{
				boat.Referral_Status="Referral";
			}
			else
			{
				boat.Referral_Status="Return To Payment";
			}
			if(referralReason != "")
			{
				overAllReferralReason = overAllReferralReason + "\n#" + count + " Referral triggers for - " + referralReason;
			}
		}
		if(overAllReferralReason != "" && overAllReferralReason != null)
		{
			input.Quote_Status = "Referral";
			input.Changes_Approved = "No";
			input.Referral_Reason = overAllReferralReason;
		}
		else
		{
			input.Changes_Approved = "Yes";
			//input.Quote_Status = "Return To Payment";
			input.Referral_Reason = " ";
		}
	}
	if(input.Quote_Status == "Referral")
	{
		input.Referral_Status = true;
	}
	else
	{
		input.Referral_Status = false;
	}
	//------------Update the quote status----------------- 
	// if(input.Boat_approve_for_being_over_15_years_old1 == true && input.Quote_Status == "Referral")
	// {
	// 	input.Quote_Status = "In Progress";
	// }
	if(input.Inception_Date != null)
	{
		input.Bind_Date = input.Inception_Date;
	}
	if(input.Payment_Date != null)
	{
		input.Sales_Date = input.Payment_Date;
	}
	//-----------------------Customer Create and Update-------------------
	customerlist = List();
	if(input.Customer_ID != null)
	{
		fetchcustomers = Customer[ID == input.Customer_ID];
		//input.Customer_ID = fetchcustomers.ID;
		fetchcustomers.First_Name=ifnull(input.Insured_First_Name,"");
		fetchcustomers.Last_Name=ifnull(input.Insured_Last_Name,"");
		fetchcustomers.Email=ifnull(input.Email,"");
		fetchcustomers.Phone_Number=ifnull(input.Phone_Number,"");
		fetchcustomers.DOB=ifnull(input.Date_of_Birth,null);
		customerlist.add(fetchcustomers.ID);
	}
	else
	{
		fetchcustomer = Customer[Email == input.Email];
		if(fetchcustomer.count() > 0)
		{
			input.Customer_ID = fetchcustomer.ID;
			fetchcustomer.First_Name=ifnull(input.Insured_First_Name,"");
			fetchcustomer.Last_Name=ifnull(input.Insured_Last_Name,"");
			fetchcustomer.Email=ifnull(input.Email,"");
			fetchcustomer.Phone_Number=ifnull(input.Phone_Number,"");
			fetchcustomer.DOB=ifnull(input.Date_of_Birth,null);
			customerlist.add(fetchcustomer.ID);
		}
		else
		{
			insertCustomer = insert into Customer
			[
				Email=input.Email
				First_Name=ifnull(input.Insured_First_Name,"")
				Last_Name=ifnull(input.Insured_Last_Name,"")
				Phone_Number=ifnull(input.Phone_Number,"")
				DOB=ifnull(input.Date_of_Birth,null)
				Added_User=zoho.loginuser
			];
			input.Customer_ID = insertCustomer;
			customerlist.add(insertCustomer);
		}
	}
	if(input.Additional_Names != null)
	{
		for each  customers in input.Additional_Names
		{
			if(customers.Customer_ID == null)
			{
				insertCustomers = insert into Customer
				[
					Email=customers.Email
					First_Name=ifnull(customers.Additional_Insured_First_Name,"")
					Last_Name=ifnull(customers.Additional_Insured_Last_Name,"")
					Phone_Number=ifnull(customers.Phone_Number,"")
					DOB=ifnull(customers.DOB,null)
					Added_User=zoho.loginuser
				];
				customers.Customer_ID=insertCustomers;
				customerlist.add(insertCustomers);
			}
			else
			{
				fetchAddCustomers = Customer[ID == customers.Customer_ID];
				fetchAddCustomers.First_Name=ifnull(customers.Additional_Insured_First_Name,"");
				fetchAddCustomers.Last_Name=ifnull(customers.Additional_Insured_Last_Name,"");
				fetchAddCustomers.Email=ifnull(customers.Email,"");
				fetchAddCustomers.Phone_Number=ifnull(customers.Phone_Number,"");
				fetchAddCustomers.DOB=ifnull(customers.DOB,null);
				customerlist.add(fetchAddCustomers.ID);
			}
		}
	}
	//delete from Boat[BoatQuote == input.Select_Policy];
	//--------------Boat Mainform Update Function--------------
	if(input.Referral_Status == false && input.Changes_Approved == "Yes")
	{
		fetchBoat = BoatQuote[ID == input.Select_Policy];
		if(fetchBoat.count() > 0)
		{
			delete from Boat[BoatQuote == input.Select_Policy];
			//--------------------------Basic Info-----------------------------
			fetchBoat.Quote_ID=input.Quote_ID;
			fetchBoat.Policy_Number=input.Policy_Number;
			fetchBoat.Quote_Status=input.Quote_Status;
			fetchBoat.Policy_Status=input.Policy_Status;
			fetchBoat.Policy_AutoRenewal_Status=input.Policy_AutoRenewal_Status;
			fetchBoat.Deal_Type=input.Deal_Type;
			fetchBoat.Referral_Reason=input.Referral_Reason;
			fetchBoat.Carrier=input.Carrier;
			//--------------------------Customer Information-----------------------------
			fetchBoat.Customer_ID=input.Customer_ID;
			fetchBoat.Insured_First_Name=input.Insured_First_Name;
			fetchBoat.Insured_Middle_Name=input.Insured_Middle_Name;
			fetchBoat.Insured_Last_Name=input.Insured_Last_Name;
			fetchBoat.Email=input.Email;
			//-------------------Updating Phone and Email to customer---------------
			customInfo = Customer[ID == input.Customer_ID];
			if(input.Confirmed_Email_Phone == true)
			{
				updateMap = Map();
				if(input.Update_Email != null && input.Update_Email != "")
				{
					customInfo.Email=input.Update_Email;
					fetchBoat.Email=input.Update_Email;
					customerlist.add(customInfo.ID);
					updateMap.put("Email",input.Update_Email);
				}
				if(input.Update_Phone != null && input.Update_Phone != "")
				{
					customInfo.Phone_Number=input.Update_Phone;
					fetchBoat.Phone_Number=input.Update_Phone;
					customerlist.add(customInfo.ID);
					updateMap.put("Phone",input.Update_Phone);
				}
				//updateResp = zoho.crm.updateRecord("Contacts",customInfo.Zoho_Crm_ID.toLong(),updateMap);
			}
			fetchBoat.Phone_Number=input.Phone_Number;
			fetchBoat.Link_Customer=input.Link_Customer;
			fetchBoat.Date_of_Birth=input.Date_of_Birth;
			fetchBoat.Where_Did_You_Find_Us=input.Where_Did_You_Find_Us;
			fetchBoat.Name=input.Name;
			fetchBoat.Name_of_Dealership=input.Name_of_Dealership;
			fetchBoat.Name_of_Campground=input.Name_of_Campground;
			fetchBoat.Name_of_Marina=input.Name_of_Marina;
			fetchBoat.Tell_us_more=input.Tell_us_more;
			fetchBoat.Are_there_any_additional_names_on_the_boat_ownership=input.Are_there_any_additional_names_on_the_boat_ownership;
			//--------------------------Quote Information-----------------------------
			fetchBoat.Boat_approve_for_being_over_15_years_old=input.Boat_approve_for_being_over_15_years_old;
			fetchBoat.Please_select_the_province_your_boat_is_used_in=input.Please_select_the_province_your_boat_is_used_in;
			fetchBoat.How_many_boats_would_you_like_to_insure=input.How_many_boats_would_you_like_to_insure;
			//--------------Additional Names Subform-----------------
			additional_names = Collection();
			for each  rec in input.Additional_Names
			{
				Row1 = BoatQuote.Additional_Names();
				Row1.Customer_ID=rec.Customer_ID;
				Row1.Email=rec.Email;
				Row1.Link_Customer=rec.Link_Customer;
				Row1.Phone_Number=rec.Phone_Number;
				Row1.DOB=rec.DOB;
				additional_names.insert(Row1);
			}
			fetchBoat.Additional_Names.clear();
			fetchBoat.Additional_Names.insert(additional_names);
			//--------------Boat subform -----------------
			// 	for each  row2 in fetchBoat.Boat
			// 	{
			boatCollection = Collection();
			for each  boatPremiumSubform in input.Boat
			{
				row2 = BoatQuote.Boat();
				row2.Select_the_type_of_watercraft=boatPremiumSubform.Select_the_type_of_watercraft;
				row2.Boat_Model_Year=boatPremiumSubform.Boat_Model_Year;
				row2.Boat_Manufacturer=boatPremiumSubform.Boat_Manufacturer;
				row2.Boat_Model=boatPremiumSubform.Boat_Model;
				row2.Replacement_Cost=boatPremiumSubform.Replacement_Cost;
				row2.Actual_Cash_Value=boatPremiumSubform.Actual_Cash_Value;
				row2.Is_the_Principal_Operator_the_same_as_the_Applicant_Owner=boatPremiumSubform.Is_the_Principal_Operator_the_same_as_the_Applicant_Owner;
				row2.First_Name=boatPremiumSubform.First_Name;
				row2.Last_Name=boatPremiumSubform.Last_Name;
				row2.Date_of_Birth=boatPremiumSubform.Date_of_Birth;
				row2.Principal_operator_s_years_of_boating_experience_with_vessels_of_a_similar_size_and_type=boatPremiumSubform.Principal_operator_s_years_of_boating_experience_with_vessels_of_a_similar_size_and_type;
				row2.Does_the_operator_hold_a_Pleasure_Craft_Operator_s_Card_PCOC=boatPremiumSubform.Does_the_operator_hold_a_Pleasure_Craft_Operator_s_Card_PCOC;
				row2.Select_coverage_for_policy=boatPremiumSubform.Select_coverage_for_policy;
				row2.Premium_Per_Year=boatPremiumSubform.Premium_Per_Year;
				row2.Deductible=boatPremiumSubform.Deductible;
				row2.Personal_Effects_Coverage=boatPremiumSubform.Personal_Effects_Coverage;
				row2.Navigational_Equipment_Coverage=boatPremiumSubform.Navigational_Equipment_Coverage;
				row2.Emergency_Towing_Limit=boatPremiumSubform.Emergency_Towing_Limit;
				row2.Loss_of_Use_Limit=boatPremiumSubform.Loss_of_Use_Limit;
				row2.Recalculate=boatPremiumSubform.Recalculate;
				row2.Liability_coverage=boatPremiumSubform.Liability_coverage;
				row2.Boat_Coverage=boatPremiumSubform.Boat_Coverage;
				row2.Salvage=boatPremiumSubform.Salvage;
				row2.Pollution=boatPremiumSubform.Pollution;
				row2.Removal_of_Wreckage=boatPremiumSubform.Removal_of_Wreckage;
				// new added fields by nambi
				row2.Show_Premium_Breakdown=boatPremiumSubform.Show_Premium_Breakdown;
				row2.Boat_Operator_age_20_25_prem=boatPremiumSubform.Boat_Operator_age_20_25_prem;
				row2.Boat_Base_Premium=boatPremiumSubform.Boat_Base_Premium;
				row2.Boat_age_gt_15_prem=boatPremiumSubform.Boat_age_gt_15_prem;
				row2.Boat_operator_gt_25_lt_3years_exp_prem=boatPremiumSubform.Boat_operator_gt_25_lt_3years_exp_prem;
				row2.Navi_eqip_prem=boatPremiumSubform.Navi_eqip_prem;
				row2.Endorsement_prem=boatPremiumSubform.Endorsement_prem;
				row2.Boat_Liability_Prem=boatPremiumSubform.Boat_Liability_Prem;
				row2.Deductible_Prem=boatPremiumSubform.Deductible_Prem;
				row2.Pers_eff_prem=boatPremiumSubform.Pers_eff_prem;
				row2.Total_Prem=boatPremiumSubform.Total_Prem;
				//
				row2.Uninsured_Underinsured_Boater_Endorsement=boatPremiumSubform.Uninsured_Underinsured_Boater_Endorsement;
				row2.Do_any_of_the_above_statements_apply_to_the_watercraft_Atlantic_Pacific=boatPremiumSubform.Do_any_of_the_above_statements_apply_to_the_watercraft_Atlantic_Pacific;
				row2.Do_any_of_the_above_statements_apply_to_the_watercraft_engine_Parasailing_propane=boatPremiumSubform.Do_any_of_the_above_statements_apply_to_the_watercraft_engine_Parasailing_propane;
				row2.Do_any_of_the_above_apply_to_the_watercraft_safety_requirements=boatPremiumSubform.Do_any_of_the_above_apply_to_the_watercraft_safety_requirements;
				row2.Do_any_of_the_above_apply_to_the_applicant_Owner_primary_residence=boatPremiumSubform.Do_any_of_the_above_apply_to_the_applicant_Owner_primary_residence;
				row2.Has_the_principal_operator_had_any_motor_vehicle_claims_in_the_last_5_years=boatPremiumSubform.Has_the_principal_operator_had_any_motor_vehicle_claims_in_the_last_5_years;
				row2.How_many_motor_vehicle_claims=boatPremiumSubform.How_many_motor_vehicle_claims;
				row2.Has_the_principal_operator_had_any_motor_vehicle_convictions_in_the_last_3_years=boatPremiumSubform.Has_the_principal_operator_had_any_motor_vehicle_convictions_in_the_last_3_years;
				row2.How_many_motor_vehicle_convictions=boatPremiumSubform.How_many_motor_vehicle_convictions;
				row2.Has_the_principal_operator_had_their_driver_s_license_suspended=boatPremiumSubform.Has_the_principal_operator_had_their_driver_s_license_suspended;
				row2.Tell_us_more=boatPremiumSubform.When;
				row2.Lengths=boatPremiumSubform.Lengths;
				row2.Hull_ID_Serial=boatPremiumSubform.Hull_ID_Serial;
				row2.Hull_Type=boatPremiumSubform.Hull_Type;
				row2.Other_Hull_Type=boatPremiumSubform.Other_Hull_Type;
				row2.Estimated_max_speed=boatPremiumSubform.Estimated_max_speed;
				row2.Types=boatPremiumSubform.Types;
				row2.Enter_the_type=boatPremiumSubform.Enter_the_type;
				row2.Fuel_Type=boatPremiumSubform.Fuel_Type;
				row2.Model_Year=boatPremiumSubform.Model_Year;
				row2.Manufacturer=boatPremiumSubform.Manufacturer;
				row2.Serial=boatPremiumSubform.Serial;
				row2.Horsepower=boatPremiumSubform.Horsepower;
				row2.Types1=boatPremiumSubform.Types1;
				row2.Enter_the_type1=boatPremiumSubform.Enter_the_type1;
				row2.Fuel_Type1=boatPremiumSubform.Fuel_Type1;
				row2.Model_Year1=boatPremiumSubform.Model_Year1;
				row2.Manufacturer1=boatPremiumSubform.Manufacturer1;
				row2.Serial1=boatPremiumSubform.Serial1;
				row2.Horsepower1=boatPremiumSubform.Horsepower1;
				row2.Add_a_trailer=boatPremiumSubform.Add_a_trailer;
				row2.Trailer_Value=boatPremiumSubform.Trailer_Value;
				row2.Trailer_Model_Year=boatPremiumSubform.Trailer_Model_Year;
				row2.Trailer_Manufacturer=boatPremiumSubform.Trailer_Manufacturer;
				row2.Trailer_VIN=boatPremiumSubform.Trailer_VIN;
				row2.Trailer_Length=boatPremiumSubform.Trailer_Length;
				row2.Add_a_tender=boatPremiumSubform.Add_a_tender;
				row2.Tender_Value=boatPremiumSubform.Tender_Value;
				row2.Tender_Model_Year=boatPremiumSubform.Tender_Model_Year;
				row2.Tender_Manufacturer=boatPremiumSubform.Tender_Manufacturer;
				row2.Tender_Serial=boatPremiumSubform.Tender_Serial;
				row2.Tender_Length=boatPremiumSubform.Tender_Length;
				row2.Add_an_auxiliary_motor=boatPremiumSubform.Add_an_auxiliary_motor;
				row2.Aux_Engine_Value=boatPremiumSubform.Aux_Engine_Value;
				row2.Aux_Engine_Model_Year=boatPremiumSubform.Aux_Engine_Model_Year;
				row2.Aux_Engine_Manufacturer=boatPremiumSubform.Aux_Engine_Manufacturer;
				row2.Auxiliary_Engine_Serial=boatPremiumSubform.Auxiliary_Engine_Serial;
				row2.Aux_Engine_HP_Thrust=boatPremiumSubform.Aux_Engine_HP_Thrust;
				row2.BoatQuote=boatPremiumSubform.BoatQuote;
				row2.Is_this_boat_financed=boatPremiumSubform.Is_this_boat_financed;
				fetchLein = Lein_holder_Details[ID == boatPremiumSubform.Lein_holder];
				row2.Lein_holder=fetchLein.ID;
				row2.Name_of_Financier=boatPremiumSubform.Name_of_Financier;
				row2.Address_line1=boatPremiumSubform.Address_line1;
				row2.Address_line2=boatPremiumSubform.Address_line2;
				row2.City=boatPremiumSubform.City;
				row2.Province=boatPremiumSubform.Province;
				row2.Postal_Code=boatPremiumSubform.Postal_Code;
				row2.Country=boatPremiumSubform.Country;
				row2.Boat_Model_Age=boatPremiumSubform.Boat_Model_Age;
				row2.Eligible_for_Auto_Renewal=boatPremiumSubform.Eligible_for_Auto_Renewal;
				row2.Underwritting_Approved=boatPremiumSubform.Underwritting_Approved;
				row2.Is_auto_approved_for_next_5_years=boatPremiumSubform.Is_auto_approved_for_next_5_years;
				row2.Approved_Year=boatPremiumSubform.Approved_Year;
				row2.Boat_Status=boatPremiumSubform.Boat_Status;
				row2.Opt_In_for_RCV=boatPremiumSubform.Opt_In_for_RCV;
				//New added fields for admin related changes
				row2.Admin_Override=boatPremiumSubform.Admin_Override;
				row2.PO_admin_License_Override=boatPremiumSubform.PO_admin_License_Override;
				row2.PO_admin_3year_Override=boatPremiumSubform.PO_admin_3year_Override;
				//
				row2.Boat_Migration_ID=boatPremiumSubform.Boat_Migration_ID;
				row2.Migrated=boatPremiumSubform.Migrated;
				//-------referral reason-----------
				// 		row2.Referral_Status=boatPremiumSubform.Referral_Status;
				// 		row2.Referral_Do_any_of_the_above_statements_apply_to_the_watercraft1=boatPremiumSubform.Referral_Do_any_of_the_above_statements_apply_to_the_watercraft1;
				// 		row2.Referral_Does_the_operator_hold_a_Pleasure_Craft_Operator_Card_PCOC=boatPremiumSubform.Referral_Does_the_operator_hold_a_Pleasure_Craft_Operator_Card_PCOC;
				// 		row2.Referral_Principal_Operator=boatPremiumSubform.Referral_Principal_Operator;
				// 		row2.Referral_Principal_operator_20_years=boatPremiumSubform.Referral_Principal_operator_20_years;
				// 		row2.Referral_Replacement_cost=boatPremiumSubform.Referral_Replacement_cost;
				// 		row2.Referral_How_many_motor_vehicle_claims=boatPremiumSubform.Referral_How_many_motor_vehicle_claims;
				// 		row2.Referral_Length=boatPremiumSubform.Referral_Length;
				// 		row2.Referral_Vessel=boatPremiumSubform.Referral_Vessel;
				// 		row2.Referral_Trailer_Length=boatPremiumSubform.Referral_Trailer_Length;
				// 		row2.Referral_Reason=boatPremiumSubform.Referral_Reason;
				// 		row2.Referral_Do_any_of_the_above_statements_apply_to_the_watercraft=boatPremiumSubform.Referral_Do_any_of_the_above_statements_apply_to_the_watercraft;
				// 		row2.Referral_Do_any_of_the_above_apply_to_the_Applicant=boatPremiumSubform.Referral_Do_any_of_the_above_apply_to_the_Applicant;
				// 		row2.Referral_Hull_Type=boatPremiumSubform.Referral_Hull_Type;
				// 		row2.Referral_How_many_motor_vehicle_Convictions=boatPremiumSubform.Referral_How_many_motor_vehicle_Convictions;
				// 		row2.Referral_Do_any_of_the_above_apply_to_the_watercraft=boatPremiumSubform.Referral_Do_any_of_the_above_apply_to_the_watercraft;
				// 		row2.Referral_Tender_lenght=boatPremiumSubform.Referral_Tender_lenght;
				// 		row2.Referral_Has_the_principal_operator_had_their_driver_s_license_suspended=boatPremiumSubform.Referral_Has_the_principal_operator_had_their_driver_s_license_suspended;
				// 		row2.Referral_Boat_Model_Year=boatPremiumSubform.Referral_Boat_Model_Year;
				// 		row2.Referral_Actual_Cash_Value=boatPremiumSubform.Referral_Actual_Cash_Value;
				// 		row2.Referral_Watercraft_Type=boatPremiumSubform.Referral_Watercraft_Type;
				//
				boatCollection.insert(row2);
			}
			fetchBoat.Boat.clear();
			fetchBoat.Boat.insert(boatCollection);
			//------------------Policy Details----------------------------
			fetchBoat.Inception_Date=input.Inception_Date;
			fetchBoat.Expiry_Date=input.Expiry_Date;
			fetchBoat.Sales_Date=input.Sales_Date;
			fetchBoat.Last_Modified=input.Last_Modified;
			fetchBoat.Bind_Date=input.Bind_Date;
			//---------------------------Terms-------------------------
			fetchBoat.Agree_to_terms_and_conditions=input.Agree_to_terms_and_conditions;
			fetchBoat.Enter_payment_info=input.Enter_payment_info;
			//---------------------------Payment-------------------------
			fetchBoat.Payment_Date=input.Payment_Date;
			fetchBoat.Enter_payment_info=input.Enter_payment_info;
			fetchBoat.Total_Premium_before_tax=input.New_Total_Premium_before_tax;
			fetchBoat.Fee=input.New_Admin_Fee;
			fetchBoat.Tax_Province=input.New_Tax_Province;
			fetchBoat.Tax_Precent=input.New_Tax_Percent;
			fetchBoat.Total_Tax=input.New_Total_Tax;
			fetchBoat.Total_Payable_Premium_after_tax=input.New_Total_Payable_Premium_after_tax;
			// 		sendmail
			// 		[
			// 			from :zoho.adminuserid
			// 			to :"nambi.rajan@cloudlion.org"
			// 			subject :"Test Boat Premium --" + fetchBoat.Policy_Number
			// 			message :"Without tax--" + fetchBoat.Total_Premium_before_tax + "After tax--" + fetchBoat.Total_Payable_Premium_after_tax
			// 		]
			//---------------------------Mailing Address-------------------------
			fetchBoat.Country=input.Country;
			fetchBoat.Address=input.Address;
			fetchBoat.Suite_Apt=input.Suite_Apt;
			fetchBoat.Country=input.Country;
			fetchBoat.City=input.City;
			fetchBoat.Province=input.Province;
			fetchBoat.Postal_code_ZIP_Code=input.Postal_code_ZIP_Code;
			//---------------------------Adjusted Premium-------------------------
			//fetchBoat.OutStanding_Type=input.OutStanding_Type;
			//	fetchBoat.Outstanding=input.Outstanding;
			fetchBoat.Prorated=input.Prorated;
			fetchBoat.Tax=input.Tax;
			fetchBoat.Total=input.Total;
			fetchBoat.Tax=input.Tax;
			fetchBoat.Prorate_From=input.Prorate_From;
			fetchBoat.Waive_Free=input.Waive_Free;
			fetchBoat.Reason_For_Rejection1=input.Reason_For_Rejection1;
			//---------------------------Other Information-------------------------
			fetchBoat.Is_Watercraft_Ineligible_For_Coverage=input.Is_Watercraft_Ineligible_For_Coverage;
			fetchBoat.Does_Watercraft_Meet_Safety_And_Usage_Requirements=input.Does_Watercraft_Meet_Safety_And_Usage_Requirements;
			fetchBoat.Is_Applicant_Ineligible_For_Coverage=input.Is_Applicant_Ineligible_For_Coverage;
			fetchBoat.Is_Operator_Ineligible_For_Coverage=input.Is_Operator_Ineligible_For_Coverage;
			//---------------------------Document Generation Section-------------------------
			fetchBoat.Combined_Doc_Status_Check_On=input.Combined_Doc_Status_Check_On;
			fetchBoat.Is_Applicant_Ineligible_For_Coverage=input.Is_Applicant_Ineligible_For_Coverage;
			fetchBoat.Combined_Doc_Download_URL=input.Combined_Doc_Download_URL;
			fetchBoat.Combined_Doc_Response=input.Combined_Doc_Response;
			fetchBoat.Boat_quote_Page_View=input.Boat_quote_Page_View;
			//---------------------------Developer Section-------------------------
			fetchBoat.Zoho_Crm_ID=input.Zoho_Crm_ID;
			fetchBoat.Migrated_Status=input.Migrated_Status;
			fetchBoat.Boat_Migration_ID=input.Boat_Migration_ID;
			fetchBoat.Migrated=input.Migrated;
			//---------------------------Admin Changes-------------------------
			//fetchBoat.Select_Rate=input.Select_Rate;
			fetchBoat.Override_Tax_by_Admin=input.Override_Tax_by_Admin;
			//fetchBoat.Overriden_Tax=input.Overriden_Tax;
			fetchBoat.Override_Tax=ifnull(input.Override_Tax,null);
			//---------------------------Missing Fields-------------------------
			fetchBoat.Were_you_referred_by_a_friend_or_business=input.Were_you_referred_by_a_friend_or_business;
			fetchBoat.Product_Package=input.Product_Package;
			fetchBoat.Bind_Date=input.Bind_Date;
			fetchBoat.Last_Modified=input.Last_Modified;
			// 	//<------------- Quotation Sync to crm ----->
			if(input.Select_Policy.Zoho_Crm_ID != "" && input.Select_Policy.Zoho_Crm_ID != null)
			{
				thisapp.CRM.Sync_BoatQuote_Update(input.Select_Policy.ID);
			}
			// 	else
			// 	{
			// 		thisapp.CRM.Sync_BoatQuote(input.BoatQuote_ID.ID);
			// 	}
			// 	//------------ Declaration document ---->
			thisapp.Policy_Change_Declaration.Boat_Policy_Change(input.ID);
			// 	//--------------Workdrive Upload------------
			if(input.Policy_Change_Workdrive_Folder_Link != "" && input.Policy_Change_Workdrive_Folder_Link != null)
			{
				thisapp.Workdrive.upload_policy_pdf_to_workdrive("BoatPolicyChange",input.ID);
			}
		}
		//------------------------Call Server to Create and Update Customer Start-----------
		// 	if(customerlist.size() > 0)
		// 	{
		// 		for each  cust in customerlist.distinct()
		// 		{
		// 			get_customer = Customer[ID == cust];
		// 			if(get_customer.count() > 0)
		// 			{
		// 				if(get_customer.Server_Customer_ID != null && get_customer.Server_Customer_ID != "")
		// 				{
		// 					thisapp.Server_Side.Latest_Customer_Sync_Update(get_customer.ID);
		// 				}
		// 				else
		// 				{
		// 					thisapp.Server_Side.Latest_Customer_Sync_Create(get_customer.ID);
		// 				}
		// 			}
		// 		}
		// 	}
		thisapp.Server_Side.Latest_Boat_Quote_Sync_Create_and_Update(input.Select_Policy,"UPDATE");
		//------------------------Call Server to Create and Update Customer End -----------
		// --------------------- Sync Customer to CRM ------
		//thisapp.CRM.Customer_Generic_Sync(fetchBoat.ID,"Boat");
		// --- Additional Insured CRM Sync ------
		if(input.Additional_Names != null)
		{
			thisapp.CRM.Addition_Insured_Generic_Sync(input.Select_Policy.ID,"Boat");
		}
		// 	for each  customers in input.Additional_Names
		// 	{
		// 		if(!isNull(customers.Customer_ID))
		// 		{
		// 			thisapp.CRM.AdditionalNames_to_Lead_Sync_Create(customers.Customer_ID,"Boat");
		// 		}
		// 	}
	}
	// --------------------- Sync Customer to CRM End------
	//--------------------Re Direct to CRM-----------------
	openUrl("https://crm.zoho.com/crm/org810798353/tab/Potentials/" + input.Zoho_Crm_ID,"same window");
	