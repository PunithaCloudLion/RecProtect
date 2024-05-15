void MassMailRecordPush_Boat()
{
	getBoatQuote = BoatQuote[Is_This_Test_Policy == false] range from 801 to 840;
	for each  getBoat in getBoatQuote
	{
		customerName = "";
		if(getBoat.Customer_ID != null)
		{
			customerName = (Customer[ID == getBoat.Customer_ID].First_Name + " ") + Customer[ID == getBoat.Customer_ID].Last_Name;
		}
		else
		{
			customerName = "";
		}
		massMail = insert into Boat_Payment_Update_Tracker
		[
			Added_User=zoho.loginuser
			Quote_ID=getBoat.Quote_ID
			Deal_Type=getBoat.Deal_Type
			Policy_Number=getBoat.Policy_Number
			Customer_Name=customerName
			Email=getBoat.Email
			Insured_First_Name=getBoat.Insured_First_Name
			Insured_Last_Name=getBoat.Insured_Last_Name
			Rec_ID=getBoat.ID
			Status="No"
			Phone=getBoat.Phone_Number
		];
		getBoat.Moved_to_Mass_Mail=true;
	}
}