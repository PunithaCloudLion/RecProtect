if(input.Quote_Status == "Completed")
	{
		input.Deal_Type = "Policy";
	}
	if(input.Source == "CREATOR")
	{
		if(input.Quote_Status == "Saved" || input.Quote_Status == "Return To Broker")
		{
			if(input.Save_as_Draft == false)
			{
				input.Quote_Status = "In Progress";
			}
		}
	}
	if(input.Payment_Date != null)
	{
		input.Sales_Date = input.Payment_Date;
	}
	if(input.Total_Tax == null)
	{
		input.Total_Tax = 0;
	}
	if(input.Inception_Date != null)
	{
		input.Bind_Date = input.Inception_Date;
	}
	//---------------Referral Section-----------
	if(input.Source == "CREATOR")
	{
		if(input.Boat != null)
		{
			overAllReferralReason = "";
			count = 0;
			for each  boat in input.Boat
			{
				referralReason = "";
				count = count + 1;
				if(boat.Referral_Replacement_cost == true && boat.RCV_Exceeding_Limits_UW_Approved == false)
				{
					referralReason = referralReason + "Replacment cost";
				}
				if(boat.Referral_Actual_Cash_Value == true && boat.ACV_Exceeding_Limits_UW_Approved == false)
				{
					referralReason = referralReason + "Actual cash value";
				}
				if(boat.Referral_Boat_Model_Year == true)
				{
					referralReason = referralReason + "Boat Model Year";
				}
				if(boat.Referral_Principal_operator_20_years == true)
				{
					referralReason = referralReason + "Principal Operator more than 20 years";
				}
				if(boat.Referral_Has_the_principal_operator_had_their_driver_s_license_suspended == true)
				{
					referralReason = referralReason + "Has the principal operator had their driver's license suspended";
				}
				if(boat.Referral_Does_the_operator_hold_a_Pleasure_Craft_Operator_Card_PCOC == true)
				{
					referralReason = referralReason + "Does the operator hold a Pleasure Craft Operator Card PCOC";
				}
				if(boat.Referral_Watercraft_Type == true)
				{
					referralReason = referralReason + "Watercraft Type";
				}
				if(boat.Referral_How_many_motor_vehicle_claims == true)
				{
					referralReason = referralReason + "How many motor vehicle claims";
				}
				if(boat.Referral_How_many_motor_vehicle_Convictions == true)
				{
					referralReason = referralReason + "How many motor vehicle Convictions";
				}
				if(boat.Referral_Hull_Type == true)
				{
					referralReason = referralReason + "Hull Type";
				}
				if(boat.Referral_Tender_lenght == true)
				{
					referralReason = referralReason + "Tender lenght";
				}
				if(boat.Referral_Main_Engine == true)
				{
					referralReason = referralReason + "Main Engine 1";
				}
				if(boat.Referral_Main_Engine_2 == true)
				{
					referralReason = referralReason + "Main Engine 2";
				}
				if(boat.Referral_Do_any_of_the_above_statements_apply_to_the_watercraft == true)
				{
					referralReason = referralReason + "Do any of the above statements apply to the watercraft1";
				}
				if(boat.Referral_Do_any_of_the_above_statements_apply_to_the_watercraft1 == true)
				{
					referralReason = referralReason + "Do any of the above statements apply to the watercraft2";
				}
				if(boat.Referral_Do_any_of_the_above_apply_to_the_watercraft == true)
				{
					referralReason = referralReason + "Do any of the above apply to the watercraft";
				}
				if(boat.Referral_Do_any_of_the_above_apply_to_the_Applicant == true)
				{
					referralReason = referralReason + "Do any of the above apply to the Applicant";
				}
				if(boat.Referral_Length == true)
				{
					referralReason = referralReason + "Length";
				}
				if(boat.Referral_Trailer_Length == true)
				{
					referralReason = referralReason + "Trailer Length";
				}
				boat.Referral_Reason="Referral triggers for - " + referralReason;
				referralREasontemp = referralReason;
				if(referralREasontemp != "")
				{
					boat.Referral_Status="Referral";
				}
				else
				{
					if(boat.Referral_Status = "Referral")
					{
						boat.Referral_Status="Return To Payment";
					}
				}
				if(referralReason != "")
				{
					overAllReferralReason = overAllReferralReason + "\n#" + count + " Referral triggers for - " + referralReason;
				}
			}
			if(overAllReferralReason != "" && overAllReferralReason != null)
			{
				input.Quote_Status = "Referral";
				input.Referral_Reason = overAllReferralReason;
			}
			else
			{
				if(input.Quote_Status == "Referral")
				{
					input.Quote_Status = "Return To Payment";
					input.Referral_Reason = " ";
				}
				if(input.Quote_Status == "Saved")
				{
					input.Referral_Reason = " ";
				}
			}
		}
	}
	//-----------send mail status change from referral to return to payment
	if(input.Quote_Status == "Return To Payment")
	{
		// 			getlink = input.Quote_Access_URL.getsuffix(">");
		// 			finalLink = getlink.getprefix("<");
		emailConfigure = Email_Configuration[Process == "Boat - Admin Document - NB"];
		//info emailConfigure.Email_Data ;
		recDefault = thisapp.General.emailFormation(emailConfigure.Email_Data.trim(),"Boat",input.ID);
		//info recDefault ;
		// 	sendmail
		// 	[
		// 		from :zoho.adminuserid
		// 		to :recDefault
		// 		subject :emailConfigure.Subject_field
		// 		message :"Thank you for your interest in buying insurance with us! We have saved your application with the data we have so far, to make buying your insurance as easy as possible.<br><br>To complete your purchase <br><center><p><a href=" + input.Quote_Access_URL + "><button>Return to my application</button></a></p>"
		// 	]
	}
	openUrl("https://creatorapp.zoho.com/service_recprotect/quotation#Report:Boats_Report","same window");
	// if(input.Boat_approve_for_being_over_15_years_old == "YES" && input.Quote_Status == "Referral")
	// {
	// 	input.Quote_Status = "In Progress";
	// }
	// if(input.Boat_approve_Related == false)
	// {
	// 	if(input.Boat_approve_for_being_over_15_years_old == "YES")
	// 	{
	// 		input.Boat_approve_Related = true;
	// 		if(input.Boat_approve_Related == true)
	// 		{
	// 			getlink = input.Quote_Access_URL.getsuffix(">");
	// 			finalLink = getlink.getprefix("<");
	// 			emailConfigure = Email_Configuration[Process == "Boat - Admin Document"];
	// 			//info emailConfigure.Email_Data ;
	// 			recDefault = thisapp.General.emailFormation(emailConfigure.Email_Data.trim(),"Boat",input.ID);
	// 			//info recDefault ;
	// 			sendmail
	// 			[
	// 				from :zoho.adminuserid
	// 				to :recDefault
	// 				subject :emailConfigure.Subject_field
	// 				message :"Thank you for your interest in buying insurance with us! We have saved your application with the data we have so far, to make buying your insurance as easy as possible.<br><br>To complete your purchase <br><center><p><a href=" + finalLink + ">Return to my application</a></p>"
	// 			]
	// 		}
	// 	}
	// }
	