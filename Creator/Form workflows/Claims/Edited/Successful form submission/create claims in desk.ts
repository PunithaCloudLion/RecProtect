//thisapp.Zoho_Desk.Update_claims_from_creator_to_desk(input.ID);
if(zoho.loginuser == "Public")
	{
		// - to : morgan@recprotect.ca
		//-CC : service@recprotect.ca
		Report_Link = "https://creatorapp.zoho.com/service_recprotect/quotation/#Report:All_Claims?ID=" + input.ID;
		sendmail
		[
			from :zoho.adminuserid
			to :"logan@recprotect.ca"
			cc:"service@recprotect.ca"
			subject :"Client Updated the Information for " + input.Policy_Number
			message :"Hi " + input.Agent_Broker + ", <br><br>" + input.Contact_Name + ", " + input.Policy_Number + " has not provided all of the necessary details in order to move forward with submitting a claim. <br><br> Please review the details that have been submitted and follow up, if necessary, to collect outstanding information. <br><br> <a href=" + Report_Link + ">Click here.</a> to view the claims"
		]
	}
	