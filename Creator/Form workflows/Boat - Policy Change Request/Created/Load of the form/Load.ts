disable Select_Type;
hide Recalculate_the_Premium;
hide Sales_Date;
hide Bind_Date;
hide Boat.Name_of_Financier;
hide Signature1;
if(input.Select_Type == "" || input.Select_Type == null)
{
	hide Basic_Info;
	hide Customer_Information;
	hide Additional_Names;
	hide General;
	hide Boat;
	hide Policy_Details;
	hide Signature1;
	hide Terms;
	hide Payment;
	hide Mailing_Address;
	hide Unused_Fields;
	hide Adjusted_Premium;
	hide Other_Information;
	hide Additional_Information;
	hide Document_Generation_Section;
	hide new_premiums;
	hide Developer_Section;
	hide Admin_Changes;
	hide Premium;
	hide Tax_Exemption;
	hide Recalculate_the_Premium;
	hide Change_Outstanding_Details;
	//	hide Referral_Section;
}
else
{
	show Change_Outstanding_Details;
	show Recalculate_the_Premium;
	// newly added changes
	hide Customer_ID;
	hide Insured_Middle_Name;
	hide Additional_Names.Customer_ID;
	hide Boat.Main_Engine2;
	hide Boat.Types1;
	hide Boat.Enter_the_type1;
	hide Boat.Fuel_Type1;
	hide Boat.Model_Year1;
	hide Boat.Manufacturer1;
	hide Boat.Serial1;
	hide Boat.Horsepower1;
	hide Boat.Override_Boat_for_being_more_than_15_years_old;
	hide Boat.RCV_Exceeding_Limits_UW_Approved;
	hide Boat.ACV_Exceeding_Limits_UW_Approved;
	//
	show Additional_Names;
	hide Name;
	hide Name_of_Dealership;
	hide Name_of_Campground;
	hide Name_of_Marina;
	hide Tell_us_more;
	//	disable Boat.Select_coverage_for_policy;
	// hide Where_Did_You_Find_Us;
	//hide Additional_Names.Customer_ID;
	// hide Boat1;
	hide Boat.How_many_motor_vehicle_claims;
	hide Boat.How_many_motor_vehicle_convictions;
	hide Boat.When;
	hide Boat.Trailer_Value;
	hide Boat.Trailer_Length;
	hide Boat.Trailer_Manufacturer;
	hide Boat.Trailer_Model_Year;
	hide Boat.Trailer_VIN;
	hide Boat.Tender_Value;
	hide Boat.Tender_Model_Year;
	hide Boat.Tender_Serial;
	hide Boat.Tender_Manufacturer;
	hide Boat.Tender_Length;
	hide Boat.Aux_Engine_Model_Year;
	hide Boat.Aux_Engine_HP_Thrust;
	hide Boat.Aux_Engine_Value;
	hide Boat.Auxiliary_Engine_Serial;
	hide Boat.Aux_Engine_Manufacturer;
	hide Boat.Other_Hull_Type;
	hide Boat.Enter_the_type;
	hide Boat.Enter_the_type1;
	hide Boat.Replacement_Cost;
	hide Unused_Fields;
	hide Developer_Section;
	disable Quote_ID;
	//-----------------------
	input.Deal_Type = "Quote";
	//---------------------
	show Basic_Info;
	show Customer_Information;
	show Additional_Names;
	show General;
	show Boat;
	show Policy_Details;
	show Signature1;
	//	hide Referral_Section;
	show Terms;
	show Premium;
	show Payment;
	show new_premiums;
	show Mailing_Address;
	show Adjusted_Premium;
	show Other_Information;
	hide new_premiums;
	show Additional_Information;
	// 	hide Overriden_Tax;
	hide Override_Tax;
	hide Boat.Boat_Migration_ID;
	hide Boat.Migrated;
	hide Boat.Eligible_for_Auto_Renewal;
	hide Boat.Underwritting_Approved;
	hide Boat.Is_auto_approved_for_next_5_years;
	hide Boat.Approved_Year;
	hide Boat.Boat_Status;
	hide Boat.Opt_In_for_RCV;
	input.Link_Customer = false;
	disable Boat.Boat_Coverage;
	disable Boat.Salvage;
	disable Boat.Liability_coverage;
	disable Boat.Emergency_Towing_Limit;
	disable Boat.Loss_of_Use_Limit;
	disable Boat.Pollution;
	disable Boat.Removal_of_Wreckage;
	disable Boat.Premium_Per_Year;
	disable Boat.Uninsured_Underinsured_Boater_Endorsement;
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
	disable Tax_Province;
	disable Total_Premium_before_tax;
	disable Total_Tax;
	disable Tax_Precent;
	disable Total_Payable_Premium_after_tax;
	// if ( input <opr> <expression> ) 
	// {
	// }
	disable Bind_Date;
	disable Sales_Date;
	disable Expiry_Date;
	disable Signature;
	disable Agree_to_terms_and_conditions;
	disable Policy_Number;
	disable Deal_Type;
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
			if(boatsub.Has_the_principal_operator_had_any_motor_vehicle_claims_in_the_last_5_years == "No")
			{
				hide Boat.When;
			}
			else
			{
				show Boat.When;
			}
			if(boatsub.Has_the_principal_operator_had_any_motor_vehicle_convictions_in_the_last_3_years == "No")
			{
				hide Boat.How_many_motor_vehicle_convictions;
			}
			else
			{
				show Boat.How_many_motor_vehicle_convictions;
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
if(input.Select_Charge_Type == "Send Payment/Deposit link")
{
	show Generate_Payment_Link;
}
else
{
	hide Generate_Payment_Link;
}
hide plain3;
//
input.Spoke_With = zoho.loginuser;
//hide renewal Information in boat subform
hide Boat.Eligible_for_Auto_Renewal;
hide Boat.Is_auto_approved_for_next_5_years;
hide Boat.Approved_Year;
hide Boat.Boat_Status;
hide Boat.Opt_In_for_RCV;
hide Boat.Renewal_Information;
hide Payment;
