input.Source = "CREATOR";
if(input.Source == "CREATOR")
{
	if(input.Trailer != null)
	{
		for each  rec in input.Trailer
		{
			// -----------1. Referral - Actual & Replacement Cost Value For Park Model/Destination Trailer -----
			if(rec.Select_Trailer_Type == "Park Model/Destination Trailer")
			{
				if(rec.Select_coverage_for_policy == "Replacement Value Coverage")
				{
					rec.Referral_Replacement_cost=true;
					if(rec.Replacement_Cost > 375000 || rec.Replacement_Cost < 25000)
					{
						if(rec.RCV_Exceeding_Limits_UW_Approved == true)
						{
							rec.Referral_Replacement_cost=false;
						}
					}
					else
					{
						rec.Referral_Replacement_cost=false;
					}
				}
				if(rec.Select_coverage_for_policy == "Current Market Value Coverage")
				{
					rec.Referral_Actual_cash_value=true;
					if(rec.Actual_Cash_Value > 375000 || rec.Actual_Cash_Value < 25000)
					{
						if(rec.ACV_Exceeding_Limits_UW_Approved == true)
						{
							rec.Referral_Actual_cash_value=false;
						}
					}
					else
					{
						rec.Referral_Actual_cash_value=false;
					}
				}
			}
			// -----------1. Referral - Actual & Replacement Cost Value For Travel Trailer/Fifth Wheel Trailer -----
			if(rec.Select_Trailer_Type == "Travel Trailer/Fifth Wheel Trailer")
			{
				if(rec.Select_coverage_for_policy == "Replacement Value Coverage")
				{
					rec.Referral_Replacement_cost=true;
					if(rec.Replacement_Cost > 250000 || rec.Replacement_Cost < 10000)
					{
						if(rec.RCV_Exceeding_Limits_UW_Approved == true)
						{
							rec.Referral_Replacement_cost=false;
						}
					}
					else
					{
						rec.Referral_Replacement_cost=false;
					}
				}
				if(rec.Select_coverage_for_policy == "Current Market Value Coverage")
				{
					rec.Referral_Actual_cash_value=true;
					if(rec.Actual_Cash_Value > 250000 || rec.Actual_Cash_Value < 10000)
					{
						if(rec.ACV_Exceeding_Limits_UW_Approved == true)
						{
							rec.Referral_Actual_cash_value=true;
						}
					}
					else
					{
						rec.Referral_Actual_cash_value=false;
					}
				}
			}
			rec.Referral_Is_the_trailer_taken_into_USA=false;
			//-----------------2. Referral - Is the trailer taken into the USA for more than 180 days?--------------
			if(rec.Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground == "No")
			{
				if(rec.Is_the_trailer_taken_into_the_USA_for_more_than_180_days == "Yes")
				{
					rec.Referral_Is_the_trailer_taken_into_USA=true;
				}
			}
			//-----------------3. Referral - Do you live in the trailer --------------
			rec.Referral_Do_you_live_in_the_trailer=false;
			if(rec.Do_you_live_in_the_trailer_full_time_all_year_round_as_a_principal_residence == "Yes")
			{
				if(rec.Add_Snowbird_Endorsement == true)
				{
					rec.Referral_Do_you_live_in_the_trailer=false;
				}
				else
				{
					rec.Referral_Do_you_live_in_the_trailer=true;
				}
			}
			else
			{
				if(rec.Add_Snowbird_Endorsement == true)
				{
					rec.Referral_Do_you_live_in_the_trailer=true;
				}
			}
			//-------------------4. Referral - business use of any kind-------------------	
			rec.Referral_business_use_of_any_kind=false;
			if(rec.Is_the_unit_used_strictly_for_pleasure_purposes_with_no_rental_or_business_use_of_any_kind == "No")
			{
				rec.Referral_business_use_of_any_kind=true;
			}
			//-------------------5. Referral - Is there any heating-----------------	
			rec.Referral_Is_there_any_heating=false;
			if(rec.Is_there_any_heating_that_wasn_t_factory_installed_wood_stove_pellet_stove_etc == "Yes")
			{
				if(rec.Heating_Type != "Electric space heater")
				{
					rec.Referral_Is_there_any_heating=true;
				}
			}
			//-------------------6. Referral - Is this a dual purpose trailer-------------------
			rec.Referral_Is_this_a_dual_purpose_trailer=false;
			if(rec.Is_this_a_dual_purpose_trailer_toy_hauler_horse_trailer == "Yes")
			{
				if(rec.Trailer_Purpose_Type == "Animal Hauler")
				{
					rec.Referral_Is_this_a_dual_purpose_trailer=true;
				}
				if(rec.Trailer_Purpose_Type == "Toy Hauler")
				{
					if(rec.Please_select_which_items_are_being_hauled.contains("Cars/Trucks/SUV") == true)
					{
						rec.Referral_Is_this_a_dual_purpose_trailer=true;
					}
				}
			}
			//-------------------7. Referral - Are the Solar panels------------------	
			rec.Referalselect_the_modification_trailer_type=false;
			if(rec.Are_there_any_modifications_to_the_trailer_ie_Addition_of_permanently_installed_solar_panels == "Yes")
			{
				if(rec.select_the_modification_trailer_type == "Interior Upgrades")
				{
					rec.Referalselect_the_modification_trailer_type=true;
				}
				if(rec.select_the_modification_trailer_type == "Solar panels")
				{
					if(rec.Are_the_solar_panels_factory_dealer_installed == "No")
					{
						if(rec.This_insurance_policy_does_not_cover_aftermarket_solar_panels_or_any_damage_arising_from_the_insta == "No")
						{
							rec.Referalselect_the_modification_trailer_type=true;
						}
					}
				}
			}
			//-------------------8. Referral - Is there any pre-existing damage on the trailer----------------	
			rec.Referral_Is_there_any_pre_existing_damage_on_the_trailer=false;
			if(rec.Is_there_any_pre_existing_damage_on_the_trailer == "Yes")
			{
				rec.Referral_Is_there_any_pre_existing_damage_on_the_trailer=true;
				// ---- Added by Vignesh on 07/05/2024 --- For Override Case ----
				if(rec.UW_Approved == true)
				{
					rec.Referral_Is_there_any_pre_existing_damage_on_the_trailer=false;
				}
			}
			//-------------------9. Referral - Is the trailer motorized----------------	
			rec.Referral_Is_the_trailer_motorized=false;
			if(rec.Is_the_trailer_motorized_and_able_to_travel_on_its_own_without_a_towing_vehicle == "Yes")
			{
				rec.Referral_Is_the_trailer_motorized=true;
			}
			//----------------10. Referral - Golf cart--------------
			rec.Referral_Golf_cart=false;
			if(rec.Number_of_Golf_Cart == "1")
			{
				if(rec.Value_of_Golf_Cart_1 > 15000)
				{
					rec.Referral_Golf_cart=true;
				}
			}
			if(rec.Number_of_Golf_Cart == "2")
			{
				if(rec.Value_of_Golf_Cart_1 > 15000)
				{
					rec.Referral_Golf_cart=true;
				}
				else
				{
					if(rec.Value_of_Golf_Cart_2 > 15000)
					{
						rec.Referral_Golf_cart=true;
					}
				}
			}
		}
	}
}
