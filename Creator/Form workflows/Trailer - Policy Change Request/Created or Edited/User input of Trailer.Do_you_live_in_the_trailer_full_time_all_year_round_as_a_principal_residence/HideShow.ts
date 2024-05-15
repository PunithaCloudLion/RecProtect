if(row.Do_you_live_in_the_trailer_full_time_all_year_round_as_a_principal_residence == "Yes")
	{
		if(row.Add_Snowbird_Endorsement == true)
		{
			row.Referral_Do_you_live_in_the_trailer=false;
		}
		else
		{
			alert "This choice triggers a referral";
			row.Referral_Do_you_live_in_the_trailer=true;
		}
	}
	else
	{
		row.Referral_Do_you_live_in_the_trailer=false;
	}
	