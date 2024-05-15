input.Source = "CREATOR";
if(input.Source == "CREATOR")
{
	if(input.Boat != null)
	{
		for each  rec in input.Boat
		{
			//-------1. Referral - Watercraft Type-----------				
			if(rec.Select_the_type_of_watercraft == "I'm not too sure")
			{
				rec.Referral_Watercraft_Type=true;
			}
			//-----------2. Referral - Boat Model Year--------------	
			if(rec.Boat_Model_Year != null)
			{
				currentYear = zoho.currentdate.getYear();
				yearsBetween = currentYear - rec.Boat_Model_Year.toLong();
				if(yearsBetween > 15)
				{
					rec.Referral_Boat_Model_Year=true;
					// ----- Added by Vignesh on 07/05/2024 -- For override case
					if(rec.Override_For_Age_15_Or_More == true)
					{
						rec.Referral_Boat_Model_Year=false;
					}
				}
				else
				{
					rec.Referral_Boat_Model_Year=false;
					rec.Override_For_Age_15_Or_More=null;
				}
			}
			// ---- Added By Vignesh - 07/05/2024 - For Over Ride Functions---
			// ---- 3. Referral - Replacement Cost ---
			if(rec.Select_coverage_for_policy == "Current Market Value Coverage")
			{
				rec.Referral_Actual_Cash_Value=true;
				if(rec.Actual_Cash_Value < 10000 || rec.Actual_Cash_Value > 350000)
				{
					if(rec.ACV_Exceeding_Limits_UW_Approved == true)
					{
						rec.Referral_Actual_Cash_Value=false;
					}
				}
				else
				{
					rec.Referral_Actual_Cash_Value=false;
				}
			}
			// ---- 4. Referral - Actual Cost ----
			if(rec.Select_coverage_for_policy == "Replacement Value Coverage")
			{
				rec.Referral_Replacement_cost=true;
				if(rec.Replacement_Cost < 10000 || rec.Replacement_Cost > 350000)
				{
					if(rec.RCV_Exceeding_Limits_UW_Approved == true)
					{
						rec.Referral_Replacement_cost=false;
					}
				}
				else
				{
					rec.Referral_Replacement_cost=false;
				}
			}
			//----------5. Referral - Principal operator 20 years--------------	
			if(rec.Date_of_Birth != null)
			{
				currentYear = zoho.currentdate.getYear();
				yearsBetween = currentYear - rec.Date_of_Birth.getYear();
				rec.Referral_Principal_operator_20_years=false;
				if(yearsBetween < 20)
				{
					rec.Referral_Principal_operator_20_years=true;
				}
				//----------6. Referral - Principal Operator--------------		
				rec.Referral_Principal_Operator=false;
				if(rec.Principal_operator_s_years_of_boating_experience_with_vessels_of_a_similar_size_and_type == "0-3 Years")
				{
					if(yearsBetween < 25)
					{
						rec.Referral_Principal_Operator=true;
					}
				}
			}
			//--------- 7. Referral - Does the operator hold a Pleasure Craft Operator Card PCOC-------------	
			rec.Referral_Does_the_operator_hold_a_Pleasure_Craft_Operator_Card_PCOC=false;
			if(rec.Does_the_operator_hold_a_Pleasure_Craft_Operator_s_Card_PCOC == "No")
			{
				rec.Referral_Does_the_operator_hold_a_Pleasure_Craft_Operator_Card_PCOC=true;
			}
			//----------------8. Referral - Do any of the above statements apply to the watercraft----------------
			rec.Referral_Do_any_of_the_above_statements_apply_to_the_watercraft=false;
			if(rec.Do_any_of_the_above_statements_apply_to_the_watercraft_Atlantic_Pacific == "Yes")
			{
				rec.Referral_Do_any_of_the_above_statements_apply_to_the_watercraft=true;
			}
			//----------------9. Referral - Do any of the above statements apply to the watercraft1----------------
			rec.Referral_Do_any_of_the_above_statements_apply_to_the_watercraft1=false;
			if(rec.Do_any_of_the_above_statements_apply_to_the_watercraft_engine_Parasailing_propane == "Yes")
			{
				rec.Referral_Do_any_of_the_above_statements_apply_to_the_watercraft1=true;
			}
			//----------------10. Referral - Do any of the above apply to the watercraft---------------
			rec.Referral_Do_any_of_the_above_apply_to_the_watercraft=false;
			if(rec.Do_any_of_the_above_apply_to_the_watercraft_safety_requirements == "No")
			{
				rec.Referral_Do_any_of_the_above_apply_to_the_watercraft=true;
			}
			//---------------11. Referral - Do any of the above apply to the Applicant--------------
			rec.Referral_Do_any_of_the_above_apply_to_the_Applicant=false;
			if(rec.Do_any_of_the_above_apply_to_the_applicant_Owner_primary_residence == "Yes")
			{
				rec.Referral_Do_any_of_the_above_apply_to_the_Applicant=true;
			}
			//------ 12. Referral -  How many motor vehicle claims----------	
			rec.Referral_How_many_motor_vehicle_claims=false;
			if(rec.Has_the_principal_operator_had_any_motor_vehicle_claims_in_the_last_5_years == "Yes")
			{
				if(rec.How_many_motor_vehicle_claims != null && rec.How_many_motor_vehicle_claims != "")
				{
					if(rec.How_many_motor_vehicle_claims.toNumber() > 1)
					{
						rec.Referral_How_many_motor_vehicle_claims=true;
					}
				}
			}
			//------13. Referral -  How many motor vehicle Convictions--------		
			rec.Referral_How_many_motor_vehicle_Convictions=false;
			if(rec.Has_the_principal_operator_had_any_motor_vehicle_convictions_in_the_last_3_years == "Yes")
			{
				if(rec.How_many_motor_vehicle_convictions != null && rec.How_many_motor_vehicle_convictions != "")
				{
					if(rec.How_many_motor_vehicle_convictions.toNumber() > 1)
					{
						rec.Referral_How_many_motor_vehicle_Convictions=true;
					}
				}
			}
			//------14. Referral - Has the principal operator had their driver's license suspended?--------	
			rec.Referral_Has_the_principal_operator_had_their_driver_s_license_suspended=false;
			if(rec.Has_the_principal_operator_had_their_driver_s_license_suspended == "Yes")
			{
				rec.Referral_Has_the_principal_operator_had_their_driver_s_license_suspended=true;
			}
			//------------------15. Referral - Length--------------------
			rec.Referral_Length=false;
			if(rec.Lengths > 40)
			{
				rec.Referral_Length=true;
			}
			//------ 16. Referral - Hull Type--------	
			rec.Referral_Hull_Type=false;
			if(rec.Hull_Type == "Other")
			{
				rec.Referral_Hull_Type=true;
			}
			//----------------17. Referral - Main Engine 1 -------------------
			rec.Referral_Main_Engine=false;
			if(rec.Horsepower > 460 || rec.Estimated_max_speed > 55)
			{
				if(rec.Types == "Inboard" || rec.Types == "In/Outboard" || rec.Types == "Jet drive")
				{
					rec.Referral_Main_Engine=true;
				}
			}
			//----------------18. Referral - Main Engine 1-------------------
			if(rec.Types == "Outboard")
			{
				if(rec.Horsepower > 250 || rec.Estimated_max_speed > 55)
				{
					rec.Referral_Main_Engine=true;
				}
			}
			//----------------19. Referral - Main Engine 2 -------------------
			rec.Referral_Main_Engine_2=false;
			if(rec.Horsepower1 > 460 || rec.Estimated_max_speed > 55)
			{
				if(rec.Types1 == "Inboard" || rec.Types1 == "In/Outboard" || rec.Types1 == "Jet drive")
				{
					rec.Referral_Main_Engine_2=true;
				}
			}
			//----------------20. Referral - Main Engine 2-------------------
			if(rec.Types1 == "Outboard")
			{
				if(rec.Horsepower1 > 250 || rec.Estimated_max_speed > 55)
				{
					rec.Referral_Main_Engine_2=true;
				}
			}
			//-------------------21. Referral - Tender lenght----------------------	
			rec.Referral_Tender_lenght=false;
			if(rec.Tender_Length > 40)
			{
				rec.Referral_Tender_lenght=true;
			}
			//-------------------22. Referral - How many Vehicle Condtions lenght----------------------	
			rec.Referral_How_many_motor_vehicle_Convictions=false;
			if(rec.How_many_motor_vehicle_convictions != null)
			{
				if(rec.How_many_motor_vehicle_convictions.toNumber() > 1)
				{
					if(rec.PO_admin_3year_Override != "Yes")
					{
						rec.Referral_How_many_motor_vehicle_Convictions=true;
					}
				}
			}
			//-------------------23. Referral - How many Vehicle 5 years lenght----------------------	
			rec.Referral_How_many_motor_vehicle_claims=false;
			if(rec.How_many_motor_vehicle_claims != null)
			{
				if(rec.How_many_motor_vehicle_claims.toNumber() > 1)
				{
					if(rec.Admin_Override != "Yes")
					{
						rec.Referral_How_many_motor_vehicle_claims=true;
					}
				}
			}
			//-------------------24. Referral - Admin Licence Override -------------------	
			rec.Referral_Has_the_principal_operator_had_their_driver_s_license_suspended=false;
			if(rec.Has_the_principal_operator_had_their_driver_s_license_suspended == "Yes")
			{
				if(rec.PO_admin_License_Override == "Yes")
				{
					rec.Referral_Has_the_principal_operator_had_their_driver_s_license_suspended=true;
				}
			}
			// --- Commnet By Vignesh on -- 07/05/24 ---- Add this in above -----
			// 			rec.Referral_Boat_Model_Year=true;
			// 			// // 			Added By SIVA - 06/05/2024
			// 			if(rec.Override_For_Age_15_Or_More == true)
			// 			{
			// 				rec.Referral_Boat_Model_Year=false;
			// 			}
		}
	}
}
