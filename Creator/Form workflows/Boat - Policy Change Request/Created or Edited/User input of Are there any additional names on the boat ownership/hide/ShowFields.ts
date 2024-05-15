if(input.Are_there_any_additional_names_on_the_boat_ownership == "Yes" && input.Are_there_any_additional_names_on_the_boat_ownership != null && input.Are_there_any_additional_names_on_the_boat_ownership != "" && Select_Type != null && Select_Type != "" && Select_Policy != null)
	{
		show Additional_Names;
	}
	else
	{
		hide Additional_Names;
		input.Additional_Names.clear();
	}
	