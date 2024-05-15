if(input.Payment_ID != "" && input.Quote != null && input.Payment_Status == "PAID" && input.Payment_Updated == false)
	{
		/*sendmail
		[
			from :zoho.adminuserid
			to :"ananth@cloudlion.org"
			subject :"Sent Payment Link Test"
			message :"Yes Received, Edit Payment Link"
		]*/
		if(input.Payment_For == "POLICY_CHANGE")
		{
			getTrailerTansactionHist = Trailer_Transaction_History[Payment_ID == input.Payment_ID];
			getTrailerQuote = TrailerQuote[ID == getTrailerTansactionHist.Quote];
			// 	info getTrailerQuote.Quote_ID;
			getTrailerDetails = Trailer_Policy_Change_Request[Payment_ID == input.Payment_ID && Quote_ID == getTrailerQuote.Quote_ID];
			if(getTrailerDetails.Select_Charge_Type == "Auto Charge/Refund")
			{
				PaymentType = "Auto-Charge";
			}
			else
			{
				PaymentType = "Sent Payment Link";
			}
			getTax = Tax_Lists[State_Province == getTrailerDetails.Tax_Province];
			// 	info "gettax " + getTax.ID;
			getTransactionTableDet = Transaction_Table[Creator_Policy_Change_ID == getTrailerDetails.ID.toString() && Business_Process == "Policy Change"];
			if(getTransactionTableDet.count() == 0)
			{
				// create Transaction Table
				thisapp.Transaction.createTransactionInTrailerPolicy(getTrailerDetails.ID,getTrailerDetails.Prorated,getTax.ID,PaymentType,input.Payment_ID,"");
			}
			input.Payment_Updated = true;
		}
		else if(input.Payment_For == "RENEWAL")
		{
			thisapp.Renewal.CL_Trailer_Payment_Based_Mail_30_Days_Before(input.Quote,input.Payment_Status);
		}
	}
	