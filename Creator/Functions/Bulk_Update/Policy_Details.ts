void Bulk_Update.Policy_Details()
{
	trailer = TrailerQuote[Inception_Date == null && Quote_Status == "Completed"];
	for each  rec in trailer
	{
		info rec.Quote_ID;
		// 		info rec.Created_Source;
		// 		info rec.Source;
		// 		info rec.Inception_Date;
	}
	//info trailer ;
}