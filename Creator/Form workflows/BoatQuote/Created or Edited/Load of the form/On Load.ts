//hide Overriden_Tax;
hide Quote_Status;
hide Policy_Status;
hide Policy_AutoRenewal_Status;
hide Deal_Type;
hide Referral_Reason;
hide Organization_ID_Server;
input.Save_as_Draft = false;
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
disable Fee;
hide Adjusted_Premium;
hide Sales_Date;
hide Bind_Date;
hide Boat.Name_of_Financier;
hide Signature1;
//new business
hide Unused_Fields;
//hide Customer_ID;
disable Customer_ID;
hide Insured_Middle_Name;
hide Additional_Names.Customer_ID;
hide Boat.Override_For_Age_15_Or_More;
hide Boat.Types1;
hide Boat.Enter_the_type1;
hide Boat.Fuel_Type1;
hide Boat.Model_Year1;
hide Boat.Manufacturer1;
hide Boat.Serial1;
hide Boat.Horsepower1;
hide Boat.Main_Engine2;
hide Boat.Hull_ID_Optional;
hide Boat.Trailer_Serial;
hide Boat.Boat_Model_Age;
disable Boat.Override_For_Age_15_Or_More;
// -- Premium breakdown Data section ---
disable Boat.Boat_Base_Premium;
disable Boat.Boat_Liability_Prem;
disable Boat.Boat_Operator_age_20_25_prem;
disable Boat.Boat_age_gt_15_prem;
disable Boat.Boat_operator_gt_25_lt_3years_exp_prem;
disable Boat.Deductible_Prem;
disable Boat.Navi_eqip_prem;
disable Boat.Pers_eff_prem;
disable Boat.Endorsement_prem;
disable Boat.Total_Prem;
// -- Premium breakdown Data section End ---
disable Boat.Admin_Override;
hide Boat.Admin_Override;
disable Boat.PO_admin_License_Override;
hide Boat.PO_admin_License_Override;
disable Boat.PO_admin_3year_Override;
hide Boat.PO_admin_3year_Override;
hide Boat.UnderWritting;
hide Boat.RCV_Exceeding_Limits_UW_Approved;
hide Boat.ACV_Exceeding_Limits_UW_Approved;
//
disable Quote_ID;
hide Section;
disable Sales_Date;
disable Bind_Date;
disable Quote_Status;
hide Document_Generation_Section;
hide Transaction_History;
hide Payment;
hide Missing_Fields;
hide Boat_Document_Information;
//hide Boat.UnderWritting ;
input.Source = "CREATOR";
disable Source;
hide Select_Rate;
//hide Premium;
hide Boat.Underwritting_Approved;
hide Admin_Changes;
//hide Referral_Section;
//hide Overriden_Tax;
hide Boat.Boat_Migration_ID;
hide Boat.Migrated;
hide Boat.Eligible_for_Auto_Renewal;
hide Boat.Underwritting_Approved;
hide Boat.Is_auto_approved_for_next_5_years;
hide Boat.Approved_Year;
hide Boat.Boat_Status;
hide Boat.Opt_In_for_RCV;
//input.Link_Customer = false;
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
disable Total_Tax;
disable Tax_Precent;
disable Total_Payable_Premium_after_tax;
hide Boat.Boat_Base_Premium;
hide Boat.Boat_Liability_Prem;
hide Boat.Boat_Operator_age_20_25_prem;
hide Boat.Boat_age_gt_15_prem;
hide Boat.Boat_operator_gt_25_lt_3years_exp_prem;
hide Boat.Deductible_Prem;
hide Boat.Navi_eqip_prem;
hide Boat.Pers_eff_prem;
hide Boat.Endorsement_prem;
hide Boat.Total_Prem;
// fetchState = State_and_Province[ID != null].State_Province.getAll();
// input.Please_select_the_province_your_boat_is_used_in:ui.add(fetchState); 
// if ( input <opr> <expression> ) 
// {
// }
disable Expiry_Date;
disable Signature;
//disable Agree_to_terms_and_conditions;
disable Policy_Number;
disable Deal_Type;
disable Last_Modified;
if(input.Boat != null)
{
	//	fetchLeinholders = Lein_holder_Details[ID != null].Name_of_Financier.getAll();
	//leinlist = fetchLeinholders;
	//row.Select_a_Financier:ui.add(fetchLeinholders);
	for each  boatsub in input.Boat
	{
		if(boatsub.Has_the_principal_operator_had_their_driver_s_license_suspended == "No")
		{
			hide Boat.How_many_motor_vehicle_claims;
		}
		else
		{
			show Boat.How_many_motor_vehicle_claims;
		}
		if(boatsub.Has_the_principal_operator_had_any_motor_vehicle_claims_in_the_last_5_years == "Yes")
		{
			hide Boat.Tell_us_more;
		}
		else
		{
			show Boat.Tell_us_more;
		}
		if(boatsub.Has_the_principal_operator_had_any_motor_vehicle_convictions_in_the_last_3_years == "No")
		{
			hide Boat.How_many_motor_vehicle_convictions;
		}
		else
		{
			show Boat.How_many_motor_vehicle_convictions;
		}
		if(input.Quote_Status == "Referral")
		{
			for each  boatSubform in input.Boat
			{
				show Boat.UnderWritting;
				show Boat.Underwritting_Approved;
			}
		}
		else
		{
			for each  boatSubform in input.Boat
			{
				hide Boat.UnderWritting;
				hide Boat.Underwritting_Approved;
			}
		}
		// 		if(boatsub.Select_a_Financier != null && boatsub.Select_a_Financier != "")
		// 		{
		// 			lienlist = boatsub.Select_a_Financier;
		// 		}
		// 		else
		// 		{
		// 		}
		// 		input.Boat.Select_a_Financier = lienlist;
		// 		Boat.Select_a_Financier:ui.add(fetchLeinholders);
		if(boatsub.Is_this_boat_financed == "Yes")
		{
			show Boat.Lein_holder;
			show Boat.Name_of_Financier;
			show Boat.Address_line1;
			show Boat.Address_line2;
			show Boat.Postal_Code;
			show Boat.City;
			show Boat.Province;
			show Boat.Country;
			show Boat.Suite_Unit_Number;
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
			hide Boat.Suite_Unit_Number;
		}
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
	hide Boat.Suite_Unit_Number;
}
if(input.Quote_Status == "Referral")
{
	show Boat.Underwritting_Approved;
}
else
{
	hide Boat.Underwritting_Approved;
}
hide Migration_Section;
//input.Email_Validation = true;
disable Quote_Record_ID_Server;
disable Organization_ID_Server;
disable Policy_Status;
disable Policy_AutoRenewal_Status;
disable Carrier;
//----------------Hide Subform Referal Reason------
hide Boat.Referral_Replacement_cost;
hide Boat.Referral_Status;
hide Boat.Referral_Principal_operator_20_years;
hide Boat.Referral_Has_the_principal_operator_had_their_driver_s_license_suspended;
hide Boat.Referral_Actual_Cash_Value;
hide Boat.Referral_Boat_Model_Year;
hide Boat.Referral_Principal_Operator;
hide Boat.Referral_Does_the_operator_hold_a_Pleasure_Craft_Operator_Card_PCOC;
hide Boat.Referral_Watercraft_Type;
hide Boat.Referral_How_many_motor_vehicle_claims;
hide Boat.Referral_How_many_motor_vehicle_Convictions;
hide Boat.Referral_Hull_Type;
hide Boat.Referral_Tender_lenght;
hide Boat.Referral_Main_Engine;
hide Boat.Referral_Length;
hide Boat.Referral_Trailer_Length;
hide Boat.Referral_Do_any_of_the_above_statements_apply_to_the_watercraft;
hide Boat.Referral_Do_any_of_the_above_statements_apply_to_the_watercraft1;
hide Boat.Referral_Do_any_of_the_above_apply_to_the_watercraft;
hide Boat.Referral_Do_any_of_the_above_apply_to_the_Applicant;
hide Boat.Referral_Reason;
hide Boat.Referral_Main_Engine_2;
disable Boat.Referral_Replacement_cost;
disable Boat.Referral_Status;
disable Boat.Referral_Principal_operator_20_years;
disable Boat.Referral_Has_the_principal_operator_had_their_driver_s_license_suspended;
disable Boat.Referral_Actual_Cash_Value;
disable Boat.Referral_Boat_Model_Year;
disable Boat.Referral_Principal_Operator;
disable Boat.Referral_Does_the_operator_hold_a_Pleasure_Craft_Operator_Card_PCOC;
disable Boat.Referral_Watercraft_Type;
disable Boat.Referral_How_many_motor_vehicle_claims;
disable Boat.Referral_How_many_motor_vehicle_Convictions;
disable Boat.Referral_Hull_Type;
disable Boat.Referral_Tender_lenght;
disable Boat.Referral_Main_Engine;
disable Boat.Referral_Length;
disable Boat.Referral_Trailer_Length;
disable Boat.Referral_Do_any_of_the_above_statements_apply_to_the_watercraft;
disable Boat.Referral_Do_any_of_the_above_statements_apply_to_the_watercraft1;
disable Boat.Referral_Do_any_of_the_above_apply_to_the_watercraft;
disable Boat.Referral_Do_any_of_the_above_apply_to_the_Applicant;
disable Boat.Referral_Reason;
//
hide Boat.Eligible_for_Auto_Renewal;
hide Boat.Is_auto_approved_for_next_5_years;
hide Boat.Approved_Year;
hide Boat.Boat_Status;
hide Boat.Policy_Coverage_Type;
hide Boat.Opt_In_for_RCV;
hide Boat.UW_Status;
disable Created_Source;
hide Nuvei_Transaction_ID;
hide Policy_UPO_Data;
hide Additional_Names.Server_Customer_ID;
hide Business_Source;
hide Created_Source;
hide Source;
disable Referral_Reason;
hide Other_Information;
