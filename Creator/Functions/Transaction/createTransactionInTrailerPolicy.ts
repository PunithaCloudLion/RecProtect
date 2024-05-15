string Transaction.createTransactionInTrailerPolicy(int trailerPolicyID, float amount, int tax, String creationOfCharge, String paymentID, string InvoiceID)
{
	try 
	{
		thisapp.Developer.addActivityLog("Trailer Transaction Table Create function(Transaction.createTransactioninBoatPolicy) --" + trailerPolicyID.toString(),"Trailer - Auto credit function--" + trailerPolicyID.toString(),"Start","");
		trailerPolicyInfo = Trailer_Policy_Change_Request[ID == trailerPolicyID];
		trailerQuoteInfo = TrailerQuote[ID == trailerPolicyInfo.TrailerQuote_ID];
		// 	info "Total Value -------" + trailerPolicyInfo.Total;
		resp1 = "";
		if(trailerPolicyInfo.Total > 0 || trailerPolicyInfo.Total < 0 && trailerPolicyInfo.Total != null)
		{
			if(trailerPolicyInfo.Total > 0)
			{
				amountvalue = trailerPolicyInfo.Total;
				poratedValue = trailerPolicyInfo.Prorated;
				trailerPolicyInfo.Old_and_New_Premium_Difference=trailerPolicyInfo.New_Total_Payable_Premium_after_tax - trailerPolicyInfo.Total_Payable_Premium_after_tax;
				TypeofTransaction = "Invoice";
			}
			else if(trailerPolicyInfo.Total < 0)
			{
				amountvalue = trailerPolicyInfo.Total;
				poratedValue = trailerPolicyInfo.Prorated;
				trailerPolicyInfo.Old_and_New_Premium_Difference=trailerPolicyInfo.New_Total_Payable_Premium_after_tax - trailerPolicyInfo.Total_Payable_Premium_after_tax;
				TypeofTransaction = "Credit Note";
			}
			//---------------------Add Transaction History-----------
			//----------------Pooduct Name from CRM----- 
			get_product = Product[Product_Name == "Trailer Policy Change"];
			if(get_product.count() > 0)
			{
				Product_Name = get_product.ID;
			}
			// 		info "Product name--------" + Product_Name;
			// 	----------------Pooduct Name End------
			// 	------------Get Tax------------
			// 	------------get Tax-----------
			// 		Tax = 0;
			// 		tax = Tax_Lists[State_Province.containsIgnoreCase(trailerPolicyInfo.Please_select_the_province_your_trailer_is_located_in)];
			// 		if(tax.count() > 0)
			// 		{
			// 			TaxID = tax.ID;
			// 		}
			newTax = null;
			newAmountWithTax = null;
			taxAmountValue = null;
			getTax = Tax_Lists[ID == tax];
			itemcollection = Collection();
			row1 = Transaction_Table.Transaction_Details();
			row1.Product_Name=Product_Name;
			row1.Description="Policy Number: " + trailerPolicyInfo.Policy_Number + ", Quote ID: " + trailerPolicyInfo.Quote_ID;
			row1.Amount=poratedValue;
			//-----------------Commission Calculation------------
			//--------------Policy Commission----------------
			get_policy_commission = Commissions_Configuration[Commision == "Commission on Policy"].Percent;
			policy_commsission = ifnull(poratedValue,0) * ifnull(get_policy_commission,0) / 100;
			row1.Commission_on_Policy=policy_commsission;
			//-------------Commission to Sales Rep----------------
			salesrepcommission = 0;
			// 			if(trailerQuoteInfo.Business_Source == "SalesRep")
			// 			{
			get_crm_owner = zoho.crm.getRecordById("Deals",trailerQuoteInfo.Zoho_Crm_ID.toLong());
			if(get_crm_owner.size() > 0)
			{
				owner_id = get_crm_owner.get("Owner").get("id");
				get_salesrep_commission = Commissions_for_Sales_Rep[Sales_Rep.CRM_ID == owner_id];
				if(get_salesrep_commission.count() > 0)
				{
					if(get_salesrep_commission.Select_Type_of_Commision == "Flat Rate")
					{
						salesrepcommission = get_salesrep_commission.Flat_Commision;
					}
					else
					{
						salesrepcommission = ifnull(poratedValue,0) * ifnull(get_salesrep_commission.Commission,0) / 100;
					}
					row1.Commission_to_SalesRep=salesrepcommission;
				}
			}
			//	}
			//-------------Commission with RecProtect---------------
			row1.Commission_with_RecProtect=ifnull(policy_commsission,0) - ifnull(salesrepcommission,0);
			//-----------------Commission Calculation End------------	
			row1.Tax=getTax.ID;
			taxAmountValue = poratedValue * getTax.Tax / 100;
			row1.Tax_Amount=taxAmountValue;
			row1.Amount_With_Tax=poratedValue + taxAmountValue;
			itemcollection.insert(row1);
			//-----------------Fee-----------
			if(trailerPolicyInfo.Admin_Fee != null && trailerPolicyInfo.Waive_Fee != true)
			{
				//--------------Calculate Stripe Charges-----------
				stripefee = 0.029 * ifnull(trailerPolicyInfo.Admin_Fee,0) + 0.30;
				adminfee = trailerPolicyInfo.Admin_Fee - stripefee;
				//-----------Add Admin Fee as a line item-----------	
				row2 = Transaction_Table.Transaction_Details();
				row2.Product_Name=Product[Product_Name == "Admin Fee"].ID;
				row2.Description="Policy Number: " + trailerPolicyInfo.Policy_Number + ", Quote ID: " + trailerPolicyInfo.Quote_ID;
				row2.Amount=adminfee;
				row2.Tax=getTax.ID;
				Tax_Amount = ifnull(adminfee,0) * ifnull(getTax.Tax,0) / 100;
				row2.Tax_Amount=Tax_Amount;
				row2.Amount_With_Tax=adminfee + Tax_Amount;
				itemcollection.insert(row2);
				newTax = Tax_Amount;
				newAmountWithTax = adminfee + Tax_Amount;
				//-----------Add Stripe Fee as a line item-----------
				row3 = Transaction_Table.Transaction_Details();
				row3.Product_Name=Product[Product_Name == "Stripe Fee"].ID;
				row3.Description="Policy Number: " + trailerPolicyInfo.Policy_Number + ", Quote ID: " + trailerPolicyInfo.Quote_ID;
				row3.Amount=stripefee;
				row3.Tax=getTax.ID;
				Tax_Amount = ifnull(stripefee,0) * ifnull(getTax.Tax,0) / 100;
				row3.Tax_Amount=Tax_Amount;
				row3.Amount_With_Tax=stripefee + Tax_Amount;
				itemcollection.insert(row3);
			}
			resp = insert into Transaction_Table
			[
				Added_User=zoho.loginuser
				Policy_Number=trailerPolicyInfo.Policy_Number
				Deal_Name=trailerPolicyInfo.Zoho_Crm_ID
				Customer_Name=ifnull(trailerPolicyInfo.Customer_ID,null)
				Date_field=zoho.currentdate
				Business_Process="Policy Change"
				Type_of_Transaction=TypeofTransaction
				Tracking_of_creation_of_Charge=creationOfCharge
				Policy_Type="Trailer Policy"
				CRM_ID=trailerPolicyInfo.Zoho_Crm_ID
				Transaction_Details=itemcollection
				Payment_ID=paymentID
				Total_Amount_Without_Tax=poratedValue + ifnull(trailerPolicyInfo.Admin_Fee,0.00)
				Tax_Amount=trailerPolicyInfo.Tax
				Total_Amount_With_Tax=amountvalue
				Creator_Policy_Change_ID=trailerPolicyInfo.ID
				Stripe_Payment_Method_ID=trailerQuoteInfo.Stripe_Payment_Method_ID
				Stripe_Customer_ID=trailerQuoteInfo.Stripe_Customer_ID
			];
			// 		info "Transaction Insert Response -->" + resp;
			resp1 = resp;
			thisapp.Developer.addActivityLog("Trailer Transaction Create function(Transaction.createTransactioninBoatPolicy--)" + trailerPolicyID.toString(),"Trailer - Transaction Create function--" + trailerPolicyID.toString(),"Transaction Table Insert  "," ID ----------" + resp);
			if(resp != null)
			{
				if(TypeofTransaction == "Invoice")
				{
					thisapp.Transaction.InvoiceCreateForTransaction(resp);
				}
				else if(TypeofTransaction == "Credit Note")
				{
					if(creationOfCharge == "Manual")
					{
						if(InvoiceID == "" || InvoiceID == null)
						{
							get_base_invoice = Transaction_Table[Auto_Credit_Status == "Failed" && Policy_Number == trailerPolicyInfo.Policy_Number && Business_Process == "New Business" || Business_Process == "Renewal"];
							if(get_base_invoice.count() > 0)
							{
								InvoiceID = get_base_invoice.Books_Invoice_ID;
								get_base_invoice.Credit_Note_Creation="Completed";
								get_base_invoice.Auto_Credit_Status="Success";
							}
						}
					}
					thisapp.Transaction.creditNoteCreate(resp,InvoiceID);
				}
				trailerPolicyInfo.Payment_Transaction_Status="Completed";
			}
		}
		thisapp.Developer.addActivityLog(" Trailer Transaction Table Create function(Transaction.createTransactioninBoatPolicy) --" + trailerPolicyID.toString(),"Trailer - Auto credit function--" + trailerPolicyID.toString(),"End","");
	}
	catch (e)
	{
		//	info e;
		thisapp.Developer.addDeveloperLog("Transaction table Create Trailer function(Transaction.createTransactioninBoatPolicy) -- " + trailerPolicyInfo.ID.toString(),"Trailer Transaction table create Function:" + trailerPolicyInfo.ID.toString(),"Trailer create Transaction table and Create invoice and Credit Note in books","",e,"Creator");
	}
	return resp1;
}