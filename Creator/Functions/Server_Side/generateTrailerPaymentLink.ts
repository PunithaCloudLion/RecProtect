void Server_Side.generateTrailerPaymentLink(int QuoteID)
{
	// 	fetchEndPoint = API_Configuration[Name_Process == "Caluclate coverage premium - Boat"].End_Point;
	fetchEndPoint = "https://recprotectbackend-10073292108.development.catalystappsail.com/recprotect/api/trailer/create_trailer_quote_payment_url";
	trailerquote_data = TrailerQuote[ID == QuoteID];
	paramMapp = Map();
	paymentMap = Map();
	paymentMap.put("total_premium",if(trailerquote_data.Total_Premium_before_tax != null,trailerquote_data.Total_Premium_before_tax,0));
	paymentMap.put("total_tax",if(trailerquote_data.Tax != null,trailerquote_data.Tax,0));
	paymentMap.put("admin_fee",if(trailerquote_data.Fee != null,trailerquote_data.Fee,0));
	paramMapp.put("amount_payable",paymentMap);
	paramMapp.put("trailer_quote_record_id",trailerquote_data.Quote_Record_ID_Server);
	uniqID = if(trailerquote_data.Policy_Number != null,trailerquote_data.Policy_Number,trailerquote_data.Quote_ID);
	paramMapp.put("unique_id",uniqID);
	paramMapp.put("payment_for","NewBusiness");
	paramMapp.put("payment_type","Credit To Company");
	paramMapp.put("payment_method","Credit Card");
	paramMapp.put("organization_id","RECPROTECT1");
	customerData = Customer[ID == trailerquote_data.Customer_ID];
	paramMapp.put("customer_id",customerData.Server_Customer_ID);
	//info paramMapp;
	resp = thisapp.Server_Side.callServer("POST",fetchEndPoint,paramMapp);
	//info resp;
}