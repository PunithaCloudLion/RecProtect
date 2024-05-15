//--------------------Assign Deal Owner-----------------------
input.Deal_Owner = Zoho_CRM_User[Email == zoho.loginuserid].ID;
//-------------ENd------------------------------------
// input.Is_This_Test_Policy = false;
input.Created_Source = "CREATOR";
input.Organization_ID_Server = thisapp.Server_Side.org_info();
input.Inception_Date = zoho.currentdate;
hide Additional_Names;
hide Name;
hide Name_of_Dealership;
hide Name_of_Campground;
hide Name_of_Marina;
hide Tell_us_more;
//disable Boat.Select_coverage_for_policy;
// hide Where_Did_You_Find_Us;
//hide Additional_Names.Customer_ID;
hide Boat.How_many_motor_vehicle_claims;
hide Boat.How_many_motor_vehicle_convictions;
hide Boat.Tell_us_more;
hide Boat.Trailer_Value;
hide Boat.Trailer_Length;
hide Boat.Trailer_Manufacturer;
hide Boat.Trailer_Model_Year;
hide Boat.Trailer_VIN;
hide Boat.Tender_Value;
hide Boat.Tender_Model_Year;
hide Boat.Tender_Serial;
hide Boat.Tender_Manufacturer;
hide Boat.Tender_Length;
hide Boat.Aux_Engine_Model_Year;
hide Boat.Aux_Engine_HP_Thrust;
hide Boat.Aux_Engine_Value;
hide Boat.Auxiliary_Engine_Serial;
hide Boat.Aux_Engine_Manufacturer;
hide Boat.Other_Hull_Type;
hide Boat.Enter_the_type;
hide Boat.Enter_the_type1;
hide Boat.Replacement_Cost;
// hide Boat.Boat_Base_Premium ;
// 	hide Boat.Boat_Liability_Prem ;
// 	hide Boat.Boat_Operator_age_20_25_prem ;
// 	hide Boat.Boat_age_gt_15_prem ;
// 	hide Boat.Boat_operator_gt_25_lt_3years_exp_prem ;
// 	hide Boat.Deductible_Prem ;
// 	hide Boat.Navi_eqip_prem ;
// 	hide Boat.Pers_eff_prem ;
// 	hide Boat.Endorsement_prem ;
// 	hide Boat.Total_Prem ;
fetchState = State_and_Province[ID != null].State_Province.getAll();
input.Please_select_the_province_your_boat_is_used_in:ui.add(fetchState);
hide Unused_Fields;
hide Developer_Section;
disable Quote_ID;
//hide renewal Information in boat subform
// hide Boat.Renewal_Information;
//-------------------------------------------------------------
// input.Quote_ID = thisapp.Server_Side.QuoteID_Generation("Boat");
fetchEndPoint = API_Configuration[Name_Process == "Boat Sync to Webapp - Create"];
urlValue = fetchEndPoint.End_Point;
reqParam = {"organization_id":"RECPROTECT1","created_source":"CREATOR"};
response = thisapp.Server_Side.callServer("POST",urlValue,reqParam);
if(response.toMap().get("success") == true)
{
	input.Quote_ID = response.toMap().get("data").get("quote").get("quote_id");
	input.Quote_Record_ID_Server = response.toMap().get("data").get("quote").get("quote_record_id");
	input.Quote_Access_URL1 = response.toMap().get("data").get("quote").get("quote_access_url");
}
input.Deal_Type = "Quote";
if(input.Quote_Status == "Referral")
{
	for each  trailerSubform in input.Boat
	{
		show Boat.Underwritting_Approved;
	}
	//show row.Underwritting_Approved;
}
else
{
	for each  trailerSubform in input.Boat
	{
		hide Boat.Underwritting_Approved;
		input.Boat.Underwritting_Approved = null;
	}
}
/*hide Basic_Info;
hide Customer_Information;
hide General;
hide Boat;
hide Additional_Names;
hide Policy_Details;
hide Terms;
hide Payment;
hide Boat1;
if(input.Section_Type == "Get Started")
{
	show Basic_Info;
	show Customer_Information;
}*/
// hide fields based on Buy Now
hide Boat_Document_Information;
hide Document_Generation_Section;
hide Adjusted_Premium;
hide Transaction_History;
// else 
// {
// 	show Boat_Document_Information;
// 	show Document_Generation_Section;
// 	show Adjusted_Premium;
// 	show Transaction_History; 
// }
//hide override percentage based on override admin
