string General.emailFormation(string mailvalue, string module, int recID)
{
	if(mailvalue == "LOGINUSEREMAIL")
	{
		mailvalue = zoho.loginuserid;
	}
	if(mailvalue == "ADMINEMAIL")
	{
		mailvalue = zoho.adminuserid;
	}
	if(mailvalue == "CLIENTEMAIL")
	{
		if(module == "Boat")
		{
			mailvalue = BoatQuote[ID == recID].Email;
		}
		else
		{
			mailvalue = TrailerQuote[ID == recID].Email;
		}
	}
	if(mailvalue != "LOGINUSEREMAIL" && mailvalue != "ADMINEMAIL" && mailvalue != "CLIENTEMAIL")
	{
		mailvalue = mailvalue;
	}
	return mailvalue;
}