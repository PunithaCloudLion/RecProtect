void Server_Side.Latest_Boat_Quote_Sync_Create_and_Update(int quote_id, string actiontype)
{
	try 
	{
		/* Create By Nambi Rajan
	Create on 27-02-2024
//----------------Modified--------------
	Modified by Vasanth on 29-02-2024 -- 
	To Update the Map and Null based on the recent APi document-- 
	API Link---"https://writer.zoho.com/writer/open/cv1ah4e9df2384b0a44f2877d5313028a6f9a?authId=%7B%22entity_id%22%3A%22CT_2198160324424593711_662660613%22%2C%22module%22%3A%22Chats%22%7D"
	Description: Sync Boat quote to the Server - Deafult Server
	*/
		url = "https://creator.zoho.com/appbuilder/service_recprotect/quotation/customFunction/Server_Side.Latest_Boat_Quote_Sync_Create_and_Update/edit";
		thisapp.Developer.addActivityLog("Boat Server Side - Sync Quote(Server_Side.Latest_Boat_Quote_Sync_Create_and_Update)--" + quote_id.toString(),"Boat Quote Sync into Server -- " + actiontype,"Funcation Call Start","");
		orgString = thisapp.Server_Side.org_info();
		fetchEndPoint = API_Configuration[Name_Process == "Boat Sync to Webapp - Update"].End_Point;
		boatquote_data = BoatQuote[ID == quote_id];
		if(!isnull(boatquote_data.Customer_ID))
		{
			customer = Customer[ID == boatquote_data.Customer_ID];
			if(customer.count() > 0)
			{
				customer_id = customer.ID.toString();
				if(!isNull(customer.Server_Customer_ID))
				{
					customer_server_id = customer.Server_Customer_ID;
				}
			}
		}
		if(boatquote_data.count() > 0)
		{
			//-----------------Parameters List--------
			datamap = Map();
			quoteupdate = Map();
			//------------------Request Params-------------
			datamap.put("action_type",actiontype);
			if(actiontype == "UPDATE")
			{
				datamap.put("quote_record_id",boatquote_data.Quote_Record_ID_Server);
			}
			//----------------Quote Update Object Structure------------------
			if(!isNull(boatquote_data.Quote_ID))
			{
				quoteupdate.put("quote_id",boatquote_data.Quote_ID);
			}
			if(!isNull(boatquote_data.Policy_Number))
			{
				quoteupdate.put("policy_number",boatquote_data.Policy_Number);
			}
			quoteupdate.put("organization_id",orgString);
			if(!isNull(boatquote_data.Customer_ID))
			{
				quoteupdate.put("customer_id",customer_server_id);
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
			//	info "additional Name->" + boatquote_data.Are_there_any_additional_names_on_the_boat_ownership;
			// 			if(!isNull(boatquote_data.Are_there_any_additional_names_on_the_boat_ownership))
			// 			{
			// 				
			quoteupdate.put("any_additional_names",if(boatquote_data.Are_there_any_additional_names_on_the_boat_ownership == "Yes",true,false));
			// 			}
			//--------------------quote_updates structure:- -------
			if(!isNull(boatquote_data.Are_there_any_additional_names_on_the_boat_ownership))
			{
				additionalNameAvailable = false;
				if(boatquote_data.Are_there_any_additional_names_on_the_boat_ownership == "Yes")
				{
					additionalNameAvailable = true;
				}
				if(additionalNameAvailable == true)
				{
					additional_names_list = List();
					for each  names in boatquote_data.Additional_Names
					{
						if(names.Additional_Insured_First_Name != null && names.Additional_Insured_Last_Name != null)
						{
							additional_names_map = Map();
							if(!isNull(names.Customer_ID))
							{
								if(!isNull(names.Customer_ID.Server_Customer_ID))
								{
									additional_names_map.put("customer_id",names.Customer_ID.Server_Customer_ID);
								}
								additional_names_map.put("creator_record_id",names.Customer_ID.toString());
								additional_names_list.add(additional_names_map);
							}
						}
					}
					//		info "additional_names_list --->" + additional_names_list;
					if(additional_names_list.size() > 0)
					{
						quoteupdate.put("additional_names",additional_names_list);
					}
				}
			}
			//-------------------------Additioanl Names End--------------
			//---------------Boat Object Map Starts-------------
			if(!isNull(boatquote_data.Please_select_the_province_your_boat_is_used_in))
			{
				quoteupdate.put("located_province",boatquote_data.Please_select_the_province_your_boat_is_used_in);
			}
			if(!isNull(boatquote_data.How_many_boats_would_you_like_to_insure))
			{
				quoteupdate.put("number_of_boats",boatquote_data.How_many_boats_would_you_like_to_insure.toLong());
			}
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
					// 					if(boat.Override_For_Age_15_Or_More == true)
					// 					{
					boatsMap.put("override_boat_age_for_15_or_more",boat.Override_For_Age_15_Or_More);
					//}
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
					// 					if(boat.RCV_Exceeding_Limits_UW_Approved == true)
					// 					{
					boatsMap.put("override_for_exceeding_RCV",boat.RCV_Exceeding_Limits_UW_Approved);
					//}
					if(!isNull(boat.Actual_Cash_Value))
					{
						boatsMap.put("actual_cost_value",boat.Actual_Cash_Value);
					}
					// 					if(boat.ACV_Exceeding_Limits_UW_Approved == true)
					// 					{
					boatsMap.put("override_for_exceeding_ACV",boat.ACV_Exceeding_Limits_UW_Approved);
					//}
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
						boatsMap.put("main_operator_dob",boat.Date_of_Birth.toString("dd/MM/yyyy"));
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
						if(boat.Deductible.contains("$") == true)
						{
							dedutibelValue = boat.Deductible.getsuffix("$");
						}
						else
						{
							dedutibelValue = boat.Deductible;
						}
						boatsMap.put("deductible",dedutibelValue.toLong());
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
					boat_list.add(boatsMap);
				}
				if(boat_list.size() > 0)
				{
					quoteupdate.put("boats",boat_list);
				}
			}
			//---------------Boat Object Map Ends-------------
			if(boatquote_data.Inception_Date != null)
			{
				quoteupdate.put("inception_date",boatquote_data.Inception_Date.tostring("dd/MM/yyyy"));
			}
			if(boatquote_data.Expiry_Date != null)
			{
				quoteupdate.put("expiry_date",boatquote_data.Expiry_Date.tostring("dd/MM/yyyy"));
			}
			// 			if(boatquote_data.Agree_to_terms_and_conditions == true)
			// 			{
			quoteupdate.put("agreed_to_tnc",boatquote_data.Agree_to_terms_and_conditions);
			//	}
			quoteupdate.put("creator_record_id",quote_id.toString());
			if(!isNull(boatquote_data.Customer_ID))
			{
				quoteupdate.put("customer_creator_record_id",boatquote_data.Customer_ID.toString());
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
				f_tax = Tax_Lists[ID == boatquote_data.Override_Tax];
				quoteupdate.put("overrided_tax_percent",f_tax.Tax);
			}
			if(!isNull(boatquote_data.Created_Source))
			{
				quoteupdate.put("created_source",boatquote_data.Created_Source);
				// 				quoteupdate.put("modified_source",trailerquote_data.Source);
			}
			if(!isNull(boatquote_data.Source))
			{
				quoteupdate.put("modified_source",boatquote_data.Source);
			}
			if(!isNull(boatquote_data.Carrier))
			{
				quoteupdate.put("carrier",boatquote_data.Carrier);
			}
			if(!isNull(boatquote_data.Total_Premium_before_tax))
			{
				quoteupdate.put("total_premium",boatquote_data.Total_Premium_before_tax);
			}
			if(!isNull(boatquote_data.Total_Tax))
			{
				quoteupdate.put("total_tax",boatquote_data.Total_Tax);
			}
			if(!isNull(boatquote_data.Fee))
			{
				quoteupdate.put("total_admin_fee",boatquote_data.Fee);
			}
			if(!isNull(boatquote_data.Tax_Precent))
			{
				quoteupdate.put("tax_percent",boatquote_data.Tax_Precent);
			}
			if(!isNull(boatquote_data.Total_Payable_Premium_after_tax))
			{
				quoteupdate.put("total_premium_after_tax",boatquote_data.Total_Payable_Premium_after_tax);
			}
			quoteupdate.put("is_migrated_record",boatquote_data.Migrated);
			//--------------------quote_updates structure End -------
			datamap.put("quote_updates",quoteupdate);
			// 			info datamap;
			// 			info "------------------data map end --------------";
			//----------------------Sync to Server------------
			// 			info fetchEndPoint;
			resp = thisapp.Server_Side.callServer("POST",fetchEndPoint,datamap);
			thisapp.Developer.addActivityLog("Server_Side.Latest_Boat_Quote_Sync_Create_and_Update--- --" + quote_id.toString() + "Action type--" + actiontype,"Create or update record in server","Search in CRM","Server--" + resp);
			//	info "Resp--" + resp;
			if(resp.isEmpty() == false)
			{
				if(resp.get("success") == "true")
				{
					boatquote_data.Quote_Record_ID_Server=resp.get("data").get("quote_record_id");
					thisapp.Developer.addActivityLog("Server_Side.Latest_Boat_Quote_Sync_Create_and_Update---" + quote_id.toString() + "Action type--" + actiontype,"Latest_Boat_Quote_Sync_Create_and_Update in server--" + quote_id.toString(),"Function End","");
				}
				else
				{
					thisapp.Developer.addDeveloperLog("Boat Quote Sync Process --" + input.quote_id.toString(),"Server_Side.Latest_Boat_Quote_Sync_Create_and_Update-" + url,"Boat Quote ID response from Server is Failed",datamap.tostring(),"End Point--" + fetchEndPoint + " && Response Received--" + resp.tostring(),"Creator");
				}
			}
			else
			{
				thisapp.Developer.addDeveloperLog("Boat Quote Sync Process --" + input.quote_id.toString(),"Server_Side.Latest_Boat_Quote_Sync_Create_and_Update-" + url,"Boat Quote ID response from Server is Empty",datamap.tostring(),"End Point--" + fetchEndPoint + " && Response Received--" + resp.tostring(),"Creator");
			}
		}
		thisapp.Developer.addActivityLog("Server_Side.Latest_Boat_Quote_Sync_Create_and_Update---" + quote_id.toString() + "Action type--" + actiontype,"Function Call End ","","");
	}
	catch (e)
	{
		// 		info e;
		thisapp.Developer.addDeveloperLog("Boat Quote Sync Process --" + input.quote_id.toString(),"Server_Side.Latest_Boat_Quote_Sync_Create_and_Update-" + url,"Boat Quote Create or Update to Server --" + datamap.tostring(),"End Point--" + fetchEndPoint + " && Response Received--" + resp.tostring(),e,"Creator");
	}
}