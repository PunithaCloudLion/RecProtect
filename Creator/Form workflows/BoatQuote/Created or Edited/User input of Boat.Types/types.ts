if(row.Types == "Other")
	{
		show row.Enter_the_type;
	}
	else
	{
		hide row.Enter_the_type;
		row.Enter_the_type="";
	}
	row.Referral_Main_engine=false;
	if(row.Types == "Inboard" || row.Types == "In/Outboard" || row.Types == "Jet drive")
	{
		if(row.Estimated_max_speed > 55 || row.Horsepower > 460)
		{
			alert "This choice triggers a referral.";
			row.Referral_Main_engine=true;
		}
	}
	if(row.Types == "Outboard")
	{
		if(row.Estimated_max_speed > 55 || row.Horsepower > 250)
		{
			alert "This choice triggers a referral.";
			row.Referral_Main_engine=true;
		}
	}
	