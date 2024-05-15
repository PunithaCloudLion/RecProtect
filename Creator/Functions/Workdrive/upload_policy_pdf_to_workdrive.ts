void Workdrive.upload_policy_pdf_to_workdrive(string process, int policy_id)
{
	try 
	{
		thisapp.Developer.addActivityLog("Workdrive.upload_policy_pdf_to_workdrive -- " + policy_id.toString(),"Function START","","");
		if(input.process == "TrailerPolicy")
		{
			get_policy1 = TrailerQuote[ID == policy_id];
			workdrive = get_policy1.NB_Workdrive_Folder_Link.getsuffix("folder/");
			exporturl = Detail_Pages_Configuration[Report_Name == "Trailer Policy Report"].Export_URL;
			filename = get_policy1.Quote_ID + "_" + "NB_" + zoho.currenttime;
			filename = filename.replaceAll(" ","_").replaceAll(":","_").replaceAll("-","_");
			exporturl = exporturl.replaceAll("RECORDID",policy_id.toString());
		}
		else if(input.process == "BoatPolicy")
		{
			get_policy2 = BoatQuote[ID == policy_id];
			workdrive = get_policy2.NB_Workdrive_Folder_Link.getsuffix("folder/");
			exporturl = Detail_Pages_Configuration[Report_Name == "Boat Policy Report"].Export_URL;
			filename = get_policy2.Quote_ID + "_" + "NB_" + zoho.currenttime;
			filename = filename.replaceAll(" ","_").replaceAll(":","_").replaceAll("-","_");
			exporturl = exporturl.replaceAll("RECORDID",policy_id.toString());
		}
		else if(input.process == "TrailerPolicyChange")
		{
			get_policy3 = Trailer_Policy_Change_Request[ID == policy_id];
			workdrive = get_policy3.Policy_Change_Workdrive_Folder_Link.getsuffix("folder/");
			exporturl = Detail_Pages_Configuration[Report_Name == "Trailer - Policy Change Request"].Export_URL;
			filename = get_policy3.Quote_ID + "_" + "Policy Change_" + zoho.currenttime;
			filename = filename.replaceAll(" ","_").replaceAll(":","_").replaceAll("-","_");
			exporturl = exporturl.replaceAll("RECORDID",policy_id.toString());
		}
		else if(input.process == "BoatPolicyChange")
		{
			get_policy4 = Boat_Policy_change_Request[ID == policy_id];
			workdrive = get_policy4.Policy_Change_Workdrive_Folder_Link.getsuffix("folder/");
			exporturl = Detail_Pages_Configuration[Report_Name == "Boat - Policy change Request"].Export_URL;
			filename = get_policy4.Quote_ID + "_" + "Policy Change_" + zoho.currenttime;
			filename = filename.replaceAll(" ","_").replaceAll(":","_").replaceAll("-","_");
			exporturl = exporturl.replaceAll("RECORDID",policy_id.toString());
		}
		//------------------Downlaod PDF----------
		export_pdf = invokeurl
		[
			url :exporturl
			type :GET
		];
		// 		info export_pdf;
		//------------------Upload PDF to Workdrive----------	
		upload_response = zoho.workdrive.uploadFile(export_pdf,workdrive.toString(),filename + ".pdf",false,"cl_workdrive");
		info upload_response;
		thisapp.Developer.addActivityLog("Workdrive.upload_policy_pdf_to_workdrive -- " + policy_id.toString(),"Function Call END","","");
	}
	catch (e)
	{
		thisapp.Developer.addDeveloperLog("Workdrive.upload_policy_pdf_to_workdrive -- " + policy_id.toString(),"Upload New business documents in workdrive:" + policy_id.toString(),"Upload New business documents in workdrive","Form ---" + process + "Record--" + policy_id.toString(),e,"Creator");
	}
}