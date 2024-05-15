if(input.Payment_ID != "" && input.Quote != null && input.Payment_Status == "PAID" && input.Payment_Updated == false)
	{
		getBoatTansactionHist = Boat_Transaction_History[Payment_ID == input.Payment_ID];
		getBoatQuote = BoatQuote[ID == getBoatTansactionHist.Quote];
		// 	info getTrailerQuote.Quote_ID;
		getBoatDetails = Boat_Policy_change_Request[Payment_ID == input.Payment_ID && Quote_ID == getBoatQuote.Quote_ID];
		if(getBoatDetails.Select_Charge_Type == "Auto Charge/Refund")
		{
			paymentType = "Auto-Charge";
		}
		else
		{
			paymentType = "Sent Payment Link";
		}
		getTax = Tax_Lists[State_Province == getBoatDetails.Tax_Province];
		// 	info "gettax " + getTax.ID;
		getTransactionTableDet = Transaction_Table[Creator_Policy_Change_ID == getBoatDetails.ID.toString() && Business_Process == "Policy Change" && Payment_ID == input.Payment_ID];
		if(getTransactionTableDet.count() == 0)
		{
			// create Transaction Table
			thisapp.Transaction.createTransactioninBoatPolicy(getBoatDetails.ID,getBoatDetails.Prorated,getTax.ID,paymentType,input.Payment_ID,"");
			input.Payment_Updated = true;
		}
	}
	