if(input.Link_Customer == true)
	{
		if(input.Insured_First_Name != "" && input.Insured_Last_Name != "" && input.Email != "" && input.Insured_First_Name != null && input.Insured_Last_Name != null && input.Email != null)
		{
			emailValue = input.Email.toLowerCase();
			//-----------------Code Added By vasanth on 10/5/2024---------------------
			search_customer = Customer[Email == emailValue];
			if(search_customer.count() == 1)
			{
				if(search_customer.First_Name.containsIgnoreCase(input.Insured_First_Name) == true && search_customer.Last_Name.containsIgnoreCase(input.Insured_Last_Name) == true)
				{
					input.Customer_ID = search_customer.ID;
					input.Date_of_Birth = search_customer.DOB;
					input.Phone_Number = search_customer.Phone_Number;
					input.Country = search_customer.Country;
					input.Address = search_customer.Address_Line1 + " - " + search_customer.Address_Line2;
					input.Province = search_customer.Province;
					input.City = search_customer.City;
					input.Postal_code_ZIP_Code = search_customer.Postal_Code;
					input.Where_Did_You_Find_Us = search_customer.Where_Did_You_Find_Us;
				}
				else
				{
					alert "Please Correct the Insured First Name and Last Name";
				}
			}
			else
			{
				input.Customer_ID = null;
				input.Date_of_Birth = null;
				input.Phone_Number = "";
				input.Country = "";
				input.Address = "";
				input.Province = "";
				input.City = "";
				input.Postal_code_ZIP_Code = "";
				input.Where_Did_You_Find_Us = "";
				input.Link_Customer = false;
			}
		}
		else
		{
			input.Customer_ID = null;
			input.Date_of_Birth = null;
			input.Phone_Number = "";
			input.Country = "";
			input.Address = "";
			input.Province = "";
			input.City = "";
			input.Postal_code_ZIP_Code = "";
			input.Where_Did_You_Find_Us = "";
			input.Link_Customer = false;
		}
	}
	