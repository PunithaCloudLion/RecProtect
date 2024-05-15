void Combine_Document.Send_Email_Through_CRM_API(int recID, string emailFor)
{
	try 
	{
		thisapp.Developer.addActivityLog("Send_Email_Through_CRM_API--" + recID,"Function Call Start","ID",emailFor);
		att_List = List();
		defaultList = List();
		CCList_Data = List();
		bcclist = List();
		json_data = Map();
		// --------- Send Email For Trailer ---------
		if(emailFor == "Trailer")
		{
			getTrailerQuoteInfo = TrailerQuote[ID == input.recID];
			crmID = getTrailerQuoteInfo.Zoho_Crm_ID;
			if(getTrailerQuoteInfo.count() > 0)
			{
				subjectField = Email_Configuration[Process == "NB - Trailer Quotation" && Add_Recipients_As == "To"].Subject_field;
				// --- Attachment List Map ---
				for each  attachRec in getTrailerQuoteInfo.Email_List.toList()
				{
					att_List.add({"id":attachRec});
				}
				// 									att_List = {{"id":attach_id}};
				tempalteID = CRM_Template_Configuration[Name == "NB - Trailer Declaration"].Template_ID;
				// --- To Data Map ---
				EmailConfigInfo = Email_Configuration[Process == "NB - Trailer Quotation" && Add_Recipients_As == "To"];
				if(EmailConfigInfo.count() > 0)
				{
					for each  recDefault in EmailConfigInfo.Email_Data.toList()
					{
						recDefault = thisapp.General.emailFormation(recDefault.trim(),"Trailer",recID);
						defaultMap = {"email":recDefault};
						defaultList.add(defaultMap);
					}
				}
				// --- CC Data List ---
				ccEmail = Email_Configuration[Process == "NB - Trailer Quotation" && Add_Recipients_As == "CC"].Email_Data;
				if(ccEmail != null)
				{
					for each  ccRec in ccEmail.tolist()
					{
						ccRec = thisapp.General.emailFormation(ccRec.trim(),"Trailer",recID);
						ccMp = {"email":ccRec.trim()};
						CCList_Data.add(ccMp);
					}
				}
				// --- Bcc List -----
				bccEmail = Email_Configuration[Process == "NB - Trailer Quotation" && Add_Recipients_As == "BCC"].Email_Data;
				if(bccEmail != null)
				{
					for each  bccRec in bccEmail.tolist()
					{
						bccRec = thisapp.General.emailFormation(bccRec.trim(),"Trailer",recID);
						bccMp = {"email":bccRec.trim()};
						bcclist.add(bccMp);
					}
				}
				data = {{"from":{"email":zoho.adminuserid},"subject":subjectField,"to":defaultList,"cc":CCList_Data,"bcc":bcclist,"attachments":att_List,"template":{"id":tempalteID}}};
			}
		}
		// --------- Send Email For Boat ---------
		if(emailFor == "Boat")
		{
			getBoatQuoteInfo = BoatQuote[ID == input.recID];
			crmID = getBoatQuoteInfo.Zoho_Crm_ID;
			if(getBoatQuoteInfo.count() > 0)
			{
				subjectField = Email_Configuration[Process == "NB - Boat Quotation" && Add_Recipients_As == "To"].Subject_field;
				tempalteID = CRM_Template_Configuration[Name == "NB - Boat Declaration"].Template_ID;
				info " --- " + getBoatQuoteInfo.Email_List;
				// --- Attachemt Data map ---
				for each  attachRec in getBoatQuoteInfo.Email_List.toList()
				{
					att_List.add({"id":attachRec});
				}
				// --- To Data Map ---
				EmailConfigInfo = Email_Configuration[Process == "NB - Boat Quotation" && Add_Recipients_As == "To"];
				if(EmailConfigInfo.count() > 0)
				{
					for each  recDefault in EmailConfigInfo.Email_Data.toList()
					{
						recDefault = thisapp.General.emailFormation(recDefault.trim(),"Boat",recID);
						defaultMap = {"email":recDefault};
						defaultList.add(defaultMap);
					}
				}
				// --- CC Data List ---
				ccEmail = Email_Configuration[Process == "NB - Boat Quotation" && Add_Recipients_As == "CC"].Email_Data;
				if(ccEmail != null)
				{
					for each  ccRec in ccEmail.tolist()
					{
						ccRec = thisapp.General.emailFormation(ccRec.trim(),"Boat",recID);
						ccMp = {"email":ccRec.trim()};
						CCList_Data.add(ccMp);
					}
				}
				// --- Bcc List -----
				bccEmail = Email_Configuration[Process == "NB - Boat Quotation" && Add_Recipients_As == "BCC"].Email_Data;
				if(bccEmail != null)
				{
					for each  bccRec in bccEmail.tolist()
					{
						bccRec = thisapp.General.emailFormation(bccRec.trim(),"Boat",recID);
						bccMp = {"email":bccRec.trim()};
						bcclist.add(bccMp);
					}
				}
				data = {{"from":{"email":zoho.adminuserid},"subject":subjectField,"to":defaultList,"cc":CCList_Data,"bcc":bcclist,"attachments":att_List,"template":{"id":tempalteID}}};
			}
		}
		// ------- Hit Send Email API ----
		if(data.isEmpty() == false)
		{
			json_data.put("data",data);
			info json_data;
			emailResp = invokeurl
			[
				url :"https://www.zohoapis.com/crm/v6/Deals/" + crmID + "/actions/send_mail"
				type :POST
				parameters:json_data.tostring()
				connection:"zcrm"
			];
			info emailResp;
			thisapp.Developer.addActivityLog("Send_Email_Through_CRM_API--" + recID,"Send Email API Response -- " + emailFor,emailResp,data.toString());
		}
		else
		{
			thisapp.Developer.addActivityLog("Send_Email_Through_CRM_API--" + recID,"Data set is empty","ID",emailFor);
		}
	}
	catch (e)
	{
		thisapp.Developer.addDeveloperLog("Send Email","Send Email API Function Call Error:" + recID.tostring(),"Email For -- " + emailFor,recID.tostring(),e,"creator");
	}
}