void Migration.RenewalTrailerQuoteUpdateCRM()
{
	renewalTrailQuote = TrailerQuote[ID == 4564627000002185144];
	oldTrailerQuote = TrailerQuote[ID == renewalTrailQuote.Renewal_From_Old_Policy_ID];
	info oldTrailerQuote;
	oldTrailerQuote.Policy_Number=oldTrailerQuote.Policy_Number + " - RENEWED";
	oldTrailerQuote.Quote_ID=oldTrailerQuote.Quote_ID + " - RENEWED";
	renewalTrailQuote.Policy_Number=renewalTrailQuote.Policy_Number.remove(" - FUTURE");
	renewalTrailQuote.Quote_ID=renewalTrailQuote.Quote_ID.remove(" - FUTURE");
	oldTrailerQuote.Policy_Status="INACTIVE - RENEWED";
	oldTrailerQuote.Renewal_Stage="";
	renewalTrailQuote.Policy_Status="ACTIVE";
	thisapp.Renewal.Renewal_Update_To_CRM_Deal(renewalTrailQuote.ID,"Trailer");
	thisapp.Server_Side.Latest_Trailer_Quote_Sync_Create_and_Update(renewalTrailQuote.ID,"UPDATE");
	thisapp.Server_Side.Latest_Trailer_Quote_Sync_Create_and_Update(oldTrailerQuote.ID,"UPDATE");
}