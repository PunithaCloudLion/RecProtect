if(input.Are_there_any_additional_names_on_the_boat_ownership == "No")
	{
		hide Additional_Names;
	}
	else
	{
		show Additional_Names;
	}
	// if(input.Are_there_any_additional_names_on_the_boat_ownership == "Yes")
	// {
	// 	show Additional_Names;
	// }
	// else
	// {
	// 	hide Additional_Names;
	// }
	// if(input.Where_Did_You_Find_Us == "Friend or Family")
	// {
	// 	show Name;
	// 	hide Name_of_Dealership;
	// 	hide Name_of_Campground;
	// 	hide Name_of_Marina;
	// 	hide Tell_us_more;
	// }
	// else if(input.Where_Did_You_Find_Us == "Dealership")
	// {
	// 	hide Name;
	// 	show Name_of_Dealership;
	// 	hide Name_of_Campground;
	// 	hide Name_of_Marina;
	// 	hide Tell_us_more;
	// }
	// else if(input.Where_Did_You_Find_Us == "Campground")
	// {
	// 	hide Name;
	// 	hide Name_of_Dealership;
	// 	show Name_of_Campground;
	// 	hide Name_of_Marina;
	// 	hide Tell_us_more;
	// }
	// else if(input.Where_Did_You_Find_Us == "Marina")
	// {
	// 	hide Name;
	// 	hide Name_of_Dealership;
	// 	hide Name_of_Campground;
	// 	show Name_of_Marina;
	// 	hide Tell_us_more;
	// }
	// else if(input.Where_Did_You_Find_Us == "Other")
	// {
	// 	hide Name;
	// 	hide Name_of_Dealership;
	// 	hide Name_of_Campground;
	// 	hide Name_of_Marina;
	// 	show Tell_us_more;
	// }
	// else
	// {
	// 	hide Name;
	// 	hide Name_of_Dealership;
	// 	hide Name_of_Campground;
	// 	hide Name_of_Marina;
	// 	hide Tell_us_more;
	// }
	// hide Where_Did_You_Find_Us;
	// hide Additional_Names.Customer_ID;
	// hide Boat1;
	// if(input.Quote_Status == "Referral")
	// {
	// 	show Boat_approve_for_being_over_15_years_old;
	// }
	// else
	// {
	// 	hide Boat_approve_for_being_over_15_years_old;
	// }
	// if(input.Quote_Status == "Completed")
	// {
	// 	disable Quote_ID;
	// 	disable Quote_Status;
	// 	disable Policy_Number;
	// 	disable Customer_ID;
	// 	disable Insured_First_Name;
	// 	disable Insured_Last_Name;
	// 	disable Email;
	// 	disable Phone_Number;
	// 	disable Boat_approve_for_being_over_15_years_old;
	// 	// 	disable Postal_code_ZIP_Code_of_Mailing_address;
	// 	disable Please_select_the_province_your_boat_is_used_in;
	// 	disable Referral_Reason;
	// 	disable How_many_boats_would_you_like_to_insure;
	// 	disable Where_Did_You_Find_Us;
	// 	disable Are_there_any_additional_names_on_the_boat_ownership_ownership;
	// 	disable Name;
	// 	disable Name_of_Marina;
	// 	disable Name_of_Dealership;
	// 	disable Name_of_Campground;
	// 	disable Tell_us_more;
	// 	disable Inception_Date;
	// 	disable Expiry_Date;
	// 	disable Agree_to_terms_and_conditions;
	// 	disable Enter_payment_info;
	// 	disable Additional_Names.Customer_ID;
	// 	disable Additional_Names.Additional_Insured_First_Name;
	// 	disable Additional_Names.Additional_Insured_Last_Name;
	// 	disable Additional_Names.Email;
	// 	disable Additional_Names.DOB;
	// 	disable Additional_Names.Phone_Number;
	// 	disable Boat.Select_the_type_of_watercraft;
	// 	disable Boat.Boat_Model_Year;
	// 	disable Boat.Boat_Manufacturer;
	// 	disable Boat.Boat_Model;
	// 	disable Boat.Replacement_Cost;
	// 	disable Boat.Actual_Cash_Value;
	// 	disable Boat.Is_the_Principal_Operator_the_same_as_the_Applicant_Owner;
	// 	disable Boat.First_Name;
	// 	disable Boat.Last_Name;
	// 	disable Boat.Date_of_Birth;
	// 	disable Boat.Principal_operator_s_years_of_boating_experience_with_vessels_of_a_similar_size_and_type;
	// 	disable Boat.Does_the_operator_hold_a_Pleasure_Craft_Operator_s_Card_PCOC;
	// 	disable Boat.Select_coverage_for_policy;
	// 	disable Boat.Premium_Per_Year;
	// 	disable Boat.Liability_coverage;
	// 	disable Boat.Boat_Coverage;
	// 	disable Boat.Deductible;
	// 	disable Boat.Salvage;
	// 	disable Boat.Personal_Effects_Coverage;
	// 	disable Boat.Pollution;
	// 	disable Boat.Navigational_Equipment_Coverage;
	// 	disable Boat.Removal_of_Wreckage;
	// 	disable Boat.Emergency_Towing_Limit;
	// 	disable Boat.Uninsured_Underinsured_Boater_Endorsement;
	// 	disable Boat.Loss_of_Use_Limit;
	// 	disable Boat.Do_any_of_the_above_apply_to_the_watercraft_safety_requirements;
	// 	disable Boat.Do_any_of_the_above_statements_apply_to_the_watercraft_Atlantic_Pacific;
	// 	disable Boat.Do_any_of_the_above_apply_to_the_applicant_Owner_primary_residence;
	// 	disable Boat.Do_any_of_the_above_statements_apply_to_the_watercraft_engine_Parasailing_propane;
	// 	disable Boat.Has_the_principal_operator_had_their_driver_s_license_suspended;
	// 	disable Boat.Has_the_principal_operator_had_any_motor_vehicle_convictions_in_the_last_3_years;
	// 	disable Boat.Has_the_principal_operator_had_any_motor_vehicle_claims_in_the_last_5_years;
	// 	disable Boat.How_many_motor_vehicle_convictions;
	// 	disable Boat.How_many_motor_vehicle_claims;
	// 	disable Boat.When;
	// 	disable Boat.Lengths;
	// 	disable Boat.Hull_ID_Serial;
	// 	disable Boat.Hull_Type;
	// 	disable Boat.Other_Hull_Type;
	// 	disable Boat.Estimated_max_speed;
	// 	disable Boat.Types;
	// 	disable Boat.Enter_the_type;
	// 	disable Boat.Fuel_Type;
	// 	disable Boat.Model_Year;
	// 	disable Boat.Manufacturer;
	// 	disable Boat.Serial;
	// 	disable Boat.Horsepower;
	// 	disable Boat.Types1;
	// 	disable Boat.Enter_the_type1;
	// 	disable Boat.Fuel_Type1;
	// 	disable Boat.Model_Year;
	// 	disable Boat.Manufacturer1;
	// 	disable Boat.Model_Year1;
	// 	disable Boat.Serial1;
	// 	disable Boat.Horsepower1;
	// 	disable Boat.Add_a_trailer;
	// 	disable Boat.Trailer_Value;
	// 	disable Boat.Trailer_Length;
	// 	disable Boat.Trailer_Manufacturer;
	// 	disable Boat.Trailer_Model_Year;
	// 	disable Boat.Trailer_VIN;
	// 	disable Boat.Add_a_tender;
	// 	disable Boat.Tender_Value;
	// 	disable Boat.Tender_Model_Year;
	// 	disable Boat.Tender_Serial;
	// 	disable Boat.Tender_Manufacturer;
	// 	disable Boat.Tender_Length;
	// 	disable Boat.Add_an_auxiliary_motor;
	// 	disable Boat.Aux_Engine_Value;
	// 	disable Boat.Aux_Engine_Model_Year;
	// 	disable Boat.Aux_Engine_HP_Thrust;
	// 	disable Boat.Auxiliary_Engine_Serial;
	// 	disable Boat.Aux_Engine_Manufacturer;
	// 	disable Boat.BoatQuote;
	// 	disable Boat.Is_this_boat_financed;
	// 	//disable Boat.Leinholder;
	// 	disable Boat.Select_a_Financier;
	// 	disable Boat.Name_of_Financier;
	// 	disable Boat.Address_line1;
	// 	disable Boat.Address_line2;
	// 	disable Boat.City;
	// 	disable Boat.Province;
	// 	disable Boat.Postal_Code;
	// 	disable Boat.Country;
	// }
	// hide Developer_Section;
	// if(input.Boat_quote_Page_View == true)
	// {
	// 	input.Notes = "<style>input[value=\"Update\"]{display:none!important;}input[value=\"Cancel\"]{display:none!important;}</style>";
	// }
	// /*if(input.Section_Type == "Get Started")
	// 						{
	// 							show Basic_Info;
	// 							show Customer_Information;
	// 							hide Boat;
	// 							hide General;
	// 							hide Unused_Fields;
	// 							hide Additional_Names;
	// 							hide Policy_Details;
	// 							hide Terms;
	// 							hide Payment;
	// 							hide Boat1;
	// 						}
	// 						else if(input.Section_Type == "Boat")
	// 						{
	// 							show Boat;
	// 							hide Basic_Info;
	// 							hide Customer_Information;
	// 							hide General;
	// 							hide Unused_Fields;
	// 							hide Additional_Names;
	// 							hide Policy_Details;
	// 							hide Terms;
	// 							hide Payment;
	// 							hide Boat1;
	// 						}
	// 						else if(input.Section_Type == "Policy Details")
	// 						{
	// 							show Policy_Details;
	// 							hide Basic_Info;
	// 							hide Customer_Information;
	// 							hide General;
	// 							hide Unused_Fields;
	// 							hide Additional_Names;
	// 							hide Boat;
	// 							hide Terms;
	// 							hide Payment;
	// 							hide Boat1;
	// 						}
	// 						else if(input.Section_Type == "Terms")
	// 						{
	// 							show Terms;
	// 							hide Policy_Details;
	// 							hide Basic_Info;
	// 							hide Customer_Information;
	// 							hide General;
	// 							hide Unused_Fields;
	// 							hide Additional_Names;
	// 							hide Boat;
	// 							hide Payment;
	// 							hide Boat1;
	// 						}
	// 						else if(input.Section_Type == "Payment")
	// 						{
	// 							show Payment;
	// 							hide Terms;
	// 							hide Policy_Details;
	// 							hide Basic_Info;
	// 							hide Customer_Information;
	// 							hide General;
	// 							hide Unused_Fields;
	// 							hide Additional_Names;
	// 							hide Boat;
	// 							hide Boat1;
	// 						}
	// 						else
	// 						{
	// 							show Basic_Info;
	// 							show Customer_Information;
	// 							show General;
	// 							show Boat;
	// 							show Additional_Names;
	// 							show Policy_Details;
	// 							show Terms;
	// 							show Payment;
	// 							show Boat1;
	// 						}*/
	