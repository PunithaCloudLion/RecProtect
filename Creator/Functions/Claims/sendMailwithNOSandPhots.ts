void Claims.sendMailwithNOSandPhots(int ClaimID)
{
	getClaims = Claims[ID == ClaimID];
	policyCreatorID = getClaims.Creator_Policy_ID;
	info "policyCreatorID" + policyCreatorID;
	if(getClaims.Type_of_Policy == "Property - Boat")
	{
		info "Boat";
		getDealFromCreator = BoatQuote[ID == policyCreatorID.toLong()];
	}
	else if(getClaims.Type_of_Policy == "Property - Trailer")
	{
		info "trailer";
		getDealFromCreator = TrailerQuote[ID == policyCreatorID.toLong()];
	}
	info "getDealFromCreator " + getDealFromCreator;
	imgList = List();
	// 	if(getClaims.Type_of_Policy != "Property - Boat")
	// 	{
	if(getDealFromCreator.Combined_Doc_Workdrive_URL != "" && getDealFromCreator.Combined_Doc_Workdrive_URL != null)
	{
		count = 0;
		//	info "URL " + getDealFromCreator.Combined_Doc_Workdrive_URL;
		getPolicyDec = getDealFromCreator.Combined_Doc_Workdrive_URL;
		resource_id = getPolicyDec.getsuffix("file/");
		//Policy Declaration get from Workdrive
		getPolicy_Doc = invokeurl
		[
			url :"https://download.zoho.com/v1/workdrive/download/" + resource_id
			type :GET
			connection:"cl_workdrive"
		];
		// 			info getPolicy_Doc;
		imgList.add(getPolicy_Doc);
	}
	//	}
	for each  rec in getClaims.Claim_Loss_Damage_Photos
	{
		tet = rec.Loss_Damage_Photos.getsuffix("image/");
		//test = tet.getsuffix("_");
		image_name = tet.getprefix("\"");
		//	info image_name;
		getImage = invokeurl
		[
			url :"https://creatorapp.zohopublic.com/file" + zoho.appuri + "All_Claim_Files/" + rec.ID + "/Loss_Damage_Photos/image-download/Wb3e7rvCqWffu6kP2WkrmdX822QUa5bGUyS9UUa1nzJ53TpFJQzf6T9CpQT9d9kRGMZXQhRxv84maE2dyDUOWvrTCg2V4fFnhrrj?filepath=/" + image_name
			type :GET
		];
		//info getImage;
		imgList.add(getImage);
	}
	getNOS = thisapp.Claims.writerNOSupdate(getClaims.ID);
	docURL = getNOS.tostring();
	getNOS_Doc = invokeurl
	[
		url :docURL
		type :GET
		connection:"cl_writer"
	];
	//info getNOS_Doc;
	imgList.add(getNOS_Doc);
	Doc_Name = getClaims.Policy_Number + " - NOL.pdf";
	uploadFile = zoho.workdrive.uploadFile(getNOS_Doc,getClaims.Workdrive_Folder_ID,Doc_Name,true,"cl_workdrive");
	//	info uploadFile;
	// 	info "imgList " + imgList;
	// 	getTemplateCRM = invokeurl
	// 		[
	// 			url :"https://www.zohoapis.com/crm/v6/settings/email_templates/5778486000016852005"
	// 			type :GET
	// 			connection:"zcrm"
	// 		];
	// 			//info getTemplateCRM;
	// 		modifiedContent = getTemplateCRM.get("email_templates").get(0).get("content").replaceAll("#SERVICE REP NAME#",getClaims.Agent_Broker).replaceAll("#CONTACT NAME#",getClaims.Contact_Name).replaceAll("#POLICY NUMBER#",getClaims.Policy_Number);
	// 			modifiedSubject = getTemplateCRM.get("email_templates").get(0).get("subject");
	// 			//info modifiedContent;
	// 			//,"template":{"id":"4516886000014770109"}
	// 			info "Deal ID " + getClaims.Deal_Name.toLong();
	// 			data = {{"from":{"email":zoho.adminuserid},"to":{{"email":"ananth@cloudlion.org"}},"subject":modifiedSubject,"content":modifiedContent,"mail_format":"html","attachments":imgList}};
	// 			json_data = Map();
	// 			json_data.put("data",data);
	// 			send_mail = invokeurl
	// 			[
	// 				url :"https://www.zohoapis.com/crm/v3/Deals/" + getClaims.Deal_Name.toLong() + "/actions/send_mail"
	// 				type :POST
	// 				content-type: application/json
	// 				parameters:json_data
	// 				connection:"zcrm"
	// 			];
	// 			info send_mail;{"code":"INVALID_DATA","details":{"expected_data_type":"jsonobject"},"message":"body","status":"error"}
	//to :"morgan@recprotect.ca"
	//	cc:"service@recprotect.ca"
	getEmailTemp = Email_Templates[Title == "NOL Update to Claims Team"];
	subContent = getEmailTemp.Subject_field.replaceAll("#CONATCT NAME#",getClaims.Contact_Name).replaceAll("#POLICY NUMBER#",getClaims.Policy_Number);
	sendmail
	[
		from :zoho.adminuserid
		to :"logan@recprotect.ca"
		cc:"service@recprotect.ca"
		subject :subContent
		message :getEmailTemp.Mail_Content
		Attachments :file:imgList
	]
}