// 	if(input.Email == "" && input.Insured_First_Name == "" && input.Insured_Last_Name == "")
// 	{
if(input.Link_Customer == false)
	{
		if(input.Customer_ID != null)
		{
			fetchCuatomers = Customer[ID == input.Customer_ID];
			if(fetchCuatomers.count() > 0)
			{
				input.Insured_First_Name = fetchCuatomers.First_Name;
				input.Insured_Last_Name = fetchCuatomers.Last_Name;
				input.Email = fetchCuatomers.Email;
				input.Phone_Number = fetchCuatomers.Phone_Number;
				input.Date_of_Birth = fetchCuatomers.DOB;
				input.Where_Did_You_Find_Us = fetchCuatomers.Where_Did_You_Find_Us;
				disable Insured_First_Name;
				disable Insured_Last_Name;
				//disable Email;
				disable Phone_Number;
				disable Date_of_Birth;
				disable Where_Did_You_Find_Us;
			}
			else
			{
				input.Insured_First_Name = "";
				input.Insured_Last_Name = "";
				input.Email = null;
				input.Phone_Number = null;
				input.Date_of_Birth = null;
				input.Where_Did_You_Find_Us = null;
				enable Insured_First_Name;
				enable Insured_Last_Name;
				enable Email;
				enable Phone_Number;
				enable Date_of_Birth;
				enable Where_Did_You_Find_Us;
			}
			// 		}
		}
		else
		{
			input.Insured_First_Name = "";
			input.Insured_Last_Name = "";
			input.Email = null;
			input.Phone_Number = null;
			input.Date_of_Birth = null;
			input.Where_Did_You_Find_Us = null;
			enable Insured_First_Name;
			enable Insured_Last_Name;
			enable Email;
			enable Phone_Number;
			enable Date_of_Birth;
			enable Where_Did_You_Find_Us;
			input.Link_Customer = false;
		}
	}
	else
	{
		input.Link_Customer = false;
		if(input.Customer_ID != null)
		{
			fetchCuatomers = Customer[ID == input.Customer_ID];
			if(fetchCuatomers.count() > 0)
			{
				input.Insured_First_Name = fetchCuatomers.First_Name;
				input.Insured_Last_Name = fetchCuatomers.Last_Name;
				input.Email = fetchCuatomers.Email;
				input.Phone_Number = fetchCuatomers.Phone_Number;
				input.Date_of_Birth = fetchCuatomers.DOB;
				input.Where_Did_You_Find_Us = fetchCuatomers.Where_Did_You_Find_Us;
				disable Insured_First_Name;
				disable Insured_Last_Name;
				//disable Email;
				disable Phone_Number;
				disable Date_of_Birth;
				disable Where_Did_You_Find_Us;
			}
		}
	}
	//	}
	// 	else 
	// 	{
	// 		if(input.Customer_ID != null)
	// 	{
	// 		fetchCuatomers = Customer[ Email == input.Email && First_Name == input.Insured_First_Name && Last_Name == input.Insured_Last_Name];
	// 		if(fetchCuatomers.count() > 0)
	// 		{
	// 			input.Insured_First_Name = fetchCuatomers.First_Name;
	// 			input.Insured_Last_Name = fetchCuatomers.Last_Name;
	// 			input.Email = fetchCuatomers.Email;
	// 			input.Phone_Number = fetchCuatomers.Phone_Number;
	// 			input.Date_of_Birth = fetchCuatomers.DOB;
	// 			input.Where_Did_You_Find_Us = fetchCuatomers.Where_Did_You_Find_Us;
	// // 			disable Insured_First_Name;
	// // 			disable Insured_Last_Name;
	// 	// 		disable Email;
	// 			disable Phone_Number;
	// 			disable Date_of_Birth;
	// 			disable Where_Did_You_Find_Us;
	// 		}
	// 		else
	// 		{
	// 			input.Insured_First_Name = "";
	// 			input.Insured_Last_Name = "";
	// 			input.Email = null;
	// 			input.Phone_Number = null;
	// 			input.Date_of_Birth = null;
	// 			input.Where_Did_You_Find_Us = null;
	// 			enable Insured_First_Name;
	// 			enable Insured_Last_Name;
	// 			enable Email;
	// 			enable Phone_Number;
	// 			enable Date_of_Birth;
	// 			enable Where_Did_You_Find_Us;
	// 		}
	// 	}
	// 	else
	// 	{
	// // 	if ( input.Email != "" && input.Insured_First_Name != "" && input.Insured_Last_Name != "") 
	// //     {
	// // fetchCuatomers = Customer[ID == input.Customer_ID];
	// // 	if(fetchCuatomers.count() > 0)
	// // 	{
	// // 		input.Insured_First_Name = fetchCuatomers.First_Name;
	// // 		input.Insured_Last_Name = fetchCuatomers.Last_Name;
	// // 		input.Email = fetchCuatomers.Email;
	// // 		input.Phone_Number = fetchCuatomers.Phone_Number;
	// // 		input.Date_of_Birth = fetchCuatomers.DOB;
	// // 		input.Where_Did_You_Find_Us = fetchCuatomers.Where_Did_You_Find_Us;
	// // // 		disable Insured_First_Name;
	// // // 		disable Insured_Last_Name;
	// // // 		disable Email;
	// // 		disable Phone_Number;
	// // 		disable Date_of_Birth;
	// // 		disable Where_Did_You_Find_Us;
	// // 	}
	// // 	else 
	// //     {
	// // 		input.Insured_First_Name = "";
	// // 	input.Insured_Last_Name = "";
	// // 	input.Email = null;
	// // 	input.Phone_Number = null;
	// // 	input.Date_of_Birth = null;
	// // 	input.Where_Did_You_Find_Us = null;
	// // 	enable Insured_First_Name;
	// // 	enable Insured_Last_Name;
	// // 	enable Email;
	// // 	enable Phone_Number;
	// // 	enable Date_of_Birth;
	// // 	enable Where_Did_You_Find_Us;
	// //     }
	// // 	}
	// // 	else 
	// //     {
	// 		input.Insured_First_Name = "";
	// 		input.Insured_Last_Name = "";
	// 		input.Email = null;
	// 		input.Phone_Number = null;
	// 		input.Date_of_Birth = null;
	// 		input.Where_Did_You_Find_Us = null;
	// 		enable Insured_First_Name;
	// 		enable Insured_Last_Name;
	// 		enable Email;
	// 		enable Phone_Number;
	// 		enable Date_of_Birth;
	// 		enable Where_Did_You_Find_Us;
	// 		}
	// 	  }
	// }
	