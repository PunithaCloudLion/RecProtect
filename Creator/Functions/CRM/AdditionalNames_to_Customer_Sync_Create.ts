void CRM.AdditionalNames_to_Customer_Sync_Create(int customerID)
{
	try 
	{
		thisapp.Developer.addActivityLog("Create Additional Contact(CRM.AdditionalNames_to_Customer_Sync_Create)--" + customerID.toString(),"Create Additional Contact in CRM","Funcation Call Start","");
		fetchCustomers = Customer[ID == customerID];
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
			customerMap.put("Status1","Active");
			if(fetchCustomers.Where_Did_You_Find_Us == "Friend or Family")
			{
				customerMap.put("Referral_Type","Friend or Family");
				customerMap.put("Referral_Friend",fetchCustomers.Name);
			}
			else if(fetchCustomers.Where_Did_You_Find_Us == "Dealership")
			{
				customerMap.put("Referral_Type","Dealership");
				customerMap.put("Referral_Friend",fetchCustomers.Name_of_Dealership);
			}
			else if(fetchCustomers.Where_Did_You_Find_Us == "Campground")
			{
				customerMap.put("Referral_Type","Campground");
				customerMap.put("Referral_Friend",fetchCustomers.Name_of_Campground);
			}
			else if(fetchCustomers.Where_Did_You_Find_Us == "Marina")
			{
				customerMap.put("Referral_Type","Marina");
				customerMap.put("Referral_Friend",fetchCustomers.Name_of_Marina);
			}
			else if(fetchCustomers.Where_Did_You_Find_Us == "Other")
			{
				customerMap.put("Referral_Type","Other");
				customerMap.put("Referral_Friend",fetchCustomers.Tell_us_more);
			}
			else
			{
				customerMap.put("Referral_Friend",fetchCustomers.Where_Did_You_Find_Us);
			}
			// 			customerMap.put("Workdrive_Folder_ID",fetchCustomers.Workdrive_Folder_ID);
			// 			customerMap.put("Workdrive_URL",fetchCustomers.Workdrive_URL);
			// 			customerMap.put("Referral_Type","Active");
			customerMap.put("Zoho_Creator_ID",fetchCustomers.ID.tostring());
			if(fetchCustomers.Zoho_Crm_ID == null || fetchCustomers.Zoho_Crm_ID == "")
			{
				createRes = zoho.crm.createRecord("Contacts",customerMap,{"trigger":{"workflow"}});
				thisapp.Developer.addActivityLog("Create Additional Contact(CRM.AdditionalNames_to_Customer_Sync_Create)--" + customerID.toString(),"Create Additional Contact in CRM API Call Response",customerMap.toString(),createRes.toString());
				fetchCustomers.Zoho_Crm_ID=createRes.get("id").tostring();
				fetchCustomers.Customer_Type="Contact";
			}
		}
		thisapp.Developer.addActivityLog("Create Additional Contact(CRM.AdditionalNames_to_Customer_Sync_Create)--" + customerID.toString(),"Create Additional Contact in CRM","Funcation Call End","");
	}
	catch (e)
	{
		thisapp.Developer.addDeveloperLog("Customer","Create Additional Contact(CRM.AdditionalNames_to_Customer_Sync_Create)--" + customerID.toString(),"Create Additional Contact Error Response","",e,"creator");
	}
}