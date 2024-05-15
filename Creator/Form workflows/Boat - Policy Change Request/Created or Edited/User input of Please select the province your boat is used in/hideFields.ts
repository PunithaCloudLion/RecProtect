tax = 0;
if(input.Please_select_the_province_your_boat_is_used_in != null && input.Please_select_the_province_your_boat_is_used_in != "")
{
	fetchTax = Tax_Lists[State_Province == input.Please_select_the_province_your_boat_is_used_in];
	tax = ifnull(fetchTax.Tax,0);
	if(input.Override_Tax_by_Admin == "Yes" && input.Override_Tax != null)
	{
		f_tax = Tax_Lists[ID == input.Override_Tax];
		tax = ifnull(f_tax.Tax,0);
	}
	input.New_Tax_Percent = tax;
	input.New_Tax_Province = input.Please_select_the_province_your_boat_is_used_in;
	if(input.Boat != null)
	{
		premiumTotal = 0;
		for each  boatsubform in input.Boat
		{
			if(boatsubform.Premium_Per_Year != null)
			{
				premiumTotal = premiumTotal + ifnull(boatsubform.Premium_Per_Year,0);
			}
		}
		//
		input.New_Total_Premium_before_tax = premiumTotal;
		premiumandfee = ifnull(input.New_Total_Premium_before_tax,0) + ifnull(input.New_Admin_Fee,0);
		totalTax = premiumandfee * ifnull(fetchTax.Tax,0) / 100;
		totalAftetTax = ifnull(totalTax,0) + premiumandfee;
		input.New_Total_Tax = totalTax;
		input.New_Total_Payable_Premium_after_tax = totalAftetTax;
		//
	}
}
else
{
	input.New_Tax_Percent = null;
	input.New_Tax_Province = null;
}
