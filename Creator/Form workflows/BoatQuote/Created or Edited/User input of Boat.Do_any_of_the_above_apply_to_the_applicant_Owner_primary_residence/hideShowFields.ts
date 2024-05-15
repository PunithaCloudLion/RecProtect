if(row.Do_any_of_the_above_apply_to_the_applicant_Owner_primary_residence == "Yes")
	{
		alert "This choice triggers a referral.";
		row.Referral_Do_any_of_the_above_apply_to_the_Applicant=true;
		//--------referal section -------
		// 	show row.Referral_Replacement_cost;
		// 	show row.Referral_Status;
		// 	show row.Referral_Principal_operator_20_years;
		// 	show row.Referral_Has_the_principal_operator_had_their_driver_s_license_suspended;
		// 	show row.Referral_Actual_Cash_Value;
		// 	show row.Referral_Boat_Model_Year;
		// 	show row.Referral_Principal_Operator;
		// 	show row.Referral_Does_the_operator_hold_a_Pleasure_Craft_Operator_Card_PCOC;
		// 	show row.Referral_Watercraft_Type;
		// 	show row.Referral_How_many_motor_vehicle_claims;
		// 	show row.Referral_How_many_motor_vehicle_Convictions;
		// 	show row.Referral_Hull_Type;
		// 	show row.Referral_Tender_lenght;
		// 	show row.Referral_Vessel;
		// 	show row.Referral_Length;
		// 	show row.Referral_Trailer_Length;
		// 	show row.Referral_Do_any_of_the_above_statements_apply_to_the_watercraft;
		// 	show row.Referral_Do_any_of_the_above_statements_apply_to_the_watercraft1;
		// 	show row.Referral_Do_any_of_the_above_apply_to_the_watercraft;
		// 	show row.Referral_Do_any_of_the_above_apply_to_the_Applicant;
		// 	show row.Referral_Reason;
	}
	else
	{
		row.Referral_Do_any_of_the_above_apply_to_the_Applicant=false;
		//----------referral section ----------
		// 	hide row.Referral_Replacement_cost;
		// 	hide row.Referral_Status;
		// 	hide row.Referral_Principal_operator_20_years;
		// 	hide row.Referral_Has_the_principal_operator_had_their_driver_s_license_suspended;
		// 	hide row.Referral_Actual_Cash_Value;
		// 	hide row.Referral_Boat_Model_Year;
		// 	hide row.Referral_Principal_Operator;
		// 	hide row.Referral_Does_the_operator_hold_a_Pleasure_Craft_Operator_Card_PCOC;
		// 	hide row.Referral_Watercraft_Type;
		// 	hide row.Referral_How_many_motor_vehicle_claims;
		// 	hide row.Referral_How_many_motor_vehicle_Convictions;
		// 	hide row.Referral_Hull_Type;
		// 	hide row.Referral_Tender_lenght;
		// 	hide row.Referral_Vessel;
		// 	hide row.Referral_Length;
		// 	hide row.Referral_Trailer_Length;
		// 	hide row.Referral_Do_any_of_the_above_statements_apply_to_the_watercraft;
		// 	hide row.Referral_Do_any_of_the_above_statements_apply_to_the_watercraft1;
		// 	hide row.Referral_Do_any_of_the_above_apply_to_the_watercraft;
		// 	hide row.Referral_Do_any_of_the_above_apply_to_the_Applicant;
		// 	hide row.Referral_Reason;
	}
	