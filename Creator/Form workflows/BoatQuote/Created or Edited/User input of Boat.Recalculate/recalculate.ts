if(row.Recalculate == true)
	{
		//--------------------API call to Send Coverage Details For Boat API------------------
		fetchEndPoint = API_Configuration[Name_Process == "Calculate Coverage Premium - Boat"].End_Point;
		parammap = Map();
		parammap.put("organization_id",thisapp.Server_Side.org_info());
		if(row.Select_coverage_for_policy == "Replacement Value Coverage")
		{
			boatvalue = ifnull(row.Replacement_Cost,0);
		}
		else if(row.Select_coverage_for_policy == "Current Market Value Coverage")
		{
			boatvalue = ifnull(row.Actual_Cash_Value,0);
		}
		else
		{
			boatvalue = 0;
		}
		parammap.put("boat_value",boatvalue);
		if(!isNull(row.Select_the_type_of_watercraft))
		{
			parammap.put("boat_type",row.Select_the_type_of_watercraft);
		}
		check15years = false;
		if(!isNull(row.Boat_Model_Year))
		{
			calculate25Years = zoho.currentdate.getYear() - row.Boat_Model_Year.toNumber();
			check15years = if(calculate25Years > 15,true,false);
		}
		if(!isNull(row.Deductible))
		{
			deductibleValue = row.Deductible;
			if(row.Deductible.contains("$") == true)
			{
				deductibleValue = row.Deductible.remove("$").tolong();
			}
			parammap.put("deductible_value",deductibleValue);
		}
		parammap.put("is_boat_age_gt_15",check15years);
		agecheck = false;
		calculateAge = 0;
		if(!isNull(row.Date_of_Birth))
		{
			calculateAge = zoho.currentdate.getYear() - row.Date_of_Birth.toDate().getYear();
			agecheck = if(calculateAge >= 20 && calculateAge <= 25,true,false);
		}
		parammap.put("is_boat_operator_age_20_25",agecheck);
		expcheck = false;
		if(calculateAge > 25 && !isNull(row.Principal_operator_s_years_of_boating_experience_with_vessels_of_a_similar_size_and_type))
		{
			if(row.Principal_operator_s_years_of_boating_experience_with_vessels_of_a_similar_size_and_type == "0-3 Years")
			{
				expcheck = true;
			}
		}
		parammap.put("is_boat_operator_gt_25_lt_3years_exp",expcheck);
		if(!isNull(row.Navigational_Equipment_Coverage))
		{
			naviValue = row.Navigational_Equipment_Coverage;
			if(row.Navigational_Equipment_Coverage.contains("$") == true)
			{
				naviValue = row.Navigational_Equipment_Coverage.remove("$").toDecimal();
			}
			parammap.put("navi_eqip_value",naviValue);
		}
		if(!isNull(row.Personal_Effects_Coverage))
		{
			personalValue = row.Personal_Effects_Coverage;
			if(row.Personal_Effects_Coverage.contains("$") == true)
			{
				personalValue = row.Personal_Effects_Coverage.remove("$").toDecimal();
			}
			parammap.put("pers_eff_value",personalValue);
		}
		if(!isNull(row.Liability_coverage))
		{
			parammap.put("is_boat_liability_rate_2M",row.Liability_coverage);
		}
		boatCoverage = if(row.Select_coverage_for_policy == "Replacement Value Coverage","RCV","ACV");
		parammap.put("coverage_type",boatCoverage);
		boatAgecheck = false;
		if(!isNull(row.Boat_Age))
		{
			boatAgecheck = if(row.Boat_Age >= 10 && row.Boat_Age <= 15,true,false);
		}
		parammap.put("is_boat_age_10_to_15",boatAgecheck);
		boatPostData = thisapp.Server_Side.callServer("POST",fetchEndPoint,parammap);
		//------------------------API call to Send Coverage Details For Boat API -End---------------
		if(boatPostData.get("success") == true && boatPostData.get("data").size() > 0)
		{
			row.Recalculate=false;
			responseData = boatPostData.get("data");
			row.Premium_Per_Year=ifnull(responseData.get("total_prem"),0);
			row.Boat_Base_Premium=ifnull(responseData.get("boat_base_premium"),0);
			row.Boat_Liability_Prem=ifnull(responseData.get("boat_liability_prem"),0);
			row.Boat_age_gt_15_prem=ifnull(responseData.get("boat_age_gt_15_prem"),0);
			row.Boat_Operator_age_20_25_prem=ifnull(responseData.get("boat_operator_age_20_25_prem"),0);
			row.Boat_operator_gt_25_lt_3years_exp_prem=ifnull(responseData.get("boat_operator_gt_25_lt_3years_exp_prem"),0);
			row.Deductible_Prem=ifnull(responseData.get("deductible_prem"),0);
			row.Navi_eqip_prem=ifnull(responseData.get("navi_eqip_prem"),0);
			row.Pers_eff_prem=ifnull(responseData.get("pers_eff_prem"),0);
			row.Endorsement_prem=ifnull(responseData.get("endorsement_prem"),0);
			row.Total_Prem=ifnull(responseData.get("total_prem"),0);
			premiumTotal = 0;
			if(row.Premium_Per_Year != null)
			{
				//	info "hi";
				for each  premium in input.Boat
				{
					premiumTotal = premiumTotal + ifnull(premium.Premium_Per_Year,0);
				}
				input.New_Total_Premium_before_tax = premiumTotal;
				fetchAdminFeePer = Commissions_Configuration[Commision == "Policy Change - Admin Fee"];
				if(fetchAdminFeePer.count() > 0)
				{
					input.New_Admin_Fee = ifnull(premiumTotal,0) * ifnull(fetchAdminFeePer.Percent,0) / 100;
				}
				//	info "tota" + input.Tax_Province;
				tax = 0;
				if(input.Please_select_the_province_your_boat_is_used_in != "" && input.Please_select_the_province_your_boat_is_used_in != null)
				{
					fetchTax = Tax_Lists[State_Province == input.Please_select_the_province_your_boat_is_used_in];
					tax = ifnull(fetchTax.Tax,0);
					if(input.Override_Tax_by_Admin == "Yes" && input.Override_Tax != null)
					{
						f_tax = Tax_Lists[ID == input.Override_Tax];
						tax = ifnull(f_tax.Tax,0);
					}
					input.New_Tax_Percent = tax;
					input.New_Tax_Province = input.Please_select_the_province_your_boat_is_used_in;
				}
				premiumandfee = ifnull(input.New_Total_Premium_before_tax,0) + ifnull(input.New_Admin_Fee,0);
				totalTax = premiumandfee * tax / 100;
				totalAftetTax = totalTax + premiumandfee;
				input.New_Total_Tax = totalTax;
				input.New_Total_Payable_Premium_after_tax = totalAftetTax;
			}
		}
	}
	