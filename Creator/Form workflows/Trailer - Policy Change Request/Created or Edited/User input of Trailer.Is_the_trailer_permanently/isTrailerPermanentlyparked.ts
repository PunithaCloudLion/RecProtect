if(row.Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground == "No")
	{
		if(row.Would_you_like_to_insure_a_golf_cart == "Yes")
		{
			if(row.Number_of_Golf_Cart != null && row.Number_of_Golf_Cart != "")
			{
				show row.Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2;
			}
			else
			{
				hide row.Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2;
				row.Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2="";
			}
		}
		else
		{
			row.Would_you_like_to_insure_a_golf_cart="";
			hide row.Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2;
			row.Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2="";
		}
		if(row.Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2 != "" && row.Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2 != null)
		{
			show row.Override_Preferred_Park_Discount;
		}
		else
		{
			hide row.Override_Preferred_Park_Discount;
			row.Override_Preferred_Park_Discount=null;
		}
		show row.Where_is_the_trailer_stored_while_not_in_use;
		show row.Is_the_trailer_taken_into_the_USA_for_more_than_180_days;
		hide row.Is_the_trailer_removed_from_the_park_in_the_off_season;
		row.Is_the_trailer_removed_from_the_park_in_the_off_season="";
		hide row.Please_provide_address_of_storage_location;
		row.Please_provide_address_of_storage_location="";
		hide row.Do_you_have_a_deck;
		row.Do_you_have_a_deck="";
		hide row.Do_you_have_a_screened_in_room_or_a_Florida_room;
		row.Do_you_have_a_screened_in_room_or_a_Florida_room="";
		hide row.Do_you_have_a_hard_awning;
		row.Do_you_have_a_hard_awning="";
		hide row.Would_you_like_to_insure_a_golf_cart;
		//row.Would_you_like_to_insure_a_golf_cart="";
		hide row.Park_Details;
		row.Park_Name="";
		row.Select_a_Park1=null;
		row.Address_Lines1="";
		row.City="";
		row.Province="";
		row.PostalCode="";
		row.Site_Number="";
	}
	else
	{
		hide row.Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2;
		row.Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2="";
		hide row.Where_is_the_trailer_stored_while_not_in_use;
		row.Where_is_the_trailer_stored_while_not_in_use="";
		hide row.Is_the_trailer_taken_into_the_USA_for_more_than_180_days;
		row.Is_the_trailer_taken_into_the_USA_for_more_than_180_days="";
		row.Referral_Is_the_trailer_taken_into_USA=false;
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
		//------------------Override Preferred Park Discount---------------
		// 	if ( row.Is_the_trailer_removed_from_the_park_in_the_off_season == "Yes" ) 
		//     {
		// 		show row.Override_Preferred_Park_Discount;
		// 		enable row.Override_Preferred_Park_Discount;
		//     }
		// 	else 
		//     {
		// 		hide row.Override_Preferred_Park_Discount;
		// 		row.Override_Preferred_Park_Discount=null;
		//     }
	}
	