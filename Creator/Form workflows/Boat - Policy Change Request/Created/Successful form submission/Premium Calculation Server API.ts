//-------------Jana----------
if(input.Select_Type == "Premium Generating")
	{
		if(Generate_Payment_Link == true)
		{
			thisapp.Policy_Change_Declaration.Boat_Trailer_Policy_Send_Mail(input.ID,"Boat");
		}
		//-----------End------------
		if(input.Total_Payable_Premium_after_tax != null && input.New_Total_Payable_Premium_after_tax != null)
		{
			if(input.Total_Payable_Premium_after_tax < New_Total_Payable_Premium_after_tax)
			{
				input.Old_and_New_Premium_Difference = input.New_Total_Payable_Premium_after_tax - input.Total_Payable_Premium_after_tax;
				/*
			1.Auto Charge API call server to server needs to configure
			2.If the Server Response Fail 
			3.then we need to update outsanding to Quotation Outsatnding
			4.Transaction History Needs to Added
			*/
				// 		if(serverresp.get("success") == true)
				// 		{
				// 			//-------actions
				// 			if(input.Changes_Approved == "Yes" && input.Select_Charge_Type == "Auto Charge/Refund")
				// 			{
				// 				//Need Auto charge API to call here
				// 				input.Payment_Status = "Paid";
				// 				input.Payment_Date = zoho.currentdate;
				// 				//update the policy with new changes -- API is need to add		
				// 				thisapp.Transaction.createTransactioninBoatPolicy(input.ID,Tracking_of_creation_of_Charge);
				// 			}
				// 		}
				// 		else
				// 		{
				// 			//-------actions
				// 			if(input.Changes_Approved == "No")
				// 			{
				// 				input.Payment_Status = "Unpaid";
				// 				input.Payment_Transaction_Status = "Failed";
				// 			}
				// 			else if(input.Changes_Approved == "Yes" && input.Select_Charge_Type == "Send Payment/Deposit link")
				// 			{
				// 				input.Payment_Status = "Unpaid";
				// 				input.Payment_Transaction_Status = "Failed";
				// 			}
				// 		}
			}
			//-----------Auto Chrge API Call End----------
			else if(input.Total_Payable_Premium_after_tax > New_Total_Payable_Premium_after_tax)
			{
				input.Old_and_New_Premium_Difference = input.New_Total_Payable_Premium_after_tax - input.Total_Payable_Premium_after_tax;
				/*
			1.Auto Credit API call server to server needs to configure
			2.If the Server Response Fail 
			3.then we need to update outsanding to Quotation Outsatnding
			4.Transaction History Needs to Added
			*/
				Type_of_Transaction = "Credit Note";
				Tracking_of_creation_of_Charge = "Auto-Credit";
				// 		//-----------Auto Credit API Call----------
				// 		fetchEndPoint = API_Configuration[Name_Process == "Boat Auto credit API"].End_Point;
				// 		parammap = Map();
				// 		parammap.put("quote_record_id",input.BoatQuote_ID.Quote_ID);
				// 		parammap.put("organization_id",thisapp.Server_Side.org_info());
				// 		parammap.put("amount",input.New_Total_Payable_Premium_after_tax);
				// 		parammap.put("payment_intent_id",input.BoatQuote_ID.Stripe_Customer_ID);
				//-----------Auto Credit API Call End----------
			}
			//---------------------Add Transaction History-----------
			//----------------Pooduct Name from CRM------
			// 	search_crm = zoho.crm.searchRecords("Products","(Product_Name:equals:Boat Policy Change)");
			// 	if(search_crm.size() > 0)
			// 	{
			// 		Product_Name = search_crm.getJSON("id").toNumber();
			// 	}
			//----------------Pooduct Name End------
			//------------Get Tax------------
			//------------get Tax-----------
			// 	input.Tax = 0;
			// 	tax = Tax_Lists[State_Province.containsIgnoreCase(input.Please_select_the_province_your_boat_is_used_in)];
			// 	if(tax != null)
			// 	{
			// 		input.Tax = tax.ID;
			// 	}
			// 	itemcollection = Collection();
			// 	row1 = Transaction_Table.Transaction_Details();
			// 	row1.Product_Name=Product_Name;
			// 	row1.Description="Boat Policy Change Request - Premium ReCalculation";
			// 	row1.Amount=input.New_Total_Premium_before_tax;
			// 	//	row1.Tax=Tax;
			// 	row1.Tax_Amount=input.New_Total_Tax;
			// 	row1.Amount_With_Tax=input.New_Total_Payable_Premium_after_tax;
			// 	itemcollection.insert(row1);
			// 	resp = insert into Transaction_Table
			// 	[
			// 		Policy_Number=input.Policy_Number
			// 		Deal_Name=input.Zoho_Crm_ID
			// 		Customer_Name=input.Customer_ID
			// 		Date_field=zoho.currentdate
			// 		Business_Process="Policy Change"
			// 		Type_of_Transaction=Type_of_Transaction
			// 		Tracking_of_creation_of_Charge=Tracking_of_creation_of_Charge
			// 		Policy_Type="Boat Policy"
			// 		CRM_ID=input.Zoho_Crm_ID
			// 		Total_Amount_With_Tax=input.New_Total_Payable_Premium_after_tax
			// 		Transaction_Details=itemcollection
			// 		Added_User=zoho.loginuser
			// 	];
			// 	if ( resp != null ) 
			//     {
			// 		if ( Type_of_Transaction == "Invoice" ) 
			//         {
			// 			thisapp.Transaction.InvoiceCreateForTransaction(resp);
			//         }
			// 		else if ( Type_of_Transaction == "Credit Note") 
			//         {
			// 			thisapp.Transaction.creditNoteCreate(resp);
			//         }
			//     }
		}
		// Changes Approved based auto charge api call and transaction create
		tax = "";
		fetchBoat = BoatQuote[ID = input.BoatQuote_ID];
		if(input.Override_Tax_by_Admin == "Yes")
		{
			tax = input.Override_Tax;
		}
		else
		{
			tax = Tax_Lists[State_Province == fetchBoat.Tax_Province].ID;
		}
		if(input.Changes_Approved == "Yes" && input.Select_Charge_Type == "Auto Charge/Refund")
		{
			if(input.Total < 0)
			{
				if(input.New_Tax_Percent == fetchBoat.Tax_Precent)
				{
					//Auto credit function call
					thisapp.Transaction.BoatautocreditFunction(input.ID);
				}
				else
				{
					input.Payment_Status = "Failed - Tax Percent Mismatch";
				}
			}
			else
			{
				Type_of_Transaction = "Invoice";
				Tracking_of_creation_of_Charge = "Auto-Charge";
				//-----------Auto Chrge API Call----------
				fetchEndPoint = API_Configuration[Name_Process == "Boat AutoCharge API"].End_Point;
				parammap = Map();
				parammap.put("quote_record_id",input.BoatQuote_ID.Quote_Record_ID_Server);
				parammap.put("organization_id",thisapp.Server_Side.org_info());
				parammap.put("payment_method_id",input.BoatQuote_ID.Stripe_Payment_Method_ID);
				parammap.put("stripe_customer_id",input.BoatQuote_ID.Stripe_Customer_ID);
				parammap.put("payment_for","POLICY_CHANGE");
				parammap.put("policy_change_balance",input.Total);
				serverresp = thisapp.Server_Side.callServer("POST",fetchEndPoint,parammap);
				addRecordAudittracking = insert into Policy_Change_Audit_Tracking
				[
					Added_User=zoho.loginuser
					Process="AutoCharge API"
					In_Response=parammap
					Out_Response=serverresp
					Description="Autocharge API Failed"
				];
				// 		PaymentStat = "Success";
				//serverresp = serverresp.toMap();
				if(serverresp.get("success") == true)
				{
					//serverresp.get("success") == true   PaymentStat == "Success"
					input.Payment_Status = "Paid";
					input.Payment_Date = zoho.currentdate;
					autoChargePaymentID = serverresp.get("data").get("payment_id");
					input.Payment_ID = serverresp.get("data").get("payment_id");
					// 			autoChargePaymentID = "PAY_660fe47acfd6ed7424346bc3";
					//Create the transaction table   "PAY_660fe47acfd6ed7424346bc3"
					// 			thisapp.Transaction.createTransactioninBoatPolicy(input.ID,input.New_Total_Premium_before_tax,tax.toLong(),Tracking_of_creation_of_Charge,autoChargePaymentID,"");
				}
				else
				{
					input.Payment_Status = "Unpaid";
					input.Payment_Transaction_Status = "Failed";
				}
			}
		}
		else if(input.Changes_Approved == "No")
		{
			input.Payment_Status = "Unpaid";
			input.Payment_Transaction_Status = "Failed";
		}
		else if(input.Changes_Approved == "Yes" && input.Select_Charge_Type == "Send Payment/Deposit link")
		{
			input.Payment_Status = "Unpaid";
			input.Payment_Transaction_Status = "Failed";
		}
		//Auto credit create 
	}
	else if(input.Select_Type == "Non-Premium Generating")
	{
		input.Payment_Status = "Unpaid";
		input.Payment_Transaction_Status = "Failed";
	}
	