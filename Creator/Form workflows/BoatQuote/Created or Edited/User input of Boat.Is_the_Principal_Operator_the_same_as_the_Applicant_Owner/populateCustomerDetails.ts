if(row.Is_the_Principal_Operator_the_same_as_the_Applicant_Owner == "Yes")
	{
		row.First_Name=input.Insured_First_Name;
		row.Last_Name=input.Insured_Last_Name;
		row.Date_of_Birth=input.Date_of_Birth;
		if(row.Date_of_Birth != null)
		{
			currentYear = zoho.currentdate.getYear();
			yearsBetween = currentYear - row.Date_of_Birth.getYear();
			if(yearsBetween < 20)
			{
				alert "This choice triggers a referral.";
				row.Referral_Principal_operator_20_years=true;
			}
			else
			{
				row.Referral_Principal_operator_20_years=false;
			}
			if(row.Principal_operator_s_years_of_boating_experience_with_vessels_of_a_similar_size_and_type == "0-3 Years")
			{
				if(yearsBetween < 25)
				{
					alert "This choice triggers a referral.";
					row.Referral_Principal_Operator=true;
				}
				else
				{
					row.Referral_Principal_Operator=true;
				}
			}
		}
		disable row.First_Name;
		disable row.Last_Name;
		disable row.Date_of_Birth;
	}
	else
	{
		row.Referral_Principal_operator_20_years=false;
		row.Referral_Principal_Operator=false;
		row.First_Name=null;
		row.Last_Name=null;
		row.Date_of_Birth=null;
		enable row.First_Name;
		enable row.Last_Name;
		enable row.Date_of_Birth;
	}
	