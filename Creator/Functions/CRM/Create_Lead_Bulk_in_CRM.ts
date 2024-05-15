void CRM.Create_Lead_Bulk_in_CRM()
{
	get_customer = Customer[Zoho_Crm_ID == "" || Zoho_Crm_ID == null && Added_Time < zoho.currentdate];
	for each  fetch_Cust in get_customer
	{
		info fetch_Cust.Quote_Type;
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
		dataMap.put("Lead_Status","New Leads");
		dataMap.put("Lead_Source","Quotation Application");
		dataMap.put("First_Name",fetch_Cust.First_Name);
		dataMap.put("Last_Name",fetch_Cust.Last_Name);
		dataMap.put("Email",fetch_Cust.Email);
		dataMap.put("Phone",fetch_Cust.Phone_Number);
		dataMap.put("Province",fetch_Cust.Province);
		dataMap.put("Address_Line_1",fetch_Cust.Address_Line1);
		dataMap.put("Address_Line_2",fetch_Cust.Address_Line2);
		get_trailer = TrailerQuote[Customer_ID == fetch_Cust.ID];
		if(get_trailer.count() > 0)
		{
			leadType = "Trailer";
		}
		get_boat = BoatQuote[Customer_ID == fetch_Cust.ID];
		if(get_boat.count() > 0)
		{
			leadType = "Boat";
		}
		get_trailer_sub = Additional_Names_Trailer[Customer_ID == fetch_Cust.ID && Trailer_Quotation != null];
		if(get_trailer_sub.count() > 0)
		{
			leadType = "Trailer";
		}
		get_boat_sub = Additional_Names[Customer_ID == fetch_Cust.ID && Boats != null];
		if(get_boat_sub.count() > 0)
		{
			leadType = "Boat";
		}
		if(leadType == "" || leadType == null)
		{
			leadType = "WEBAPP";
		}
		dataMap.put("Lead_Tyoe",leadType);
		dataMap.put("City",fetch_Cust.City);
		dataMap.put("Country",fetch_Cust.Country);
		dataMap.put("Postal_Code",fetch_Cust.Postal_Code);
		dataMap.put("Date_of_Birth",fetch_Cust.DOB);
		dataMap.put("Creator_ID",fetch_Cust.ID.toString());
		if(fetch_Cust.Zoho_Crm_ID == "" || fetch_Cust.Zoho_Crm_ID == null)
		{
			resp = zoho.crm.createRecord("Leads",dataMap,{"trigger":{"workflow"}});
			fetch_Cust.Zoho_Crm_ID=resp.get("id").tostring();
		}
		else
		{
			resp = zoho.crm.updateRecord("Leads",fetch_Cust.Zoho_Crm_ID.toLong(),dataMap,{"trigger":{"workflow"}});
		}
		info resp;
	}
}