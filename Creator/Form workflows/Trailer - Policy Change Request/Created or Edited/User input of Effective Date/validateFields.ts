if(input.Inception_Date != null)
	{
		if(input.Inception_Date >= zoho.currentdate || input.Inception_Date >= zoho.currentdate.subDay(30))
		{
			input.Expiry_Date = input.Inception_Date.addYear(1);
		}
		else
		{
			alert "Please Enter future date";
			input.Inception_Date = null;
		}
	}
	if(input.Inception_Date == null)
	{
		input.Expiry_Date = null;
	}
	
	//---------------------Effective Date Validation----------------
effective_date_higher = zoho.currentdate.addDay(29);
effective_date_lesser = zoho.currentdate.subDay(14);
if(input.Effective_Date > effective_date_higher)
{
	alert "Invalid Effective Date";
	input.Effective_Date = null;
}
else if(input.Effective_Date < effective_date_lesser)
{
	alert "Invalid Effective Date";
	input.Effective_Date = null;
}
