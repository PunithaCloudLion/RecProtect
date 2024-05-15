void Cancellation.Auto_Credit_Server_API_Flow(int cancellation_ID)
{
	try 
	{
		thisapp.Cancellation.Add_Audit_Log("Auto Credit Server API Flow",cancellation_ID.toString(),"","Auto Credit Server API Flow Function Starts");
		get_cancellation = Cancellation[ID == cancellation_ID];
		if(get_cancellation.count() > 0)
		{
			//----------------End Point Fetch---------------
			fetchEndPoint = "";
			quoteID = "";
			if(get_cancellation.Quote_Type == "Trailer")
			{
				fetchEndPoint = API_Configuration[Name_Process == "Trailer Auto credit API"].End_Point;
				trailerquote = TrailerQuote[ID == get_cancellation.Crm_ID.toLong()];
				quoteID = trailerquote.Quote_Record_ID_Server;
				tax_province = trailerquote.Tax_Province;
				tax = Tax_Lists[State_Province == tax_province].ID;
				if(trailerquote.Override_Tax_by_Admin == "Yes")
				{
					tax = trailerquote.Override_Tax;
				}
			}
			else if(get_cancellation.Quote_Type == "Boat")
			{
				fetchEndPoint = API_Configuration[Name_Process == "Boat Auto credit API"].End_Point;
				boatquote = BoatQuote[ID == get_cancellation.Crm_ID.toLong()];
				quoteID = boatquote.Quote_Record_ID_Server;
				tax_province = boatquote.Tax_Province;
				tax = Tax_Lists[State_Province == tax_province].ID;
				if(boatquote.Override_Tax_by_Admin == "Yes")
				{
					tax = boatquote.Override_Tax;
				}
			}
			//-------------End Point Fetch End---------------
			credit_amount = 0;
			refundamount = get_cancellation.Return_Permium;
			policynumber = get_cancellation.Policy_Number;
			//------------------If Renewal is Exist---------------
			get_renewal = Transaction_Table[Policy_Number == policynumber && Business_Process == "Renewal" && Type_of_Transaction == "Invoice" && Credit_Note_Creation == "" || Credit_Note_Creation == null] sort by Date_field desc;
			thisapp.Cancellation.Add_Audit_Log("Auto Credit Server API Flow",cancellation_ID.toString(),get_renewal.toString(),"Get Renewal Invoice Response");
			//------------------If Renewal is Available---------------
			if(get_renewal.count() > 0)
			{
				//------------------Renewal Amount is Greater-----------
				if(get_renewal.Total_Amount_With_Tax >= refundamount)
				{
					servercall = thisapp.Cancellation.Auto_Credit_Server_API_Call(quoteID,refundamount,get_renewal.Payment_ID,fetchEndPoint,"CANCELLATION");
					servercall = servercall.toMap();
					thisapp.Cancellation.Add_Audit_Log("Auto Credit Server API Flow",cancellation_ID.toString(),servercall.toString(),"Server Call Response Against Renewal Invoice When Return Amount is Less Than Invoice Amount");
					if(servercall.get("success") == true)
					{
						get_renewal.Auto_Credit_Status="Success";
						get_cancellation.Show_Paid_Button=false;
						get_cancellation.Payment_Status="Auto Payment Refund Success";
						get_cancellation.Payment_Date=zoho.currenttime;
						table_insert = thisapp.Cancellation.Transaction_Table_Insert(cancellation_ID,get_cancellation.Return_Premium_Without_Tax,tax,servercall.get("data").get("payment_id"));
						thisapp.Cancellation.Add_Audit_Log("Auto Credit Server API Flow",cancellation_ID.toString(),table_insert.toString(),"Transaction Table Response Against Renewal Invoice When Return Amount is Less Than Invoice Amount");
						if(table_insert != null)
						{
							thisapp.Cancellation.Create_Credit_Note_in_Books(table_insert.toLong(),get_renewal.Books_Invoice_ID);
							get_renewal.Credit_Note_Creation="Completed";
						}
					}
					else
					{
						get_renewal.Auto_Credit_Status="Failed";
						get_cancellation.Show_Paid_Button=true;
						get_cancellation.Payment_Status="Auto Payment Refund Failed";
					}
				}
				//------------------Refund Amount is Greater-----------
				else if(refundamount > get_renewal.Total_Amount_With_Tax)
				{
					credit_amount = refundamount - get_renewal.Total_Amount_With_Tax;
					servercall = thisapp.Cancellation.Auto_Credit_Server_API_Call(quoteID,get_renewal.Total_Amount_With_Tax,get_renewal.Payment_ID,fetchEndPoint,"CANCELLATION");
					servercall = servercall.toMap();
					thisapp.Cancellation.Add_Audit_Log("Auto Credit Server API Flow",cancellation_ID.toString(),servercall.toString(),"Server Call Response Against Renewal Invoice When Return Amount is Greater Than Invoice Amount");
					if(servercall.get("success") == true)
					{
						get_renewal.Auto_Credit_Status="Success";
						get_cancellation.Show_Paid_Button=false;
						get_cancellation.Payment_Status="Auto Payment Refund Success";
						get_cancellation.Payment_Date=zoho.currenttime;
						//---------get invoice tax------
						for each  row1 in get_renewal.Transaction_Details
						{
							invoice_tax = row1.Tax;
						}
						//---------get invoice tax------
						table_insert = thisapp.Cancellation.Transaction_Table_Insert(cancellation_ID,get_renewal.Total_Amount_Without_Tax,invoice_tax,servercall.get("data").get("payment_id"));
						thisapp.Cancellation.Add_Audit_Log("Auto Credit Server API Flow",cancellation_ID.toString(),table_insert.toString(),"Transaction Table Response Against Renewal Invoice When Return Amount is Greater Than Invoice Amount");
						if(table_insert != null)
						{
							thisapp.Cancellation.Create_Credit_Note_in_Books(table_insert.toLong(),get_renewal.Books_Invoice_ID);
							get_renewal.Credit_Note_Creation="Completed";
							//-----------------Get Policy Changes------------
							if(credit_amount > 0)
							{
								get_policychange = Transaction_Table[Policy_Number == policynumber && Business_Process == "Policy Change" && Type_of_Transaction == "Invoice" && Renewal_ID == get_renewal.ID.toString() && Date_field >= get_renewal.Date_field && Credit_Note_Creation == "" || Credit_Note_Creation == null] sort by Date_field asc;
								thisapp.Cancellation.Add_Audit_Log("Auto Credit Server API Flow",cancellation_ID.toString(),get_policychange.toString(),"Policy Change Response of Renewal");
								for each  changes in get_policychange
								{
									if(credit_amount > 0)
									{
										//----------------Credit Amount is Lesser---------
										if(changes.Total_Amount_With_Tax >= credit_amount)
										{
											servercall = thisapp.Cancellation.Auto_Credit_Server_API_Call(quoteID,credit_amount,changes.Payment_ID,fetchEndPoint,"CANCELLATION");
											servercall = servercall.toMap();
											thisapp.Cancellation.Add_Audit_Log("Auto Credit Server API Flow",cancellation_ID.toString(),servercall.toString(),"Server Call Response Against Policy Change Invoice When Return Amount is Less Than Invoice Amount");
											if(servercall.get("success") == true)
											{
												changes.Auto_Credit_Status="Success";
												get_cancellation.Show_Paid_Button=false;
												get_cancellation.Payment_Status="Auto Payment Refund Success";
												get_cancellation.Payment_Date=zoho.currenttime;
												table_insert = thisapp.Cancellation.Transaction_Table_Insert(cancellation_ID,credit_amount,tax,servercall.get("data").get("payment_id"));
												thisapp.Cancellation.Add_Audit_Log("Auto Credit Server API Flow",cancellation_ID.toString(),table_insert.toString(),"Transaction Table Response Against Policy Change Invoice When Return Amount is Less Than Invoice Amount");
												if(table_insert != null)
												{
													thisapp.Cancellation.Create_Credit_Note_in_Books(table_insert.toLong(),changes.Books_Invoice_ID);
													changes.Credit_Note_Creation="Completed";
												}
											}
											else
											{
												get_cancellation.Show_Paid_Button=true;
												get_cancellation.Payment_Status="Auto Payment Partially Credited";
												get_cancellation.Balance_Credits=credit_amount;
												changes.Auto_Credit_Status="Failed";
												break;
											}
										}
										//------------------Refund Amount is Greater-----------
										else if(credit_amount > changes.Total_Amount_With_Tax)
										{
											credit_amount = credit_amount - changes.Total_Amount_With_Tax;
											servercall = thisapp.Cancellation.Auto_Credit_Server_API_Call(quoteID,changes.Total_Amount_With_Tax,changes.Payment_ID,fetchEndPoint,"CANCELLATION");
											servercall = servercall.toMap();
											thisapp.Cancellation.Add_Audit_Log("Auto Credit Server API Flow",cancellation_ID.toString(),servercall.toString(),"Server Call Response Against Policy Change Invoice When Return Amount is Greater Than Invoice Amount");
											if(servercall.get("success") == true)
											{
												changes.Auto_Credit_Status="Success";
												get_cancellation.Show_Paid_Button=false;
												get_cancellation.Payment_Status="Auto Payment Refund Success";
												get_cancellation.Payment_Date=zoho.currenttime;
												for each  row2 in changes.Transaction_Details
												{
													invoicetax = row2.Tax;
												}
												table_insert = thisapp.Cancellation.Transaction_Table_Insert(cancellation_ID,changes.Total_Amount_Without_Tax,invoicetax,servercall.get("data").get("payment_id"));
												thisapp.Cancellation.Add_Audit_Log("Auto Credit Server API Flow",cancellation_ID.toString(),table_insert.toString(),"Transaction tabel Response Against Policy Change Invoice When Return Amount is Greater Than Invoice Amount");
												if(table_insert != null)
												{
													thisapp.Cancellation.Create_Credit_Note_in_Books(table_insert.toLong(),changes.Books_Invoice_ID);
													changes.Credit_Note_Creation="Completed";
												}
											}
											else
											{
												changes.Auto_Credit_Status="Failed";
												get_cancellation.Show_Paid_Button=true;
												get_cancellation.Payment_Status="Auto Payment Partially Credited";
												get_cancellation.Balance_Credits=credit_amount;
												break;
											}
										}
									}
									else
									{
										break;
									}
								}
							}
						}
						else
						{
							changes.Auto_Credit_Status="Failed";
							get_cancellation.Show_Paid_Button=true;
							get_cancellation.Payment_Status="Auto Payment Refund Failed";
						}
					}
				}
			}
			//------------------If Renewal is Not Available---------------
			else if(get_renewal.count() == 0)
			{
				get_nb = Transaction_Table[Policy_Number == policynumber && Business_Process == "New Business" && Type_of_Transaction == "Invoice" && Credit_Note_Creation == "" || Credit_Note_Creation == null];
				thisapp.Cancellation.Add_Audit_Log("Auto Credit Server API Flow",cancellation_ID.toString(),get_nb.toString(),"Get NB Invoice Response");
				//------------------Renewal Amount is lesser-----------
				if(get_nb.Total_Amount_With_Tax >= refundamount)
				{
					servercall = thisapp.Cancellation.Auto_Credit_Server_API_Call(quoteID,refundamount,get_nb.Payment_ID,fetchEndPoint,"CANCELLATION");
					servercall = servercall.toMap();
					thisapp.Cancellation.Add_Audit_Log("Auto Credit Server API Flow",cancellation_ID.toString(),servercall.toString(),"Server Call Response Against NB Invoice When Return Amount is Less Than Invoice Amount");
					if(servercall.get("success") == true)
					{
						get_nb.Auto_Credit_Status="Success";
						get_cancellation.Show_Paid_Button=false;
						get_cancellation.Payment_Status="Auto Payment Refund Success";
						get_cancellation.Payment_Date=zoho.currenttime;
						table_insert = thisapp.Cancellation.Transaction_Table_Insert(cancellation_ID,get_cancellation.Return_Premium_Without_Tax,tax,servercall.get("data").get("payment_id"));
						thisapp.Cancellation.Add_Audit_Log("Auto Credit Server API Flow",cancellation_ID.toString(),table_insert.toString(),"Transaction Table Response Against NB Invoice When Return Amount is Less Than Invoice Amount");
						if(table_insert != null)
						{
							thisapp.Cancellation.Create_Credit_Note_in_Books(table_insert.toLong(),get_nb.Books_Invoice_ID);
							get_nb.Credit_Note_Creation="Completed";
						}
					}
					else
					{
						get_nb.Auto_Credit_Status="Failed";
						get_cancellation.Show_Paid_Button=true;
						get_cancellation.Payment_Status="Auto Payment Refund Failed";
					}
				}
				//------------------Refund Amount is Greater-----------
				else if(refundamount > get_nb.Total_Amount_With_Tax)
				{
					credit_amount = refundamount - get_nb.Total_Amount_With_Tax;
					servercall = thisapp.Cancellation.Auto_Credit_Server_API_Call(quoteID,get_nb.Total_Amount_With_Tax,get_nb.Payment_ID,fetchEndPoint,"CANCELLATION");
					servercall = servercall.toMap();
					thisapp.Cancellation.Add_Audit_Log("Auto Credit Server API Flow",cancellation_ID.toString(),servercall.toString(),"Server Call Response Against NB Invoice When Return Amount is Greater Than Invoice Amount");
					if(servercall.get("success") == true)
					{
						get_nb.Auto_Credit_Status="Success";
						get_cancellation.Show_Paid_Button=false;
						get_cancellation.Payment_Status="Auto Payment Refund Success";
						get_cancellation.Payment_Date=zoho.currenttime;
						for each  row3 in get_nb.Transaction_Details
						{
							invoice_tax = row3.Tax;
						}
						table_insert = thisapp.Cancellation.Transaction_Table_Insert(cancellation_ID,get_nb.Total_Amount_Without_Tax,invoice_tax,servercall.get("data").get("payment_id"));
						thisapp.Cancellation.Add_Audit_Log("Auto Credit Server API Flow",cancellation_ID.toString(),table_insert.toString(),"Transaction Table Response Against NB Invoice When Return Amount is Greater Than Invoice Amount");
						if(table_insert != null)
						{
							thisapp.Cancellation.Create_Credit_Note_in_Books(table_insert.toLong(),get_nb.Books_Invoice_ID);
							get_nb.Credit_Note_Creation="Completed";
							//-----------------Get Policy Changes------------
							if(credit_amount > 0)
							{
								get_policychange = Transaction_Table[Policy_Number == policynumber && Business_Process == "Policy Change" && Type_of_Transaction == "Invoice" && Date_field >= get_renewal.Date_field && Credit_Note_Creation == "" || Credit_Note_Creation == null] sort by Date_field asc;
								thisapp.Cancellation.Add_Audit_Log("Auto Credit Server API Flow",cancellation_ID.toString(),get_policychange.toString(),"Policy Change Response of NB");
								for each  changes in get_policychange
								{
									if(credit_amount > 0)
									{
										//----------------Credit Amount is Lesser---------
										if(changes.Total_Amount_With_Tax >= credit_amount)
										{
											servercall = thisapp.Cancellation.Auto_Credit_Server_API_Call(quoteID,credit_amount,changes.Payment_ID,fetchEndPoint,"CANCELLATION");
											servercall = servercall.toMap();
											thisapp.Cancellation.Add_Audit_Log("Auto Credit Server API Flow",cancellation_ID.toString(),servercall.toString(),"Server Call Response Against Policy Change Invoice When Return Amount is Less Than Invoice Amount");
											if(servercall.get("success") == true)
											{
												changes.Auto_Credit_Status="Success";
												get_cancellation.Show_Paid_Button=false;
												get_cancellation.Payment_Status="Auto Payment Refund Success";
												get_cancellation.Payment_Date=zoho.currenttime;
												table_insert = thisapp.Cancellation.Transaction_Table_Insert(cancellation_ID,credit_amount,tax,servercall.get("data").get("payment_id"));
												thisapp.Cancellation.Add_Audit_Log("Auto Credit Server API Flow",cancellation_ID.toString(),table_insert.toString(),"Transaction Table Response Against Policy Change Invoice When Return Amount is Less Than Invoice Amount");
												if(table_insert != null)
												{
													thisapp.Cancellation.Create_Credit_Note_in_Books(table_insert.toLong(),changes.Books_Invoice_ID);
													changes.Credit_Note_Creation="Completed";
												}
											}
											else
											{
												changes.Auto_Credit_Status="Failed";
												get_cancellation.Show_Paid_Button=true;
												get_cancellation.Payment_Status="Auto Payment Partially Credited";
												get_cancellation.Balance_Credits=credit_amount;
												break;
											}
										}
										//------------------Refund Amount is Greater-----------
										else if(credit_amount > changes.Total_Amount_With_Tax)
										{
											credit_amount = credit_amount - changes.Total_Amount_With_Tax;
											servercall = thisapp.Cancellation.Auto_Credit_Server_API_Call(quoteID,changes.Total_Amount_With_Tax,changes.Payment_ID,fetchEndPoint,"CANCELLATION");
											servercall = servercall.toMap();
											thisapp.Cancellation.Add_Audit_Log("Auto Credit Server API Flow",cancellation_ID.toString(),servercall.toString(),"Server Call Response Against Policy Change Invoice When Return Amount is Greater Than Invoice Amount");
											if(servercall.get("success") == true)
											{
												changes.Auto_Credit_Status="Success";
												get_cancellation.Show_Paid_Button=false;
												get_cancellation.Payment_Status="Auto Payment Refund Success";
												get_cancellation.Payment_Date=zoho.currenttime;
												for each  row4 in changes.Transaction_Details
												{
													invoice_tax = row4.Tax;
												}
												table_insert = thisapp.Cancellation.Transaction_Table_Insert(cancellation_ID,changes.Total_Amount_Without_Tax,invoice_tax,servercall.get("data").get("payment_id"));
												thisapp.Cancellation.Add_Audit_Log("Auto Credit Server API Flow",cancellation_ID.toString(),table_insert.toString(),"Transaction tabel Response Against Policy Change Invoice When Return Amount is Greater Than Invoice Amount");
												if(table_insert != null)
												{
													thisapp.Cancellation.Create_Credit_Note_in_Books(table_insert.toLong(),changes.Books_Invoice_ID);
													changes.Credit_Note_Creation="Completed";
												}
											}
											else
											{
												changes.Auto_Credit_Status="Failed";
												get_cancellation.Show_Paid_Button=true;
												get_cancellation.Payment_Status="Auto Payment Partially Credited";
												get_cancellation.Balance_Credits=credit_amount;
												break;
											}
										}
									}
									else
									{
										break;
									}
								}
							}
						}
						else
						{
							changes.Auto_Credit_Status="Failed";
							get_cancellation.Show_Paid_Button=true;
							get_cancellation.Payment_Status="Auto Payment Refund Failed";
						}
					}
				}
			}
		}
		thisapp.Cancellation.Add_Audit_Log("Auto Credit Server API Flow",cancellation_ID.toString(),"","Auto Credit Server API Flow Function End");
	}
	catch (e)
	{
		thisapp.Developer.addDeveloperLog("Cancellation","Auto_Credit_Server_API_Flow","Server API Call and Create Transaction and Credit Note",cancellation_ID.toString(),e,"creator");
	}
}