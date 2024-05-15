if(row.Premium_Per_Year != null)
	{
		//info "hi" ;
		premiumTotal = 0;
		for each  premium in input.Trailer
		{
			premiumTotal = premiumTotal + premium.Premium_Per_Year;
		}
		input.Total_Premium_before_tax = premiumTotal;
		// --- Add Admin Fee - Based on config ------
		fetchAdminFeePer = Commissions_Configuration[Commision == "NB - Admin Fee"];
		if(fetchAdminFeePer.count() > 0)
		{
			input.Fee = ifnull(premiumTotal,0) * ifnull(fetchAdminFeePer.Percent,0) / 100;
		}
		tax = 0;
		if(input.Please_select_the_province_your_trailer_is_located_in != "" && input.Please_select_the_province_your_trailer_is_located_in != null)
		{
			fetchTax = Tax_Lists[State_Province == input.Please_select_the_province_your_trailer_is_located_in];
			tax = fetchTax.Tax;
			if(input.Override_Tax_by_Admin == "Yes" && input.Override_Tax != null)
			{
				tax = input.Override_Tax.Tax;
			}
			input.Tax_Precent = tax;
			input.Tax_Province = input.Please_select_the_province_your_trailer_is_located_in;
		}
		premiumandfee = ifnull(input.Total_Premium_before_tax,0) + ifnull(input.Fee,0);
		totalTax = (premiumandfee * tax) / 100;
		//info "tax = " + totalTax;
		totalAftetTax = totalTax + premiumandfee;
		input.Total_Tax = totalTax;
		input.Total_Payable_Premium_after_tax = totalAftetTax;
	}
	