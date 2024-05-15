if(row.Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground == "No")
	{
		alert "You cannot change the Park Deatils";
	}
	if(row.Select_a_Park != "" && row.Select_a_Park != null)
	{
		fetch_ParkNameValue = Preffered_Parks[Preffered_Park_Name == row.Select_a_Park];
		row.Park_Name=fetch_ParkNameValue.Preffered_Park_Name;
		row.Address_Lines1=fetch_ParkNameValue.Address;
		row.City=fetch_ParkNameValue.City;
		row.Province=fetch_ParkNameValue.Province;
		row.PostalCode=fetch_ParkNameValue.Postal_Code;
	}
	else
	{
		row.Park_Name="";
		row.Address_Lines1="";
		row.City="";
		row.Province="";
		row.PostalCode="";
	}
	