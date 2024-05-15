void customerType_Update()
{
	get_customer = Customer[ID = null];
	Search_recLeads = zoho.crm.searchRecords("Leads","(Email:equals:" + get_customer.Email + ")");
	Search_recCusomer = zoho.crm.searchRecords("Contacts","(Email:equals:" + get_customer.Email + ")");
	if(Search_recLeads.size() > 0)
	{
		leadsMap = Map();
		updateCust = zoho.crm.updateRecord("Leads",get_customer.Zoho_Crm_ID.tolong(),leadsMap);
	}
	if(Search_recCusomer.size() > 0)
	{
		custmerMap = Map();
		updateCust = zoho.crm.updateRecord("Contacts",get_customer.Zoho_Crm_ID.tolong(),custmerMap);
	}
}