if(row.Trailer_Purpose_Type == "Toy Hauler")
	{
		show row.Please_select_which_items_are_being_hauled;
	}
	else
	{
		hide row.Please_select_which_items_are_being_hauled;
		row.Please_select_which_items_are_being_hauled=null;
	}
	//-------------------------Referral Reasons – Trailer Start-----------
	if(row.Is_this_a_dual_purpose_trailer_toy_hauler_horse_trailer == "Yes")
	{
		if(row.Trailer_Purpose_Type == "Animal Hauler")
		{
			alert "This choice triggers a referral";
			row.Referral_Is_this_a_dual_purpose_trailer=true;
		}
		else if(row.Trailer_Purpose_Type == "Toy Hauler")
		{
			if(row.Please_select_which_items_are_being_hauled.contains("Cars/Trucks/SUV") == true)
			{
				alert "This choice triggers a referral";
				row.Referral_Is_this_a_dual_purpose_trailer=true;
			}
			else
			{
				row.Referral_Is_this_a_dual_purpose_trailer=false;
			}
		}
		else
		{
			row.Referral_Is_this_a_dual_purpose_trailer=false;
		}
		show row.Trailer_Purpose_Type;
	}
	else
	{
		row.Referral_Is_this_a_dual_purpose_trailer=false;
	}
	//-------------------------Referral Reasons – Trailer End-----------
	