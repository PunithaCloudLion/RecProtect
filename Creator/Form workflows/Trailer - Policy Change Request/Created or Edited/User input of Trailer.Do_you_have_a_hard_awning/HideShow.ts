if(row.Do_you_have_a_hard_awning == "Yes")
	{
		show row.Hard_Awning_Width;
		show row.Hard_Awning_Length;
	}
	else
	{
		hide row.Hard_Awning_Length;
		hide row.Hard_Awning_Width;
	}
	