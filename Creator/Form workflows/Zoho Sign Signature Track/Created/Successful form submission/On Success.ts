fetch_other_request = Zoho_Sign_Signature_Track[Request_Id == input.Request_Id && ID != input.ID];
if(fetch_other_request.count() > 0)
{
	fetch_other_request.Action_Status="SIGNED";
	fetch_other_request.Request_Status="completed";
	get_cancellation = Cancellation[ID == fetch_other_request.Cancellation_ID.toLong()];
	if(get_cancellation.Quote_Type == "Boat")
	{
		policyId = BoatQuote[ID == get_cancellation.Crm_ID.tolong()].Zoho_Crm_ID;
	}
	else
	{
		policyId = TrailerQuote[ID == get_cancellation.Crm_ID.tolong()].Zoho_Crm_ID;
	}
	get_cancellation.LPV_Document_status="Signed";
	sendmail
	[
		from :zoho.adminuserid
		to :"morgan@recprotect.ca"
		subject :"Policy " + get_cancellation.Policy_Number + " - Need Cancellation Approval"
		message :"Hi Meghann,<br><br>For the policy " + get_cancellation.Policy_Number + ", the customer had signed the LVP document.<br><br>Validate the document and cancel the policy.<br><br>https://crm.zoho.com/crm/org810798353/tab/Potentials/" + policyId.tolong() + "<br><br>Thanks!"
	]
	thisapp.Zoho_Sign.Download_Document_Upload_to_Workdrive(fetch_other_request.ID);
	delete from Zoho_Sign_Signature_Track[ID == input.ID];
}
