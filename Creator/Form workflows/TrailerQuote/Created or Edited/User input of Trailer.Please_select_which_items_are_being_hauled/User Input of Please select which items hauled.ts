if(row.Trailer_Purpose_Type == "Toy Hauler")
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
	