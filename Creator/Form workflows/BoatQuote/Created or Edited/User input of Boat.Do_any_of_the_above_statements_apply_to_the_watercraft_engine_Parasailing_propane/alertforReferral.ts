if(row.Do_any_of_the_above_statements_apply_to_the_watercraft_engine_Parasailing_propane == "Yes")
	{
		alert "This choice triggers a referral.";
		row.Referral_Do_any_of_the_above_statements_apply_to_the_watercraft1=true;
	}
	else
	{
		row.Referral_Do_any_of_the_above_statements_apply_to_the_watercraft1=false;
	}
	