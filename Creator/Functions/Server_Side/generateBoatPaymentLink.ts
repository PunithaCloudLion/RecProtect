void Server_Side.generateBoatPaymentLink(int boatID)
{
	fetchEndPoint = "https://recprotectbackend-10073292108.development.catalystappsail.com/recprotect/api/boat/create_boat_quote_payment_url";
	boat_quoteDate = BoatQuote[ID == boatID];
	paramMapp = Map();
	paymentMap = Map();
	paymentMap.put("total_premium",if(boat_quoteDate.Total_Premium_before_tax != null,boat_quoteDate.Total_Premium_before_tax,0));
	paymentMap.put("total_tax",if(boat_quoteDate.Tax != null,boat_quoteDate.Tax,0));
	paymentMap.put("admin_fee",if(boat_quoteDate.Fee != null,boat_quoteDate.Fee,0));
	paramMapp.put("amount_payable",paymentMap);
	paramMapp.put("boat_quote_record_id",boat_quoteDate.Quote_Record_ID_Server);
	//info "pc" + boat_quoteDate.Policy_Number;
	//info "qc" + boat_quoteDate.Quote_ID;
	uniqID = if(boat_quoteDate.Policy_Number != null && boat_quoteDate.Policy_Number != "",boat_quoteDate.Policy_Number,boat_quoteDate.Quote_ID);
	paramMapp.put("unique_id",uniqID);
	paramMapp.put("payment_for","NewBusiness");
	paramMapp.put("payment_type","Credit To Company");
	paramMapp.put("payment_method","Credit Card");
	paramMapp.put("organization_id","RECPROTECT1");
	customerData = Customer[ID == boat_quoteDate.Customer_ID];
	paramMapp.put("customer_id",customerData.Server_Customer_ID);
	//info paramMapp;
	resp = thisapp.Server_Side.callServer("POST",fetchEndPoint,paramMapp);
	//info resp;
}