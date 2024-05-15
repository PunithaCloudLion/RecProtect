void BoatQuote.calculateBoatQuotePremium(int BoatID)
{
	try 
	{
		thisapp.Developer.addActivityLog("calculateBoatQuotePremium--" + BoatID,"Function Call Start","ID","null");
		fetchboat = BoatQuote[ID == BoatID];
		for each  rec in fetchboat.Boat
		{
			//	info rec.Actual_Cash_Value;
			//	info rec.Deductible;
			//	info rec.Navigational_Equipment_Coverage;
			//	info rec.Personal_Effects_Coverage;
			parammap = Map();
			parammap.put("organization_id","RECPROTECT1");
			if(rec.Select_coverage_for_policy == "Replacement Value Coverage")
			{
				boatvalue = ifnull(rec.Replacement_Cost,0);
			}
			else if(rec.Select_coverage_for_policy == "Current Market Value Coverage")
			{
				boatvalue = ifnull(rec.Actual_Cash_Value,0);
			}
			else
			{
				boatvalue = 0;
			}
			parammap.put("boat_value",boatvalue);
			parammap.put("boat_type",if(rec.Select_the_type_of_watercraft != null && rec.Select_the_type_of_watercraft != "",rec.Select_the_type_of_watercraft,null));
			parammap.put("deductible_value",if(rec.Deductible != null && rec.Deductible != "",rec.Deductible.remove("$").toDecimal(),null));
			check15years = false;
			if(rec.Boat_Model_Year != null && rec.Boat_Model_Year != "")
			{
				calculate25Years = zoho.currentdate.getYear() - rec.Boat_Model_Year.toNumber();
				check15years = if(calculate25Years > 15,true,false);
			}
			parammap.put("is_boat_age_gt_15",check15years);
			agecheck = false;
			calculateAge = 0;
			if(rec.Date_of_Birth != null)
			{
				calculateAge = zoho.currentdate.getYear() - rec.Date_of_Birth.toDate().getYear();
				agecheck = if(calculateAge >= 20 && calculateAge <= 25,true,false);
			}
			parammap.put("is_boat_operator_age_20_25",agecheck);
			expcheck = false;
			if(calculateAge > 25 && rec.Principal_operator_s_years_of_boating_experience_with_vessels_of_a_similar_size_and_type == "0-3 Years")
			{
				expcheck = true;
			}
			parammap.put("is_boat_operator_gt_25_lt_3years_exp",expcheck);
			parammap.put("navi_eqip_value",if(rec.Navigational_Equipment_Coverage != null && rec.Navigational_Equipment_Coverage != "",rec.Navigational_Equipment_Coverage.remove("$").toDecimal(),null));
			parammap.put("pers_eff_value",if(rec.Personal_Effects_Coverage != null && rec.Personal_Effects_Coverage != "",rec.Personal_Effects_Coverage.remove("$").toDecimal(),null));
			parammap.put("is_boat_liability_rate_2M",true);
			boatPostData = invokeurl
			[
				url :"https://insurance.theclsolutions.ca/recprotect/api/boat/send_coverage_details"
				type :POST
				parameters:parammap
			];
			//	info boatPostData;
			if(boatPostData.get("success") == true && boatPostData.get("data").size() > 0)
			{
				rec.Premium_Per_Year=ifnull(boatPostData.get("data").get("total_prem"),0);
			}
		}
		thisapp.Developer.addActivityLog("calculateBoatQuotePremium--" + BoatID,"Function Call Ended and boat premium calculated ","ID---" + fetchboat.ID.tostring(),boatPostData.tostring());
	}
	catch (e)
	{
		thisapp.Developer.addDeveloperLog("BoatQuote","calculateBoatQuotePremium:" + fetchboat.ID.tostring(),"Calculate Boat Premium details",fetchboat.ID.tostring(),e,"creator");
	}
}