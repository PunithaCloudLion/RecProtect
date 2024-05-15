if(row.Is_this_trailer_financed == "Yes")
	{
		show row.Lein_holder;
	}
	else
	{
		hide row.Lein_holder;
		hide row.Name_of_Financier;
		hide row.Address_line1;
		hide row.Address_line2;
		hide row.Postal_Code;
		hide row.City1;
		hide row.Province1;
		hide row.Country;
		row.Lein_holder=null;
	}
	