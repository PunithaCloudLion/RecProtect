void Developer.addDeveloperLog(string moduleName, string actionData, string description, string req, string response, string product)
{
	logResponse = insert into Developer_Logs
	[
		Added_User=zoho.loginuser
		Module=moduleName
		Action_Flow=actionData
		Description=description
		Request=req
		Response=response
		Product=product
	];
}