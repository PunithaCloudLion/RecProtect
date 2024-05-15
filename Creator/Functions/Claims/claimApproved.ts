void Claims.claimApproved(int claimID)
{
	getClaims = Claims[ID == claimID];
	//thisapp.Zoho_Desk.Create_claims_from_creator_to_desk(claimID);
	thisapp.Claims.claimFilesUploadinWorkdrive(claimID);
	thisapp.Claims.sendMailwithNOSandPhots(claimID);
	getClaims.Approved="Yes";
	openUrl("https://creatorapp.zoho.com/service_recprotect/quotation#Report:All_Claims","parent window");
}