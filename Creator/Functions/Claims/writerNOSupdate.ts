string Claims.writerNOSupdate(int id)
{
	get_Claims = Claims[ID == id];
	//info get_Claims.Time_of_Call;
	if(get_Claims.count() > 0)
	{
		// 										getAllFieldsResponse = invokeurl
		// 										[
		// 											url :"https://writer.zoho.com/api/v1/documents/cv1ah5932db56746f4a5e8be42b99785701e2/fields"
		// 											type :GET
		// 											connection:"cl_writer"
		// 										];
		// 						 		info getAllFieldsResponse;
		dataMap = Map();
		dataMap.put("4564627000001056498",get_Claims.Policy_Number);
		dataMap.put("4564627000001056506",get_Claims.Claims_Number);
		dataMap.put("4564627000001257977",get_Claims.Policy_Effective_Date);
		dataMap.put("4564627000001257985",get_Claims.Policy_Expiry_Date);
		dataMap.put("4564627000001163025",get_Claims.Loss_Date);
		dataMap.put("4564627000001262001",get_Claims.Kind_of_Loss);
		dataMap.put("4564627000001262009",get_Claims.Name_of_Agent_Broker);
		//	dataMap.put("4564627000001262017",get_Claims.Code);
		dataMap.put("4564627000001244225",get_Claims.Phone_Number2);
		dataMap.put("4564627000001262031",get_Claims.Fax);
		dataMap.put("4564627000001268255",get_Claims.Insured_Name);
		dataMap.put("4564627000001244193",get_Claims.Insurer_name);
		dataMap.put("4564627000001265323",get_Claims.Address_Line1);
		dataMap.put("4564627000001265339",get_Claims.City);
		dataMap.put("4564627000001265347",get_Claims.State);
		dataMap.put("4564627000001265363",get_Claims.Country);
		dataMap.put("4564627000001265355",get_Claims.ZIP_Code);
		dataMap.put("4564627000001163063",get_Claims.Confirm_best_contact_phone_number);
		dataMap.put("4564627000001070011",get_Claims.Email);
		dataMap.put("4564627000001262059",get_Claims.Person_to_Contact);
		dataMap.put("4564627000001262191",get_Claims.Claim_Received_Via);
		dataMap.put("4564627000001262067",get_Claims.Residence_Phone);
		dataMap.put("4564627000001262077",get_Claims.Business_Phone);
		dataMap.put("4564627000001262089",get_Claims.Type_of_Policy);
		dataMap.put("4564627000001262103",get_Claims.Coverage);
		dataMap.put("4564627000001262135",get_Claims.Limit_Sums_insured);
		dataMap.put("4564627000001262143",get_Claims.Deductible);
		dataMap.put("4564627000001262151",get_Claims.Other);
		dataMap.put("4564627000001262159",get_Claims.Lienholder_Mortgage_Other_insurance);
		dataMap.put("4564627000001163033",get_Claims.Loss_Accident_Location);
		dataMap.put("4564627000001262119",get_Claims.Name_Badge_No);
		dataMap.put("4564627000001262111",get_Claims.Division);
		dataMap.put("4564627000001262127",get_Claims.Charges_Laid);
		dataMap.put("4564627000001163041",get_Claims.Description_of_Loss_Damage);
		dataMap.put("4564627000001244161",get_Claims.Third_Party_Name);
		dataMap.put("4564627000001244201",get_Claims.Additional_information);
		dataMap.put("4564627000001262199",get_Claims.Name_of_Caller);
		dataMap.put("4564627000001262207",get_Claims.Taken_By);
		dataMap.put("4564627000001262215",get_Claims.Date_field);
		dataMap.put("4564627000001262223",get_Claims.Adjuster);
		dataMap.put("4564627000001262231",get_Claims.Phone_Number2);
		dataMap.put("4564627000001262241",get_Claims.Adjuster_s_Claim_No);
		dataMap.put("4564627000001265480",get_Claims.Street);
		dataMap.put("4564627000001265488",get_Claims.City1);
		dataMap.put("4564627000001265496",get_Claims.State1);
		dataMap.put("4564627000001265504",get_Claims.Country1);
		dataMap.put("4564627000001265512",get_Claims.Zip_Code1);
		dataMap.put("4564627000001163049",get_Claims.Was_a_police_report_filed_applicable_to_theft_vandalism);
		dataMap.put("4564627000001244177",get_Claims.Drivers_License);
		dataMap.put("4564627000001244185",get_Claims.Vehicle_Year_Make_Model);
		dataMap.put("4564627000001244209",get_Claims.Plate);
		dataMap.put("4564627000001244217",get_Claims.Policy_Claim);
		if(get_Claims.Time_of_Call != null)
		{
			if(get_Claims.Time_of_Call.getHour() >= 12)
			{
				get_Time_call = get_Claims.Time_of_Call.toString() + " PM";
			}
			else
			{
				get_Time_call = get_Claims.Time_of_Call.toString() + " AM";
			}
		}
		if(get_Claims.Time_of_Loss != null)
		{
			if(get_Claims.Time_of_Loss.getHour() >= 12)
			{
				get_Time_loss = get_Claims.Time_of_Loss.toString() + " PM";
			}
			else
			{
				get_Time_loss = get_Claims.Time_of_Loss.toString() + " AM";
			}
		}
		dataMap.put("4564627000001268265",get_Time_call);
		dataMap.put("4564627000001265255",get_Time_loss);
		//-------------------------------------------------------
		param = Map();
		// 		param.put("message","Reg Invoice \n Please find your invoice attached.");
		// 		param.put("subject","Invoice Data");
		param.put("merge_data",{"data":dataMap});
		param.put("output_format","pdf");
		param.put("response_type","link");
		param.put("filename",get_Claims.Policy_Number + " - NOL");
		// 		param.put("recipient_email","ananth@cloudlion.org");
		// param.put("cc_email", "john@zylker.com"); 
		// param.put("bcc_email", "kim@zylker.com"); 
		// param.put("from_email", "jackson@zylker.com");  
		// param.put("password","test"); 
		//Merge and Send Mail
		// 		var = invokeurl
		// 		[
		// 			url :"https://www.zohoapis.com/writer/api/v1/documents/cv1ah5932db56746f4a5e8be42b99785701e2/merge/email"
		// 			type :post
		// 			parameters:param
		// 			connection:"cl_writer"
		// 		];
		// 		info var;
		//Merge Only
		response = invokeurl
		[
			url :"https://www.zohoapis.com/writer/api/v1/documents/cv1ah5932db56746f4a5e8be42b99785701e2/merge"
			type :POST
			parameters:param
			connection:"cl_writer"
		];
		//	info response;
		//get_Claims.Vehicle_Year_Make_Model
		//get_Claims.Drivers_License
		// 	response = zoho.writer.getMergeFields("cv1ah5932db56746f4a5e8be42b99785701e2", "cl_writer");
		// 	info response;
		// 	}
		// 	
		// 	info response;
		// 	 json_text = {"\"data\":[{\"Policy Number\":\"REC3030\"]"};
		// 	dataMap = Map();
		// 	dataMap.put("Policy Number","REC3030");
		// 	dataList = List();
		// 	dataList.add(dataMap);
		// 	json_text = Map();
		// 	json_text.put("data",dataList);
		// 	// Construct a KEY-VALUE variable to hold the merge data and subject of the email
		// 		merge_values = Map();
		// 		merge_values.put("subject","Merge and send Deluge task");
		// 	 	merge_values.put("merge_data",dataMap);
		// 	// Perform the Merge and Send task 
		//	response = zoho.writer.mergeAndSend("cv1ah5932db56746f4a5e8be42b99785701e2","inline","vivek.v@cloudlion.org",merge_values,"cl_writer");
		//	info response;
		msg = response.get("URL");
	}
	else
	{
		msg = "";
	}
	return msg;
}