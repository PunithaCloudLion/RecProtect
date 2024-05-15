if(row.Link_Customer == true)
	{
		row.Link_Customer=false;
		row.DOB=null;
		row.Phone_Number="";
		enable row.Additional_Insured_First_Name;
		enable row.Additional_Insured_Last_Name;
		enable row.Email;
		enable row.Phone_Number;
	}
	