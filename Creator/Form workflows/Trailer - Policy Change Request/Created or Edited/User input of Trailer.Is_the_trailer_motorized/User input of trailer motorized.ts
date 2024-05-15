//-------------------------Referral Reasons – Trailer Start-----------
if(row.Is_the_trailer_motorized_and_able_to_travel_on_its_own_without_a_towing_vehicle == "Yes")
	{
		alert "This choice triggers a referral";
		row.Referral_Is_the_trailer_motorized=true;
	}
	else
	{
		row.Referral_Is_the_trailer_motorized=false;
	}
	//-------------------------Referral Reasons – Trailer End-----------
	