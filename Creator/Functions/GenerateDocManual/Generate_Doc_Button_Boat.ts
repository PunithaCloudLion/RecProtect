void GenerateDocManual.Generate_Doc_Button_Boat(int recID)
{
	try 
	{
		thisapp.Developer.addActivityLog("Generate Doc Button - Boat_Policy(GenerateDocManual.Generate_Doc_Button_Boat) --- " + recID,"Function Call Start","ID","null");
		getBoatQuoteInfo = BoatQuote[ID == input.recID];
		if(getBoatQuoteInfo.count() > 0)
		{
			workdriveFolderID = getBoatQuoteInfo.NB_Workdrive_Folder_Link;
			combine_docName = getBoatQuoteInfo.Policy_Number + " - Policy Declaration";
			if(getBoatQuoteInfo.Policy_Number != "" && getBoatQuoteInfo.Policy_Number != null)
			{
				Policy_Number = getBoatQuoteInfo.Policy_Number;
			}
			if(workdriveFolderID != "" && workdriveFolderID != null)
			{
				Contact_Workdrive_FolderID = workdriveFolderID.getsuffix("folder/");
			}
			if(getBoatQuoteInfo.Combined_Doc_Response != "" && getBoatQuoteInfo.Combined_Doc_Response != null)
			{
				Combined_Doc_Response = getBoatQuoteInfo.Combined_Doc_Response;
			}
			emailList = List();
			if(getBoatQuoteInfo.Boat_Document_Information != null)
			{
				for each  documentInfo in getBoatQuoteInfo.Boat_Document_Information
				{
					if(documentInfo.Document_Type.Document_Type == "Combined Document")
					{
						getBoatQuoteInfo.Combined_Document_Process="Manualy Regenerated";
						thisapp.Combine_Document.Boat_Policy(input.recID);
					}
					// 				else
					// 				{
					// 					if(documentInfo.Document_Type.Document_Type == "Receipt Document")
					// 					{
					// 						receipturl = Record_Template_Configuration[Name == "Boat - Receipt Template"].URL.replaceAll("CREATORRECID",getBoatQuoteInfo.ID.toString());
					// 						reciptorTempName = "Receipt Document";
					// 					}
					// 					else if(documentInfo.Document_Type.Document_Type == "Application Document")
					// 					{
					// 						receipturl = Record_Template_Configuration[Name == "Boat - Application Download"].URL.replaceAll("CREATORRECID",getBoatQuoteInfo.ID.toString());
					// 						reciptorTempName = "Application Document";
					// 					}
					// 					tempOrpageObj = invokeurl
					// 					[
					// 						url :receipturl
					// 						type :GET
					// 					];
					// 					uploadResponse = zoho.workdrive.uploadFile(tempOrpageObj,Contact_Workdrive_FolderID,reciptorTempName + ".pdf",true,"cl_workdrive");
					// 					thisapp.Developer.addActivityLog("Generate Doc Button - Boat_Policy(GenerateDocManual.Generate_Doc_Button_Boat) ---" + recID,"Upload Other File in Workdrive API Call Response -- " + reciptorTempName,"",uploadResponse.toString());
					// 				}
				}
			}
			else
			{
				thisapp.Developer.addActivityLog("Generate Doc Button - Boat_Policy(GenerateDocManual.Generate_Doc_Button_Boat) --- " + recID,"Empty Subform Scenarion Called","ID","null");
				thisapp.Combine_Document.Boat_Policy(input.recID);
			}
		}
		thisapp.Developer.addActivityLog("Generate Doc Button - Boat_Policy(GenerateDocManual.Generate_Doc_Button_Boat) --- " + recID,"Function Call Ends","ID","null");
	}
	catch (e)
	{
		//		info e;
		thisapp.Developer.addDeveloperLog("Boat Quote","Boat - Generate Doc Button (GenerateDocManual.Generate_Doc_Button_Boat)--" + recID.toString(),"Generate Doc Button Error Response","",e,"creator");
	}
}