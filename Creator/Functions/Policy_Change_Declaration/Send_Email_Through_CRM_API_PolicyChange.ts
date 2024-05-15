void Policy_Change_Declaration.Send_Email_Through_CRM_API_PolicyChange(int recID, String emailFor, String attach_id)
{
	try 
	{
		thisapp.Developer.addActivityLog("Send_Email_Through_CRM_API_PolicyChange --" + recID,"Function Call Start","ID",emailFor);
		att_List = List();
		att_List = {{"id":attach_id}};
		defaultList = List();
		CCList_Data = List();
		bcclist = List();
		json_data = Map();
		// --------- Send Email For Trailer ---------
		if(emailFor == "Trailer")
		{
			getpolicychangeInfo = Trailer_Policy_Change_Request[ID == recID];
			trailerquotation = TrailerQuote[ID == getpolicychangeInfo.TrailerQuote_ID];
			crmID = getpolicychangeInfo.Zoho_Crm_ID;
			subjectField = Email_Configuration[Process == "Policy Changes Declaration" && Add_Recipients_As == "To"].Subject_field.replaceAll("POLICY",getpolicychangeInfo.Policy_Number);
			// --- To Data Map ---
			//-------------------Template Config----------------
			tempalteID = CRM_Template_Configuration[Name == "Policy Change Declaration"].Template_ID;
			template = invokeurl
			[
				url :"https://www.zohoapis.com/crm/v6/settings/email_templates/" + tempalteID
				type :GET
				connection:"zcrm"
			];
			email_content = template.replaceAll("#POLICYREASONCODE#",getpolicychangeInfo.Policy_Reason_Code.toString()).replaceAll("#PREMIUM#",getpolicychangeInfo.Outstanding.toString()).replaceAll("#FIRSTNAME#",trailerquotation.Insured_First_Name.toString()).replaceAll("#EFFECTIVEDATE#",trailerquotation.Inception_Date.toString());
			email_content = email_content.toMap().get("email_templates").get(0).get("content");
			//-------------------Template Config End ----
			defaultList = List();
			EmailConfigInfo = Email_Configuration[Process == "Policy Changes Declaration" && Add_Recipients_As == "To"];
			if(EmailConfigInfo.count() > 0)
			{
				for each  recDefault in EmailConfigInfo.Email_Data.toList()
				{
					recDefault = thisapp.General.emailFormation(recDefault.trim(),"Trailer",trailerquotation.ID);
					defaultMap = {"email":recDefault};
					defaultList.add(defaultMap);
				}
			}
			// --- CC Data List ---
			ccEmail = Email_Configuration[Process == "Policy Changes Declaration" && Add_Recipients_As == "CC"].Email_Data;
			CCList_Data = List();
			if(ccEmail != null)
			{
				for each  ccRec in ccEmail.tolist()
				{
					ccRec = thisapp.General.emailFormation(ccRec.trim(),"Trailer",trailerquotation.ID);
					ccMp = {"email":ccRec.trim()};
					CCList_Data.add(ccMp);
				}
			}
			// --- Bcc List -----
			bccEmail = Email_Configuration[Process == "Policy Changes Declaration" && Add_Recipients_As == "BCC"].Email_Data;
			bcclist = List();
			if(bccEmail != null)
			{
				for each  bccRec in bccEmail.tolist()
				{
					bccRec = thisapp.General.emailFormation(bccRec.trim(),"Trailer",trailerquotation.ID);
					bccMp = {"email":bccRec.trim()};
					bcclist.add(bccMp);
				}
			}
			data = {{"from":{"email":zoho.adminuserid},"subject":subjectField,"to":defaultList,"cc":CCList_Data,"bcc":bcclist,"attachments":att_List,"content":email_content}};
		}
		// --------- Send Email For Boat ---------
		if(emailFor == "Boat")
		{
			getpolicyBoatChangeInfo = Boat_Policy_change_Request[ID == recID];
			boatquotation = BoatQuote[ID == getpolicyBoatChangeInfo.BoatQuote_ID];
			crmID = getpolicyBoatChangeInfo.Zoho_Crm_ID;
			subjectField = Email_Configuration[Process == "Policy Changes Declaration" && Add_Recipients_As == "To"].Subject_field.replaceAll("POLICY",getpolicyBoatChangeInfo.Policy_Number);
			// --- To Data Map ---
			//-------------------Template Config----------------
			tempalteID = CRM_Template_Configuration[Name == "Policy Change Declaration"].Template_ID;
			template = invokeurl
			[
				url :"https://www.zohoapis.com/crm/v6/settings/email_templates/" + tempalteID
				type :GET
				connection:"zcrm"
			];
			email_content = template.replaceAll("#POLICYREASONCODE#",getpolicyBoatChangeInfo.Policy_Reason_Code.toString()).replaceAll("#PREMIUM#",getpolicyBoatChangeInfo.Outstanding.toString()).replaceAll("#FIRSTNAME#",boatquotation.Insured_First_Name.toString()).replaceAll("#EFFECTIVEDATE#",boatquotation.Inception_Date.toString());
			email_content = email_content.toMap().get("email_templates").get(0).get("content");
			//-------------------Template Config End ----
			defaultList = List();
			EmailConfigInfo = Email_Configuration[Process == "Policy Changes Declaration" && Add_Recipients_As == "To"];
			if(EmailConfigInfo.count() > 0)
			{
				for each  recDefault in EmailConfigInfo.Email_Data.toList()
				{
					recDefault = thisapp.General.emailFormation(recDefault.trim(),"Boat",boatquotation.ID);
					defaultMap = {"email":recDefault};
					defaultList.add(defaultMap);
				}
			}
			// --- CC Data List ---
			ccEmail = Email_Configuration[Process == "Policy Changes Declaration" && Add_Recipients_As == "CC"].Email_Data;
			CCList_Data = List();
			if(ccEmail != null)
			{
				for each  ccRec in ccEmail.tolist()
				{
					ccRec = thisapp.General.emailFormation(ccRec.trim(),"Boat",boatquotation.ID);
					ccMp = {"email":ccRec.trim()};
					CCList_Data.add(ccMp);
				}
			}
			// --- Bcc List -----
			bccEmail = Email_Configuration[Process == "Policy Changes Declaration" && Add_Recipients_As == "BCC"].Email_Data;
			bcclist = List();
			if(bccEmail != null)
			{
				for each  bccRec in bccEmail.tolist()
				{
					bccRec = thisapp.General.emailFormation(bccRec.trim(),"Boat",boatquotation.ID);
					bccMp = {"email":bccRec.trim()};
					bcclist.add(bccMp);
				}
			}
			data = {{"from":{"email":zoho.adminuserid},"subject":subjectField,"to":defaultList,"cc":CCList_Data,"bcc":bcclist,"attachments":att_List,"content":email_content}};
		}
		//	info data;
		// ------- Hit Send Email API ----
		if(data.isEmpty() == false)
		{
			json_data.put("data",data);
			emailResp = invokeurl
			[
				url :"https://www.zohoapis.com/crm/v6/Deals/" + crmID + "/actions/send_mail"
				type :POST
				parameters:json_data.tostring()
				connection:"zcrm"
			];
			thisapp.Developer.addActivityLog("Send_Email_Through_CRM_API_PolicyChange--" + recID,"Send Email API Response -- " + emailFor,emailResp,data.toString());
		}
		else
		{
			thisapp.Developer.addActivityLog("Send_Email_Through_CRM_API_PolicyChange--" + recID,"Data set is empty","ID",emailFor);
		}
	}
	catch (e)
	{
		thisapp.Developer.addDeveloperLog("Trailer - Policy Change","Send_Email_Through_CRM_API_PolicyChange(Policy_Change_Declaration.Send_Email_Through_CRM_API_PolicyChange)--" + recID.toString()," Combine Doc send mail Error Response","",e,"creator");
	}
}