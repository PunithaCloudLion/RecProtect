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
			if(input.Agree_to_terms_and_conditions == false)
			{
				alert "Please Select the Agree to terms and conditions";
				cancel submit;
			}
		}
	}
	