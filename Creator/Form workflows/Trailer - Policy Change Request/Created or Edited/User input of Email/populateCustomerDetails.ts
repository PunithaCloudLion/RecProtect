if(input.Email_Validation == false)
	{
		input.Email_Validation = true;
		input.Email = input.Email.toLowerCase();
	}
	else
	{
		input.Email_Validation = false;
	}
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
	// //-----------------Code Added By vasanth on 10/5/2024---------------------
	// else
	// {
	if(input.Email != "" && input.Email != null)
	{
		emailValue = input.Email.toLowerCase();
		search_customer = Customer[Email == emailValue];
		if(search_customer.count() == 0)
		{
			input.Link_Customer = false;
			input.Customer_ID = null;
			input.Where_Did_You_Find_Us = null;
			input.Date_of_Birth = null;
			input.Phone_Number = "";
			input.Country = "";
			input.Address = "";
			input.Province = "";
			input.City = "";
			input.Postal_code_ZIP_Code = "";
		}
	}
	else
	{
		input.Link_Customer = false;
		input.Customer_ID = null;
		input.Insured_First_Name = "";
		input.Insured_Middle_Name = "";
		input.Insured_Last_Name = "";
		input.Where_Did_You_Find_Us = null;
		input.Date_of_Birth = null;
		input.Phone_Number = "";
		input.Country = "";
		input.Address = "";
		input.Province = "";
		input.City = "";
		input.Postal_code_ZIP_Code = "";
	}
	//}
	// /*if(input.Date_of_Birth != null)
	// 						{
	// 							fetchCustomers = Customer[DOB == input.Date_of_Birth];
	// 							if(fetchCustomers.count() > 0)
	// 							{
	// 								input.Date_of_Birth = fetchCustomers.DOB;
	// 								input.Where_Did_You_Find_Us = fetchCustomers.Where_Did_You_Find_Us;
	// 							}
	// 							else
	// 							{
	// 								input.Date_of_Birth = null;
	// 								input.Where_Did_You_Find_Us = null;
	// 							}
	// 						}
	// 						else
	// 						{
	// 							input.Date_of_Birth = null;
	// 							input.Where_Did_You_Find_Us = null;
	// 						}*/
	// // if(input.Auto_Populate == "")
	// // {
	// // 	input.Auto_Populate = "Email";
	// if(input.Customer_ID == null)
	// {
	// 	if(input.Email != "")
	// 	{
	// 		if(input.Insured_First_Name != "" && input.Insured_Last_Name != "")
	// 		{
	// 			info "hi";
	// 			fetchCustomers = Customer[Email == input.Email && First_Name == input.Insured_First_Name && Last_Name == input.Insured_Last_Name];
	// 			if(fetchCustomers.count() > 0)
	// 			{
	// 				info "customer" + fetchCustomers;
	// 				input.Customer_ID = fetchCustomers.ID;
	// 				//			input.Insured_First_Name = fetchCustomers.First_Name;
	// 				//			input.Insured_Last_Name = fetchCustomers.Last_Name;
	// 				input.Date_of_Birth = fetchCustomers.DOB;
	// 				//			input.Phone_Number = fetchCustomers.Phone_Number;
	// 				input.Where_Did_You_Find_Us = fetchCustomers.Where_Did_You_Find_Us;
	// 				disable Customer_ID;
	// 				// 	disable Insured_First_Name;
	// 				// 	disable Insured_Last_Name;
	// 				disable Date_of_Birth;
	// 				disable Phone_Number;
	// 				disable Where_Did_You_Find_Us;
	// 			}
	// 			else
	// 			{
	// 				info "no";
	// 				//input.Customer_ID = null;
	// 				enable Customer_ID;
	// 				// 				enable Insured_First_Name;
	// 				// 				enable Insured_Last_Name;
	// 				enable Date_of_Birth;
	// 				enable Phone_Number;
	// 				enable Where_Did_You_Find_Us;
	// 			}
	// 		}
	// 		else
	// 		{
	// 			info "no";
	// 			//input.Customer_ID = null;
	// 			enable Customer_ID;
	// 			// 			enable Insured_First_Name;
	// 			// 			enable Insured_Last_Name;
	// 			enable Date_of_Birth;
	// 			enable Phone_Number;
	// 			enable Where_Did_You_Find_Us;
	// 		}
	// 	}
	// 	else
	// 	{
	// 		info "no suct";
	// 		//input.Customer_ID = null;
	// 		enable Customer_ID;
	// 		// 		enable Insured_First_Name;
	// 		// 		enable Insured_Last_Name;
	// 		enable Date_of_Birth;
	// 		enable Phone_Number;
	// 		enable Where_Did_You_Find_Us;
	// 	}
	// }
	// // 	else
	// // 	{
	// // 		if(input.Email != "")
	// // 		{
	// // 			if(input.Insured_First_Name != "" && input.Insured_Last_Name != "")
	// // 			{
	// // 				info "hi";
	// // 				fetchCustomers = Customer[Email == input.Email && First_Name == input.Insured_First_Name && Last_Name == input.Insured_Last_Name];
	// // 				if(fetchCustomers.count() > 0)
	// // 				{
	// // 					info "customer" + fetchCustomers;
	// // 					input.Customer_ID = fetchCustomers.ID;
	// // 					//			input.Insured_First_Name = fetchCustomers.First_Name;
	// // 					//			input.Insured_Last_Name = fetchCustomers.Last_Name;
	// // 					input.Date_of_Birth = fetchCustomers.DOB;
	// // 					//input.Phone_Number = fetchCustomers.Phone_Number;
	// // 					input.Where_Did_You_Find_Us = fetchCustomers.Where_Did_You_Find_Us;
	// // 					disable Customer_ID;
	// // 					// 				disable Insured_First_Name;
	// // 					// 				disable Insured_Last_Name;
	// // 					disable Date_of_Birth;
	// // 					disable Phone_Number;
	// // 					disable Where_Did_You_Find_Us;
	// // 				}
	// // 				else
	// // 				{
	// // 					info "no";
	// // 					input.Customer_ID = null;
	// // 					enable Customer_ID;
	// // 					// 				enable Insured_First_Name;
	// // 					// 				enable Insured_Last_Name;
	// // 					enable Date_of_Birth;
	// // 					enable Phone_Number;
	// // 					enable Where_Did_You_Find_Us;
	// // 				}
	// // 			}
	// // 			else
	// // 			{
	// // 				info "no";
	// // 				input.Customer_ID = null;
	// // 				enable Customer_ID;
	// // 				// 			enable Insured_First_Name;
	// // 				// 			enable Insured_Last_Name;
	// // 				enable Date_of_Birth;
	// // 				enable Phone_Number;
	// // 				enable Where_Did_You_Find_Us;
	// // 			}
	// // 		}
	// // 		else
	// // 		{
	// // 			// 		info "no suct";
	// // 			// 		input.Customer_ID = null;
	// // 			// 		enable Customer_ID;
	// // 			// // 		enable Insured_First_Name;
	// // 			// // 		enable Insured_Last_Name;
	// // 			// 		enable Date_of_Birth;
	// // 			// 		enable Phone_Number;
	// // 			// 		enable Where_Did_You_Find_Us;
	// // 		}
	// // 	}
	// // }
	// // input.Auto_Populate = "";
	