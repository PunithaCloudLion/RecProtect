if(row.Add_a_tender == "Yes")
	{
		show row.Tender_Value;
		show row.Tender_Model_Year;
		show row.Tender_Serial;
		show row.Tender_Manufacturer;
		show row.Tender_Length;
	}
	else
	{
		row.Referral_Tender_lenght=false;
		hide row.Tender_Value;
		hide row.Tender_Model_Year;
		hide row.Tender_Serial;
		hide row.Tender_Manufacturer;
		hide row.Tender_Length;
		row.Tender_Value="";
		row.Tender_Model_Year=null;
		row.Tender_Serial="";
		row.Tender_Manufacturer="";
		row.Tender_Length="";
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
	