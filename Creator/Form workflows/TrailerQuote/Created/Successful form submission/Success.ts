//changes on 05/03/24
input.Last_Modified_Date = zoho.currenttime;
if(Created_Source == "CREATOR")
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
if(input.Inception_Date != null)
{
	input.Bind_Date = input.Inception_Date;
}
// if(input.Section_Type == "Get Started")
// {
// 	// Open the current record in edit mode with the field value Section Type = Boat
// 	openUrl("https://creatorapp.zoho.com/service_recprotect/quotation/#Form:TrailerQuote?recLinkID=" + input.ID + "&viewLinkName=All_Trailer_Quotations&Section_Type=Trailer","same window");
// }
if(input.Total_Tax == null)
{
	input.Total_Tax = 0;
}
if(input.Payment_Date != null)
{
	input.Sales_Date = input.Payment_Date;
}
//------ referral reasons------
if(input.Source == "CREATOR")
{
	if(input.Trailer != null)
	{
		overAllReferralReason = "";
		//	referralReason = "";
		count = 0;
		for each  trailerSubform in input.Trailer
		{
			referralReason = "";
			count = count + 1;
			if(trailerSubform.Referral_Replacement_cost == true && trailerSubform.RCV_Exceeding_Limits_UW_Approved == false)
			{
				referralReason = referralReason + "Replacment cost";
			}
			if(trailerSubform.Referral_Actual_cash_value == true && trailerSubform.ACV_Exceeding_Limits_UW_Approved == false)
			{
				referralReason = referralReason + "Actual cash value";
			}
			if(trailerSubform.Referral_Golf_cart == true)
			{
				referralReason = referralReason + "Golf Cart";
			}
			if(trailerSubform.Referral_Is_the_trailer_taken_into_USA == true)
			{
				referralReason = referralReason + "Is the trailer taken into the USA for more than 180 days";
			}
			if(trailerSubform.Referral_Do_you_live_in_the_trailer == true)
			{
				referralReason = referralReason + "Do you live in the trailer full time, all year round as a principal residence?";
			}
			if(trailerSubform.Referral_business_use_of_any_kind == true)
			{
				referralReason = referralReason + "Is the unit used strictly for pleasure purposes with no rental or business use of any kind";
			}
			if(trailerSubform.Referral_Is_there_any_heating == true)
			{
				referralReason = referralReason + "Is there any heating that wasn't factory installed? (wood stove, pellet stove, etc.)";
			}
			if(trailerSubform.Referral_Is_this_a_dual_purpose_trailer == true)
			{
				referralReason = referralReason + "Is this a dual purpose trailer? (toy hauler/horse trailer)";
			}
			if(trailerSubform.Referral_Are_the_any_modificationa_to_trailer == true)
			{
				referralReason = referralReason + "Are there any modifications to the trailer? (ie. Addition of permanently installed solar panels)";
			}
			if(trailerSubform.Referalselect_the_modification_trailer_type == true)
			{
				referralReason = referralReason + "Are the solar panels factory/dealer installed (or) Modification trailer type is Interior Upgrades";
			}
			if(trailerSubform.Referral_Is_there_any_pre_existing_damage_on_the_trailer == true)
			{
				referralReason = referralReason + "Is there any pre-existing damage on the trailer";
			}
			if(trailerSubform.Referral_Is_the_trailer_motorized == true)
			{
				referralReason = referralReason + "Is the trailer motorized and able to travel on its own without a towing vehicle";
			}
			trailerSubform.Referral_Reason="Referral triggers for - " + referralReason;
			referralREasontemp = referralReason;
			if(referralREasontemp != "")
			{
				trailerSubform.Referral_Status="Referral";
			}
			// 		else
			// 		{
			// 			trailerSubform.Referral_Status="Return To Payment";
			// 		}
			if(referralReason != "")
			{
				overAllReferralReason = overAllReferralReason + "\n#" + count + " - Referral triggers for - " + referralReason;
			}
		}
		if(overAllReferralReason != "" && overAllReferralReason != null)
		{
			input.Quote_Status = "Referral";
			input.Referral_Reason = overAllReferralReason;
		}
		// 	else
		// 	{
		// 		input.Quote_Status = "Return To Payment";
		// 		input.Referral_Reason = "";
		// 	}
	}
}
