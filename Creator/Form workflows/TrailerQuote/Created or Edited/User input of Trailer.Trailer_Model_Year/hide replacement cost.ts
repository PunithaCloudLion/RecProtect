if(row.Trailer_Model_Year != null)
	{
		if(row.Select_Trailer_Type != "" && row.Select_Trailer_Type != null)
		{
			currentCoverYear = zoho.currentdate.getYear();
			yearsBetweenCover = currentCoverYear - row.Trailer_Model_Year.toLong();
			if(row.Select_Trailer_Type == "Park Model/Destination Trailer")
			{
				if(yearsBetweenCover < 25)
				{
					row.Coverage_Type="All Risk";
				}
				else
				{
					row.Coverage_Type="Named Perils";
				}
				disable row.Trailer_Coverage;
				if(yearsBetweenCover <= 15)
				{
					show row.Replacement_Cost;
					show row.Actual_Cash_Value;
					rowalue = {"Current Market Value Coverage","Replacement Value Coverage"};
					row.Select_coverage_for_policy:ui.add(rowalue);
				}
				else
				{
					hide row.Replacement_Cost;
					show row.Actual_Cash_Value;
					row.Replacement_Cost=null;
					row.Select_coverage_for_policy:ui.add("Current Market Value Coverage");
				}
			}
			else
			{
				//TravelTrailer
				if(yearsBetweenCover < 15)
				{
					row.Coverage_Type="All Risk";
				}
				else
				{
					row.Coverage_Type="Named Perils";
				}
				disable row.Trailer_Coverage;
				if(yearsBetweenCover <= 10)
				{
					rowalue = {"Current Market Value Coverage","Replacement Value Coverage"};
					row.Select_coverage_for_policy:ui.add(rowalue);
					show row.Replacement_Cost;
					show row.Actual_Cash_Value;
				}
				else
				{
					row.Select_coverage_for_policy:ui.add("Current Market Value Coverage");
					show row.Actual_Cash_Value;
					hide row.Replacement_Cost;
					row.Replacement_Cost=null;
				}
			}
		}
		else
		{
			hide row.Replacement_Cost;
			row.Replacement_Cost=null;
			row.Select_coverage_for_policy="";
			row.Trailer_Coverage=null;
			disable row.Trailer_Coverage;
		}
	}
	