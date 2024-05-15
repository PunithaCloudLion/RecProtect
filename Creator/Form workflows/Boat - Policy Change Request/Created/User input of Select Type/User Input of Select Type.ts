if(input.Select_Type == "" && input.Select_Policy == null)
	{
		hide Basic_Info;
		hide Customer_Information;
		hide Additional_Names;
		hide General;
		hide Boat;
		hide Policy_Details;
		//	hide Signature1;
		hide Terms;
		hide Payment;
		hide Mailing_Address;
		hide Unused_Fields;
		hide Adjusted_Premium;
		hide Other_Information;
		hide Document_Generation_Section;
		hide Developer_Section;
		hide new_premiums;
		hide Additional_Information;
		hide plain3;
		hide Recalculate_the_Premium;
		// 	hide Admin_Changes;
		hide Tax_Exemption;
	}
	if(input.Select_Type != "" && input.Select_Policy != null)
	{
		hide Boat.Underwritting_Approved;
		//New Added fields For Admin related Changes
		hide Customer_ID;
		hide Insured_Middle_Name;
		hide Additional_Names.Customer_ID;
		hide Boat.RCV_Exceeding_Limits_UW_Approved;
		hide Boat.ACV_Exceeding_Limits_UW_Approved;
		disable Boat.Override_Boat_for_being_more_than_15_years_old;
		disable Boat.Admin_Override;
		disable Boat.PO_admin_License_Override;
		disable Boat.PO_admin_3year_Override;
		hide Boat.Types1;
		hide Boat.Enter_the_type1;
		hide Boat.Fuel_Type1;
		hide Boat.Model_Year1;
		hide Boat.Manufacturer1;
		hide Boat.Serial1;
		hide Boat.Horsepower1;
		hide Boat.Main_Engine2;
		hide Boat.Admin_Override;
		hide Boat.PO_admin_License_Override;
		hide Boat.PO_admin_3year_Override;
		hide Boat.Suite_Unit_Number;
		//---------code added by nambi
		hide Link_Customer;
		hide Additional_Names.Link_Customer;
		//	disable Boat.Show_Premium_Breakdown;
		disable Boat.Boat_Base_Premium;
		disable Boat.Boat_operator_gt_25_lt_3years_exp_prem;
		disable Boat.Boat_age_gt_15_prem;
		disable Boat.Navi_eqip_prem;
		disable Boat.Endorsement_prem;
		disable Boat.Boat_Liability_Prem;
		disable Boat.Boat_Operator_age_20_25_prem;
		disable Boat.Deductible_Prem;
		disable Boat.Pers_eff_prem;
		disable Boat.Total_Prem;
		hide Policy_Status;
		hide Carrier;
		hide Organization_ID_Server;
		show plain;
		//
		for each  boatsub in Boat
		{
			if(boatsub.Admin_Override != null && boatsub.Admin_Override != "")
			{
				if(boatsub.Admin_Override == "Yes")
				{
					enable Boat.Has_the_principal_operator_had_any_motor_vehicle_claims_in_the_last_5_years;
				}
				else
				{
					disable Boat.Has_the_principal_operator_had_any_motor_vehicle_claims_in_the_last_5_years;
				}
			}
			else
			{
				disable Boat.Has_the_principal_operator_had_any_motor_vehicle_claims_in_the_last_5_years;
			}
			if(boatsub.PO_admin_License_Override != null && boatsub.PO_admin_License_Override != "")
			{
				if(boatsub.PO_admin_License_Override == "Yes")
				{
					enable Boat.Has_the_principal_operator_had_their_driver_s_license_suspended;
				}
				else
				{
					disable Boat.Has_the_principal_operator_had_their_driver_s_license_suspended;
				}
			}
			else
			{
				disable Boat.Has_the_principal_operator_had_their_driver_s_license_suspended;
			}
			if(boatsub.PO_admin_3year_Override != null && boatsub.PO_admin_3year_Override != "")
			{
				if(boatsub.PO_admin_3year_Override == "Yes")
				{
					enable Boat.Has_the_principal_operator_had_any_motor_vehicle_convictions_in_the_last_3_years;
				}
				else
				{
					disable Boat.Has_the_principal_operator_had_any_motor_vehicle_convictions_in_the_last_3_years;
				}
			}
			else
			{
				disable Boat.Has_the_principal_operator_had_any_motor_vehicle_convictions_in_the_last_3_years;
			}
			//
		}
		show new_premiums;
		show plain3;
		show Basic_Info;
		show Customer_Information;
		show Additional_Names;
		show General;
		show new_premiums;
		show Boat;
		show Policy_Details;
		//	show Signature1;
		show Terms;
		show Payment;
		show Mailing_Address;
		show Unused_Fields;
		show Adjusted_Premium;
		show Premium;
		hide Other_Information;
		show Additional_Information;
		input.Link_Customer = false;
		//	show Developer_Section ;
		// 	show Bind_Date ;
		// 	show Last_Modified;
		// 	show Reason_For_Rejection;
		disable Quote_ID;
		disable Boat.Boat_Coverage;
		disable Boat.Salvage;
		disable Boat.Liability_coverage;
		disable Boat.Emergency_Towing_Limit;
		disable Boat.Loss_of_Use_Limit;
		disable Boat.Pollution;
		disable Boat.Removal_of_Wreckage;
		disable Boat.Premium_Per_Year;
		disable Boat.Uninsured_Underinsured_Boater_Endorsement;
		disable Tax_Province;
		disable Total_Premium_before_tax;
		disable Fee;
		disable Total_Tax;
		disable Tax_Precent;
		disable Total_Payable_Premium_after_tax;
		disable Expiry_Date;
		disable Signature;
		disable Agree_to_terms_and_conditions;
		disable Policy_Number;
		disable Country;
		disable Address;
		disable Suite_Apt;
		disable City;
		disable Province;
		disable Postal_code_ZIP_Code;
		disable Were_you_referred_by_a_friend_or_business;
		disable Please_select_the_province_your_boat_is_used_in;
		disable Deal_Type;
		disable Last_Modified;
		// 	show Boat_Policy_Premium_Generating.Trailer_Value;
		// 	show Boat_Policy_Premium_Generating.Trailer_Length;
		// 	show Boat_Policy_Premium_Generating.Trailer_Manufacturer;
		// 	show Boat_Policy_Premium_Generating.Trailer_Model_Year;
		// 	show Boat_Policy_Premium_Generating.Trailer_VIN;
		// 	show Boat_Policy_Premium_Generating.Tender_Value;
		// 	show Boat_Policy_Premium_Generating.Tender_Model_Year;
		// 	show Boat_Policy_Premium_Generating.Tender_Serial;
		// 	show Boat_Policy_Premium_Generating.Tender_Manufacturer;
		// 	show Boat_Policy_Premium_Generating.Tender_Length;
		// 	show Boat_Policy_Premium_Generating.Aux_Engine_Value;
		// 	show Boat_Policy_Premium_Generating.Aux_Engine_Model_Year;
		// 	show Boat_Policy_Premium_Generating.Aux_Engine_Manufacturer;
		// 	show Boat_Policy_Premium_Generating.Aux_Engine_HP_Thrust;
		// 	show Boat_Policy_Premium_Generating.Auxiliary_Engine_Serial;
		// 	show Boat_Policy_Premium_Generating.Replacement_Cost;
		hide Boat.Trailer_Serial;
		hide Boat.BoatQuote;
		hide Boat.Eligible_for_Auto_Renewal;
		hide Boat.Is_auto_approved_for_next_5_years;
		hide Boat.Boat_Status;
		hide Boat.Boat_Migration_ID;
		// 	hide Boat.Add_Snowbird_Endorsement;
		// 	hide Boat.Effective_Date;
		// 	hide Boat.Spoke_With;
		// 	hide Boat.Confirmed_Client;
		// 	hide Boat.Confirmed_Email_Phone;
		// 	hide Boat.Update_Email;
		// 	hide Boat.Update_Phone;
		// 	hide Boat.Do_you_live_in_the_trailer_full_time_all_year_round_as_a_principal_residence;
		// 	hide Boat.Non_Domestic_Address;
		hide Boat.Opt_In_for_RCV;
		hide Boat.Migrated;
		disable Boat.Lein_holder;
		disable Boat.Address_line1;
		disable Boat.Address_line2;
		disable Boat.Province;
		disable Boat.City;
		disable Boat.Country;
		disable Boat.Province;
		disable Boat.Replacement_Cost;
		if(input.Boat != null)
		{
			//	fetchLeinholders = Lein_holder_Details[ID != null].Name_of_Financier.getAll();
			//leinlist = fetchLeinholders;
			//row.Select_a_Financier:ui.add(fetchLeinholders);
			for each  boatsub in input.Boat
			{
				// 			if(boatsub.Select_a_Financier != null && boatsub.Select_a_Financier != "")
				// 			{
				// 				lienlist = boatsub.Select_a_Financier;
				// 			}
				// 			else
				// 			{
				// 			}
				// 			input.Boat_Policy_Premium_Generating.Select_a_Financier = lienlist;
				// 			Boat_Policy_Premium_Generating.Select_a_Financier:ui.add(fetchLeinholders);
				// 			if(boatsub.Is_this_boat_financed == true)
				// 			{
				// 				show Boat.Lein_holder;
				// 				show Boat.Name_of_Financier;
				// 				show Boat.Address_line1;
				// 				show Boat.Address_line2;
				// 				show Boat.Postal_Code;
				// 				show Boat.City;
				// 				show Boat.Province;
				// 				show Boat.Country;
				// 			}
				// 			else
				// 			{
				// 				hide Boat.Lein_holder;
				// 				hide Boat.Name_of_Financier;
				// 				hide Boat.Address_line1;
				// 				hide Boat.Address_line2;
				// 				hide Boat.Postal_Code;
				// 				hide Boat.City;
				// 				hide Boat.Province;
				// 				hide Boat.Country;
				// 			}
			}
		}
		else
		{
			hide Boat.Lein_holder;
			hide Boat.Name_of_Financier;
			hide Boat.Address_line1;
			hide Boat.Address_line2;
			hide Boat.Postal_Code;
			hide Boat.City;
			hide Boat.Province;
			hide Boat.Country;
		}
	}
	//------------------------------------------Boat type based field enable------------------------------------------------------------
	if(input.Select_Type == "Premium Generating")
	{
		//	show Policy_Status;
		hide Unused_Fields;
		show Recalculate_the_Premium;
		enable Boat.Actual_Cash_Value;
		//--------------Basic Info---------------------------
		//	enable Deal_Type;
		//-----------------------Customer Information----------------------
		disable Are_there_any_additional_names_on_the_boat_ownership;
		enable Date_of_Birth;
		//-----------------------Addition Names subform----------------------
		enable Additional_Names.DOB;
		//-----------------------Quote Information----------------------
		enable Please_select_the_province_your_boat_is_used_in;
		enable Product_Package;
		//-----------------------Boat Policy Premium Generating Subform---------------------
		enable Boat.Select_the_type_of_watercraft;
		enable Boat.Boat_Model_Year;
		enable Boat.Is_the_Principal_Operator_the_same_as_the_Applicant_Owner;
		enable Boat.Date_of_Birth;
		enable Boat.Replacement_Cost;
		enable Boat.Principal_operator_s_years_of_boating_experience_with_vessels_of_a_similar_size_and_type;
		enable Boat.Boat_Model_Age;
		enable Boat.Select_coverage_for_policy;
		enable Boat.Boat_Coverage;
		enable Boat.Deductible;
		enable Boat.Personal_Effects_Coverage;
		enable Boat.Navigational_Equipment_Coverage;
		enable Boat.Salvage;
		enable Boat.Add_a_trailer;
		enable Boat.Trailer_Value;
		enable Boat.Add_a_tender;
		enable Boat.Tender_Value;
		enable Boat.Add_an_auxiliary_motor;
		enable Boat.Aux_Engine_Value;
		enable Boat.Aux_Engine_Model_Year;
		enable Prorate_From;
		//enable Boat.Effective_Date;
		enable Effective_Date;
		//enable Boat.Liability_coverage;
		//-----------------------Policy Details----------------------
		//-----------------------Adjusted Premium----------------------
		enable Outstanding;
		enable Prorated;
		enable Prorate_From;
		//-----------------------New Premium----------------------
		//enable New_Admin_Fee;
		//-----------------------Additional Information----------------------
		enable Expiry_Date;
		enable Effective_Date;
		enable Confirmed_Client;
		enable Update_Email;
		enable Update_Phone;
		enable Confirmed_Email_Phone;
		enable X_Sell;
		enable Highlights_and_Comments;
		disable Spoke_With;
		disable Insured_First_Name;
		disable Insured_Middle_Name;
		disable Insured_Last_Name;
		disable Email;
		disable Phone_Number;
		disable Additional_Names.Additional_Insured_First_Name;
		disable Additional_Names.Additional_Insured_Last_Name;
		//	enable Additional_Names.DOB;
		disable Additional_Names.Email;
		disable Additional_Names.Phone_Number;
		disable Country;
		disable Address;
		disable Suite_Apt;
		disable Province;
		disable Postal_code_ZIP_Code;
		disable Boat.Boat_Manufacturer;
		disable Boat.Boat_Model;
		disable Boat.Does_the_operator_hold_a_Pleasure_Craft_Operator_s_Card_PCOC;
		disable Is_Watercraft_Ineligible_For_Coverage;
		disable Does_Watercraft_Meet_Safety_And_Usage_Requirements;
		disable Is_Applicant_Ineligible_For_Coverage;
		disable Is_Operator_Ineligible_For_Coverage;
		disable Boat.Do_any_of_the_above_statements_apply_to_the_watercraft_Atlantic_Pacific;
		disable Boat.Do_any_of_the_above_statements_apply_to_the_watercraft_engine_Parasailing_propane;
		disable Boat.Do_any_of_the_above_apply_to_the_watercraft_safety_requirements;
		disable Boat.Do_any_of_the_above_apply_to_the_applicant_Owner_primary_residence;
		disable Boat.Has_the_principal_operator_had_any_motor_vehicle_claims_in_the_last_5_years;
		disable Boat.Has_the_principal_operator_had_any_motor_vehicle_convictions_in_the_last_3_years;
		disable Boat.Has_the_principal_operator_had_their_driver_s_license_suspended;
		disable Boat.How_many_motor_vehicle_claims;
		disable Boat.How_many_motor_vehicle_convictions;
		disable Boat.When;
		disable Boat.Lengths;
		disable Boat.Hull_Type;
		disable Boat.Other_Hull_Type;
		disable Boat.Hull_ID_Serial;
		disable Boat.Estimated_max_speed;
		disable Boat.Types;
		disable Boat.Enter_the_type;
		disable Boat.Fuel_Type;
		disable Boat.Horsepower;
		enable Boat.Serial1;
		enable Boat.Types1;
		enable Boat.Enter_the_type1;
		enable Boat.Fuel_Type1;
		enable Boat.Model_Year1;
		enable Boat.Manufacturer1;
		enable Boat.Horsepower1;
		disable Boat.Serial;
		enable Boat.Trailer_Model_Year;
		enable Boat.Trailer_Manufacturer;
		enable Boat.Trailer_Serial;
		enable Boat.Trailer_Length;
		enable Boat.Trailer_VIN;
		// 	disable Boat.Trailer_Model_Year;
		// 	disable Boat.Trailer_Manufacturer;
		// 	disable Boat.Trailer_Serial;
		// 	disable Boat.Trailer_Length;
		disable Boat.Tender_Model_Year;
		disable Boat.Tender_Manufacturer;
		disable Boat.Tender_Serial;
		disable Boat.Tender_Length;
		disable Boat.Aux_Engine_Manufacturer;
		disable Boat.Auxiliary_Engine_Serial;
		disable Boat.Aux_Engine_HP_Thrust;
		disable Payment_Date;
		disable Bind_Date;
		disable Reason_For_Rejection1;
		enable Boat.Is_this_boat_financed;
		enable Boat.Lein_holder;
		// 	enable Boat.Address_line1 ;
		// 	enable Boat.Address_line2 ;
		// 	enable Boat.City ;
		// 	enable Boat.Province ;
		// 	enable Boat.Postal_Code ;
		// 	enable Boat.Country ;
		get_admin_fee = Commissions_Configuration[Commision == "Policy Change - Admin Fee"].Percent;
		input.New_Admin_Fee = ifnull(input.New_Total_Premium_before_tax,0) * ifnull(get_admin_fee,0) / 100;
	}
	else if(input.Select_Type == "Non-Premium Generating")
	{
		disable Policy_Status;
		enable Date_of_Birth;
		disable Please_select_the_province_your_boat_is_used_in;
		disable Boat.Select_the_type_of_watercraft;
		//	disable Boat.Boat_Model_Year;
		disable Boat.Actual_Cash_Value;
		disable Boat.Select_coverage_for_policy;
		disable Boat.Is_the_Principal_Operator_the_same_as_the_Applicant_Owner;
		disable Boat.Replacement_Cost;
		disable Boat.Boat_Model_Age;
		disable Boat.Boat_Coverage;
		disable Boat.Deductible;
		disable Boat.Personal_Effects_Coverage;
		disable Boat.Navigational_Equipment_Coverage;
		disable Boat.Salvage;
		disable Boat.Add_a_trailer;
		disable Boat.Trailer_Value;
		disable Boat.Add_a_tender;
		disable Boat.Tender_Value;
		disable Boat.Add_an_auxiliary_motor;
		disable Boat.Aux_Engine_Value;
		disable Boat.Aux_Engine_Model_Year;
		disable Effective_Date;
		disable New_Admin_Fee;
		disable Prorate_From;
		//	hide Additional_Names.DOB;
		hide Unused_Fields;
		hide Recalculate_the_Premium;
		enable Were_you_referred_by_a_friend_or_business;
		//--------------Basic Info---------------------------
		// 	enable Policy_Number;
		// 	enable Quote_ID;
		//--------------Customer Information---------------------------
		enable Insured_First_Name;
		enable Insured_Middle_Name;
		enable Insured_Last_Name;
		disable Email;
		disable Phone_Number;
		enable Are_there_any_additional_names_on_the_boat_ownership;
		//-----------------------Addition Names subform----------------------
		enable Additional_Names.Additional_Insured_First_Name;
		enable Additional_Names.Additional_Insured_Last_Name;
		enable Additional_Names.Email;
		enable Additional_Names.Phone_Number;
		//-----------------------Mailing Address---------------------
		enable Country;
		enable Address;
		enable Suite_Apt;
		enable City;
		enable Province;
		enable Postal_code_ZIP_Code;
		//-----------------------Other Information---------------------
		enable Is_Watercraft_Ineligible_For_Coverage;
		enable Does_Watercraft_Meet_Safety_And_Usage_Requirements;
		enable Is_Applicant_Ineligible_For_Coverage;
		enable Is_Operator_Ineligible_For_Coverage;
		//-----------------------Boat Policy Premium Generating Subform---------------------
		enable Boat.Boat_Manufacturer;
		enable Boat.Boat_Model;
		enable Boat.Does_the_operator_hold_a_Pleasure_Craft_Operator_s_Card_PCOC;
		enable Boat.Do_any_of_the_above_statements_apply_to_the_watercraft_Atlantic_Pacific;
		enable Boat.Do_any_of_the_above_statements_apply_to_the_watercraft_engine_Parasailing_propane;
		enable Boat.Do_any_of_the_above_apply_to_the_watercraft_safety_requirements;
		enable Boat.Do_any_of_the_above_apply_to_the_applicant_Owner_primary_residence;
		enable Boat.Has_the_principal_operator_had_any_motor_vehicle_claims_in_the_last_5_years;
		enable Boat.Has_the_principal_operator_had_any_motor_vehicle_convictions_in_the_last_3_years;
		enable Boat.Has_the_principal_operator_had_their_driver_s_license_suspended;
		enable Boat.How_many_motor_vehicle_claims;
		enable Boat.How_many_motor_vehicle_convictions;
		enable Boat.When;
		enable Boat.First_Name;
		enable Boat.Last_Name;
		enable Boat.Lengths;
		enable Boat.Serial1;
		enable Boat.Hull_Type;
		enable Boat.Hull_ID_Serial;
		enable Boat.Other_Hull_Type;
		enable Boat.Estimated_max_speed;
		enable Boat.Types;
		enable Boat.Enter_the_type;
		enable Boat.Fuel_Type;
		enable Boat.Model_Year;
		enable Boat.Manufacturer;
		enable Boat.Serial;
		enable Boat.Horsepower;
		enable Boat.Types1;
		enable Boat.Enter_the_type1;
		enable Boat.Fuel_Type1;
		enable Boat.Model_Year1;
		enable Boat.Manufacturer1;
		enable Boat.Serial1;
		enable Boat.Horsepower1;
		enable Boat.Trailer_Model_Year;
		enable Boat.Trailer_Manufacturer;
		enable Boat.Trailer_Length;
		enable Boat.Tender_Model_Year;
		enable Boat.Tender_Manufacturer;
		enable Boat.Tender_Serial;
		enable Boat.Trailer_Serial;
		enable Boat.Tender_Length;
		enable Boat.Aux_Engine_Manufacturer;
		enable Boat.Auxiliary_Engine_Serial;
		enable Boat.Aux_Engine_HP_Thrust;
		enable Boat.Lein_holder;
		enable Boat.Address_line1;
		enable Boat.Address_line2;
		enable Boat.Province;
		enable Boat.City;
		enable Boat.Country;
		enable Boat.Province;
		//	enable Fee ;
		//----------Payment-------------------
		enable Payment_Date;
		enable Bind_Date;
		enable Last_Modified;
		//---------Adjusted Premium-----------------
		enable Reason_For_Rejection1;
		//-----------------------New Premium----------------------
		//enable New_Admin_Fee;
		//-----------------------Additional Information----------------------
		enable Effective_Date;
		enable Confirmed_Client;
		enable Update_Email;
		enable Update_Phone;
		enable Confirmed_Email_Phone;
		enable X_Sell;
		enable Highlights_and_Comments;
		disable Spoke_With;
	}
	hide returnPremium;
	/*
	Ranjith M
	This below snippet is created on 08/03/2024
	*/
	input.Prorate_From = zoho.currentdate;
	disable Admin_Fee;
	// disable the fields
	disable Outstanding;
	disable Prorated;
	hide Admin_Changes;
	// hide or unhide the Additional Names Subform
	if(input.Are_there_any_additional_names_on_the_boat_ownership == "No" || input.Are_there_any_additional_names_on_the_boat_ownership == "" || input.Are_there_any_additional_names_on_the_boat_ownership == null)
	{
		hide Additional_Names;
	}
	else
	{
		show Additional_Names;
	}
	fetchBoat = BoatQuote[ID == input.Select_Policy];
	clear Additional_Names;
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
	