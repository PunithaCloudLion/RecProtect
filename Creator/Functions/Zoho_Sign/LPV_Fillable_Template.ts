void Zoho_Sign.LPV_Fillable_Template(int policy_id)
{
	policy_cancellation = Cancellation[ID == policy_id];
	actionMap = Map();
	//-------------Text Map------------------
	fieldTextData = Map();
	CustomerName = "";
	CustomerName = policy_cancellation.Insured_Contact_Name.First_Name + " " + policy_cancellation.Insured_Contact_Name.Last_Name;
	if(policy_cancellation.Additional_Insured_Name1 != null)
	{
		CustomerName = CustomerName + " , " + policy_cancellation.Additional_Insured_Name1.First_Name + " " + policy_cancellation.Additional_Insured_Name1.Last_Name;
	}
	if(policy_cancellation.Additional_Insured_Name2 != null)
	{
		CustomerName = CustomerName + " , " + policy_cancellation.Additional_Insured_Name2.First_Name + " " + policy_cancellation.Additional_Insured_Name2.Last_Name;
	}
	fieldTextData.put("Customer Name",CustomerName);
	fieldTextData.put("Carrier",policy_cancellation.Carrier);
	fieldTextData.put("Policy Number",policy_cancellation.Policy_Number);
	fieldTextData.put("Customer Name 2",CustomerName);
	fieldTextData.put("Carrier 2",policy_cancellation.Carrier);
	fieldTextData.put("Customer First and Last Name",policy_cancellation.Insured_Contact_Name.First_Name + " " + policy_cancellation.Insured_Contact_Name.Last_Name);
	fieldTextData.put("Reason for Cancellation",policy_cancellation.Reason_for_Cancellation);
	fieldTextData.put("Current Date",zoho.currentdate.toString("dd MMMM yyyy"));
	//-------------Date Map------------------
	fieldDateData = Map();
	fieldDateData.put("Cancellation Date",policy_cancellation.Cancellation_Date.toString("dd MMMM yyyy"));
	actionMap.put("request_name","LPV-" + policy_cancellation.Insured_Contact_Name.Last_Name + "/" + policy_cancellation.Policy_Number);
	actionMap.put("field_data",{"field_text_data":fieldTextData,"field_date_data":fieldDateData});
	eachActionMap1 = Map();
	eachActionMap1.put("recipient_name",policy_cancellation.Insured_Contact_Name.First_Name + " " + policy_cancellation.Insured_Contact_Name.Last_Name);
	eachActionMap1.put("recipient_email",policy_cancellation.Email_of_Insured);
	eachActionMap1.put("action_type","SIGN");
	eachActionMap1.put("action_id","370010000000030050");
	eachActionMap1.put("verify_recipient","false");
	fieldList = List();
	fieldList.add(eachActionMap1);
	actionMap.put("actions",fieldList);
	submitMap = Map();
	submitMap.put("templates",actionMap);
	parameters = Map();
	parameters.put("is_quicksend","true");
	parameters.put("data",submitMap);
	response = zoho.sign.createUsingTemplate(370010000000030001,parameters);
	//info response;
	if(response.get("code") == 0)
	{
		resp = insert into Zoho_Sign_Signature_Track
		[
			Added_User=zoho.loginuser
			Templates_Used="LPV"
			Request_Status=response.get("requests").get("request_status")
			Action_Status=response.get("requests").get("actions").get(0).get("action_status")
			Recipient_Email=response.get("requests").get("actions").get(0).get("recipient_email")
			Document_Name=response.get("requests").get("request_name")
			Request_Id=response.get("requests").get("request_id")
			Document_ID=response.get("requests").get("document_ids").get(0).get("document_id")
			Cancellation_ID=policy_cancellation.ID.toString()
		];
	}
}