disable Internal_Claim_Number;
hide Claim_Loss_Damage_Photos.Thumbnail_ID;
hide Claim_Loss_Damage_Photos.Download_URL;
hide Image;
disable Email;
if(zoho.loginuser == "Public")
{
	if(input.Approved == "Yes")
	{
		alert "This Claim was already approve, so you can't able to change anything";
	}
	hide Asset;
	hide Approved;
	hide Deal_Name;
	hide Third_Party;
	hide Addition_Information;
	hide Manual_Entry_Fields;
	hide Closed_Date;
	hide Claims_Type;
	hide Claims_Number;
	hide Total_Payout;
}
