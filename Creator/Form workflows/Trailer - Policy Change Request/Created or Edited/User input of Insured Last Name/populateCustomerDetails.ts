//code commented by nambi on 13/05/24
// if(input.Link_Customer == true)
// {
// 	input.Link_Customer = false;
// 	input.Date_of_Birth = null;
// 	input.Phone_Number = "";
// 	input.Country = "";
// 	input.Address = "";
// 	input.Suite_Apt = "";
// 	input.City = "";
// 	input.Province = "";
// 	input.Postal_code_ZIP_Code = "";
// }
//-----------------Code Added By vasanth on 10/5/2024---------------------
if(input.Insured_First_Name != "" && input.Insured_Last_Name != "" && input.Email != "" && input.Insured_First_Name != null && input.Insured_Last_Name != null && input.Email != null)
	{
		emailValue = input.Email.toLowerCase();
		search_customer = Customer[Email == emailValue];
		if(search_customer.count() == 1)
		{
			if(search_customer.First_Name.containsIgnoreCase(input.Insured_First_Name) == false || search_customer.Last_Name.containsIgnoreCase(input.Insured_Last_Name) == false)
			{
				alert "Please Correct the Insured First Name and Last Name";
			}
		}
	}
	// if(input.Insured_Last_Name != "")
	// {
	// 	fetchCustomers = Customer[Last_Name == input.Insured_Last_Name];
	// 	if(fetchCustomers.count() > 0)
	// 	{
	// 		input.Date_of_Birth = fetchCustomers.DOB;
	// 		input.Where_Did_You_Find_Us = fetchCustomers.Where_Did_You_Find_Us;
	// 	}
	// 	else
	// 	{
	// 		input.Date_of_Birth = null;
	// 		input.Where_Did_You_Find_Us = null;
	// 	}
	// }
	// else
	// {
	// 	input.Date_of_Birth = null;
	// 	input.Where_Did_You_Find_Us = null;
	// }
	