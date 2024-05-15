//--------Update the last modified date field--------l
input.Last_Modified = zoho.currentdate;
//input.Quote_Status = "Return To Payment";
if(input.Source == "CREATOR")
{
	if(input.Save_as_Draft == true)
	{
		input.Quote_Status = "Saved";
	}
	else
	{
		input.Quote_Status = "In Progress";
	}
}
input.Deal_Type = "Quote";
//Url="<a href='http:\\www.amazon.com' target='_blank' title='TheTitle'><Amazon></a>
// input.Quote_Access_URL = "https://creatorapp.zoho.com/service_recprotect/quotation/BoatQuote/record-edit/Boats_Report/" + input.ID;
/*******RCV & ACV update ***Ananth***/
if(input.Total_Tax == null)
{
	input.Total_Tax = 0;
}
if(input.Inception_Date != null)
{
	input.Bind_Date = input.Inception_Date;
}
for each  rec in input.Boat
{
	if(rec.Select_coverage_for_policy == "Replacement Value Coverage")
	{
		rec.Policy_Coverage_Type="RCV";
		if(rec.Boat_Age >= 10 && rec.Boat_Age <= 14)
		{
			rec.Opt_In_for_RCV=true;
		}
	}
	else if(rec.Select_coverage_for_policy == "Current Market Value Coverage")
	{
		rec.Policy_Coverage_Type="ACV";
	}
}
if(input.Payment_Date != null)
{
	input.Sales_Date = input.Payment_Date;
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
				// 			if(boat.Referral_Status = "Referral")
				// 			{
				// 				boat.Referral_Status="Return To Payment";
				// 			}
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
			// 		if(input.Quote_Status = "Referral")
			// 		{
			// 			input.Quote_Status = "Return To Payment";
			// 			input.Referral_Reason = "";
			// 		}
		}
	}
}
/********RCV & ACV END HERE**********/
// if(input.Section_Type == "Get Started")
// {
// 	// Open the current record in edit mode with the field value Section Type = Boat
// 	openUrl("https://creatorapp.zoho.com/service_recprotect/quotation/#Form:BoatQuote?recLinkID=" + input.ID + "&viewLinkName=Boats_Report&Section_Type=Boat","same window");
// }
