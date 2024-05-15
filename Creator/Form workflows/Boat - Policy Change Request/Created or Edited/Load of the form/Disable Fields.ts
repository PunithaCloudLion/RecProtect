//hide Boat.Underwritting_Approved;
hide Boat.Old_Data_of_Trailer_Tender_Aux;
hide Quote_Status;
hide Policy_Status;
hide Policy_AutoRenewal_Status;
hide Deal_Type;
hide Referral_Reason;
hide Payment_Transaction_Status;
disable Quote_Record_ID_Server;
disable Organization_ID_Server;
disable Policy_Status;
disable Policy_AutoRenewal_Status;
disable Carrier;
disable Policy_Change_ID;
hide Payment_Link_URL;
hide Policy_Change_ID;
hide Payment_ID;
hide Reason_For_Rejection1;
// disable the Payment Information 
disable Enter_payment_info;
disable Policy_Number;
disable Payment_Date;
disable Nuvei_Transaction_ID;
disable Payment_Status;
disable Policy_UPO_Data;
disable OutStanding_Type;
disable New_Admin_Fee;
//disable Select_Charge_Type;
hide Boat.Boat_Model_Age;
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
hide Boat.Referral_Main_engine;
hide Boat.Referral_Length;
hide Boat.Referral_Trailer_Length;
hide Boat.Referral_Do_any_of_the_above_statements_apply_to_the_watercraft;
hide Boat.Referral_Do_any_of_the_above_statements_apply_to_the_watercraft1;
hide Boat.Referral_Do_any_of_the_above_apply_to_the_watercraft;
hide Boat.Referral_Do_any_of_the_above_apply_to_the_Applicant;
hide Boat.Referral_Reason;
hide Boat.Referral_Main_engine_2;
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
disable Boat.Referral_Main_engine;
disable Boat.Referral_Length;
disable Boat.Referral_Trailer_Length;
disable Boat.Referral_Do_any_of_the_above_statements_apply_to_the_watercraft;
disable Boat.Referral_Do_any_of_the_above_statements_apply_to_the_watercraft1;
disable Boat.Referral_Do_any_of_the_above_apply_to_the_watercraft;
disable Boat.Referral_Do_any_of_the_above_apply_to_the_Applicant;
disable Boat.Referral_Reason;
hide Boat.Eligible_for_Auto_Renewal;
hide Boat.Is_auto_approved_for_next_5_years;
hide Boat.Approved_Year;
hide Boat.Boat_Status;
hide Boat.Opt_In_for_RCV;
hide Boat.Renewal_Information;
hide Boat.Override_Boat_for_being_more_than_15_years_old;
disable Payment_URL;
hide Enter_payment_info;
hide Nuvei_Transaction_ID;
hide Policy_UPO_Data;
hide Additional_Names.Boats;
if(input.Select_Charge_Type == "Auto Charge/Refund")
{
	hide Payment_URL;
	//input.Payment_Status = "Paid";
}
else
{
	show Payment_URL;
	//	input.Payment_Status = "Unpaid";
}
