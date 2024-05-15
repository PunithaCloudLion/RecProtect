void Bulk_Update.Trailer()
{
	get_tariler = TrailerQuote[Zoho_Crm_ID != null && Zoho_Crm_ID != ""] range from 0 to 1;
	get_tariler = TrailerQuote[Quote_Access_URL != null && Quote_Access_URL != ""].count();
	info get_tariler;
	count = 0;
	for each  rec in get_tariler
	{
		count = count + 1;
		datamap = Map();
		datamap.put("Quote_URL",rec.Quote_Access_URL);
		resp = zoho.crm.updateRecord("Deals",rec.Zoho_Crm_ID.toLong(),datamap);
		info "count-----" + count;
		info "DataMap--" + datamap;
		info "Response--" + resp;
	}
	info "Allcount-----" + count;
}