void Server_Side.recalculateTrailerPremium(int trailerID)
{
	//If the trailer type & coverage type is null - don't call the server - throw info error to complete missing details 
	trailerRow = Trailer[ID == trailerID];
	fetchEndPoint = API_Configuration[Name_Process == "Calculate Coverage Premium - Trailer"].End_Point;
	parammap = Map();
	parammap.put("organization_id","RECPROTECT1");
	parammap.put("is_ol_water_protection",trailerRow.Overland_Water_Protection);
	parammap.put("trailer_type",if(trailerRow.Select_Trailer_Type != null && trailerRow.Select_Trailer_Type != "",trailerRow.Select_Trailer_Type,null));
	if(trailerRow.Select_coverage_for_policy == "Replacement Value Coverage")
	{
		trailerValue = ifnull(trailerRow.Replacement_Cost,0);
	}
	else if(trailerRow.Select_coverage_for_policy == "Current Market Value Coverage")
	{
		trailerValue = ifnull(trailerRow.Actual_Cash_Value,0);
	}
	else
	{
		trailerValue = 0;
	}
	parammap.put("trailer_value",trailerValue);
	parammap.put("deductible_value",if(trailerRow.Deductible != null && trailerRow.Deductible != "",trailerRow.Deductible.remove("$").toDecimal(),0));
	parammap.put("liability_value",if(trailerRow.Premises_Liability != null,trailerRow.Premises_Liability,0));
	seasonal_parked = if(trailerRow.Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground != null,trailerRow.Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground,false);
	parammap.put("is_seasonally_parked",seasonal_parked);
	//logic needs to be applied 
	parammap.put("is_preferred_parks",false);
	check25years = false;
	if(trailerRow.Trailer_Model != null && trailerRow.Trailer_Model != "")
	{
		calculate25Years = zoho.currentdate.getYear() - trailerRow.Trailer_Model.toNumber();
		check25years = if(calculate25Years > 25,true,false);
	}
	parammap.put("is_trailer_over_25years",check25years);
	golfcartAdded = false;
	if(trailerRow.Would_you_like_to_insure_a_golf_cart == "Yes")
	{
		golfcartAdded = true;
	}
	parammap.put("is_golf_cart_added",golfcartAdded);
	golfValue = ifnull(trailerRow.Value_of_Golf_Cart_1,0) + ifnull(trailerRow.Value_of_Golf_Cart_2,0);
	parammap.put("total_golf_cart_value",golfValue.toDecimal());
	parammap.put("overrided_personal_prop_cov_value",if(trailerRow.Personal_Property_Coverage_T_V_Furniture_etc != null && trailerRow.Personal_Property_Coverage_T_V_Furniture_etc != "",trailerRow.Personal_Property_Coverage_T_V_Furniture_etc,0));
	parammap.put("overrided_detached_priv_stru_cov_value",if(trailerRow.Detached_Private_Structure_Coverage_Sheds_etc != null && trailerRow.Detached_Private_Structure_Coverage_Sheds_etc != "",trailerRow.Detached_Private_Structure_Coverage_Sheds_etc,0));
	parammap.put("opted_snowbird_endorsement",if(trailerRow.Add_Snowbird_Endorsement != null,trailerRow.Add_Snowbird_Endorsement,false));
	parammap.put("coverage_type",if(trailerRow.Coverage_Type != null && trailerRow.Coverage_Type != "",trailerRow.Coverage_Type,null));
	//info parammap;
	resp = thisapp.Server_Side.callServer("POST",fetchEndPoint,parammap);
	//info resp;
}