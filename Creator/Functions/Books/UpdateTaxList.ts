void Books.UpdateTaxList()
{
	param = Map();
	response = invokeurl
	[
		url :"https://www.zohoapis.com/books/v3/settings/taxes?organization_id=830242518"
		type :GET
		parameters:param
		connection:"zoho_books"
	];
	for each  tax in response.get("taxes")
	{
		getTax = Tax_Name[Tax_Name == tax.get("tax_name")];
		if(getTax.count() > 0)
		{
			if(getTax.Tax_Percent == null && getTax.Book_ID == null)
			{
				getTax.Tax_Percent=tax.get("tax_percentage");
				getTax.Book_ID=tax.get("tax_id");
			}
		}
		else if(getTax.count() == 0)
		{
			taxInfo = insert into Tax_Name
			[
				Added_User=zoho.loginuser
				Tax_Name=tax.get("tax_name")
				Tax_Percent=tax.get("tax_percentage")
				Book_ID=tax.get("tax_id")
			];
		}
	}
}