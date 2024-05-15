void Migration_to_Server.Trailer_Migrate()
{
	// 	weburl = API_Configuration[Name_Process == "Trailer Sync to Webapp - Update"].End_Point;
	weburl = "https://recprotectbackend-10073292108.development.catalystappsail.com/recprotect/api/trailer/create_or_update_trailer_quote_data_from_creators";
	//get_alltrailer = TrailerQuote[Migrated == true] range from 0 to 50;
	get_alltrailer = TrailerQuote[ID == 4564627000001023535];
	count = 0;
	if(get_alltrailer.count() > 0)
	{
		for each  trailerquote_data in get_alltrailer
		{
			count = count + 1;
			//-----------------Parameters List--------
			datamap = Map();
			quoteupdate = Map();
			datamap.put("quote_type","Trailer");
			datamap.put("quote_id",trailerquote_data.Quote_ID);
			datamap.put("quote_record_id",trailerquote_data.ID.toString());
			//--------------------quote_updates structure:- -------
			quoteupdate.put("creator_record_id",trailerquote_data.ID.toString());
			quoteupdate.put("customer_id",trailerquote_data.Customer_ID.Server_Customer_ID);
			quoteupdate.put("customer_creator_record_id",trailerquote_data.Customer_ID.toString());
			quoteupdate.put("any_additional_names",trailerquote_data.Are_there_any_additional_names_on_the_trailer_ownership);
			additional_names_list = List();
			for each  names in trailerquote_data.Additional_Names
			{
				additional_names_map = Map();
				additional_names_map.put("customer_id",names.Customer_ID.Server_Customer_ID);
				additional_names_map.put("creator_record_id",names.Customer_ID.toString());
				additional_names_list.add(additional_names_map);
			}
			quoteupdate.put("additional_names",additional_names_list);
			//---------------trailer :-------------
			if(trailerquote_data.Trailer != null)
			{
				trailer_list = List();
				for each  trailer in trailerquote_data.Trailer
				{
					trailerMap = Map();
					trailerMap.put("type",trailer.Trailer_Purpose_Type);
					trailerMap.put("year",trailer.Trailer_Model_Year);
					trailerMap.put("original_owner",trailer.Are_you_the_original_owner_of_the_trailer);
					trailerMap.put("replacement_cost",trailer.Replacement_Cost);
					trailerMap.put("actual_cost_value",trailer.Actual_Cash_Value);
					//----Newly mapped fields
					// 				trailerMap.put("override_for_exceeding_ACV", trailer.RCV_Exceeding_Limits_UW_Approved);
					// 				trailerMap.put("override_for_exceeding_RCV", trailer.ACV_Exceeding_Limits_UW_Approved);
					trailerMap.put("parked_within_500feet_of_waterbody",trailer.Is_your_trailer_parked_within_500_feet_of_a_body_of_water);
					trailerMap.put("permanently_or_seasonally_parked",trailer.Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground);
					trailerMap.put("stored_location_while_not_in_use",trailer.Where_is_the_trailer_stored_while_not_in_use);
					trailerMap.put("taken_to_us_gt_90_days",trailer.Is_the_trailer_taken_into_the_USA_for_more_than_180_days);
					trailerMap.put("how_long_owned_trailer",trailer.How_long_have_you_owned_this_trailer);
					trailerMap.put("removed_in_off_season",trailer.Is_the_trailer_removed_from_the_park_in_the_off_season);
					trailerMap.put("location_moved_to_in_off_season",trailer.Please_provide_address_of_storage_location);
					trailerMap.put("have_deck",trailer.Do_you_have_a_deck);
					trailerMap.put("have_screened_or_florida_room",trailer.Do_you_have_a_screened_in_room_or_a_Florida_room);
					trailerMap.put("have_hard_awning",trailer.Do_you_have_a_hard_awning);
					trailerMap.put("like_to_insure_golf_cart",trailer.Would_you_like_to_insure_a_golf_cart);
					trailerMap.put("number_of_golf_cart",trailer.Number_of_Golf_Cart);
					trailerMap.put("golf_cart_value1",trailer.Value_of_Golf_Cart_1);
					trailerMap.put("golf_cart_value2",trailer.Value_of_Golf_Cart_2);
					trailerMap.put("park_name_or_location",trailer.Park_Name);
					trailerMap.put("park_address",trailer.Address_Lines1);
					trailerMap.put("park_city",trailer.City);
					trailerMap.put("park_province",trailer.Province);
					trailerMap.put("park_postalcode",trailer.PostalCode);
					trailerMap.put("park_site_number",trailer.Site_Number);
					trailerMap.put("coverage_name",trailer.Select_coverage_for_policy);
					trailerMap.put("premium_per_year",trailer.Premium_Per_Year);
					trailerMap.put("coverage",trailer.Trailer_Coverage);
					trailerMap.put("coverage_type",trailer.Coverage_Type);
					trailerMap.put("detached_private_structure_coverage",trailer.Detached_Private_Structure_Coverage_Sheds_etc);
					// 				trailerMap.put("override_default_personal_property_coverage", trailer.Admin_Override);
					// 				trailerMap.put("override_default_detached_private_structure_coverage", trailer.DPS_Coverage_Admin_Override);
					trailerMap.put("personal_property_coverage",trailer.Personal_Property_Coverage_T_V_Furniture_etc);
					trailerMap.put("permises_liability",trailer.Premises_Liability);
					trailerMap.put("deductible",trailer.Deductible);
					trailerMap.put("overland_water_protection",trailer.Overland_Water_Protection);
					trailerMap.put("is_principal_residence",trailer.Do_you_live_in_the_trailer_full_time_all_year_round_as_a_principal_residence);
					trailerMap.put("have_rental_or_business_use",trailer.Is_the_unit_used_strictly_for_pleasure_purposes_with_no_rental_or_business_use_of_any_kind);
					trailerMap.put("have_heating_that_was_not_factory_installed",trailer.Is_the_unit_used_strictly_for_pleasure_purposes_with_no_rental_or_business_use_of_any_kind);
					trailerMap.put("non_factory_heating_type",trailer.Heating_Type);
					trailerMap.put("is_dual_purpose",trailer.Is_this_a_dual_purpose_trailer_toy_hauler_horse_trailer);
					trailerMap.put("purpose_type",trailer.Trailer_Purpose_Type);
					trailerMap.put("items_of_purpose",trailer.Please_select_which_items_are_being_hauled);
					trailerMap.put("have_modifications",trailer.Are_there_any_modifications_to_the_trailer_ie_Addition_of_permanently_installed_solar_panels);
					trailerMap.put("modification_type",trailer.select_the_modification_trailer_type);
					trailerMap.put("is_solar_panels_factory_or_dealer_installed",trailer.Are_the_solar_panels_factory_dealer_installed);
					trailerMap.put("not_cover_aftermarket_solarpanels_installation",trailer.This_insurance_policy_does_not_cover_aftermarket_solar_panels_or_any_damage_arising_from_the_insta);
					trailerMap.put("interior_upgrades_comments",trailer.Please_add_details_on_interior_upgrades);
					trailerMap.put("any_pre_existing_damage",trailer.Is_there_any_pre_existing_damage_on_the_trailer);
					//	trailerMap.put("have_uw_approval_for_existing_damage", trailer.UW_Approved);
					trailerMap.put("describe_damage",trailer.Describe_Damage);
					trailerMap.put("is_motorized",trailer.Is_the_trailer_motorized_and_able_to_travel_on_its_own_without_a_towing_vehicle);
					trailerMap.put("manufacturer",trailer.Trailer_Manufacturer);
					trailerMap.put("model",trailer.select_the_modification_trailer_type);
					trailerMap.put("length_in_feet",trailer.Trailer_Length);
					trailerMap.put("width_in_feet",trailer.Trailer_Width);
					trailerMap.put("VIN",trailer.VIN);
					trailerMap.put("deck_length_ft",trailer.Deck_Length);
					trailerMap.put("deck_width_ft",trailer.Deck_Width);
					trailerMap.put("screened_or_florida_room_length_ft",trailer.Screened_in_room_or_Florida_room_Length);
					trailerMap.put("screened_or_florida_room_width_ft",trailer.Screened_in_room_or_Florida_room_Width);
					trailerMap.put("hard_awning_length",trailer.Hard_Awning_Length);
					trailerMap.put("hard_awning_width",trailer.Hard_Awning_Width);
					trailerMap.put("is_financed",trailer.Is_this_trailer_financed);
					if(trailer.Lein_holder != null)
					{
						fetchLein = Lein_holder_Details[ID == trailer.Lein_holder];
						trailerMap.put("select_a_financier",fetchLein.Name_of_Financier);
					}
					trailerMap.put("financier_name",trailer.Name_of_Financier);
					trailerMap.put("financier_address_line1",trailer.Address_line1);
					trailerMap.put("financier_address_line2",trailer.Address_line2);
					trailerMap.put("financier_city",trailer.City1);
					trailerMap.put("financier_province",trailer.Province1);
					trailerMap.put("financier_country",trailer.Country);
					trailerMap.put("creator_record_id",trailer.ID.toString());
					//	trailerMap.put("opted_for_snowbird_endorsment", trailer.Add_Snowbird_Endorsement);
					trailer_list.add(trailerMap);
				}
				quoteupdate.put("trailers",trailer_list);
			}
			datamap.put("quote_updates",quoteupdate);
			//----------------------Sync to Server------------
			//	info datamap;
			//	info "Data map end-------------";
			headerMap = Map();
			//"https://recprotectbackend-10073292108.development.catalystappsail.com/recprotect/api/trailer/update_trailer_quote_data_from_creators"
			headerMap.put("Content-Type","application/json");
			resp = invokeurl
			[
				url :weburl
				type :POST
				parameters:datamap.toString()
				headers:headerMap
			];
			//	info resp;
			if(resp.get("success") == "true")
			{
				trailerquote_data.Quote_Record_ID_Server=resp.get("data").get("quote").get("quote_record_id");
				trailerquote_data.Migrated_to_Server=true;
			}
			else
			{
				trailerquote_data.Server_Migrated_Error_Resp=resp.toString();
			}
			//	info trailerquote_data.Quote_Record_ID_Server;
			//	info "End----" + count;
		}
		//	info count;
	}
}