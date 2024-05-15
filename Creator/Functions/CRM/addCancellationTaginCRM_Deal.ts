void CRM.addCancellationTaginCRM_Deal(int DealID)
{
	//getDeal = Cancellation[Crm_ID == 4564627000000217011];
	getDealFromCRM = zoho.crm.getRecordById("Deals",DealID);
	//info getDealFromCRM;
	TagList = List();
	for each  rec in getDealFromCRM.get("Tag")
	{
		TagList.add(rec);
	}
	TagMap = Map();
	TagMap.put("name","Cancellation Request");
	TagList.add(TagMap);
	updateMap = Map();
	updateMap.put("Tag",TagList);
	//info updateMap;
	updateCRM = zoho.crm.updateRecord("Deals",DealID,updateMap);
	// 	info updateMap;
}