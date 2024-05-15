void Renewal.CL_Trailer_Payment_Based_Mail_30_Days_Before(int trailerID, string paymentStatus)
{
	getTrailer = TrailerQuote[ID == trailerID];
	if(getTrailer.Customer_ID != null)
	{
		getContact = Customer[ID == getTrailer.Customer_ID];
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
	TaxProvinceName = getTrailer.Tax_Province;
	getTaxRate = Tax_Lists[State_Province == getTrailer.Tax_Province.tostring()];
	if(getTaxRate.count() > 0)
	{
		TaxPercentID = getTaxRate.ID;
		TaxPercent = getTaxRate.Tax;
	}
	trailer_List = List();
	TotalTrailers = 0;
	Count = 0;
	getOldTrailer = TrailerQuote[Zoho_Crm_ID == getTrailer.Zoho_Crm_ID && Policy_Status == "ACTIVE"];
	getOldTrailers = Trailer[TrailerQuote == getOldTrailer.ID && Premises_Liability > 2000000.00 || Overland_Water_Protection == false];
	if(getTrailer.Policy_Status == "INACTIVE - RENEWAL PENDING")
	{
		// 		for each  trailerData in getTrailer.Trailer
		// 		{
		// 			msg = msg + "<br>" + trailerData.Trailer_Model_Year + "," + trailerData.Trailer_Manufacturer + "," + trailerData.Trailer_Model + "," + trailerData.Select_Trailer_Type + "";
		// 			if(trailerData.Premises_Liability < 2000000.00 || trailerData.Overland_Water_Protection == false)
		// 			{
		if(getOldTrailer.count() > 0)
		{
			response = invokeurl
			[
				url :"https://download.zoho.com/v1/workdrive/download/44o5pf244659f42ff4cf4b29f329165f608b8"
				type :GET
				connection:"cl_workdrive"
			];
			response.setParamName("file");
			upload_Res = invokeurl
			[
				url :"https://www.zohoapis.com/crm/v2/files"
				type :POST
				files:response
				connection:"zcrm"
			];
			if(upload_Res != null)
			{
				attach_id = upload_Res.get("data").getJSON("details").get("id");
			}
			//	Count = Count + 1;
		}
		// 			}
		// 		}
		//Payment = "Success";
		// 		//-------------Attachment Fetch and Send mail--------------------------------------
		Carrier = "";
		workdrive_ID = "";
		if(getOldTrailer.Carrier == "Germania Insurance")
		{
			Carrier = "Germania Insurance";
		}
		Policy_Number = "# " + getTrailer.Policy_Number + "-Policy Declaration";
		getTrailerDocument = Trailer_Document_Information[TrailerQuote == getTrailer.ID];
		if(getTrailerDocument.count() > 0)
		{
			workdrive_ID = getTrailerDocument.Workdrive_URL;
			//	.getSuffixIgnoreCase("file/");
		}
		Attachmentresponse = invokeurl
		[
			url :"https://www.zohoapis.com/crm/v2/functions/Test_Attachment/actions/execute?auth_type=apikey&zapikey=1003.e22f3273bb04b81989500e60afe3e5d6.99dc1d6bafbf8dd22c72d8420f043dc3"
			type :GET
			parameters:{"creator_ID":getTrailer.ID,"Carrier":Carrier,"workdrive_ID":workdrive_ID}
			connection:"zcrm"
		];
		if(Attachmentresponse != null)
		{
			Attachres = Attachmentresponse.get("details").get("output");
			//		info "attachres----" + Attachres;
			att_List1 = List();
			if(attach_id != null)
			{
				newMap2 = Map();
				newMap2.put("id",attach_id.trim());
				att_List1.add(newMap2);
			}
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
				url :"https://www.zohoapis.com/crm/v6/settings/email_templates/5778486000007471064"
				type :GET
				connection:"zcrm"
			];
			getYear = zoho.currentdate.getYear();
			termPeriod = getYear + 1;
			//replaceAll("&lt;term period&gt;",getYear + " - " + termPeriod)
			RenewalDate = getTrailer.Expiry_Date.addDay(1);
			nextYr = zoho.currentdate.getYear() + 1;
			termPeriod = zoho.currentdate.getYear() + " - " + nextYr;
			modifiedContent = getTemplateCRM.get("email_templates").get(0).get("content").replaceAll("&lt;Trailer Details&gt;",msg).replaceAll("&lt;Renewal Date&gt;",RenewalDate).replaceAll("&lt;Term Period&gt;",termPeriod).replaceAll("&lt;Contact Name&gt;",contactName).replaceAll("&lt;Total&gt;",getTrailer.Total.tostring()).replaceAll("&lt;Policy Number&gt;",getTrailer.Policy_Number).replaceAll("#UPOCARDNUMBER#",UPOCardNumber);
			modifiedSubject = getTemplateCRM.get("email_templates").get(0).get("subject");
			// 			//info modifiedContent;
			// 			//,"template":{"id":"4516886000014770109"}
			//			info att_List1;
			data = {{"from":{"email":zoho.adminuserid},"to":{{"email":Email}},"subject":modifiedSubject,"content":modifiedContent,"mail_format":"html","attachments":att_List1}};
			json_data = Map();
			json_data.put("data",data);
			send_mail = invokeurl
			[
				url :"https://www.zohoapis.com/crm/v3/Deals/" + getTrailer.Zoho_Crm_ID.tolong() + "/actions/send_mail"
				type :POST
				parameters:json_data.toString()
				connection:"zcrm"
			];
			//			info send_mail;
			//	creatorMap.put("Renewal_Stage","30th Day - Successful Payment");
			getTrailer.Renewal_Stage="30th Day - Successful Payment";
			crmUpdateMap.put("Renewal_Stage","30th Day - Successful Payment");
		}
		else if(paymentStatus == "UNPAID")
		{
			paymentStatusUpdateMap = Map();
			paymentStatusUpdateMap.put("Payment_Status","UnPaid");
			updatePaymentStatusUpdate = zoho.crm.updateRecord("Deals",getTrailer.Zoho_Crm_ID.tolong(),paymentStatusUpdateMap);
			/**** UNsuccessfull Starts here **/
			getTemplateCRM = invokeurl
			[
				url :"https://www.zohoapis.com/crm/v6/settings/email_templates/5778486000007471071"
				type :GET
				connection:"zcrm"
			];
			Day18 = getTrailer.Expiry_Date.subDay(18);
			Day19 = getTrailer.Expiry_Date.subDay(19);
			RenewalDate = getTrailer.Expiry_Date.addDay(1);
			modifiedContent = getTemplateCRM.get("email_templates").get(0).get("content").replaceAll("&lt;Trailer Details&gt;",msg).replaceAll("&lt;Day 18&gt;",Day18).replaceAll("&lt;Day 19&gt;",Day19).replaceAll("&lt;Renewal Date&gt;",RenewalDate).replaceAll("&lt;Contact Name&gt;",contactName).replaceAll("&lt;Total&gt;",getTrailer.Total.tostring()).replaceAll("&lt;Policy Number&gt;",getTrailer.Policy_Number).replaceAll("#UPOCARDNUMBER#",UPOCardNumber);
			modifiedSubject = getTemplateCRM.get("email_templates").get(0).get("subject");
			//info modifiedContent;
			//,"template":{"id":"4516886000014770109"}
			data = {{"from":{"email":zoho.adminuserid},"to":{{"email":Email}},"subject":modifiedSubject,"content":modifiedContent,"mail_format":"html","attachments":att_List1}};
			json_data = Map();
			json_data.put("data",data);
			send_mail = invokeurl
			[
				url :"https://www.zohoapis.com/crm/v3/Deals/" + getTrailer.Zoho_Crm_ID.tolong() + "/actions/send_mail"
				type :POST
				parameters:json_data.toString()
				connection:"zcrm"
			];
			//			info send_mail;
			//	creatorMap.put("Renewal_Stage","30th Day - Unsuccessful Payment");
			getTrailer.Renewal_Stage="30th Day - Unsuccessful Payment";
			crmUpdateMap.put("Renewal_Stage","30th Day - Unsuccessful Payment");
		}
		updateCRM = zoho.crm.updateRecord("Deals",getTrailer.Zoho_Crm_ID.tolong(),crmUpdateMap);
	}
}