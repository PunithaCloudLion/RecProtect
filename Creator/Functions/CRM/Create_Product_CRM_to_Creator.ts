void CRM.Create_Product_CRM_to_Creator()
{
	get_crmRecords = zoho.crm.getRecords("Products",1,20);
	for each  rec in get_crmRecords
	{
		//info rec.get("Product_Name");
		response = insert into Product
		[
			Added_User=zoho.loginuser
			Product_Name=rec.get("Product_Name")
			CRM_ID=rec.get("id")
			Books_ID=rec.get("Zoho_Books_ID")
		];
		//	info response;
	}
}