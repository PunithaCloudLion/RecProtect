string Cancellation.Auto_Credit_Server_API_Call(string quote_record_id, float amount, string payment_intent_id, string reqURL, string payment_for)
{
	try 
	{
		thisapp.Cancellation.Add_Audit_Log("Auto_Credit_Server_API_Call",quote_record_id,"","Function Called Starts");
		reqParam = Map();
		reqParam.put("quote_record_id",quote_record_id);
		reqParam.put("amount",amount);
		reqParam.put("organization_id",thisapp.Server_Side.org_info());
		reqParam.put("payment_intent_id",payment_intent_id);
		reqParam.put("payment_for",payment_for);
		headerMap = Map();
		headerMap.put("Content-Type","application/json");
		resp = invokeurl
		[
			url :reqURL
			type :POST
			parameters:reqParam.toString()
			headers:headerMap
		];
		//info resp;
		//resp = "resp";
		thisapp.Cancellation.Add_Audit_Log("Auto_Credit_Server_API_Call--" + quote_record_id,reqParam.toString(),resp.toString(),"Function Called Ends");
	}
	catch (e)
	{
		thisapp.Developer.addDeveloperLog("Cancellation","Auto_Credit_Server_API_Call--" + quote_record_id.toString(),reqParam.toString(),resp,e,"creator");
	}
	return resp;
}