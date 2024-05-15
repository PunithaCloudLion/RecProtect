if(input.Select_Charge_Type == "Send Payment/Deposit link")
	{
		if(input.Generate_Payment_Link == true)
		{
			getBoat = BoatQuote[ID == input.BoatQuote_ID];
			//info "boat quote " + getBoat;
			// 		thisapp.Generate_Payment_Link_for_BoatChanges(input.ID);
			fetchEndPoint = "https://recprotectbackend-10073292108.development.catalystappsail.com/recprotect/api/boat/stripe/create_payment_url";
			// 	boatquote_data = Boat_Policy_change_Request[ID == QuoteChangeID];
			// 	info QuoteChangeID;
			paramMapp = Map();
			paymentMap = Map();
			paymentMap.put("total_premium",if(input.New_Total_Premium_before_tax != null,input.New_Total_Premium_before_tax,0));
			paymentMap.put("total_tax",if(input.New_Total_Tax != null,input.New_Total_Tax,0));
			paymentMap.put("admin_fee",if(input.New_Admin_Fee != null,input.New_Admin_Fee,0));
			//paramMapp.put("amount_payable",paymentMap);
			paramMapp.put("quote_record_id",getBoat.Quote_Record_ID_Server);
			//uniqID = if(input.Policy_Number != null,input.Policy_Number,input.Quote_ID);
			//paramMapp.put("unique_id",uniqID);
			paramMapp.put("payment_link_for","POLICY_CHANGE");
			//NewBusiness
			// 		paramMapp.put("payment_type","Debit To Company");
			//Credit To Company
			// 		paramMapp.put("payment_method","Credit Card");
			paramMapp.put("organization_id","RECPROTECT1");
			paramMapp.put("policy_change_balance",ifnull(input.Total,0));
			customerData = Customer[ID == getBoat.Customer_ID];
			// 		info "customerData " + customerData;
			// 		info "Server cus ID  " + customerData.Server_Customer_ID;
			paramMapp.put("customer_id",customerData.Server_Customer_ID);
			// 		info "Param a" + paramMapp;
			resp = thisapp.Server_Side.callServer("POST",fetchEndPoint,paramMapp);
			//alert resp;
			if(resp.get("success") == true)
			{
				input.Payment_Link_URL = resp.get("data").get("payment_link");
				input.Payment_ID = resp.get("data").get("payment_id");
				info "URL " + input.Payment_URL;
				// 			if(Payment_URL != null)
				// 			{
				// 				// 			Payment_ID = resp.get("data").get("url").getsuffix("payment_id=");
				// 				// 			boatquote_data.Payment_ID=Payment_ID;
				// 				// 			boatquote_data.Payment_URL=Payment_URL;
				// 			}
			}
		}
	}
	