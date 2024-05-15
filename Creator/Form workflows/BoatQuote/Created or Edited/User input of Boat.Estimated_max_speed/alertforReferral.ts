row.Referral_Main_engine=false;
row.Referral_Main_engine_2=false;
//-----------mainengine1 --------
if(row.Estimated_max_speed > 55 || row.Horsepower > 460)
{
	if(row.Types == "Inboard" || row.Types == "In/Outboard" || row.Types == "Jet drive")
	{
		alert "This choice triggers a referral.";
		row.Referral_Main_engine=true;
	}
}
//------main engine 2
if(row.Estimated_max_speed > 55 || row.Horsepower1 > 460)
{
	if(row.Types1 == "Inboard" || row.Types1 == "In/Outboard" || row.Types1 == "Jet drive")
	{
		alert "This choice triggers a referral.";
		row.Referral_Main_engine_2=true;
		//--------referal section -------
	}
}
//-------------out board1
if(row.Types == "Outboard")
{
	if(row.Estimated_max_speed > 55 || row.Horsepower > 250)
	{
		alert "This choice triggers a referral.";
		row.Referral_Main_engine=true;
	}
}
//-----------out board 2---
if(row.Types1 == "Outboard")
{
	if(row.Estimated_max_speed > 55 || row.Horsepower1 > 250)
	{
		alert "This choice triggers a referral.";
		row.Referral_Main_engine_2=true;
	}
}
