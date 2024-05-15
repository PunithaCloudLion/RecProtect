if(input.Source == "CREATOR" && Save_as_Draft == false)
	{
		Msg = "";
		newString = ",";
		newLine = hexToText("0A");
		string = newString + newLine;
		Msg = Msg + string + "The given field value is null, please enter the value";
		if(Quote_ID == null || Quote_ID == "")
		{
			Msg = Msg + string + "Quote ID";
		}
		if(Carrier == null || Carrier == "")
		{
			Msg = Msg + string + "Carrier";
		}
		if(Insured_First_Name == "" || Insured_First_Name == null)
		{
			Msg = Msg + string + "Insured FirstName";
		}
		if(Insured_Last_Name == "" || Insured_Last_Name == null)
		{
			Msg = Msg + string + "Insured LastName";
		}
		if(Email == "" || Email == null)
		{
			Msg = Msg + string + "Email";
		}
		if(Link_Customer == false)
		{
			Msg = Msg + string + "Link Customer";
		}
		if(Phone_Number == "" || Phone_Number == null)
		{
			Msg = Msg + string + "Phone Number";
		}
		if(Date_of_Birth == null)
		{
			Msg = Msg + string + "Date of Birth";
		}
		if(Inception_Date == null)
		{
			Msg = Msg + string + "Effective Date";
		}
		if(Country == null || Country == "")
		{
			Msg = Msg + string + "Country";
		}
		if(Address == null || Address == "")
		{
			Msg = Msg + string + "Address";
		}
		if(City == null || City == "")
		{
			Msg = Msg + string + "City";
		}
		if(Province == null || Province == "")
		{
			Msg = Msg + string + "Province";
		}
		if(Postal_code_ZIP_Code == null || Postal_code_ZIP_Code == "")
		{
			Msg = Msg + string + "Postal Code";
		}
		if(Total_Premium_before_tax == null)
		{
			Msg = Msg + string + "Total Premium Before Tax";
		}
		if(Tax_Province == null || Tax_Province == "")
		{
			Msg = Msg + string + "Tax Province";
		}
		if(Fee == null)
		{
			Msg = Msg + string + "Fee";
		}
		if(Tax_Precent == null)
		{
			Msg = Msg + string + "Tax_Precent";
		}
		if(Total_Tax == null)
		{
			Msg = Msg + string + "Total_Tax";
		}
		if(Total_Payable_Premium_after_tax == null)
		{
			Msg = Msg + string + "Total Payable Premium After Tax";
		}
		if(Suite_Apt == null || Suite_Apt == "")
		{
			Msg = Msg + string + "Suite Apt";
		}
		if(Agree_to_terms_and_conditions == false)
		{
			Msg = Msg + string + "Agree to terms and condition";
		}
		if(How_many_boats_would_you_like_to_insure == null || How_many_boats_would_you_like_to_insure == "")
		{
			Msg = Msg + string + "How many boat would you like to insure";
		}
		if(Please_select_the_province_your_boat_is_used_in == null || Please_select_the_province_your_boat_is_used_in == "")
		{
			Msg = Msg + string + "Please select the province your boat is used in";
		}
		if(Where_Did_You_Find_Us == null || Where_Did_You_Find_Us == "")
		{
			Msg = Msg + string + "Where did you find us";
		}
		if(Where_Did_You_Find_Us != null && Where_Did_You_Find_Us != "")
		{
			if(Where_Did_You_Find_Us == "Friend or Family")
			{
				if(Name == "" || Name == null)
				{
					Msg = Msg + string + "Name of Friend/Family";
				}
			}
			if(Where_Did_You_Find_Us == "Dealership")
			{
				if(Name_of_Dealership == "" || Name_of_Dealership == null)
				{
					Msg = Msg + string + "Name of Dealership";
				}
			}
			if(Where_Did_You_Find_Us == "Campground")
			{
				if(Name_of_Campground == "" || Name_of_Campground == null)
				{
					Msg = Msg + string + "Name of Campground";
				}
			}
			if(Where_Did_You_Find_Us == "Marina")
			{
				if(Name_of_Marina == "" || Name_of_Marina == null)
				{
					Msg = Msg + string + "Name of Marina";
				}
			}
			if(Where_Did_You_Find_Us == "Other")
			{
				if(Tell_us_more == "" || Tell_us_more == null)
				{
					Msg = Msg + string + "Tell us more";
				}
			}
		}
		if(Are_there_any_additional_names_on_the_boat_ownership == null || Are_there_any_additional_names_on_the_boat_ownership == "")
		{
			Msg = Msg + string + "Are there any addition names on the boat ownership";
		}
		if(Are_there_any_additional_names_on_the_boat_ownership == "Yes")
		{
			if(Additional_Names == null)
			{
				Msg = Msg + string + "Atlease add one addition insured maximum 2 allowed";
			}
		}
		if(Msg != "")
		{
			alert "Following details are missing \n" + Msg + " - please check and retry.";
			cancel submit;
		}
	}
	