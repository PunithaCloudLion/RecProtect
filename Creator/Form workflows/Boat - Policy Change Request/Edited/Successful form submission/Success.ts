if(input.Quote_Status == "Completed")
	{
		input.Deal_Type = "Policy";
	}
	if(input.Boat_approve_for_being_over_15_years_old == "YES" && input.Quote_Status == "Referral")
	{
		input.Quote_Status = "In Progress";
	}
	if(input.Inception_Date != null)
	{
		input.Bind_Date = input.Inception_Date;
	}
	/*if(input.Section_Type == "Boat")
							{
								openUrl("https://creatorapp.zoho.com/service_recprotect/quotation/#Form:BoatQuote?recLinkID=" + input.ID + "&viewLinkName=Boats_Report&Section_Type=Policy Details","same window");
							}
							else if(input.Section_Type == "Policy Details")
							{
								openUrl("https://creatorapp.zoho.com/service_recprotect/quotation/#Form:BoatQuote?recLinkID=" + input.ID + "&viewLinkName=Boats_Report&Section_Type=Terms","same window");
							}
							else if(input.Section_Type == "Terms")
							{
								openUrl("https://creatorapp.zoho.com/service_recprotect/quotation/#Form:BoatQuote?recLinkID=" + input.ID + "&viewLinkName=Boats_Report&Section_Type=Payment","same window");
							}
							else if(input.Section_Type == "Payment")
							{
								openUrl("https://creatorapp.zoho.com/service_recprotect/quotation/#Report:Boats_Report","same window");
								input.Section_Type = "Get Started";
							}*/
	