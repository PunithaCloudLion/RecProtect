/********* Code comment by Ananth, the reason is its trigger based on Select Policy
if(input.BoatQuote_ID != null && input.Select_Policy != null && input.Select_Type != null && input.Select_Type != "")
{
	fetchBoat = BoatQuote[ID == input.BoatQuote_ID];
	//-------------------Basic Info-------------------------
	input.Quote_ID = fetchBoat.Quote_ID;
	input.Policy_Number = fetchBoat.Policy_Number;
	input.Policy_Status = fetchBoat.Policy_Status;
	input.Policy_AutoRenewal_Status = fetchBoat.Policy_AutoRenewal_Status;
	input.Quote_Status = fetchBoat.Quote_Status;
	input.Deal_Type = fetchBoat.Deal_Type;
	input.Carrier = fetchBoat.Carrier;
	input.Quote_Record_ID_Server= fetchBoat.Quote_Record_ID_Server;
input.Organization_ID_Server=fetchBoat.Organization_ID_Server;

	//-------------------Customer Info-------------------------
	input.Referral_Reason = fetchBoat.Referral_Reason;
	input.Customer_ID = fetchBoat.Customer_ID;
	input.Insured_First_Name = fetchBoat.Insured_First_Name;
	input.Insured_Middle_Name = fetchBoat.Insured_Middle_Name;
	input.Insured_Last_Name = fetchBoat.Insured_Last_Name;
	input.Email = fetchBoat.Email;
	input.Link_Customer = fetchBoat.Link_Customer;
	input.Phone_Number = fetchBoat.Phone_Number;
	input.Date_of_Birth = fetchBoat.Date_of_Birth;
	input.Where_Did_You_Find_Us = fetchBoat.Where_Did_You_Find_Us;
	input.Name = fetchBoat.Name;
	input.Name_of_Dealership = fetchBoat.Name_of_Dealership;
	input.Name_of_Campground = fetchBoat.Name_of_Campground;
	input.Name_of_Marina = fetchBoat.Name_of_Marina;
	input.Tell_us_more = fetchBoat.Tell_us_more;
	input.Are_there_any_additional_names_on_the_boat_ownership_ownership = fetchBoat.Are_there_any_additional_names_on_the_boat_ownership_ownership;
	//----------------Additional Name Subform------------------------
	AdditionNames = Collection();
	for each  rec in fetchBoat.Additional_Names
	{
		row1 = Boat_Policy_change_Request.Additional_Names();
		row1.Additional_Insured_First_Name=rec.Additional_Insured_First_Name;
		row1.Additional_Insured_Last_Name=rec.Additional_Insured_Last_Name;
		row1.Customer_ID=rec.Customer_ID;
		row1.Email=rec.Email;
		row1.Link_Customer=rec.Link_Customer;
		row1.Phone_Number=rec.Phone_Number;
		row1.DOB=rec.DOB;
		AdditionNames.insert(row1);
	}
	input.Additional_Names.insert(AdditionNames);
	//---------------Quote Information---------------------
	input.Boat_approve_for_being_over_15_years_old = fetchBoat.Boat_approve_for_being_over_15_years_old;
	input.Please_select_the_province_your_boat_is_used_in = fetchBoat.Please_select_the_province_your_boat_is_used_in;
	input.How_many_boats_would_you_like_to_insure = fetchBoat.How_many_boats_would_you_like_to_insure;
	//------------------Boat Subform----------------
	BoatSubform = Collection();
	for each  rec1 in fetchBoat.Boat
	{
		row2 = Boat_Policy_change_Request.Boat();
		row2.Select_the_type_of_watercraft=rec1.Select_the_type_of_watercraft;
		row2.Boat_Model_Year=rec1.Boat_Model_Year;
		row2.Boat_Manufacturer=rec1.Boat_Manufacturer;
		row2.Boat_Model=rec1.Boat_Model;
		row2.Replacement_Cost=rec1.Replacement_Cost;
		row2.Actual_Cash_Value=rec1.Actual_Cash_Value;
		row2.Is_the_Principal_Operator_the_same_as_the_Applicant_Owner=rec1.Is_the_Principal_Operator_the_same_as_the_Applicant_Owner;
		row2.First_Name=rec1.First_Name;
		row2.Last_Name=rec1.Last_Name;
		row2.Date_of_Birth=rec1.Date_of_Birth;
		row2.Principal_operator_s_years_of_boating_experience_with_vessels_of_a_similar_size_and_type=rec1.Principal_operator_s_years_of_boating_experience_with_vessels_of_a_similar_size_and_type;
		row2.Does_the_operator_hold_a_Pleasure_Craft_Operator_s_Card_PCOC=rec1.Does_the_operator_hold_a_Pleasure_Craft_Operator_s_Card_PCOC;
		row2.Select_coverage_for_policy=rec1.Select_coverage_for_policy;
		row2.Premium_Per_Year=rec1.Premium_Per_Year;
		row2.Deductible=rec1.Deductible;
		row2.Personal_Effects_Coverage=rec1.Personal_Effects_Coverage;
		row2.Navigational_Equipment_Coverage=rec1.Navigational_Equipment_Coverage;
		row2.Emergency_Towing_Limit=rec1.Emergency_Towing_Limit;
		row2.Loss_of_Use_Limit=rec1.Loss_of_Use_Limit;
		row2.Recalculate=rec1.Recalculate;
		row2.Liability_coverage=rec1.Liability_coverage;
		row2.Boat_Coverage=rec1.Boat_Coverage;
		row2.Salvage=rec1.Salvage;
		row2.Pollution=rec1.Pollution;
		row2.Removal_of_Wreckage=rec1.Removal_of_Wreckage;
		row2.Uninsured_Underinsured_Boater_Endorsement=rec1.Uninsured_Underinsured_Boater_Endorsement;
		// 	row2.plain = rec1.plain;
		row2.Do_any_of_the_above_statements_apply_to_the_watercraft_Atlantic_Pacific=rec1.Do_any_of_the_above_statements_apply_to_the_watercraft_Atlantic_Pacific;
		// 	row2.plain1 = rec1.plain1;
		row2.Do_any_of_the_above_statements_apply_to_the_watercraft_engine_Parasailing_propane=rec1.Do_any_of_the_above_statements_apply_to_the_watercraft_engine_Parasailing_propane;
		// 	row2.plain2 =rec1.plain2;
		row2.Do_any_of_the_above_apply_to_the_watercraft_safety_requirements=rec1.Do_any_of_the_above_apply_to_the_watercraft_safety_requirements;
		// 	row2.plain3 = rec1.plain3;
		row2.Do_any_of_the_above_apply_to_the_applicant_Owner_primary_residence=rec1.Do_any_of_the_above_apply_to_the_applicant_Owner_primary_residence;
		// 	row2.plain4 = rec1.plain4;
		row2.Has_the_principal_operator_had_any_motor_vehicle_claims_in_the_last_5_years=rec1.Has_the_principal_operator_had_any_motor_vehicle_claims_in_the_last_5_years;
		row2.How_many_motor_vehicle_claims=rec1.How_many_motor_vehicle_claims;
		row2.Has_the_principal_operator_had_any_motor_vehicle_convictions_in_the_last_3_years=rec1.Has_the_principal_operator_had_any_motor_vehicle_convictions_in_the_last_3_years;
		row2.How_many_motor_vehicle_convictions=rec1.How_many_motor_vehicle_convictions;
		row2.Has_the_principal_operator_had_their_driver_s_license_suspended=rec1.Has_the_principal_operator_had_their_driver_s_license_suspended;
		row2.When=rec1.When;
		row2.Lengths=rec1.Lengths;
		row2.Hull_ID_Serial=rec1.Hull_ID_Serial;
		row2.Hull_Type=rec1.Hull_Type;
		row2.Other_Hull_Type=rec1.Other_Hull_Type;
		row2.Estimated_max_speed=rec1.Estimated_max_speed;
		row2.Types=rec1.Types;
		row2.Enter_the_type=rec1.Enter_the_type;
		row2.Fuel_Type1=rec1.Fuel_Type1;
		row2.Model_Year1=rec1.Model_Year1;
		row2.Manufacturer1=rec1.Manufacturer1;
		row2.Serial1=rec1.Serial1;
		row2.Horsepower1=rec1.Horsepower1;
		row2.Add_a_trailer=rec1.Add_a_trailer;
		row2.Trailer_Serial=rec1.Trailer_Serial;
		row2.Trailer_Value=rec1.Trailer_Value;
		row2.Trailer_Model_Year=rec1.Trailer_Model_Year;
		row2.Trailer_Manufacturer=rec1.Trailer_Manufacturer;
		row2.Trailer_VIN=rec1.Trailer_VIN;
		row2.Trailer_Length=rec1.Trailer_Length;
		row2.Add_a_tender=rec1.Add_a_tender;
		row2.Tender_Value=rec1.Tender_Value;
		row2.Tender_Model_Year=rec1.Tender_Model_Year;
		row2.Tender_Manufacturer=rec1.Tender_Manufacturer;
		row2.Tender_Serial=rec1.Tender_Serial;
		row2.Tender_Length=rec1.Tender_Length;
		row2.Add_an_auxiliary_motor=rec1.Add_an_auxiliary_motor;
		row2.Aux_Engine_Value=rec1.Aux_Engine_Value;
		row2.Aux_Engine_Model_Year=rec1.Aux_Engine_Model_Year;
		row2.Aux_Engine_Manufacturer=rec1.Aux_Engine_Manufacturer;
		row2.Auxiliary_Engine_Serial=rec1.Auxiliary_Engine_Serial;
		row2.Aux_Engine_HP_Thrust=rec1.Aux_Engine_HP_Thrust;
		row2.Is_this_boat_financed=rec1.Is_this_boat_financed;
		fetchLein = Lein_holder_Details[ID == rec1.Lein_holder];
		row2.Lein_holder=fetchLein.ID;
		row2.Name_of_Financier=rec1.Name_of_Financier;
		row2.Address_line1=rec1.Address_line1;
		row2.Address_line2=rec1.Address_line2;
		row2.City=rec1.City;
		row2.Province=rec1.Province;
		row2.Postal_Code=rec1.Postal_Code;
		row2.Country=rec1.Country;
		row2.Boat_Model_Age=rec1.Boat_Model_Age;
		// 	row2.Boat_Age = rec1.Boat_Age;
		row2.Eligible_for_Auto_Renewal=rec1.Eligible_for_Auto_Renewal;
		row2.Underwritting_Approved=rec1.Underwritting_Approved;
		row2.Is_auto_approved_for_next_5_years=rec1.Is_auto_approved_for_next_5_years;
		row2.Approved_Year=rec1.Approved_Year;
		row2.Boat_Status=rec1.Boat_Status;
		//New added fields for admin related changes
		row2.Admin_Override=rec1.Admin_Override;
		row2.PO_admin_License_Override=rec1.PO_admin_License_Override;
		row2.PO_admin_3year_Override=rec1.PO_admin_3year_Override;
		//
		BoatSubform.insert(row2);
	}
	input.Boat.insert(BoatSubform);
	//------------------Policy Details----------------
	input.Inception_Date = fetchBoat.Inception_Date;
	input.Expiry_Date = fetchBoat.Expiry_Date;
	input.Sales_Date = fetchBoat.Sales_Date;
	input.End_Date = fetchBoat.End_Date;
	input.Effective_Date1 = fetchBoat.Effective_Date;
	input.Last_Modified = fetchBoat.Last_Modified;
	input.Bind_Date = fetchBoat.Bind_Date;
	//--------------Signature------------
	input.plain1 = fetchBoat.plain1;
	//--------------------Terms-----------------------
	input.plain = fetchBoat.plain;
	input.Agree_to_terms_and_conditions = fetchBoat.Agree_to_terms_and_conditions;
	//-------------------------Payment---------------------------
	input.Enter_payment_info = fetchBoat.Enter_payment_info;
	input.Payment_Status=fetchBoat.Payment_Status;
	input.Payment_Date = fetchBoat.Payment_Date;
	input.Total_Premium_before_tax = fetchBoat.Total_Premium_before_tax;
	input.Fee = fetchBoat.Fee;
	input.Tax_Province = fetchBoat.Tax_Province;
	input.Tax_Precent = fetchBoat.Tax_Precent;
	input.Total_Tax = fetchBoat.Total_Tax;
	input.Total_Payable_Premium_after_tax = fetchBoat.Total_Payable_Premium_after_tax;
	input.Is_AutoCharge_Enabled = fetchBoat.Is_AutoCharge_Enabled;
	input.Nuvei_Transaction_ID = fetchBoat.Nuvei_Transaction_ID;
	input.Nuvei_Unique_Payment_Option_ID = fetchBoat.Nuvei_Unique_Payment_Option_ID;
	//------------------------Mailing Address---------------
	input.Country = fetchBoat.Country;
	input.Address = fetchBoat.Address;
	input.Suite_Apt = fetchBoat.Suite_Apt;
	input.City = fetchBoat.City;
	input.Province = fetchBoat.Province;
	input.Postal_code_ZIP_Code = fetchBoat.Postal_code_ZIP_Code;
	//------------------------Adjusted Premium---------------
	input.Outstanding = fetchBoat.Outstanding;
	input.Prorated = fetchBoat.Prorated;
	input.Tax = fetchBoat.Tax;
	input.Total = fetchBoat.Total;
	input.Prorate_From = fetchBoat.Prorate_From;
	input.Waive_Free = fetchBoat.Waive_Free;
	input.Reason_For_Rejection = fetchBoat.Reason_For_Rejection;
	//------------Other Information--------------
	input.Is_Watercraft_Ineligible_For_Coverage = fetchBoat.Is_Watercraft_Ineligible_For_Coverage;
	input.Does_Watercraft_Meet_Safety_And_Usage_Requirements = fetchBoat.Does_Watercraft_Meet_Safety_And_Usage_Requirements;
	input.Is_Applicant_Ineligible_For_Coverage = fetchBoat.Is_Applicant_Ineligible_For_Coverage;
	input.Is_Operator_Ineligible_For_Coverage = fetchBoat.Is_Operator_Ineligible_For_Coverage;
	//--------------------------Document Generation Section-------------
	// 	input.Combined_Doc_Download_URL = fetchBoat.Combined_Doc_Download_URL;
	// 	input.Combined_Doc_Status_Check_On = fetchBoat.Combined_Doc_Status_Check_On;
	// 	input.Combined_Doc_Response = fetchBoat.Combined_Doc_Response;
	//----------------------Additional Information-------------------
	// 	disable Effective_Date;
	// 	disable Spoke_With;
	// 	disable Confirmed_Client;
	// 	disable Update_Email;
	// 	disable Update_Phone;
	// 	disable Confirmed_Email_Phone;
	// 	disable X_Sell;
	// 	disable Highlights_and_Comments;
	//------------------- Admin changes-------------------------- input.Select_Rate = fetchBoat.Select_Rate ;
	input.Override_Tax_by_Admin = fetchBoat.Override_Tax_by_Admin;
	input.Overriden_Tax = fetchBoat.Overriden_Tax;
	//------------------- Developer section--------------------------
	input.Notes = fetchBoat.Notes;
	input.Auto_Populate = fetchBoat.Auto_Populate;
	input.Boat_quote_Page_View = fetchBoat.Boat_quote_Page_View;
	input.Migrated_Status = fetchBoat.Migrated_Status;
	input.Zoho_Crm_ID = fetchBoat.Zoho_Crm_ID;
}*/
//--------------------Field Disable--------------------
disable Quote_ID;
disable Quote_Record_ID_Server;
disable Organization_ID_Server;
disable Policy_Number;
disable Quote_Status;
disable Policy_Status;
disable Deal_Type;
disable Referral_Reason;
disable Insured_First_Name;
disable Insured_Middle_Name;
disable Insured_Last_Name;
disable Email;
disable Link_Customer;
disable Phone_Number;
disable Date_of_Birth;
disable Where_Did_You_Find_Us;
disable Name;
disable Name_of_Dealership;
disable Name_of_Campground;
disable Name_of_Marina;
disable Tell_us_more;
//disable Are_there_any_additional_names_on_the_boat_ownership;
disable Additional_Names.Customer_ID;
disable Additional_Names.Additional_Insured_First_Name;
disable Additional_Names.Additional_Insured_Last_Name;
disable Additional_Names.Email;
disable Additional_Names.Link_Customer;
disable Additional_Names.Phone_Number;
disable Additional_Names.DOB;
disable Additional_Names.Boats;
disable Boat.Select_the_type_of_watercraft;
disable Boat.Boat_Model_Year;
disable Boat.Boat_Manufacturer;
disable Boat.Boat_Model;
disable Boat.Replacement_Cost;
disable Boat.Actual_Cash_Value;
disable Boat.Is_the_Principal_Operator_the_same_as_the_Applicant_Owner;
disable Boat.First_Name;
disable Boat.Last_Name;
disable Boat.Date_of_Birth;
disable Boat.Principal_operator_s_years_of_boating_experience_with_vessels_of_a_similar_size_and_type;
disable Boat.Does_the_operator_hold_a_Pleasure_Craft_Operator_s_Card_PCOC;
//disable Boat.Select_coverage_for_policy;
disable Boat.Premium_Per_Year;
disable Boat.Deductible;
disable Boat.Personal_Effects_Coverage;
disable Boat.Navigational_Equipment_Coverage;
disable Boat.Emergency_Towing_Limit;
disable Boat.Loss_of_Use_Limit;
//disable Boat.Recalculate;
disable Boat.Liability_coverage;
disable Boat.Boat_Coverage;
disable Boat.Salvage;
disable Boat.Pollution;
disable Boat.Removal_of_Wreckage;
disable Boat.Uninsured_Underinsured_Boater_Endorsement;
disable Boat.Do_any_of_the_above_statements_apply_to_the_watercraft_Atlantic_Pacific;
disable Boat.Do_any_of_the_above_statements_apply_to_the_watercraft_engine_Parasailing_propane;
disable Boat.Do_any_of_the_above_apply_to_the_watercraft_safety_requirements;
disable Boat.Do_any_of_the_above_apply_to_the_applicant_Owner_primary_residence;
disable Boat.Has_the_principal_operator_had_any_motor_vehicle_claims_in_the_last_5_years;
disable Boat.How_many_motor_vehicle_claims;
disable Boat.Has_the_principal_operator_had_any_motor_vehicle_convictions_in_the_last_3_years;
disable Boat.How_many_motor_vehicle_convictions;
disable Boat.Has_the_principal_operator_had_their_driver_s_license_suspended;
disable Boat.When;
disable Boat.Lengths;
disable Boat.Hull_ID_Serial;
disable Boat.Hull_Type;
disable Boat.Other_Hull_Type;
disable Boat.Estimated_max_speed;
disable Boat.Types;
disable Boat.Enter_the_type;
disable Boat.Fuel_Type;
disable Boat.Model_Year;
disable Boat.Manufacturer;
disable Boat.Serial;
disable Boat.Horsepower;
disable Boat.Types1;
disable Boat.Enter_the_type1;
disable Boat.Fuel_Type1;
disable Boat.Model_Year1;
disable Boat.Manufacturer1;
disable Boat.Serial1;
disable Boat.Horsepower1;
disable Boat.Add_a_trailer;
disable Boat.Trailer_Value;
disable Boat.Trailer_Serial;
disable Boat.Trailer_Model_Year;
disable Boat.Trailer_Manufacturer;
disable Boat.Trailer_VIN;
disable Boat.Trailer_Length;
disable Boat.Add_a_tender;
disable Boat.Tender_Value;
disable Boat.Tender_Model_Year;
disable Boat.Tender_Manufacturer;
disable Boat.Tender_Serial;
disable Boat.Add_an_auxiliary_motor;
disable Boat.Aux_Engine_Value;
disable Boat.Aux_Engine_Model_Year;
disable Boat.Aux_Engine_Manufacturer;
disable Boat.Auxiliary_Engine_Serial;
disable Boat.Aux_Engine_HP_Thrust;
disable Boat.BoatQuote;
disable Boat.Is_this_boat_financed;
disable Boat.Lein_holder;
disable Boat.Name_of_Financier;
disable Boat.Address_line1;
disable Boat.Address_line2;
disable Boat.City;
disable Boat.Province;
disable Boat.Postal_Code;
disable Boat.Country;
disable Boat.Boat_Model_Age;
disable Boat.Eligible_for_Auto_Renewal;
disable Boat.Underwritting_Approved;
disable Boat.Is_auto_approved_for_next_5_years;
disable Boat.Approved_Year;
disable Boat.Boat_Status;
disable Boat.Admin_Override;
// disable Boat.Add_Snowbird_Endorsement;
// disable Boat.Effective_Date;
// disable Boat.Spoke_With;
// disable Boat.Confirmed_Client;
// disable Boat.Confirmed_Email_Phone;
// disable Boat.Update_Email;
// disable Boat.Do_you_live_in_the_trailer_full_time_all_year_round_as_a_principal_residence;
// disable Boat.Non_Domestic_Address;
disable Inception_Date;
disable Sales_Date;
disable Expiry_Date;
disable Signature;
disable Total_Premium_before_tax;
disable Fee;
disable Tax_Province;
disable Tax_Precent;
disable Total_Tax;
disable Total_Payable_Premium_after_tax;
disable Agree_to_terms_and_conditions;
disable Outstanding;
disable Payment_Status;
disable Prorated;
disable Tax;
disable Total;
disable Prorate_From;
// disable Waive_Free;    
disable Reason_For_Rejection1;
disable Is_Watercraft_Ineligible_For_Coverage;
disable Does_Watercraft_Meet_Safety_And_Usage_Requirements;
disable Is_Applicant_Ineligible_For_Coverage;
disable Is_Operator_Ineligible_For_Coverage;
disable New_Total_Premium_before_tax;
disable New_Total_Payable_Premium_after_tax;
disable New_Tax_Province;
disable New_Tax_Percent;
disable New_Total_Tax;
disable New_Admin_Fee;
disable Effective_Date;
disable Spoke_With;
disable Confirmed_Client;
disable Update_Email;
disable Update_Phone;
disable Confirmed_Email_Phone;
disable X_Sell;
disable Highlights_and_Comments;
// disable Select_Rate;
disable Override_Tax_by_Admin;
// disable Overriden_Tax;
disable Override_Tax;
hide Boat.Underwritting_Approved;
//-----------------------quote status base show hide---------------------------
if(input.Quote_Status == "Referral")
{
	show Boat.Underwritting_Approved;
}
else
{
	hide Boat.Underwritting_Approved;
}




get_BoatQuote = BoatQuote[ID == input.BoatQuote_ID];
get_BoatCRMID = BoatQuote[Zoho_Crm_ID == get_BoatQuote.Zoho_Crm_ID && Policy_Status == "ACTIVE" || Policy_Status == "INACTIVE - RENEWAL PENDING"].ID.getAll();
input.Select_Policy:ui.add(get_BoatCRMID);