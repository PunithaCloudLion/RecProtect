void MassMailTrailer()
{
	count = 0;
	for each  trailer in TrailerQuote[Is_This_Test_Policy == false] range from 2501 to 3000
	{
		count = count + 1;
		if(trailer.Customer_ID != null)
		{
			customerName = "";
			fetchCustomers = Customer[ID == trailer.Customer_ID];
			if(fetchCustomers.count() > 0)
			{
				customerName = ifnull(fetchCustomers.First_Name,"") + " " + ifnull(fetchCustomers.Last_Name,"");
			}
			else
			{
				customerName = "";
			}
		}
		massmail = insert into Trailer_Payment_Update_Tracker
		[
			Added_User=zoho.loginuser
			Policy_Number=trailer.Policy_Number
			Quote_ID=trailer.Quote_ID
			Customer_Name=customerName
			Insured_First_Name=trailer.Insured_First_Name
			Insured_Last_Name=trailer.Insured_Last_Name
			Deal_Type=trailer.Deal_Type
			Email=trailer.Email
			Phone_Number=trailer.Phone_Number
			Record_ID=trailer.ID.tostring()
		];
		if(massmail != null)
		{
			trailer.Moved_to_Mass_Mail=true;
		}
		else
		{
			trailer.Moved_to_Mass_Mail=false;
		}
	}
	info count;
}