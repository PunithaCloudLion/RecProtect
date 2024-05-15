void Server_Side.getTrailerCancellationPremium(int reqID)
{
	cancellationRequest = Cancellation[ID == reqID];
	//trailer API
	//apiEndPoint ="https://recprotectbackend-10073292108.development.catalystappsail.com/recprotect/api/trailer/get_cancellation_premium";
	//boat API
	apiEndPoint2 = "https://recprotectbackend-10073292108.development.catalystappsail.com/recprotect/api/boat/get_cancellation_premium";
	fetchTrailer = BoatQuote[ID == cancellationRequest.Crm_ID.tolong()];
	//fetchTrailer = TrailerQuote[ID == cancellationRequest.Crm_ID.tolong()];
	if(fetchTrailer.count() > 0)
	{
		daysDiff = daysBetween(cancellationRequest.Effective_Date,cancellationRequest.Expiry_Date);
		daysRisk = daysBetween(cancellationRequest.Effective_Date,cancellationRequest.Cancellation_Date);
		paidPremium = fetchTrailer.Total_Payable_Premium_after_tax;
		taxPrecent = ifnull(fetchTrailer.Tax_Precent,0);
		parammap = Map();
		parammap.put("organization_id","RECPROTECT1");
		parammap.put("cancellation_type",cancellationRequest.Select_Rate);
		//select rate field
		parammap.put("paid_premium",paidPremium);
		parammap.put("no_of_days",daysDiff);
		parammap.put("days_on_risk",daysRisk);
		parammap.put("tax_percent",taxPrecent);
		//	info parammap;
		// 		resp = thisapp.Server_Side.callServer("POST",apiEndPoint2,parammap);
		// 		info resp;
	}
}