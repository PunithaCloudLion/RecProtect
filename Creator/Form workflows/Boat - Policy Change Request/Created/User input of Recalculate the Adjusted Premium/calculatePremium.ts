if(input.Recalculate_the_Premium == true)
	{
		fetchEndPoint = API_Configuration[Name_Process == "Get Premium - Boat"].End_Point;
		parammap = Map();
		parammap.put("organization_id","RECPROTECT1");
		parammap.put("boat_quote_record_id",input.Quote_Record_ID_Server);
		headerMap = Map();
		headerMap.put("Content-Type","application/json");
		premcal_resp = invokeurl
		[
			url :fetchEndPoint
			type :POST
			parameters:parammap.toString()
			headers:headerMap
		];
		if(premcal_resp.get("success") == "true")
		{
			input.New_Total_Premium_before_tax = premcal_resp.get("data").get("total_premium_bf_tax");
			input.New_Total_Tax = premcal_resp.get("data").get("total_tax");
			input.New_Tax_Percent = premcal_resp.get("data").get("tax_percent");
			input.New_Total_Payable_Premium_after_tax = premcal_resp.get("data").get("total_premium_af_tax");
			input.New_Admin_Fee = premcal_resp.get("data").get("admin_fee");
		}
		//-------------OutStanding Calculation------------
		/*
		if(input.Outstanding == 0)
		{
			data = input.Total_Payable_Premium_after_tax - input.New_Total_Payable_Premium_after_tax;
			if(data < 0)
			{
				input.OutStanding_Type = "Debit";
				data = data * -1;
			}
			else if(data > 0)
			{
				input.OutStanding_Type = "Credit";
			}
			input.Outstanding = data;
		}
		else if(input.Outstanding > 0)
		{
			policyDifference = input.Total_Payable_Premium_after_tax - input.New_Total_Payable_Premium_after_tax;
			if(input.OutStanding_Type == "Debit" && policyDifference < 0)
			{
				outStandingAmount = input.Outstanding + policyDifference;
			}
			else if(input.OutStanding_Type == "Debit" && policyDifference > 0)
			{
				outStandingAmount = policyDifference - input.Outstanding;
			}
			else if(input.OutStanding_Type == "Credit" && policyDifference > 0)
			{
				outStandingAmount = input.Outstanding + policyDifference;
			}
			else if(input.OutStanding_Type == "Credit" && policyDifference < 0)
			{
				outStandingAmount = input.Outstanding - policyDifference;
			}
			else
			{
				if(input.OutStanding_Type == "Debit")
				{
					outStandingAmount = policyDifference - input.Outstanding;
				}
				else
				{
					outStandingAmount = input.Outstanding - policyDifference;
				}
			}
			//outStandingAmount is negative = Debit && outStandingAmount is negative = Credit
			if(outStandingAmount < 0)
			{
				outStandingAmount = outStandingAmount * -1;
				input.OutStanding_Type = "Debit";
			}
			else if(outStandingAmount > 0)
			{
				input.OutStanding_Type = "Credit";
			}
			else
			{
				outStandingAmount = 0;
				input.OutStanding_Type = "";
			}
			input.Outstanding = outStandingAmount;
		}
		*/
	}
	