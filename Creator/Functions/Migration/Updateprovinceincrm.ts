void Migration.Updateprovinceincrm()
{
	fetall = TrailerQuote[Zoho_Crm_ID != null] range from 1000 to 2000;
	for each  fet in fetall
	{
		if(!Isnull(fet.Zoho_Crm_ID))
		{
			updatemap = Map();
			updatemap.put("Please_select_the_province",fet.Please_select_the_province_your_trailer_is_located_in);
			zoho.crm.updateRecord("Deals",fet.Zoho_Crm_ID.toLong(),updatemap);
		}
	}
}