void Transaction.InvoiceCreateForTransaction(int recID)
{
	try 
	{
		orgID = "830242518";
		thisapp.Developer.addActivityLog("Invoice Creation For Transaction(Transaction.InvoiceCreateForTransaction)--" + recID.toString(),"Create invoice in Books","Funcation Call Start","");
		transactionInfo = Transaction_Table[ID == recID];
		if(transactionInfo.count() > 0)
		{
			dataMap = Map();
			get_customer = Customer[ID == transactionInfo.Customer_Name];
			if(get_customer.count() > 0)
			{
				CRM_ID = get_customer.Zoho_Crm_ID;
			}
			if(CRM_ID != null && CRM_ID != "")
			{
				info "11";
				get_CustomerCRM = zoho.crm.getRecordById("Contacts",CRM_ID.toLong(),Map(),"zcrm");
				if(get_CustomerCRM.get("id") != null)
				{
					if(get_CustomerCRM.get("Zoho_Books_ID") != "" && get_CustomerCRM.get("Zoho_Books_ID") != null)
					{
						dataMap.put("customer_id",get_CustomerCRM.get("Zoho_Books_ID"));
						dataMap.put("date",transactionInfo.Date_field);
						ItemList = List();
						for each  rec in transactionInfo.Transaction_Details
						{
							//	info "amount--" + rec.Amount;
							createMap = Map();
							createMap.put("quantity",1);
							createMap.put("description",rec.Description);
							createMap.put("rate",rec.Amount);
							createMap.put("tax_id",rec.Tax.Books_ID);
							//---------------Chart of Account---------------
							get_chartof_account = Accounts_Master[Product == rec.Product_Name].Zoho_Books_ID;
							if(get_chartof_account != null && get_chartof_account != "")
							{
								createMap.put("account_id",get_chartof_account);
							}
							//---------------Chart of Account Map End---------------
							get_Product = Product[ID == rec.Product_Name];
							if(get_Product.count() > 0)
							{
								createMap.put("item_id",get_Product.Books_ID);
							}
							ItemList.add(createMap);
						}
						dataMap.put("line_items",ItemList);
						//---------------------Custom Field Mapping------------
						customList = List();
						customMap1 = Map();
						customMap1.put("api_name","cf_stripe_payment_method_id");
						customMap1.put("value",transactionInfo.Stripe_Payment_Method_ID);
						customList.add(customMap1);
						customMap2 = Map();
						customMap2.put("api_name","cf_stripe_customer_id");
						customMap2.put("value",transactionInfo.Stripe_Customer_ID);
						customList.add(customMap2);
						customMap3 = Map();
						customMap3.put("api_name","cf_stripe_payment_intent_id");
						customMap3.put("value",transactionInfo.Payment_ID);
						customList.add(customMap3);
						customMap4 = Map();
						customMap4.put("api_name","cf_server_payment_id");
						customMap4.put("value",transactionInfo.Server_Payment_ID);
						customList.add(customMap4);
						customMap5 = Map();
						customMap5.put("api_name","cf_policy_type");
						customMap5.put("value",transactionInfo.Policy_Type);
						customList.add(customMap5);
						customMap6 = Map();
						for each  line in transactionInfo.Transaction_Details
						{
							if(line.Product_Name.Product_Name != "Admin Fee" && line.Product_Name.Product_Name != "Stripe Fee")
							{
								customMap6.put("api_name","cf_policy_commission");
								customMap6.put("value",ifnull(line.Commission_on_Policy,0.00));
								customList.add(customMap6);
							}
						}
						dataMap.put("custom_fields",customList);
						//---------------------Custom Field Mapping------------
						//-------------------Create Invoice in Books----------------
						createResp = zoho.books.createRecord("Invoices",orgID,dataMap);
						thisapp.Developer.addActivityLog("Invoice Creation For Transaction(Transaction.InvoiceCreateForTransaction)--" + recID.toString(),"Create invoice in Books API Call Response",dataMap.toString(),createResp.toString());
						if(createResp != null)
						{
							//--------------------Update Invoice Status ---------------
							transactionInfo.Books_Invoice_ID=createResp.get("invoice").get("invoice_id");
							transactionInfo.Books_Invoice_Number=createResp.get("invoice").get("invoice_number");
							transactionInfo.Books_Invoice_URL="https://books.zoho.com/app/830242518#/invoices/" + createResp.get("invoice").get("invoice_id") + "?filter_by=Status.All&per_page=200&sort_column=created_time&sort_order=A";
							invoice_status = invokeurl
							[
								url :"https://www.zohoapis.com/books/v3/invoices/" + createResp.get("invoice").get("invoice_id") + "/status/sent?organization_id=" + orgID
								type :POST
								connection:"zoho_books"
							];
							transactionInfo.Books_Invoice_Status="Sent";
							//----------------------Payment Received Map Formation-----------------
							//--------------------Payment Received---------
							createmap = Map();
							Create_DataMap = Map();
							createlist = List();
							createmap.put("status",transactionInfo.Books_Invoice_Status);
							createmap.put("customer_id",get_CustomerCRM.get("Zoho_Books_ID"));
							Create_DataMap.put("invoice_id",transactionInfo.Books_Invoice_ID);
							Create_DataMap.put("invoice_number",transactionInfo.Books_Invoice_Number);
							Create_DataMap.put("amount_applied",createResp.get("invoice").get("total"));
							createlist.add(Create_DataMap);
							createmap.put("invoices",createlist);
							createmap.put("description","Payment has been added to " + transactionInfo.Books_Invoice_Number + " - https://books.zoho.com/app/830242518#/invoices/" + transactionInfo.Books_Invoice_ID + "?filter_by=Status.All&per_page=200&sort_column=created_time&sort_order=A");
							createmap.put("amount",createResp.get("invoice").get("total"));
							//---------------------Fetch Quote ID------------------
							Reference_Number = "";
							if(transactionInfo.Policy_Type == "Trailer Policy")
							{
								Reference_Number = TrailerQuote[Policy_Number == transactionInfo.Policy_Number].Quote_ID;
							}
							if(transactionInfo.Policy_Type == "Boat Policy")
							{
								Reference_Number = BoatQuote[Policy_Number == transactionInfo.Policy_Number].Quote_ID;
							}
							//-----------------------End----------------------
							createmap.put("reference_number",Reference_Number);
							createmap.put("date",zoho.currentdate.toString("yyyy-MM-dd"));
							createmap.put("payment_mode","Stripe");
							get_Payment_Received = Accounts_Master[Process == "Payment Received"].Zoho_Books_ID;
							createmap.put("account_id",get_Payment_Received);
							//----------------------Payment Received Map Formation END-----------------
							//--------------------Update Invoice Status End ---------------	
							historyavailable = false;
							Payable_Amount = 0;
							paymentdate = null;
							//-----------If the Business Process is New Business Start--------
							if(transactionInfo.Business_Process == "New Business")
							{
								//---------------Get Transaction History-----------
								//-------------Trailer Policy-----------
								if(transactionInfo.Policy_Type == "Trailer Policy")
								{
									//--------------Check the Transaction Histroy-------
									get_transaction_history_trailer = Trailer_Transaction_History[Quote == transactionInfo.Creator_Quotation_ID.toLong() && Payment_For == "NEW_BUSINESS"];
									if(get_transaction_history_trailer.count() > 0)
									{
										historyavailable = true;
										Payable_Amount = get_transaction_history_trailer.Amount_Payable;
										paymentdate = get_transaction_history_trailer.Payment_Initiated_Date;
									}
								}
								//-------------Boat Policy-----------
								if(transactionInfo.Policy_Type == "Boat Policy")
								{
									get_transaction_history_boat = Boat_Transaction_History[Quote == transactionInfo.Creator_Quotation_ID.toLong() && Payment_For == "NEW_BUSINESS"];
									if(get_transaction_history_boat.count() > 0)
									{
										historyavailable = true;
										Payable_Amount = get_transaction_history_boat.Amount_Payable;
										paymentdate = get_transaction_history_boat.Payment_Initiated_Date;
									}
								}
								//---------------Get Transaction History End-----------
								//-----------------Payment Received Validation-----------
								//-------------If Transaction History Available------------
								if(historyavailable == true)
								{
									//-------------If total Matches------
									if(createResp.get("invoice").get("total") == Payable_Amount)
									{
										//----------------Create Payment Received in Books APi------------
										createbookspayment = invokeurl
										[
											url :"https://www.zohoapis.com/books/v3/customerpayments?organization_id=" + orgID
											type :POST
											parameters:createmap.toString()
											connection:"zoho_books"
										];
										thisapp.Developer.addActivityLog("Invoice Creation For Transaction(Transaction.InvoiceCreateForTransaction)--" + recID.toString(),"Create Payment Received Against Invoice in Books API Call Response",createmap.toString(),createbookspayment.toString());
										//----------------Create Payment Received Success Action ------------
										if(createbookspayment != null)
										{
											//--------------Update Status in Transaction Table-----------
											getInvoiceData = zoho.books.getRecordsByID("invoices","830242518",createResp.get("invoice").get("invoice_id"));
											getBooksInvoiceData = getInvoiceData.get("invoice");
											transactionInfo.Books_Invoice_Status=if(getBooksInvoiceData.get("status") == "paid","Paid",getBooksInvoiceData.get("status"));
											transactionInfo.Payment_Status=if(getBooksInvoiceData.get("status") == "paid","Paid",getBooksInvoiceData.get("status"));
											//--------------Update Status in Quotation level in Creator and Boat-----------
											updatemap = Map();
											//-------------Trailer Policy--------------
											if(transactionInfo.Policy_Type == "Trailer Policy")
											{
												get_trailer_policy = TrailerQuote[ID == transactionInfo.Creator_Quotation_ID.toLong()];
												if(get_trailer_policy.count() > 0)
												{
													zoho_CRM_ID = get_trailer_policy.Zoho_Crm_ID;
													get_trailer_policy.Payment_Date=paymentdate;
													get_trailer_policy.Payment_Status="Paid";
													updatemap.put("Payment_Date",if(get_trailer_policy.Payment_Date != null,get_trailer_policy.Payment_Date.toTime("yyyy-MM-dd'T'HH:mm:ss").toString("yyyy-MM-dd'T'HH:mm:ss-05:00"),null));
													// ----- Call Document Generation Function- For New Business Process ------
													thisapp.Developer.addActivityLog("Invoice Creation For Transaction(Transaction.InvoiceCreateForTransaction)--" + recID.toString(),"Combined Doc Generation Function Triggered","Funcation Triggered Start -- " + transactionInfo.Policy_Type,"");
													get_trailer_policy.Is_Document_Generated="Yes";
													thisapp.Combine_Document.Trailer_Policy(transactionInfo.Creator_Quotation_ID.toLong());
												}
											}
											//-------------Boat Policy--------------
											if(transactionInfo.Policy_Type == "Boat Policy")
											{
												get_boat_policy = BoatQuote[ID == transactionInfo.Creator_Quotation_ID.toLong()];
												if(get_boat_policy.count() > 0)
												{
													zoho_CRM_ID = get_boat_policy.Zoho_Crm_ID;
													get_boat_policy.Payment_Date=paymentdate;
													get_boat_policy.Payment_Status="Paid";
													updatemap.put("Payment_Date",if(get_boat_policy.Payment_Date != null,get_boat_policy.Payment_Date.toTime("yyyy-MM-dd'T'HH:mm:ss").toString("yyyy-MM-dd'T'HH:mm:ss-05:00"),null));
													// ----- Call Document Generation Function- For New Business Process ------
													thisapp.Developer.addActivityLog("Invoice Creation For Transaction(Transaction.InvoiceCreateForTransaction)--" + recID.toString(),"Combined Doc Generation Function Triggered","Funcation Triggered Start -- " + transactionInfo.Policy_Type,"");
													get_boat_policy.Generate_Documentation_Manual="Yes";
													thisapp.Combine_Document.Boat_Policy(transactionInfo.Creator_Quotation_ID.toLong());
												}
											}
											//------------Update in CRM----------
											updatemap.put("Policy_Payment_Status","PAID");
											update_Deal = zoho.crm.updateRecord("Deals",zoho_CRM_ID.toLong(),updatemap);
											thisapp.Developer.addActivityLog("Invoice Creation For Transaction(Transaction.InvoiceCreateForTransaction)--" + recID.toString(),"Update Payment info in CRM","Update Map -- " + updatemap.toString(),"Response--" + update_Deal.toString());
											//----------Update Payment Date and Status End----------	
										}
										//----------------Create Payment Received Success Action End------------
									}
									else
									{
										transactionInfo.Payment_Status="Unpaid";
										if(transactionInfo.Policy_Type != null)
										{
											if(transactionInfo.Policy_Type == "Boat Policy")
											{
												get_BoatQuote = BoatQuote[ID == transactionInfo.Creator_Quotation_ID.toLong()];
												get_BoatQuote.Payment_Status="Failed-Due to Mismatch Total";
											}
											else
											{
												get_TrailerQuote = TrailerQuote[ID == transactionInfo.Creator_Quotation_ID.toLong()];
												get_TrailerQuote.Payment_Status="Failed-Due to Mismatch Total";
											}
										}
									}
								}
								else
								{
									transactionInfo.Payment_Status="Unpaid";
								}
								//-----------------Payment Received VValidation End-----------
								openUrl("https://crm.zoho.com/crm/org810798353/tab/Potentials/" + transactionInfo.CRM_ID,"same window");
							}
							//-----------If the Business Process is New Business End --------
							//-----------If the Business Process is Policy Change Start --------	
							if(transactionInfo.Business_Process == "Policy Change")
							{
								thisapp.Generic_Functions.Delay_Function({1,2,3,4,5,6,7,8,9,10,11,12,13,14,15});
								//-------------Trailer Policy Change---------
								if(transactionInfo.Policy_Type == "Trailer Policy")
								{
									get_trailer_policy_change = Trailer_Policy_Change_Request[ID == transactionInfo.Creator_Policy_Change_ID.toLong()];
									if(get_trailer_policy_change.count() > 0)
									{
										get_policy_change_transaction_trailer = Trailer_Transaction_History[Payment_ID == get_trailer_policy_change.Payment_ID && Payment_Status == "PAID"];
										if(get_policy_change_transaction_trailer.count() > 0)
										{
											historyavailable = true;
											Payable_Amount = get_policy_change_transaction_trailer.Amount_Payable;
										}
									}
								}
								//-------------Boat Policy Change---------
								if(transactionInfo.Policy_Type == "Boat Policy")
								{
									get_boat_policy_change = Boat_Policy_change_Request[ID == transactionInfo.Creator_Policy_Change_ID.toLong()];
									if(get_boat_policy_change.count() > 0)
									{
										get_policy_change_transaction_boat = Boat_Transaction_History[Payment_ID == get_boat_policy_change.Payment_ID && Payment_Status == "PAID"];
										if(get_policy_change_transaction_boat.count() > 0)
										{
											historyavailable = true;
											Payable_Amount = get_policy_change_transaction_boat.Amount_Payable;
										}
									}
								}
								//-----------------Create Payment Received------------
								if(historyavailable == true)
								{
									if(createResp.get("invoice").get("total") == Payable_Amount)
									{
										//----------------Create Payment Received in Books APi------------
										createbookspayment = invokeurl
										[
											url :"https://www.zohoapis.com/books/v3/customerpayments?organization_id=" + orgID
											type :POST
											parameters:createmap.toString()
											connection:"zoho_books"
										];
										//	info createbookspayment;
										thisapp.Developer.addActivityLog("Invoice Creation For Transaction(Transaction.InvoiceCreateForTransaction)--" + recID.toString(),"Create Payment Received Against Invoice in Books API Call Response",createmap.toString(),createbookspayment.toString());
										//----------------Create Payment Received Success Action ------------
										if(createbookspayment != null)
										{
											//--------------Update Status in Transaction Table-----------
											getInvoiceData = zoho.books.getRecordsByID("invoices","830242518",createResp.get("invoice").get("invoice_id"));
											getBooksInvoiceData = getInvoiceData.get("invoice");
											transactionInfo.Books_Invoice_Status=if(getBooksInvoiceData.get("status") == "paid","Paid",getBooksInvoiceData.get("status"));
											transactionInfo.Payment_Status=if(getBooksInvoiceData.get("status") == "paid","Paid",getBooksInvoiceData.get("status"));
										}
									}
									else
									{
										transactionInfo.Payment_Status="Unpaid";
									}
								}
								else
								{
									transactionInfo.Payment_Status="Unpaid";
								}
							}
							//-----------If the Business Process is Policy Change End --------
							//-----------If the Business Process is Renewal Start --------	
							/*	if(transactionInfo.Business_Process == "Renewal")
						{
							//---------------Get Transaction History-----------
							//-------------Trailer Policy-----------
							if(transactionInfo.Policy_Type == "Trailer Policy")
							{
								//--------------Check the Transaction Histroy-------
								get_transaction_history_trailer = Trailer_Transaction_History[Quote == transactionInfo.Creator_Quotation_ID.toLong() && Payment_For == "RENEWAL"];
								if(get_transaction_history_trailer.count() > 0)
								{
									historyavailable = true;
									Payable_Amount = get_transaction_history_trailer.Amount_Payable;
									paymentdate = get_transaction_history_trailer.Payment_Initiated_Date;
								}
							}
							//-------------Boat Policy-----------
							if(transactionInfo.Policy_Type == "Boat Policy")
							{
								get_transaction_history_boat = Boat_Transaction_History[Quote == transactionInfo.Creator_Quotation_ID.toLong() && Payment_For == "RENEWAL"];
								if(get_transaction_history_boat.count() > 0)
								{
									historyavailable = true;
									Payable_Amount = get_transaction_history_boat.Amount_Payable;
									paymentdate = get_transaction_history_boat.Payment_Initiated_Date;
								}
							}
							//---------------Get Transaction History End-----------
							//-----------------Payment Received Validation-----------
							//-------------If Transaction History Available------------	
							if(historyavailable == true)
							{
								//-------------If total Matches------
								if(createResp.get("invoice").get("total") == Payable_Amount)
								{
									//----------------Create Payment Received in Books APi------------
									createbookspayment = invokeurl
									[
										url :"https://www.zohoapis.com/books/v3/customerpayments?organization_id=" + orgID
										type :POST
										parameters:createmap.toString()
										connection:"zoho_books"
									];
									thisapp.Developer.addActivityLog("Invoice Creation For Transaction(Transaction.InvoiceCreateForTransaction)--" + recID.toString(),"Create Payment Received Against Invoice in Books API Call Response",createmap.toString(),createbookspayment.toString());
									//----------------Create Payment Received Success Action ------------
									if(createbookspayment != null)
									{
										//--------------Update Status in Transaction Table-----------
										getInvoiceData = zoho.books.getRecordsByID("invoices","830242518",createResp.get("invoice").get("invoice_id"));
										getBooksInvoiceData = getInvoiceData.get("invoice");
										transactionInfo.Books_Invoice_Status=if(getBooksInvoiceData.get("status") == "paid","Paid",getBooksInvoiceData.get("status"));
										transactionInfo.Payment_Status=if(getBooksInvoiceData.get("status") == "paid","Paid",getBooksInvoiceData.get("status"));
										//--------------Update Status in Quotation level in Creator and Boat-----------
										updatemap = Map();
										//-------------Trailer Policy--------------
										if(transactionInfo.Policy_Type == "Trailer Policy")
										{
											get_trailer_policy = TrailerQuote[ID == transactionInfo.Creator_Quotation_ID.toLong()];
											if(get_trailer_policy.count() > 0)
											{
												zoho_CRM_ID = get_trailer_policy.Zoho_Crm_ID;
												get_trailer_policy.Payment_Date=paymentdate;
												get_trailer_policy.Payment_Status="Paid";
												updatemap.put("Payment_Date",if(get_trailer_policy.Payment_Date != null,get_trailer_policy.Payment_Date.toTime("yyyy-MM-dd'T'HH:mm:ss").toString("yyyy-MM-dd'T'HH:mm:ss-05:00"),null));
											}
										}
										//-------------Boat Policy--------------
										if(transactionInfo.Policy_Type == "Boat Policy")
										{
											get_boat_policy = BoatQuote[ID == transactionInfo.Creator_Quotation_ID.toLong()];
											if(get_boat_policy.count() > 0)
											{
												zoho_CRM_ID = get_boat_policy.Zoho_Crm_ID;
												get_boat_policy.Payment_Date=paymentdate;
												get_boat_policy.Payment_Status="Paid";
												updatemap.put("Payment_Date",if(get_boat_policy.Payment_Date != null,get_boat_policy.Payment_Date.toTime("yyyy-MM-dd'T'HH:mm:ss").toString("yyyy-MM-dd'T'HH:mm:ss-05:00"),null));
											}
										}
										//------------Update in CRM----------
										updatemap.put("Policy_Payment_Status","PAID");
										update_Deal = zoho.crm.updateRecord("Deals",zoho_CRM_ID.toLong(),updatemap);
										thisapp.Developer.addActivityLog("Invoice Creation For Transaction(Transaction.InvoiceCreateForTransaction)--" + recID.toString(),"Update Payment info in CRM","Update Map -- " + updatemap.toString(),"Response--" + update_Deal.toString());
										//----------Update Payment Date and Status End----------	
									}
									//----------------Create Payment Received Success Action End------------
								}
								else
								{
									transactionInfo.Payment_Status="Unpaid";
									if(transactionInfo.Policy_Type != null)
									{
										if(transactionInfo.Policy_Type == "Boat Policy")
										{
											get_BoatQuote = BoatQuote[ID == transactionInfo.Creator_Quotation_ID.toLong()];
											get_BoatQuote.Payment_Status="Failed-Due to Mismatch Total";
										}
										else
										{
											get_TrailerQuote = TrailerQuote[ID == transactionInfo.Creator_Quotation_ID.toLong()];
											get_TrailerQuote.Payment_Status="Failed-Due to Mismatch Total";
										}
									}
								}
							}
							else
							{
								transactionInfo.Payment_Status="Unpaid";
							}
						}
						*/
							//-----------If the Business Process is Renewal End --------	
						}
					}
					else
					{
						thisapp.Developer.addActivityLog("Invoice Creation For Transaction(Transaction.InvoiceCreateForTransaction)--" + recID.toString(),"invoice in Books","Books ID is empty","");
					}
				}
				else
				{
					thisapp.Developer.addActivityLog("Invoice Creation For Transaction(Transaction.InvoiceCreateForTransaction)--" + recID.toString(),"search reponse from crm",get_CustomerCRM.tostring(),"");
				}
			}
		}
		thisapp.Developer.addActivityLog("Invoice Creation For Transaction(Transaction.InvoiceCreateForTransaction)--" + recID.toString(),"Create invoice in Books","Funcation Call End","");
	}
	catch (e)
	{
		info e;
		thisapp.Developer.addDeveloperLog("Transaction Table","Create Invoice & Payment Received(Transaction.InvoiceCreateForTransaction)--" + recID.toString(),"Error on Create invoice and payment received","",e,"creator");
	}
}