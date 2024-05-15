void Bulk_Update.customer()
{
	// 	all_customer = Customer[Zoho_Crm_ID == null || Zoho_Crm_ID == ""] range from 0 to 10;
	// 	for each  get_customer in all_customer
	// 	{
	// 		update_map = Map();
	// 		//get_customer = Customer[ID == 4564627000002412237];
	// 		Search_recLeads = zoho.crm.searchRecords("Leads","(Email:equals:" + get_customer.Email + ")");
	// 		Search_recCusomer = zoho.crm.searchRecords("Contacts","(Email:equals:" + get_customer.Email + ")");
	// 		if(Search_recLeads.size() > 0)
	// 		{
	// 			get_customer.Zoho_Crm_ID=Search_recLeads.get(0).get("id").toString();
	// 			crmID = Search_recLeads.get(0).get("id").toString();
	// 			get_customer.Customer_Type="Lead";
	// 			//---------Creator ID upate in crm lead
	// 			//update_lead=zoho.crm.
	// 			leadsMap = Map();
	// 			leadsMap.put("Creator_ID",get_customer.ID);
	// 			updateLeads = zoho.crm.updateRecord("Leads",crmID.tolong(),leadsMap);
	// 		}
	// 		if(Search_recCusomer.size() > 0)
	// 		{
	// 			get_customer.Zoho_Crm_ID=Search_recCusomer.get(0).get("id").toString();
	// 			get_customer.Customer_Type="Contact";
	// 			crmID = Search_recCusomer.get(0).get("id").toString();
	// 			custmerMap = Map();
	// 			custmerMap.put("Zoho_Creator_ID",get_customer.ID);
	// 			updateCust = zoho.crm.updateRecord("Contacts",crmID.tolong(),custmerMap);
	// 			//---------Creator ID upate in crm lead
	// 		}
	// 		get_trailer = TrailerQuote[Customer_ID.Zoho_Crm_ID == crmID];
	// 		if(get_trailer.count() > 0)
	// 		{
	// 			thisapp.CRM.Sync_TrailerQuote_Update(get_trailer.ID);
	// 		}
	// 		get_boat = BoatQuote[Customer_ID.Zoho_Crm_ID == crmID];
	// 		if(get_boat.count() > 0)
	// 		{
	// 			thisapp.CRM.Sync_BoatQuote_Update(get_boat.ID);
	// 		}
	// 	}
}