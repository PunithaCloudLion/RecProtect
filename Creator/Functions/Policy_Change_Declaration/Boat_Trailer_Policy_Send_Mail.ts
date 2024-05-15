void Policy_Change_Declaration.Boat_Trailer_Policy_Send_Mail(int recid, string type)
{
	//------------------------Jana----------------
	if(type == "Boat")
	{
		boatPolicyInfo = Boat_Policy_change_Request[ID == recid];
		getBoatQuote = BoatQuote[ID == boatPolicyInfo.Select_Policy];
		getTemplate = Email_Templates[Title == "Payment Link Sent to Customer"];
		mailContent = getTemplate.Mail_Content;
		getCustomer = Customer[ID == boatPolicyInfo.Customer_ID];
		customerName = getCustomer.First_Name + getCustomer.Last_Name;
		customerMail = mailContent.replaceAll("#CUSTOMERNAME#",customerName);
		policyMail = customerMail.replaceAll("#POLICYNUMBER#",boatPolicyInfo.Policy_Number);
		policyName = policyMail.replaceAll("#TRAILERNAMEORBOATNAME#",boatPolicyInfo.Name);
		finalMailContent = policyName.replaceAll("#LINK#",boatPolicyInfo.Payment_URL);
		// 		toMail = getCustomer.Email;
		sendmail
		[
			from :zoho.adminuserid
			to :getBoatQuote.Email
			cc:"service@recprotect.ca"
			subject :getTemplate.Subject_field
			message :finalMailContent
		]
	}
	else if(type == "Trailer")
	{
		trailerPolicyInfo = Trailer_Policy_Change_Request[ID == recid];
		getTrailerQuote = TrailerQuote[ID == trailerPolicyInfo.Select_Policy];
		getTemplate = Email_Templates[Title == "Payment Link Sent to Customer"];
		mailContent = getTemplate.Mail_Content;
		getCustomer = Customer[ID == trailerPolicyInfo.Customer_ID];
		customerName = getCustomer.First_Name + getCustomer.Last_Name;
		customerMail = mailContent.replaceAll("#CUSTOMERNAME#",customerName);
		policyMail = customerMail.replaceAll("#POLICYNUMBER#",trailerPolicyInfo.Policy_Number);
		policyName = policyMail.replaceAll("#TRAILERNAMEORBOATNAME#",trailerPolicyInfo.Name);
		finalMailContent = policyName.replaceAll("#LINK#",trailerPolicyInfo.Payment_URL);
		// 		toMail = getCustomer.Email;
		sendmail
		[
			from :zoho.adminuserid
			to :getTrailerQuote.Email
			cc:"service@recprotect.ca"
			subject :getTemplate.Subject_field
			message :finalMailContent
		]
	}
	//-------------------End--------------------
}