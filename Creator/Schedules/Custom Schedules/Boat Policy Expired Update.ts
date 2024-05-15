for each  rec in BoatQuote[Expiry_Date == zoho.currentdate]
{
	rec.Policy_Status="INACTIVE - RENEWED";
	rec.Renewal_Stage="";
	getNewBQ = BoatQuote[Renewal_From_Old_Policy_ID == rec.ID];
	getNewBQ.Policy_Status="ACTIVE";
}
