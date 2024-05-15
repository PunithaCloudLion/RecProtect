void Generic_Functions.New_Buisness_Payment_Transaction(int recID, string process)
{
	try 
	{
		thisapp.Developer.addActivityLog("NB - Add Payment Transaction Table Entry(Generic_Functions.New_Buisness_Payment_Transaction)--" + recID.toString(),"Create Transaction Entry for New Business","Funcation Call Start","");
		// 		thisapp.Developer.addActivityLog("Generic_Functions.New_Buisness_Payment_Transaction-- " + process + "Quotation" + recID.toString(),"New_Buisness_Payment_Transaction--" + recID.toString(),"Start","");
		url = "https://creator.zoho.com/appbuilder/service_recprotect/quotation/customFunction/Generic_Functions.New_Buisness_Payment_Transaction/edit";
		//-------------Variable Declare--------
		//-----------Sub Form Starts---------
		Description = "";
		Amount = null;
		Tax_Amount = null;
		Amount_With_Tax = null;
		Tax_Province = "";
		//---------Main Form Starts--------
		Policy_Number = "";
		Customer_Name = null;
		Policy_Type = "";
		CRM_ID = "";
		buisess_process = "";
		//-------------Variable Declare End--------
		//--------------------Trailer Map Formation---------
		if(process == "Trailer")
		{
			trailer = TrailerQuote[ID == recID];
			crmPolicyID = trailer.Zoho_Crm_ID;
			buisess_process = trailer.Business_Source;
			//---------Main Form Starts--------
			Policy_Number = trailer.Policy_Number;
			Customer_Name = trailer.Customer_ID;
			Policy_Type = "Trailer Policy";
			CRM_ID = trailer.Zoho_Crm_ID;
			Stripe_Payment_ID = trailer.Stripe_Payment_Method_ID;
			Stripe_Customer_ID = trailer.Stripe_Customer_ID;
			PaymentDate = trailer.Payment_Date;
			PaymentStatus = trailer.Payment_Status;
			Overall_tax_Amount = trailer.Total_Tax;
			Amount_With_Tax = trailer.Total_Payable_Premium_after_tax;
			//-----------intent ID---------
			trailer_history = Trailer_Transaction_History[Quote == recID && Payment_For == "NEW_BUSINESS"];
			Payment_ID = trailer_history.Stripe_Payment_Intent_ID;
			serverPaymentID = trailer_history.Payment_ID;
			zoho_CRM_ID = trailer.Zoho_Crm_ID;
			//------------Payment Date--------------
			paymentdate = trailer_history.Payment_Initiated_Date;
			//-----Subform Starts------
			Description = "Policy Number: " + trailer.Policy_Number + " , Quote ID: " + trailer.Quote_ID;
			PremiumAmount = trailer.Total_Premium_before_tax;
			Fee = trailer.Fee;
			Tax_Province = trailer.Tax_Province;
			Tax_Percent = trailer.Tax_Precent;
			Tax = Tax_Lists[State_Province.containsIgnoreCase(Tax_Province)].ID;
			if(trailer.Override_Tax_by_Admin == "Yes")
			{
				if(trailer.Override_Tax != null)
				{
					Tax = trailer.Override_Tax;
				}
			}
		}
		//--------------------Boat Map Formation---------
		if(process == "Boat")
		{
			boat = BoatQuote[ID == recID];
			crmPolicyID = boat.Zoho_Crm_ID;
			buisess_process = boat.Business_Source;
			//---------Main Form Starts--------
			Policy_Number = boat.Policy_Number;
			Customer_Name = boat.Customer_ID;
			Policy_Type = "Boat Policy";
			CRM_ID = boat.Zoho_Crm_ID;
			Stripe_Payment_ID = boat.Stripe_Payment_Method_ID;
			Stripe_Customer_ID = boat.Stripe_Customer_ID;
			PaymentDate = boat.Payment_Date;
			PaymentStatus = boat.Payment_Status;
			Overall_tax_Amount = boat.Total_Tax;
			Amount_With_Tax = boat.Total_Payable_Premium_after_tax;
			//-----------intent ID---------
			boat_history = Boat_Transaction_History[Quote == recID && Payment_For == "NEW_BUSINESS"];
			Payment_ID = boat_history.Stripe_Payment_Intent_ID;
			serverPaymentID = boat_history.Payment_ID;
			zoho_CRM_ID = boat.Zoho_Crm_ID;
			//------------Payment Date--------------
			paymentdate = boat_history.Payment_Initiated_Date;
			//-----Subform Starts------
			Description = "Policy Number: " + boat.Policy_Number + " , Quote ID: " + boat.Quote_ID;
			PremiumAmount = boat.Total_Premium_before_tax;
			Fee = boat.Fee;
			Tax_Province = boat.Tax_Province;
			Tax_Percent = boat.Tax_Precent;
			Tax = Tax_Lists[State_Province.containsIgnoreCase(Tax_Province)].ID;
			if(boat.Override_Tax_by_Admin == "Yes")
			{
				if(boat.Override_Tax != null)
				{
					Tax = boat.Override_Tax;
				}
			}
		}
		//----------------Pooduct Name -----
		//----------------Pooduct Name End-----
		//-----------Subform Map Configurations------------
		itemcollection = Collection();
		//---------------Premium Amount---------
		row1 = Transaction_Table.Transaction_Details();
		row1.Product_Name=Product[Product_Name == process].ID;
		row1.Description=Description;
		row1.Amount=PremiumAmount;
		row1.Tax=Tax;
		Tax_Amount = ifnull(PremiumAmount,0) * ifnull(Tax_Percent,0) / 100;
		row1.Tax_Amount=Tax_Amount;
		row1.Amount_With_Tax=PremiumAmount + Tax_Amount;
		//-----------------Commission Calculation------------
		//----------Commission on Policy------------
		get_policy_commission = Commissions_Configuration[Commision == "Commission on Policy"].Percent;
		commissiononPolicy = ifnull(PremiumAmount,0) * ifnull(get_policy_commission,0) / 100;
		//	info "commissiononPolicy--" + commissiononPolicy;
		// 		row1.Commission_on_Policy=ifnull(PremiumAmount,0) * ifnull(get_policy_commission,0) / 100;
		row1.Commission_on_Policy=commissiononPolicy;
		//----------Commission On Sales Rep------------
		commissiononSalesRep = 0;
		// 		if(buisess_process == "SalesRep")
		// 		{
		getSalesResp = zoho.crm.getRecordById("Deals",crmPolicyID.toLong());
		if(getSalesResp != null)
		{
			crmOwnerID = getSalesResp.get("Owner").get("id");
			getSalesRepcomm = Commissions_for_Sales_Rep[Sales_Rep.CRM_ID == crmOwnerID];
			if(getSalesRepcomm.count() > 0)
			{
				if(getSalesRepcomm.Select_Type_of_Commision == "Percent")
				{
					commissiononSalesRep = ifnull(PremiumAmount,0) * ifnull(getSalesRepcomm.Commission,0) / 100;
				}
				else
				{
					commissiononSalesRep = getSalesRepcomm.Flat_Commision;
				}
			}
		}
		//}
		row1.Commission_to_SalesRep=commissiononSalesRep;
		row1.Commission_with_RecProtect=ifnull(commissiononPolicy,0) - ifnull(commissiononSalesRep,0);
		// 		get_salesrep_commission = Commissions_for_Sales_Rep[Commision == "Commission to Sales Rep"].Percent;
		// 		row1.Commission_to_SalesRep=ifnull(PremiumAmount,0) * ifnull(get_salesrep_commission,0) / 100;
		// 		get_recprotect_commission = Commissions_Configuration[Commision == "Commission with RecProtect"].Percent;
		// 		row1.Commission_with_RecProtect=ifnull(PremiumAmount,0) * ifnull(get_recprotect_commission,0) / 100;
		//-----------------Commission Calculation End------------		
		itemcollection.insert(row1);
		//-----------------Fee-----------
		if(Fee != null)
		{
			//--------------Calculate Stripe Charges-----------
			stripefee = 0.029 * ifnull(Fee,0) + 0.30;
			adminfee = Fee - stripefee;
			//-----------Add Admin Fee as a line item-----------
			row2 = Transaction_Table.Transaction_Details();
			row2.Product_Name=Product[Product_Name == "Admin Fee"].ID;
			row2.Description=Description;
			row2.Amount=adminfee;
			row2.Tax=Tax;
			Tax_Amount = ifnull(adminfee,0) * ifnull(Tax_Percent,0) / 100;
			row2.Tax_Amount=Tax_Amount;
			row2.Amount_With_Tax=adminfee + Tax_Amount;
			itemcollection.insert(row2);
			//-----------Add Stripe Fee as a line item-----------
			row3 = Transaction_Table.Transaction_Details();
			row3.Product_Name=Product[Product_Name == "Stripe Fee"].ID;
			row3.Description=Description;
			row3.Amount=stripefee;
			row3.Tax=Tax;
			Tax_Amount = ifnull(stripefee,0) * ifnull(Tax_Percent,0) / 100;
			row3.Tax_Amount=Tax_Amount;
			row3.Amount_With_Tax=stripefee + Tax_Amount;
			itemcollection.insert(row3);
		}
		//---------------Insert into Transaction Table----------	
		response = insert into Transaction_Table
		[
			Added_User=zoho.loginuser
			Deal_Name=CRM_ID
			Policy_Number=Policy_Number
			Customer_Name=Customer_Name
			Date_field=zoho.currentdate
			Business_Process="New Business"
			Policy_Type=Policy_Type
			Type_of_Transaction="Invoice"
			Tracking_of_creation_of_Charge="Web App"
			Transaction_Details=itemcollection
			Total_Amount_Without_Tax=ifnull(PremiumAmount,0) + ifnull(Fee,0)
			Tax_Amount=Overall_tax_Amount
			Total_Amount_With_Tax=Amount_With_Tax
			CRM_ID=CRM_ID
			Stripe_Payment_Method_ID=Stripe_Payment_ID
			Stripe_Customer_ID=Stripe_Customer_ID
			Payment_ID=Payment_ID
			Payment_Date=zoho.currenttime
			Payment_Status=PaymentStatus
			Server_Payment_ID=serverPaymentID
			Creator_Quotation_ID=recID.toString()
			Invoice_Scheduled_On=zoho.currenttime.addSeconds(30)
		];
		//	info response;
		thisapp.Developer.addActivityLog("NB - Add Payment Transaction Table Entry(Generic_Functions.New_Buisness_Payment_Transaction)--" + recID.toString(),"Create Transaction Entry for New Business","Funcation Call End","");
	}
	catch (e)
	{
		//	info e;
		thisapp.Developer.addDeveloperLog("Transaction Table","NB - Add Payment Transaction Table Entry(Generic_Functions.New_Buisness_Payment_Transaction)--" + recID.toString(),"Transaction Table Creation Error Response","",e,"creator");
	}
}