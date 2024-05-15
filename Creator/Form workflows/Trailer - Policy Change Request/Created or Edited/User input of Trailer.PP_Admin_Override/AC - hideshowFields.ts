if(row.PP_Admin_Override == true)
	{
		enable row.Personal_Property_Coverage_T_V_Furniture_etc;
		//	enable row.Detached_Private_Structure_Coverage_Sheds_etc;
	}
	else
	{
		disable row.Personal_Property_Coverage_T_V_Furniture_etc;
		//	disable row.Detached_Private_Structure_Coverage_Sheds_etc;
		//	code commented by nambi code for old value of personal value based on api
		//--------------------API call to Send Coverage Details For Trailer API------------------
		fetchEndPoint = API_Configuration[Name_Process == "Calculate Coverage Premium - Trailer"].End_Point;
		parammap = Map();
		parammap.put("organization_id",thisapp.Server_Side.org_info());
		if(!isNull(row.Select_Trailer_Type))
		{
			parammap.put("trailer_type",row.Select_Trailer_Type);
		}
		if(row.Select_coverage_for_policy == "Replacement Value Coverage")
		{
			trailerValue = ifnull(row.Replacement_Cost,0);
		}
		else if(row.Select_coverage_for_policy == "Current Market Value Coverage")
		{
			trailerValue = ifnull(row.Actual_Cash_Value,0);
		}
		else
		{
			trailerValue = 0;
		}
		parammap.put("trailer_value",trailerValue);
		deductiableValue = 0;
		if(!isNull(row.Deductible))
		{
			deductiableValue = row.Deductible;
			if(row.Deductible.contains("$") == true)
			{
				deductiableValue = row.Deductible.remove("$").toDecimal();
			}
		}
		parammap.put("deductible_value",deductiableValue);
		parammap.put("liability_value",if(!isNull(row.Premises_Liability),row.Premises_Liability,0));
		isSeasonallyParked = false;
		if(row.Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground == "Yes" && row.Is_the_trailer_removed_from_the_park_in_the_off_season == "No")
		{
			isSeasonallyParked = true;
		}
		parammap.put("is_seasonally_parked",isSeasonallyParked);
		preferrredpark = false;
		if(row.Override_Preferred_Park_Discount != true)
		{
			if(row.Select_a_Park1 != null && row.Select_a_Park1 != 4564627000000511007)
			{
				preferrredpark = true;
			}
		}
		parammap.put("is_preferred_parks",preferrredpark);
		parammap.put("is_ol_water_protection",true);
		check25years = false;
		if(!isNull(row.Trailer_Model_Year))
		{
			calculate25Years = zoho.currentdate.getYear() - row.Trailer_Model_Year.toNumber();
			check25years = if(calculate25Years > 25,true,false);
		}
		parammap.put("is_trailer_over_25years",check25years);
		parammap.put("is_golf_cart_added",if(row.Would_you_like_to_insure_a_golf_cart == "Yes",true,false));
		golfValue = ifnull(row.Value_of_Golf_Cart_1,0) + ifnull(row.Value_of_Golf_Cart_2,0);
		parammap.put("total_golf_cart_value",golfValue.toDecimal());
		personalPropcover = 0;
		parammap.put("overrided_personal_prop_cov_value",personalPropcover);
		detachVal = 0;
		if(row.DPS_Coverage_Admin_Override == true)
		{
			if(!isNull(row.Detached_Private_Structure_Coverage_Sheds_etc))
			{
				if(row.Detached_Private_Structure_Coverage_Sheds_etc.isNumber() == true)
				{
					detachVal = row.Detached_Private_Structure_Coverage_Sheds_etc.tolong();
				}
			}
		}
		parammap.put("overrided_detached_priv_stru_cov_value",detachVal);
		parammap.put("opted_snowbird_endorsement",row.Add_Snowbird_Endorsement);
		if(!isNull(row.Coverage_Type))
		{
			parammap.put("coverage_type",row.Coverage_Type);
		}
		// 	info parammap;
		trailerpost = thisapp.Server_Side.callServer("POST",fetchEndPoint,parammap);
		//info trailerpost ;
		// 	info " ----";
		// 	info trailerpost;
		//------------------------API call to Send Coverage Details For Trailer API -End---------------
		if(trailerpost.get("success") == true && trailerpost.get("data").size() > 0)
		{
			row.Recalculate=false;
			responseData = trailerpost.get("data");
			row.Premium_Per_Year=ifnull(responseData.get("total_premium"),0);
			row.Detached_Private_Structure_Coverage_Sheds_etc=ifnull(responseData.get("detached_priv_stru_cov"),"");
			row.Personal_Property_Coverage_T_V_Furniture_etc=ifnull(responseData.get("personal_prop_cov"),"");
			row.Liability_Prem=responseData.get("liability_prem");
			row.Preferred_Parks_Disc=responseData.get("preferred_parks_disc");
			row.Personal_Prop_Cov=responseData.get("personal_prop_cov");
			row.Golf_Excess_Prem=responseData.get("golf_excess_prem");
			row.Ol_Water_Protection_Prem=responseData.get("ol_water_protection_prem");
			row.Trailer_Base_Premium=responseData.get("trailer_base_premium");
			row.Trailer_over_25_years_sur=responseData.get("trailer_over_25years_sur");
			row.Seasonally_Parked_disc=responseData.get("seasonally_parked_disc");
			row.Detached_Priv_Stru_Cov=responseData.get("detached_priv_stru_cov");
			row.Golf_Prem_Base=responseData.get("golf_prem_base");
			if(row.Premium_Per_Year != null)
			{
				//info "hi" ;
				premiumTotal = 0;
				for each  premium in input.Trailer
				{
					premiumTotal = premiumTotal + ifnull(premium.Premium_Per_Year,0);
				}
				input.Total_Premium_before_tax = premiumTotal;
				// --- Add Admin Fee - Based on config ------
				fetchAdminFeePer = Commissions_Configuration[Commision == "NB - Admin Fee"];
				if(fetchAdminFeePer.count() > 0)
				{
					input.Fee = ifnull(premiumTotal,0) * ifnull(fetchAdminFeePer.Percent,0) / 100;
				}
				tax = 0;
				if(input.Please_select_the_province_your_trailer_is_located_in != "" && input.Please_select_the_province_your_trailer_is_located_in != null)
				{
					fetchTax = Tax_Lists[State_Province == input.Please_select_the_province_your_trailer_is_located_in];
					tax = fetchTax.Tax;
					if(input.Override_Tax_by_Admin == "Yes" && input.Override_Tax != null)
					{
						tax = input.Override_Tax.Tax;
					}
					input.Tax_Precent = tax;
					input.Tax_Province = input.Please_select_the_province_your_trailer_is_located_in;
				}
				premiumandfee = ifnull(input.Total_Premium_before_tax,0) + ifnull(input.Fee,0);
				totalTax = (premiumandfee * tax) / 100;
				//info "tax = " + totalTax;
				totalAftetTax = totalTax + premiumandfee;
				input.Total_Tax = totalTax;
				input.Total_Payable_Premium_after_tax = totalAftetTax;
			}
		}
	}
	