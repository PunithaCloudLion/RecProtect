void Server_Side.recalculateBoatPremium(int boatID)
{
	BoatRow = Boat[ID == boatID];
	fetchEndPoint = API_Configuration[Name_Process == "Calculate Coverage Premium - Boat"].End_Point;
	parammap = Map();
	parammap.put("organization_id","RECPROTECT1");
	// 		info  BoatBoatRow.Select_coverage_for_policy;
	if(BoatRow.Select_coverage_for_policy == "Replacement Value Coverage")
	{
		boatvalue = ifnull(BoatRow.Replacement_Cost,0);
	}
	else if(BoatRow.Select_coverage_for_policy == "Current Market Value Coverage")
	{
		boatvalue = ifnull(BoatRow.Actual_Cash_Value,0);
	}
	else
	{
		boatvalue = 0;
	}
	// 		info "rep --->"+BoatRow.Replacement_Cost;
	// 		info "act  --->"+BoatRow.Actual_Cash_Value;
	parammap.put("boat_value",boatvalue);
	parammap.put("boat_type",if(BoatRow.Select_the_type_of_watercraft != null && BoatRow.Select_the_type_of_watercraft != "",BoatRow.Select_the_type_of_watercraft,null));
	parammap.put("deductible_value",if(BoatRow.Deductible != null && BoatRow.Deductible != "",BoatRow.Deductible.remove("$").toDecimal(),null));
	check15years = false;
	if(BoatRow.Boat_Model_Year != null && BoatRow.Boat_Model_Year != "")
	{
		calculate25Years = zoho.currentdate.getYear() - BoatRow.Boat_Model_Year.toNumber();
		check15years = if(calculate25Years > 15,true,false);
	}
	parammap.put("is_boat_age_gt_15",check15years);
	agecheck = false;
	calculateAge = 0;
	if(BoatRow.Date_of_Birth != null)
	{
		calculateAge = zoho.currentdate.getYear() - BoatRow.Date_of_Birth.toDate().getYear();
		agecheck = if(calculateAge >= 20 && calculateAge <= 25,true,false);
	}
	parammap.put("is_boat_operator_age_20_25",agecheck);
	expcheck = false;
	if(calculateAge > 25 && BoatRow.Principal_operator_s_years_of_boating_experience_with_vessels_of_a_similar_size_and_type == "0-3 Years")
	{
		expcheck = true;
	}
	parammap.put("is_boat_operator_gt_25_lt_3years_exp",expcheck);
	parammap.put("navi_eqip_value",if(BoatRow.Navigational_Equipment_Coverage != null && BoatRow.Navigational_Equipment_Coverage != "",BoatRow.Navigational_Equipment_Coverage.remove("$").toDecimal(),null));
	parammap.put("pers_eff_value",if(BoatRow.Personal_Effects_Coverage != null && BoatRow.Personal_Effects_Coverage != "",BoatRow.Personal_Effects_Coverage.remove("$").toDecimal(),null));
	parammap.put("is_boat_liability_rate_2M",BoatRow.Liability_coverage);
	boatCoverage = if(BoatRow.Select_coverage_for_policy == "Replacement Value Coverage","RCV","ACV");
	parammap.put("coverage_type",boatCoverage);
	if(BoatRow.Boat_Age != null)
	{
		boatAgecheck = if(BoatRow.Boat_Age >= 10 && BoatRow.Boat_Age <= 15,true,false);
	}
	parammap.put("is_boat_age_10_to_15",boatAgecheck);
	//info parammap;
	// 	resp = thisapp.Server_Side.callServer("POST",fetchEndPoint,parammap);
	// 	info resp;
}