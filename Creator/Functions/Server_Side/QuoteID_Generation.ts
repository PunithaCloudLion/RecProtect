string Server_Side.QuoteID_Generation(string quoteFor)
{
	try 
	{
		newID = "";
		if(quoteFor == "Boat")
		{
			fetchEndPoint = API_Configuration[Name_Process == "Boat Sync to Webapp - Create"];
			urlValue = fetchEndPoint.End_Point;
			//info urlValue;
			//urlValue = "https://insurance.theclsolutions.ca/recprotect/api/boat/create_boat_quote";
		}
		else
		{
			fetchEndPoint = API_Configuration[Name_Process == "Trailer Sync to Webapp - Create"];
			urlValue = fetchEndPoint.End_Point;
			// 			urlValue = "https://recprotectbackend-10073292108.development.catalystappsail.com/recprotect/api/trailer/create_trailer_quote";
		}
		reqParam = {"organization_id":"RECPROTECT1","created_source":"CREATOR"};
		response = thisapp.Server_Side.callServer("POST",urlValue,reqParam);
		if(response.toMap().get("success") == true)
		{
			if(response.toMap().get("data").get("quote") != null)
			{
				newID = response.toMap().get("data").get("quote").get("quote_id");
			}
			else
			{
				newID = response.toMap().get("data").get("quote_id");
			}
		}
		thisapp.Developer.addActivityLog("QuoteID_Generation--" + quoteFor.tostring(),"Function Call Ended and generate quote ID in webapp ","ID-",newID.tostring());
	}
	catch (e)
	{
		thisapp.Developer.addDeveloperLog("Both Quote forms","QuoteID_Generation:" + quoteFor.tostring(),"generate quote ID in webapp",quoteFor.tostring(),e,"creator");
	}
	return newID;
}