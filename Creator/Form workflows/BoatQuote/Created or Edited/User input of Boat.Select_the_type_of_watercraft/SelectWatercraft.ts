if(row.Select_the_type_of_watercraft != null && row.Select_the_type_of_watercraft != "")
	{
		if(row.Select_the_type_of_watercraft == "Cabin Cruiser")
		{
			show row.Main_Engine2;
			show row.Types1;
			//show row.Enter_the_type1;
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
			row.Types1="";
			row.Enter_the_type1="";
			row.Fuel_Type1="";
			row.Model_Year1="";
			row.Manufacturer1="";
			row.Serial1="";
			row.Horsepower1="";
		}
		//referral alert
		if(row.Select_the_type_of_watercraft == "I'm not too sure")
		{
			alert "This choice triggers a referral.";
			row.Referral_Watercraft_Type=true;
		}
		else
		{
			row.Referral_Watercraft_Type=false;
		}
		//
		//Commented by Ananth on 07/04
		/*fetchEndPoint = API_Configuration[Name_Process == "Calculate Coverage Premium - Boat"].End_Point;
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
			parammap.put("pers_eff_value",row.Personal_Effects_Coverage.tolong());
		}
		if(!isNull(row.Liability_coverage))
		{
			parammap.put("is_boat_liability_rate_2M",row.Liability_coverage);
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
		boatCoverage = if(row.Select_coverage_for_policy == "Replacement Value Coverage","RCV","ACV");
		parammap.put("coverage_type",boatCoverage);
		boatAgecheck = false;
		if(!isNull(row.Boat_Age))
		{
			boatAgecheck = if(row.Boat_Age >= 10 && row.Boat_Age <= 15,true,false);
		}
		parammap.put("is_boat_age_10_to_15",boatAgecheck);
		boatPostData = thisapp.Server_Side.callServer("POST",fetchEndPoint,parammap);
		if(boatPostData.get("success") == true && boatPostData.get("data").size() > 0)
		{
			row.Premium_Per_Year=ifnull(boatPostData.get("data").get("total_prem"),0);
			premiumTotal = 0;
			if(row.Premium_Per_Year != null)
			{
				//	info "hi";
				for each  premium in input.Boat
				{
					premiumTotal = premiumTotal + ifnull(premium.Premium_Per_Year,0);
				}
				input.New_Total_Premium_before_tax = premiumTotal;
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
		}*/
	}
	