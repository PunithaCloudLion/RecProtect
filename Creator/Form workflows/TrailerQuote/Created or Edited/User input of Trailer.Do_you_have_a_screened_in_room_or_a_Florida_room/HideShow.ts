if(row.Do_you_have_a_screened_in_room_or_a_Florida_room == "Yes")
	{
		show row.Screened_in_room_or_Florida_room_Length;
		show row.Screened_in_room_or_Florida_room_Width;
	}
	else
	{
		hide row.Screened_in_room_or_Florida_room_Length;
		hide row.Screened_in_room_or_Florida_room_Width;
	}
	