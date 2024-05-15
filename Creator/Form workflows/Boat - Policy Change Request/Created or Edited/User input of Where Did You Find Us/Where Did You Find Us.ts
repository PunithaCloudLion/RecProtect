if(input.Where_Did_You_Find_Us == "Friend or Family")
	{
		show Name;
		hide Name_of_Dealership;
		hide Name_of_Campground;
		hide Name_of_Marina;
		hide Tell_us_more;
	}
	else if(input.Where_Did_You_Find_Us == "Dealership")
	{
		hide Name;
		show Name_of_Dealership;
		hide Name_of_Campground;
		hide Name_of_Marina;
		hide Tell_us_more;
	}
	else if(input.Where_Did_You_Find_Us == "Campground")
	{
		hide Name;
		hide Name_of_Dealership;
		show Name_of_Campground;
		hide Name_of_Marina;
		hide Tell_us_more;
	}
	else if(input.Where_Did_You_Find_Us == "Marina")
	{
		hide Name;
		hide Name_of_Dealership;
		hide Name_of_Campground;
		show Name_of_Marina;
		hide Tell_us_more;
	}
	else if(input.Where_Did_You_Find_Us == "Other")
	{
		hide Name;
		hide Name_of_Dealership;
		hide Name_of_Campground;
		hide Name_of_Marina;
		show Tell_us_more;
	}
	else
	{
		hide Name;
		hide Name_of_Dealership;
		hide Name_of_Campground;
		hide Name_of_Marina;
		hide Tell_us_more;
	}
	