if(row.Is_the_trailer_removed_from_the_park_in_the_off_season == "Yes")
	{
		show row.Please_provide_address_of_storage_location;
	}
	else
	{
		hide row.Please_provide_address_of_storage_location;
		row.Please_provide_address_of_storage_location="";
	}
	