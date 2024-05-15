void CRM.Customer_to_Lead_Sync_Create(int cusID, string leadFor)
{
	try 
	{
		thisapp.Developer.addActivityLog("Create Lead(CRM.Customer_to_Lead_Sync_Create)--" + cusID.toString(),"Create Lead in CRM -- " + leadFor,"Funcation Call Start","");
		fetch_Cust = Customer[ID == cusID];
		if(fetch_Cust.count() > 0)
		{
			dataMap = Map();
			fetchLayout = Layout[Layout_Name == "Layout 1.0"];
			//client Layout
			layoutid = Map();
			layoutid.put("id",fetchLayout.Layout_ID.tolong());
			dataMap.put("Layout",layoutid);
			fetchUsers = Users[User_Email == zoho.loginuserid].CRM_ID;
			if(fetchUsers != null)
			{
				dataMap.put("Owner",fetchUsers.tolong());
			}
			dataMap.put("Lead_Tyoe",leadFor);
			dataMap.put("Lead_Status","New Leads");
			dataMap.put("Lead_Source","Quotation Application");
			dataMap.put("First_Name",fetch_Cust.First_Name);
			dataMap.put("Last_Name",fetch_Cust.Last_Name);
			dataMap.put("Email",fetch_Cust.Email);
			dataMap.put("Phone",fetch_Cust.Phone_Number);
			dataMap.put("Province",fetch_Cust.Province);
			dataMap.put("Address_Line_1",fetch_Cust.Address_Line1);
			dataMap.put("Address_Line_2",fetch_Cust.Address_Line2);
			dataMap.put("City",fetch_Cust.City);
			dataMap.put("Country",fetch_Cust.Country);
			dataMap.put("Postal_Code",fetch_Cust.Postal_Code);
			dataMap.put("Date_of_Birth",fetch_Cust.DOB);
			// 			dataMap.put("Workdrive_Folder_ID",fetch_Cust.Workdrive_Folder_ID);
			// 			dataMap.put("Workdrive_URL",fetch_Cust.Workdrive_URL);
			dataMap.put("Creator_ID",cusID.toString());
			if(fetch_Cust.Zoho_Crm_ID == "" || fetch_Cust.Zoho_Crm_ID == null)
			{
				// 				create
				createResp = zoho.crm.createRecord("Leads",dataMap,{"trigger":{"workflow"}});
				thisapp.Developer.addActivityLog("Create Lead(CRM.Customer_to_Lead_Sync_Update)--" + cusID.toString(),"Create Lead in CRM API Call response -- " + leadFor,dataMap.toString(),createResp.toString());
				fetch_Cust.Zoho_Crm_ID=createResp.get("id").tostring();
				fetch_Cust.Customer_Type="Lead";
			}
		}
		thisapp.Developer.addActivityLog("Create Lead(CRM.Customer_to_Lead_Sync_Create)--" + cusID.toString(),"Create Lead in CRM -- " + leadFor,"Funcation Call End","");
	}
	catch (e)
	{
		//	info e;
		thisapp.Developer.addDeveloperLog("Customer - Lead","Create Lead(CRM.Customer_to_Lead_Sync_Create)--" + cusID.toString(),"Create Lead in CRM --- " + leadFor,"",e,"creator");
	}
}