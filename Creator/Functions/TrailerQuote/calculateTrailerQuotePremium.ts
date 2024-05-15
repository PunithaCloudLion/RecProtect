void TrailerQuote.calculateTrailerQuotePremium(int trailerID)
{
	try 
	{
		thisapp.Developer.addActivityLog("calculateTrailerQuotePremium--" + trailerID,"Function Call Start","ID","null");
		fetchtrailer = TrailerQuote[ID == trailerID];
		for each  rec in fetchtrailer.Trailer
		{
			parammap = Map();
			parammap.put("organization_id","RECPROTECT1");
			parammap.put("is_ol_water_protection",rec.Overland_Water_Protection);
			parammap.put("trailer_type",if(rec.Select_Trailer_Type != null && rec.Select_Trailer_Type != "",rec.Select_Trailer_Type,null));
			if(rec.Select_coverage_for_policy == "Replacement Value Coverage")
			{
				trailerValue = ifnull(rec.Replacement_Cost,0);
			}
			else if(rec.Select_coverage_for_policy == "Current Market Value Coverage")
			{
				trailerValue = ifnull(rec.Actual_Cash_Value,0);
			}
			else
			{
				trailerValue = 0;
			}
			parammap.put("trailer_value",trailerValue.toNumber());
			parammap.put("deductible_value",if(rec.Deductible != null && rec.Deductible != "",rec.Deductible.remove("$").toDecimal(),null));
			parammap.put("liability_value",if(rec.Premises_Liability != null,rec.Premises_Liability.toDecimal(),null));
			parammap.put("is_seasonally_parked",rec.Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground);
			parammap.put("is_preferred_parks",true);
			check25years = false;
			if(rec.Trailer_Model != null && rec.Trailer_Model != "")
			{
				calculate25Years = zoho.currentdate.getYear() - rec.Trailer_Model.toNumber();
				check25years = if(calculate25Years > 25,true,false);
			}
			parammap.put("is_trailer_over_25years",check25years);
			parammap.put("is_golf_cart_added",rec.Would_you_like_to_insure_a_golf_cart);
			golfValue = ifnull(rec.Value_of_Golf_Cart_1,0) + ifnull(rec.Value_of_Golf_Cart_2,0);
			parammap.put("total_golf_cart_value",golfValue.toDecimal());
			parammap.put("coverage_type",if(rec.Coverage_Type != null && rec.Coverage_Type != "",rec.Coverage_Type,null));
			//	info parammap;
			trailerpost = invokeurl
			[
				url :"https://insurance.theclsolutions.ca/recprotect/api/trailer/send_coverage_details"
				type :POST
				parameters:parammap
			];
			//	info trailerpost;
			if(trailerpost.get("success") == true && trailerpost.get("data").size() > 0)
			{
				responseData = trailerpost.get("data");
				rec.Premium_Per_Year=ifnull(responseData.get("total_premium"),0);
				rec.Detached_Private_Structure_Coverage_Sheds_etc=ifnull(responseData.get("detached_priv_stru_cov"),"");
				rec.Personal_Property_Coverage_T_V_Furniture_etc=ifnull(responseData.get("personal_prop_cov"),"");
			}
		}
		thisapp.Developer.addActivityLog("calculateTrailerQuotePremium--" + trailerID,"Function Call Ended and calculated trailer premium ","ID---" + trailerID,trailerpost.tostring());
		// 	if ( trailerpost.get("success") == true && trailerpost.get("data").size() > 0 ) 
		//     {
		//     }
	}
	catch (e)
	{
		thisapp.Developer.addDeveloperLog("Trailer","calculateTrailerQuotePremium:" + trailerID.tostring(),"calculated trailer premium",trailerID.tostring(),e,"creator");
	}
}