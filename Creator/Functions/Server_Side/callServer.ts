map Server_Side.callServer(string apiMethod, string reqURL, map reqParam)
{
	resp = Map();
	if(apiMethod == "POST")
	{
		headerMap = Map();
		headerMap.put("Content-Type","application/json");
		resp = invokeurl
		[
			url :reqURL
			type :POST
			parameters:reqParam.toString()
			headers:headerMap
		];
	}
	// 	info resp ;
	return resp;
}