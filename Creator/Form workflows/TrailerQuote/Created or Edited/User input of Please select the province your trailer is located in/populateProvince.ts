//Trailer.Province=input.Please_select_the_province_your_trailer_is_located_in;
for each  trailer in input.Trailer
{
	trailer.Province=input.Please_select_the_province_your_trailer_is_located_in;
	//	disable Trailer.Province ;
}
disable Trailer.Province;
tax = 0;
if(input.Please_select_the_province_your_trailer_is_located_in != null && input.Please_select_the_province_your_trailer_is_located_in != "")
{
	fetchTax = Tax_Lists[State_Province == input.Please_select_the_province_your_trailer_is_located_in];
	tax = fetchTax.Tax;
	if(input.Override_Tax_by_Admin == "Yes" && input.Override_Tax != null)
	{
		tax = ifnull(input.Override_Tax.Tax,0);
	}
	input.Tax_Precent = tax;
	input.Tax_Province = input.Please_select_the_province_your_trailer_is_located_in;
	if(input.Trailer != null)
	{
		premiumTotal = 0;
		for each  trailersubform in input.Trailer
		{
			if(trailersubform.Premium_Per_Year != null)
			{
				premiumTotal = premiumTotal + ifnull(trailersubform.Premium_Per_Year,0);
			}
		}
		input.Total_Premium_before_tax = premiumTotal;
		// --- Add Admin Fee - Based on config ------
		fetchAdminFeePer = Commissions_Configuration[Commision == "NB - Admin Fee"];
		if(fetchAdminFeePer.count() > 0)
		{
			input.Fee = ifnull(premiumTotal,0) * ifnull(fetchAdminFeePer.Percent,0) / 100;
		}
		premiumandfee = ifnull(input.Total_Premium_before_tax,0) + ifnull(input.Fee,0);
		totalTax = premiumandfee * tax / 100;
		//info "tax = " + totalTax;
		totalAftetTax = ifnull(totalTax,0) + premiumandfee;
		input.Total_Tax = totalTax;
		input.Total_Payable_Premium_after_tax = totalAftetTax;
	}
	/*Added by Sundaram 16-04-2024 for adding a park values based on Please_select_the_province_your_trailer_is_located_in field */
	getCountries = Preffered_Parks[Province == input.Please_select_the_province_your_trailer_is_located_in || Preffered_Park_Name == "Other"].ID.getAll();
	if(input.Trailer != null)
	{
		for each  row1 in input.Trailer
		{
			newPark = row1.Select_a_Park1;
			checkAlreadyexist = getCountries.contains(newPark);
			row1.Select_a_Park1:ui.add(getCountries);
			if(checkAlreadyexist == true)
			{
				row1.Select_a_Park1=newPark;
			}
			else
			{
				clear row1.Select_a_Park1;
				row1.Select_a_Park1:ui.add(getCountries);
			}
		}
	}
}
else
{
	input.Tax_Precent = null;
	input.Tax_Province = null;
}
