thisapp.Claims.claimNumberGeneration(input.ID);
thisapp.Zoho_Desk.Create_claims_from_creator_to_desk(input.ID);
// if(input.Approved == "Yes")
// {
// 	thisapp.Claims.claimApproved(input.ID);
// }
/*getTemplateCRM = invokeurl
[
	url :"https://www.zohoapis.com/crm/v6/settings/email_templates/5778486000014258001"
	type :GET
	connection:"zcrm"
];
//	info getTemplateCRM;
if(input.Loss_Date != null)
{
	LossDate = input.Loss_Date.toString();
}
else
{
	LossDate = "";
}
msg = "https://creator.zohopublic.com/service_recprotect/quotation/Claims/record-edit/All_Claims/" + input.ID + "/ypJDzSFnhz3UK04U5Ry5XjOM4WZqXBZOzgS71sVr2n1AOB0bzwarn98B2bXtY9gyg0Qbf82DQnYmV6P8810t6fvVrsrRvT26bVxW";
modifiedContent = getTemplateCRM.get("email_templates").get(0).get("content").replaceAll("#CONTACT NAME#",input.Contact_Name).replaceAll("#LOSS DATE#",LossDate).replaceAll("#ASSET#",input.Asset).replaceAll("#BOAT/TRAILER#",input.Select_Type_of_Boat_or_Trailer.getPrefixIgnoreCase(" -")).replaceAll("#RECORD LINK#","<a href=" + msg + ">Click here</a>");
modifiedSubject = getTemplateCRM.get("email_templates").get(0).get("subject").replaceAll("#POLICY NUMBER#",input.Policy_Number);
data = {{"from":{"email":zoho.adminuserid},"to":{{"email":input.Email}},"subject":modifiedSubject,"content":modifiedContent,"mail_format":"html"}};
json_data = Map();
json_data.put("data",data);
send_mail = invokeurl
[
	url :"https://www.zohoapis.com/crm/v3/Deals/" + input.Deal_Name.tolong() + "/actions/send_mail"
	type :POST
	parameters:json_data.toString()
	connection:"zcrm"
];
info "send mail--->" + send_mail;
thisapp.Zoho_Desk.Create_claims_from_creator_to_desk(input.ID);
if(zoho.loginuser == "Public")
{
}
else
{
	openUrl("https://crm.zoho.com/crm/org810798353/tab/Potentials/" + input.Deal_Name.toLong(),"parent window");
}
*/
