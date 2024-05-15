if(input.Source == "CREATOR")
	{
		FirstName = List();
		LastName = List();
		Email_list = List();
		for each  rec in input.Additional_Names
		{
			if(rec.First_Name != "" && rec.First_Name != null)
			{
				FirstName.add(rec.First_Name.toLowerCase());
			}
			if(rec.Last_Name != "" && rec.Last_Name != null)
			{
				LastName.add(rec.Last_Name.toLowerCase());
			}
			if(rec.Email != "" && rec.Email != null)
			{
				Email_list.add(rec.Email);
			}
		}
		distinct_firstname = FirstName.distinct();
		distinct_lastname = LastName.distinct();
		distinct_email = Email_list.distinct();
		if(distinct_firstname.size() != FirstName.size() && distinct_lastname.size() != LastName.size() && distinct_email.size() != Email_list.size())
		{
			alert "Duplicate Additional Insured Cannot Be Accepted!!";
			cancel submit;
		}
		if(distinct_email.size() != Email_list.size())
		{
			alert "Duplicates Additional Insured Email Cannot Be Accepted!!";
			cancel submit;
		}
		//-------------code added by nambi on 13/05 ------------
		if(input.Insured_First_Name != "" && input.Insured_Last_Name != "" && input.Email != "" && input.Insured_First_Name != null && input.Insured_Last_Name != null && input.Email != null)
		{
			emailValue = input.Email.toLowerCase();
			search_customer = Customer[Email == emailValue];
			if(search_customer.count() == 1)
			{
				if(search_customer.First_Name.containsIgnoreCase(input.Insured_First_Name) == false || search_customer.Last_Name.containsIgnoreCase(input.Insured_Last_Name) == false)
				{
					alert "Please Correct the Insured First Name and Last Name";
					cancel submit;
				}
			}
		}
	}
	