if(row.Is_there_any_pre_existing_damage_on_the_trailer == "Yes")
	{
		show row.UW_Approved;
	}
	else
	{
		hide row.UW_Approved;
		row.UW_Approved=null;
	}
	