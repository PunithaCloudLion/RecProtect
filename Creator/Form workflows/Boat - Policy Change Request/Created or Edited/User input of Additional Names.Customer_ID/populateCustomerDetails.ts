if(row.Link_Customer == false)
	{
		if(row.Customer_ID != null)
		{
			fetchCustomers = Customer[ID == row.Customer_ID];
			if(fetchCustomers.count() > 0)
			{
				row.Email=fetchCustomers.Email;
				row.Additional_Insured_First_Name=fetchCustomers.First_Name;
				row.Additional_Insured_Last_Name=fetchCustomers.Last_Name;
				row.DOB=fetchCustomers.DOB;
				row.Phone_Number=fetchCustomers.Phone_Number;
				disable row.Email;
				disable row.Additional_Insured_First_Name;
				disable row.Additional_Insured_Last_Name;
				disable row.DOB;
				disable row.Phone_Number;
			}
		}
		else
		{
			row.Email=null;
			row.Additional_Insured_First_Name=null;
			row.Additional_Insured_Last_Name=null;
			row.DOB=null;
			row.Phone_Number=null;
			enable row.Email;
			enable row.Additional_Insured_First_Name;
			enable row.Additional_Insured_Last_Name;
			enable row.DOB;
			enable row.Phone_Number;
		}
	}
	else
	{
		row.Link_Customer=false;
		if(row.Customer_ID != null)
		{
			fetchCustomers = Customer[ID == row.Customer_ID];
			if(fetchCustomers.count() > 0)
			{
				row.Email=fetchCustomers.Email;
				row.Additional_Insured_First_Name=fetchCustomers.First_Name;
				row.Additional_Insured_Last_Name=fetchCustomers.Last_Name;
				row.DOB=fetchCustomers.DOB;
				row.Phone_Number=fetchCustomers.Phone_Number;
				disable row.Email;
				disable row.Additional_Insured_First_Name;
				disable row.Additional_Insured_Last_Name;
				disable row.DOB;
				disable row.Phone_Number;
			}
		}
	}
	