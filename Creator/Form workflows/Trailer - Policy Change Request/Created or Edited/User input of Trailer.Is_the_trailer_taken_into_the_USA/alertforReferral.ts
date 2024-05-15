//-------------------------Referral Reasons – Trailer Start-----------
if(row.Is_the_trailer_taken_into_the_USA_for_more_than_180_days == "Yes")
	{
		alert "This choice triggers a referral";
		row.Referral_Is_the_trailer_taken_into_USA=true;
	}
	else
	{
		row.Referral_Is_the_trailer_taken_into_USA=false;
	}
	