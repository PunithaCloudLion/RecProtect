void Combine_Document.Boat_Doc_Status(int recID)
{
	// 		try 
	// 		{
	thisapp.Developer.addActivityLog("Boat_Doc_Status--" + recID,"Function Call Start","ID","null");
	Policy_Number = "";
	Contact_Workdrive_FolderID = "";
	Combined_Doc_Response = "";
	getBoatQuoteInfo = BoatQuote[ID == input.recID];
	if(getBoatQuoteInfo.count() > 0)
	{
		Contact_Workdrive_FolderID = getBoatQuoteInfo.NB_Workdrive_Folder_Link;
		if(getBoatQuoteInfo.Policy_Number != "" && getBoatQuoteInfo.Policy_Number != null)
		{
			Policy_Number = getBoatQuoteInfo.Policy_Number;
		}
		if(Contact_Workdrive_FolderID != "" && Contact_Workdrive_FolderID != null)
		{
			Contact_Workdrive_FolderID = Contact_Workdrive_FolderID.getsuffix("folder/");
		}
		if(getBoatQuoteInfo.Combined_Doc_Response != "" && getBoatQuoteInfo.Combined_Doc_Response != null)
		{
			Combined_Doc_Response = getBoatQuoteInfo.Combined_Doc_Response;
		}
		//----------------New Flow--------------------------------------------------
		Combined_Attachment_response = invokeurl
		[
			url :"https://www.zohoapis.com/crm/v2/functions/Test_Combiined/actions/execute?auth_type=apikey&zapikey=1003.e22f3273bb04b81989500e60afe3e5d6.99dc1d6bafbf8dd22c72d8420f043dc3"
			type :GET
			parameters:{"Policy_Number":Policy_Number,"Combined_Doc_Response":Combined_Doc_Response,"Contact_Policy_Folder_Workdrive_Folder_ID":Contact_Workdrive_FolderID}
			connection:"zcrm"
		];
		// 		info "Combined_Attachment_response" + Combined_Attachment_response;
		if(Combined_Attachment_response != null)
		{
			Attachres = Combined_Attachment_response.get("details").get("output");
			// 			info "Attachres" + Attachres;
			getBoatQuoteInfo.Combined_Doc_Download_URL=Attachres;
			getBoatQuoteInfo.Combined_Doc_Status_Check_On=null;
			permalink = Attachres;
			getBoatQuoteInfo.Combined_Doc_Workdrive_URL=permalink;
			resource_id = permalink.getsuffix("file/");
			upload_map = Map();
			upload_map.put("resource_ID",resource_id);
			upload_map.put("recID",getBoatQuoteInfo.Zoho_Crm_ID);
			get_fileuploadresponse = invokeurl
			[
				url :"https://www.zohoapis.com/crm/v2/functions/Quote_Attachment_Upload/actions/execute?auth_type=apikey&zapikey=1003.e22f3273bb04b81989500e60afe3e5d6.99dc1d6bafbf8dd22c72d8420f043dc3"
				type :GET
				parameters:upload_map
				connection:"zcrm"
			];
			// 			info "resp" + get_fileuploadresponse;
			uploadresp_ZFS = get_fileuploadresponse.get("details").get("output").toMap();
			attach_id = uploadresp_ZFS.get("data").getJSON("details").get("id");
			if(attach_id != null && attach_id != "")
			{
				// 			info "attachement id" + attach_id ;
				//--------------------Get Email confiugration form
				fetchEmailConfig = Email_Configuration[Process == "Quotation Declaration"];
				subjectField = fetchEmailConfig.Subject_field.replaceAll("POLICYNO",getBoatQuoteInfo.Policy_Number);
				toAddressData = fetchEmailConfig.Email_Data.replaceAll("CLIENTEMAIL",getBoatQuoteInfo.Email);
				userName = getBoatQuoteInfo.Insured_First_Name + getBoatQuoteInfo.Insured_Last_Name;
				// 								customMail = Map();
				// 								dataMap = Map();
				// 								fromMap = Map();
				// 								fromMap.put("user_name","Service Rec Protect");
				// 								fromMap.put("email",zoho.adminuserid);
				// 								toMap = Map();
				// 								toMap.put("user_name",userName);
				// 								toMap.put("email",toAddressData);
				// 								dataMap.put("subject",subjectField);
				// 								attId = Map();
				// 								toList = List();
				// 								toList.add(toMap);
				// 								dataMap.put("to",toList);
				// 								attachList = List();
				// 								attachList.add(attId);
				// 								dataMap.put("attachments",attachList);
				// 								dataList = List();
				// 								dataList.add(dataMap);
				// 								customMail.put("data",dataList);
				// 								attId.put("id",attach_id);
				// 								dataMap.put("from",fromMap);
				// 								info customMail;
				subjectField = Email_Configuration[Process == "NB - Boat Quotation" && Add_Recipients_As == "To"].Subject_field;
				// --- To Data Map ---
				att_List = {{"id":attach_id}};
				tempalteID = CRM_Template_Configuration[Name == "NB - Boat Declaration"].Template_ID;
				defaultList = List();
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
				CCList_Data = List();
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
				bcclist = List();
				if(bccEmail != null)
				{
					for each  bccRec in bccEmail.tolist()
					{
						bccRec = thisapp.General.emailFormation(bccRec.trim(),"Boat",recID);
						bccMp = {"email":bccRec.trim()};
						bcclist.add(bccMp);
					}
				}
				defaultList.add({"email":"vivek.v@cloudlion.org"});
				data = {{"from":{"email":zoho.adminuserid},"subject":subjectField,"to":defaultList,"cc":CCList_Data,"bcc":bcclist,"attachments":att_List,"template":{"id":tempalteID}}};
				json_data = Map();
				json_data.put("data",data);
				emailResp = invokeurl
				[
					url :"https://www.zohoapis.com/crm/v6/Deals/" + getBoatQuoteInfo.Zoho_Crm_ID + "/actions/send_mail"
					type :POST
					parameters:json_data.tostring()
					connection:"zcrm"
				];
				// 				info emailResp;
				sendmail
				[
					from :zoho.adminuserid
					to :"vivek.v@cloudlion.org"
					subject :"NB Trailer Declaration--" + recID
					message :"get_fileuploadresponse--" + get_fileuploadresponse + "--emailResp--" + emailResp + "---Email data---" + data
				]
			}
		}
		else
		{
			getBoatQuoteInfo.Combined_Doc_Status_Check_On=zoho.currenttime.addSeconds(45);
		}
	}
	else
	{
		getBoatQuoteInfo.Combined_Doc_Status_Check_On=null;
		//	getBoatQuoteInfo.Combined_Doc_Status_Check_On=zoho.currenttime.addSeconds(45);
	}
	//thisapp.Developer.addActivityLog("Boat_Doc_Status--" + recID.tostring(),"Function Call Ended and Record updated in webapp ","ID---" + recID,writerRespObj.tostring());
	// 	}
	// 	catch (e)
	// 	{
	// 		info e;
	// 		thisapp.Developer.addDeveloperLog("Boat Quote","Boat_Doc_Status:" + recID.tostring(),"Record updated in webapp",recID.tostring(),e,"creator");
	// 	}
}