void Renewal.renewal_BoatPolicyCreationToServer()
{
	try 
	{
		fetchEndPoint = API_Configuration[Name_Process == "Renewal Policy - Boat"].End_Point;
		// 		info fetchEndPoint;
		// 		fetchEndPoint = "https://recprotectbackend-10073292108.development.catalystappsail.com/recprotect/api/boat/create_or_update_boat_quote_data_from_creators";
		orgString = thisapp.Server_Side.org_info();
		// 		weburl = "https://recprotectbackend-10073292108.development.catalystappsail.com/recprotect/api/boat/create_or_update_boat_quote_data_from_creators";
		get_allboat = BoatQuote[ID == 4564627000000540598];
		// 		boatquote_data = BoatQuote[ID == 4564627000000540598];
		//RECB068888
		// 		info get_allboat;
		count = 0;
		if(get_allboat.count() > 0)
		{
			for each  boatquote_data in get_allboat
			{
				datamap = Map();
				quoteupdate = Map();
				actiontype = "CREATE";
				datamap.put("action_type",actiontype);
				if(actiontype == "UPDATE")
				{
					datamap.put("quote_record_id",boatquote_data.Quote_Record_ID_Server);
				}
				if(!isNull(boatquote_data.Quote_ID))
				{
					// 					quoteupdate.put("quote_id",boatquote_data.Quote_ID);
					quoteupdate.put("quote_id","Duplicate");
				}
				if(!isNull(boatquote_data.Policy_Number))
				{
					quoteupdate.put("policy_number",boatquote_data.Policy_Number);
				}
				quoteupdate.put("organization_id",orgString);
				if(boatquote_data.Customer_ID != null)
				{
					if(!isNull(boatquote_data.Customer_ID.Server_Customer_ID))
					{
						quoteupdate.put("customer_id",boatquote_data.Customer_ID.Server_Customer_ID);
					}
				}
				if(!isNull(boatquote_data.Quote_Status))
				{
					quoteupdate.put("quote_status",boatquote_data.Quote_Status);
				}
				if(!isNull(boatquote_data.Policy_Status))
				{
					quoteupdate.put("policy_status",boatquote_data.Policy_Status);
				}
				if(!isNull(boatquote_data.Deal_Type))
				{
					quoteupdate.put("deal_type",boatquote_data.Deal_Type);
				}
				if(boatquote_data.Are_there_any_additional_names_on_the_boat_ownership == "Yes")
				{
					quoteupdate.put("any_additional_names",if(boatquote_data.Are_there_any_additional_names_on_the_boat_ownership == "Yes",true,false));
				}
				isvalid = if(boatquote_data.Are_there_any_additional_names_on_the_boat_ownership == "Yes",true,false);
				quoteupdate.put("any_additional_names",isvalid);
				if(isvalid == true)
				{
					// ---------- Additional Name Section ------
					additional_names_list = List();
					for each  names in boatquote_data.Additional_Names
					{
						if(names.Additional_Insured_First_Name != null && names.Additional_Insured_Last_Name != null)
						{
							additional_names_map = Map();
							if(!isNull(names.Customer_ID))
							{
								if(names.Customer_ID.Server_Customer_ID != null)
								{
									additional_names_map.put("customer_id",names.Customer_ID.Server_Customer_ID);
								}
								additional_names_map.put("creator_record_id",names.Customer_ID.toString());
								additional_names_list.add(additional_names_map);
							}
						}
					}
					if(additional_names_list.size() > 0)
					{
						quoteupdate.put("additional_names",additional_names_list);
					}
				}
				if(!isNull(boatquote_data.How_many_boats_would_you_like_to_insure))
				{
					quoteupdate.put("number_of_boats",boatquote_data.How_many_boats_would_you_like_to_insure.toLong());
				}
				// -------- Baot Object Section Start ------
				if(boatquote_data.Boat != null)
				{
					boat_list = List();
					for each  boat in boatquote_data.Boat
					{
						boatsMap = Map();
						boatsMap.put("creator_record_id",boat.ID.toString());
						if(!isNull(boat.Select_the_type_of_watercraft))
						{
							boatsMap.put("type",boat.Select_the_type_of_watercraft);
						}
						if(!isNull(boat.Boat_Model_Year))
						{
							boatsMap.put("year",boat.Boat_Model_Year.toLong());
						}
						// 						if(boat.Override_For_Age_15_Or_More == true)
						// 						{
						// 							boatsMap.put("override_boat_age_for_15_or_more",true);
						// 						}
						boatsMap.put("override_boat_age_for_15_or_more",boat.Override_For_Age_15_Or_More);
						if(!isNull(boat.Boat_Manufacturer))
						{
							boatsMap.put("manufacturer",boat.Boat_Manufacturer);
						}
						if(!isNull(boat.Boat_Model))
						{
							boatsMap.put("model",boat.Boat_Model);
						}
						if(!isNull(boat.Replacement_Cost))
						{
							boatsMap.put("replacement_cost",boat.Replacement_Cost);
						}
						// 						if(boat.RCV_Exceeding_Limits_UW_Approved == true)
						// 						{
						boatsMap.put("override_for_exceeding_RCV",boat.RCV_Exceeding_Limits_UW_Approved);
						// 						}
						if(!isNull(boat.Actual_Cash_Value))
						{
							boatsMap.put("actual_cost_value",boat.Actual_Cash_Value);
						}
						// 						if(boat.ACV_Exceeding_Limits_UW_Approved == true)
						// 						{
						boatsMap.put("override_for_exceeding_ACV",boat.ACV_Exceeding_Limits_UW_Approved);
						// 						}
						if(!isNull(boat.Is_the_Principal_Operator_the_same_as_the_Applicant_Owner))
						{
							boatsMap.put("is_main_operator_same_as_owner",if(boat.Is_the_Principal_Operator_the_same_as_the_Applicant_Owner == "Yes",true,false));
						}
						if(!isNull(boat.First_Name))
						{
							boatsMap.put("main_operator_first_name",boat.First_Name);
						}
						if(!isNull(boat.Last_Name))
						{
							boatsMap.put("main_operator_last_name",boat.Last_Name);
						}
						if(!isNull(boat.Date_of_Birth))
						{
							boatsMap.put("main_operator_dob",boat.Date_of_Birth.tostring("dd/MM/yyyy"));
						}
						if(!isNull(boat.Principal_operator_s_years_of_boating_experience_with_vessels_of_a_similar_size_and_type))
						{
							boatsMap.put("main_operator_boating_experience",boat.Principal_operator_s_years_of_boating_experience_with_vessels_of_a_similar_size_and_type);
						}
						if(!isNull(boat.Does_the_operator_hold_a_Pleasure_Craft_Operator_s_Card_PCOC))
						{
							boatsMap.put("main_operator_hold_pcoc_card",if(boat.Does_the_operator_hold_a_Pleasure_Craft_Operator_s_Card_PCOC == "Yes",true,false));
						}
						if(!isNull(boat.Select_coverage_for_policy))
						{
							boatsMap.put("coverage_name",boat.Select_coverage_for_policy);
						}
						if(!isNull(boat.Premium_Per_Year))
						{
							boatsMap.put("premium_per_year",boat.Premium_Per_Year);
						}
						if(!isNull(boat.Boat_Coverage))
						{
							boatsMap.put("coverage",boat.Boat_Coverage);
						}
						if(!isNull(boat.Liability_coverage))
						{
							boatsMap.put("liability_coverage",boat.Liability_coverage);
						}
						if(!isNull(boat.Deductible))
						{
							boatsMap.put("deductible",boat.Deductible.tolong());
						}
						if(!isNull(boat.Personal_Effects_Coverage))
						{
							if(boat.Personal_Effects_Coverage.contains("$") == true)
							{
								pf_coverage = boat.Personal_Effects_Coverage.getsuffix("$");
							}
							else
							{
								pf_coverage = boat.Personal_Effects_Coverage;
							}
							boatsMap.put("personal_effects_coverage",pf_coverage.tolong());
						}
						if(!isNull(boat.Navigational_Equipment_Coverage))
						{
							if(boat.Navigational_Equipment_Coverage.contains("$") == true)
							{
								ne_coverage = boat.Navigational_Equipment_Coverage.getsuffix("$");
							}
							else
							{
								ne_coverage = boat.Navigational_Equipment_Coverage;
							}
							boatsMap.put("navigational_equipment_coverage",ne_coverage.tolong());
						}
						if(!isNull(boat.Salvage))
						{
							boatsMap.put("salvage",boat.Salvage);
						}
						if(!isNull(boat.Pollution))
						{
							boatsMap.put("pollution",boat.Pollution);
						}
						if(!isNull(boat.Removal_of_Wreckage))
						{
							boatsMap.put("removal_of_wreckage",boat.Removal_of_Wreckage);
						}
						if(!isNull(boat.Emergency_Towing_Limit))
						{
							boatsMap.put("emergency_towing_limit",boat.Emergency_Towing_Limit);
						}
						if(!isNull(boat.Uninsured_Underinsured_Boater_Endorsement))
						{
							boatsMap.put("uninsured_underinsured_boater_endorsement",boat.Uninsured_Underinsured_Boater_Endorsement);
						}
						if(!isNull(boat.Loss_of_Use_Limit))
						{
							boatsMap.put("loss_of_use_limit",boat.Loss_of_Use_Limit);
						}
						if(!isNull(boat.Do_any_of_the_above_statements_apply_to_the_watercraft_Atlantic_Pacific))
						{
							boatsMap.put("will_boat_be_used_in_atlantic_pacific_questions",if(boat.Do_any_of_the_above_statements_apply_to_the_watercraft_Atlantic_Pacific == "Yes",true,false));
						}
						if(!isNull(boat.Do_any_of_the_above_statements_apply_to_the_watercraft_engine_Parasailing_propane))
						{
							boatsMap.put("is_boat_rented_or_carry_passengers_or_existing_damages_questions",if(boat.Do_any_of_the_above_statements_apply_to_the_watercraft_engine_Parasailing_propane == "Yes",true,false));
						}
						if(!isNull(boat.Do_any_of_the_above_apply_to_the_watercraft_safety_requirements))
						{
							boatsMap.put("is_boat_layered_up_and_safety_questions",if(boat.Do_any_of_the_above_apply_to_the_watercraft_safety_requirements == "Yes",true,false));
						}
						if(!isNull(boat.Do_any_of_the_above_apply_to_the_applicant_Owner_primary_residence))
						{
							boatsMap.put("is_owner_employees_or_lives_on",if(boat.Do_any_of_the_above_apply_to_the_applicant_Owner_primary_residence == "Yes",true,false));
						}
						if(!isNull(boat.Has_the_principal_operator_had_any_motor_vehicle_claims_in_the_last_5_years))
						{
							boatsMap.put("operator_have_claim_in_last_5_years",if(boat.Has_the_principal_operator_had_any_motor_vehicle_claims_in_the_last_5_years == "Yes",true,false));
						}
						if(!isNull(boat.Admin_Override))
						{
							boatsMap.put("override_for_PO_claims_in_last_5_years",if(boat.Admin_Override == "Yes",true,false));
						}
						if(!isNull(boat.How_many_motor_vehicle_claims))
						{
							if(boat.How_many_motor_vehicle_claims.isNumber() == true)
							{
								boatsMap.put("how_many_claims",boat.How_many_motor_vehicle_claims);
							}
						}
						if(!isNull(boat.Has_the_principal_operator_had_any_motor_vehicle_convictions_in_the_last_3_years))
						{
							boatsMap.put("operator_have_motor_convictions_in_last_3_years",if(boat.Has_the_principal_operator_had_any_motor_vehicle_convictions_in_the_last_3_years == "Yes",true,false));
						}
						if(!isNull(boat.PO_admin_3year_Override))
						{
							boatsMap.put("override_for_PO_motor_convictions_in_last_3_years",if(boat.PO_admin_3year_Override == "Yes",true,false));
						}
						if(!isNull(boat.How_many_motor_vehicle_convictions))
						{
							if(boat.How_many_motor_vehicle_convictions.isNumber() == true)
							{
								boatsMap.put("how_many_convictions",boat.How_many_motor_vehicle_convictions);
							}
						}
						if(!isNull(boat.Has_the_principal_operator_had_their_driver_s_license_suspended))
						{
							boatsMap.put("operator_had_suspended_driver_license",if(boat.Has_the_principal_operator_had_their_driver_s_license_suspended == "Yes",true,false));
						}
						if(!isNull(boat.PO_admin_License_Override))
						{
							boatsMap.put("override_for_PO_had_suspended_driver_license",if(boat.PO_admin_License_Override == "Yes",true,false));
						}
						if(!isNull(boat.Tell_us_more))
						{
							boatsMap.put("when_suspended",boat.Tell_us_more);
						}
						if(!isNull(boat.Lengths))
						{
							boatsMap.put("length_in_feet",boat.Lengths);
						}
						if(!isNull(boat.Hull_ID_Serial))
						{
							boatsMap.put("hull_serial_id",boat.Hull_ID_Serial);
						}
						if(!isNull(boat.Hull_Type))
						{
							boatsMap.put("hull_type",boat.Hull_Type);
						}
						if(!isNull(boat.Other_Hull_Type))
						{
							boatsMap.put("hull_type_for_others",boat.Other_Hull_Type);
						}
						if(!isNull(boat.Estimated_max_speed))
						{
							boatsMap.put("max_est_speed",boat.Estimated_max_speed.toString());
						}
						if(!isNull(boat.Types))
						{
							boatsMap.put("engine1_type",boat.Types);
						}
						if(!isNull(boat.Enter_the_type))
						{
							boatsMap.put("engine1_others_type",boat.Enter_the_type);
						}
						if(!isNull(boat.Fuel_Type))
						{
							boatsMap.put("engine1_fuel_type",boat.Fuel_Type);
						}
						if(!isNull(boat.Model_Year))
						{
							boatsMap.put("engine1_model_year",boat.Model_Year.toLong());
						}
						if(!isNull(boat.Manufacturer))
						{
							boatsMap.put("engine1_manufacturer",boat.Manufacturer);
						}
						if(!isNull(boat.Serial))
						{
							if(boat.Serial.isNumber() == true)
							{
								boatsMap.put("engine1_serial_number",boat.Serial);
							}
						}
						if(!isNull(boat.Horsepower))
						{
							boatsMap.put("engine1_horse_power",boat.Horsepower);
						}
						if(!isNull(boat.Types1))
						{
							boatsMap.put("engine2_type",boat.Types1);
						}
						if(!isNull(boat.Enter_the_type1))
						{
							boatsMap.put("engine2_others_type",boat.Enter_the_type1);
						}
						if(!isNull(boat.Fuel_Type1))
						{
							boatsMap.put("engine2_fuel_type",boat.Fuel_Type1);
						}
						if(!isNull(boat.Model_Year1))
						{
							boatsMap.put("engine2_model_year",boat.Model_Year1.toLong());
						}
						if(!isNull(boat.Manufacturer1))
						{
							boatsMap.put("engine2_manufacturer",boat.Manufacturer1);
						}
						if(!isNull(boat.Serial1))
						{
							boatsMap.put("engine2_serial_number",boat.Serial1);
						}
						if(!isNull(boat.Horsepower1))
						{
							boatsMap.put("engine2_horse_power",boat.Horsepower1);
						}
						if(!isNull(boat.Add_a_trailer))
						{
							boatsMap.put("add_a_trailer",if(boat.Add_a_trailer == "Yes",true,false));
						}
						if(!isNull(boat.Trailer_Value))
						{
							boatsMap.put("trailer_value",boat.Trailer_Value);
						}
						if(!isNull(boat.Trailer_Model_Year))
						{
							boatsMap.put("trailer_model_year",boat.Trailer_Model_Year.toLong());
						}
						if(!isNull(boat.Trailer_Manufacturer))
						{
							boatsMap.put("trailer_manufacturer",boat.Trailer_Manufacturer);
						}
						if(!isNull(boat.Trailer_VIN))
						{
							boatsMap.put("trailer_vin",boat.Trailer_VIN);
						}
						if(!isNull(boat.Trailer_Length))
						{
							boatsMap.put("trailer_length",boat.Trailer_Length);
						}
						if(!isNull(boat.Add_a_tender))
						{
							boatsMap.put("add_a_tender",if(boat.Add_a_tender == "Yes",true,false));
						}
						if(!isNull(boat.Tender_Value))
						{
							boatsMap.put("tender_value",boat.Tender_Value);
						}
						if(!isNull(boat.Tender_Model_Year))
						{
							boatsMap.put("tender_model_year",boat.Tender_Model_Year.toLong());
						}
						if(!isNull(boat.Tender_Manufacturer))
						{
							boatsMap.put("tender_manufacturer",boat.Tender_Manufacturer);
						}
						if(!isNull(boat.Tender_Serial))
						{
							boatsMap.put("tender_vin",boat.Tender_Serial);
						}
						if(!isNull(boat.Tender_Length))
						{
							boatsMap.put("tender_length",boat.Tender_Length);
						}
						if(!isNull(boat.Add_an_auxiliary_motor))
						{
							boatsMap.put("add_auxiliary_motor",if(boat.Add_an_auxiliary_motor == "Yes",true,false));
						}
						if(!isNull(boat.Aux_Engine_Value))
						{
							boatsMap.put("aux_value",boat.Aux_Engine_Value);
						}
						if(!isNull(boat.Aux_Engine_Model_Year))
						{
							boatsMap.put("aux_model_year",boat.Aux_Engine_Model_Year.toLong());
						}
						if(!isNull(boat.Aux_Engine_Manufacturer))
						{
							boatsMap.put("aux_manufacturer",boat.Aux_Engine_Manufacturer);
						}
						if(!isNull(boat.Auxiliary_Engine_Serial))
						{
							boatsMap.put("aux_vin",boat.Auxiliary_Engine_Serial);
						}
						//boatsMap.put("aux_length",boat);
						if(!isNull(boat.Is_this_boat_financed))
						{
							boatsMap.put("is_financed",if(boat.Is_this_boat_financed == "Yes",true,false));
						}
						if(!isNull(boat.Name_of_Financier))
						{
							boatsMap.put("financier_name",boat.Name_of_Financier);
						}
						if(!isNull(boat.Address_line1))
						{
							boatsMap.put("financier_address_line1",boat.Address_line1);
						}
						if(!isNull(boat.Address_line2))
						{
							boatsMap.put("financier_address_line2",boat.Address_line2);
						}
						if(!isNull(boat.City))
						{
							boatsMap.put("financier_city",boat.City);
						}
						if(!isNull(boat.Province))
						{
							boatsMap.put("financier_province",boat.Province);
						}
						if(!isNull(boat.Postal_Code))
						{
							boatsMap.put("financier_postalcode",boat.Postal_Code);
						}
						if(!isNull(boat.Country))
						{
							boatsMap.put("financier_country",boat.Country);
						}
						// 						if(!isNull(boat.Add_Snowbird_Endorsement))
						// 						{
						// 							boatsMap.put("opted_for_snowbird_endorsment",if(boat.Add_Snowbird_Endorsement == "Yes",true,false));
						// 						}
						boat_list.add(boatsMap);
					}
					if(boat_list.size() > 0)
					{
						quoteupdate.put("boats",boat_list);
					}
				}
				// ---- Boat Object Map End ---
				/// -----------------------------------
				if(!isNull(boatquote_data.Inception_Date))
				{
					quoteupdate.put("inception_date",boatquote_data.Inception_Date.tostring("dd/MM/yyyy"));
				}
				if(!isNull(boatquote_data.Expiry_Date))
				{
					quoteupdate.put("expiry_date",boatquote_data.Expiry_Date.tostring("dd/MM/yyyy"));
				}
				// 				if(boatquote_data.Agree_to_terms_and_conditions == true)
				// 				{
				quoteupdate.put("agreed_to_tnc",boatquote_data.Agree_to_terms_and_conditions);
				// 				}
				if(boatquote_data.ID != null)
				{
					quoteupdate.put("creator_record_id",boatquote_data.ID.toString());
				}
				if(!isNull(boatquote_data.Customer_ID))
				{
					quoteupdate.put("customer_creator_record_id",boatquote_data.Customer_ID.ID.toString());
				}
				if(!isNull(boatquote_data.Policy_AutoRenewal_Status))
				{
					quoteupdate.put("auto_renewal_status",boatquote_data.Policy_AutoRenewal_Status);
				}
				if(!isNull(boatquote_data.Referral_Reason))
				{
					quoteupdate.put("referral_reason",boatquote_data.Referral_Reason);
				}
				if(!isNull(boatquote_data.Override_Tax_by_Admin))
				{
					quoteupdate.put("override_tax_percent_by_admin",if(boatquote_data.Override_Tax_by_Admin == "Yes",true,false));
				}
				if(!isNull(boatquote_data.Override_Tax))
				{
					f_Tax = Tax_Lists[ID == boatquote_data.Override_Tax];
					quoteupdate.put("overrided_tax_percent",f_Tax.Tax);
				}
				quoteupdate.put("created_source","CREATOR");
				if(!isNull(boatquote_data.Carrier))
				{
					quoteupdate.put("carrier",boatquote_data.Carrier);
				}
				quoteupdate.put("is_migrated_record",true);
				// -------------- Need to Confirm the below fields are not available in Doc ------------
				if(boatquote_data.Total_Premium_before_tax != null)
				{
					quoteupdate.put("total_premium",boatquote_data.Total_Premium_before_tax);
				}
				if(boatquote_data.Total_Tax != null)
				{
					quoteupdate.put("total_tax",boatquote_data.Total_Tax);
				}
				if(boatquote_data.Fee != null)
				{
					quoteupdate.put("total_admin_fee",boatquote_data.Fee);
				}
				if(boatquote_data.Tax_Precent != null)
				{
					quoteupdate.put("tax_percent",boatquote_data.Tax_Precent);
				}
				if(boatquote_data.Total_Payable_Premium_after_tax != null)
				{
					quoteupdate.put("total_premium_after_tax",boatquote_data.Total_Payable_Premium_after_tax);
				}
				// --------------End -  Need to Confirm the below fields are not available in Doc ------------
				quoteupdate.put("located_province",if(boatquote_data.Province != "",boatquote_data.Province,""));
				quoteupdate.put("signature_accept_text",if(boatquote_data.Signature_Accept_Text != "",boatquote_data.Signature_Accept_Text,""));
				quoteupdate.put("upo_data",if(boatquote_data.UPO_Data != "",boatquote_data.UPO_Data,""));
				quoteupdate.put("nuvei_transaction_id",if(boatquote_data.Nuvei_Transaction_ID != "",boatquote_data.Nuvei_Transaction_ID,""));
				quoteupdate.put("total_premium",ifNull(boatquote_data.Total_Premium_before_tax,0));
				quoteupdate.put("total_tax",ifNull(boatquote_data.Total_Tax,0));
				quoteupdate.put("tax_percent",ifNull(boatquote_data.Tax_Precent,0));
				quoteupdate.put("override_tax_percent_by_admin",ifNull(boatquote_data.Override_Tax_by_Admin,0));
				quoteupdate.put("total_premium_after_tax",ifNull(boatquote_data.Total_Payable_Premium_after_tax,0));
				quoteupdate.put("master_record_id","Duplicate");
				// aux_length
				// total_admin_fee
				// coverage_type
				datamap.put("quote_updates",quoteupdate);
				//		info datamap;
				// 
				//		info "-----------------Data Map End----------------";
				//		info "-----------------Response Start----------------";
				//----------------------Sync to Server------------
				resp = thisapp.Server_Side.callServer("POST",fetchEndPoint,datamap);
				//		info resp;
				if(resp.isEmpty() == false)
				{
					if(resp.get("success") == "true")
					{
						boatquote_data.Quote_Record_ID_Server=resp.get("data").get("quote_record_id");
						boatquote_data.Migrated_to_Server=true;
					}
					else
					{
						boatquote_data.Server_Migrated_Error_Resp=resp.toString();
						thisapp.Developer.addDeveloperLog("Boat Data Migration Process-- " + boatquote_data.ID.tostring(),"Migration_to_Server.Boat_Migrate_New_Catalyst","Boat Migration Quote ID response",resp.tostring(),fetchEndPoint,"creator");
					}
				}
				else
				{
					thisapp.Developer.addDeveloperLog("Boat Data Migration Process-- " + boatquote_data.ID.tostring(),"Migration_to_Server.Boat_Migrate_New_Catelyst","Boat Migration Quote ID response is Empty",resp.tostring(),fetchEndPoint,"creator");
				}
			}
		}
	}
	catch (e)
	{
		//		info e;
		// 		thisapp.Developer.addDeveloperLog("Boat Data Migration Process-- ","Migration_to_Server.Boat_Migrate_New_Catalyst","Boat Migration Catalyst response",resp.tostring(),e,"creator");
	}
}