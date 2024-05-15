//-----------------Refferal----------------
//------------------Replacement---------------
hide row.ACV_Exceeding_Limits_UW_Approved;
row.ACV_Exceeding_Limits_UW_Approved=null;
row.Referral_Actual_cash_value=false;
row.Referral_Replacement_cost=false;
hide row.RCV_Exceeding_Limits_UW_Approved;
row.RCV_Exceeding_Limits_UW_Approved=null;
if(row.Select_coverage_for_policy == "Replacement Value Coverage")
{
	row.Trailer_Coverage=row.Replacement_Cost;
	hide row.ACV_Exceeding_Limits_UW_Approved;
	row.ACV_Exceeding_Limits_UW_Approved=null;
	row.Referral_Actual_cash_value=false;
	if(row.Select_Trailer_Type == "Park Model/Destination Trailer")
	{
		// --- Added both the conditions meet referal and show the override option.
		if(row.Replacement_Cost > 375000 || row.Replacement_Cost < 25000)
		{
			alert "This choice triggers a referral";
			row.Referral_Replacement_cost=true;
			show row.RCV_Exceeding_Limits_UW_Approved;
			enable row.RCV_Exceeding_Limits_UW_Approved;
		}
		else
		{
			row.Referral_Replacement_cost=false;
			hide row.RCV_Exceeding_Limits_UW_Approved;
			row.RCV_Exceeding_Limits_UW_Approved=null;
		}
	}
	else if(row.Select_Trailer_Type == "Travel Trailer/Fifth Wheel Trailer")
	{
		if(row.Replacement_Cost > 250000 || row.Replacement_Cost < 10000)
		{
			alert "This choice triggers a referral";
			row.Referral_Replacement_cost=true;
			show row.RCV_Exceeding_Limits_UW_Approved;
			enable row.RCV_Exceeding_Limits_UW_Approved;
		}
		else
		{
			row.Referral_Replacement_cost=false;
			hide row.RCV_Exceeding_Limits_UW_Approved;
			row.RCV_Exceeding_Limits_UW_Approved=null;
		}
	}
}
//---------------Actual---------------
if(row.Select_coverage_for_policy == "Current Market Value Coverage")
{
	row.Trailer_Coverage=row.Actual_Cash_Value;
	hide row.RCV_Exceeding_Limits_UW_Approved;
	row.RCV_Exceeding_Limits_UW_Approved=null;
	row.Referral_Replacement_cost=false;
	if(row.Select_Trailer_Type == "Park Model/Destination Trailer")
	{
		if(row.Actual_Cash_Value > 375000 || row.Actual_Cash_Value < 25000)
		{
			alert "This choice triggers a referral";
			row.Referral_Actual_cash_value=true;
			show row.ACV_Exceeding_Limits_UW_Approved;
			enable row.ACV_Exceeding_Limits_UW_Approved;
		}
		else
		{
			row.Referral_Actual_cash_value=false;
			hide row.ACV_Exceeding_Limits_UW_Approved;
			row.ACV_Exceeding_Limits_UW_Approved=null;
		}
	}
	else if(row.Select_Trailer_Type == "Travel Trailer/Fifth Wheel Trailer")
	{
		if(row.Actual_Cash_Value > 250000 || row.Actual_Cash_Value < 10000)
		{
			alert "This choice triggers a referral";
			row.Referral_Actual_cash_value=true;
			show row.ACV_Exceeding_Limits_UW_Approved;
			enable row.ACV_Exceeding_Limits_UW_Approved;
		}
		else
		{
			row.Referral_Actual_cash_value=false;
			hide row.ACV_Exceeding_Limits_UW_Approved;
			row.ACV_Exceeding_Limits_UW_Approved=null;
		}
	}
}
//--------------------API call to Send Coverage Details For Trailer API------------------
fetchEndPoint = API_Configuration[Name_Process == "Calculate Coverage Premium - Trailer"].End_Point;
parammap = Map();
parammap.put("organization_id",thisapp.Server_Side.org_info());
parammap.put("is_ol_water_protection",row.Overland_Water_Protection);
if(!isNull(row.Select_Trailer_Type))
{
	parammap.put("trailer_type",row.Select_Trailer_Type);
}
if(row.Select_coverage_for_policy == "Replacement Value Coverage")
{
	trailerValue = ifnull(row.Replacement_Cost,0);
	row.Trailer_Coverage=ifnull(row.Replacement_Cost,0);
}
else if(row.Select_coverage_for_policy == "Current Market Value Coverage")
{
	trailerValue = ifnull(row.Actual_Cash_Value,0);
	row.Trailer_Coverage=ifnull(row.Actual_Cash_Value,0);
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
parammap.put("is_seasonally_parked",if(row.Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground == "Yes",true,false));
preferrredpark = false;
if(row.Select_a_Park1 != null)
{
	preferrredpark = true;
}
parammap.put("is_preferred_parks",preferrredpark);
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
if(row.PP_Admin_Override == true)
{
	if(!isNull(row.Personal_Property_Coverage_T_V_Furniture_etc))
	{
		if(row.Personal_Property_Coverage_T_V_Furniture_etc.isNumber() == true)
		{
			personalPropcover = row.Personal_Property_Coverage_T_V_Furniture_etc;
		}
	}
}
parammap.put("overrided_personal_prop_cov_value",personalPropcover);
detachVal = 0;
if(row.DPS_Coverage_Admin_Override == true)
{
	if(!isNull(row.Detached_Private_Structure_Coverage_Sheds_etc))
	{
		if(row.Detached_Private_Structure_Coverage_Sheds_etc.isNumber() == true)
		{
			detachVal = row.Detached_Private_Structure_Coverage_Sheds_etc;
		}
	}
}
parammap.put("overrided_detached_priv_stru_cov_value",detachVal);
parammap.put("opted_snowbird_endorsement",row.Add_Snowbird_Endorsement);
if(!isNull(row.Coverage_Type))
{
	parammap.put("coverage_type",row.Coverage_Type);
}
trailerpost = thisapp.Server_Side.callServer("POST",fetchEndPoint,parammap);
//------------------------API call to Send Coverage Details For Trailer API -End---------------
if(trailerpost.get("success") == true && trailerpost.get("data").size() > 0)
{
	responseData = trailerpost.get("data");
	row.Premium_Per_Year=ifnull(responseData.get("total_premium"),0);
	row.Detached_Private_Structure_Coverage_Sheds_etc=ifnull(responseData.get("detached_priv_stru_cov"),"");
	row.Personal_Property_Coverage_T_V_Furniture_etc=ifnull(responseData.get("personal_prop_cov"),"");
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
		totalTax = premiumandfee * tax / 100;
		totalAftetTax = totalTax + premiumandfee;
		input.Total_Tax = totalTax;
		input.Total_Payable_Premium_after_tax = totalAftetTax;
	}
}