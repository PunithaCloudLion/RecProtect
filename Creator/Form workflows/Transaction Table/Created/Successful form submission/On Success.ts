if(input.Business_Process == "Policy Change")
	{
		if(input.Type_of_Transaction == "Invoice")
		{
			thisapp.Transaction.InvoiceCreateForTransaction(input.ID);
		}
		if(input.Type_of_Transaction == "Credit Note")
		{
			thisapp.Transaction.creditNoteCreate(input.ID,input.Books_Invoice_ID);
		}
	}
	