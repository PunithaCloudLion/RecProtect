/*--------code added by nambi ----
code for enable all subform fields when adding new row
*/
if(input.Select_Type == "Premium Generating")
	{
		if(input.Policy_Reason_Code.contains("Add boat") == true)
		{
			//------------boat details--------------
			enable row.Select_the_type_of_watercraft;
			enable row.Boat_Model_Year;
			enable row.Override_Boat_for_being_more_than_15_years_old;
			enable row.Boat_Manufacturer;
			enable row.Boat_Model;
			enable row.Replacement_Cost;
			enable row.RCV_Exceeding_Limits_UW_Approved;
			enable row.Actual_Cash_Value;
			enable row.ACV_Exceeding_Limits_UW_Approved;
			//--------principal operator
			enable row.Is_the_Principal_Operator_the_same_as_the_Applicant_Owner;
			enable row.First_Name;
			enable row.Last_Name;
			enable row.Date_of_Birth;
			enable row.Principal_operator_s_years_of_boating_experience_with_vessels_of_a_similar_size_and_type;
			enable row.Does_the_operator_hold_a_Pleasure_Craft_Operator_s_Card_PCOC;
			//-----------Quote &coverages
			enable row.Select_coverage_for_policy;
			enable row.Personal_Effects_Coverage;
			enable row.Deductible;
			enable row.Navigational_Equipment_Coverage;
			enable row.Recalculate;
			//-----------premium
			enable row.Show_Premium_Breakdown;
			enable row.Boat_Base_Premium;
			enable row.Boat_operator_gt_25_lt_3years_exp_prem;
			enable row.Boat_age_gt_15_prem;
			enable row.Navi_eqip_prem;
			enable row.Endorsement_prem;
			enable row.Boat_Liability_Prem;
			enable row.Boat_Operator_age_20_25_prem;
			enable row.Deductible_Prem;
			enable row.Pers_eff_prem;
			enable row.Total_Prem;
			//----------eligility---
			enable row.Does_the_operator_hold_a_Pleasure_Craft_Operator_s_Card_PCOC;
			enable row.Do_any_of_the_above_statements_apply_to_the_watercraft_Atlantic_Pacific;
			enable row.Do_any_of_the_above_statements_apply_to_the_watercraft_engine_Parasailing_propane;
			enable row.Do_any_of_the_above_apply_to_the_watercraft_safety_requirements;
			enable row.Do_any_of_the_above_apply_to_the_applicant_Owner_primary_residence;
			enable row.Has_the_principal_operator_had_any_motor_vehicle_claims_in_the_last_5_years;
			enable row.Has_the_principal_operator_had_any_motor_vehicle_convictions_in_the_last_3_years;
			enable row.Has_the_principal_operator_had_their_driver_s_license_suspended;
			enable row.Admin_Override;
			enable row.PO_admin_3year_Override;
			enable row.PO_admin_License_Override;
			enable row.How_many_motor_vehicle_claims;
			enable row.How_many_motor_vehicle_convictions;
			enable row.When;
			//------boat specs----
			enable row.Lengths;
			enable row.Hull_ID_Serial;
			enable row.Hull_Type;
			enable row.Other_Hull_Type;
			enable row.Estimated_max_speed;
			//--------Main engine-----
			enable row.Types;
			enable row.Enter_the_type;
			enable row.Fuel_Type;
			enable row.Model_Year;
			enable row.Manufacturer;
			enable row.Serial;
			enable row.Horsepower;
			//--------------Main engine 2
			enable row.Types1;
			enable row.Enter_the_type1;
			enable row.Fuel_Type1;
			enable row.Model_Year1;
			enable row.Manufacturer1;
			enable row.Serial1;
			enable row.Horsepower1;
			//--------addons
			enable row.Add_a_trailer;
			enable row.Trailer_Serial;
			enable row.Trailer_Length;
			enable row.Trailer_Value;
			enable row.Trailer_Model_Year;
			enable row.Trailer_Manufacturer;
			enable row.Trailer_VIN;
			enable row.Add_a_tender;
			enable row.Tender_Serial;
			enable row.Tender_Value;
			enable row.Tender_Model_Year;
			enable row.Tender_Manufacturer;
			enable row.Tender_Length;
			enable row.Add_an_auxiliary_motor;
			enable row.Aux_Engine_Value;
			enable row.Aux_Engine_Model_Year;
			enable row.Aux_Engine_Manufacturer;
			enable row.Auxiliary_Engine_Serial;
			enable row.Aux_Engine_HP_Thrust;
			//-----Lein holder------------
			enable row.Is_this_boat_financed;
			enable row.Name_of_Financier;
			enable row.Address_line1;
			enable row.Address_line2;
			enable row.City;
			enable row.Country;
			enable row.Province;
			enable row.Postal_Code;
		}
	}
	