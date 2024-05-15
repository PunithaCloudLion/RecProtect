void Developer.addActivityLog(string process, string descriotion, string indata, string outdata)
{
	addLogs = insert into Activity_Logs
	[
		Added_User=zoho.loginuser
		Process=process
		Description=descriotion
		In_Data=indata
		Out_Data=outdata
	];
}