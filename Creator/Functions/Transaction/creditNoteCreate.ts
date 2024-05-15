void Transaction.creditNoteCreate(int recID, string invoiceid)
{
	try 
	{
		thisapp.Developer.addActivityLog("CreditNotes Creation--" + recID,"Function Call Start","ID","null");
		transactionDetails = Transaction_Table[ID == recID];
		get_invoice = Transaction_Table[Books_Invoice_ID == invoiceid];
		get_chartof_account = Accounts_Master[Product == get_invoice.Transaction_Details.Product_Name].Zoho_Books_ID;
		if(transactionDetails.Tracking_of_creation_of_Charge == "Manual")
		{
			reference = "Manual";
		}
		else
		{
			reference = transactionDetails.Payment_ID;
		}
		if(transactionDetails.count() > 0)
		{
			dataMap = Map();
			get_customer = Customer[ID == transactionDetails.Customer_Name];
			if(get_customer.count() > 0)
			{
				CRM_ID = get_customer.Zoho_Crm_ID;
			}
			get_CustomerCRM = zoho.crm.getRecordById("Contacts",CRM_ID.toLong());
			//info get_CustomerCRM;
			//	info "customer books id--" + get_CustomerCRM.get("Zoho_Books_ID");
			if(get_CustomerCRM != null)
			{
				if(get_CustomerCRM.get("Zoho_Books_ID") != "" && get_CustomerCRM.get("Zoho_Books_ID") != null)
				{
					dataMap.put("customer_id",get_CustomerCRM.get("Zoho_Books_ID"));
					dataMap.put("date",transactionDetails.Date_field);
					ItemList = List();
					// 					info " transactionDetails " + transactionDetails;
					for each  rec in transactionDetails.Transaction_Details
					{
						// 						info "descript " + rec.Description;
						// 						info "rate " + rec.Amount;
						itemMap = Map();
						itemMap.put("quantity",1);
						itemMap.put("description",rec.Description);
						// 						itemMap.put("rate",if(rec.Amount > 0,rec.Amount,rec.Amount * -1));  .round(2)
						if(rec.Amount > 0)
						{
							itemMap.put("rate",rec.Amount);
						}
						else
						{
							decAmnt = rec.Amount * -1;
							itemMap.put("rate",decAmnt);
							// 							itemMap.put("rate",120.00);
						}
						//	info "else rec ";
						itemMap.put("account_id",get_chartof_account);
						itemMap.put("tax_id",rec.Tax.Books_ID);
						get_Product = Product[ID == rec.Product_Name];
						if(get_Product.count() > 0)
						{
							itemMap.put("item_id",get_Product.Books_ID);
						}
						ItemList.add(itemMap);
					}
					// 					info "itemMap = " + itemMap;
					dataMap.put("line_items",ItemList);
					dataMap.put("status","closed");
					dataMap.put("reference_number",get_invoice.Books_Invoice_Number);
					desc = get_invoice.Books_Invoice_Number + " - " + "https://books.zoho.com/app/830242518#/invoices/" + get_invoice.Books_Invoice_ID + "?filter_by=Status.All&per_page=200&sort_column=created_time&sort_order=A";
					//----------------------Map Custom Field-------------
					custom_list = List();
					custommap = Map();
					custommap.put("api_name","cf_invoice_details");
					custommap.put("value",desc);
					custom_list.add(custommap);
					custmap2 = Map();
					custmap2.put("api_name","cf_policy_type");
					custmap2.put("value",transactionDetails.Policy_Type);
					custom_list.add(custmap2);
					custmap3 = Map();
					custmap3.put("api_name","cf_policy_commission");
					for each  secRec in transactionDetails.Transaction_Details
					{
						// 						if(secRec.Commission_on_Policy != null)
						// 						{
						// 							custmap3.put("value",secRec.Commission_on_Policy);
						// 						}
						// 						else
						// 						{
						// 							custmap3.put("value",0.00);
						// 						}
						if(secRec.Product_Name.Product_Name != "Admin Fee")
						{
							custmap3.put("api_name","cf_policy_commission");
							custmap3.put("value",ifnull(secRec.Commission_on_Policy,0.00));
							custom_list.add(custmap3);
						}
					}
					custom_list.add(custmap3);
					dataMap.put("custom_fields",custom_list);
					//----------------------Map Custom Field-------------
					dataMap.put("reference_number",get_invoice.Books_Invoice_Number);
					createResp = zoho.books.createRecord("creditnotes","830242518",dataMap);
					// 					info createResp;
					// 					info createResp.get("creditnote").get("creditnote_id");
					thisapp.Developer.addActivityLog("Credit Note Creation--" + recID,"Function Call Ended and Creadit Note created ","ID---" + recID.tostring(),createResp.tostring());
					if(createResp != null)
					{
						//	info createResp;
						transactionDetails.Books_CreditNote_ID=createResp.get("creditnote").get("creditnote_id");
						transactionDetails.Books_CreditNote_Number=createResp.get("creditnote").get("creditnote_number");
						transactionDetails.Books_CreditNotes_URL="https://books.zoho.com/app/830242518#/creditnotes/" + createResp.get("creditnote").get("creditnote_id") + "?filter_by=Status.All&per_page=25&sort_column=created_time&sort_order=D";
						//-------------Trailer Policy Change---------
						historyavailable = false;
						Payable_Amount = 0;
						if(transactionDetails.Policy_Type == "Trailer Policy")
						{
							get_trailer_policy_change = Trailer_Policy_Change_Request[ID == transactionDetails.Creator_Policy_Change_ID.toLong()];
							if(get_trailer_policy_change.count() > 0)
							{
								get_policy_change_transaction_trailer = Trailer_Transaction_History[Payment_ID == get_trailer_policy_change.Payment_ID];
								if(get_policy_change_transaction_trailer.count() > 0)
								{
									historyavailable = true;
									Payable_Amount = get_policy_change_transaction_trailer.Amount_Payable;
								}
							}
						}
						//-------------Boat Policy Change---------
						if(transactionDetails.Policy_Type == "Boat Policy")
						{
							get_boat_policy_change = Boat_Policy_change_Request[ID == transactionDetails.Creator_Policy_Change_ID.toLong()];
							if(get_boat_policy_change.count() > 0)
							{
								get_policy_change_transaction_boat = Boat_Transaction_History[Payment_ID == get_boat_policy_change.Payment_ID];
								if(get_policy_change_transaction_boat.count() > 0)
								{
									historyavailable = true;
									Payable_Amount = get_policy_change_transaction_boat.Amount_Payable;
								}
							}
						}
						// 						info "History" + historyavailable;
						if(historyavailable = true)
						{
							// 							info "histroy";
							if(Payable_Amount == createResp.get("invoice").get("total"))
							{
								// 								info "total ";
								//--------------refund Credit Note ----------
								parameters_data = Map();
								parameters_data.put("date",createResp.get("creditnote").get("date"));
								parameters_data.put("refund_mode","Stripe");
								parameters_data.put("reference_number",get_invoice.Books_Invoice_Number);
								parameters_data.put("amount",createResp.get("creditnote").get("total"));
								get_refund_account = Accounts_Master[Process == "Refund Payment"].Zoho_Books_ID;
								parameters_data.put("from_account_id",get_refund_account);
								parameters_data.put("description",desc);
								// 								info "refund Data ----" + parameters_data;
								// 								info "Credit note ----" + createResp.get("creditnote").get("creditnote_id");
								headers_data = Map();
								headers_data.put("content-type","application/json");
								response = invokeurl
								[
									url :"https://www.zohoapis.com/books/v3/creditnotes/" + createResp.get("creditnote").get("creditnote_id") + "/refunds?organization_id=830242518"
									type :POST
									parameters:parameters_data.toString()
									headers:headers_data
									connection:"zoho_books"
								];
								//			info "Invoice Applied --" + response;
								// ---------end -------
								openUrl("https://crm.zoho.com/crm/org810798353/tab/Potentials/" + transactionDetails.CRM_ID,"parent window");
								Refund_Status = "Completed";
							}
							else
							{
								Refund_Status = "Not Initiated";
							}
						}
						else
						{
							Refund_Status = "Not Initiated";
						}
					}
				}
			}
		}
	}
	catch (e)
	{
		//		info e;
		thisapp.Developer.addDeveloperLog("Transaction Table","CreditNotesCreation:" + recID.tostring(),"Credit note Creation details",recID.tostring(),e,"creator");
	}
}