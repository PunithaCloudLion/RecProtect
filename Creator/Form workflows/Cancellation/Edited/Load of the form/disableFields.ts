hide Unused_Fields;
if(input.LPV_Document_status == "Signed")
{
	//	show input.Cancellation_Approval_Status ;
	enable Calculate_Return_Premium;
	disable Policy_Number;
	disable Carrier;
	disable Effective_Date;
	disable Expiry_Date;
	disable Return_Permium;
	disable Insured_Contact_Name;
	disable Additional_Insured_Name1;
	disable Additional_Insured_Name2;
	disable Email_of_Insured;
	disable Spoke_With;
	disable Confirmed_Email_Phone;
	disable Confirmed_Client;
	disable Update_Email;
	disable Update_Phone;
	disable Reason_for_Cancellation;
	disable Cancellation_Date;
	disable Other;
	disable LPV_Document_status;
}
else
{
	//	hide input.Cancellation_Approval_Status ;
	disable Calculate_Return_Premium;
	enable Policy_Number;
	enable Carrier;
	enable Effective_Date;
	enable Expiry_Date;
	enable Return_Permium;
	enable Insured_Contact_Name;
	enable Additional_Insured_Name1;
	enable Additional_Insured_Name2;
	enable Email_of_Insured;
	enable Spoke_With;
	enable Confirmed_Email_Phone;
	enable Confirmed_Client;
	enable Update_Email;
	enable Update_Phone;
	enable Reason_for_Cancellation;
	enable Cancellation_Date;
	enable Other;
	enable LPV_Document_status;
}
disable OutStanding_Type;
if(input.Cancellation_Approval_Status == "Approved")
{
	show Calculate_Return_Premium;
}
else
{
	hide Calculate_Return_Premium;
}
if(input.Reason_for_Cancellation == "Other")
{
	show Other;
}
else
{
	hide Other;
}
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
hide Developer_Section;
if(input.LPV_Document_status == "Signed")
{
	show Cancellation_Approval_Status;
	enable Calculate_Return_Premium;
}
else
{
	hide Cancellation_Approval_Status;
	disable Calculate_Return_Premium;
	//	input.Cancellation_Approval_Status = "";
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
if(input.Select_Charge_Type != null && input.Select_Charge_Type != "")
{
	fetchProvince = input.Select_Charge_Type;
}
else
{
	fetchProvince = "";
}
input.Select_Charge_Type = fetchProvince;
if(input.Crm_ID != null)
{
	if(input.Quote_Type == "Trailer")
	{
		fetchTrailer = TrailerQuote[ID == input.Crm_ID.tolong()];
		if(fetchTrailer.count() > 0)
		{
			input.Select_Charge_Type = input.Select_Charge_Type;
			if(fetchTrailer.Policy_UPO_Data != null && fetchTrailer.Policy_UPO_Data != "")
			{
				fetchChargeType = Charge_Type[ID != null].Select_Charge_Type.getAll();
				input.Select_Charge_Type:ui.add(fetchChargeType);
			}
			else
			{
				input.Select_Charge_Type:ui.add("Manual");
			}
		}
	}
	else
	{
		fetchBoat = BoatQuote[ID == input.Crm_ID.tolong()];
		if(fetchBoat.count() > 0)
		{
			if(fetchBoat.Policy_UPO_Data != null && fetchBoat.Policy_UPO_Data != "")
			{
				fetchChargeType = Charge_Type[ID != null].Select_Charge_Type.getAll();
				input.Select_Charge_Type:ui.add(fetchChargeType);
			}
			else
			{
				input.Select_Charge_Type:ui.add("Manual");
			}
			//			input.Select_Charge_Type = input.Select_Charge_Type;
		}
	}
}
