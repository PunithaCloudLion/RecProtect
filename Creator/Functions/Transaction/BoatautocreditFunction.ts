void Transaction.BoatautocreditFunction(int boatPolicyID)
{
	try 
	{
		thisapp.Developer.addActivityLog("Auto credit function(Transaction.BoatautocreditFunction) --" + boatPolicyID.toString(),"Boat - Auto credit function--" + boatPolicyID.toString(),"Start","");
		boatPolicyInfo = Boat_Policy_change_Request[ID == boatPolicyID];
		if(boatPolicyInfo.count() > 0)
		{
			//	info "boat policy 1";
			//----------------End Point Fetch---------------
			fetchEndPoint = "";
			quoteID = "";
			Tracking_of_creation_of_Charge = "Auto-Credit";
			boatequoteInfo = BoatQuote[ID == boatPolicyInfo.BoatQuote_ID];
			quoteID = boatequoteInfo.Quote_Record_ID_Server;
			tax_province = boatequoteInfo.Tax_Province;
			//tax = Tax_Lists[State_Province == tax_province].ID;
			if(boatequoteInfo.Override_Tax_by_Admin == "Yes")
			{
				tax = boatequoteInfo.Override_Tax;
			}
			else
			{
				tax = Tax_Lists[State_Province == tax_province].ID;
			}
			fetchEndPoint = API_Configuration[Name_Process == "Boat Auto credit API"].End_Point;
			// 			tax = Tax_Lists[State_Province == tax_province].ID;
			//-------------End Point Fetch End---------------
			credit_amount = 0;
			refundamount = boatPolicyInfo.Total * -1;
			policynumber = boatPolicyInfo.Policy_Number;
			//------------------If Renewal is Exist---------------
			get_renewal = Transaction_Table[Policy_Number == policynumber && Business_Process == "Renewal" && Type_of_Transaction == "Invoice" && Credit_Note_Creation == "" || Credit_Note_Creation == null] sort by Date_field desc;
			//------------------If Renewal is Available---------------
			if(get_renewal.count() > 0)
			{
				//------------------Renewal Amount is Greater-----------
				if(get_renewal.Total_Amount_With_Tax >= refundamount)
				{
					servercall = thisapp.Cancellation.Auto_Credit_Server_API_Call(quoteID,refundamount,get_renewal.Payment_ID,fetchEndPoint,"POLICY_CHANGE");
					servercall = servercall.toMap();
					thisapp.Developer.addActivityLog("Auto credit function(Transaction.BoatautocreditFunction--)" + boatPolicyID.toString(),"Boat - Auto credit function for Renewal--" + boatPolicyID.toString(),"Server Call for Auto credit ","Server Response ----------" + servercall);
					//			info "Books Invoice ID ----1" + get_renewal.Books_Invoice_ID;
					if(servercall.get("success") == true)
					{
						boatPolicyInfo.Payment_Status="Paid";
						boatPolicyInfo.Payment_Date=zoho.currentdate;
						autoChargePaymentID = servercall.get("data").get("payment_id");
						//Create the transaction table
						table_insert = thisapp.Transaction.createTransactioninBoatPolicy(boatPolicyInfo.ID.toLong(),boatPolicyInfo.New_Total_Premium_before_tax,tax,Tracking_of_creation_of_Charge,autoChargePaymentID,get_renewal.Books_Invoice_ID);
						thisapp.Developer.addActivityLog("Auto credit function(Transaction.BoatautocreditFunction--)" + boatPolicyID.toString(),"Boat - Auto credit function for Renewal--" + boatPolicyID.toString(),"Create Transaction table "," Response ----------" + table_insert);
						if(table_insert != null)
						{
							thisapp.Transaction.creditNoteCreate(table_insert.tolong(),get_renewal.Books_Invoice_ID);
							get_renewal.Credit_Note_Creation="Completed";
							get_renewal.Auto_Credit_Status="Success";
						}
					}
					else
					{
						boatPolicyInfo.Payment_Status="Unpaid";
						boatPolicyInfo.Payment_Transaction_Status="Failed";
						get_renewal.Auto_Credit_Status="Failed";
					}
				}
				//------------------Refund Amount is Greater-----------
			}
			//------------------If Renewal is Not Available---------------
			else if(get_renewal.count() == 0)
			{
				//			info "boat policy 2";
				get_nb = Transaction_Table[Policy_Number == policynumber && Business_Process == "New Business" && Type_of_Transaction == "Invoice" && Credit_Note_Creation == "" || Credit_Note_Creation == null] sort by Date_field desc;
				//------------------Renewal Amount is lesser-----------
				//			info get_nb;
				//			info refundamount;
				if(get_nb.Total_Amount_With_Tax >= refundamount)
				{
					//			info "boat policy 3";
					servercall = thisapp.Cancellation.Auto_Credit_Server_API_Call(quoteID,refundamount,get_nb.Payment_ID,fetchEndPoint,"POLICY_CHANGE");
					servercall = servercall.toMap();
					//			info "server call---" + servercall;
					thisapp.Developer.addActivityLog("Auto credit function(Transaction.BoatautocreditFunction--)" + boatPolicyID.toString(),"Boat - Auto credit function for New Business--" + boatPolicyID.toString(),"Server Call for Auto credit ","Server Response ----------" + servercall);
					if(servercall.get("success") == true)
					{
						//				info "Books Invoice ID-- " + get_nb.Books_Invoice_ID;
						boatPolicyInfo.Payment_Status="Paid";
						boatPolicyInfo.Payment_Date=zoho.currentdate;
						autoChargePaymentID = servercall.get("data").get("payment_id");
						//Create the transaction table
						table_insert = thisapp.Transaction.createTransactioninBoatPolicy(boatPolicyInfo.ID.toLong(),boatPolicyInfo.New_Total_Premium_before_tax,tax,Tracking_of_creation_of_Charge,autoChargePaymentID,get_renewal.Books_Invoice_ID);
						thisapp.Developer.addActivityLog("Auto credit function(Transaction.BoatautocreditFunction--)" + boatPolicyID.toString(),"Boat - Auto credit function for New Business--" + boatPolicyID.toString(),"Create Transaction table "," Response ----------" + table_insert);
						if(table_insert != null)
						{
							thisapp.Transaction.creditNoteCreate(table_insert.tolong(),get_nb.Books_Invoice_ID);
							get_nb.Credit_Note_Creation="Completed";
							get_nb.Auto_Credit_Status="Success";
						}
					}
					else
					{
						boatPolicyInfo.Payment_Status="Unpaid";
						boatPolicyInfo.Payment_Transaction_Status="Failed";
						get_nb.Auto_Credit_Status="Failed";
					}
				}
			}
		}
		thisapp.Developer.addActivityLog("Auto credit function(Transaction.BoatautocreditFunction) -- -- " + boatPolicyID.toString(),"Function Call End","","");
	}
	catch (e)
	{
		thisapp.Developer.addDeveloperLog("Auto credit function(Transaction.BoatautocreditFunction) -- " + boatPolicyID.toString(),"Boat auto credit Function:" + boatPolicyID.toString(),"Bot credit and create Transaction table and Create invoice in books","",e,"Creator");
	}
}