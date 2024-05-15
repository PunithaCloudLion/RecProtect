// Add a tender
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
		hide row.Tender_Value;
		hide row.Tender_Model_Year;
		hide row.Tender_Serial;
		hide row.Tender_Manufacturer;
		hide row.Tender_Length;
	}
	//---------------End---------------
	//Add a auxiliary motor
	if(row.Add_an_auxiliary_motor == "Yes")
	{
		show row.Aux_Engine_Model_Year;
		show row.Aux_Engine_HP_Thrust;
		show row.Aux_Engine_Value;
		show row.Auxiliary_Engine_Serial;
		show row.Aux_Engine_Manufacturer;
	}
	else
	{
		hide row.Aux_Engine_Model_Year;
		hide row.Aux_Engine_HP_Thrust;
		hide row.Aux_Engine_Value;
		hide row.Auxiliary_Engine_Serial;
		hide row.Aux_Engine_Manufacturer;
	}
	//---------------End---------------
	//Add a trailer
	if(row.Add_a_trailer == "Yes")
	{
		show row.Trailer_Value;
		show row.Trailer_Length;
		show row.Trailer_Manufacturer;
		show row.Trailer_Model_Year;
		show row.Trailer_VIN;
	}
	else
	{
		hide row.Trailer_Value;
		hide row.Trailer_Length;
		hide row.Trailer_Manufacturer;
		hide row.Trailer_Model_Year;
		hide row.Trailer_VIN;
	}
	//---------------End---------------
	//Boat model year
	if(row.Boat_Model_Year != null)
	{
		populateValue = row.Select_coverage_for_policy;
		currentYear = zoho.currentdate.getYear();
		yearsBetween = currentYear - row.Boat_Model_Year.toLong();
		if(yearsBetween > 15)
		{
			hide row.Replacement_Cost;
			enable row.Override_Boat_for_being_more_than_15_years_old;
			show row.Override_Boat_for_being_more_than_15_years_old;
			enable row.Boat_Coverage;
			enable row.Salvage;
			rowalue = {"Current Market Value Coverage"};
			row.Select_coverage_for_policy:ui.add(rowalue);
			row.Select_coverage_for_policy=populateValue;
			//	disable row.Select_coverage_for_policy;
		}
		else
		{
			show row.Replacement_Cost;
			disable row.Override_Boat_for_being_more_than_15_years_old;
			hide row.Override_Boat_for_being_more_than_15_years_old;
			if(row.Replacement_Cost == null)
			{
				info yearsBetween;
				enable row.Boat_Coverage;
				enable row.Salvage;
				rowalue = {"Current Market Value Coverage"};
				row.Select_coverage_for_policy:ui.add(rowalue);
				row.Select_coverage_for_policy=populateValue;
				//	enable row.Select_coverage_for_policy;
			}
			else
			{
				show row.Replacement_Cost;
				rowalue = {"Current Market Value Coverage","Replacement Value Coverage"};
				row.Select_coverage_for_policy:ui.add(rowalue);
				row.Select_coverage_for_policy=populateValue;
			}
		}
	}
	else
	{
		hide row.Replacement_Cost;
		enable row.Select_coverage_for_policy;
		enable row.Boat_Coverage;
		enable row.Salvage;
		hide row.Override_Boat_for_being_more_than_15_years_old;
		rowalue = {"Current Market Value Coverage","Replacement Value Coverage"};
		row.Select_coverage_for_policy:ui.add(rowalue);
		row.Select_coverage_for_policy=populateValue;
	}
	//---------------End---------------
	//Has_the_principal_operator_had_any_motor_vehicle_claims_in_the_last_5_years
	if(row.Has_the_principal_operator_had_any_motor_vehicle_claims_in_the_last_5_years == "Yes")
	{
		show row.How_many_motor_vehicle_claims;
		show row.Admin_Override;
		enable row.Admin_Override;
	}
	else
	{
		hide row.How_many_motor_vehicle_claims;
		disable row.Admin_Override;
		hide row.Admin_Override;
	}
	// Has the principal operator had any motor vehicle convictions in the last 3 years
	if(row.Has_the_principal_operator_had_any_motor_vehicle_convictions_in_the_last_3_years == "Yes")
	{
		show row.How_many_motor_vehicle_convictions;
		show row.PO_admin_3year_Override;
		enable row.PO_admin_3year_Override;
	}
	else
	{
		hide row.How_many_motor_vehicle_convictions;
		hide row.PO_admin_3year_Override;
		disable row.PO_admin_3year_Override;
	}
	//---------------End---------------
	//Has the principal operator had their driver license suspend
	if(row.Has_the_principal_operator_had_their_driver_s_license_suspended == "Yes")
	{
		show row.When;
		show row.PO_admin_License_Override;
		enable row.PO_admin_License_Override;
	}
	else
	{
		hide row.When;
		hide row.PO_admin_License_Override;
		disable row.PO_admin_License_Override;
	}
	//Hull type
	if(row.Hull_Type == "Other")
	{
		show row.Other_Hull_Type;
	}
	else
	{
		hide row.Other_Hull_Type;
	}
	//--------------End-----------------
	//Is the principal operator the same as the applicant owner
	if(row.Is_the_Principal_Operator_the_same_as_the_Applicant_Owner == "Yes")
	{
		if(row.Date_of_Birth != null)
		{
			currentYear = zoho.currentdate.getYear();
			yearsBetween = currentYear - row.Date_of_Birth.getYear();
		}
		disable row.First_Name;
		disable row.Last_Name;
		disable row.Date_of_Birth;
	}
	else
	{
		enable row.First_Name;
		enable row.Last_Name;
		enable row.Date_of_Birth;
	}
	//--------------End-----------------
	//is boat financed
	if(row.Is_this_boat_financed == "Yes")
	{
		show row.Lein_holder;
	}
	else
	{
		hide row.Lein_holder;
		hide row.Name_of_Financier;
		hide row.Address_line1;
		hide row.Address_line2;
		hide row.Postal_Code;
		hide row.City;
		hide row.Province;
		hide row.Country;
	}
	//--------------End-----------------
	//lein holder
	if(row.Lein_holder != null)
	{
		show row.Name_of_Financier;
		show row.Address_line1;
		show row.Address_line2;
		show row.City;
		show row.Province;
		show row.Country;
		show row.Postal_Code;
		show row.Suite_Unit_Number;
		fetchdetails = Lein_holder_Details[ID == row.Lein_holder];
		if(fetchdetails.count() > 0)
		{
			if(fetchdetails.Name_of_Financier != "Other")
			{
				hide row.Name_of_Financier;
				disable row.Address_line1;
				disable row.Address_line2;
				disable row.City;
				disable row.Country;
				disable row.Province;
				disable row.Postal_Code;
			}
			else
			{
				show row.Name_of_Financier;
				show row.Address_line1;
				show row.Address_line2;
				show row.City;
				show row.Province;
				show row.Country;
				show row.Postal_Code;
				enable row.Name_of_Financier;
				enable row.Address_line1;
				enable row.Address_line2;
				enable row.City;
				enable row.Country;
				enable row.Province;
				enable row.Postal_Code;
			}
		}
	}
	else
	{
		hide row.Name_of_Financier;
		hide row.Address_line1;
		hide row.Address_line2;
		hide row.City;
		hide row.Province;
		hide row.Country;
		hide row.Postal_Code;
		hide row.Suite_Unit_Number;
	}
	//--------------End-----------------
	// Replacement cost
	if(row.Replacement_Cost != null)
	{
		if(row.Select_coverage_for_policy == "Replacement Value Coverage")
		{
			//	enable row.Select_coverage_for_policy;
			disable row.Boat_Coverage;
			disable row.Salvage;
			if(row.Replacement_Cost > 350000 || row.Replacement_Cost < 10000)
			{
				enable row.RCV_Exceeding_Limits_UW_Approved;
				show row.RCV_Exceeding_Limits_UW_Approved;
			}
			else
			{
				hide row.RCV_Exceeding_Limits_UW_Approved;
			}
		}
	}
	else
	{
		//	disable row.Select_coverage_for_policy;
		hide row.RCV_Exceeding_Limits_UW_Approved;
	}
	//--------------End-----------------
	//----------Actual Cost----------
	if(row.Actual_Cash_Value != null)
	{
		if(row.Select_coverage_for_policy == "Current Market Value Coverage")
		{
			if(row.Actual_Cash_Value < 10000 || row.Actual_Cash_Value > 350000)
			{
				show row.ACV_Exceeding_Limits_UW_Approved;
				enable row.ACV_Exceeding_Limits_UW_Approved;
			}
			else
			{
				hide row.ACV_Exceeding_Limits_UW_Approved;
			}
		}
	}
	else
	{
		hide row.ACV_Exceeding_Limits_UW_Approved;
	}
	//----------End--------------
	// Select the type of watercraft
	if(row.Select_the_type_of_watercraft != null && row.Select_the_type_of_watercraft != "")
	{
		if(row.Select_the_type_of_watercraft == "Cabin Cruiser")
		{
			show row.Main_Engine2;
			show row.Types1;
			show row.Enter_the_type1;
			show row.Fuel_Type1;
			show row.Model_Year1;
			show row.Manufacturer1;
			show row.Serial1;
			show row.Horsepower1;
		}
		else
		{
			hide row.Main_Engine2;
			hide row.Types1;
			hide row.Enter_the_type1;
			hide row.Fuel_Type1;
			hide row.Model_Year1;
			hide row.Manufacturer1;
			hide row.Serial1;
			hide row.Horsepower1;
		}
	}
	//--------------End-----------------
	// show premium breakdown
	if(row.Show_Premium_Breakdown == true)
	{
		show row.Boat_Base_Premium;
		show row.Boat_Liability_Prem;
		show row.Boat_Operator_age_20_25_prem;
		show row.Boat_age_gt_15_prem;
		show row.Boat_operator_gt_25_lt_3years_exp_prem;
		show row.Deductible_Prem;
		show row.Navi_eqip_prem;
		show row.Pers_eff_prem;
		show row.Endorsement_prem;
		show row.Total_Prem;
	}
	else
	{
		hide row.Boat_Base_Premium;
		hide row.Boat_Liability_Prem;
		hide row.Boat_Operator_age_20_25_prem;
		hide row.Boat_age_gt_15_prem;
		hide row.Boat_operator_gt_25_lt_3years_exp_prem;
		hide row.Deductible_Prem;
		hide row.Navi_eqip_prem;
		hide row.Pers_eff_prem;
		hide row.Endorsement_prem;
		hide row.Total_Prem;
	}
	//-----------------End--------------------
	//Types1
	if(row.Types1 == "Other")
	{
		show row.Enter_the_type1;
	}
	else
	{
		hide row.Enter_the_type1;
	}
	//-----------------End--------------------
	//Type
	if(row.Types == "Other")
	{
		show row.Enter_the_type;
	}
	else
	{
		hide row.Enter_the_type;
	}
	row.General_Field=false;
	