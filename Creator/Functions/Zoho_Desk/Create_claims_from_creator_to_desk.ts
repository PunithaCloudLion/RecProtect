void Zoho_Desk.Create_claims_from_creator_to_desk(int id)
{
	get_Claims = Claims[ID == id];
	if(get_Claims.count() > 0)
	{
		data = Map();
		data.put("cf_claims_number",get_Claims.Claims_Number);
		data.put("cf_claims_status",get_Claims.Claims_Status);
		data.put("cf_claims_type",get_Claims.Claims_Type);
		data.put("cf_closed_date",get_Claims.Closed_Date);
		data.put("cf_loss_date",get_Claims.Loss_Date);
		data.put("cf_policy_number",get_Claims.Policy_Number);
		data.put("cf_total_payout",get_Claims.Total_Payout);
		data.put("cf_asset",get_Claims.Asset);
		addMap = Map();
		addMap.put("departmentId","909961000003259029");
		if(get_Claims.Claims_Type != null)
		{
			subjData = "Claim: " + get_Claims.Policy_Number + " - " + get_Claims.Asset + " - " + ifnull(get_Claims.Claims_Type,"");
		}
		else
		{
			subjData = "Claim: " + get_Claims.Policy_Number + " - " + get_Claims.Asset;
		}
		addMap.put("subject",subjData);
		addMap.put("status","Open");
		// 		//addMap.put("contactId",909961000001958201);
		addMap.put("contact",{"email":get_Claims.Email,"lastName":get_Claims.Contact_Name});
		addMap.put("cf",data);
		addDeskTicket = zoho.desk.create(830242517,"tickets",addMap,"zohodesk");
		//info addDeskTicket;
		get_Claims.Desk_ID=addDeskTicket.get("id");
		get_Claims.View_Claims="<a href= \"https://desk.zoho.com/agent/recprotect505/claims/tickets/details/" + addDeskTicket.get("id") + "\" title = \"View Ticket\" target = \"_blank\">View Ticket</a>";
		//	get_Claims.View_Claims = {"url":"https://desk.zoho.com/agent/recprotect505/claims/tickets/details/"+addDeskTicket.get("id"),"title":"View Ticket"};
		//----------------Fetch CRM Template-----------------------------------------------------
		getTemplateCRM = invokeurl
		[
			url :"https://www.zohoapis.com/crm/v6/settings/email_templates/5778486000014258001"
			type :GET
			connection:"zcrm"
		];
		//	info getTemplateCRM;
		/*	msg = "https://creator.zohopublic.com/service_recprotect/quotation/Claims/record-edit/All_Claims/" + id + "/ypJDzSFnhz3UK04U5Ry5XjOM4WZqXBZOzgS71sVr2n1AOB0bzwarn98B2bXtY9gyg0Qbf82DQnYmV6P8810t6fvVrsrRvT26bVxW";
		modifiedContent = getTemplateCRM.get("email_templates").get(0).get("content").replaceAll("#CONTACT NAME#",get_Claims.Contact_Name).replaceAll("#LOSS DATE#",get_Claims.Loss_Date.toString()).replaceAll("#ASSET#",get_Claims.Asset).replaceAll("#BOAT/TRAILER#",get_Claims.Select_Type_of_Boat_or_Trailer.getPrefixIgnoreCase(" -")).replaceAll("#RECORD LINK#","<a href=" + msg + ">Click here</a>");
		modifiedSubject = getTemplateCRM.get("email_templates").get(0).get("subject");
		data = {{"from":{"email":zoho.adminuserid},"to":{{"email":get_Claims.Email}},"subject":modifiedSubject,"content":modifiedContent,"mail_format":"html"}};
		json_data = Map();
		json_data.put("data",data);
				send_mail = invokeurl
				[
					url :"https://www.zohoapis.com/crm/v3/Deals/" + get_Claims.Deal_Name.tolong() + "/actions/send_mail"
					type :POST
					parameters:json_data.toString()
					connection:"zcrm"
				];
		info "send mail--->" + send_mail;*/
		if(get_Claims.Loss_Date != null)
		{
			LossDate = get_Claims.Loss_Date.toString();
		}
		else
		{
			LossDate = "";
		}
		msg = "https://creator.zohopublic.com/service_recprotect/quotation/Claims/record-edit/All_Claims/" + id + "/ypJDzSFnhz3UK04U5Ry5XjOM4WZqXBZOzgS71sVr2n1AOB0bzwarn98B2bXtY9gyg0Qbf82DQnYmV6P8810t6fvVrsrRvT26bVxW";
		mailContent = getTemplateCRM.get("email_templates").get(0).get("content").replaceAll("#CONTACT NAME#",get_Claims.Contact_Name).replaceAll("#LOSS DATE#",LossDate).replaceAll("#ASSET#",get_Claims.Asset).replaceAll("#BOAT/TRAILER#",get_Claims.Select_Type_of_Boat_or_Trailer.getPrefixIgnoreCase(" -")).replaceAll("#RECORD LINK#","<a href=" + msg + ">click here.</a>");
		sendreplydata = Map();
		sendreplydata.put("channel","EMAIL");
		//sendreplydata.put("contentType","plainText");
		sendreplydata.put("contentType","html");
		sendreplydata.put("content",mailContent);
		sendreplydata.put("fromEmailAddress",zoho.adminuserid);
		//-----to : get_Claims.Email
		sendreplydata.put("to",get_Claims.Email);
		//	cc:"service@recprotect.ca"
		sendreplydata.put("cc","service@recprotect.ca");
		responseSendreply = invokeurl
		[
			url :"https://desk.zoho.com/api/v1/tickets/" + addDeskTicket.get("id") + "/sendReply"
			type :POST
			parameters:sendreplydata.toString()
			connection:"zohodesk"
		];
		//	info responseSendreply;
		if(zoho.loginuser == "Public")
		{
		}
		else
		{
			openUrl("https://crm.zoho.com/crm/org810798353/tab/Potentials/" + get_Claims.Deal_Name.toLong(),"parent window");
		}
		//---------------------------------------------------------------------------------------
	}
}