void Mass_Mail.MassMail_for_trailer()
{
	count = 0;
	getTemplateCRM = invokeurl
	[
		url :"https://www.zohoapis.com/crm/v6/settings/email_templates/5778486000020324009"
		type :GET
		connection:"zcrm"
	];
	for each  massTrailer in Trailer_Payment_Update_Tracker[Status != "Payment Updated"]
	{
		count = count + 1;
		fetTrailer = TrailerQuote[ID == massTrailer.Record_ID.tolong()];
		if(fetTrailer.count() > 0)
		{
			TrailerID = fetTrailer.Zoho_Crm_ID.tolong();
			Email = fetTrailer.Email;
			modifiedContent = getTemplateCRM.get("email_templates").get(0).get("content").replaceAll("&#CUSTOMER NAME#,",massTrailer.Customer_Name);
			modifiedSubject = getTemplateCRM.get("email_templates").get(0).get("subject");
			data = {{"from":{"email":zoho.adminuserid},"to":{{"email":Email}},"subject":modifiedSubject,"content":modifiedContent,"mail_format":"html"}};
			json_data = Map();
			json_data.put("data",data);
			send_mail = invokeurl
			[
				url :"https://www.zohoapis.com/crm/v3/Deals/" + TrailerID + "/actions/send_mail"
				type :POST
				parameters:json_data.toString()
				connection:"zcrm"
			];
			// 		info "send_mail---->" + send_mail;
			if(send_mail.get("data").get(0).get("code") == "SUCCESS")
			{
				emailTracking = insert into Payment_Update_Mail_Tracking
				[
					Added_User=zoho.loginuser
					From=zoho.adminuserid
					To=Email
					Subject_field=modifiedSubject
					TrailerQuote=TrailerID
					Trailer_Payment_Update_Tracker=massTrailer.ID
				];
				if(emailTracking != null)
				{
					//	massTrailer.Mail_Sent="Yes";
				}
			}
		}
	}
	//	info count;
}