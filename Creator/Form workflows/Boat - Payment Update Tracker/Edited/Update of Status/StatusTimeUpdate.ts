if(input.Status1 == "1st follow-up mail sent")
	{
		input.First_Status_Update_Time = zoho.currenttime;
		input.Last_Status_Update_Time = zoho.currenttime;
	}
	if(input.Status1 == "2nd follow-up mail sent" || input.Status1 == "3rd follow-up mail sent" || input.Status1 == "Manual follow-up mail sent" || input.Status1 == "Payment Updated")
	{
		input.Last_Status_Update_Time = zoho.currenttime;
	}
	