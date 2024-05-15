// if(input.Boat_approve_for_being_over_15_years_old == "YES" && input.Quote_Status == "Referral")
// {
// 	input.Quote_Status = "In Progress";
// }
// if(input.Inception_Date != null)
// {
// 	input.Bind_Date = input.Inception_Date;
// }
if(input.Expiry_Date != null)
	{
		End_Date = input.Expiry_Date;
	}
	// //Update the last modified date field
	// input.Last_Modified = zoho.currentdate;
	if(input.Inception_Date == null)
	{
		input.Expiry_Date = null;
	}
	