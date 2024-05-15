void Migration_to_Server.Boat_Migrate()
{
	//get_allboat = BoatQuote[Migrated == true];
	get_allboat = BoatQuote[ID == 4564627000001061011];
	if(get_allboat.count() > 0)
	{
		for each  boatquote_data in get_allboat
		{
			datamap = Map();
			quoteupdate = Map();
			//-----------------Parameters List--------
			datamap.put("quote_type","Boat");
			datamap.put("quote_id",boatquote_data.Quote_ID);
			datamap.put("quote_record_id",boatquote_data.ID.toString());
			//--------------------quote_updates structure:- -------
			quoteupdate.put("creator_record_id",boatquote_data.ID.toString());
			quoteupdate.put("customer_id",boatquote_data.Customer_ID.Server_Customer_ID);
			quoteupdate.put("customer_creator_record_id",boatquote_data.Customer_ID.toString());
			quoteupdate.put("any_additional_names",boatquote_data.Are_there_any_additional_names_on_the_boat_ownership);
			additional_names_list = List();
			for each  names in boatquote_data.Additional_Names
			{
				additional_names_map = Map();
				additional_names_map.put("customer_id",names.Customer_ID.Server_Customer_ID);
				additional_names_map.put("creator_record_id",names.Customer_ID.toString());
				additional_names_list.add(additional_names_map);
			}
			quoteupdate.put("additional_names",additional_names_list);
			quoteupdate.put("number_of_boats",boatquote_data.How_many_boats_would_you_like_to_insure);
			//---------------boat object structure-------------
			if(boatquote_data.Boat != null)
			{
				boat_list = List();
				for each  boat in boatquote_data.Boat
				{
					boatsMap = Map();
					boatsMap.put("type",boat.Select_the_type_of_watercraft);
					boatsMap.put("year",boat.Boat_Model_Year);
					boatsMap.put("manufacturer",boat.Boat_Manufacturer);
					boatsMap.put("model",boat.Boat_Model);
					boatsMap.put("replacement_cost",ifnull(boat.Replacement_Cost,0.0));
					boatsMap.put("actual_cost_value",ifnull(boat.Actual_Cash_Value,0.0));
					boatsMap.put("is_main_operator_same_as_owner",boat.Is_the_Principal_Operator_the_same_as_the_Applicant_Owner);
					boatsMap.put("main_operator_first_name",boat.First_Name);
					boatsMap.put("main_operator_last_name",boat.Last_Name);
					boatsMap.put("main_operator_dob",boat.Date_of_Birth);
					boatsMap.put("main_operator_boating_experience",boat.Principal_operator_s_years_of_boating_experience_with_vessels_of_a_similar_size_and_type);
					boatsMap.put("main_operator_hold_pcoc_card",boat.Does_the_operator_hold_a_Pleasure_Craft_Operator_s_Card_PCOC);
					boatsMap.put("coverage_name",boat.Select_coverage_for_policy);
					boatsMap.put("premium_per_year",boat.Premium_Per_Year);
					boatsMap.put("coverage",boat.Boat_Coverage);
					boatsMap.put("liability_coverage",boat.Liability_coverage);
					boatsMap.put("deductible",boat.Deductible);
					boatsMap.put("personal_effects_coverage",boat.Personal_Effects_Coverage);
					boatsMap.put("navigational_equipment_coverage",boat.Navigational_Equipment_Coverage);
					boatsMap.put("salvage",boat.Salvage);
					boatsMap.put("pollution",boat.Pollution);
					boatsMap.put("removal_of_wreckage",boat.Removal_of_Wreckage);
					boatsMap.put("emergency_towing_limit",boat.Emergency_Towing_Limit);
					boatsMap.put("uninsured_underinsured_boater_endorsement",boat.Uninsured_Underinsured_Boater_Endorsement);
					boatsMap.put("loss_of_use_limit",boat.Loss_of_Use_Limit);
					boatsMap.put("will_boat_be_used_in_atlantic_pacific_questions",boat.Do_any_of_the_above_statements_apply_to_the_watercraft_Atlantic_Pacific);
					boatsMap.put("is_boat_rented_or_carry_passengers_or_existing_damages_questions",boat.Do_any_of_the_above_statements_apply_to_the_watercraft_engine_Parasailing_propane);
					boatsMap.put("is_boat_layered_up_and_safety_questions",boat.Do_any_of_the_above_apply_to_the_watercraft_safety_requirements);
					boatsMap.put("is_owner_employees_or_lives_on",boat.Do_any_of_the_above_apply_to_the_applicant_Owner_primary_residence);
					// new fields addded Po admin 5 year overide
					if(boat.Admin_Override == "Yes")
					{
						boatsMap.put("operator_have_claim_in_last_5_years",boat.Has_the_principal_operator_had_any_motor_vehicle_claims_in_the_last_5_years);
						if(boat.Has_the_principal_operator_had_any_motor_vehicle_claims_in_the_last_5_years == "Yes")
						{
							boatsMap.put("how_many_claims",boat.How_many_motor_vehicle_claims);
						}
					}
					// new fields addded Po admin 3 year overide
					if(boat.PO_admin_3year_Override == "Yes")
					{
						boatsMap.put("operator_have_motor_convictions_in_last_3_years",boat.Has_the_principal_operator_had_any_motor_vehicle_convictions_in_the_last_3_years);
						if(boat.Has_the_principal_operator_had_any_motor_vehicle_convictions_in_the_last_3_years == "Yes")
						{
							boatsMap.put("how_many_convictions",boat.How_many_motor_vehicle_convictions);
						}
					}
					// new fields addded Po admin Licnense overide
					if(boat.PO_admin_License_Override == "Yes")
					{
						boatsMap.put("operator_had_suspended_driver_license",boat.Has_the_principal_operator_had_their_driver_s_license_suspended);
						if(boat.Has_the_principal_operator_had_their_driver_s_license_suspended == "Yes")
						{
							boatsMap.put("when_suspended",boat.Tell_us_more);
						}
					}
					boatsMap.put("length_in_feet",boat.Lengths);
					boatsMap.put("hull_serial_id",boat.Hull_ID_Serial);
					boatsMap.put("hull_type",boat.Hull_Type);
					boatsMap.put("hull_type_for_others",ifnull(boat.Other_Hull_Type,""));
					boatsMap.put("max_est_speed",boat.Estimated_max_speed);
					boatsMap.put("engine1_type",boat.Types);
					boatsMap.put("engine1_others_type",ifnull(boat.Enter_the_type,""));
					boatsMap.put("engine1_fuel_type",boat.Fuel_Type);
					boatsMap.put("engine1_model_year",boat.Model_Year);
					boatsMap.put("engine1_manufacturer",boat.Manufacturer);
					boatsMap.put("engine1_serial_number",boat.Serial);
					boatsMap.put("engine1_horse_power",boat.Horsepower);
					boatsMap.put("engine2_type",boat.Types1);
					boatsMap.put("engine2_others_type",ifnull(boat.Enter_the_type1,""));
					boatsMap.put("engine2_fuel_type",boat.Fuel_Type1);
					boatsMap.put("engine2_model_year",boat.Model_Year1);
					boatsMap.put("engine2_manufacturer",boat.Manufacturer1);
					boatsMap.put("engine2_serial_number",boat.Serial1);
					boatsMap.put("engine2_horse_power",boat.Horsepower1);
					boatsMap.put("add_a_trailer",boat.Add_a_trailer);
					//condition added based on api 
					// 				if ( boat.Add_a_trailer == true ) 
					//                 {
					boatsMap.put("trailer_value",boat.Trailer_Value);
					boatsMap.put("trailer_model_year",boat.Trailer_Model_Year);
					boatsMap.put("trailer_manufacturer",boat.Trailer_Manufacturer);
					boatsMap.put("trailer_vin",boat.Trailer_VIN);
					boatsMap.put("trailer_length",boat.Trailer_Length);
					//	}
					boatsMap.put("add_a_tender",boat.Add_a_tender);
					// 				if ( boat.Add_a_tender == true ) 
					//                 {
					boatsMap.put("tender_value",boat.Tender_Value);
					boatsMap.put("tender_model_year",boat.Tender_Model_Year);
					boatsMap.put("tender_manufacturer",boat.Tender_Manufacturer);
					boatsMap.put("tender_vin",boat.Tender_Serial);
					boatsMap.put("tender_length",boat.Tender_Length);
					//	}
					boatsMap.put("add_auxiliary_motor",boat.Add_an_auxiliary_motor);
					// 				if ( boat.Add_an_auxiliary_motor == true ) 
					//                 {
					boatsMap.put("aux_value",boat.Aux_Engine_Value);
					boatsMap.put("aux_model_year",boat.Aux_Engine_Model_Year);
					boatsMap.put("aux_manufacturer",boat.Aux_Engine_Manufacturer);
					//	}
					//boatsMap.put("aux_vin",boat.aux);
					//boatsMap.put("aux_length",boat);
					boatsMap.put("is_financed",boat.Is_this_boat_financed);
					if(boat.Lein_holder != null)
					{
						fetchLein = Lein_holder_Details[ID == boat.Lein_holder];
						boatsMap.put("select_a_financier",fetchLein.Name_of_Financier);
					}
					boatsMap.put("financier_name",boat.Name_of_Financier);
					boatsMap.put("financier_address_line1",boat.Address_line1);
					boatsMap.put("financier_address_line2",boat.Address_line2);
					boatsMap.put("financier_city",boat.City);
					boatsMap.put("financier_province",boat.Province);
					boatsMap.put("financier_postal_code",boat.Postal_Code);
					boatsMap.put("financier_country",boat.Country);
					boatsMap.put("creator_record_id",boat.ID);
					boat_list.add(boatsMap);
				}
				quoteupdate.put("boats",boat_list);
			}
			datamap.put("quote_updates",quoteupdate);
			//info datamap;
			//info "-------------Data Map End---------------";
			//-------------------Sync in Server---------------
			headerMap = Map();
			headerMap.put("Content-Type","application/json");
			resp = invokeurl
			[
				url :"https://insurance.theclsolutions.ca/recprotect/api/boat/update_quote_data_from_creators"
				type :POST
				parameters:datamap
				headers:headerMap
			];
			//	info resp;
			if(resp.get("success") == "true")
			{
				//	info boatquote_data.Migrated_to_Server = true;
			}
		}
	}
}