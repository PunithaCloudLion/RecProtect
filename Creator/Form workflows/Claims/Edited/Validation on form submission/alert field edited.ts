if(zoho.loginuser == "Public")
	{
		if(input.Approved == "Yes")
		{
			alert "This Claim was already approve, so you can't able to change anything";
			cancel submit;
		}
	}
	