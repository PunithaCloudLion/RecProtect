if(row.Lein_holder != null)
	{
		fetchLein = Lein_holder_Details[ID == row.Lein_holder];
		if(fetchLein.count() > 0)
		{
			if(fetchLein.Name_of_Financier != "Other")
			{
				hide row.Name_of_Financier;
				//row.Name_of_Financier="";
				show row.Address_line1;
				show row.Address_line2;
				show row.City1;
				show row.Province1;
				show row.Country;
				row.Name_of_Financier=fetchLein.Name_of_Financier;
				row.Address_line1=fetchLein.Address_Line1;
				row.Address_line2=fetchLein.Address_Line2;
				row.City1=fetchLein.City;
				row.Province1=fetchLein.Province;
				row.Postal_Code=fetchLein.PostalCode;
				row.Country=fetchLein.Country;
				disable row.Name_of_Financier;
				disable row.Address_line1;
				disable row.Address_line2;
				disable row.Province1;
				disable row.City1;
				disable row.Country;
				disable row.Postal_Code;
			}
			else
			{
				show row.Name_of_Financier;
				show row.Address_line1;
				show row.Address_line2;
				show row.City1;
				show row.Province1;
				show row.Country;
				row.Name_of_Financier="";
				row.Address_line1="";
				row.Address_line2="";
				row.City1="";
				row.Province1="";
				row.Postal_Code="";
				row.Country="";
				enable row.Name_of_Financier;
				enable row.Address_line1;
				enable row.Address_line2;
				enable row.City1;
				enable row.Country;
				enable row.Province1;
				enable row.Postal_Code;
			}
		}
	}
	else
	{
		row.Name_of_Financier="";
		row.Address_line1="";
		row.Address_line2="";
		row.City1="";
		row.Province1="";
		row.Postal_Code="";
		row.Country="";
		hide row.Name_of_Financier;
		hide row.Address_line1;
		hide row.Address_line2;
		hide row.City1;
		hide row.Province1;
		hide row.Country;
	}
	