if(row.Does_the_operator_hold_a_Pleasure_Craft_Operator_s_Card_PCOC == "No")
	{
		alert "This choice triggers a referral.";
		row.Referral_Does_the_operator_hold_a_Pleasure_Craft_Operator_Card_PCOC=true;
	}
	else
	{
		row.Referral_Does_the_operator_hold_a_Pleasure_Craft_Operator_Card_PCOC=false;
	}
	