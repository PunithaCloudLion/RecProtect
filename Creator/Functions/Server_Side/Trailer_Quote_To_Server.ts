void Server_Side.Trailer_Quote_To_Server(int trailerID)
{
	try 
	{
		thisapp.Developer.addActivityLog("Server_Side.Trailer_Quote_To_Server--" + trailerID,"Function Call Start","ID","null");
		getTrailer = TrailerQuote[ID == trailerID];
		dataMap = Map();
		customerMap = Map();
		getCustomer = Customer[ID == getTrailer.Customer_ID];
		if(getCustomer.count() > 0)
		{
			customerMap.put("first_name",getCustomer.First_Name);
			customerMap.put("last_name",getCustomer.Last_Name);
			customerMap.put("email",getCustomer.Email);
			customerMap.put("phone",getCustomer.Phone_Number);
			// 	customerMap.put("dob",getCustomer.DOB);
			if(getCustomer.DOB != null)
			{
				customerMap.put("dob",getCustomer.DOB.toString("dd/MM/yyyy"));
			}
			customerMap.put("where_you_find_us",getCustomer.Where_Did_You_Find_Us);
			customerMap.put("mailing_address_line1",getCustomer.Address_Line1);
			customerMap.put("mailing_address_line2",getCustomer.Address_Line2);
			customerMap.put("mailing_city",getCustomer.City);
			customerMap.put("mailing_province",getCustomer.Province);
			customerMap.put("mailing_postalcode",getCustomer.Postal_Code);
			customerMap.put("mailing_country",getCustomer.Postal_Code);
			customerMap.put("creator_record_id",getCustomer.ID);
			customerMap.put("customer_type",getCustomer.Customer_Type);
			customerMap.put("dealership_option_name",getTrailer.Name_of_Dealership);
			customerMap.put("campground_option_name",getTrailer.Name_of_Campground);
			customerMap.put("marina_option_name",getTrailer.Name_of_Marina);
			customerMap.put("friend_option_name",getTrailer.Name);
			customerMap.put("creator_record_id",getTrailer.ID);
			dataMap.put("customer",customerMap);
			count = 0;
			if(getTrailer.Are_there_any_additional_names_on_the_trailer_ownership == "Yes")
			{
				additionalMap = Map();
				additionalMap2 = Map();
				additionalList1 = List();
				additionalList2 = List();
				for each  rec in getTrailer.Additional_Names
				{
					count = count + 1;
					if(count == 1)
					{
						customerID = rec.Customer_ID.ID;
						additionalMap.put("first_name",rec.First_Name);
						additionalMap.put("last_name",rec.Last_Name);
						additionalMap.put("email",rec.Email);
						additionalMap.put("phone",rec.Phone_Number);
						additionalMap.put("dob",rec.DOB);
						additionalList1.add(additionalMap);
					}
					else
					{
						customerID = rec.Customer_ID.ID;
						additionalMap2.put("first_name",rec.First_Name);
						additionalMap2.put("last_name",rec.Last_Name);
						additionalMap2.put("email",rec.Email);
						additionalMap2.put("phone",rec.Phone_Number);
						additionalMap2.put("dob",rec.DOB);
						additionalList2.add(additionalMap2);
					}
				}
				dataMap.put("additional_insured1",additionalMap);
				dataMap.put("additional_insured2",additionalMap2);
			}
			dataMap.put("quote_id",getTrailer.Quote_ID);
			dataMap.put("any_additional_names",getTrailer.Are_there_any_additional_names_on_the_trailer_ownership);
			dataMap.put("number_of_trailers",getTrailer.How_many_trailers_would_you_like_to_insure);
			quoteData = Map();
			quoteData.put("quote_status",getTrailer.Quote_Status);
			quoteData.put("located_province",getTrailer.Province);
			dataMap.put("quote_data",quoteData);
			additionalCustomer = Map();
			additionalCustomer.put("creator_record_id",customerID);
			dataMap.put("additional_names",additionalCustomer);
			dataMap.put("inception_date",getTrailer.Inception_Date);
			dataMap.put("expiry_date",getTrailer.Expiry_Date);
			dataMap.put("agreed_to_tnc",getTrailer.Agree_to_terms_and_conditions);
			dataMap.put("creator_record_id",getTrailer.ID);
			dataMap.put("customer_creator_record_id",getCustomer.ID);
			dataMap.put("referral_reason",getTrailer.Referral_Reason);
			trailerMap = Map();
			trailerList = List();
			if(getTrailer.Trailer != null)
			{
				for each  trailer in getTrailer.Trailer
				{
					trailerMap.put("type",trailer.Trailer_Purpose_Type);
					trailerMap.put("year",trailer.Trailer_Model_Year);
					trailerMap.put("original_owner",trailer.Are_you_the_original_owner_of_the_trailer);
					trailerMap.put("replacement_cost",trailer.Replacement_Cost);
					trailerMap.put("actual_cost_value",trailer.Actual_Cash_Value);
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
					trailerMap.put("is_motorized",trailer.Is_the_trailer_motorized_and_able_to_travel_on_its_own_without_a_towing_vehicle);
					trailerMap.put("manufacturer",trailer.Trailer_Manufacturer);
					trailerMap.put("model",trailer.select_the_modification_trailer_type);
					trailerMap.put("length_in_feet",trailer.Trailer_Length);
					trailerMap.put("width_in_feet",trailer.Trailer_Width);
					trailerMap.put("VIN",trailer.VIN);
					trailerMap.put("deck_length_ft",trailer.Deck_Length);
					trailerMap.put("deck_length_ft",trailer.VIN);
					trailerMap.put("deck_width_ft",trailer.VIN);
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
					trailerMap.put("creator_record_id",rec.ID);
					trailerList.add(trailerMap);
				}
				dataMap.put("trailers",trailerList);
				trailerPostData = invokeurl
				[
					url :"https://insurance.theclsolutions.ca/recprotect/api/boat/send_coverage_details"
					type :POST
					parameters:dataMap
				];
				//	info trailerPostData;
			}
		}
		thisapp.Developer.addActivityLog("Server_Side.Trailer_Quote_To_Server--" + trailerID.tostring(),"Function Call Ended and Record updated in webapp ","ID---" + trailerID,trailerPostData.tostring());
	}
	catch (e)
	{
		thisapp.Developer.addDeveloperLog("TrailerQuoteSync","Server_Side.Trailer_Quote_To_Server:" + trailerID.tostring(),"Record updated in webapp",trailerID.tostring(),e,"creator");
	}
}