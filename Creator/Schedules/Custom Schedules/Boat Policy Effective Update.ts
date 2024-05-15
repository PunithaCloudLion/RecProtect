for each  rec in BoatQuote[Inception_Date == zoho.currentdate]
{
	rec.Policy_Status="ACTIVE";
	//Need to update the original policy status as Inactive - Renewed
}
