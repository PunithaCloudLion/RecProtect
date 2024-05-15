if(input.Crm_ID != null)
	{
		if(input.Quote_Type == "Trailer")
		{
			fetchTrailer = TrailerQuote[ID == input.Crm_ID.tolong()];
			if(fetchTrailer.count() > 0)
			{
				input.Policy_Number = fetchTrailer.Policy_Number;
				input.Expiry_Date = fetchTrailer.Expiry_Date;
				input.Effective_Date = fetchTrailer.Inception_Date;
				input.Insured_Contact_Name = fetchTrailer.Customer_ID;
				input.Email_of_Insured = fetchTrailer.Email;
				input.Carrier = fetchTrailer.Carrier;
				if(fetchTrailer.Stripe_Payment_Method_ID != null && fetchTrailer.Stripe_Payment_Method_ID != "")
				{
					fetchChargeType = Charge_Type[ID != null].Select_Charge_Type.getAll();
					input.Select_Charge_Type:ui.add(fetchChargeType);
					input.Select_Charge_Type = Charge_Type[Select_Charge_Type == "Auto Credit"].Select_Charge_Type;
				}
				else
				{
					input.Select_Charge_Type:ui.add("Manual");
					// 				input.Select_Charge_Type = ""
				}
				//input.Spoke_With = fetchTrailer.Customer_ID.First_Name;
				//------------------Additional Insured------------
				count = 0;
				for each  addnames in fetchTrailer.Additional_Names
				{
					count = count + 1;
					if(count == 1)
					{
						input.Additional_Insured_Name1 = addnames.Customer_ID;
					}
					if(count == 2)
					{
						input.Additional_Insured_Name2 = addnames.Customer_ID;
					}
				}
			}
		}
		else
		{
			fetchBoat = BoatQuote[ID == input.Crm_ID.tolong()];
			if(fetchBoat.count() > 0)
			{
				input.Policy_Number = fetchBoat.Policy_Number;
				input.Expiry_Date = fetchBoat.Expiry_Date;
				input.Effective_Date = fetchBoat.Inception_Date;
				input.Insured_Contact_Name = fetchBoat.Customer_ID;
				input.Email_of_Insured = fetchBoat.Email;
				input.Carrier = fetchBoat.Carrier;
				if(fetchBoat.Stripe_Payment_Method_ID != null && fetchBoat.Stripe_Payment_Method_ID != "")
				{
					fetchChargeType = Charge_Type[ID != null].Select_Charge_Type.getAll();
					input.Select_Charge_Type:ui.add(fetchChargeType);
					input.Select_Charge_Type = Charge_Type[Select_Charge_Type == "Auto Credit"].Select_Charge_Type;
				}
				else
				{
					input.Select_Charge_Type:ui.add({"Manual"});
				}
				//	input.Spoke_With = fetchBoat.Customer_ID.First_Name;
				count = 0;
				for each  addnames in fetchBoat.Additional_Names
				{
					count = count + 1;
					if(count == 1)
					{
						input.Additional_Insured_Name1 = addnames.Customer_ID;
					}
					if(count == 2)
					{
						input.Additional_Insured_Name2 = addnames.Customer_ID;
					}
				}
			}
		}
		show Calculate_Return_Premium;
		enable Calculate_Return_Premium;
		if(input.LPV_Document_status == "Signed")
		{
			show Cancellation_Approval_Status;
			//enable Calculate_Return_Premium;
		}
		else
		{
			hide Cancellation_Approval_Status;
			// 		disable Calculate_Return_Premium;
			//	input.Cancellation_Approval_Status = "";
		}
		// 	if(input.Cancellation_Approval_Status == "Approved")
		// 	{
		// 		hide Calculate_Return_Premium;
		// 	}
		// 	else
		// 	{
		// 		hide Calculate_Return_Premium;
		// 	}
		if(input.Select_Charge_Type == "Send Payment/Deposit link")
		{
			show Generate_Payment_Link;
			show Payment_URL;
			disable Payment_URL;
		}
		else
		{
			hide Generate_Payment_Link;
			hide Payment_URL;
		}
	}
	if(input.LPV_Document_status == "Signed" && input.Cancellation_Approval_Status == "Approved")
	{
		show Payment_Status;
		show Payment_Date;
	}
	else
	{
		hide Payment_Status;
		hide Payment_Date;
		input.Payment_Status = "";
		input.Payment_Date = null;
	}
	disable OutStanding_Type;
	input.Spoke_With = zoho.loginuser;
	input.Cancellation_Date = zoho.currentdate;
	hide Other;
	//hide Developer_Section;
	hide LPV_Document_status;
	hide Unused_Fields;
	show Calculate_Return_Premium;
	hide Status;
	//hide Cancellation_Approval_Status;
	