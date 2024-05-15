if(row.Link_Customer == false)
	{
		if(row.Customer_ID != null)
		{
			fetchCustomers = Customer[ID == row.Customer_ID];
			row.First_Name=fetchCustomers.First_Name;
			row.Last_Name=fetchCustomers.Last_Name;
			row.Email=fetchCustomers.Email;
			row.Phone_Number=fetchCustomers.Phone_Number;
			row.DOB=fetchCustomers.DOB;
			disable row.First_Name;
			disable row.Last_Name;
			disable row.Email;
			disable row.Phone_Number;
			disable row.DOB;
		}
		else
		{
			row.First_Name=null;
			row.Last_Name=null;
			row.Email=null;
			row.Phone_Number=null;
			row.DOB=null;
			enable row.First_Name;
			enable row.Last_Name;
			enable row.Email;
			enable row.Phone_Number;
			enable row.DOB;
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
				row.First_Name=fetchCustomers.First_Name;
				row.Last_Name=fetchCustomers.Last_Name;
				row.DOB=fetchCustomers.DOB;
				row.Phone_Number=fetchCustomers.Phone_Number;
				disable row.Email;
				disable row.First_Name;
				disable row.Last_Name;
				disable row.DOB;
				disable row.Phone_Number;
			}
		}
	}
	