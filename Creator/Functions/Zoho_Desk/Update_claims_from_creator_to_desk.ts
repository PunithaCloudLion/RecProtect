void Zoho_Desk.Update_claims_from_creator_to_desk(int id)
{
	get_Claims = Claims[ID == id];
	if(get_Claims.count() > 0)
	{
		data = Map();
		data.put("cf_claims_number",get_Claims.Claims_Number);
		data.put("cf_claims_status",get_Claims.Claims_Status);
		data.put("cf_claims_type",get_Claims.Claims_Type);
		data.put("cf_closed_date",get_Claims.Closed_Date);
		data.put("cf_loss_date",get_Claims.Loss_Date);
		data.put("cf_policy_number",get_Claims.Policy_Number);
		data.put("cf_total_payout",get_Claims.Total_Payout);
		data.put("cf_asset",get_Claims.Asset);
		addMap = Map();
		addMap.put("departmentId","909961000003259029");
		// addMap.put("phone","");
		//addMap.put("email","");
		// Manual Data
		subjData = "Claim: " + get_Claims.Policy_Number;
		addMap.put("subject",subjData);
		addMap.put("status","Open");
		//addMap.put("contactId",909961000001958201);
		addMap.put("contact",{"email":"vivek.v@cloudlion.org","lastName":"test cloud"});
		addMap.put("cf",data);
		updateDeskTicketinDesk = zoho.desk.update(830242517,"tickets",get_Claims.Desk_ID.toLong(),addMap,"zohodesk");
		//	info updateDeskTicketinDesk;
		if(zoho.loginuser == "Public")
		{
		}
		else
		{
			openUrl("https://crm.zoho.com/crm/org810798353/tab/Potentials/" + get_Claims.Deal_Name.toLong(),"parent window");
		}
	}
}