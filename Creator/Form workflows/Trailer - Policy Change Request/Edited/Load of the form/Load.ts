/**********Ananth*********/
getTrailerQuote = TrailerQuote[Zoho_Crm_ID == input.Zoho_Crm_ID && Policy_Status == "INACTIVE - FUTURE" && ID != input.ID];
if(getTrailerQuote.count() > 0 && input.Policy_Status == "ACTIVE")
{
	alert "Update the Same Changes in INACTIVE - FUTURE " + input.Policy_Number;
}
/****/
//alert based on policy status
if(input.Policy_Status == "INACTIVE - RENEWED" || input.Policy_Status == "INACTIVE - EXPIRED" || input.Policy_Status == "INACTIVE - CANCELLED")
{
	alert "These Policy cannot be edited";
}
//
if(input.Are_there_any_additional_names_on_the_trailer_ownership == "No")
{
	hide Additional_Names;
}
else
{
	show Additional_Names;
}
if(input.Please_select_the_province_your_trailer_is_located_in != null && input.Please_select_the_province_your_trailer_is_located_in != "")
{
	fetchProvince = input.Please_select_the_province_your_trailer_is_located_in;
}
else
{
	fetchProvince = null;
}
input.Please_select_the_province_your_trailer_is_located_in = fetchProvince;
fetchState = State_and_Province[ID != null].State_Province.getAll();
input.Please_select_the_province_your_trailer_is_located_in:ui.add(fetchState);
// disable Insured_First_Name;
// disable Insured_Last_Name;
// disable Link_Customer;
// disable Phone_Number;
// disable Email;
// disable Date_of_Birth;
hide Trailer.Where_is_the_trailer_stored_while_not_in_use;
enable Agree_to_terms_and_conditions;
show Payment;
disable Enter_payment_info;
disable Payment_Status;
disable Payment_Date;
disable Nuvei_Transaction_ID;
disable Policy_UPO_Data;
disable Stripe_Payment_Method_ID;
disable Stripe_Payment_Method_Details;
disable Stripe_Customer_ID;
disable Renewal_Eligibility;
disable Renewal_From_Old_Policy_ID;
disable Renewal_Stage;
hide Renewal;
hide Payment;
//populate Customer Details
if(input.Customer_ID != null)
{
	fetchCustomers = Customer[ID == input.Customer_ID];
	if(fetchCustomers.count() > 0)
	{
		input.Phone_Number = fetchCustomers.Phone_Number;
		input.Date_of_Birth = fetchCustomers.DOB;
		input.Where_Did_You_Find_Us = fetchCustomers.Where_Did_You_Find_Us;
	}
}
//Disabling edit access for the completed quote
if(input.Quote_Status == "Completed")
{
	disable Quote_ID;
	disable Policy_Number;
	disable Quote_Status;
	disable Customer_ID;
	disable Insured_First_Name;
	disable Insured_Last_Name;
	disable Email;
	disable Phone_Number;
	disable Postal_code_ZIP_Code;
	disable Please_select_the_province_your_trailer_is_located_in;
	disable Referral_Reason;
	disable Where_Did_You_Find_Us;
	disable Name;
	disable Name_of_Dealership;
	disable Name_of_Marina;
	disable Name_of_Campground;
	disable Tell_us_more;
	disable Are_there_any_additional_names_on_the_trailer_ownership;
	disable How_many_trailers_would_you_like_to_insure;
	disable Inception_Date;
	disable Expiry_Date;
	disable Country;
	disable Address;
	disable Suite_Apt;
	disable City;
	disable Province;
	disable Signature;
	//	disable Agree_to_terms_and_conditions;
	disable Enter_payment_info;
	disable Additional_Names.Customer_ID;
	disable Additional_Names.First_Name;
	disable Additional_Names.Last_Name;
	disable Additional_Names.Email;
	disable Additional_Names.Phone_Number;
	disable Additional_Names.DOB;
	disable Trailer.Select_Trailer_Type;
	disable Trailer.Trailer_Model_Year;
	disable Trailer.Are_the_solar_panels_factory_dealer_installed;
	disable Trailer.How_long_have_you_owned_this_trailer;
	disable Trailer.Are_you_the_original_owner_of_the_trailer;
	disable Trailer.Replacement_Cost;
	disable Trailer.Actual_Cash_Value;
	disable Trailer.Is_your_trailer_parked_within_500_feet_of_a_body_of_water;
	disable Trailer.Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground;
	disable Trailer.Where_is_the_trailer_stored_while_not_in_use;
	disable Trailer.Is_the_trailer_taken_into_the_USA_for_more_than_180_days;
	disable Trailer.Is_the_trailer_removed_from_the_park_in_the_off_season;
	disable Trailer.Please_add_details_on_interior_upgrades;
	disable Trailer.Please_provide_address_of_storage_location;
	disable Trailer.Do_you_have_a_deck;
	disable Trailer.Do_you_have_a_screened_in_room_or_a_Florida_room;
	disable Trailer.Do_you_have_a_hard_awning;
	disable Trailer.Would_you_like_to_insure_a_golf_cart;
	disable Trailer.Number_of_Golf_Cart;
	disable Trailer.Value_of_Golf_Cart_2;
	disable Trailer.Value_of_Golf_Cart_1;
	disable Trailer.Address_Lines1;
	disable Trailer.City;
	disable Trailer.Country;
	disable Trailer.Province;
	disable Trailer.Site_Number;
	disable Trailer.Select_coverage_for_policy;
	disable Trailer.Premium_Per_Year;
	disable Trailer.Overland_Water_Protection;
	disable Trailer.Coverage_Type;
	disable Trailer.Detached_Private_Structure_Coverage_Sheds_etc;
	disable Trailer.Personal_Property_Coverage_T_V_Furniture_etc;
	disable Trailer.Premises_Liability;
	disable Trailer.Deductible;
	disable Trailer.Do_you_live_in_the_trailer_full_time_all_year_round_as_a_principal_residence;
	disable Trailer.Is_the_unit_used_strictly_for_pleasure_purposes_with_no_rental_or_business_use_of_any_kind;
	disable Trailer.Is_there_any_heating_that_wasn_t_factory_installed_wood_stove_pellet_stove_etc;
	disable Trailer.Heating_Type;
	disable Trailer.Is_this_a_dual_purpose_trailer_toy_hauler_horse_trailer;
	disable Trailer.Trailer_Purpose_Type;
	disable Trailer.Please_select_which_items_are_being_hauled;
	disable Trailer.Are_there_any_modifications_to_the_trailer_ie_Addition_of_permanently_installed_solar_panels;
	disable Trailer.select_the_modification_trailer_type;
	disable Trailer.Are_the_solar_panels_factory_dealer_installed;
	disable Trailer.Please_add_details_on_interior_upgrades;
	disable Trailer.This_insurance_policy_does_not_cover_aftermarket_solar_panels_or_any_damage_arising_from_the_insta;
	disable Trailer.Is_the_trailer_motorized_and_able_to_travel_on_its_own_without_a_towing_vehicle;
	disable Trailer.Trailer_Manufacturer;
	disable Trailer.Trailer_Model;
	disable Trailer.Trailer_Length;
	disable Trailer.Trailer_Width;
	disable Trailer.VIN;
	disable Trailer.Deck_Length;
	disable Trailer.Deck_Width;
	disable Trailer.Hard_Awning_Width;
	disable Trailer.Hard_Awning_Length;
	disable Trailer.Screened_in_room_or_Florida_room_Length;
	disable Trailer.Screened_in_room_or_Florida_room_Width;
	disable Trailer.TrailerQuote;
	// 	disable Trailer.Effective_Date;
	// 	disable Trailer.Spoke_With;
	// 	disable Trailer.Confirmed_Email_Phone;
	// 	disable Trailer.Confirmed_Client;
	// 	disable Trailer.Update_Phone;
	// 	disable Trailer.Update_Email;
	disable Trailer.Non_Domestic_Address;
	disable Trailer.Add_Snowbird_Endorsement;
	disable Trailer.Is_this_trailer_financed;
	disable Trailer.Lein_holder;
	disable Trailer.Name_of_Financier;
	disable Trailer.Address_line1;
	disable Trailer.Address_line2;
	disable Trailer.City1;
	disable Trailer.Province1;
	disable Trailer.Postal_Code;
	disable Trailer.PostalCode;
}
