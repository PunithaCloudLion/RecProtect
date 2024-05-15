if(row.Add_Snowbird_Endorsement == true)
	{
		show row.Non_Domestic_Address;
		if(row.Do_you_live_in_the_trailer_full_time_all_year_round_as_a_principal_residence == "No")
		{
			alert "This choice triggers a referral";
			row.Referral_Do_you_live_in_the_trailer=true;
		}
		else
		{
			row.Referral_Do_you_live_in_the_trailer=false;
		}
	}
	else
	{
		if(row.Do_you_live_in_the_trailer_full_time_all_year_round_as_a_principal_residence == "Yes")
		{
			alert "This choice triggers a referral";
			row.Referral_Do_you_live_in_the_trailer=true;
		}
		else
		{
			row.Referral_Do_you_live_in_the_trailer=false;
		}
		hide row.Non_Domestic_Address;
		row.Non_Domestic_Address="";
	}
	