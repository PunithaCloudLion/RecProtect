void Migration.taxcorrection()
{
	trailer = TrailerQuote[Province == "British Columbia" || Province == "Alberta"].count();
	info trailer;
}