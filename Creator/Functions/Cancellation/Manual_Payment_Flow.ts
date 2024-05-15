void Cancellation.Manual_Payment_Flow(int cancellation_ID)
{
	try 
	{
		thisapp.Cancellation.Add_Audit_Log("Manual Payment Flow",cancellation_ID.toString(),"","Manual Payment Flow Function Starts");
		get_cancellation = Cancellation[ID == cancellation_ID];
		if(get_cancellation.count() > 0)
		{
			//---------------Process Starts-----------
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
			credit_amount = 0;
			refundamount = get_cancellation.Return_Permium;
			policynumber = get_cancellation.Policy_Number;
			//------------------If Renewal is Exist---------------
			get_renewal = Transaction_Table[Policy_Number == policynumber && Business_Process == "Renewal" && Type_of_Transaction == "Invoice" && Credit_Note_Creation == "" || Credit_Note_Creation == null] sort by Date_field desc;
			thisapp.Cancellation.Add_Audit_Log("Manual Payment Flow",cancellation_ID.toString(),get_renewal.ID.toString(),"Get Renewal Invoice Response");
			if(get_renewal.count() > 0)
			{
				if(get_renewal.Total_Amount_With_Tax >= refundamount)
				{
					get_cancellation.Show_Paid_Button=false;
					get_cancellation.Payment_Status="Manual Payment Completed";
					get_cancellation.Payment_Date=zoho.currenttime;
					table_insert = thisapp.Cancellation.Transaction_Table_Insert(cancellation_ID,get_cancellation.Return_Premium_Without_Tax,tax,"");
					thisapp.Cancellation.Add_Audit_Log("Manual Payment Flow",cancellation_ID.toString(),table_insert.toString(),"Transaction Table Response Against Renewal Invoice When Return Amount is Less Than Invoice Amount");
					if(table_insert != null)
					{
						thisapp.Cancellation.Create_Credit_Note_in_Books(table_insert.toLong(),get_renewal.Books_Invoice_ID);
						get_renewal.Credit_Note_Creation="Completed";
					}
				}
				else if(refundamount > get_renewal.Total_Amount_With_Tax)
				{
					credit_amount = refundamount - get_renewal.Total_Amount_With_Tax;
					get_cancellation.Show_Paid_Button=false;
					get_cancellation.Payment_Status="Manual Payment Completed";
					get_cancellation.Payment_Date=zoho.currenttime;
					//---------get invoice tax------
					for each  row1 in get_renewal.Transaction_Details
					{
						invoice_tax = row1.Tax;
					}
					//---------get invoice tax------
					table_insert = thisapp.Cancellation.Transaction_Table_Insert(cancellation_ID,get_renewal.Total_Amount_Without_Tax,invoice_tax,"");
					thisapp.Cancellation.Add_Audit_Log("Manual Payment Flow",cancellation_ID.toString(),table_insert.toString(),"Transaction Table Response Against Renewal Invoice When Return Amount is Greater Than Invoice Amount");
					if(table_insert != null)
					{
						thisapp.Cancellation.Create_Credit_Note_in_Books(table_insert.toLong(),get_renewal.Books_Invoice_ID);
						get_renewal.Credit_Note_Creation="Completed";
					}
					if(credit_amount > 0)
					{
						get_policychange = Transaction_Table[Policy_Number == policynumber && Business_Process == "Policy Change" && Type_of_Transaction == "Invoice" && Renewal_ID == get_renewal.ID.toString() && Date_field >= get_renewal.Date_field && Credit_Note_Creation == "" || Credit_Note_Creation == null] sort by Date_field asc;
						thisapp.Cancellation.Add_Audit_Log("Manual Payment Flow",cancellation_ID.toString(),get_policychange.toString(),"Policy Change Response of Renewal");
						for each  changes in get_policychange
						{
							if(credit_amount > 0)
							{
								if(changes.Total_Amount_With_Tax >= credit_amount)
								{
									get_cancellation.Show_Paid_Button=false;
									get_cancellation.Payment_Status="Manual Payment Completed";
									get_cancellation.Payment_Date=zoho.currenttime;
									table_insert = thisapp.Cancellation.Transaction_Table_Insert(cancellation_ID,credit_amount,tax,"");
									thisapp.Cancellation.Add_Audit_Log("Manual Payment Flow",cancellation_ID.toString(),table_insert.toString(),"Transaction Table Response Against Policy Change Invoice When Return Amount is Less Than Invoice Amount");
									if(table_insert != null)
									{
										thisapp.Cancellation.Create_Credit_Note_in_Books(table_insert.toLong(),changes.Books_Invoice_ID);
										changes.Credit_Note_Creation="Completed";
									}
								}
								else if(credit_amount > changes.Total_Amount_With_Tax)
								{
									credit_amount = credit_amount - changes.Total_Amount_With_Tax;
									get_cancellation.Show_Paid_Button=false;
									get_cancellation.Payment_Status="Manual Payment Completed";
									get_cancellation.Payment_Date=zoho.currenttime;
									for each  row2 in changes.Transaction_Details
									{
										invoicetax = row2.Tax;
									}
									table_insert = thisapp.Cancellation.Transaction_Table_Insert(cancellation_ID,changes.Total_Amount_Without_Tax,invoicetax,"");
									thisapp.Cancellation.Add_Audit_Log("Manual Payment Flow",cancellation_ID.toString(),table_insert.toString(),"Transaction tabel Response Against Policy Change Invoice When Return Amount is Greater Than Invoice Amount");
									if(table_insert != null)
									{
										thisapp.Cancellation.Create_Credit_Note_in_Books(table_insert.toLong(),changes.Books_Invoice_ID);
										changes.Credit_Note_Creation="Completed";
									}
								}
							}
						}
					}
				}
			}
			//------------------If Renewal is Not Exist---------------		
			else if(get_renewal.count() == 0)
			{
				get_nb = Transaction_Table[Policy_Number == policynumber && Business_Process == "New Business" && Type_of_Transaction == "Invoice" && Credit_Note_Creation == "" || Credit_Note_Creation == null];
				thisapp.Cancellation.Add_Audit_Log("Manual Payment Flow",cancellation_ID.toString(),get_nb.ID.toString(),"Get NB Invoice Response");
				if(get_nb.Total_Amount_With_Tax >= refundamount)
				{
					get_cancellation.Show_Paid_Button=false;
					get_cancellation.Payment_Status="Manual Payment Completed";
					get_cancellation.Payment_Date=zoho.currenttime;
					table_insert = thisapp.Cancellation.Transaction_Table_Insert(cancellation_ID,get_cancellation.Return_Premium_Without_Tax,tax,"");
					thisapp.Cancellation.Add_Audit_Log("Manual Payment Flow",cancellation_ID.toString(),table_insert.toString(),"Transaction Table Response Against NB Invoice When Return Amount is Less Than Invoice Amount");
					if(table_insert != null)
					{
						thisapp.Cancellation.Create_Credit_Note_in_Books(table_insert.toLong(),get_nb.Books_Invoice_ID);
						get_nb.Credit_Note_Creation="Completed";
					}
				}
				else if(refundamount > get_nb.Total_Amount_With_Tax)
				{
					credit_amount = refundamount - get_nb.Total_Amount_With_Tax;
					get_cancellation.Show_Paid_Button=false;
					get_cancellation.Payment_Status="Manual Payment Completed";
					get_cancellation.Payment_Date=zoho.currenttime;
					for each  row3 in get_nb.Transaction_Details
					{
						invoice_tax = row3.Tax;
					}
					table_insert = thisapp.Cancellation.Transaction_Table_Insert(cancellation_ID,get_nb.Total_Amount_Without_Tax,invoice_tax,"");
					thisapp.Cancellation.Add_Audit_Log("Manual Payment Flow",cancellation_ID.toString(),table_insert.toString(),"Transaction Table Response Against NB Invoice When Return Amount is Greater Than Invoice Amount");
					if(table_insert != null)
					{
						thisapp.Cancellation.Create_Credit_Note_in_Books(table_insert.toLong(),get_renewal.Books_Invoice_ID);
						get_renewal.Credit_Note_Creation="Completed";
					}
					if(credit_amount > 0)
					{
						get_policychange = Transaction_Table[Policy_Number == policynumber && Business_Process == "Policy Change" && Type_of_Transaction == "Invoice" && Date_field >= get_renewal.Date_field && Credit_Note_Creation == "" || Credit_Note_Creation == null] sort by Date_field asc;
						thisapp.Cancellation.Add_Audit_Log("Manual Payment Flow",cancellation_ID.toString(),get_policychange.toString(),"Policy Change Response of NB");
						for each  changes in get_policychange
						{
							if(credit_amount > 0)
							{
								if(changes.Total_Amount_With_Tax >= credit_amount)
								{
									get_cancellation.Show_Paid_Button=false;
									get_cancellation.Payment_Status="Manual Payment Completed";
									get_cancellation.Payment_Date=zoho.currenttime;
									table_insert = thisapp.Cancellation.Transaction_Table_Insert(cancellation_ID,credit_amount,tax,"");
									thisapp.Cancellation.Add_Audit_Log("Manual Payment Flow",cancellation_ID.toString(),table_insert.toString(),"Transaction Table Response Against Policy Change Invoice When Return Amount is Less Than Invoice Amount");
									if(table_insert != null)
									{
										thisapp.Cancellation.Create_Credit_Note_in_Books(table_insert.toLong(),changes.Books_Invoice_ID);
										changes.Credit_Note_Creation="Completed";
									}
								}
								else if(credit_amount > changes.Total_Amount_With_Tax)
								{
									credit_amount = credit_amount - changes.Total_Amount_With_Tax;
									get_cancellation.Show_Paid_Button=false;
									get_cancellation.Payment_Status="Manual Payment Completed";
									get_cancellation.Payment_Date=zoho.currenttime;
									for each  row4 in changes.Transaction_Details
									{
										invoice_tax = row4.Tax;
									}
									table_insert = thisapp.Cancellation.Transaction_Table_Insert(cancellation_ID,changes.Total_Amount_Without_Tax,invoice_tax,"");
									thisapp.Cancellation.Add_Audit_Log("Manual Payment Flow",cancellation_ID.toString(),table_insert.toString(),"Transaction tabel Response Against Policy Change Invoice When Return Amount is Greater Than Invoice Amount");
									if(table_insert != null)
									{
										thisapp.Cancellation.Create_Credit_Note_in_Books(table_insert.toLong(),changes.Books_Invoice_ID);
										changes.Credit_Note_Creation="Completed";
									}
								}
							}
						}
					}
				}
			}
		}
		thisapp.Cancellation.Add_Audit_Log("Manual Payment Flow",cancellation_ID.toString(),"","Manual Payment Flow Function End");
	}
	catch (e)
	{
		thisapp.Developer.addDeveloperLog("Cancellation","Manual_Payment_Flow","Cancellation ID --" + cancellation_ID,"Policy Number--" + policynumber,e,"Creator");
	}
}