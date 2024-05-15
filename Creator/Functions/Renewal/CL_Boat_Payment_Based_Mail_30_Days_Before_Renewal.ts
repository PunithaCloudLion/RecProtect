void Renewal.CL_Boat_Payment_Based_Mail_30_Days_Before_Renewal(int boatID, string paymentStatus)
{
	getBoat = TrailerQuote[ID == boatID];
	if(getBoat.Customer_ID != null)
	{
		getContact = Customer[ID == getBoat.Customer_ID];
		contactName = getContact.Full_Name;
		Email = getContact.Email;
	}
	else
	{
		contactName = "";
	}
	msg = "";
	RenewalDate = "";
	UPOCardNumber = "";
	termPeriod = "";
	Day18 = "";
	Day19 = "";
	TaxProvinceName = getBoat.Tax_Province;
	getTaxRate = Tax_Lists[State_Province == getBoat.Tax_Province.tostring()];
	if(getTaxRate.count() > 0)
	{
		TaxPercentID = getTaxRate.ID;
		TaxPercent = getTaxRate.Tax;
	}
	trailer_List = List();
	TotalTrailers = 0;
	Count = 0;
	getOldBoat = TrailerQuote[Zoho_Crm_ID == getBoat.Zoho_Crm_ID && Policy_Status == "ACTIVE"];
	//getOldBoats = Trailer[TrailerQuote == getOldBoat.ID && Premises_Liability > 2000000.00 || Overland_Water_Protection == false];
	if(getBoat.Policy_Status == "INACTIVE - RENEWAL PENDING")
	{
		// 		//-------------Attachment Fetch and Send mail--------------------------------------
		Carrier = "";
		workdrive_ID = "";
		if(getOldBoat.Carrier == "Germania Insurance")
		{
			Carrier = "Germania Insurance";
		}
		Policy_Number = "# " + getBoat.Policy_Number + "-Policy Declaration";
		getBoatDocument = Boat_Document_Information[BoatQuote == getBoat.ID];
		if(getBoatDocument.count() > 0)
		{
			workdrive_ID = getBoatDocument.Workdrive_URL;
			//	.getSuffixIgnoreCase("file/");
		}
		Attachmentresponse = invokeurl
		[
			url :"https://www.zohoapis.com/crm/v2/functions/Test_Attachment/actions/execute?auth_type=apikey&zapikey=1003.e22f3273bb04b81989500e60afe3e5d6.99dc1d6bafbf8dd22c72d8420f043dc3"
			type :GET
			parameters:{"creator_ID":getBoat.ID,"Carrier":Carrier,"workdrive_ID":workdrive_ID}
			connection:"zcrm"
		];
		if(Attachmentresponse != null)
		{
			Attachres = Attachmentresponse.get("details").get("output");
			//		info "attachres----" + Attachres;
			att_List1 = List();
			for each  Att in Attachres
			{
				new_Map = Map();
				new_Map.put("id",Att.trim());
				att_List1.add(new_Map);
			}
		}
		creatorMap = Map();
		crmUpdateMap = Map();
		if(paymentStatus == "PAID")
		{
			// 			// 			info "succ";
			getTemplateCRM = invokeurl
			[
				url :"https://www.zohoapis.com/crm/v6/settings/email_templates/5778486000008321018"
				type :GET
				connection:"zcrm"
			];
			getYear = zoho.currentdate.getYear();
			termPeriod = getYear + 1;
			//replaceAll("&lt;term period&gt;",getYear + " - " + termPeriod)
			RenewalDate = getBoat.Expiry_Date.addDay(1);
			nextYr = zoho.currentdate.getYear() + 1;
			termPeriod = zoho.currentdate.getYear() + " - " + nextYr;
			modifiedContent = getTemplateCRM.get("email_templates").get(0).get("content").replaceAll("&lt;Trailer Details&gt;",msg).replaceAll("&lt;Renewal Date&gt;",RenewalDate).replaceAll("&lt;Term Period&gt;",termPeriod).replaceAll("&lt;Contact Name&gt;",contactName).replaceAll("&lt;Total&gt;",getBoat.Total.tostring()).replaceAll("&lt;Policy Number&gt;",getBoat.Policy_Number).replaceAll("#UPOCARDNUMBER#",UPOCardNumber);
			modifiedSubject = getTemplateCRM.get("email_templates").get(0).get("subject");
			// 			//info modifiedContent;
			// 			//,"template":{"id":"4516886000014770109"}
			//		info att_List1;
			data = {{"from":{"email":zoho.adminuserid},"to":{{"email":Email}},"subject":modifiedSubject,"content":modifiedContent,"mail_format":"html","attachments":att_List1}};
			json_data = Map();
			json_data.put("data",data);
			send_mail = invokeurl
			[
				url :"https://www.zohoapis.com/crm/v3/Deals/" + getBoat.Zoho_Crm_ID.tolong() + "/actions/send_mail"
				type :POST
				parameters:json_data.toString()
				connection:"zcrm"
			];
			//			info send_mail;
			//	creatorMap.put("Renewal_Stage","30th Day - Successful Payment");
			getBoat.Renewal_Stage="30th Day - Successful Payment";
			crmUpdateMap.put("Renewal_Stage","30th Day - Successful Payment");
		}
		else if(paymentStatus == "UNPAID")
		{
			paymentStatusUpdateMap = Map();
			paymentStatusUpdateMap.put("Payment_Status","UnPaid");
			updatePaymentStatusUpdate = zoho.crm.updateRecord("Deals",getBoat.Zoho_Crm_ID.tolong(),paymentStatusUpdateMap);
			/**** UNsuccessfull Starts here **/
			getTemplateCRM = invokeurl
			[
				url :"https://www.zohoapis.com/crm/v6/settings/email_templates/5778486000008321037"
				type :GET
				connection:"zcrm"
			];
			Day18 = getBoat.Expiry_Date.subDay(18);
			Day19 = getBoat.Expiry_Date.subDay(19);
			RenewalDate = getBoat.Expiry_Date.addDay(1);
			modifiedContent = getTemplateCRM.get("email_templates").get(0).get("content").replaceAll("&lt;Trailer Details&gt;",msg).replaceAll("&lt;Day 18&gt;",Day18).replaceAll("&lt;Day 19&gt;",Day19).replaceAll("&lt;Renewal Date&gt;",RenewalDate).replaceAll("&lt;Contact Name&gt;",contactName).replaceAll("&lt;Total&gt;",getBoat.Total.tostring()).replaceAll("&lt;Policy Number&gt;",getBoat.Policy_Number).replaceAll("#UPOCARDNUMBER#",UPOCardNumber);
			modifiedSubject = getTemplateCRM.get("email_templates").get(0).get("subject");
			//info modifiedContent;
			//,"template":{"id":"4516886000014770109"}
			data = {{"from":{"email":zoho.adminuserid},"to":{{"email":Email}},"subject":modifiedSubject,"content":modifiedContent,"mail_format":"html","attachments":att_List1}};
			json_data = Map();
			json_data.put("data",data);
			send_mail = invokeurl
			[
				url :"https://www.zohoapis.com/crm/v3/Deals/" + getBoat.Zoho_Crm_ID.tolong() + "/actions/send_mail"
				type :POST
				parameters:json_data.toString()
				connection:"zcrm"
			];
			//		info send_mail;
			//	creatorMap.put("Renewal_Stage","30th Day - Unsuccessful Payment");
			getBoat.Renewal_Stage="30th Day - Unsuccessful Payment";
			crmUpdateMap.put("Renewal_Stage","30th Day - Unsuccessful Payment");
		}
		updateCRM = zoho.crm.updateRecord("Deals",getBoat.Zoho_Crm_ID.tolong(),crmUpdateMap);
	}
}