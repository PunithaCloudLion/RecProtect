void CRM.Customer_Generic_Sync(int recid, string process)
{
	try 
	{
		if(process == "Trailer")
		{
			thisapp.Developer.addActivityLog("Customer Generic Function(CRM.Customer_Generic_Sync)--" + recid.toString(),"Trailer - Customer_Generic_Sync--" + recid.toString(),"Start","");
			getTrailer = TrailerQuote[ID == recid];
			//---------------- Contact/Lead Infromation Checking ----------------
			Search_recLeads = zoho.crm.searchRecords("Leads","(Email:equals:" + getTrailer.Email + ")");
			Search_recCusomer = zoho.crm.searchRecords("Contacts","(Email:equals:" + getTrailer.Email + ")");
			thisapp.Developer.addActivityLog("Customer Generic Function(CRM.Customer_Generic_Sync) --" + recid.toString(),"Trailer - Customer Generic Function","Search in CRM","Lead--" + Search_recLeads + "or Customer--" + Search_recCusomer);
			getCustomer = Customer[ID == getTrailer.Customer_ID];
			if(Search_recLeads.size() == 0 && Search_recCusomer.size() == 0)
			{
				if(getTrailer.Quote_Status == "Completed")
				{
					// 					info "yes";
					thisapp.CRM.CustomertoContactCrmSyncCreate(getCustomer.ID);
				}
				else
				{
					thisapp.CRM.Customer_to_Lead_Sync_Create(getCustomer.ID,"Trailer");
				}
			}
			else
			{
				if(Search_recCusomer.size() == 0)
				{
					if(Search_recLeads.size() > 0)
					{
						if(getTrailer.Quote_Status == "Completed")
						{
							// 							info "yes";
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
								// 								customerMap.put("Workdrive_URL",fetchCustomers.Workdrive_URL);
								// 								customerMap.put("Workdrive_Folder_ID",fetchCustomers.Workdrive_Folder_ID);
								customerMap.put("Zoho_Creator_ID",fetchCustomers.ID.tostring());
								resp = zoho.crm.convertLead(getCustomer.Zoho_Crm_ID.toLong(),customerMap);
								thisapp.Developer.addActivityLog("Customer Generic Function(CRM.Customer_Generic_Sync) -- " + recid.toString(),"Trailer - Convert Lead to Deal resposne",customerMap.toString(),resp.toString());
								//	info resp;
								getCustomer.Zoho_Crm_ID=resp.get("Contacts").tostring();
								getCustomer.Customer_Type="Contact";
								dealMap = Map();
								dealMap.put("Contact_Name",getCustomer.Zoho_Crm_ID.tolong());
								updateres = zoho.crm.updateRecord("Deals",getTrailer.Zoho_Crm_ID.tolong(),dealMap);
								//		info updateres;
							}
						}
						else
						{
							thisapp.CRM.Customer_to_Lead_Sync_Update(getCustomer.ID,"Trailer");
						}
					}
				}
				else
				{
					thisapp.CRM.CustomertoContactCrmSyncUpdate(getCustomer.ID,Search_recCusomer.get(0).get("id").toLong());
				}
			}
			//---------------- Contact/Lead Infromation End ----------------
		}
		if(process == "Boat")
		{
			thisapp.Developer.addActivityLog("Customer Generic Function(CRM.Customer_Generic_Sync) -- " + recid.toString(),"Boat - Customer_Generic_Sync--" + recid.toString(),"Start","");
			getBoat = BoatQuote[ID == recid];
			//---------------- Contact/Lead Infromation Checking ----------------
			Search_recLeads = zoho.crm.searchRecords("Leads","(Email:equals:" + getBoat.Email + ")");
			Search_recCusomer = zoho.crm.searchRecords("Contacts","(Email:equals:" + getBoat.Email + ")");
			thisapp.Developer.addActivityLog("Customer Generic Function(CRM.Customer_Generic_Sync) -- " + recid.toString(),"Boat - Customer Generic Function","Search in CRM","Lead--" + Search_recLeads + "or Customer--" + Search_recCusomer);
			getCustomer = Customer[ID == getBoat.Customer_ID];
			if(Search_recLeads.size() == 0 && Search_recCusomer.size() == 0)
			{
				if(getBoat.Quote_Status == "Completed")
				{
					// 					info "yes";
					thisapp.CRM.CustomertoContactCrmSyncCreate(getCustomer.ID);
				}
				else
				{
					thisapp.CRM.Customer_to_Lead_Sync_Create(getCustomer.ID,"Boat");
				}
			}
			else
			{
				if(Search_recCusomer.size() == 0)
				{
					if(Search_recLeads.size() > 0)
					{
						if(getBoat.Quote_Status == "Completed")
						{
							// 							info "yes";
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
								customerMap.put("Zoho_Creator_ID",fetchCustomers.ID.tostring());
								resp = zoho.crm.convertLead(getCustomer.Zoho_Crm_ID.toLong(),customerMap);
								thisapp.Developer.addActivityLog("Customer Generic Function(CRM.Customer_Generic_Sync) -- " + recid.toString(),"Boat - Convert Lead to Deal resposne",customerMap.toString(),resp.toString());
								//	info resp;
								getCustomer.Zoho_Crm_ID=resp.get("Contacts").tostring();
								getCustomer.Customer_Type="Contact";
								dealMap = Map();
								dealMap.put("Contact_Name",getCustomer.Zoho_Crm_ID.tolong());
								updateres = zoho.crm.updateRecord("Deals",getBoat.Zoho_Crm_ID.tolong(),dealMap);
								// 								info updateres;
							}
						}
						else
						{
							thisapp.CRM.Customer_to_Lead_Sync_Update(getCustomer.ID,"Boat");
						}
					}
				}
				else
				{
					thisapp.CRM.CustomertoContactCrmSyncUpdate(getCustomer.ID,Search_recCusomer.get(0).get("id").toLong());
				}
			}
			//---------------- Contact/Lead Infromation End ----------------
		}
		thisapp.Developer.addActivityLog("Customer Generic Function(CRM.Customer_Generic_Sync) -- " + recid.toString(),"Function Call End","","");
	}
	catch (e)
	{
		thisapp.Developer.addDeveloperLog("Customer Generic Function(CRM.Customer_Generic_Sync) -- " + recid.toString(),"Customer_Generic_Sync:" + recid.toString(),"Customer Sync in CRM for both Lead and Customer Scenario and Lead Convert Sync","Customer ID--" + getCustomer.toString(),e,"Creator");
	}
}