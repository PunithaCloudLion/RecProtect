void Transaction.TrailerautoCreditFunction(int trailerPolicyID)
{
	try 
	{
		thisapp.Developer.addActivityLog("Auto credit function(Transaction.TrailerautoCreditFunction) --" + trailerPolicyID.toString(),"Trailer - Auto credit function--" + trailerPolicyID.toString(),"Start","");
		trailerPolicyInfo = Trailer_Policy_Change_Request[ID == trailerPolicyID];
		//	info trailerPolicyInfo;
		if(trailerPolicyInfo.count() > 0)
		{
			//----------------End Point Fetch---------------
			fetchEndPoint = "";
			quoteID = "";
			Tracking_of_creation_of_Charge = "Auto-Credit";
			trailerquote = TrailerQuote[ID == trailerPolicyInfo.TrailerQuote_ID];
			quoteID = trailerquote.Quote_Record_ID_Server;
			tax_province = trailerquote.Tax_Province;
			//tax = Tax_Lists[State_Province == tax_province].ID;
			if(trailerquote.Override_Tax_by_Admin == "Yes")
			{
				tax = trailerquote.Override_Tax;
			}
			else
			{
				tax = Tax_Lists[State_Province == tax_province].ID;
			}
			fetchEndPoint = API_Configuration[Name_Process == "Trailer Auto credit API"].End_Point;
			//-------------End Point Fetch End---------------
			credit_amount = 0;
			refundamount = trailerPolicyInfo.Total * -1;
			policynumber = trailerPolicyInfo.Policy_Number;
			//------------------If Renewal is Exist---------------
			get_renewal = Transaction_Table[Policy_Number == policynumber && Business_Process == "Renewal" && Type_of_Transaction == "Invoice" && Credit_Note_Creation == "" || Credit_Note_Creation == null] sort by Date_field desc;
			//	info get_renewal;
			//------------------If Renewal is Available---------------
			if(get_renewal.count() > 0)
			{
				//------------------Renewal Amount is Greater-----------
				if(get_renewal.Total_Amount_With_Tax >= refundamount)
				{
					servercall = thisapp.Cancellation.Auto_Credit_Server_API_Call(quoteID,refundamount,get_renewal.Payment_ID,fetchEndPoint,"POLICY_CHANGE");
					//servercall = servercall.toJSONList();
					servercall = servercall.toMap();
					thisapp.Developer.addActivityLog("Auto credit function(Transaction.TrailerautoCreditFunction--)" + trailerPolicyID.toString(),"Trailer - Auto credit function for Renewal--" + trailerPolicyID.toString(),"Server Call for Auto credit ","Server Response ----------" + servercall);
					if(servercall.get("success") == true)
					{
						//	info "true inside if" ;
						trailerPolicyInfo.Payment_Status="Paid";
						trailerPolicyInfo.Payment_Date=zoho.currentdate;
						autoChargePaymentID = servercall.get("data").get("payment_id");
						//Create the transaction table
						table_insert = thisapp.Transaction.createTransactionInTrailerPolicy(trailerPolicyInfo.ID.toLong(),trailerPolicyInfo.New_Total_Premium_before_tax,tax,Tracking_of_creation_of_Charge,autoChargePaymentID,get_renewal.Books_Invoice_ID);
						thisapp.Developer.addActivityLog("Auto credit function(Transaction.TrailerautoCreditFunction--)" + trailerPolicyID.toString(),"Trailer - Auto credit function for Renewal--" + trailerPolicyID.toString(),"Create Transaction table "," Response ----------" + table_insert);
						if(table_insert != null)
						{
							thisapp.Transaction.creditNoteCreate(table_insert.tolong(),get_renewal.Books_Invoice_ID);
							get_renewal.Credit_Note_Creation="Completed";
							get_renewal.Auto_Credit_Status="Success";
						}
					}
					else
					{
						trailerPolicyInfo.Payment_Status="Unpaid";
						trailerPolicyInfo.Payment_Transaction_Status="Failed";
						get_renewal.Auto_Credit_Status="Failed";
					}
				}
			}
			//------------------If Renewal is Not Available---------------
			else if(get_renewal.count() == 0)
			{
				get_nb = Transaction_Table[Policy_Number == policynumber && Business_Process == "New Business" && Type_of_Transaction == "Invoice" && Credit_Note_Creation == "" || Credit_Note_Creation == null] sort by Date_field desc;
				//	info get_nb;
				//------------------Renewal Amount is lesser-----------
				if(get_nb.Total_Amount_With_Tax >= refundamount)
				{
					servercall = thisapp.Cancellation.Auto_Credit_Server_API_Call(quoteID,refundamount,get_nb.Payment_ID,fetchEndPoint,"POLICY_CHANGE");
					servercall = servercall.toMap();
					// 					info "server re"+ servercall ;
					// 					info "server call-----"+servercall.get("success") ;
					thisapp.Developer.addActivityLog("Auto credit function(Transaction.TrailerautoCreditFunction--)" + trailerPolicyID.toString(),"Trailer - Auto credit function for New Business--" + trailerPolicyID.toString(),"Server Call for Auto credit ","Server Response ----------" + servercall);
					if(servercall.get("success") == true)
					{
						//	info "inside if " ;
						trailerPolicyInfo.Payment_Status="Paid";
						trailerPolicyInfo.Payment_Date=zoho.currentdate;
						autoChargePaymentID = servercall.get("data").get("payment_id");
						//Create the transaction table
						table_insert = thisapp.Transaction.createTransactionInTrailerPolicy(trailerPolicyInfo.ID.toLong(),trailerPolicyInfo.New_Total_Premium_before_tax,tax,Tracking_of_creation_of_Charge,autoChargePaymentID,get_nb.Books_Invoice_ID);
						thisapp.Developer.addActivityLog("Auto credit function(Transaction.TrailerautocreditFunction--)" + trailerPolicyID.toString(),"Trailer - Auto credit function for New Business--" + trailerPolicyID.toString(),"Create Transaction table "," Response ----------" + table_insert);
						if(table_insert != null)
						{
							thisapp.Transaction.creditNoteCreate(table_insert.tolong(),get_nb.Books_Invoice_ID);
							get_nb.Credit_Note_Creation="Completed";
							get_nb.Auto_Credit_Status="Success";
						}
					}
					else
					{
						trailerPolicyInfo.Payment_Status="Unpaid";
						trailerPolicyInfo.Payment_Transaction_Status="Failed";
						get_nb.Auto_Credit_Status="Failed";
					}
				}
			}
		}
		thisapp.Developer.addActivityLog("Auto credit function(Transaction.TrailerautocreditFunction) -- -- " + trailerPolicyID.toString(),"Function Call End","","");
	}
	catch (e)
	{
		thisapp.Developer.addDeveloperLog("Auto credit function(Transaction.TrailerautocreditFunction) -- " + trailerPolicyID.toString(),"Trailer auto credit Function:" + trailerPolicyID.toString(),"Trailer credit and create Transaction table and Create invoice in books","",e,"Creator");
	}
}