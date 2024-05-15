void Cancellation.Create_Credit_Note_in_Books(int recID, string invoiceid)
{
	try 
	{
		thisapp.Cancellation.Add_Audit_Log("Create_Credit_Note_in_Books",recID.toString(),"","Create Credit Note Function Starts");
		transactionDetails = Transaction_Table[ID == recID];
		if(transactionDetails.Tracking_of_creation_of_Charge == "Manual")
		{
			reference = "Manual";
		}
		else
		{
			reference = transactionDetails.Payment_ID;
		}
		get_invoice = Transaction_Table[Books_Invoice_ID == invoiceid];
		get_chartof_account = Accounts_Master[Product == get_invoice.Transaction_Details.Product_Name].Zoho_Books_ID;
		if(transactionDetails.count() > 0)
		{
			dataMap = Map();
			get_customer = Customer[ID == transactionDetails.Customer_Name];
			if(get_customer.count() > 0)
			{
				CRM_ID = get_customer.Zoho_Crm_ID;
			}
			get_CustomerCRM = zoho.crm.getRecordById("Contacts",CRM_ID.toLong());
			thisapp.Cancellation.Add_Audit_Log("Create_Credit_Note_in_Books",recID.toString(),get_CustomerCRM.toString(),"Get Customer Books ID from CRM Customer Response");
			if(get_CustomerCRM != null)
			{
				if(get_CustomerCRM.get("Zoho_Books_ID") != "" && get_CustomerCRM.get("Zoho_Books_ID") != null)
				{
					dataMap.put("customer_id",get_CustomerCRM.get("Zoho_Books_ID"));
					dataMap.put("date",transactionDetails.Date_field);
					ItemList = List();
					for each  rec in transactionDetails.Transaction_Details
					{
						itemMap = Map();
						itemMap.put("item_id",rec.Product_Name.Books_ID);
						itemMap.put("quantity",1);
						itemMap.put("description",rec.Description);
						itemMap.put("rate",rec.Amount);
						itemMap.put("tax_id",rec.Tax.Books_ID);
						itemMap.put("account_id",get_chartof_account);
					}
					ItemList.add(itemMap);
					dataMap.put("line_items",ItemList);
					dataMap.put("status","closed");
					dataMap.put("reference_number",reference);
					desc = get_invoice.Books_Invoice_Number + " - " + "https://books.zoho.com/app/830242518#/invoices/" + get_invoice.Books_Invoice_ID + "?filter_by=Status.All&per_page=200&sort_column=created_time&sort_order=A";
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
						if(secRec.Product_Name.Product_Name != "Admin Fee")
						{
							custmap3.put("api_name","cf_policy_commission");
							custmap3.put("value",ifnull(secRec.Commission_on_Policy,0.00));
							custom_list.add(custmap3);
						}
					}
					custom_list.add(custmap3);
					dataMap.put("custom_fields",custom_list);
					createResp = zoho.books.createRecord("creditnotes","830242518",dataMap);
					thisapp.Cancellation.Add_Audit_Log("Create_Credit_Note_in_Books",recID.toString(),createResp.toString(),"Credit Note Create in Books Response");
					//		info createResp.get("creditnote").get("creditnote_id");
					if(createResp != null)
					{
						transactionDetails.Books_CreditNotes_URL="https://books.zoho.com/app/830242518#/creditnotes/" + createResp.get("creditnote").get("creditnote_id") + "?filter_by=Status.All&per_page=25&sort_column=created_time&sort_order=D";
						transactionDetails.Books_CreditNote_Number=createResp.get("creditnote").get("creditnote_number");
						transactionDetails.Books_CreditNote_ID=createResp.get("creditnote").get("creditnote_id");
						//	--------------Refund Credit Note----------
						parameters_data = Map();
						parameters_data.put("date",createResp.get("creditnote").get("date"));
						parameters_data.put("refund_mode","Stripe");
						parameters_data.put("reference_number",reference);
						parameters_data.put("amount",createResp.get("creditnote").get("total"));
						get_refund_account = Accounts_Master[Process == "Refund Payment"].Zoho_Books_ID;
						parameters_data.put("from_account_id",get_refund_account);
						parameters_data.put("description",desc);
						//		info "Refund Map--" + parameters_data;
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
						//			info "Refund Response--" + response;
						transactionDetails.Refund_Status="Completed";
						thisapp.Cancellation.Add_Audit_Log("Create_Credit_Note_in_Books",recID.toString(),createResp.toString(),"Refund Against Credit Note in Books Response");
						//----------------------Refund Credit Note------------
						openUrl("https://crm.zoho.com/crm/org810798353/tab/Potentials/" + transactionDetails.CRM_ID,"same window");
					}
				}
			}
		}
		thisapp.Cancellation.Add_Audit_Log("Create_Credit_Note_in_Books",recID.toString(),"","Create Credit Note Function Ends");
	}
	catch (e)
	{
		thisapp.Developer.addDeveloperLog("Credit Note Creation--" + recID,"Create_Credit_Note_in_Books","Credit Note Resp --" + createResp,"Refund Response--" + response,e,"Creator");
	}
}