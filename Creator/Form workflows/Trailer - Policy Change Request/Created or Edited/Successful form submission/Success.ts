if(input.Trailer != null)
	{
		for each  trailerSub in input.Trailer
		{
			if(trailerSub.Select_a_Park1 == null)
			{
				fetchPark = Preffered_Parks[Preffered_Park_Name == trailerSub.Park_Name];
				if(fetchPark.count() > 0)
				{
					trailerSub.Select_a_Park1=fetchPark.ID;
				}
				else
				{
					fetchPark = Preffered_Parks[Preffered_Park_Name == "Other"];
					trailerSub.Select_a_Park1=fetchPark.ID;
				}
			}
			if(trailerSub.Lein_holder == null)
			{
				fetchLein = Lein_holder_Details[Name_of_Financier == trailerSub.Name_of_Financier];
				if(fetchLein.count() > 0)
				{
					trailerSub.Lein_holder=fetchLein.ID;
				}
				else
				{
					fetchLein = Lein_holder_Details[Name_of_Financier == trailerSub.Name_of_Financier];
					trailerSub.Lein_holder=fetchLein.ID;
				}
			}
		}
	}
	if(input.Inception_Date == null)
	{
		input.Expiry_Date = null;
	}
	if(input.Save_as_Draft == false && input.Quote_Status == "Saved")
	{
		input.Quote_Status = "In Progress";
	}
	input.Last_Modified_Date = zoho.currentdate;
	