if(row.Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground == "No")
	{
		// 	if(row.Would_you_like_to_insure_a_golf_cart == true)
		// 	{
		// 		if(row.Number_of_Golf_Cart != null && row.Number_of_Golf_Cart != "")
		// 		{
		// 			//show row.Would_you_like_to_insure_a_golf_cart ;
		// 			//show row.Number_of_Golf_Cart ;
		// 			if(row.Number_of_Golf_Cart == "1")
		// 			{
		// 				show row.Value_of_Golf_Cart_1;
		// 			}
		// 			else
		// 			{
		// 				show row.Value_of_Golf_Cart_2;
		// 			}
		// 		}
		// 	}
		show row.Where_is_the_trailer_stored_while_not_in_use;
		show row.Is_the_trailer_taken_into_the_USA_for_more_than_180_days;
		hide row.Is_the_trailer_removed_from_the_park_in_the_off_season;
		hide row.Do_you_have_a_deck;
		hide row.Do_you_have_a_screened_in_room_or_a_Florida_room;
		hide row.Do_you_have_a_hard_awning;
		hide row.Would_you_like_to_insure_a_golf_cart;
		hide row.Park_Details;
	}
	else
	{
		hide row.Where_is_the_trailer_stored_while_not_in_use;
		hide row.Is_the_trailer_taken_into_the_USA_for_more_than_180_days;
		show row.Is_the_trailer_removed_from_the_park_in_the_off_season;
		show row.Do_you_have_a_deck;
		show row.Do_you_have_a_screened_in_room_or_a_Florida_room;
		show row.Do_you_have_a_hard_awning;
		show row.Would_you_like_to_insure_a_golf_cart;
		show row.Address_Lines1;
		show row.City;
		show row.Province;
		show row.PostalCode;
		show row.Site_Number;
		show row.Park_Details;
		// 	fetchParkName = Preffered_Parks[ID != null].Preffered_Park_Name.getAll();
		// 	row.Select_a_Park:ui.add(fetchParkName);
	}
	