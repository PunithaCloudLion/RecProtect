if(row.Lein_holder != null)
	{
		show row.Name_of_Financier;
		show row.Address_line1;
		show row.Address_line2;
		show row.City;
		show row.Province;
		show row.Country;
		show row.Postal_Code;
		show row.Suite_Unit_Number;
		fetchdetails = Lein_holder_Details[ID == row.Lein_holder];
		if(fetchdetails.count() > 0)
		{
			if(fetchdetails.Name_of_Financier != "Other")
			{
				row.Name_of_Financier=fetchdetails.Name_of_Financier;
				row.Address_line1=fetchdetails.Address_Line1;
				row.Address_line2=fetchdetails.Address_Line2;
				row.City=fetchdetails.City;
				row.Country=fetchdetails.Country;
				row.Province=fetchdetails.Province;
				row.Postal_Code=fetchdetails.PostalCode;
				hide row.Name_of_Financier;
				disable row.Address_line1;
				disable row.Address_line2;
				disable row.City;
				disable row.Country;
				disable row.Province;
				disable row.Postal_Code;
			}
			else
			{
				show row.Name_of_Financier;
				show row.Address_line1;
				show row.Address_line2;
				show row.City;
				show row.Province;
				show row.Country;
				show row.Postal_Code;
				row.Name_of_Financier="";
				row.Address_line1=null;
				row.Address_line2=null;
				row.City=null;
				row.Country=null;
				row.Province=null;
				row.Postal_Code=null;
				enable row.Name_of_Financier;
				enable row.Address_line1;
				enable row.Address_line2;
				enable row.City;
				enable row.Country;
				enable row.Province;
				enable row.Postal_Code;
			}
		}
	}
	else
	{
		row.Name_of_Financier="";
		row.Address_line1=null;
		row.Address_line2=null;
		row.City=null;
		row.Country=null;
		row.Province=null;
		row.Postal_Code=null;
		row.Suite_Unit_Number=null;
		hide row.Name_of_Financier;
		hide row.Address_line1;
		hide row.Address_line2;
		hide row.City;
		hide row.Province;
		hide row.Country;
		hide row.Postal_Code;
		hide row.Suite_Unit_Number;
	}
	