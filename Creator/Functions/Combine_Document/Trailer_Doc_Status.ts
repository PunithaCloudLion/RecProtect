void Combine_Document.Trailer_Doc_Status(int recID)
{
	try 
	{
		thisapp.Developer.addActivityLog("Trailer_Doc_Status--" + recID,"Function Call Start","ID","null");
		getTrailerQuoteInfo = TrailerQuote[ID == input.recID];
		if(getTrailerQuoteInfo.count() > 0)
		{
			// 			workdriveFolderID = getTrailerQuoteInfo.Contact_Policy_Folder_Workdrive_Folder_ID;
			workdriveFolderID = getTrailerQuoteInfo.NB_Workdrive_Folder_Link;
			combine_docName = "# " + getTrailerQuoteInfo.Policy_Number + "-Policy Declaration";
			responseData = getTrailerQuoteInfo.Combined_Doc_Response.toMap();
			if(responseData.isEmpty() == false)
			{
				//info "2" ;
				if(responseData.get("status") == "inprogress")
				{
					//	info "3" ;
					urlVal = responseData.get("status_check_url");
					statuscheckResponse = invokeurl
					[
						url :urlVal
						type :GET
						connection:"cl_writer"
					];
					//	info "status ----" +statuscheckResponse  ;
					if(statuscheckResponse != null && statuscheckResponse.get("status") == "completed")
					{
						//info "4" ;
						downloadURL = statuscheckResponse.get("download_link");
						writerRespObj = invokeurl
						[
							url :statuscheckResponse.get("download_link")
							type :GET
							connection:"cl_writer"
						];
						//	info "writerres----" +writerRespObj  ;
						// ---- Upload file in Workdrive -----
						upload_workdrive = zoho.workdrive.uploadFile(writerRespObj,workdriveFolderID,combine_docName + ".pdf",false,"cl_workdrive");
						// 						info "workupl----" + upload_workdrive;
						//	upload_workdrive = {"":""};
						if(upload_workdrive != null)
						{
							//info "5" + upload_workdrive.get("data");
							if(upload_workdrive.get("data") != null)
							{
								//info "6" ;
								getTrailerQuoteInfo.Combined_Doc_Download_URL=upload_workdrive.get("data").get(0).get("attributes").get("Permalink");
								getTrailerQuoteInfo.Combined_Doc_Status_Check_On=null;
								permalink = upload_workdrive.get("data").get(0).get("attributes").get("Permalink");
								getTrailerQuoteInfo.Combined_Doc_Workdrive_URL=permalink;
								resource_id = permalink.getsuffix("file/");
								upload_map = Map();
								upload_map.put("resource_ID",resource_id);
								upload_map.put("recID",getTrailerQuoteInfo.Zoho_Crm_ID);
								get_fileuploadresponse = invokeurl
								[
									url :"https://www.zohoapis.com/crm/v2/functions/Quote_Attachment_Upload/actions/execute?auth_type=apikey&zapikey=1003.e22f3273bb04b81989500e60afe3e5d6.99dc1d6bafbf8dd22c72d8420f043dc3"
									type :GET
									parameters:upload_map
									connection:"zcrm"
								];
								// 								info get_fileuploadresponse;
								uploadresp_ZFS = get_fileuploadresponse.get("details").get("output").toMap();
								attach_id = uploadresp_ZFS.get("data").getJSON("details").get("id");
								if(attach_id != null && attach_id != "")
								{
									// 			info "attachement id" + attach_id ;
									//--------------------Get Email confiugration form
									fetchEmailConfig = Email_Configuration[Process == "Quotation Declaration"];
									subjectField = fetchEmailConfig.Subject_field.replaceAll("POLICYNO",getTrailerQuoteInfo.Policy_Number);
									toAddressData = fetchEmailConfig.Email_Data.replaceAll("CLIENTEMAIL",getTrailerQuoteInfo.Email);
									userName = getTrailerQuoteInfo.Insured_First_Name + getTrailerQuoteInfo.Insured_Last_Name;
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
									subjectField = Email_Configuration[Process == "NB - Trailer Quotation" && Add_Recipients_As == "To"].Subject_field;
									// --- To Data Map ---
									att_List = {{"id":attach_id}};
									tempalteID = CRM_Template_Configuration[Name == "NB - Trailer Declaration"].Template_ID;
									defaultList = List();
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
									CCList_Data = List();
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
									bcclist = List();
									if(bccEmail != null)
									{
										for each  bccRec in bccEmail.tolist()
										{
											bccRec = thisapp.General.emailFormation(bccRec.trim(),"Trailer",recID);
											bccMp = {"email":bccRec.trim()};
											bcclist.add(bccMp);
										}
									}
									defaultList.add({"email":"hariprema@cloudlion.org"});
									data = {{"from":{"email":zoho.adminuserid},"subject":subjectField,"to":defaultList,"cc":CCList_Data,"bcc":bcclist,"attachments":att_List,"template":{"id":tempalteID}}};
									json_data = Map();
									json_data.put("data",data);
									emailResp = invokeurl
									[
										url :"https://www.zohoapis.com/crm/v6/Deals/" + getTrailerQuoteInfo.Zoho_Crm_ID + "/actions/send_mail"
										type :POST
										parameters:json_data.tostring()
										connection:"zcrm"
									];
									// 									info emailResp;
									sendmail
									[
										from :zoho.adminuserid
										to :"vasanth.v@cloudlion.org"
										subject :"NB Trailer Declaration--" + recID
										message :"get_fileuploadresponse--" + get_fileuploadresponse + "--emailResp--" + emailResp
									]
								}
							}
						}
					}
					else
					{
						getTrailerQuoteInfo.Combined_Doc_Status_Check_On=zoho.currenttime.addSeconds(45);
					}
				}
				else
				{
					getTrailerQuoteInfo.Combined_Doc_Status_Check_On=null;
					// 					getTrailerQuoteInfo.Combined_Doc_Status_Check_On=zoho.currenttime.addSeconds(45);
				}
			}
		}
		thisapp.Developer.addActivityLog("Trailer_Doc_Status--" + recID.tostring(),"Function Call Ended and Record updated in webapp ","ID---" + recID,writerRespObj.tostring());
	}
	catch (e)
	{
		// 		info e;
		thisapp.Developer.addDeveloperLog("Trailer Quote","Trailer_Doc_Status:" + recID.tostring(),"Document Status Check",recID.tostring(),e,"creator");
	}
}