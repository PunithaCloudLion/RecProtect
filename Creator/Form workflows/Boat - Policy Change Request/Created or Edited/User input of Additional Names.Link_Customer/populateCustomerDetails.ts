if(row.Link_Customer == true)
	{
		if(row.Email != null && row.Email != "")
		{
			emailValue = row.Email.toLowerCase();
			search_customer = Customer[Email == emailValue];
			if(search_customer.count() == 1)
			{
				row.Additional_Insured_First_Name=search_customer.First_Name;
				row.Additional_Insured_Last_Name=search_customer.Last_Name;
				row.Customer_ID=search_customer.ID;
				row.DOB=search_customer.DOB;
				row.Phone_Number=search_customer.Phone_Number;
				disable row.Additional_Insured_First_Name;
				disable row.Additional_Insured_Last_Name;
				disable row.Phone_Number;
				disable row.DOB;
			}
			else
			{
				row.Customer_ID=null;
				row.DOB=null;
				row.Phone_Number="";
				row.Additional_Insured_First_Name="";
				row.Additional_Insured_Last_Name="";
				enable row.Additional_Insured_First_Name;
				enable row.Additional_Insured_Last_Name;
				enable row.Phone_Number;
				enable row.DOB;
				row.Link_Customer=false;
			}
		}
		else
		{
			row.Customer_ID=null;
			row.DOB=null;
			row.Phone_Number="";
			row.Additional_Insured_First_Name="";
			row.Additional_Insured_Last_Name="";
			enable row.Additional_Insured_First_Name;
			enable row.Additional_Insured_Last_Name;
			enable row.Phone_Number;
			enable row.DOB;
			row.Link_Customer=false;
		}
	}
	