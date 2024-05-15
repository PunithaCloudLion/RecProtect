// if(row.Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground == "No")
// {
// 	alert "You cannot change the Park Deatils";
// }
if(row.Select_a_Park1 != null)
	{
		show row.Address_Lines1;
		show row.City;
		show row.Province;
		show row.PostalCode;
		fetchPark = Preffered_Parks[ID == row.Select_a_Park1];
		if(fetchPark.count() > 0)
		{
			if(fetchPark.Preffered_Park_Name != "Other")
			{
				hide row.Park_Name;
				row.Park_Name=fetchPark.Preffered_Park_Name;
				row.Address_Lines1=fetchPark.Address;
				row.City=fetchPark.City;
				row.Province=fetchPark.Province;
				row.PostalCode=fetchPark.Postal_Code;
				disable row.Address_Lines1;
				disable row.City;
				disable row.Province;
				disable row.PostalCode;
			}
			else
			{
				show row.Park_Name;
				show row.Site_Number;
				row.Park_Name="";
				row.Address_Lines1="";
				row.City="";
				row.Province="";
				row.PostalCode="";
				row.Site_Number="";
				enable row.Park_Name;
				enable row.Address_Lines1;
				enable row.City;
				enable row.Province;
				enable row.PostalCode;
				//enable row. ;
			}
		}
	}
	else
	{
		hide row.Address_Lines1;
		hide row.City;
		hide row.Province;
		hide row.PostalCode;
		hide row.Site_Number;
		hide row.Park_Name;
		row.City="";
		row.Province="";
		row.PostalCode="";
		row.Site_Number="";
		row.Park_Name="";
	}
	