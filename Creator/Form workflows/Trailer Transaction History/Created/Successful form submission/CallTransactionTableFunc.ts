if(input.Payment_ID != "" && input.Quote != null && input.Payment_Status == "PAID")
	{
		if(input.Payment_For == "POLICY_CHANGE")
		{
			getTrailerTansactionHist = Trailer_Transaction_History[Payment_ID == input.Payment_ID];
			getTrailerQuote = TrailerQuote[ID == getTrailerTansactionHist.Quote];
			// 	info getTrailerQuote.Quote_ID;
			getTrailerDetails = Trailer_Policy_Change_Request[Payment_ID == input.Payment_ID && Quote_ID == getTrailerQuote.Quote_ID];
			if(getTrailerDetails.Select_Charge_Type == "Auto Charge/Refund")
			{
				paymentType = "Auto-Charge";
			}
			else
			{
				paymentType = "Sent Payment Link";
			}
			getTax = Tax_Lists[Tax == getTrailerDetails.Tax_Precent];
			// 	info "gettax " + getTax.ID;
			getTransactionTableDet = Transaction_Table[Creator_Policy_Change_ID == getTrailerDetails.ID.toString() && Business_Process == "Policy Change" && Payment_ID == input.Payment_ID];
			if(getTransactionTableDet.count() == 0)
			{
				// 		sendmail
				// 		[
				// 			from :zoho.adminuserid
				// 			to :"ananth@cloudlion.org"
				// 			subject :paymentType
				// 			message :"Yes Received"
				// 		]
				// create Transaction Table
				thisapp.Transaction.createTransactionInTrailerPolicy(getTrailerDetails.ID,getTrailerDetails.Prorated,getTax.ID,paymentType,input.Payment_ID,"");
				input.Payment_Updated = true;
			}
		}
		else if(input.Payment_For == "RENEWAL")
		{
			thisapp.Renewal.CL_Trailer_Payment_Based_Mail_30_Days_Before(input.Quote,input.Payment_Status);
		}
	}
	