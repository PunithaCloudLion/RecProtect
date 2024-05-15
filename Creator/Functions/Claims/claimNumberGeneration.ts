void Claims.claimNumberGeneration(int id)
{
	claimsInfo = Claims[ID != null && Number != null] sort by Number desc;
	//	info claimsInfo;
	getClaims = Claims[ID == id];
	if(claimsInfo.count() == 0)
	{
		val = 1;
		addZero = val.toString().leftpad(5).replaceAll(" ","0");
		//	info addZero ;
		getClaims.Internal_Claim_Number="RP-CL-" + addZero;
		getClaims.Number=1;
	}
	else
	{
		val = ifnull(claimsInfo.Number,0) + 1;
		addZero = val.toString().leftpad(5).replaceAll(" ","0");
		getClaims.Internal_Claim_Number="RP-CL-" + addZero;
		getClaims.Number=val;
	}
}