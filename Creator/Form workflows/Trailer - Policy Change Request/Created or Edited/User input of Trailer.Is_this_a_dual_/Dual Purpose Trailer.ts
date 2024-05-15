if(row.Is_this_a_dual_purpose_trailer_toy_hauler_horse_trailer == "Yes")
	{
		show row.Trailer_Purpose_Type;
	}
	else
	{
		row.Referral_Is_this_a_dual_purpose_trailer=false;
		hide row.Trailer_Purpose_Type;
		row.Trailer_Purpose_Type=null;
		hide row.Please_select_which_items_are_being_hauled;
		row.Please_select_which_items_are_being_hauled="";
	}
	