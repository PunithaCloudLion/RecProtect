if(row.General_Field == true)
	{
		//--------------------------------Select the type-------------------------------------------
		if(row.Select_Trailer_Type == "Park Model/Destination Trailer")
		{
			hide row.RCV_Exceeding_Limits_UW_Approved;
			hide row.ACV_Exceeding_Limits_UW_Approved;
			show row.Trailer_Width;
			if(row.Select_coverage_for_policy == "Current Market Value Coverage")
			{
				if(row.Actual_Cash_Value < 25000 || row.Actual_Cash_Value > 375000)
				{
					row.Referral_Actual_cash_value=true;
					show row.ACV_Exceeding_Limits_UW_Approved;
					enable row.ACV_Exceeding_Limits_UW_Approved;
				}
				else
				{
					row.Referral_Actual_cash_value=false;
					row.ACV_Exceeding_Limits_UW_Approved=null;
					disable row.ACV_Exceeding_Limits_UW_Approved;
				}
			}
			if(row.Select_coverage_for_policy == "Replacement Value Coverage")
			{
				if(row.Replacement_Cost < 25000 || row.Replacement_Cost > 375000)
				{
					row.Referral_Replacement_cost=true;
					show row.RCV_Exceeding_Limits_UW_Approved;
					enable row.RCV_Exceeding_Limits_UW_Approved;
				}
				else
				{
					row.Referral_Replacement_cost=false;
					row.RCV_Exceeding_Limits_UW_Approved=null;
					disable row.RCV_Exceeding_Limits_UW_Approved;
				}
			}
			if(row.Trailer_Model_Year != null && row.Trailer_Model_Year != "")
			{
				currentYear = zoho.currentdate.getYear();
				yearsBetween = currentYear - row.Trailer_Model_Year.toLong();
				// ---- Below Line Added by Vignesh - restrict to empty the existing policy coverage value
				populateRowValue = row.Select_coverage_for_policy;
				if(yearsBetween < 25)
				{
					row.Coverage_Type="All Risk";
				}
				else
				{
					row.Coverage_Type="Named Perils";
				}
				if(yearsBetween <= 15)
				{
					//	info yearsBetween;
					show row.Replacement_Cost;
					show row.Actual_Cash_Value;
					rowalue = {"Current Market Value Coverage","Replacement Value Coverage"};
					row.Select_coverage_for_policy:ui.add(rowalue);
					row.Select_coverage_for_policy=populateRowValue;
				}
				else
				{
					row.Select_coverage_for_policy:ui.add("Current Market Value Coverage");
					row.Select_coverage_for_policy=populateRowValue;
					show row.Actual_Cash_Value;
					hide row.Replacement_Cost;
				}
			}
			show row.Do_you_have_a_deck;
			show row.Do_you_have_a_screened_in_room_or_a_Florida_room;
			show row.Do_you_have_a_hard_awning;
			show row.Would_you_like_to_insure_a_golf_cart;
			show row.Park_Details;
			show row.Address_Lines1;
			show row.City;
			show row.Province;
			show row.PostalCode;
			show row.Site_Number;
			hide row.Is_the_trailer_removed_from_the_park_in_the_off_season;
			hide row.Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground;
			hide row.Where_is_the_trailer_stored_while_not_in_use;
			hide row.Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2;
			hide row.Is_the_trailer_taken_into_the_USA_for_more_than_180_days;
			hide row.VIN;
			//---- No Of Golf Cart ----------
			hide row.Number_of_Golf_Cart;
			hide row.Value_of_Golf_Cart_1;
			hide row.Value_of_Golf_Cart_2;
			if(row.Would_you_like_to_insure_a_golf_cart == "Yes")
			{
				show row.Number_of_Golf_Cart;
				if(row.Number_of_Golf_Cart != null && row.Number_of_Golf_Cart != "")
				{
					if(row.Number_of_Golf_Cart == "1" || row.Number_of_Golf_Cart == "2")
					{
						show row.Value_of_Golf_Cart_1;
						if(row.Number_of_Golf_Cart == "2")
						{
							show row.Value_of_Golf_Cart_2;
						}
					}
				}
			}
		}
		else
		{
			hide row.Trailer_Width;
			if(row.Select_coverage_for_policy == "Current Market Value Coverage")
			{
				if(row.Actual_Cash_Value < 10000 || row.Actual_Cash_Value > 250000)
				{
					row.Referral_Actual_cash_value=true;
					enable row.ACV_Exceeding_Limits_UW_Approved;
					show row.ACV_Exceeding_Limits_UW_Approved;
				}
				else
				{
					row.Referral_Actual_cash_value=false;
					row.ACV_Exceeding_Limits_UW_Approved=null;
					disable row.ACV_Exceeding_Limits_UW_Approved;
				}
			}
			if(row.Select_coverage_for_policy == "Replacement Value Coverage")
			{
				if(row.Replacement_Cost < 10000 || row.Replacement_Cost > 250000)
				{
					row.Referral_Replacement_cost=true;
					enable row.RCV_Exceeding_Limits_UW_Approved;
					show row.RCV_Exceeding_Limits_UW_Approved;
				}
				else
				{
					row.Referral_Replacement_cost=false;
					row.RCV_Exceeding_Limits_UW_Approved=null;
					disable row.RCV_Exceeding_Limits_UW_Approved;
				}
			}
			if(row.Trailer_Model_Year != null && row.Trailer_Model_Year != "")
			{
				//info "hi";
				currentYear = zoho.currentdate.getYear();
				yearsBetween = currentYear - row.Trailer_Model_Year.toLong();
				// ---- Below Line Added by Vignesh - restrict to empty the existing policy coverage value
				populateRowValue = row.Select_coverage_for_policy;
				if(yearsBetween < 15)
				{
					row.Coverage_Type="All Risk";
				}
				else
				{
					row.Coverage_Type="Named Perils";
				}
				if(yearsBetween <= 10)
				{
					rowalue = {"Current Market Value Coverage","Replacement Value Coverage"};
					row.Select_coverage_for_policy:ui.add(rowalue);
					row.Select_coverage_for_policy=populateRowValue;
					show row.Replacement_Cost;
					show row.Actual_Cash_Value;
				}
				else
				{
					row.Select_coverage_for_policy:ui.add("Current Market Value Coverage");
					row.Select_coverage_for_policy=populateRowValue;
					show row.Actual_Cash_Value;
					hide row.Replacement_Cost;
				}
			}
			show row.Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground;
			hide row.Value_of_Golf_Cart_2;
			hide row.Value_of_Golf_Cart_1;
			hide row.Number_of_Golf_Cart;
			if(row.Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground == "Yes")
			{
				hide row.Where_is_the_trailer_stored_while_not_in_use;
				hide row.Is_the_trailer_taken_into_the_USA_for_more_than_180_days;
				show row.Is_the_trailer_removed_from_the_park_in_the_off_season;
				show row.Do_you_have_a_deck;
				show row.Do_you_have_a_screened_in_room_or_a_Florida_room;
				show row.Do_you_have_a_hard_awning;
				show row.Would_you_like_to_insure_a_golf_cart;
				show row.Address_Lines1;
				show row.City;
				show row.Province;
				show row.PostalCode;
				show row.Site_Number;
				show row.Park_Details;
				// --- Vignesh Code ----
				hide row.Value_of_Golf_Cart_2;
				hide row.Value_of_Golf_Cart_1;
				hide row.Number_of_Golf_Cart;
				if(row.Would_you_like_to_insure_a_golf_cart == "Yes")
				{
					show row.Number_of_Golf_Cart;
					if(row.Number_of_Golf_Cart != null && row.Number_of_Golf_Cart != "")
					{
						if(row.Number_of_Golf_Cart == "1" || row.Number_of_Golf_Cart == "2")
						{
							show row.Value_of_Golf_Cart_1;
							if(row.Number_of_Golf_Cart == "2")
							{
								show row.Value_of_Golf_Cart_2;
							}
						}
					}
				}
			}
			if(row.Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground == "No")
			{
				show row.Where_is_the_trailer_stored_while_not_in_use;
				show row.Is_the_trailer_taken_into_the_USA_for_more_than_180_days;
				hide row.Is_the_trailer_removed_from_the_park_in_the_off_season;
				hide row.Do_you_have_a_deck;
				hide row.Do_you_have_a_screened_in_room_or_a_Florida_room;
				hide row.Do_you_have_a_hard_awning;
				hide row.Would_you_like_to_insure_a_golf_cart;
				hide row.Park_Details;
				hide row.Value_of_Golf_Cart_2;
				hide row.Value_of_Golf_Cart_1;
				hide row.Number_of_Golf_Cart;
				if(row.Would_you_like_to_insure_a_golf_cart == "Yes")
				{
					if(row.Number_of_Golf_Cart != null && row.Number_of_Golf_Cart != "")
					{
						show row.Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2;
						if(row.Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2 == "Yes")
						{
							if(row.Number_of_Golf_Cart == "1" || row.Number_of_Golf_Cart == "2")
							{
								show row.Value_of_Golf_Cart_1;
								if(row.Number_of_Golf_Cart == "2")
								{
									show row.Value_of_Golf_Cart_2;
								}
							}
						}
						else
						{
							row.Number_of_Golf_Cart="";
							row.Value_of_Golf_Cart_1=null;
							row.Value_of_Golf_Cart_2=null;
							hide row.Override_Preferred_Park_Discount;
						}
					}
					else
					{
						hide row.Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2;
					}
				}
				// 			if(row.Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2 != "Yes")
				// 			{
				// 			}
				// 			if(row.Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2 != "" && row.Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2 != null)
				// 			{
				// 				// show row.Override_Preferred_Park_Discount;
				// 			}
				// 			else
				// 			{
				// 				hide row.Override_Preferred_Park_Discount;
				// 			}
				// 			if(row.Would_you_like_to_insure_a_golf_cart == "Yes")
				// 			{
				// 				if(row.Number_of_Golf_Cart != null && row.Number_of_Golf_Cart != "")
				// 				{
				// 					show row.Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2;
				// 				}
				// 				else
				// 				{
				// 					hide row.Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2;
				// 				}
				// 			}
				// 			else
				// 			{
				// 				hide row.Number_of_Golf_Cart;
				// 				hide row.Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2;
				// 			}
				// 			if(row.Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2 != "" && row.Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2 != null)
				// 			{
				// 				// 				show row.Override_Preferred_Park_Discount;
				// 			}
				// 			else
				// 			{
				// 				hide row.Override_Preferred_Park_Discount;
				// 			}
			}
			else
			{
				// 			alert "333";
				// 			hide row.Where_is_the_trailer_stored_while_not_in_use;
				// 			hide row.Is_the_trailer_taken_into_the_USA_for_more_than_180_days;
				// 			show row.Is_the_trailer_removed_from_the_park_in_the_off_season;
				// 			show row.Do_you_have_a_deck;
				// 			show row.Do_you_have_a_screened_in_room_or_a_Florida_room;
				// 			show row.Do_you_have_a_hard_awning;
				// 			show row.Would_you_like_to_insure_a_golf_cart;
				// 			show row.Address_Lines1;
				// 			show row.City;
				// 			show row.Province;
				// 			show row.PostalCode;
				// 			show row.Site_Number;
				// 			show row.Park_Details;
			}
			// 		hide row.Park_Details;
			// 		hide row.Address_Lines1;
			// 		hide row.City;
			// 		hide row.Province;
			// 		hide row.PostalCode;
			// 		hide row.Site_Number;
			// 		hide row.Do_you_have_a_deck;
			// 		hide row.Do_you_have_a_screened_in_room_or_a_Florida_room;
			// 		hide row.Do_you_have_a_hard_awning;
			// 		hide row.Would_you_like_to_insure_a_golf_cart;
			// 		show row.VIN;
			// 		hide row.Is_the_trailer_removed_from_the_park_in_the_off_season;
		}
		// ---- End --------------
		//---------------------Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2-------------
		// 	if(row.Number_of_Golf_Cart != null)
		// 	{
		// 		if(row.Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2 == "No" || row.Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2 == null)
		// 		{
		// 			row.Number_of_Golf_Cart="";
		// 			row.Value_of_Golf_Cart_1=null;
		// 			row.Value_of_Golf_Cart_2=null;
		// 			hide row.Number_of_Golf_Cart;
		// 			hide row.Value_of_Golf_Cart_1;
		// 			hide row.Value_of_Golf_Cart_2;
		// 		}
		// 	}
		//--------------------------------END----------------------------------------------------------
		//---------------------------------Trailer model year-----------------------------------------------
		/*if(row.Trailer_Model_Year != null)
		{
			if(row.Select_Trailer_Type != "" && row.Select_Trailer_Type != null)
			{
				currentCoverYear = zoho.currentdate.getYear();
				yearsBetweenCover = currentCoverYear - row.Trailer_Model_Year.toLong();
				if(row.Select_Trailer_Type == "Park Model/Destination Trailer")
				{
					if(yearsBetweenCover <= 15)
					{
						show row.Replacement_Cost;
					}
					else
					{
						hide row.Replacement_Cost;
					}
				}
				else
				{
					
				}
			}
			currentYear = zoho.currentdate.getYear();
			yearsBetween = currentYear - row.Trailer_Model_Year.toLong();
			if(row.Select_Trailer_Type == "Travel Trailer/Fifth Wheel Trailer")
			{
				if(yearsBetween >= 10)
				{
					hide row.Replacement_Cost;
					enable row.Trailer_Coverage;
					//	disable row.Select_coverage_for_policy;
				}
				else
				{
					show row.Replacement_Cost;
					if(row.Replacement_Cost == null)
					{
						enable row.Trailer_Coverage;
						//	enable row.Select_coverage_for_policy;
					}
					else
					{
						//	enable row.Select_coverage_for_policy;
						show row.Replacement_Cost;
					}
				}
			}
			else if(row.Select_Trailer_Type == "Park Model/Destination Trailer")
			{
				if(yearsBetween >= 15)
				{
					hide row.Replacement_Cost;
					//disable row.Select_coverage_for_policy;
				}
				else
				{
					show row.Replacement_Cost;
					//enable row.Select_coverage_for_policy;
				}
			}
		}
		else
		{
			hide row.Replacement_Cost;
			//enable row.Select_coverage_for_policy;
			enable row.Trailer_Coverage;
		}*/
		//------------------------------trailer model year end---------------------------------------------
		//---------------------------add snowbird endorsement-----------------------------------------------
		if(row.Add_Snowbird_Endorsement == true)
		{
			show row.Non_Domestic_Address;
		}
		else
		{
			hide row.Non_Domestic_Address;
		}
		//----------------------------  END ------------------------------------------------------------------
		//-------------------------------------------is there any preexisting damage------------------------------
		if(row.Is_there_any_pre_existing_damage_on_the_trailer == "Yes")
		{
			show row.Describe_Damage;
			show row.UW_Approved;
		}
		else
		{
			hide row.Describe_Damage;
			hide row.UW_Approved;
		}
		//-----------------------------Actual cash value--------------------------------------------------------------
		if(row.Select_Trailer_Type == "Park Model/Destination Trailer")
		{
			if(row.Actual_Cash_Value > 375000)
			{
				show row.ACV_Exceeding_Limits_UW_Approved;
			}
			else if(row.Actual_Cash_Value < 25000)
			{
				hide row.ACV_Exceeding_Limits_UW_Approved;
			}
			else
			{
				hide row.ACV_Exceeding_Limits_UW_Approved;
			}
		}
		else if(row.Select_Trailer_Type == "Travel Trailer/Fifth Wheel Trailer")
		{
			if(row.Actual_Cash_Value > 250000)
			{
				show row.ACV_Exceeding_Limits_UW_Approved;
			}
			else if(row.Actual_Cash_Value < 10000)
			{
				hide row.ACV_Exceeding_Limits_UW_Approved;
			}
			else
			{
				hide row.ACV_Exceeding_Limits_UW_Approved;
			}
		}
		//---------------------------END-------------------------------------------------------------------------------
		//------------------------------Are the solar panel factory---------------------------------------------
		if(row.Are_the_solar_panels_factory_dealer_installed == "No")
		{
			show row.This_insurance_policy_does_not_cover_aftermarket_solar_panels_or_any_damage_arising_from_the_insta;
		}
		else
		{
			hide row.This_insurance_policy_does_not_cover_aftermarket_solar_panels_or_any_damage_arising_from_the_insta;
		}
		//------------------------------are there modification to addition permanently---------------------------------
		if(row.Are_there_any_modifications_to_the_trailer_ie_Addition_of_permanently_installed_solar_panels == "Yes")
		{
			show row.select_the_modification_trailer_type;
		}
		else
		{
			hide row.select_the_modification_trailer_type;
			hide row.Are_the_solar_panels_factory_dealer_installed;
			hide row.Please_add_details_on_interior_upgrades;
			hide row.This_insurance_policy_does_not_cover_aftermarket_solar_panels_or_any_damage_arising_from_the_insta;
		}
		//-----------------------------------------------------END----------------------------------------------------------
		//---------------------------------dps coverage admin-------------------------------------------------------
		if(row.DPS_Coverage_Admin_Override == true)
		{
			//	enable row.Personal_Property_Coverage_T_V_Furniture_etc;
			enable row.Detached_Private_Structure_Coverage_Sheds_etc;
		}
		else
		{
			//	disable row.Personal_Property_Coverage_T_V_Furniture_etc;
			disable row.Detached_Private_Structure_Coverage_Sheds_etc;
		}
		//----------------------------------END---------------------------------------------------------------------
		//--------------------------------Do you have a deck-------------------------------------------------------
		if(row.Do_you_have_a_deck == "Yes")
		{
			show row.Deck_Length;
			show row.Deck_Width;
		}
		else
		{
			hide row.Deck_Length;
			hide row.Deck_Width;
		}
		//--------------------------------END---------------------------------------------------------------------
		//--------------------------------DO You have a Hard Awning------------------------------------------
		if(row.Do_you_have_a_hard_awning == "Yes")
		{
			show row.Hard_Awning_Width;
			show row.Hard_Awning_Length;
		}
		else
		{
			hide row.Hard_Awning_Length;
			hide row.Hard_Awning_Width;
		}
		//----------------------------------------------END-------------------------------------------------
		//---------------------------------do you have a screened florida room------------------------------------
		if(row.Do_you_have_a_screened_in_room_or_a_Florida_room == "Yes")
		{
			show row.Screened_in_room_or_Florida_room_Length;
			show row.Screened_in_room_or_Florida_room_Width;
		}
		else
		{
			hide row.Screened_in_room_or_Florida_room_Length;
			hide row.Screened_in_room_or_Florida_room_Width;
		}
		//-------------------------------------END-----------------------------------------------------------
		//-------------------------------Trailer removed from the park of-----------------------------
		if(row.Is_the_trailer_removed_from_the_park_in_the_off_season == "Yes")
		{
			show row.Please_provide_address_of_storage_location;
		}
		else
		{
			hide row.Please_provide_address_of_storage_location;
		}
		//------------------------Heating type----------------------------
		if(row.Is_there_any_heating_that_wasn_t_factory_installed_wood_stove_pellet_stove_etc == "Yes")
		{
			show row.Heating_Type;
		}
		else
		{
			hide row.Heating_Type;
		}
		//-----------------------------------dual purpose of trailer-------------------------------
		if(row.Is_this_a_dual_purpose_trailer_toy_hauler_horse_trailer == "Yes")
		{
			show row.Trailer_Purpose_Type;
		}
		else
		{
			hide row.Trailer_Purpose_Type;
			hide row.Please_select_which_items_are_being_hauled;
		}
		//------------------------------is this trailer financed---------------------------
		if(row.Is_this_trailer_financed == "Yes")
		{
			show row.Lein_holder;
		}
		else
		{
			hide row.Lein_holder;
			hide row.Name_of_Financier;
			hide row.Address_line1;
			hide row.Address_line2;
			hide row.Postal_Code;
			hide row.City1;
			hide row.Province1;
			hide row.Country;
		}
		//-------------------------------------------Populate lien holder details-------------------------------------
		if(row.Lein_holder != null)
		{
			fetchLein = Lein_holder_Details[ID == row.Lein_holder];
			if(fetchLein.count() > 0)
			{
				if(fetchLein.Name_of_Financier != "Other")
				{
					hide row.Name_of_Financier;
					//row.Name_of_Financier="";
					show row.Address_line1;
					show row.Address_line2;
					show row.City1;
					show row.Province1;
					show row.Country;
					disable row.Name_of_Financier;
					disable row.Address_line1;
					disable row.Address_line2;
					disable row.Province1;
					disable row.City1;
					disable row.Country;
					disable row.Postal_Code;
				}
				else
				{
					show row.Name_of_Financier;
					show row.Address_line1;
					show row.Address_line2;
					show row.City1;
					show row.Province1;
					show row.Country;
					enable row.Name_of_Financier;
					enable row.Address_line1;
					enable row.Address_line2;
					enable row.City1;
					enable row.Country;
					enable row.Province1;
					enable row.Postal_Code;
				}
			}
		}
		else
		{
			hide row.Name_of_Financier;
			hide row.Address_line1;
			hide row.Address_line2;
			hide row.City1;
			hide row.Province1;
			hide row.Country;
		}
		//------------------------Admin Override--------------------------------------------
		if(row.PP_Admin_Override == true)
		{
			enable row.Personal_Property_Coverage_T_V_Furniture_etc;
		}
		else
		{
			disable row.Personal_Property_Coverage_T_V_Furniture_etc;
		}
		//------------------------------Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground-----------------------------------------------------------
		// 	if(row.Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground == "No")
		// 	{
		// 		if(row.Would_you_like_to_insure_a_golf_cart == "Yes")
		// 		{
		// 			if(row.Number_of_Golf_Cart != null && row.Number_of_Golf_Cart != "")
		// 			{
		// 				if(row.Number_of_Golf_Cart == "1")
		// 				{
		// 					show row.Value_of_Golf_Cart_1;
		// 					hide row.Value_of_Golf_Cart_2;
		// 				}
		// 				else
		// 				{
		// 					show row.Value_of_Golf_Cart_1;
		// 					show row.Value_of_Golf_Cart_2;
		// 				}
		// 			}
		// 		}
		// 	}
		//----------------------------------------Replacement cost--------------------------------------------
		if(row.Select_Trailer_Type == "Park Model/Destination Trailer")
		{
			if(row.Replacement_Cost > 375000)
			{
				show row.RCV_Exceeding_Limits_UW_Approved;
			}
			else if(row.Replacement_Cost < 25000)
			{
				hide row.RCV_Exceeding_Limits_UW_Approved;
			}
			else
			{
				hide row.RCV_Exceeding_Limits_UW_Approved;
			}
		}
		else if(row.Select_Trailer_Type == "Travel Trailer/Fifth Wheel Trailer")
		{
			if(row.Replacement_Cost > 250000)
			{
				show row.RCV_Exceeding_Limits_UW_Approved;
			}
			else if(row.Replacement_Cost < 10000)
			{
				hide row.RCV_Exceeding_Limits_UW_Approved;
			}
			else
			{
				hide row.RCV_Exceeding_Limits_UW_Approved;
			}
		}
		//--------------------Referal Reason Alert End-----------
		if(row.Replacement_Cost != null)
		{
			//	enable row.Select_coverage_for_policy;
			disable row.Trailer_Coverage;
		}
		else
		{
			//	disable row.Select_coverage_for_policy;
		}
		//---------------------------------------is trailer permanently parked -- Commnet ---------------------------------------
		// 	if(row.Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground == "No")
		// 	{
		// 		if(row.Would_you_like_to_insure_a_golf_cart == "Yes")
		// 		{
		// 			if(row.Number_of_Golf_Cart != null && row.Number_of_Golf_Cart != "")
		// 			{
		// 				show row.Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2;
		// 			}
		// 			else
		// 			{
		// 				hide row.Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2;
		// 			}
		// 		}
		// 		else
		// 		{
		// 			hide row.Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2;
		// 		}
		// 		if(row.Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2 != "" && row.Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2 != null)
		// 		{
		// 			show row.Override_Preferred_Park_Discount;
		// 		}
		// 		else
		// 		{
		// 			hide row.Override_Preferred_Park_Discount;
		// 		}
		// 		show row.Where_is_the_trailer_stored_while_not_in_use;
		// 		show row.Is_the_trailer_taken_into_the_USA_for_more_than_180_days;
		// 		hide row.Is_the_trailer_removed_from_the_park_in_the_off_season;
		// 		hide row.Do_you_have_a_deck;
		// 		hide row.Do_you_have_a_screened_in_room_or_a_Florida_room;
		// 		hide row.Do_you_have_a_hard_awning;
		// 		hide row.Would_you_like_to_insure_a_golf_cart;
		// 		hide row.Park_Details;
		// 	}
		// 	else
		// 	{
		// 		hide row.Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2;
		// 		hide row.Where_is_the_trailer_stored_while_not_in_use;
		// 		hide row.Is_the_trailer_taken_into_the_USA_for_more_than_180_days;
		// 		show row.Is_the_trailer_removed_from_the_park_in_the_off_season;
		// 		show row.Do_you_have_a_deck;
		// 		show row.Do_you_have_a_screened_in_room_or_a_Florida_room;
		// 		show row.Do_you_have_a_hard_awning;
		// 		show row.Would_you_like_to_insure_a_golf_cart;
		// 		show row.Address_Lines1;
		// 		show row.City;
		// 		show row.Province;
		// 		show row.PostalCode;
		// 		show row.Site_Number;
		// 		show row.Park_Details;
		// 	}
		//----------------------Arun---------------------
		if(row.Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2 != "" && row.Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2 != null)
		{
			show row.Override_Preferred_Park_Discount;
		}
		else
		{
			hide row.Override_Preferred_Park_Discount;
		}
		//------------End-------------------------
		//Select a Park
		if(row.Select_a_Park1 != null)
		{
			show row.Address_Lines1;
			show row.City;
			show row.Province;
			show row.PostalCode;
			fetchPark = Preffered_Parks[ID == row.Select_a_Park1];
			if(fetchPark.count() > 0)
			{
				if(fetchPark.Preffered_Park_Name != "Other")
				{
					hide row.Park_Name;
					disable row.Address_Lines1;
					disable row.City;
					disable row.Province;
					disable row.PostalCode;
				}
				else
				{
					show row.Park_Name;
					show row.Site_Number;
					enable row.Park_Name;
					enable row.Address_Lines1;
					enable row.City;
					enable row.Province;
					enable row.PostalCode;
				}
			}
		}
		else
		{
			hide row.Address_Lines1;
			hide row.City;
			hide row.Province;
			hide row.PostalCode;
			hide row.Site_Number;
			hide row.Park_Name;
		}
		//------------End-------------------------
		//Select the type of Trailer
		if(row.Select_Trailer_Type == "Park Model/Destination Trailer")
		{
			//-------referral alert----------
			if(row.Actual_Cash_Value > 375000)
			{
				show row.ACV_Exceeding_Limits_UW_Approved;
			}
			else if(row.Actual_Cash_Value < 25000)
			{
				hide row.ACV_Exceeding_Limits_UW_Approved;
			}
			else
			{
				hide row.ACV_Exceeding_Limits_UW_Approved;
			}
			if(row.Replacement_Cost > 375000)
			{
				show row.RCV_Exceeding_Limits_UW_Approved;
			}
			else if(row.Replacement_Cost < 25000)
			{
				hide row.RCV_Exceeding_Limits_UW_Approved;
			}
			else
			{
				hide row.RCV_Exceeding_Limits_UW_Approved;
			}
			if(row.Trailer_Model_Year != null && row.Trailer_Model_Year != "")
			{
				currentYear = zoho.currentdate.getYear();
				yearsBetween = currentYear - row.Trailer_Model_Year.toLong();
				if(yearsBetween <= 15)
				{
					//	enable row.Select_coverage_for_policy;
				}
				else
				{
					//	disable row.Select_coverage_for_policy;
				}
			}
			show row.Do_you_have_a_deck;
			show row.Do_you_have_a_screened_in_room_or_a_Florida_room;
			show row.Do_you_have_a_hard_awning;
			show row.Would_you_like_to_insure_a_golf_cart;
			show row.Park_Details;
			show row.Address_Lines1;
			show row.City;
			show row.Province;
			show row.PostalCode;
			show row.Site_Number;
			hide row.Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground;
			hide row.Where_is_the_trailer_stored_while_not_in_use;
			hide row.Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2;
			hide row.Is_the_trailer_taken_into_the_USA_for_more_than_180_days;
			hide row.VIN;
			hide row.Is_the_trailer_removed_from_the_park_in_the_off_season;
		}
		else
		{
			if(row.Actual_Cash_Value > 250000)
			{
				show row.ACV_Exceeding_Limits_UW_Approved;
			}
			else if(row.Actual_Cash_Value < 10000)
			{
				hide row.ACV_Exceeding_Limits_UW_Approved;
			}
			else
			{
				hide row.ACV_Exceeding_Limits_UW_Approved;
			}
			if(row.Replacement_Cost > 250000)
			{
				show row.RCV_Exceeding_Limits_UW_Approved;
			}
			else if(row.Replacement_Cost < 10000)
			{
				hide row.RCV_Exceeding_Limits_UW_Approved;
			}
			else
			{
				hide row.RCV_Exceeding_Limits_UW_Approved;
			}
			// 		if(yearsBetween <= 10)
			// 		{
			// 			enable row.Select_coverage_for_policy;
			// 		}
			// 		else
			// 		{
			// 			disable row.Select_coverage_for_policy;
			// 		}
			if(row.Trailer_Model_Year != null && row.Trailer_Model_Year != "")
			{
				currentYear = zoho.currentdate.getYear();
				yearsBetween = currentYear - row.Trailer_Model_Year.toLong();
			}
			show row.Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground;
			// 		if(row.Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground == "No")
			// 		{
			// 			alert "1";
			// 			show row.Where_is_the_trailer_stored_while_not_in_use;
			// 			show row.Is_the_trailer_taken_into_the_USA_for_more_than_180_days;
			// 			hide row.Is_the_trailer_removed_from_the_park_in_the_off_season;
			// 			hide row.Do_you_have_a_deck;
			// 			hide row.Do_you_have_a_screened_in_room_or_a_Florida_room;
			// 			hide row.Do_you_have_a_hard_awning;
			// 			hide row.Would_you_like_to_insure_a_golf_cart;
			// 			hide row.Park_Details;
			// 			if(row.Number_of_Golf_Cart != "" && row.Number_of_Golf_Cart != null)
			// 			{
			// 				show row.Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2;
			// 			}
			// 			else
			// 			{
			// 				hide row.Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2;
			// 			}
			// 		}
			if(row.Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground == "Yes")
			{
				// 			alert "2";
				// 			hide row.Where_is_the_trailer_stored_while_not_in_use;
				// 			hide row.Is_the_trailer_taken_into_the_USA_for_more_than_180_days;
				// 			show row.Is_the_trailer_removed_from_the_park_in_the_off_season;
				// 			show row.Do_you_have_a_deck;
				// 			show row.Do_you_have_a_screened_in_room_or_a_Florida_room;
				// 			show row.Do_you_have_a_hard_awning;
				// 			show row.Would_you_like_to_insure_a_golf_cart;
				// 			show row.Address_Lines1;
				// 			show row.City;
				// 			show row.Province;
				// 			show row.PostalCode;
				// 			show row.Site_Number;
				// 			show row.Park_Details;
			}
			// 		else
			// 		{
			// 			alert "3";
			// 			hide row.Park_Details;
			// 			hide row.Address_Lines1;
			// 			hide row.City;
			// 			hide row.Province;
			// 			hide row.PostalCode;
			// 			hide row.Site_Number;
			// 			hide row.Do_you_have_a_deck;
			// 			hide row.Do_you_have_a_screened_in_room_or_a_Florida_room;
			// 			hide row.Do_you_have_a_hard_awning;
			// 			hide row.Would_you_like_to_insure_a_golf_cart;
			// 			hide row.Is_the_trailer_removed_from_the_park_in_the_off_season;
			// 			show row.VIN;
			// 			hide row.Is_the_trailer_removed_from_the_park_in_the_off_season;
			// 		}
		}
		//---------------------End--------------------
		//Show Premium Breakdown
		if(row.Show_Premium_Breakdown == true)
		{
			//show row.Premium_Breakdown;
			show row.Trailer_Base_Premium;
			show row.Ol_Water_Protection_Prem;
			show row.Liability_Prem;
			show row.Trailer_over_25_years_sur;
			show row.Seasonally_Parked_disc;
			show row.Preferred_Parks_Disc;
			show row.Detached_Priv_Stru_Cov;
			show row.Personal_Prop_Cov;
			show row.Golf_Excess_Prem;
			show row.Golf_Prem_Base;
		}
		else
		{
			//hide row.Premium_Breakdown;
			hide row.Trailer_Base_Premium;
			hide row.Ol_Water_Protection_Prem;
			hide row.Liability_Prem;
			hide row.Trailer_over_25_years_sur;
			hide row.Seasonally_Parked_disc;
			hide row.Preferred_Parks_Disc;
			hide row.Detached_Priv_Stru_Cov;
			hide row.Personal_Prop_Cov;
			hide row.Golf_Excess_Prem;
			hide row.Golf_Prem_Base;
		}
		//---------------------End--------------------
		//Trailer model year
		/*if(row.Trailer_Model_Year != null)
		{
			if(row.Select_Trailer_Type != "" && row.Select_Trailer_Type != null)
			{
				currentCoverYear = zoho.currentdate.getYear();
				yearsBetweenCover = currentCoverYear - row.Trailer_Model_Year.toLong();
				if(row.Select_Trailer_Type == "Park Model/Destination Trailer")
				{
				}
				else
				{
					if(yearsBetweenCover <= 15)
					{
						show row.Replacement_Cost;
					}
					else
					{
						hide row.Replacement_Cost;
					}
				}
			}
			currentYear = zoho.currentdate.getYear();
			yearsBetween = currentYear - row.Trailer_Model_Year.toLong();
			if(row.Select_Trailer_Type == "Travel Trailer/Fifth Wheel Trailer")
			{
				if(yearsBetween >= 10)
				{
					hide row.Replacement_Cost;
					enable row.Trailer_Coverage;
					//	disable row.Select_coverage_for_policy;
				}
				else
				{
					show row.Replacement_Cost;
					if(row.Replacement_Cost == null)
					{
						enable row.Trailer_Coverage;
						//	enable row.Select_coverage_for_policy;
					}
					else
					{
						//	enable row.Select_coverage_for_policy;
						show row.Replacement_Cost;
					}
				}
			}
			else if(row.Select_Trailer_Type == "Park Model/Destination Trailer")
			{
				if(yearsBetween >= 15)
				{
					hide row.Replacement_Cost;
					//	disable row.Select_coverage_for_policy;
				}
				else
				{
					show row.Replacement_Cost;
					//	enable row.Select_coverage_for_policy;
				}
			}
		}
		else
		{
			hide row.Replacement_Cost;
			//enable row.Select_coverage_for_policy;
			enable row.Trailer_Coverage;
		}*/
		//-----------------End---------------------
		// Trailer purpose type
		if(row.Trailer_Purpose_Type == "Toy Hauler")
		{
			show row.Please_select_which_items_are_being_hauled;
		}
		else
		{
			hide row.Please_select_which_items_are_being_hauled;
		}
		//------------End----------------
		// Select the modification Trailer type
		if(row.select_the_modification_trailer_type == "Solar panels")
		{
			show row.Are_the_solar_panels_factory_dealer_installed;
			hide row.Please_add_details_on_interior_upgrades;
			hide row.Describe_modifications;
		}
		else if(row.select_the_modification_trailer_type == "Interior Upgrades")
		{
			hide row.Describe_modifications;
			show row.Please_add_details_on_interior_upgrades;
			hide row.Are_the_solar_panels_factory_dealer_installed;
			hide row.This_insurance_policy_does_not_cover_aftermarket_solar_panels_or_any_damage_arising_from_the_insta;
		}
		else
		{
			hide row.Please_add_details_on_interior_upgrades;
			hide row.Are_the_solar_panels_factory_dealer_installed;
			hide row.This_insurance_policy_does_not_cover_aftermarket_solar_panels_or_any_damage_arising_from_the_insta;
			hide row.Describe_modifications;
		}
		// -------- For Saved/Return To Broker Status ----------------
		if(input.Quote_Status == "Saved" || input.Quote_Status == "Return To Broker")
		{
			row.Deductible=if(row.Deductible != null && row.Deductible != "",row.Deductible,"1000");
			row.Overland_Water_Protection=true;
			//' ------------- End --- Trailer Model Year Based Configuration --------------
			//--------------------API call to Send Coverage Details For Trailer API------------------
			fetchEndPoint = API_Configuration[Name_Process == "Calculate Coverage Premium - Trailer"].End_Point;
			parammap = Map();
			parammap.put("organization_id",thisapp.Server_Side.org_info());
			parammap.put("is_ol_water_protection",row.Overland_Water_Protection);
			if(!isNull(row.Select_Trailer_Type))
			{
				parammap.put("trailer_type",row.Select_Trailer_Type);
			}
			if(row.Select_coverage_for_policy == "Replacement Value Coverage")
			{
				trailerValue = ifnull(row.Replacement_Cost,0);
				row.Trailer_Coverage=ifnull(row.Replacement_Cost,0);
			}
			else if(row.Select_coverage_for_policy == "Current Market Value Coverage")
			{
				trailerValue = ifnull(row.Actual_Cash_Value,0);
				row.Trailer_Coverage=ifnull(row.Actual_Cash_Value,0);
			}
			else
			{
				trailerValue = 0;
			}
			parammap.put("trailer_value",trailerValue);
			deductiableValue = 0;
			if(!isNull(row.Deductible))
			{
				deductiableValue = row.Deductible;
				if(row.Deductible.contains("$") == true)
				{
					deductiableValue = row.Deductible.remove("$").toDecimal();
				}
			}
			parammap.put("deductible_value",deductiableValue);
			parammap.put("liability_value",if(!isNull(row.Premises_Liability),row.Premises_Liability,0));
			parammap.put("is_seasonally_parked",if(row.Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground == "Yes",true,false));
			preferrredpark = false;
			if(row.Select_a_Park1 != null)
			{
				preferrredpark = true;
			}
			parammap.put("is_preferred_parks",preferrredpark);
			check25years = false;
			if(!isNull(row.Trailer_Model_Year))
			{
				calculate25Years = zoho.currentdate.getYear() - row.Trailer_Model_Year.toNumber();
				check25years = if(calculate25Years > 25,true,false);
			}
			parammap.put("is_trailer_over_25years",check25years);
			parammap.put("is_golf_cart_added",if(row.Would_you_like_to_insure_a_golf_cart == "Yes",true,false));
			golfValue = ifnull(row.Value_of_Golf_Cart_1,0) + ifnull(row.Value_of_Golf_Cart_2,0);
			parammap.put("total_golf_cart_value",golfValue.toDecimal());
			personalPropcover = 0;
			if(row.PP_Admin_Override == true)
			{
				if(!isNull(row.Personal_Property_Coverage_T_V_Furniture_etc))
				{
					if(row.Personal_Property_Coverage_T_V_Furniture_etc.isNumber() == true)
					{
						personalPropcover = row.Personal_Property_Coverage_T_V_Furniture_etc;
					}
				}
			}
			parammap.put("overrided_personal_prop_cov_value",personalPropcover);
			detachVal = 0;
			if(row.DPS_Coverage_Admin_Override == true)
			{
				if(!isNull(row.Detached_Private_Structure_Coverage_Sheds_etc))
				{
					if(row.Detached_Private_Structure_Coverage_Sheds_etc.isNumber() == true)
					{
						detachVal = row.Detached_Private_Structure_Coverage_Sheds_etc;
					}
				}
			}
			parammap.put("overrided_detached_priv_stru_cov_value",detachVal);
			parammap.put("opted_snowbird_endorsement",row.Add_Snowbird_Endorsement);
			if(!isNull(row.Coverage_Type))
			{
				parammap.put("coverage_type",row.Coverage_Type);
			}
			// 		info "parammap --- " + parammap;
			trailerpost = thisapp.Server_Side.callServer("POST",fetchEndPoint,parammap);
			// 		info "trailerpost -- " + trailerpost;
			//------------------------API call to Send Coverage Details For Trailer API -End---------------
			if(trailerpost.get("success") == true && trailerpost.get("data").size() > 0)
			{
				responseData = trailerpost.get("data");
				row.Premium_Per_Year=ifnull(responseData.get("total_premium"),0);
				row.Detached_Private_Structure_Coverage_Sheds_etc=ifnull(responseData.get("detached_priv_stru_cov"),"");
				row.Personal_Property_Coverage_T_V_Furniture_etc=ifnull(responseData.get("personal_prop_cov"),"");
				if(row.Premium_Per_Year != null)
				{
					//info "hi" ;
					premiumTotal = 0;
					for each  premium in input.Trailer
					{
						premiumTotal = premiumTotal + ifnull(premium.Premium_Per_Year,0);
					}
					input.Total_Premium_before_tax = premiumTotal;
					// --- Add Admin Fee - Based on config ------
					fetchAdminFeePer = Commissions_Configuration[Commision == "NB - Admin Fee"];
					if(fetchAdminFeePer.count() > 0)
					{
						input.Fee = ifnull(premiumTotal,0) * ifnull(fetchAdminFeePer.Percent,0) / 100;
					}
					tax = 0;
					if(input.Please_select_the_province_your_trailer_is_located_in != "" && input.Please_select_the_province_your_trailer_is_located_in != null)
					{
						fetchTax = Tax_Lists[State_Province == input.Please_select_the_province_your_trailer_is_located_in];
						tax = fetchTax.Tax;
						if(input.Override_Tax_by_Admin == "Yes" && input.Override_Tax != null)
						{
							tax = input.Override_Tax.Tax;
						}
						input.Tax_Precent = tax;
						input.Tax_Province = input.Please_select_the_province_your_trailer_is_located_in;
					}
					premiumandfee = ifnull(input.Total_Premium_before_tax,0) + ifnull(input.Fee,0);
					totalTax = premiumandfee * tax / 100;
					totalAftetTax = totalTax + premiumandfee;
					input.Total_Tax = totalTax;
					input.Total_Payable_Premium_after_tax = totalAftetTax;
				}
			}
			//------------------------End --- API call to Send Coverage Details For Trailer API -End---------------
		}
	}
	//------------End----------------
	row.General_Field=false;
	