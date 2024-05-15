row.Email=row.Email.toLowerCase();
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
if(row.Email == null || row.Email == "")
{
	row.Link_Customer=false;
	row.Additional_Insured_First_Name="";
	row.Additional_Insured_Last_Name="";
	row.DOB=null;
	row.Phone_Number="";
}
// if(row.Additional_Insured_First_Name != null && row.Additional_Insured_Last_Name != null && row.Email != null)
// {
// 	fetchCustomers = Customer[Email == row.Email && First_Name == row.Additional_Insured_First_Name && Last_Name == row.Additional_Insured_Last_Name];
// 	if(fetchCustomers.count() > 0)
// 	{
// 		row.Customer_ID=fetchCustomers.ID;
// 		row.Additional_Insured_First_Name=fetchCustomers.First_Name;
// 		row.Additional_Insured_Last_Name=fetchCustomers.Last_Name;
// 		row.DOB=fetchCustomers.DOB;
// 		row.Phone_Number=fetchCustomers.Phone_Number;
// 		disable row.Customer_ID;
// 		disable row.Additional_Insured_First_Name;
// 		disable row.Additional_Insured_Last_Name;
// 		disable row.DOB;
// 		disable row.Phone_Number;
// 	}
// 	else
// 	{
// 		row.Customer_ID=null;
// 		// 		row.Additional_Insured_First_Name=null;
// 		// 		row.Additional_Insured_Last_Name=null;
// 		// 		row.DOB=null;
// 		// 		row.Phone_Number=null;
// 		enable row.Customer_ID;
// 		enable row.Additional_Insured_First_Name;
// 		enable row.Additional_Insured_Last_Name;
// 		enable row.DOB;
// 		enable row.Phone_Number;
// 	}
// }
// else
// {
// 	row.Customer_ID=null;
// 	// 	row.Additional_Insured_First_Name=null;
// 	// 	row.Additional_Insured_Last_Name=null;
// 	// 	row.DOB=null;
// 	// 	row.Phone_Number=null;
// 	enable row.Customer_ID;
// 	enable row.Additional_Insured_First_Name;
// 	enable row.Additional_Insured_Last_Name;
// 	enable row.DOB;
// 	enable row.Phone_Number;
// }
