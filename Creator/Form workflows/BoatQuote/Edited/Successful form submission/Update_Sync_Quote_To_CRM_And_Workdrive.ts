try 
{
	url = "https://creator.zoho.com/appbuilder/service_recprotect/quotation/workflowbuilder/Update_Sync_Quote_To_CRM_/edit";
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
	//}
	if(input.Is_This_Test_Policy == true)
	{
		testCustomer = true;
	}
	else
	{
		testCustomer = false;
	}
	customerlist = List();
	if(input.Customer_ID != null)
	{
		fetchCustomers = Customer[ID == input.Customer_ID];
		if(fetchCustomers.count() > 0)
		{
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
				input.Country = ifnull(fetchcustomer.Country,null);
				input.Address = ifnull(fetchcustomer.Address_Line1,"") + ifnull(fetchcustomer.Address_Line2,"");
				input.City = ifnull(fetchcustomer.City,"");
				input.Postal_code_ZIP_Code = ifnull(fetchcustomer.Postal_Code,"");
				input.Province = ifnull(fetchcustomer.Province,null);
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
					Added_User=zoho.loginuser
				];
				input.Customer_ID = insertCustomer;
				customerlist.add(insertCustomer);
			}
		}
	}
	// ------ Additional Infromation Subform Data -----
	if(input.Additional_Names != null)
	{
		for each  customers in input.Additional_Names
		{
			if(customers.Customer_ID == null)
			{
				insertCustomers = insert into Customer
				[
					Email=customers.Email
					First_Name=ifnull(customers.Additional_Insured_First_Name,"")
					Last_Name=ifnull(customers.Additional_Insured_Last_Name,"")
					Phone_Number=ifnull(customers.Phone_Number,"")
					DOB=ifnull(customers.DOB,null)
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
					customers.Additional_Insured_First_Name=ifnull(fetchAddCustomers.First_Name,"");
					customers.Additional_Insured_Last_Name=ifnull(fetchAddCustomers.Last_Name,"");
					customers.Email=ifnull(fetchAddCustomers.Email,"");
					customers.Phone_Number=ifnull(fetchAddCustomers.Phone_Number,"");
					customers.DOB=ifnull(fetchAddCustomers.DOB,null);
					customerlist.add(fetchAddCustomers.ID);
				}
			}
		}
	}
	//------------------------Call Server to Create and Update Customer Start-----------
	if(input.Source == "CREATOR")
	{
		if(customerlist.size() > 0)
		{
			for each  cust in customerlist
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
	thisapp.CRM.Customer_Generic_Sync(input.ID,"Boat");
	thisapp.CRM.Addition_Insured_Generic_Sync(input.ID,"Boat");
	// --- Additional Insured CRM Sync ------
	// 	for each  customers in input.Additional_Names
	// 	{
	// 		if(!isNull(customers.Customer_ID))
	// 		{
	// 			thisapp.CRM.AdditionalNames_to_Lead_Sync_Create(customers.Customer_ID,"Boat");
	// 		}
	// 	}
	// --------------------- Sync Customer to CRM End------
	//-----------------Sync To CRM----------------
	thisapp.Developer.addActivityLog("Boat Quote On Edit Success---" + input.ID,"Custom Function Called to Sync with CRM","Record ID-" + input.ID,"null");
	// 	if(input.Quote_Status == "Payment Pending" || input.Quote_Status == "Completed" || input.Quote_Status == "Return To Payment")
	if(input.Quote_Status == "Payment Pending" || input.Quote_Status == "Completed" || input.Quote_Status == "Return To Payment" || input.Quote_Status == "In Progress" || input.Quote_Status == "Referral" || input.Quote_Status == "Saved" || input.Quote_Status == "Return to Broker")
	{
		if(input.Zoho_Crm_ID != "" && input.Zoho_Crm_ID != null)
		{
			thisapp.CRM.Sync_BoatQuote_Update(input.ID);
		}
		else
		{
			thisapp.CRM.Sync_BoatQuote(input.ID);
		}
		getTransactionTableDet = Transaction_Table[Creator_Quotation_ID == input.ID.toString() && Business_Process == "New Business"];
		if(input.Quote_Status == "Completed" && getTransactionTableDet.count() == 0)
		{
			//----------------Combined Document---------
			thisapp.Developer.addActivityLog("Boat Quote On Edit Success-- " + input.ID,"Custom Function Called to Create the Combined Documents","Record ID-" + input.ID,"null");
			thisapp.Generic_Functions.New_Buisness_Payment_Transaction(input.ID,"Boat");
			//-------Callled this function after invoice & payment received creation ------
			// 			thisapp.Combine_Document.Boat_Policy(input.ID);
		}
		// --- Call Generic Function -- To convert lead into contact and update the contact lookup in deal ----
		//	thisapp.CRM.Customer_Generic_Sync(input.ID,"Boat");
	}
	//----------Upload Workdrive----------
	thisapp.Developer.addActivityLog("Boat Quote On Edit Success --- " + input.ID,"Custom Function Called to Upload the Detail Page Document to the Workdrive","Record ID-" + input.ID,"Workdrive Folder Link-" + input.Contact_Policy_Folder_Workdrive_Link);
	if(input.Contact_Policy_Folder_Workdrive_Folder_ID != "" && input.Contact_Policy_Folder_Workdrive_Folder_ID != null)
	{
		thisapp.Workdrive.upload_policy_pdf_to_workdrive("BoatPolicy",input.ID);
	}
	//--------server side-----------
	//---------server side-----------
	if(input.Source == "CREATOR")
	{
		thisapp.Server_Side.Latest_Boat_Quote_Sync_Create_and_Update(input.ID,"UPDATE");
	}
}
catch (e)
{
	thisapp.Developer.addDeveloperLog("Boat Quote--- " + input.ID,"Boat Quote Edit Record OnSuccess",url,input.ID.toString(),e,"Creator");
}