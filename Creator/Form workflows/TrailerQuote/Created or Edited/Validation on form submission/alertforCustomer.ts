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
			//--------------Trailer subform row count on save edit
			count = 0;
			if(input.Trailer != null)
			{
				for each  trailerInfo in input.Trailer
				{
					count = count + 1;
				}
			}
			if(input.How_many_trailers_would_you_like_to_insure == "" || input.How_many_trailers_would_you_like_to_insure == null)
			{
				alert(How_many_trailers_would_you_like_to_insure,"Please enter the value");
				cancel submit;
			}
			if(input.How_many_trailers_would_you_like_to_insure == "1" && count > 1)
			{
				alert "Sorry but only 1 row allowed in Trailer";
				cancel submit;
			}
			else if(input.How_many_trailers_would_you_like_to_insure == "2" && count > 2)
			{
				alert "Sorry but only 2 row allowed in Trailer";
				cancel submit;
			}
		}
		else
		{
			if(input.Quote_Status == "Saved")
			{
				input.Quote_Status = "In Progress";
			}
			if(input.Agree_to_terms_and_conditions == false)
			{
				alert "Please Select the Agree to terms and conditions";
				cancel submit;
			}
			if(input.Are_there_any_additional_names_on_the_trailer_ownership == "Yes")
			{
				addcount = 0;
				for each  customers in input.Additional_Names
				{
					addcount = addcount + 1;
				}
				if(addcount == 0)
				{
					alert "Please give the Additional names atleast one";
					cancel submit;
				}
			}
			if(input.Additional_Names != null)
			{
				for each  customers in input.Additional_Names
				{
					if(customers.Customer_ID == null && customers.First_Name == null || customers.Last_Name == null || customers.Email == null)
					{
						alert "Please Enter First Name";
						cancel submit;
					}
				}
			}
			count = 0;
			if(input.Trailer != null)
			{
				for each  trailerSubform in input.Trailer
				{
					count = count + 1;
					if(trailerSubform.Select_Trailer_Type == null)
					{
						alert "Please Select Trailer Type";
						cancel submit;
					}
					if(trailerSubform.Trailer_Model_Year == null)
					{
						alert "Please Select Trailer Model Year";
						cancel submit;
					}
					if(trailerSubform.Select_coverage_for_policy == null)
					{
						alert "Please Select Coverage for policy";
						cancel submit;
					}
					if(trailerSubform.Value_of_Golf_Cart_1 != null || trailerSubform.Value_of_Golf_Cart_2 != null)
					{
						if(trailerSubform.Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2 == "")
						{
							alert "Please Select Should Golf cart coverage remain same value";
							cancel submit;
						}
					}
				}
			}
			if(input.Please_select_the_province_your_trailer_is_located_in == "" || input.Please_select_the_province_your_trailer_is_located_in == null)
			{
				alert(Please_select_the_province_your_trailer_is_located_in,"Please enter the value");
				cancel submit;
			}
			if(input.How_many_trailers_would_you_like_to_insure == "" || input.How_many_trailers_would_you_like_to_insure == null)
			{
				alert(How_many_trailers_would_you_like_to_insure,"Please enter the value");
				cancel submit;
			}
			if(input.How_many_trailers_would_you_like_to_insure == "1" && count > 1)
			{
				alert "Sorry but only 1 row allowed in Trailer";
				cancel submit;
			}
			else if(input.How_many_trailers_would_you_like_to_insure == "2" && count > 2)
			{
				alert "Sorry but only 2 row allowed in Trailer";
				cancel submit;
			}
			//------------------------Insured Name Validations-------------
			if(input.Customer_ID == null)
			{
				if(input.Insured_First_Name == null || input.Insured_First_Name == "" || input.Insured_Last_Name == null || input.Insured_Last_Name == "" || input.Email == "" || input.Email == null)
				{
					alert "Insured Deatils Should not be Empty";
					cancel submit;
				}
			}
		}
	}
	