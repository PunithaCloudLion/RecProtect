void CRM.Addition_Insured_Generic_Sync(int recid, string process)
{
	try 
	{
		if(process == "Trailer")
		{
			thisapp.Developer.addActivityLog("CRM.Addition_Insured_Generic_Sync-- Process" + process + "Quotation" + recid.toString(),"Search Additional contacts in Crm--" + recid.toString(),"Start","");
			trailerInfo = TrailerQuote[ID == recid];
			if(trailerInfo.Additional_Names != null)
			{
				for each  getTrailer in trailerInfo.Additional_Names
				{
					//---------------- Contact/Lead Infromation Checking ----------------
					Search_recLeads = zoho.crm.searchRecords("Leads","(Email:equals:" + getTrailer.Email + ")");
					Search_recCusomer = zoho.crm.searchRecords("Contacts","(Email:equals:" + getTrailer.Email + ")");
					thisapp.Developer.addActivityLog("Creator","Additional_Insuered_Generic_Sync--" + recid.toString(),"Search in CRM","Lead--" + Search_recLeads + "or Customer--" + Search_recCusomer);
					getCustomer = Customer[ID == getTrailer.Customer_ID];
					if(Search_recLeads.size() == 0 && Search_recCusomer.size() == 0)
					{
						if(trailerInfo.Quote_Status == "Completed")
						{
							thisapp.CRM.AdditionalNames_to_Customer_Sync_Create(getCustomer.ID);
						}
						else
						{
							thisapp.CRM.AdditionalNames_to_Lead_Sync_Create(getCustomer.ID,"Trailer");
						}
					}
					else
					{
						if(Search_recCusomer.size() == 0)
						{
							if(Search_recLeads.size() > 0)
							{
								if(trailerInfo.Quote_Status == "Completed")
								{
									fetchCustomers = Customer[ID == getCustomer.ID];
									if(fetchCustomers.count() > 0)
									{
										fetchLayout = Layout[Layout_Name == "Client Layout"];
										//client Layout
										customerMap = Map();
										layoutid = Map();
										layoutid.put("id",fetchLayout.Layout_ID.tolong());
										customerMap.put("Layout",layoutid);
										customerMap.put("First_Name",fetchCustomers.First_Name);
										customerMap.put("Last_Name",fetchCustomers.Last_Name);
										customerMap.put("Date_of_Birth",fetchCustomers.DOB);
										customerMap.put("Phone",fetchCustomers.Phone_Number);
										customerMap.put("Email",fetchCustomers.Email);
										customerMap.put("Mailing_Address",fetchCustomers.Address_Line1);
										customerMap.put("Mailing_Street",fetchCustomers.Address_Line2);
										customerMap.put("Mailing_City",fetchCustomers.City);
										customerMap.put("Mailing_Country",fetchCustomers.Country);
										customerMap.put("Mailing_State",fetchCustomers.Province);
										customerMap.put("Mailing_Zip",fetchCustomers.Postal_Code);
										customerMap.put("Workdrive_URL",fetchCustomers.Workdrive_URL);
										customerMap.put("Workdrive_Folder_ID",fetchCustomers.Workdrive_Folder_ID);
										customerMap.put("Zoho_Creator_ID",fetchCustomers.ID.tostring());
										resp = zoho.crm.convertLead(getCustomer.Zoho_Crm_ID.toLong(),customerMap);
										thisapp.Developer.addActivityLog("Creator","Customer_Generic_Sync--" + recid.toString(),"Convert in CRM--" + customerMap,"Resp--" + resp);
										getCustomer.Zoho_Crm_ID=resp.get("Contacts").tostring();
										getCustomer.Customer_Type="Contact";
									}
								}
								else
								{
									thisapp.CRM.AdditionalNames_to_Lead_Sync_Update(getCustomer.ID,"Trailer");
								}
							}
						}
						else
						{
							thisapp.CRM.AdditionalNames_to_Customer_Sync_Update(getCustomer.ID);
						}
					}
				}
				thisapp.Developer.addActivityLog("CRM.Addition_Insured_Generic_Sync-- Process" + process + "Quotation" + recid.toString(),"Search Additional contacts in Crm--" + recid.toString(),"END","");
			}
			//---------------- Contact/Lead Infromation End ----------------
		}
		if(process == "Boat")
		{
			thisapp.Developer.addActivityLog("CRM.Addition_Insured_Generic_Sync-- Process" + process + "Quotation" + recid.toString(),"Search Additional contacts in Crm--" + recid.toString(),"Start","");
			boatInfo = BoatQuote[ID == recid];
			if(boatInfo.Additional_Names != null)
			{
				for each  getBoat in boatInfo.Additional_Names
				{
					//---------------- Contact/Lead Infromation Checking ----------------
					Search_recLeads = zoho.crm.searchRecords("Leads","(Email:equals:" + getBoat.Email + ")");
					Search_recCusomer = zoho.crm.searchRecords("Contacts","(Email:equals:" + getBoat.Email + ")");
					thisapp.Developer.addActivityLog("Creator","Additional_Insuered_Generic_Sync--" + recid.toString(),"Search in CRM","Lead--" + Search_recLeads + "or Customer--" + Search_recCusomer);
					getCustomer = Customer[ID == getBoat.Customer_ID];
					if(Search_recLeads.size() == 0 && Search_recCusomer.size() == 0)
					{
						if(boatInfo.Quote_Status == "Completed")
						{
							thisapp.CRM.AdditionalNames_to_Customer_Sync_Create(getCustomer.ID);
						}
						else
						{
							thisapp.CRM.AdditionalNames_to_Lead_Sync_Create(getCustomer.ID,"Boat");
						}
					}
					else
					{
						if(Search_recCusomer.size() == 0)
						{
							if(Search_recLeads.size() > 0)
							{
								if(boatInfo.Quote_Status == "Completed")
								{
									fetchCustomers = Customer[ID == getCustomer.ID];
									if(fetchCustomers.count() > 0)
									{
										fetchLayout = Layout[Layout_Name == "Client Layout"];
										//client Layout
										customerMap = Map();
										layoutid = Map();
										layoutid.put("id",fetchLayout.Layout_ID.tolong());
										customerMap.put("Layout",layoutid);
										customerMap.put("First_Name",fetchCustomers.First_Name);
										customerMap.put("Last_Name",fetchCustomers.Last_Name);
										customerMap.put("Date_of_Birth",fetchCustomers.DOB);
										customerMap.put("Phone",fetchCustomers.Phone_Number);
										customerMap.put("Email",fetchCustomers.Email);
										customerMap.put("Mailing_Address",fetchCustomers.Address_Line1);
										customerMap.put("Mailing_Street",fetchCustomers.Address_Line2);
										customerMap.put("Mailing_City",fetchCustomers.City);
										customerMap.put("Mailing_Country",fetchCustomers.Country);
										customerMap.put("Mailing_State",fetchCustomers.Province);
										customerMap.put("Mailing_Zip",fetchCustomers.Postal_Code);
										customerMap.put("Workdrive_URL",fetchCustomers.Workdrive_URL);
										customerMap.put("Workdrive_Folder_ID",fetchCustomers.Workdrive_Folder_ID);
										customerMap.put("Zoho_Creator_ID",fetchCustomers.ID.tostring());
										resp = zoho.crm.convertLead(getCustomer.Zoho_Crm_ID.toLong(),customerMap);
										thisapp.Developer.addActivityLog("Creator","Customer_Generic_Sync--" + recid.toString(),"Convert in CRM--" + customerMap,"Resp--" + resp);
										getCustomer.Zoho_Crm_ID=resp.get("Contacts").tostring();
										getCustomer.Customer_Type="Contact";
									}
								}
								else
								{
									thisapp.CRM.AdditionalNames_to_Lead_Sync_Update(getCustomer.ID,"Boat");
								}
							}
						}
						else
						{
							thisapp.CRM.AdditionalNames_to_Customer_Sync_Update(getCustomer.ID);
						}
					}
				}
				thisapp.Developer.addActivityLog("CRM.Addition_Insured_Generic_Sync-- Process" + process + "Quotation" + recid.toString(),"Search Additional contacts in Crm--" + recid.toString(),"END","");
			}
			//---------------------
		}
	}
	catch (e)
	{
		info e;
		thisapp.Developer.addDeveloperLog("Customer Generic Function(CRM.Customer_Generic_Sync) -- Process" + process + " Quotation" + recid.toString(),"Customer_Generic_Sync:" + recid.toString(),"Additional Customer Sync in CRM for both Lead and Customer Scenario and Lead Convert Sync","",e,"Creator");
	}
}