void CRM.Direct_Customer_Create_in_CRM(int id)
{
	try 
	{
		thisapp.Developer.addActivityLog("Lead or Contact Sync to CRM from Customer Module(Direct_Customer_Create_in_CRM)",id.toString(),"Start","");
		get_customer = Customer[ID == id];
		if(get_customer.count() > 0)
		{
			if(get_customer.Email != null && get_customer.Email != "")
			{
				//-----------------Search Customer in CRM--------------
				Search_recLeads = zoho.crm.searchRecords("Leads","(Email:equals:" + get_customer.Email + ")");
				thisapp.Developer.addActivityLog("Lead or Contact Sync to CRM from Customer Module(Direct_Customer_Create_in_CRM)--" + id.toString(),"Search in CRM Lead Response",get_customer.Email,Search_recLeads.toString());
				Search_recCusomer = zoho.crm.searchRecords("Contacts","(Email:equals:" + get_customer.Email + ")");
				thisapp.Developer.addActivityLog("Lead or Contact Sync to CRM from Customer Module(Direct_Customer_Create_in_CRM)--" + id.toString(),"Search in CRM Contact Response",get_customer.Email,Search_recCusomer.toString());
				//-----------------if both  Lead and Contact Count is Zero----------------
				if(Search_recLeads.size() == 0 && Search_recCusomer.size() == 0)
				{
					dataMap = Map();
					fetchLayout = Layout[Layout_Name == "Layout 1.0"];
					layoutid = Map();
					layoutid.put("id",fetchLayout.Layout_ID.tolong());
					dataMap.put("Layout",layoutid);
					fetchUsers = Users[User_Email == zoho.loginuserid].CRM_ID;
					if(fetchUsers != null)
					{
						dataMap.put("Owner",fetchUsers.tolong());
					}
					//dataMap.put("Lead_Tyoe",leadFor);
					dataMap.put("Lead_Status","New Leads");
					dataMap.put("Lead_Source","Quotation Application");
					dataMap.put("First_Name",get_customer.First_Name);
					dataMap.put("Last_Name",get_customer.Last_Name);
					dataMap.put("Email",get_customer.Email);
					dataMap.put("Phone",get_customer.Phone_Number);
					dataMap.put("Province",get_customer.Province);
					dataMap.put("Address_Line_1",get_customer.Address_Line1);
					dataMap.put("Address_Line_2",get_customer.Address_Line2);
					dataMap.put("City",get_customer.City);
					dataMap.put("Country",get_customer.Country);
					dataMap.put("Postal_Code",get_customer.Postal_Code);
					dataMap.put("Date_of_Birth",get_customer.DOB);
					dataMap.put("Creator_ID",id.toString());
					get_trailer = TrailerQuote[Customer_ID == get_customer.ID];
					if(get_trailer.count() > 0)
					{
						leadType = "Trailer";
					}
					get_boat = BoatQuote[Customer_ID == get_customer.ID];
					if(get_boat.count() > 0)
					{
						leadType = "Boat";
					}
					get_trailer_sub = Additional_Names_Trailer[Customer_ID == get_customer.ID && Trailer_Quotation != null];
					if(get_trailer_sub.count() > 0)
					{
						leadType = "Trailer";
					}
					get_boat_sub = Additional_Names[Customer_ID == get_customer.ID && Boats != null];
					if(get_boat_sub.count() > 0)
					{
						leadType = "Boat";
					}
					if(leadType == "" || leadType == null)
					{
						leadType = "WEBAPP";
					}
					dataMap.put("Lead_Tyoe",leadType);
					createResp = zoho.crm.createRecord("Leads",dataMap,{"trigger":{"workflow"}});
					thisapp.Developer.addActivityLog("Lead or Contact Sync to CRM from Customer Module(Direct_Customer_Create_in_CRM)--" + id.toString(),"Lead Creation Response",dataMap.toString(),createResp.toString());
					if(createResp.get("id") != null)
					{
						get_customer.Zoho_Crm_ID=createResp.get("id").tostring();
						get_customer.Customer_Type="Lead";
					}
				}
				//-----------------if both  Lead Count is Not Zero----------------
				if(Search_recLeads.size() > 0)
				{
					get_customer.Zoho_Crm_ID=Search_recLeads.get(0).get("id").tostring();
					get_customer.Customer_Type="Lead";
					update_lead = Map();
					update_lead.put("Creator_ID",get_customer.ID.toString());
					crm_lead_update = zoho.crm.updateRecord("Leads",Search_recLeads.get(0).get("id").toLong(),update_lead,{"trigger":{"workflow"}});
					thisapp.Developer.addActivityLog("Lead or Contact Sync to CRM from Customer Module(Direct_Customer_Create_in_CRM)--" + id.toString(),"Lead Update Response",update_lead.toString(),crm_lead_update.toString());
					info crm_lead_update;
				}
				//-----------------if both  Contact Count is Not Zero----------------
				if(Search_recCusomer.size() > 0)
				{
					get_customer.Zoho_Crm_ID=Search_recCusomer.get(0).get("id").tostring();
					get_customer.Customer_Type="Contact";
					update_customerd = Map();
					update_customerd.put("Zoho_Creator_ID",get_customer.ID.toString());
					crm_customer_update = zoho.crm.updateRecord("Contacts",Search_recCusomer.get(0).get("id").toLong(),update_customerd,{"trigger":{"workflow"}});
					thisapp.Developer.addActivityLog("Lead or Contact Sync to CRM from Customer Module(Direct_Customer_Create_in_CRM)--" + id.toString(),"Contact Update Response",update_customerd.toString(),crm_customer_update.toString());
					info crm_customer_update;
				}
			}
		}
	}
	catch (e)
	{
		thisapp.Developer.addDeveloperLog("Direct_Customer_Create_in_CRM","Create Lead or Update Leand Contact from Customer form to CRM","https://creator.zoho.com/appbuilder/service_recprotect/quotation/customFunction/CRM.Direct_Customer_Create_in_CRM/edit",get_customer.ID.toString(),e,"Creator");
	}
}