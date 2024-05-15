get_CRMDeals = zoho.crm.getRecordById("Deals",input.Deal_Name.toLong());
if(get_CRMDeals.size() > 0)
{
	AssetVal = "";
	if(get_CRMDeals.get("Layout").get("name") == "Trailer Policy" && get_CRMDeals.get("Creator_ID") != null && get_CRMDeals.get("Creator_ID") != "")
	{
		getTrailers = Trailer[TrailerQuote == get_CRMDeals.get("Creator_ID") && Select_Trailer_Type == input.Select_Type_of_Boat_or_Trailer.getprefix(" -") && Trailer_Model_Year == input.Select_Type_of_Boat_or_Trailer.getsuffix("- ")];
		input.Deductible = getTrailers.Deductible;
		input.Coverage = getTrailers.Coverage_Type + " - " + getTrailers.Select_coverage_for_policy;
		AssetVal = getTrailers.Trailer_Model_Year + "/" + getTrailers.Trailer_Manufacturer + "/" + getTrailers.Trailer_Model;
		input.Limit_Sums_insured = getTrailers.Premises_Liability;
		if(getTrailers.Is_this_trailer_financed == "Yes")
		{
			input.Lienholder_Mortgage_Other_insurance = getTrailers.Lein_holder.Name_of_Financier;
		}
		else
		{
			input.Lienholder_Mortgage_Other_insurance = "N/A";
		}
	}
	else if(get_CRMDeals.get("Layout").get("name") == "Boat Policy" && get_CRMDeals.get("Creator_ID") != null && get_CRMDeals.get("Creator_ID") != "")
	{
		getBoats = Boat[BoatQuote == get_CRMDeals.get("Creator_ID") && Select_the_type_of_watercraft == input.Select_Type_of_Boat_or_Trailer.getprefix(" -") && Boat_Model_Year == input.Select_Type_of_Boat_or_Trailer.getsuffix("- ")];
		AssetVal = getBoats.Boat_Model_Year + "/" + getBoats.Boat_Manufacturer + "/" + getBoats.Boat_Model;
		input.Deductible = getBoats.Deductible;
		input.Coverage = "All Risk - " + getBoats.Select_coverage_for_policy;
		input.Limit_Sums_insured = getBoats.Liability_coverage;
		if(getBoats.Is_this_boat_financed == "Yes")
		{
			input.Lienholder_Mortgage_Other_insurance = getBoats.Lein_holder.Name_of_Financier;
		}
		else
		{
			input.Lienholder_Mortgage_Other_insurance = "N/A";
		}
	}
	if(AssetVal != "")
	{
		input.Asset = AssetVal;
	}
	else
	{
		input.Asset = AssetVal;
	}
}
else
{
	input.Asset = AssetVal;
	input.Deductible = "";
}
