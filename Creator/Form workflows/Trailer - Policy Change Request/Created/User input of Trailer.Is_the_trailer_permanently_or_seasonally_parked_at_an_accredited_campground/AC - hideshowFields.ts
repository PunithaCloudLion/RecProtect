if(row.Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground == "No")
	{
		if(row.Would_you_like_to_insure_a_golf_cart == "Yes")
		{
			if(row.Number_of_Golf_Cart != null && row.Number_of_Golf_Cart != "")
			{
				//show row.Would_you_like_to_insure_a_golf_cart ;
				//show row.Number_of_Golf_Cart ;
				if(row.Number_of_Golf_Cart == "1")
				{
					alert "Should golf cart coverage remain for golf cart 1 valued at" + row.Value_of_Golf_Cart_1;
					show row.Value_of_Golf_Cart_1;
					hide row.Value_of_Golf_Cart_2;
					row.Value_of_Golf_Cart_2=null;
				}
				else
				{
					show row.Value_of_Golf_Cart_1;
					show row.Value_of_Golf_Cart_2;
					alert "Should golf cart coverage remain for golf cart 1 valued at " + row.Value_of_Golf_Cart_1 + " and golf vart 2 valued at " + row.Value_of_Golf_Cart_2;
				}
			}
		}
	}
	else
	{
	}
	