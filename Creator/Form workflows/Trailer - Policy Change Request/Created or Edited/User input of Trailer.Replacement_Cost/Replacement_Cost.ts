//--------------------Referal Reason Alert-----------
if(row.Select_coverage_for_policy == "Replacement Value Coverage")
	{
		row.Trailer_Coverage=row.Replacement_Cost;
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
			// 	else if(row.Replacement_Cost < 25000)
			// 	{
			// 		alert "This choice triggers a referral";
			// 		row.Referral_Replacement_cost=true;
			// 		hide row.RCV_Exceeding_Limits_UW_Approved;
			// 		row.RCV_Exceeding_Limits_UW_Approved=null;
			// 	}
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
			// 	else if(row.Replacement_Cost < 10000)
			// 	{
			// 		alert "This choice triggers a referral";
			// 		row.Referral_Replacement_cost=true;
			// 		hide row.RCV_Exceeding_Limits_UW_Approved;
			// 		row.RCV_Exceeding_Limits_UW_Approved=null;
			// 	}
		}
	}
	//--------------------Referal Reason Alert End-----------
	if(row.Replacement_Cost != null)
	{
		//enable row.Select_coverage_for_policy;
		row.Select_coverage_for_policy="";
		//	row.Trailer_Coverage=row.Replacement_Cost;
		disable row.Trailer_Coverage;
	}
	else
	{
		row.Select_coverage_for_policy="Current Market Value Coverage";
		rowalue = {"Current Market Value Coverage","Replacement Value Coverage"};
		row.Select_coverage_for_policy:ui.add(rowalue);
		//	disable row.Select_coverage_for_policy;
	}
	