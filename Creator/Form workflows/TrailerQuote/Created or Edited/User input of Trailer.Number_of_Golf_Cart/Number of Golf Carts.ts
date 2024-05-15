if(row.Number_of_Golf_Cart == "1")
	{
		show row.Value_of_Golf_Cart_1;
		hide row.Value_of_Golf_Cart_2;
		//	row.Value_of_Golf_Cart_1="";
		row.Value_of_Golf_Cart_2="";
		row.Golf_Cart="Yes";
	}
	else if(row.Number_of_Golf_Cart == "2")
	{
		show row.Value_of_Golf_Cart_1;
		show row.Value_of_Golf_Cart_2;
		row.Golf_Cart="Yes";
	}
	else
	{
		hide row.Value_of_Golf_Cart_1;
		hide row.Value_of_Golf_Cart_2;
		row.Value_of_Golf_Cart_1="";
		row.Value_of_Golf_Cart_2="";
		row.Golf_Cart="No";
	}
	