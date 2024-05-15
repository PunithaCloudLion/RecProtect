try 
{
	url = "https://creator.zoho.com/appbuilder/service_recprotect/quotation/workflowbuilder/Create_Sync_Quote_To_CRM_1/edit";
	/*
Code Added BY Vasanth
Modified on 06-03-2024
To Create and Update the Create Side Customer Before the Quote Sync in Server and CRM
*/
	// if(input.Created_Source == "WEBAPP")
	// {
	if(input.Source == "CREATOR")
	{
		input.Business_Source = "SalesRep";
	}
	else
	{
		if(input.Business_Source != "SalesRep")
		{
			input.Business_Source = "InHouse";
		}
	}
	// }
	if(input.Total_Tax == null)
	{
		input.Total_Tax = 0;
	}
	testCustomer = false;
	if(input.Is_This_Test_Policy == true)
	{
		testCustomer = true;
	}
	customerlist = List();
	if(input.Customer_ID != null)
	{
		fetchCustomers = Customer[ID == input.Customer_ID];
		input.Insured_First_Name = ifnull(fetchCustomers.First_Name,"");
		input.Insured_Last_Name = ifnull(fetchCustomers.Last_Name,"");
		input.Email = ifnull(fetchCustomers.Email,"");
		input.Phone_Number = ifnull(fetchCustomers.Phone_Number,"");
		input.Date_of_Birth = ifnull(fetchCustomers.DOB,null);
		input.Country = ifnull(fetchCustomers.Country,"");
		input.Address = ifnull(fetchCustomers.Address_Line1,"") + ifnull(fetchCustomers.Address_Line2,"");
		input.City = ifnull(fetchCustomers.City,"");
		input.Postal_code_ZIP_Code = ifnull(fetchCustomers.Postal_Code,"");
		input.Province = ifnull(fetchCustomers.Province,"");
		input.Where_Did_You_Find_Us = ifnull(fetchCustomers.Where_Did_You_Find_Us,"");
		input.Name_of_Dealership = ifnull(fetchCustomers.Name_of_Dealership,"");
		input.Name_of_Marina = ifnull(fetchCustomers.Name_of_Marina,"");
		input.Name_of_Campground = ifnull(fetchCustomers.Name_of_Campground,"");
		input.Tell_us_more = ifnull(fetchCustomers.Tell_us_more,"");
		input.Name = ifnull(fetchCustomers.Name,"");
		customerlist.add(fetchCustomers.ID);
	}
	else
	{
		if(input.Email != "" && input.Email != null)
		{
			fetchcustomer = Customer[Email == input.Email];
			if(fetchcustomer.count() > 0)
			{
				input.Customer_ID = fetchcustomer.ID;
				input.Insured_First_Name = ifnull(fetchcustomer.First_Name,"");
				input.Insured_Last_Name = ifnull(fetchcustomer.Last_Name,"");
				input.Email = ifnull(fetchcustomer.Email,"");
				input.Phone_Number = ifnull(fetchcustomer.Phone_Number,"");
				input.Date_of_Birth = ifnull(fetchcustomer.DOB,null);
				input.Country = ifnull(fetchcustomer.Country,"");
				input.Address = ifnull(fetchcustomer.Address_Line1,"") + ifnull(fetchcustomer.Address_Line2,"");
				input.City = ifnull(fetchcustomer.City,"");
				input.Postal_code_ZIP_Code = ifnull(fetchcustomer.Postal_Code,"");
				input.Province = ifnull(fetchcustomer.Province,"");
				input.Where_Did_You_Find_Us = ifnull(fetchcustomer.Where_Did_You_Find_Us,"");
				input.Name_of_Dealership = ifnull(fetchcustomer.Name_of_Dealership,"");
				input.Name_of_Marina = ifnull(fetchcustomer.Name_of_Marina,"");
				input.Name_of_Campground = ifnull(fetchcustomer.Name_of_Campground,"");
				input.Tell_us_more = ifnull(fetchcustomer.Tell_us_more,"");
				input.Name = ifnull(fetchcustomer.Name,"");
				customerlist.add(fetchcustomer.ID);
			}
			else
			{
				insertCustomer = insert into Customer
				[
					Email=input.Email
					First_Name=ifnull(input.Insured_First_Name,"")
					Last_Name=ifnull(input.Insured_Last_Name,"")
					Phone_Number=ifnull(input.Phone_Number,"")
					DOB=ifnull(input.Date_of_Birth,null)
					Where_Did_You_Find_Us=ifnull(input.Where_Did_You_Find_Us,"")
					Name_of_Marina=ifnull(input.Name_of_Marina,"")
					Name=ifnull(input.Name,"")
					Name_of_Dealership=ifnull(input.Name_of_Dealership,"")
					Name_of_Campground=ifnull(input.Name_of_Campground,"")
					Tell_us_more=ifnull(input.Tell_us_more,"")
					Address_Line1=ifnull(input.Address,"")
					City=ifnull(input.City,"")
					Country=ifnull(input.Country,"")
					Province=ifnull(input.Province,"")
					Postal_Code=ifnull(input.Postal_code_ZIP_Code,"")
					Tell_us_more=ifnull(input.Tell_us_more,"")
					Is_This_Test_Customer=testCustomer
					Added_User=zoho.loginuser
				];
				input.Customer_ID = insertCustomer;
				customerlist.add(insertCustomer);
			}
		}
	}
	if(input.Additional_Names != null)
	{
		for each  customers in input.Additional_Names
		{
			if(customers.Customer_ID == null)
			{
				insertCustomers = insert into Customer
				[
					Email=customers.Email
					First_Name=customers.First_Name
					Last_Name=ifnull(customers.Last_Name,"")
					Phone_Number=ifnull(customers.Phone_Number,"")
					DOB=ifnull(customers.DOB,null)
					Is_This_Test_Customer=testCustomer
					Added_User=zoho.loginuser
				];
				customers.Customer_ID=insertCustomers;
				customerlist.add(insertCustomers);
			}
			else
			{
				fetchAddCustomers = Customer[ID == customers.Customer_ID];
				if(fetchAddCustomers.count() > 0)
				{
					customers.First_Name=ifnull(fetchAddCustomers.First_Name,"");
					customers.Last_Name=ifnull(fetchAddCustomers.Last_Name,"");
					customers.Email=ifnull(fetchAddCustomers.Email,"");
					customers.Phone_Number=ifnull(fetchAddCustomers.Phone_Number,"");
					customers.DOB=ifnull(fetchAddCustomers.DOB,null);
					customerlist.add(fetchAddCustomers.ID);
				}
			}
		}
	}
	if(input.Source == "CREATOR")
	{
		//------------------------Call Server to Create and Update Customer Start-----------
		if(customerlist.size() > 0)
		{
			for each  cust in customerlist.distinct()
			{
				get_customer = Customer[ID == cust];
				if(get_customer.count() > 0)
				{
					if(get_customer.Server_Customer_ID != null && get_customer.Server_Customer_ID != "")
					{
						thisapp.Server_Side.Latest_Customer_Sync_Update(get_customer.ID);
					}
					else
					{
						thisapp.Server_Side.Latest_Customer_Sync_Create(get_customer.ID);
					}
				}
			}
		}
	}
	//------------------------Call Server to Create and Update Customer End -----------
	// --------------------- Sync Customer to CRM ------
	thisapp.CRM.Customer_Generic_Sync(input.ID,"Trailer");
	thisapp.CRM.Addition_Insured_Generic_Sync(input.ID,"Trailer");
	// --- Additional Insured CRM Sync ------
	// 		for each  customers in input.Additional_Names
	// 		{
	// 			if(!isNull(customers.Customer_ID))
	// 			{
	// 			}
	// 		}
	// --------------------- Sync Customer to CRM End------
	//-------------------------------------Sync Quote  To CRM----------------
	// 		if(input.Quote_Status == "Payment Pending")
	// 		{
	thisapp.Developer.addActivityLog("Trailer Quote On Create Success" + input.ID,"Custom Function Called to Sync with CRM","Record ID-" + input.ID,"null");
	if(input.Zoho_Crm_ID != "" && input.Zoho_Crm_ID != null)
	{
		thisapp.CRM.Sync_TrailerQuote_Update(input.ID);
	}
	else
	{
		thisapp.CRM.Sync_TrailerQuote(input.ID);
	}
	//}
	thisapp.CRM.Customer_Generic_Sync(input.ID,"Trailer");
	//------------------Combine Document---------------
	// 		thisapp.Developer.addActivityLog("Trailer Quote On Create Success","Custom Function Called to Create the Combined Documents","Record ID-" + input.ID,"null");
	//----------Upload Workdrive----------
	thisapp.Developer.addActivityLog("Trailer Quote On Create Success","Custom Function Called to Upload the Detail Page Document to the Workdrive","Record ID-" + input.ID,"Workdrive Folder Link-" + input.NB_Workdrive_Folder_Link);
	if(input.Contact_Policy_Folder_Workdrive_Folder_ID != "" && input.Contact_Policy_Folder_Workdrive_Folder_ID != null)
	{
		thisapp.Workdrive.upload_policy_pdf_to_workdrive("TrailerPolicy",input.ID);
	}
	// -------- Sync Quote to Server ------------
	if(input.Source == "CREATOR")
	{
		thisapp.Server_Side.Latest_Trailer_Quote_Sync_Create_and_Update(input.ID,"UPDATE");
	}
}
catch (e)
{
	thisapp.Developer.addDeveloperLog("Trailer Quote","Trailer Quote Create Record OnSuccess",url,input.ID.toString(),e,"Creator");
}
