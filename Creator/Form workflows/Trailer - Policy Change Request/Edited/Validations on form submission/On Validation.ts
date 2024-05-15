if(input.Source == "CREATOR")
	{
		getTrailerQuote = TrailerQuote[Zoho_Crm_ID == input.Zoho_Crm_ID && Policy_Status == "INACTIVE - FUTURE" && ID != input.ID];
		if(getTrailerQuote.count() > 0 && input.Policy_Status == "ACTIVE")
		{
			alert "Update the Same Changes in INACTIVE - FUTURE " + input.Policy_Number;
		}
		if(input.Policy_Status == "INACTIVE - RENEWED" || input.Policy_Status == "INACTIVE - EXPIRED" || input.Policy_Status == "INACTIVE - CANCELLED")
		{
			alert "These Policy cannot be edited";
			cancel submit;
		}
	}
	// if(input.Deal_Type == "Policy")
	// {
	// 	alert "Quote cannot be changed";
	// 	cancel submit;
	// }
	//------------------Referral Sttaus Update----------
	oldstatus = old.Quote_Status;
	if(oldstatus == "Referral" && input.Quote_Status != "Referral")
	{
		input.Quote_Status = "Return To Payment";
	}
	