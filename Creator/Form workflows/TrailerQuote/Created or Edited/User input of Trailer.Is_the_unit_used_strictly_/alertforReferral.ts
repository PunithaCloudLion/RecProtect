//-------------------------Referral Reasons – Trailer Start-----------
if(row.Is_the_unit_used_strictly_for_pleasure_purposes_with_no_rental_or_business_use_of_any_kind == "No")
	{
		alert "This choice triggers a referral";
		row.Referral_business_use_of_any_kind=true;
	}
	else
	{
		row.Referral_business_use_of_any_kind=false;
	}
	//-------------------------Referral Reasons – Trailer End-----------
	