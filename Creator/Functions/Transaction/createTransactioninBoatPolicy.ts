string Transaction.createTransactioninBoatPolicy(int boatPolicyID, float amount, int tax, String creationOfCharge, String paymentID, string InvoiceID)
{
	try 
	{
		// 		boatPolicyID = 4564627000001899023;
		// 		amount = 1459.00;
		// 		tax = 4564627000000338213;
		// 		creationOfCharge = "Manual";
		thisapp.Developer.addActivityLog(" Boat Transaction Table Create function(Transaction.createTransactioninBoatPolicy) --" + boatPolicyID.toString(),"Boat - Auto credit function--" + boatPolicyID.toString(),"Start","");
		boatPolicyInfo = Boat_Policy_change_Request[ID == boatPolicyID];
		boatQuoteInfo = BoatQuote[ID == boatPolicyInfo.BoatQuote_ID];
		resp1 = "";
		if(boatPolicyInfo.Total > 0 || boatPolicyInfo.Total < 0 && boatPolicyInfo.Total != null)
		{
			if(boatPolicyInfo.Total > 0)
			{
				amountvalue = boatPolicyInfo.Total;
				poratedValue = boatPolicyInfo.Prorated;
				boatPolicyInfo.Old_and_New_Premium_Difference=boatPolicyInfo.New_Total_Payable_Premium_after_tax - boatPolicyInfo.Total_Payable_Premium_after_tax;
				TypeofTransaction = "Invoice";
			}
			else if(boatPolicyInfo.Total < 0)
			{
				amountvalue = boatPolicyInfo.Total;
				poratedValue = boatPolicyInfo.Prorated;
				boatPolicyInfo.Old_and_New_Premium_Difference=boatPolicyInfo.New_Total_Payable_Premium_after_tax - boatPolicyInfo.Total_Payable_Premium_after_tax;
				//function calling
				TypeofTransaction = "Credit Note";
			}
			//---------------------Add Transaction History-----------
			//----------------Pooduct Name from CRM------
			// 	if(TypeofTransaction = "Invoice")
			// 	{
			get_product = Product[Product_Name == "Boat Policy Change"];
			if(get_product.count() > 0)
			{
				Product_Name = get_product.ID;
			}
			// 		info "Prdocut name--------" + Product_Name;
			// 	----------------Pooduct Name End------
			// 	------------Get Tax------------
			// 	------------get Tax-----------
			//Tax = 0;
			// 		tax = Tax_Lists[State_Province.containsIgnoreCase(boatPolicyInfo.Please_select_the_province_your_boat_is_used_in)];
			// 		if(tax.count() > 0)
			// 		{
			// 			TaxID = tax.ID;
			// 		}
			// 		newProratedList = "";
			newTax = null;
			newAmountWithTax = null;
			taxAmountValue = null;
			getTax = Tax_Lists[ID == tax];
			itemcollection = Collection();
			row1 = Transaction_Table.Transaction_Details();
			row1.Product_Name=Product_Name;
			row1.Description="Policy Number: " + boatPolicyInfo.Policy_Number + ", Quote ID: " + boatPolicyInfo.Quote_ID;
			row1.Amount=poratedValue;
			//-----------------Commission Calculation------------
			//-----------------Commission Calculation------------
			//--------------Policy Commission----------------
			get_policy_commission = Commissions_Configuration[Commision == "Commission on Policy"].Percent;
			policy_commsission = ifnull(poratedValue,0) * ifnull(get_policy_commission,0) / 100;
			row1.Commission_on_Policy=policy_commsission;
			//-------------Commission to Sales Rep----------------
			salesrepcommission = 0;
			// 			if(boatQuoteInfo.Business_Source == "SalesRep")
			// 			{
			get_crm_owner = zoho.crm.getRecordById("Deals",boatQuoteInfo.Zoho_Crm_ID.toLong());
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
			//-----------------Commission Calculation End------------	
			row1.Tax=getTax.ID;
			taxAmountValue = poratedValue * getTax.Tax / 100;
			row1.Tax_Amount=taxAmountValue;
			row1.Amount_With_Tax=poratedValue + taxAmountValue;
			itemcollection.insert(row1);
			//-----------------Fee-----------
			// 			info boatPolicyInfo.Admin_Fee ; 
			if(boatPolicyInfo.Admin_Fee != null && boatPolicyInfo.Waive_Free != true)
			{
				//--------------Calculate Stripe Charges-----------
				stripefee = 0.029 * ifnull(boatPolicyInfo.Admin_Fee,0) + 0.30;
				adminfee = boatPolicyInfo.Admin_Fee - stripefee;
				//-----------Add Admin Fee as a line item-----------
				row2 = Transaction_Table.Transaction_Details();
				row2.Product_Name=Product[Product_Name == "Admin Fee"].ID;
				row2.Description="Policy Number: " + boatPolicyInfo.Policy_Number + ", Quote ID: " + boatPolicyInfo.Quote_ID;
				row2.Amount=adminfee;
				row2.Tax=getTax.ID;
				Tax_Amount = ifnull(adminfee,0) * ifnull(getTax.Tax.toDecimal(),0) / 100;
				row2.Tax_Amount=Tax_Amount;
				row2.Amount_With_Tax=adminfee + Tax_Amount;
				itemcollection.insert(row2);
				newTax = Tax_Amount;
				newAmountWithTax = adminfee + Tax_Amount;
				//-----------Add Stripe Fee as a line item-----------
				row3 = Transaction_Table.Transaction_Details();
				row3.Product_Name=Product[Product_Name == "Stripe Fee"].ID;
				row3.Description="Policy Number: " + boatPolicyInfo.Policy_Number + ", Quote ID: " + boatPolicyInfo.Quote_ID;
				row3.Amount=stripefee;
				row3.Tax=getTax.ID;
				Tax_Amount = ifnull(stripefee,0) * ifnull(getTax.Tax.toDecimal(),0) / 100;
				row3.Tax_Amount=Tax_Amount;
				row3.Amount_With_Tax=stripefee + Tax_Amount;
				itemcollection.insert(row3);
			}
			resp = insert into Transaction_Table
			[
				Added_User=zoho.loginuser
				Policy_Number=boatPolicyInfo.Policy_Number
				Deal_Name=boatPolicyInfo.Zoho_Crm_ID.toNumber()
				Customer_Name=ifnull(boatPolicyInfo.Customer_ID,null)
				Date_field=zoho.currentdate
				Business_Process="Policy Change"
				Type_of_Transaction=TypeofTransaction
				Tracking_of_creation_of_Charge=creationOfCharge
				Policy_Type="Boat Policy"
				CRM_ID=boatPolicyInfo.Zoho_Crm_ID
				Transaction_Details=itemcollection
				Payment_ID=paymentID
				Total_Amount_Without_Tax=poratedValue + ifnull(boatPolicyInfo.Admin_Fee,0)
				Tax_Amount=boatPolicyInfo.Tax
				Total_Amount_With_Tax=amountvalue
				Creator_Policy_Change_ID=boatPolicyInfo.ID
				Stripe_Payment_Method_ID=boatQuoteInfo.Stripe_Payment_Method_ID
				Stripe_Customer_ID=boatQuoteInfo.Stripe_Customer_ID
			];
			// 		info "Transaction Insert Response -->" + resp;
			resp1 = resp;
			thisapp.Developer.addActivityLog("Boat Transaction Create function(Transaction.createTransactioninBoatPolicy--)" + boatPolicyID.toString(),"Boat - Transaction Create function--" + boatPolicyID.toString(),"Transaction Table Insert  "," ID ----------" + resp);
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
							get_base_invoice = Transaction_Table[Auto_Credit_Status == "Failed" && Policy_Number == boatPolicyInfo.Policy_Number && Business_Process == "New Business" || Business_Process == "Renewal"];
							// 							info "books invoice" + get_base_invoice;
							if(get_base_invoice.count() > 0)
							{
								// 								info "inside get based" ;
								InvoiceID = get_base_invoice.Books_Invoice_ID;
								get_base_invoice.Credit_Note_Creation="Completed";
								get_base_invoice.Auto_Credit_Status="Success";
							}
						}
					}
					// 					info "before 132";
					thisapp.Transaction.creditNoteCreate(resp,InvoiceID);
				}
				boatPolicyInfo.Payment_Status="Paid";
				boatPolicyInfo.Payment_Transaction_Status="Completed";
			}
		}
		thisapp.Developer.addActivityLog(" Boat Transaction Table Create function(Transaction.createTransactioninBoatPolicy) --" + boatPolicyID.toString(),"Boat - Auto credit function--" + boatPolicyID.toString(),"End","");
	}
	catch (e)
	{
		thisapp.Developer.addDeveloperLog("Transaction table Create Boat function(Transaction.createTransactioninBoatPolicy) -- " + boatPolicyInfo.ID.toString(),"Boat Transaction table create Function:" + boatPolicyInfo.ID.toString(),"Boat create Transaction table and Create invoice and Credit Note in books","",e,"Creator");
	}
	return resp1;
}