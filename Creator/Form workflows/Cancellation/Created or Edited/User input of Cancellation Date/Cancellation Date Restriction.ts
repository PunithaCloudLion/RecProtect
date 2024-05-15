addDay = zoho.currentdate.addDay(30);
subDay = zoho.currentdate.subDay(30);
if(input.Cancellation_Date > addDay || input.Cancellation_Date < subDay)
{
	alert "Cancellation Date should be between before or next 30 days";
}
