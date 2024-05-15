if(input.Source == "CREATOR")
	{
		if(input.Save_as_Draft == true)
		{
			if(input.Customer_ID == null)
			{
				if(input.Insured_First_Name == null || input.Insured_First_Name == "" || input.Insured_Last_Name == null || input.Insured_Last_Name == "" || input.Email == "" || input.Email == null || input.Phone_Number == null || input.Phone_Number == "" || input.Date_of_Birth == null || input.Where_Did_You_Find_Us == "" || input.Where_Did_You_Find_Us == null)
				{
					alert "Insured Deatils Should not be Empty";
					cancel submit;
				}
			}
		}
		else
		{
			getBoatQuote = BoatQuote[Zoho_Crm_ID == input.Zoho_Crm_ID && Policy_Status == "INACTIVE - FUTURE" && ID != input.ID];
			alert "getBoatQuote " + getBoatQuote;
			if(getBoatQuote.count() > 0 && input.Policy_Status == "ACTIVE")
			{
				alert "Update the Same Changes in INACTIVE - FUTURE " + input.Policy_Number;
			}
			//alert based on policy status
			if(input.Policy_Status == "INACTIVE - RENEWED" || input.Policy_Status == "INACTIVE - EXPIRED" || input.Policy_Status == "INACTIVE - CANCELLED")
			{
				alert "This Policy cannot be edited";
				cancel submit;
			}
		}
	}
	// if(input.Deal_Type == "Policy")
	// {
	// 	alert "Quote cannot be changed";
	// 	cancel submit;
	// }
	//cancel submit;
	