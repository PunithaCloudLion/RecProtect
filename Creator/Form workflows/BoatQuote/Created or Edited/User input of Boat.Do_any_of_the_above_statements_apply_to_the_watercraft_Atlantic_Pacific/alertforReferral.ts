if(row.Do_any_of_the_above_statements_apply_to_the_watercraft_Atlantic_Pacific == "Yes")
	{
		alert "This choice triggers a referral.";
		row.Referral_Do_any_of_the_above_statements_apply_to_the_watercraft=true;
	}
	else
	{
		row.Referral_Do_any_of_the_above_statements_apply_to_the_watercraft=false;
	}
	