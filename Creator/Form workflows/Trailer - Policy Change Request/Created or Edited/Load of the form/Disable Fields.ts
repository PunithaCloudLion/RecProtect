input.Save_as_Draft = false;
hide Nuvei_Transaction_ID;
hide Quote_Status;
hide Policy_Status;
hide Policy_AutoRenewal_Status;
hide Deal_Type;
hide Referral_Reason;
hide Policy_UPO_Data;
hide Trailer.Golf_Cart;
hide Trailer.Override_Preferred_Park_Discount;
disable Trailer.Override_Preferred_Park_Discount;
hide Trailer.Describe_modifications;
hide Signature1;
hide Organization_ID;
disable Fee;
hide Adjusted_Premium;
hide Trailer.Trailer_Model_Age;
hide Trailer.Renewal_Information;
//hide Trailer.Trailer_Age ;
hide Trailer.Eligible_for_auto_Renewal;
hide Trailer.Trailer_Status;
disable Last_Modified_Date;
//hide Payment;
hide Trailer.Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2;
disable Quote_ID;
// -- Premium breakdown Data section ---
disable Trailer.Trailer_Base_Premium;
disable Trailer.Ol_Water_Protection_Prem;
disable Trailer.Liability_Prem;
disable Trailer.Trailer_over_25_years_sur;
disable Trailer.Seasonally_Parked_disc;
disable Trailer.Preferred_Parks_Disc;
disable Trailer.Detached_Priv_Stru_Cov;
disable Trailer.Personal_Prop_Cov;
disable Trailer.Golf_Excess_Prem;
disable Trailer.Golf_Prem_Base;
// -- Premium breakdown Data section End ---
hide Trailer.Trailer_Migration_ID;
hide Trailer.Migrated;
hide Trailer.Section1;
disable Sales_Date;
disable Bind_Date;
if(input.Override_Tax_by_Admin != "" && input.Override_Tax_by_Admin != null)
{
	if(input.Override_Tax_by_Admin == "Yes")
	{
		show Override_Tax;
	}
	else
	{
		hide Override_Tax;
	}
}
else
{
	hide Override_Tax;
}
//Quote Level
disable Customer_ID;
hide Additional_Names.Customer_ID;
hide Insured_Middle_Name;
hide Trailer.RCV_Exceeding_Limits_UW_Approved;
hide Trailer.ACV_Exceeding_Limits_UW_Approved;
hide Trailer.UnderWriting;
//
disable Deal_Type;
hide Developer_Section;
hide Document_Generation_Section;
hide Transaction_History;
hide Trailer_Document_Information;
disable Quote_Status;
hide Trailer.UW_Approved;
input.Source = "CREATOR";
disable Source;
//hide Premium;
hide Admin_Changes;
hide Select_Rate;
hide Trailer.Underwritting_Approved;
hide Trailer.Select_a_Park;
hide Trailer.Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground;
//hide Overriden_Tax;
disable Total_Tax;
disable Total_Payable_Premium_after_tax;
disable Tax_Province;
disable Total_Premium_before_tax;
disable Tax_Precent;
if(input.Please_select_the_province_your_trailer_is_located_in != null && input.Please_select_the_province_your_trailer_is_located_in != "")
{
	disable Trailer.Province;
	/*Added by Sundaram 16-04-2024 for adding a park values based on Please_select_the_province_your_trailer_is_located_in field */
	getCountries = Preffered_Parks[Province == input.Please_select_the_province_your_trailer_is_located_in || Preffered_Park_Name == "Other"].ID.getAll();
	if(input.Trailer != null)
	{
		for each  row1 in input.Trailer
		{
			if(row1.Select_a_Park1 != null)
			{
				newPark = row1.Select_a_Park1;
			}
			checkAlreadyexist = getCountries.contains(newPark);
			row1.Select_a_Park1:ui.add(getCountries);
			if(checkAlreadyexist == true)
			{
				row1.Select_a_Park1=newPark;
			}
			else
			{
				// row1.Select_a_Park1=null;
				clear row1.Select_a_Park1;
				row1.Select_a_Park1:ui.add(getCountries);
			}
		}
	}
}
hide Name;
hide Trailer.Describe_Damage;
hide Name_of_Dealership;
hide Name_of_Marina;
hide Name_of_Campground;
hide Tell_us_more;
//hide Trailer.Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground;
hide Trailer.Park_Details;
hide Trailer.Where_is_the_trailer_stored_while_not_in_use;
//hide Trailer.Replacement_Cost;
hide Trailer.Please_provide_address_of_storage_location;
hide Trailer.Is_the_trailer_taken_into_the_USA_for_more_than_180_days;
hide Trailer.Is_the_trailer_removed_from_the_park_in_the_off_season;
hide Trailer.Do_you_have_a_deck;
hide Trailer.Do_you_have_a_screened_in_room_or_a_Florida_room;
hide Trailer.Do_you_have_a_hard_awning;
disable Trailer.Premium_Per_Year;
disable Trailer.Overland_Water_Protection;
disable Trailer.Trailer_Coverage;
disable Trailer.Coverage_Type;
disable Trailer.Detached_Private_Structure_Coverage_Sheds_etc;
disable Trailer.Personal_Property_Coverage_T_V_Furniture_etc;
disable Trailer.Premises_Liability;
// hide Trailer.Would_you_like_to_insure_a_golf_cart;
// hide Trailer.Number_of_Golf_Cart;
// hide Trailer.Value_of_Golf_Cart_1;
// hide Trailer.Value_of_Golf_Cart_2;
hide Unused_Fields;
//hide Trailer.Premium_Breakdown;
hide Trailer.Park_Details;
hide Trailer.Address_Lines1;
hide Trailer.City;
hide Trailer.Province;
hide Trailer.PostalCode;
hide Trailer.Site_Number;
hide Trailer.Heating_Type;
hide Trailer.Trailer_Purpose_Type;
hide Trailer.Please_select_which_items_are_being_hauled;
hide Trailer.select_the_modification_trailer_type;
hide Trailer.Are_the_solar_panels_factory_dealer_installed;
hide Trailer.Please_add_details_on_interior_upgrades;
hide Trailer.This_insurance_policy_does_not_cover_aftermarket_solar_panels_or_any_damage_arising_from_the_insta;
// hide Trailer.Effective_Date;
// hide Trailer.Spoke_With;
// hide Trailer.Confirmed_Email_Phone;
// hide Trailer.Confirmed_Client;
// hide Trailer.Update_Phone;
// hide Trailer.Update_Email;
hide Trailer.Non_Domestic_Address;
//hide Trailer.Add_Snowbird_Endorsement;
disable Trailer.Trailer_Coverage;
hide Trailer.Trailer_Width;
//hide Trailer.Do_you_live_in_the_trailer_full_time_all_year_round_as_a_principal_residence;
//hide Trailer.Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2 ;
//hide Trailer.VIN;
hide Trailer.Deck_Width;
hide Trailer.Deck_Length;
hide Trailer.Hard_Awning_Width;
hide Trailer.Hard_Awning_Length;
hide Trailer.Screened_in_room_or_Florida_room_Length;
hide Trailer.Screened_in_room_or_Florida_room_Width;
hide Trailer.Leinholder;
disable Expiry_Date;
disable Signature;
disable Policy_Number;
disable Trailer.Golf_Cart;
//this will work only is create scenario
if(input.Trailer != null)
{
	for each  boatsub in input.Trailer
	{
		if(boatsub.Select_Trailer_Type == "Park Model/Destination Trailer")
		{
			// info "yes" ;
			show Trailer.Do_you_have_a_deck;
			show Trailer.Do_you_have_a_screened_in_room_or_a_Florida_room;
			show Trailer.Do_you_have_a_hard_awning;
			show Trailer.Would_you_like_to_insure_a_golf_cart;
			show Trailer.Park_Details;
			show Trailer.Select_a_Park1;
			show Trailer.Park_Name;
			show Trailer.Address_Lines1;
			show Trailer.City;
			show Trailer.Province;
			show Trailer.PostalCode;
			show Trailer.Site_Number;
			hide Trailer.Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground;
		}
		else
		{
			// info "no" ;
			hide Trailer.Do_you_have_a_deck;
			hide Trailer.Do_you_have_a_screened_in_room_or_a_Florida_room;
			hide Trailer.Do_you_have_a_hard_awning;
			hide Trailer.Would_you_like_to_insure_a_golf_cart;
			hide Trailer.Park_Details;
			hide Trailer.Address_Lines1;
			hide Trailer.City;
			hide Trailer.Province;
			hide Trailer.PostalCode;
			hide Trailer.Site_Number;
			show Trailer.Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground;
		}
		//}
		if(boatsub.Number_of_Golf_Cart == "")
		{
			boatsub.Golf_Cart="No";
			hide Trailer.Golf_Cart;
		}
		else
		{
			boatsub.Golf_Cart="Yes";
			show Trailer.Golf_Cart;
			disable Trailer.Golf_Cart;
		}
		if(boatsub.Is_this_trailer_financed == "Yes")
		{
			show Trailer.Lein_holder;
			show Trailer.Name_of_Financier;
			show Trailer.Address_line1;
			show Trailer.Address_line2;
			show Trailer.City1;
			show Trailer.Province1;
			show Trailer.Postal_Code;
			show Trailer.Country;
		}
		else
		{
			hide Trailer.Lein_holder;
			hide Trailer.Name_of_Financier;
			hide Trailer.Address_line1;
			hide Trailer.Address_line2;
			hide Trailer.City1;
			hide Trailer.Province1;
			hide Trailer.Postal_Code;
			hide Trailer.Country;
		}
		if(boatsub.Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground == "No")
		{
			show Trailer.Where_is_the_trailer_stored_while_not_in_use;
			show Trailer.Is_the_trailer_taken_into_the_USA_for_more_than_180_days;
			hide Trailer.Is_the_trailer_removed_from_the_park_in_the_off_season;
			hide Trailer.Do_you_have_a_deck;
			hide Trailer.Do_you_have_a_screened_in_room_or_a_Florida_room;
			hide Trailer.Do_you_have_a_hard_awning;
			hide Trailer.Would_you_like_to_insure_a_golf_cart;
			hide Trailer.Park_Details;
		}
		else
		{
			hide Trailer.Where_is_the_trailer_stored_while_not_in_use;
			hide Trailer.Is_the_trailer_taken_into_the_USA_for_more_than_180_days;
			show Trailer.Is_the_trailer_removed_from_the_park_in_the_off_season;
			show Trailer.Do_you_have_a_deck;
			show Trailer.Do_you_have_a_screened_in_room_or_a_Florida_room;
			show Trailer.Do_you_have_a_hard_awning;
			show Trailer.Would_you_like_to_insure_a_golf_cart;
			show Trailer.Address_Lines1;
			show Trailer.City;
			show Trailer.Province;
			show Trailer.PostalCode;
			show Trailer.Site_Number;
			show Trailer.Park_Details;
		}
		if(boatsub.Would_you_like_to_insure_a_golf_cart == "Yes")
		{
			show Trailer.Number_of_Golf_Cart;
			show Trailer.Value_of_Golf_Cart_1;
			show Trailer.Value_of_Golf_Cart_2;
			disable Trailer.Golf_Cart;
		}
		else
		{
			hide Trailer.Number_of_Golf_Cart;
			hide Trailer.Value_of_Golf_Cart_1;
			hide Trailer.Value_of_Golf_Cart_2;
			hide Trailer.Golf_Cart;
		}
		if(boatsub.Show_Premium_Breakdown == true)
		{
			show Trailer.Trailer_Base_Premium;
			show Trailer.Ol_Water_Protection_Prem;
			show Trailer.Liability_Prem;
			show Trailer.Trailer_over_25_years_sur;
			show Trailer.Seasonally_Parked_disc;
			show Trailer.Preferred_Parks_Disc;
			show Trailer.Detached_Priv_Stru_Cov;
			show Trailer.Personal_Prop_Cov;
			show Trailer.Golf_Excess_Prem;
			show Trailer.Golf_Prem_Base;
			//show Trailer.Premium_Breakdown;
		}
		else
		{
			hide Trailer.Trailer_Base_Premium;
			hide Trailer.Ol_Water_Protection_Prem;
			hide Trailer.Liability_Prem;
			hide Trailer.Trailer_over_25_years_sur;
			hide Trailer.Seasonally_Parked_disc;
			hide Trailer.Preferred_Parks_Disc;
			hide Trailer.Detached_Priv_Stru_Cov;
			hide Trailer.Personal_Prop_Cov;
			hide Trailer.Golf_Excess_Prem;
			hide Trailer.Golf_Prem_Base;
			//hide Trailer.Premium_Breakdown;
			input.Trailer.Trailer_Base_Premium = null;
			input.Trailer.Ol_Water_Protection_Prem = null;
			input.Trailer.Liability_Prem = null;
			input.Trailer.Trailer_over_25_years_sur = null;
			input.Trailer.Seasonally_Parked_disc = null;
			input.Trailer.Preferred_Parks_Disc = null;
			input.Trailer.Detached_Priv_Stru_Cov = null;
			input.Trailer.Personal_Prop_Cov = null;
			input.Trailer.Golf_Excess_Prem = null;
			input.Trailer.Golf_Prem_Base = null;
		}
	}
}
else
{
	input.Trailer.Golf_Cart = "No";
	//	hide Trailer.Premium_Breakdown;
	hide Trailer.Lein_holder;
	hide Trailer.Name_of_Financier;
	hide Trailer.Address_line1;
	hide Trailer.Address_line2;
	hide Trailer.City1;
	hide Trailer.Province1;
	hide Trailer.Postal_Code;
	hide Trailer.Country;
	hide Trailer.Would_you_like_to_insure_a_golf_cart;
	hide Trailer.Number_of_Golf_Cart;
	hide Trailer.Value_of_Golf_Cart_1;
	hide Trailer.Value_of_Golf_Cart_2;
	hide Trailer.Trailer_Base_Premium;
	hide Trailer.Ol_Water_Protection_Prem;
	hide Trailer.Liability_Prem;
	hide Trailer.Trailer_over_25_years_sur;
	hide Trailer.Seasonally_Parked_disc;
	hide Trailer.Preferred_Parks_Disc;
	hide Trailer.Detached_Priv_Stru_Cov;
	hide Trailer.Personal_Prop_Cov;
	hide Trailer.Golf_Excess_Prem;
	hide Trailer.Golf_Prem_Base;
	hide Trailer.UW_Approved;
}
if(input.Quote_Status == "Referral")
{
	for each  trailerSub in input.Trailer
	{
		show Trailer.Underwritting_Approved;
	}
}
else
{
	for each  trailerSub in input.Trailer
	{
		hide Trailer.Underwritting_Approved;
	}
}
hide Migration_Section;
hide Business_Source;
hide Created_Source;
hide Source;
disable Referral_Reason;
disable Quote_Record_ID_Server;
disable Organization_ID;
disable Policy_Status;
disable Policy_AutoRenewal_Status;
disable Carrier;
disable Created_Source;
//------------referral reason----------
hide Trailer.Referral_Status;
hide Trailer.Referral_Actual_cash_value;
hide Trailer.Referral_Is_this_a_dual_purpose_trailer;
hide Trailer.Referral_Replacement_cost;
hide Trailer.Referral_Is_there_any_pre_existing_damage_on_the_trailer;
hide Trailer.Referral_Reason;
hide Trailer.Referral_Golf_cart;
hide Trailer.Referalselect_the_modification_trailer_type;
hide Trailer.Referral_Are_the_any_modificationa_to_trailer;
hide Trailer.Referral_Do_you_live_in_the_trailer;
hide Trailer.Referral_business_use_of_any_kind;
hide Trailer.Referral_Is_the_trailer_taken_into_USA;
hide Trailer.Referral_Is_the_trailer_motorized;
hide Trailer.Referral_Is_there_any_heating;
hide Trailer.Referral_Section;
disable Trailer.Referral_Status;
disable Trailer.Referral_Actual_cash_value;
disable Trailer.Referral_Is_this_a_dual_purpose_trailer;
disable Trailer.Referral_Replacement_cost;
disable Trailer.Referral_Is_there_any_pre_existing_damage_on_the_trailer;
disable Trailer.Referral_Reason;
disable Trailer.Referral_Golf_cart;
disable Trailer.Referalselect_the_modification_trailer_type;
disable Trailer.Referral_Are_the_any_modificationa_to_trailer;
disable Trailer.Referral_Do_you_live_in_the_trailer;
disable Trailer.Referral_business_use_of_any_kind;
disable Trailer.Referral_Is_the_trailer_taken_into_USA;
disable Trailer.Referral_Is_the_trailer_motorized;
disable Trailer.Referral_Is_there_any_heating;
//disable Trailer.Referral_Section;
disable Business_Source;
hide Trailer.Describe_modifications;
