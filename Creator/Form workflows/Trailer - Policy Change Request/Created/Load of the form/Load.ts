//--------------------Assign Deal Owner-----------------------
input.Deal_Owner = Zoho_CRM_User[Email == zoho.loginuserid].ID;
//-------------ENd------------------------------------
hide Sales_Date;
hide Bind_Date;
input.Created_Source = "CREATOR";
input.Organization_ID = thisapp.Server_Side.org_info();
input.Inception_Date = zoho.currentdate;
hide Payment;
hide Additional_Names;
disable Quote_ID;
input.Deal_Type = "Quote";
fetchState = State_and_Province[ID != null].State_Province.getAll();
input.Please_select_the_province_your_trailer_is_located_in:ui.add(fetchState);
hide Renewal;
fetchEndPoint = API_Configuration[Name_Process == "Trailer Sync to Webapp - Create"];
urlValue = fetchEndPoint.End_Point;
reqParam = {"organization_id":thisapp.Server_Side.org_info(),"created_source":"CREATOR"};
response = thisapp.Server_Side.callServer("POST",urlValue,reqParam);
// alert response;
if(response.toMap().get("success") == true)
{
	input.Quote_ID = response.toMap().get("data").get("quote").get("quote_id");
	input.Quote_Record_ID_Server = response.toMap().get("data").get("quote").get("quote_record_id");
	input.Quote_Access_URL = response.toMap().get("data").get("quote").get("quote_access_url");
}
