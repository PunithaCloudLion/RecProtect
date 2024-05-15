if(row.Select_Trailer_Type == "Park Model/Destination Trailer")
	{
		show row.Trailer_Width;
		if(row.Select_coverage_for_policy == "Replacement Value Coverage")
		{
			hide row.ACV_Exceeding_Limits_UW_Approved;
			row.ACV_Exceeding_Limits_UW_Approved=null;
			row.Referral_Actual_cash_value=false;
			if(row.Replacement_Cost < 25000 || row.Replacement_Cost > 375000)
			{
				// 		if(row.RCV_Exceeding_Limits_UW_Approved == false)
				// 		{
				alert "This choice triggers a referral";
				// 		}
				// 		row.Referral_Replacement_cost=true;
				row.Referral_Replacement_cost=if(row.RCV_Exceeding_Limits_UW_Approved == true,false,true);
				enable row.RCV_Exceeding_Limits_UW_Approved;
				show row.RCV_Exceeding_Limits_UW_Approved;
			}
			else
			{
				row.Referral_Replacement_cost=false;
				row.RCV_Exceeding_Limits_UW_Approved=null;
				hide row.RCV_Exceeding_Limits_UW_Approved;
				disable row.RCV_Exceeding_Limits_UW_Approved;
			}
		}
		if(row.Select_coverage_for_policy == "Current Market Value Coverage")
		{
			hide row.RCV_Exceeding_Limits_UW_Approved;
			row.RCV_Exceeding_Limits_UW_Approved=null;
			row.Referral_Replacement_cost=false;
			if(row.Actual_Cash_Value < 25000 || row.Actual_Cash_Value > 375000)
			{
				// 		if(row.ACV_Exceeding_Limits_UW_Approved == false)
				// 		{
				alert "This choice triggers a referral";
				// 		}
				// 		row.Referral_Actual_cash_value=true;
				row.Referral_Actual_cash_value=if(row.ACV_Exceeding_Limits_UW_Approved == true,false,true);
				show row.ACV_Exceeding_Limits_UW_Approved;
				enable row.ACV_Exceeding_Limits_UW_Approved;
			}
			else
			{
				row.Referral_Actual_cash_value=false;
				row.ACV_Exceeding_Limits_UW_Approved=null;
				hide row.ACV_Exceeding_Limits_UW_Approved;
				disable row.ACV_Exceeding_Limits_UW_Approved;
			}
		}
		if(row.Trailer_Model_Year != null && row.Trailer_Model_Year != "")
		{
			currentYear = zoho.currentdate.getYear();
			yearsBetween = currentYear - row.Trailer_Model_Year.toLong();
			if(yearsBetween < 25)
			{
				row.Coverage_Type="All Risk";
			}
			else
			{
				row.Coverage_Type="Named Perils";
			}
			if(yearsBetween <= 15)
			{
				rowalue = {"Current Market Value Coverage","Replacement Value Coverage"};
				row.Select_coverage_for_policy:ui.add(rowalue);
			}
			else
			{
				row.Select_coverage_for_policy:ui.add("Current Market Value Coverage");
			}
		}
		if(row.Do_you_have_a_deck == "Yes")
		{
			show row.Deck_Width;
			show row.Deck_Length;
		}
		else
		{
			hide row.Deck_Width;
			hide row.Deck_Length;
			row.Deck_Length=null;
			row.Deck_Width=null;
		}
		if(row.Do_you_have_a_screened_in_room_or_a_Florida_room == "Yes")
		{
			show row.Screened_in_room_or_Florida_room_Length;
			show row.Screened_in_room_or_Florida_room_Width;
		}
		else
		{
			hide row.Screened_in_room_or_Florida_room_Length;
			hide row.Screened_in_room_or_Florida_room_Width;
			row.Screened_in_room_or_Florida_room_Length=null;
			row.Screened_in_room_or_Florida_room_Width=null;
		}
		if(row.Do_you_have_a_hard_awning == "Yes")
		{
			show row.Hard_Awning_Length;
			show row.Hard_Awning_Width;
		}
		else
		{
			hide row.Hard_Awning_Length;
			hide row.Hard_Awning_Width;
			row.Hard_Awning_Length=null;
			row.Hard_Awning_Width=null;
		}
		show row.Do_you_have_a_deck;
		show row.Do_you_have_a_screened_in_room_or_a_Florida_room;
		show row.Do_you_have_a_hard_awning;
		show row.Would_you_like_to_insure_a_golf_cart;
		show row.Park_Details;
		row.Would_you_like_to_insure_a_golf_cart=null;
		hide row.Number_of_Golf_Cart;
		hide row.Value_of_Golf_Cart_1;
		hide row.Value_of_Golf_Cart_2;
		row.Number_of_Golf_Cart=null;
		row.Value_of_Golf_Cart_1=null;
		row.Value_of_Golf_Cart_2=null;
		hide row.Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground;
		row.Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground=null;
		hide row.Where_is_the_trailer_stored_while_not_in_use;
		row.Where_is_the_trailer_stored_while_not_in_use=null;
		hide row.Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2;
		row.Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2=null;
		hide row.Is_the_trailer_taken_into_the_USA_for_more_than_180_days;
		row.Is_the_trailer_taken_into_the_USA_for_more_than_180_days=null;
		hide row.VIN;
		row.VIN=null;
		hide row.Is_the_trailer_removed_from_the_park_in_the_off_season;
		row.Is_the_trailer_removed_from_the_park_in_the_off_season=null;
		hide row.Please_provide_address_of_storage_location;
		row.Please_provide_address_of_storage_location=null;
	}
	else
	{
		hide row.Trailer_Width;
		//-------------------------Referral Reasons – Trailer Start-----------
		if(row.Is_the_trailer_taken_into_the_USA_for_more_than_180_days == "Yes")
		{
			alert "This choice triggers a referral";
			row.Referral_Is_the_trailer_taken_into_USA=true;
		}
		else
		{
			row.Referral_Is_the_trailer_taken_into_USA=false;
		}
		if(row.Select_coverage_for_policy == "Current Market Value Coverage")
		{
			hide row.RCV_Exceeding_Limits_UW_Approved;
			row.RCV_Exceeding_Limits_UW_Approved=null;
			row.Referral_Replacement_cost=false;
			if(row.Actual_Cash_Value < 10000 || row.Actual_Cash_Value > 250000)
			{
				// 		if(row.ACV_Exceeding_Limits_UW_Approved == false)
				// 		{
				alert "This choice triggers a referral";
				// 		}
				// 		row.Referral_Actual_cash_value=true;
				row.Referral_Actual_cash_value=if(row.ACV_Exceeding_Limits_UW_Approved == true,false,true);
				show row.ACV_Exceeding_Limits_UW_Approved;
				enable row.ACV_Exceeding_Limits_UW_Approved;
			}
			else
			{
				row.Referral_Actual_cash_value=false;
				row.ACV_Exceeding_Limits_UW_Approved=null;
				hide row.ACV_Exceeding_Limits_UW_Approved;
				disable row.ACV_Exceeding_Limits_UW_Approved;
			}
		}
		if(row.Select_coverage_for_policy == "Replacement Value Coverage")
		{
			hide row.ACV_Exceeding_Limits_UW_Approved;
			row.ACV_Exceeding_Limits_UW_Approved=null;
			row.Referral_Actual_cash_value=false;
			if(row.Replacement_Cost < 10000 || row.Replacement_Cost > 250000)
			{
				// 		if(row.RCV_Exceeding_Limits_UW_Approved == false)
				// 		{
				alert "This choice triggers a referral";
				// 		}
				// 		row.Referral_Replacement_cost=true;
				row.Referral_Replacement_cost=if(row.RCV_Exceeding_Limits_UW_Approved == true,false,true);
				show row.RCV_Exceeding_Limits_UW_Approved;
				enable row.RCV_Exceeding_Limits_UW_Approved;
			}
			else
			{
				row.Referral_Replacement_cost=false;
				row.RCV_Exceeding_Limits_UW_Approved=null;
				hide row.RCV_Exceeding_Limits_UW_Approved;
				disable row.RCV_Exceeding_Limits_UW_Approved;
			}
		}
		//-------------------------Referral Reasons – Trailer End-----------
		if(row.Trailer_Model_Year != null && row.Trailer_Model_Year != "")
		{
			//info "hi";
			currentYear = zoho.currentdate.getYear();
			yearsBetween = currentYear - row.Trailer_Model_Year.toLong();
			if(yearsBetween < 15)
			{
				row.Coverage_Type="All Risk";
			}
			else
			{
				row.Coverage_Type="Named Perils";
			}
			if(yearsBetween <= 10)
			{
				rowalue = {"Current Market Value Coverage","Replacement Value Coverage"};
				row.Select_coverage_for_policy:ui.add(rowalue);
			}
			else
			{
				row.Select_coverage_for_policy:ui.add("Current Market Value Coverage");
			}
		}
		show row.Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground;
		if(row.Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground == "No")
		{
			show row.Where_is_the_trailer_stored_while_not_in_use;
			show row.Is_the_trailer_taken_into_the_USA_for_more_than_180_days;
			hide row.Is_the_trailer_removed_from_the_park_in_the_off_season;
			row.Is_the_trailer_removed_from_the_park_in_the_off_season=null;
			hide row.Do_you_have_a_deck;
			hide row.Do_you_have_a_screened_in_room_or_a_Florida_room;
			hide row.Do_you_have_a_hard_awning;
			hide row.Would_you_like_to_insure_a_golf_cart;
			hide row.Park_Details;
			if(row.Would_you_like_to_insure_a_golf_cart == "Yes")
			{
				if(row.Number_of_Golf_Cart != null && row.Number_of_Golf_Cart != "")
				{
					show row.Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2;
				}
				else
				{
					hide row.Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2;
					row.Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2=null;
				}
			}
			else
			{
				hide row.Number_of_Golf_Cart;
				row.Would_you_like_to_insure_a_golf_cart=null;
				hide row.Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2;
				row.Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2=null;
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
		}
		else
		{
			hide row.Where_is_the_trailer_stored_while_not_in_use;
			row.Where_is_the_trailer_stored_while_not_in_use=null;
			hide row.Is_the_trailer_taken_into_the_USA_for_more_than_180_days;
			row.Is_the_trailer_taken_into_the_USA_for_more_than_180_days=null;
			show row.Is_the_trailer_removed_from_the_park_in_the_off_season;
			show row.Do_you_have_a_deck;
			show row.Do_you_have_a_screened_in_room_or_a_Florida_room;
			show row.Do_you_have_a_hard_awning;
			show row.Would_you_like_to_insure_a_golf_cart;
			show row.Park_Details;
		}
		hide row.Park_Details;
		hide row.Address_Lines1;
		row.Address_Lines1=null;
		hide row.City;
		row.City=null;
		hide row.Province;
		row.Province=null;
		hide row.PostalCode;
		row.PostalCode=null;
		hide row.Site_Number;
		row.Site_Number=null;
		hide row.Do_you_have_a_deck;
		row.Do_you_have_a_deck=null;
		hide row.Do_you_have_a_screened_in_room_or_a_Florida_room;
		row.Do_you_have_a_screened_in_room_or_a_Florida_room=null;
		hide row.Do_you_have_a_hard_awning;
		row.Do_you_have_a_hard_awning=null;
		hide row.Would_you_like_to_insure_a_golf_cart;
		row.Would_you_like_to_insure_a_golf_cart=null;
		show row.VIN;
		row.Select_a_Park1=null;
		row.Park_Name=null;
		hide row.Is_the_trailer_removed_from_the_park_in_the_off_season;
		row.Is_the_trailer_removed_from_the_park_in_the_off_season=null;
		hide row.Deck_Width;
		hide row.Deck_Length;
		hide row.Screened_in_room_or_Florida_room_Length;
		hide row.Screened_in_room_or_Florida_room_Width;
		hide row.Hard_Awning_Length;
		hide row.Hard_Awning_Width;
		row.Deck_Length=null;
		row.Deck_Width=null;
		row.Screened_in_room_or_Florida_room_Length=null;
		row.Screened_in_room_or_Florida_room_Width=null;
		row.Hard_Awning_Length=null;
		row.Hard_Awning_Width=null;
	}
	if(row.Select_Trailer_Type != null && row.Select_Trailer_Type != "")
	{
		disable row.Park_Name;
		disable row.Address_Lines1;
		disable row.City;
		disable row.Province;
		disable row.PostalCode;
	}
	