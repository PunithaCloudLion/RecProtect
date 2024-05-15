for each  rec in TrailerQuote[Expiry_Date == zoho.currentdate]
{
	rec.Policy_Status="INACTIVE - RENEWED";
	rec.Renewal_Stage="";
	getNewPolicy = TrailerQuote[Renewal_From_Old_Policy_ID == rec.ID];
	getNewPolicy.Policy_Status="ACTIVE";
}
