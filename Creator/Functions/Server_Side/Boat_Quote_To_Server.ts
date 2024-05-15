void Server_Side.Boat_Quote_To_Server(int boatID)
{
	try 
	{
		thisapp.Developer.addActivityLog("Server_Side.Boat_Quote_To_Server--" + boatID,"Function Call Start","ID","null");
		fetchBoat = BoatQuote[ID == boatID];
		if(fetchBoat.count() > 0)
		{
			datamap = Map();
			quoteMap = Map();
			if(fetchBoat.Customer_ID != null)
			{
				fetchCustomer = Customer[ID == fetchBoat.Customer_ID];
				if(fetchCustomer.count() > 0)
				{
					customerMap = Map();
					customerMap.put("first_name",fetchCustomer.First_Name);
					customerMap.put("last_name",fetchCustomer.Last_Name);
					customerMap.put("email",fetchCustomer.Email);
					customerMap.put("phone",fetchCustomer.Phone_Number);
					if(fetchCustomer.Phone_Number.startsWith("+1") == true)
					{
						customerMap.put("phone",fetchCustomer.Phone_Number.getSuffix("+1"));
					}
					// 				customerMap.put("dob",fetchCustomer.DOB);
					if(fetchCustomer.DOB != null)
					{
						customerMap.put("dob",fetchCustomer.DOB.toString("dd/MM/yyyy"));
					}
					customerMap.put("where_you_find_us",fetchCustomer.Where_Did_You_Find_Us);
					customerMap.put("mailing_address_line1",fetchCustomer.Address_Line1);
					customerMap.put("mailing_address_line2",fetchCustomer.Address_Line2);
					customerMap.put("mailing_city",fetchCustomer.City);
					customerMap.put("mailing_province",fetchCustomer.Province);
					customerMap.put("mailing_postalcode",fetchCustomer.Postal_Code);
					customerMap.put("mailing_country",fetchCustomer.Country);
					customerMap.put("customer_type",fetchCustomer.Customer_Type);
					customerMap.put("creator_record_id",fetchCustomer.ID);
					customerMap.put("friend_option_name",ifnull(fetchCustomer.Name,""));
					customerMap.put("dealership_option_name",fetchCustomer.Name_of_Dealership);
					customerMap.put("campground_option_name",fetchCustomer.Name_of_Campground);
					customerMap.put("marina_option_name",fetchCustomer.Name_of_Marina);
					customerMap.put("others_option_name",fetchCustomer.Tell_us_more);
				}
				datamap.put("customer",customerMap);
				datamap.put("customer_creator_record_id",fetchCustomer.ID);
			}
			datamap.put("any_additional_names",fetchBoat.Are_there_any_additional_names_on_the_boat_ownership);
			additionalNames1 = List();
			additionalNames2 = List();
			idsList = List();
			if(fetchBoat.Additional_Names != null)
			{
				count = 0;
				for each  additionalNames in fetchBoat.Additional_Names
				{
					additionalCustomer = Map();
					count = count + 1;
					if(count == 1)
					{
						additionalMap1 = Map();
						customer1ID = additionalNames.Customer_ID.ID;
						additionalCustomer.put("creator_record_id",customer1ID);
						additionalMap1.put("first_name",ifnull(additionalNames.Additional_Insured_First_Name,""));
						additionalMap1.put("last_name",ifnull(additionalNames.Additional_Insured_Last_Name,""));
						additionalMap1.put("email",ifnull(additionalNames.Email,""));
						additionalMap1.put("phone",ifnull(additionalNames.Phone_Number,""));
						additionalMap1.put("dob",ifnull(additionalNames.DOB,null));
						additionalNames1.add(additionalMap1);
					}
					else
					{
						additionalMap2 = Map();
						customer2ID = additionalNames.Customer_ID.ID;
						additionalCustomer.put("creator_record_id",customer2ID);
						additionalMap2.put("first_name",ifnull(additionalNames.Additional_Insured_First_Name,""));
						additionalMap2.put("last_name",ifnull(additionalNames.Additional_Insured_Last_Name,""));
						additionalMap2.put("email",ifnull(additionalNames.Email,""));
						additionalMap2.put("phone",ifnull(additionalNames.Phone_Number,""));
						additionalMap2.put("dob",ifnull(additionalNames.DOB,null));
						additionalNames2.add(additionalMap2);
					}
					idsList.add(additionalCustomer);
				}
			}
			// 			additionalCustomer = Map();
			// 			additionalCustomer.put("creator_record_id", customer1ID);
			// 			additionalCustomer.put("creator_record_id", customer2ID);
			datamap.put("additional_names",idsList);
			datamap.put("additional_insured1",additionalNames1);
			datamap.put("additional_insured2",additionalNames2);
			datamap.put("number_of_boats",fetchBoat.How_many_boats_would_you_like_to_insure);
			datamap.put("creator_record_id",fetchBoat.ID);
			datamap.put("quote_id",fetchBoat.Quote_ID);
			datamap.put("located_province",fetchBoat.Please_select_the_province_your_boat_is_used_in);
			quoteMap.put("quote_status",ifnull(fetchBoat.Quote_Status,""));
			quoteMap.put("inception_date",ifnull(fetchBoat.Inception_Date,null));
			quoteMap.put("expiry_date",ifnull(fetchBoat.Expiry_Date,null));
			quoteMap.put("agreed_to_tnc",fetchBoat.Agree_to_terms_and_conditions);
			quoteMap.put("referral_reason",ifnull(fetchBoat.Referral_Reason,""));
			if(fetchBoat.Boat != null)
			{
				boatsMap = Map();
				boatList = List();
				for each  boatData in fetchBoat.Boat
				{
					boatsMap.put("type",boatData.Select_the_type_of_watercraft);
					boatsMap.put("year",boatData.Boat_Model_Year);
					boatsMap.put("manufacturer",boatData.Boat_Manufacturer);
					boatsMap.put("model",boatData.Boat_Model);
					boatsMap.put("replacement_cost",ifnull(boatData.Replacement_Cost,0.0));
					boatsMap.put("actual_cost_value",ifnull(boatData.Actual_Cash_Value,0.0));
					boatsMap.put("is_main_operator_same_as_owner",boatData.Is_the_Principal_Operator_the_same_as_the_Applicant_Owner);
					boatsMap.put("main_operator_first_name",boatData.First_Name);
					boatsMap.put("main_operator_last_name",boatData.Last_Name);
					boatsMap.put("main_operator_dob",boatData.Date_of_Birth);
					boatsMap.put("main_operator_boating_experience",boatData.Principal_operator_s_years_of_boating_experience_with_vessels_of_a_similar_size_and_type);
					boatsMap.put("main_operator_hold_pcoc_card",boatData.Does_the_operator_hold_a_Pleasure_Craft_Operator_s_Card_PCOC);
					boatsMap.put("premium_per_year",boatData.Premium_Per_Year);
					boatsMap.put("coverage_name",boatData.Select_coverage_for_policy);
					boatsMap.put("coverage",boatData.Boat_Coverage);
					boatsMap.put("liability_coverage",boatData.Liability_coverage);
					boatsMap.put("deductible",boatData.Deductible);
					boatsMap.put("personal_effects_coverage",boatData.Personal_Effects_Coverage);
					boatsMap.put("navigational_equipment_coverage",boatData.Navigational_Equipment_Coverage);
					boatsMap.put("salvage",boatData.Salvage);
					boatsMap.put("pollution",boatData.Pollution);
					boatsMap.put("removal_of_wreckage",boatData.Removal_of_Wreckage);
					boatsMap.put("emergency_towing_limit",boatData.Emergency_Towing_Limit);
					boatsMap.put("uninsured_underinsured_boater_endorsement",boatData.Uninsured_Underinsured_Boater_Endorsement);
					boatsMap.put("loss_of_use_limit",boatData.Loss_of_Use_Limit);
					boatsMap.put("will_boat_be_used_in_atlantic_pacific_questions",boatData.Do_any_of_the_above_statements_apply_to_the_watercraft_Atlantic_Pacific);
					boatsMap.put("is_boat_rented_or_carry_passengers_or_existing_damages_questions",boatData.Do_any_of_the_above_statements_apply_to_the_watercraft_engine_Parasailing_propane);
					boatsMap.put("is_boat_layered_up_and_safety_questions",boatData.Do_any_of_the_above_apply_to_the_watercraft_safety_requirements);
					boatsMap.put("is_owner_employees_or_lives_on",boatData.Do_any_of_the_above_apply_to_the_applicant_Owner_primary_residence);
					// new fields addded Po admin 5 year overide
					if(boatData.Admin_Override == "Yes")
					{
						boatsMap.put("operator_have_claim_in_last_5_years",boatData.Has_the_principal_operator_had_any_motor_vehicle_claims_in_the_last_5_years);
						if(boatData.Has_the_principal_operator_had_any_motor_vehicle_claims_in_the_last_5_years == "Yes")
						{
							boatsMap.put("how_many_claims",boatData.How_many_motor_vehicle_claims);
						}
					}
					// new fields addded Po admin 3 year overide
					if(boatData.PO_admin_3year_Override == "Yes")
					{
						boatsMap.put("operator_have_motor_convictions_in_last_3_years",boatData.Has_the_principal_operator_had_any_motor_vehicle_convictions_in_the_last_3_years);
						if(boatData.Has_the_principal_operator_had_any_motor_vehicle_convictions_in_the_last_3_years == "Yes")
						{
							boatsMap.put("how_many_convictions",boatData.How_many_motor_vehicle_convictions);
						}
					}
					// new fields addded Po admin Licnense overide
					if(boatData.PO_admin_License_Override == "Yes")
					{
						boatsMap.put("operator_had_suspended_driver_license",boatData.Has_the_principal_operator_had_their_driver_s_license_suspended);
						if(boatData.Has_the_principal_operator_had_their_driver_s_license_suspended == "Yes")
						{
							boatsMap.put("when_suspended",boatData.Tell_us_more);
						}
					}
					boatsMap.put("length_in_feet",boatData.Lengths);
					boatsMap.put("hull_serial_id",boatData.Hull_ID_Serial);
					boatsMap.put("hull_type",boatData.Hull_Type);
					boatsMap.put("hull_type_for_others",ifnull(boatData.Other_Hull_Type,""));
					boatsMap.put("max_est_speed",boatData.Estimated_max_speed);
					boatsMap.put("engine1_type",boatData.Types);
					boatsMap.put("engine1_others_type",ifnull(boatData.Enter_the_type,""));
					boatsMap.put("engine1_fuel_type",boatData.Fuel_Type);
					boatsMap.put("engine1_model_year",boatData.Model_Year);
					boatsMap.put("engine1_manufacturer",boatData.Manufacturer);
					boatsMap.put("engine1_serial_number",boatData.Serial);
					boatsMap.put("engine1_horse_power",boatData.Horsepower);
					boatsMap.put("engine2_type",boatData.Types1);
					boatsMap.put("engine2_others_type",ifnull(boatData.Enter_the_type1,""));
					boatsMap.put("engine2_fuel_type",boatData.Fuel_Type1);
					boatsMap.put("engine2_model_year",boatData.Model_Year1);
					boatsMap.put("engine2_manufacturer",boatData.Manufacturer1);
					boatsMap.put("engine2_serial_number",boatData.Serial1);
					boatsMap.put("engine2_horse_power",boatData.Horsepower1);
					boatsMap.put("add_a_trailer",boatData.Add_a_trailer);
					boatsMap.put("trailer_value",boatData.Trailer_Value);
					boatsMap.put("trailer_model_year",boatData.Trailer_Model_Year);
					boatsMap.put("trailer_manufacturer",boatData.Trailer_Manufacturer);
					boatsMap.put("trailer_vin",boatData.Trailer_VIN);
					boatsMap.put("trailer_length",boatData.Trailer_Length);
					boatsMap.put("add_a_tender",boatData.Add_a_tender);
					boatsMap.put("tender_value",boatData.Tender_Value);
					boatsMap.put("tender_model_year",boatData.Tender_Model_Year);
					boatsMap.put("tender_manufacturer",boatData.Tender_Manufacturer);
					boatsMap.put("tender_length",boatData.Tender_Length);
					boatsMap.put("add_auxiliary_motor",boatData.Add_an_auxiliary_motor);
					boatsMap.put("aux_value",boatData.Aux_Engine_Value);
					boatsMap.put("aux_model_year",boatData.Aux_Engine_Model_Year);
					boatsMap.put("aux_manufacturer",boatData.Aux_Engine_Manufacturer);
					boatsMap.put("is_financed",boatData.Is_this_boat_financed);
					if(boatData.Lein_holder != null)
					{
						fetchLein = Lein_holder_Details[ID == boatData.Lein_holder];
						boatsMap.put("select_a_financier",fetchLein.Name_of_Financier);
					}
					boatsMap.put("financier_name",boatData.Name_of_Financier);
					boatsMap.put("financier_address_line1",boatData.Address_line1);
					boatsMap.put("financier_address_line2",boatData.Address_line2);
					boatsMap.put("financier_city",boatData.City);
					boatsMap.put("financier_province",boatData.Province);
					boatsMap.put("financier_postal_code",boatData.Postal_Code);
					boatsMap.put("financier_country",boatData.Country);
					if(boatData.Select_coverage_for_policy == "Replacement Value Coverage")
					{
						boatvalue = ifnull(boatData.Replacement_Cost,0);
					}
					else if(boatData.Select_coverage_for_policy == "Current Market Value Coverage")
					{
						boatvalue = ifnull(boatData.Actual_Cash_Value,0);
					}
					else
					{
						boatvalue = 0;
					}
					datamap.put("boat_value",boatvalue);
					datamap.put("boat_type",if(boatData.Select_the_type_of_watercraft != null && boatData.Select_the_type_of_watercraft != "",boatData.Select_the_type_of_watercraft,null));
					datamap.put("deductible_value",if(boatData.Deductible != null && boatData.Deductible != "",boatData.Deductible.remove("$").toDecimal(),null));
					check15years = false;
					if(boatData.Boat_Model_Year != null && boatData.Boat_Model_Year != "")
					{
						calculate25Years = zoho.currentdate.getYear() - boatData.Boat_Model_Year.toNumber();
						check15years = if(calculate25Years > 15,true,false);
					}
					datamap.put("is_boat_age_gt_15",check15years);
					agecheck = false;
					calculateAge = 0;
					if(boatData.Date_of_Birth != null)
					{
						calculateAge = zoho.currentdate.getYear() - boatData.Date_of_Birth.toDate().getYear();
						agecheck = if(calculateAge >= 20 && calculateAge <= 25,true,false);
					}
					datamap.put("is_boat_operator_age_20_25",agecheck);
					expcheck = false;
					if(calculateAge > 25 && boatData.Principal_operator_s_years_of_boating_experience_with_vessels_of_a_similar_size_and_type == "0-3 Years")
					{
						expcheck = true;
					}
					datamap.put("is_boat_operator_gt_25_lt_3years_exp",expcheck);
					datamap.put("navi_eqip_value",if(boatData.Navigational_Equipment_Coverage != null && boatData.Navigational_Equipment_Coverage != "",boatData.Navigational_Equipment_Coverage.remove("$").toDecimal(),null));
					datamap.put("pers_eff_value",if(boatData.Personal_Effects_Coverage != null && boatData.Personal_Effects_Coverage != "",boatData.Personal_Effects_Coverage.remove("$").toDecimal(),null));
					datamap.put("is_boat_liability_rate_2M",true);
					boatList.add(boatsMap);
				}
			}
			datamap.put("quote_data",boatList);
			//info "data" + datamap;
			datamap.put("organization_id","RECPROTECT1");
			boatPostData = invokeurl
			[
				url :"https://insurance.theclsolutions.ca/recprotect/api/boat/send_coverage_details"
				type :POST
				parameters:datamap
			];
			//	info boatPostData;
		}
		thisapp.Developer.addActivityLog("Server_Side.Boat_Quote_To_Server--" + boatID.tostring(),"Function Call Ended and Record updated in webapp ","ID---" + boatID,boatPostData.tostring());
	}
	catch (e)
	{
		thisapp.Developer.addDeveloperLog("BoatQuoteSync","Server_Side.Boat_Quote_To_Server:" + boatID.tostring(),"Record updated in webapp",boatID.tostring(),e,"creator");
	}
}