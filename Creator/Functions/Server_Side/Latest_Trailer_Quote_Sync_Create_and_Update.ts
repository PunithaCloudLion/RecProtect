void Server_Side.Latest_Trailer_Quote_Sync_Create_and_Update(int quote_id, string actiontype)
{
	try 
	{
		/* 
	Create By Vasanth
	Create on 27-02-2024
	Modified by 28-02-2024
	Description: Sync trailer quote to the Server - Deafult Server
	*/
		thisapp.Developer.addActivityLog("Server_Side.Latest_Trailer_Quote_Sync_Create_and_Update--" + quote_id.toString() + "Action type" + actiontype,"Create or update Trailer in server--" + quote_id.toString(),"Start","");
		url = "https://creator.zoho.com/appbuilder/service_recprotect/quotation/customFunction/Server_Side.Latest_Trailer_Quote_Sync_Create_and_Update/edit";
		orgString = thisapp.Server_Side.org_info();
		fetchEndPoint = API_Configuration[Name_Process == "Trailer Sync to Webapp - Update"].End_Point;
		trailerquote_data = TrailerQuote[ID == quote_id];
		if(!isnull(trailerquote_data.Customer_ID))
		{
			customer = Customer[ID == trailerquote_data.Customer_ID];
			if(customer.count() > 0)
			{
				customer_id = customer.ID.toString();
				if(!isNull(customer.Server_Customer_ID))
				{
					customer_server_id = customer.Server_Customer_ID;
				}
			}
		}
		if(trailerquote_data.count() > 0)
		{
			//-----------------Parameters List--------
			datamap = Map();
			quoteupdate = Map();
			//------------------Request Params-------------
			datamap.put("action_type",actiontype);
			if(actiontype == "UPDATE")
			{
				datamap.put("quote_record_id",trailerquote_data.Quote_Record_ID_Server);
			}
			//----------------Quote Update Object Structure------------------
			if(!isNull(quote_id))
			{
				quoteupdate.put("quote_id",trailerquote_data.Quote_ID);
			}
			if(!isNull(trailerquote_data.Policy_Number))
			{
				quoteupdate.put("policy_number",trailerquote_data.Policy_Number);
			}
			quoteupdate.put("organization_id",orgString);
			if(!isNull(trailerquote_data.Customer_ID))
			{
				if(!isNull(trailerquote_data.Customer_ID.Server_Customer_ID))
				{
					quoteupdate.put("customer_id",trailerquote_data.Customer_ID.Server_Customer_ID);
				}
			}
			if(!isNull(trailerquote_data.Quote_Status))
			{
				quoteupdate.put("quote_status",trailerquote_data.Quote_Status);
			}
			if(!isNull(trailerquote_data.Policy_Status))
			{
				quoteupdate.put("policy_status",trailerquote_data.Policy_Status);
			}
			if(!isNull(trailerquote_data.Deal_Type))
			{
				quoteupdate.put("deal_type",trailerquote_data.Deal_Type);
			}
			// 			if(!isNull(trailerquote_data.Are_there_any_additional_names_on_the_trailer_ownership))
			// 			{
			quoteupdate.put("any_additional_names",if(trailerquote_data.Are_there_any_additional_names_on_the_trailer_ownership == "Yes",true,false));
			// 			}
			//-----------------------Additional Names Object----------------
			if(!isNull(trailerquote_data.Are_there_any_additional_names_on_the_trailer_ownership))
			{
				additionalNameAvailable = false;
				if(trailerquote_data.Are_there_any_additional_names_on_the_trailer_ownership == "Yes")
				{
					additionalNameAvailable = true;
				}
				if(additionalNameAvailable == true)
				{
					additional_names_list = List();
					for each  names in trailerquote_data.Additional_Names
					{
						if(names.First_Name != null && names.Last_Name != null)
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
					if(additional_names_list.size() > 0)
					{
						quoteupdate.put("additional_names",additional_names_list);
					}
				}
			}
			//---------------trailer Object Map:-------------
			if(!isNull(trailerquote_data.Please_select_the_province_your_trailer_is_located_in))
			{
				quoteupdate.put("located_province",trailerquote_data.Please_select_the_province_your_trailer_is_located_in);
			}
			if(!isNull(trailerquote_data.How_many_trailers_would_you_like_to_insure))
			{
				quoteupdate.put("number_of_trailers",trailerquote_data.How_many_trailers_would_you_like_to_insure.tolong());
			}
			if(trailerquote_data.Trailer != null)
			{
				trailer_list = List();
				for each  trailer in trailerquote_data.Trailer
				{
					trailerMap = Map();
					trailerMap.put("creator_record_id",trailer.ID.toString());
					if(!isNull(trailer.Select_Trailer_Type))
					{
						trailerMap.put("type",trailer.Select_Trailer_Type);
					}
					if(!isNull(trailer.Trailer_Model_Year))
					{
						trailerMap.put("year",trailer.Trailer_Model_Year.toLong());
					}
					// 					if(trailer.Are_you_the_original_owner_of_the_trailer == "Yes")
					// 					{
					// 						trailerMap.put("original_owner",true);
					// 					}
					if(!isNull(trailer.Are_you_the_original_owner_of_the_trailer))
					{
						trailerMap.put("original_owner",if(trailer.Are_you_the_original_owner_of_the_trailer == "Yes",true,false));
					}
					if(!isNull(trailer.Replacement_Cost))
					{
						trailerMap.put("replacement_cost",trailer.Replacement_Cost);
					}
					// 					if(trailer.RCV_Exceeding_Limits_UW_Approved == true)
					// 					{
					trailerMap.put("override_for_exceeding_RCV",trailer.RCV_Exceeding_Limits_UW_Approved);
					//	}
					if(!isNull(trailer.Actual_Cash_Value))
					{
						trailerMap.put("actual_cost_value",trailer.Actual_Cash_Value);
					}
					trailerMap.put("override_for_exceeding_ACV",trailer.ACV_Exceeding_Limits_UW_Approved);
					if(!isNull(trailer.Is_your_trailer_parked_within_500_feet_of_a_body_of_water))
					{
						trailerMap.put("parked_within_500feet_of_waterbody",if(trailer.Is_your_trailer_parked_within_500_feet_of_a_body_of_water == "Yes",true,false));
					}
					if(!isNull(trailer.Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground))
					{
						trailerMap.put("permanently_or_seasonally_parked",if(trailer.Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground == "Yes",true,false));
					}
					if(!isNull(trailer.Where_is_the_trailer_stored_while_not_in_use))
					{
						trailerMap.put("stored_location_while_not_in_use",trailer.Where_is_the_trailer_stored_while_not_in_use);
					}
					if(!isNull(trailer.Is_the_trailer_taken_into_the_USA_for_more_than_180_days))
					{
						trailerMap.put("taken_to_us_gt_180_days",if(trailer.Is_the_trailer_taken_into_the_USA_for_more_than_180_days == "Yes",true,false));
					}
					if(!isNull(trailer.How_long_have_you_owned_this_trailer))
					{
						trailerMap.put("how_long_owned_trailer",trailer.How_long_have_you_owned_this_trailer);
					}
					if(!isNull(trailer.Is_the_trailer_removed_from_the_park_in_the_off_season))
					{
						trailerMap.put("removed_in_off_season",if(trailer.Is_the_trailer_removed_from_the_park_in_the_off_season == "Yes",true,false));
					}
					if(!isNull(trailer.Please_provide_address_of_storage_location))
					{
						trailerMap.put("location_moved_to_in_off_season",trailer.Please_provide_address_of_storage_location);
					}
					if(!isNull(trailer.Do_you_have_a_deck))
					{
						trailerMap.put("have_deck",if(trailer.Do_you_have_a_deck == "Yes",true,false));
					}
					if(!isNull(trailer.Do_you_have_a_screened_in_room_or_a_Florida_room))
					{
						trailerMap.put("have_screened_or_florida_room",if(trailer.Do_you_have_a_screened_in_room_or_a_Florida_room == "Yes",true,false));
					}
					if(!isNull(trailer.Do_you_have_a_hard_awning))
					{
						trailerMap.put("have_hard_awning",if(trailer.Do_you_have_a_hard_awning == "Yes",true,false));
					}
					if(!isNull(trailer.Would_you_like_to_insure_a_golf_cart))
					{
						trailerMap.put("like_to_insure_golf_cart",if(trailer.Would_you_like_to_insure_a_golf_cart == "Yes",true,false));
					}
					if(!isNull(trailer.Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2))
					{
						trailerMap.put("keep_golfcarts_even_not_permanently_parked",if(trailer.Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2 == "Yes",true,false));
					}
					if(!isNull(trailer.Number_of_Golf_Cart))
					{
						trailerMap.put("number_of_golf_cart",trailer.Number_of_Golf_Cart.toLong());
					}
					if(!isNull(trailer.Value_of_Golf_Cart_1))
					{
						trailerMap.put("golf_cart_value1",trailer.Value_of_Golf_Cart_1);
					}
					if(!isNull(trailer.Value_of_Golf_Cart_2))
					{
						trailerMap.put("golf_cart_value2",trailer.Value_of_Golf_Cart_2);
					}
					// 					if(trailer.Override_Preferred_Park_Discount == true)
					// 					{
					trailerMap.put("overrided_preferred_park_discount",trailer.Override_Preferred_Park_Discount);
					//}
					if(!isNull(trailer.Park_Name))
					{
						trailerMap.put("park_name_or_location",trailer.Park_Name);
					}
					if(!isNull(trailer.Address_Lines1))
					{
						trailerMap.put("park_address",trailer.Address_Lines1);
					}
					if(!isNull(trailer.City))
					{
						trailerMap.put("park_city",trailer.City);
					}
					if(!isNull(trailer.Province))
					{
						trailerMap.put("park_province",trailer.Province);
					}
					if(!isNull(trailer.PostalCode))
					{
						trailerMap.put("park_postalcode",trailer.PostalCode);
					}
					if(!isNull(trailer.Site_Number))
					{
						trailerMap.put("park_site_number",trailer.Site_Number);
					}
					if(!isNull(trailer.Select_coverage_for_policy))
					{
						trailerMap.put("coverage_name",trailer.Select_coverage_for_policy);
					}
					if(!isNull(trailer.Premium_Per_Year))
					{
						trailerMap.put("premium_per_year",trailer.Premium_Per_Year);
					}
					if(!isNull(trailer.Trailer_Coverage))
					{
						if(trailer.Trailer_Coverage.isNumber() == true)
						{
							trailerMap.put("coverage",trailer.Trailer_Coverage.toLong());
						}
					}
					if(!isNull(trailer.Coverage_Type))
					{
						trailerMap.put("coverage_type",trailer.Coverage_Type);
					}
					if(!isNull(trailer.Detached_Private_Structure_Coverage_Sheds_etc))
					{
						if(trailer.Detached_Private_Structure_Coverage_Sheds_etc.isNumber() == true)
						{
							trailerMap.put("detached_private_structure_coverage",trailer.Detached_Private_Structure_Coverage_Sheds_etc.toLong());
						}
					}
					// 					if(trailer.DPS_Coverage_Admin_Override == true)
					// 					{
					trailerMap.put("override_default_detached_private_structure_coverage",trailer.DPS_Coverage_Admin_Override);
					//}
					if(!isNull(trailer.Personal_Property_Coverage_T_V_Furniture_etc))
					{
						if(trailer.Personal_Property_Coverage_T_V_Furniture_etc.isNumber() == true)
						{
							trailerMap.put("personal_property_coverage",trailer.Personal_Property_Coverage_T_V_Furniture_etc.toLong());
						}
					}
					// 					if(trailer.PP_Admin_Override == true)
					// 					{
					trailerMap.put("override_default_personal_property_coverage",trailer.PP_Admin_Override);
					//	}
					if(!isNull(trailer.Premises_Liability))
					{
						trailerMap.put("permises_liability",trailer.Premises_Liability);
					}
					if(!isNull(trailer.Deductible))
					{
						if(trailer.Deductible.isNumber() == true)
						{
							trailerMap.put("deductible",trailer.Deductible.toLong());
						}
					}
					// 					if(trailer.Overland_Water_Protection == true)
					// 					{
					trailerMap.put("overland_water_protection",trailer.Overland_Water_Protection);
					//}
					if(!isNull(trailer.Do_you_live_in_the_trailer_full_time_all_year_round_as_a_principal_residence))
					{
						trailerMap.put("is_principal_residence",if(trailer.Do_you_live_in_the_trailer_full_time_all_year_round_as_a_principal_residence == "Yes",true,false));
					}
					if(!isNull(trailer.Is_the_unit_used_strictly_for_pleasure_purposes_with_no_rental_or_business_use_of_any_kind))
					{
						trailerMap.put("have_rental_or_business_use",if(trailer.Is_the_unit_used_strictly_for_pleasure_purposes_with_no_rental_or_business_use_of_any_kind == "Yes",true,false));
					}
					if(!isNull(trailer.Is_there_any_heating_that_wasn_t_factory_installed_wood_stove_pellet_stove_etc))
					{
						trailerMap.put("have_heating_that_was_not_factory_installed",if(trailer.Is_there_any_heating_that_wasn_t_factory_installed_wood_stove_pellet_stove_etc == "Yes",true,false));
					}
					if(!isNull(trailer.Heating_Type))
					{
						trailerMap.put("non_factory_heating_type",trailer.Heating_Type);
					}
					if(!isNull(trailer.Is_this_a_dual_purpose_trailer_toy_hauler_horse_trailer))
					{
						trailerMap.put("is_dual_purpose",if(trailer.Is_this_a_dual_purpose_trailer_toy_hauler_horse_trailer == "Yes",true,false));
					}
					if(!isNull(trailer.Trailer_Purpose_Type))
					{
						trailerMap.put("purpose_type",trailer.Trailer_Purpose_Type);
					}
					if(!isNull(trailer.Please_select_which_items_are_being_hauled))
					{
						trailerMap.put("items_of_purpose",trailer.Please_select_which_items_are_being_hauled);
					}
					if(!isNull(trailer.Are_there_any_modifications_to_the_trailer_ie_Addition_of_permanently_installed_solar_panels))
					{
						trailerMap.put("have_modifications",if(trailer.Are_there_any_modifications_to_the_trailer_ie_Addition_of_permanently_installed_solar_panels == "Yes",true,false));
					}
					if(!isNull(trailer.select_the_modification_trailer_type))
					{
						trailerMap.put("modification_type",trailer.select_the_modification_trailer_type);
					}
					if(!isNull(trailer.Are_the_solar_panels_factory_dealer_installed))
					{
						trailerMap.put("is_solar_panels_factory_or_dealer_installed",if(trailer.Are_the_solar_panels_factory_dealer_installed == "Yes",true,false));
					}
					if(!isNull(trailer.This_insurance_policy_does_not_cover_aftermarket_solar_panels_or_any_damage_arising_from_the_insta))
					{
						trailerMap.put("not_cover_aftermarket_solarpanels_installation",if(trailer.This_insurance_policy_does_not_cover_aftermarket_solar_panels_or_any_damage_arising_from_the_insta == "Yes",true,false));
					}
					if(!isNull(trailer.Please_add_details_on_interior_upgrades))
					{
						trailerMap.put("interior_upgrades_comments",trailer.Please_add_details_on_interior_upgrades);
					}
					if(!isNull(trailer.Is_there_any_pre_existing_damage_on_the_trailer))
					{
						trailerMap.put("any_pre_existing_damage",if(trailer.Is_there_any_pre_existing_damage_on_the_trailer == "Yes",true,false));
					}
					// 					if(trailer.UW_Approved == true)
					// 					{
					trailerMap.put("have_uw_approval_for_existing_damage",trailer.UW_Approved);
					//}
					if(!isNull(trailer.Describe_Damage))
					{
						trailerMap.put("describe_damage",trailer.Describe_Damage);
					}
					if(!isNull(trailer.Is_the_trailer_motorized_and_able_to_travel_on_its_own_without_a_towing_vehicle))
					{
						trailerMap.put("is_motorized",if(trailer.Is_the_trailer_motorized_and_able_to_travel_on_its_own_without_a_towing_vehicle == "Yes",true,false));
					}
					if(!isNull(trailer.Trailer_Manufacturer))
					{
						trailerMap.put("manufacturer",trailer.Trailer_Manufacturer);
					}
					if(!isNull(trailer.Trailer_Model))
					{
						trailerMap.put("model",trailer.Trailer_Model);
					}
					if(!isNull(trailer.Trailer_Length))
					{
						trailerMap.put("length_in_feet",trailer.Trailer_Length);
					}
					if(!isNull(trailer.Trailer_Width))
					{
						trailerMap.put("width_in_feet",trailer.Trailer_Width);
					}
					if(!isNull(trailer.VIN))
					{
						trailerMap.put("VIN",trailer.VIN);
					}
					if(!isNull(trailer.Deck_Length))
					{
						trailerMap.put("deck_length_ft",trailer.Deck_Length);
					}
					if(!isNull(trailer.Deck_Width))
					{
						trailerMap.put("deck_width_ft",trailer.Deck_Width);
					}
					if(!isNull(trailer.Screened_in_room_or_Florida_room_Length))
					{
						trailerMap.put("screened_or_florida_room_length_ft",trailer.Screened_in_room_or_Florida_room_Length);
					}
					if(!isNull(trailer.Screened_in_room_or_Florida_room_Width))
					{
						trailerMap.put("screened_or_florida_room_width_ft",trailer.Screened_in_room_or_Florida_room_Width);
					}
					if(!isNull(trailer.Hard_Awning_Length))
					{
						trailerMap.put("hard_awning_length",trailer.Hard_Awning_Length);
					}
					if(!isNull(trailer.Hard_Awning_Width))
					{
						trailerMap.put("hard_awning_width",trailer.Hard_Awning_Width);
					}
					if(!isNull(trailer.Is_this_trailer_financed))
					{
						trailerMap.put("is_financed",if(trailer.Is_this_trailer_financed == "Yes",true,false));
					}
					if(!isNull(trailer.Name_of_Financier))
					{
						trailerMap.put("financier_name",trailer.Name_of_Financier);
					}
					if(!isNull(trailer.Address_line1))
					{
						trailerMap.put("financier_address_line1",trailer.Address_line1);
					}
					if(!isNull(trailer.Address_line2))
					{
						trailerMap.put("financier_address_line2",trailer.Address_line2);
					}
					if(!isNull(trailer.City1))
					{
						trailerMap.put("financier_city",trailer.City1);
					}
					if(!isNull(trailer.Province1))
					{
						trailerMap.put("financier_province",trailer.Province1);
					}
					if(!isNull(trailer.Postal_Code))
					{
						trailerMap.put("financier_postalcode",trailer.Postal_Code);
					}
					if(!isNull(trailer.Country))
					{
						trailerMap.put("financier_country",trailer.Country);
					}
					// 					if(trailer.Add_Snowbird_Endorsement == true)
					// 					{
					trailerMap.put("opted_for_snowbird_endorsment",trailer.Add_Snowbird_Endorsement);
					//}
					trailer_list.add(trailerMap);
				}
				if(trailer_list.size() > 0)
				{
					quoteupdate.put("trailers",trailer_list);
				}
			}
			//----------------trailer Object Map: End------------------
			if(!isNull(trailerquote_data.Inception_Date))
			{
				quoteupdate.put("inception_date",trailerquote_data.Inception_Date.tostring("dd/MM/yyyy"));
			}
			if(!isNull(trailerquote_data.Expiry_Date))
			{
				quoteupdate.put("expiry_date",trailerquote_data.Expiry_Date.tostring("dd/MM/yyyy"));
			}
			// 			if(trailerquote_data.Agree_to_terms_and_conditions == true)
			// 			{
			quoteupdate.put("agreed_to_tnc",trailerquote_data.Agree_to_terms_and_conditions);
			//	}
			quoteupdate.put("creator_record_id",trailerquote_data.ID.toString());
			if(!isnull(customer_id))
			{
				quoteupdate.put("customer_creator_record_id",customer_id);
			}
			if(!isNull(trailerquote_data.Policy_AutoRenewal_Status))
			{
				quoteupdate.put("auto_renewal_status",trailerquote_data.Policy_AutoRenewal_Status);
			}
			if(!isNull(trailerquote_data.Referral_Reason))
			{
				quoteupdate.put("referral_reason",trailerquote_data.Referral_Reason);
			}
			if(!isNull(trailerquote_data.Override_Tax_by_Admin))
			{
				quoteupdate.put("override_tax_percent_by_admin",if(trailerquote_data.Override_Tax_by_Admin == "Yes",true,false));
			}
			if(!isNull(trailerquote_data.Override_Tax))
			{
				quoteupdate.put("overrided_tax_percent",trailerquote_data.Override_Tax.Tax);
			}
			if(!isNull(trailerquote_data.Created_Source))
			{
				quoteupdate.put("created_source",trailerquote_data.Created_Source);
				// 				quoteupdate.put("modified_source",trailerquote_data.Source);
			}
			if(!isNull(trailerquote_data.Source))
			{
				quoteupdate.put("modified_source",trailerquote_data.Source);
			}
			if(!isNull(trailerquote_data.Carrier))
			{
				quoteupdate.put("carrier",trailerquote_data.Carrier);
			}
			if(!isNull(trailerquote_data.Total_Premium_before_tax))
			{
				quoteupdate.put("total_premium",trailerquote_data.Total_Premium_before_tax);
			}
			if(!isNull(trailerquote_data.Total_Tax))
			{
				quoteupdate.put("total_tax",trailerquote_data.Total_Tax);
			}
			if(!isNull(trailerquote_data.Fee))
			{
				quoteupdate.put("total_admin_fee",trailerquote_data.Fee);
			}
			if(!isNull(trailerquote_data.Tax_Precent))
			{
				quoteupdate.put("tax_percent",trailerquote_data.Tax_Precent);
			}
			if(!isNull(trailerquote_data.Total_Payable_Premium_after_tax))
			{
				quoteupdate.put("total_premium_after_tax",trailerquote_data.Total_Payable_Premium_after_tax);
			}
			quoteupdate.put("is_migrated_record",trailerquote_data.Migrated);
			//--------------------quote_updates structure End -------
			datamap.put("quote_updates",quoteupdate);
			// 			info "datamap--->" + datamap;
			// 			info "------------------data map end --------------";
			//---------------------Sync to Server ApI Call Invoke Url------------------
			resp = thisapp.Server_Side.callServer("POST",fetchEndPoint,datamap);
			//	info "response---->" + resp;
			if(resp.isEmpty() == false)
			{
				if(resp.get("success") == "true")
				{
					trailerquote_data.Quote_Record_ID_Server=resp.get("data").get("quote_record_id");
					thisapp.Developer.addActivityLog("Server_Side.Latest_Trailer_Quote_Sync_Create_and_Update--" + quote_id.toString() + "Action type" + actiontype,"Create or update Trailer in server--" + quote_id.toString(),"create or update trailer in server" + resp,"");
				}
				else
				{
					thisapp.Developer.addDeveloperLog("Trailer Quote Sync Process --" + input.quote_id.toString(),"Server_Side.Latest_Trailer_Quote_Sync_Create_and_Update-" + url,"Trailer Quote ID response from Server is Failed",datamap.tostring(),"End Point--" + fetchEndPoint + " && Response Received--" + resp.tostring(),"Creator");
				}
			}
			else
			{
				thisapp.Developer.addDeveloperLog("Trailer Quote Sync Process --" + input.quote_id.toString(),"Server_Side.Latest_Trailer_Quote_Sync_Create_and_Update-" + url,"Trailer Quote ID response from Server is Empty",datamap.tostring(),"End Point--" + fetchEndPoint + " && Response Received--" + resp.tostring(),"Creator");
			}
		}
		thisapp.Developer.addActivityLog("Server_Side.Latest_Trailer_Quote_Sync_Create_and_Update -- " + quote_id.toString(),"Function Call End","","");
	}
	catch (e)
	{
		thisapp.Developer.addDeveloperLog("Trailer Quote Sync Process --" + input.quote_id.toString(),"Server_Side.Latest_Trailer_Quote_Sync_Create_and_Update-" + url,"Trailer Quote Create or Update to Server --" + datamap.tostring(),"End Point--" + fetchEndPoint + " && Response Received--" + resp.tostring(),e,"Creator");
	}
}