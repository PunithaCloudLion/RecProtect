void Cancellation.Auto_Credit_Mark_as_Paid_Flow(int cancellation_ID)
{
	try 
	{
		thisapp.Cancellation.Add_Audit_Log("Auto Credit Fail",cancellation_ID.toString(),"","Auto Credit Mark as Paid Flow Function Starts");
		get_cancellation = Cancellation[ID == cancellation_ID];
		if(get_cancellation.Quote_Type == "Trailer")
		{
			trailerquote = TrailerQuote[ID == get_cancellation.Crm_ID.toLong()];
			tax_province = trailerquote.Tax_Province;
			tax = Tax_Lists[State_Province == tax_province].ID;
			if(trailerquote.Override_Tax_by_Admin == "Yes")
			{
				tax = trailerquote.Override_Tax;
			}
		}
		else if(get_cancellation.Quote_Type == "Boat")
		{
			boatquote = BoatQuote[ID == get_cancellation.Crm_ID.toLong()];
			tax_province = boatquote.Tax_Province;
			tax = Tax_Lists[State_Province == tax_province].ID;
			if(boatquote.Override_Tax_by_Admin == "Yes")
			{
				tax = boatquote.Override_Tax;
			}
		}
		//------------------------Error on Base Policy Level--------------
		if(get_cancellation.Payment_Status == "Auto Payment Refund Failed")
		{
			refundamount = get_cancellation.Return_Permium;
			policynumber = get_cancellation.Policy_Number;
			get_base_invoice = Transaction_Table[Auto_Credit_Status == "Failed" && Policy_Number == policynumber && Business_Process == "New Business" || Business_Process == "Renewal"];
			thisapp.Cancellation.Add_Audit_Log("Auto Credit Fail",cancellation_ID.toString(),get_base_invoice.toString(),"Get Base Invoice for Auto Payment Refund Failed Status");
			if(get_base_invoice.count() > 0)
			{
				if(get_base_invoice.Total_Amount_With_Tax >= refundamount)
				{
					get_cancellation.Show_Paid_Button=false;
					get_cancellation.Payment_Status="Auto Payment Refund Success";
					get_cancellation.Payment_Date=zoho.currenttime;
					table_insert = thisapp.Cancellation.Transaction_Table_Insert(cancellation_ID,get_cancellation.Return_Premium_Without_Tax,tax,"");
					thisapp.Cancellation.Add_Audit_Log("Auto Credit Fail",cancellation_ID.toString(),table_insert.toString(),"Create Transaction table Response for Invoice Amount is Greater than Return Amount");
					if(table_insert != null)
					{
						thisapp.Cancellation.Create_Credit_Note_in_Books(table_insert.toLong(),get_base_invoice.Books_Invoice_ID);
						get_base_invoice.Credit_Note_Creation="Completed";
						get_base_invoice.Credit_Note_Creation="Success";
					}
				}
				else if(refundamount > get_base_invoice.Total_Amount_With_Tax)
				{
					credit_amount = refundamount - get_base_invoice.Total_Amount_With_Tax;
					get_cancellation.Show_Paid_Button=false;
					get_cancellation.Payment_Status="Auto Payment Refund Success";
					get_cancellation.Payment_Date=zoho.currenttime;
					//---------get invoice tax------
					for each  row1 in get_base_invoice.Transaction_Details
					{
						invoice_tax = row1.Tax;
					}
					//---------get invoice tax------
					table_insert = thisapp.Cancellation.Transaction_Table_Insert(cancellation_ID,get_base_invoice.Total_Amount_Without_Tax,invoice_tax,"");
					thisapp.Cancellation.Add_Audit_Log("Auto Credit Fail",cancellation_ID.toString(),table_insert.toString(),"Create Transaction table Response for Base Invoice Amount is Less than Return Amount");
					if(table_insert != null)
					{
						thisapp.Cancellation.Create_Credit_Note_in_Books(table_insert.toLong(),get_base_invoice.Books_Invoice_ID);
						get_base_invoice.Credit_Note_Creation="Completed";
						get_base_invoice.Credit_Note_Creation="Success";
					}
					if(credit_amount > 0)
					{
						if(get_base_invoice.Business_Process == "Renewal")
						{
							get_policychange = Transaction_Table[Policy_Number == policynumber && Business_Process == "Policy Change" && Type_of_Transaction == "Invoice" && Renewal_ID == get_base_invoice.ID.toString() && Date_field >= get_base_invoice.Date_field && Credit_Note_Creation == "" || Credit_Note_Creation == null] sort by Date_field asc;
						}
						else if(get_base_invoice.Business_Process == "New Business")
						{
							get_policychange = Transaction_Table[Policy_Number == policynumber && Business_Process == "Policy Change" && Type_of_Transaction == "Invoice" && Credit_Note_Creation != "Completed" && Date_field >= get_base_invoice.Date_field] sort by Date_field asc;
						}
						thisapp.Cancellation.Add_Audit_Log("Auto Credit Fail",cancellation_ID.toString(),get_policychange.toString(),"Policy Change Fetch Response");
						//-----------------Policy Changes---------
						for each  changes in get_policychange
						{
							if(credit_amount > 0)
							{
								if(changes.Total_Amount_With_Tax >= credit_amount)
								{
									get_cancellation.Show_Paid_Button=false;
									get_cancellation.Payment_Status="Auto Payment Refund Success";
									get_cancellation.Payment_Date=zoho.currenttime;
									table_insert = thisapp.Cancellation.Transaction_Table_Insert(cancellation_ID,credit_amount,tax,"");
									thisapp.Cancellation.Add_Audit_Log("Auto Credit Fail",cancellation_ID.toString(),table_insert.toString(),"Create Transaction table Response for Policy Change Invoice Amount is Greater than Credit Amount");
									if(table_insert != null)
									{
										thisapp.Cancellation.Create_Credit_Note_in_Books(table_insert.toLong(),changes.Books_Invoice_ID);
										changes.Credit_Note_Creation="Completed";
										changes.Credit_Note_Creation="Success";
									}
								}
								else if(credit_amount > changes.Total_Amount_With_Tax)
								{
									credit_amount = credit_amount - changes.Total_Amount_With_Tax;
									get_cancellation.Show_Paid_Button=false;
									get_cancellation.Payment_Status="Auto Payment Refund Success";
									get_cancellation.Payment_Date=zoho.currenttime;
									for each  row2 in changes.Transaction_Details
									{
										invoicetax = row2.Tax;
									}
									table_insert = thisapp.Cancellation.Transaction_Table_Insert(cancellation_ID,changes.Total_Amount_Without_Tax,invoicetax,"");
									thisapp.Cancellation.Add_Audit_Log("Auto Credit Fail",cancellation_ID.toString(),table_insert.toString(),"Create Transaction table Response for Policy Change Invoice Amount is Less than Credit Amount");
									if(table_insert != null)
									{
										thisapp.Cancellation.Create_Credit_Note_in_Books(table_insert.toLong(),changes.Books_Invoice_ID);
										changes.Credit_Note_Creation="Completed";
										changes.Credit_Note_Creation="Success";
									}
								}
							}
						}
					}
				}
			}
		}
		else if(get_cancellation.Payment_Status == "Auto Payment Partially Credited")
		{
			refundamount = get_cancellation.Balance_Credits;
			policynumber = get_cancellation.Policy_Number;
			get_base_invoice = Transaction_Table[Auto_Credit_Status == "Failed" && Policy_Number == policynumber && Business_Process == "Policy Change"];
			thisapp.Cancellation.Add_Audit_Log("Auto Credit Fail",cancellation_ID.toString(),get_base_invoice.toString(),"Create Transaction table Response for Policy Change Invoice Amount is Less than Credit Amount");
			get_cancellation.Show_Paid_Button=false;
			get_cancellation.Payment_Status="Auto Payment Refund Success";
			get_cancellation.Payment_Date=zoho.currenttime;
			for each  row3 in get_base_invoice.Transaction_Details
			{
				invoice_tax = row3.Tax;
				invoice_amount = row3.Amount;
			}
			table_insert = thisapp.Cancellation.Transaction_Table_Insert(cancellation_ID,invoice_amount,invoice_tax,"Get Base Invoice for Auto Payment Partially Credited Status");
			if(table_insert != null)
			{
				thisapp.Cancellation.Create_Credit_Note_in_Books(table_insert.toLong(),get_base_invoice.Books_Invoice_ID);
				get_base_invoice.Credit_Note_Creation="Completed";
				get_base_invoice.Credit_Note_Creation="Success";
			}
		}
		thisapp.Cancellation.Add_Audit_Log("Auto Credit Fail",cancellation_ID.toString(),"","Auto Credit Mark as Paid Flow Function End");
	}
	catch (e)
	{
		thisapp.Developer.addDeveloperLog("Cancellation","Auto_Credit_Mark_as_Paid_Flow","Create Transaction and Credit Note",cancellation_ID.toString(),e,"creator");
	}
}