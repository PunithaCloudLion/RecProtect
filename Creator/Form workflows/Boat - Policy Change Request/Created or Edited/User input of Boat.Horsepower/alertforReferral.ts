if(row.Horsepower > 460 || row.Estimated_max_speed > 55)
	{
		if(row.Types == "Inboard" || row.Types == "In/Outboard" || row.Types == "Jet drive" || row.Estimated_max_speed > 55)
		{
			alert "This choice triggers a referral.";
			row.Referral_Main_engine=true;
		}
		else
		{
			row.Referral_Main_engine=false;
		}
	}
	else
	{
		row.Referral_Main_engine=false;
	}
	if(row.Horsepower > 250 || row.Estimated_max_speed > 55)
	{
		if(row.Types == "Outboard")
		{
			alert "This choice triggers a referral.";
			row.Referral_Main_engine=true;
		}
		else
		{
			row.Referral_Main_engine=false;
		}
	}
	else
	{
		row.Referral_Main_engine=false;
	}
	