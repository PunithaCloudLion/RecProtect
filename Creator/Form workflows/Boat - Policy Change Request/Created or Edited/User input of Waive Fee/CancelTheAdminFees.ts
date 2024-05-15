
if(input.Waive_Free == true)
	{
		// new premium
		if(input.New_Admin_Fee != null)
		{
			NewTotalBeforeTax = input.New_Total_Premium_before_tax;
			NewTaxPercent = input.New_Tax_Percent;
			totalTax = (NewTotalBeforeTax * NewTaxPercent) / 100;
			if(totalTax >= 0)
			{
				input.New_Total_Tax = totalTax;
			}
			else
			{
				input.New_Total_Tax = totalTax * -1;
			}
			TotalPremium = NewTotalBeforeTax + totalTax;
			input.New_Total_Payable_Premium_after_tax = TotalPremium;
			// 		MinusValue = input.New_Total_Payable_Premium_after_tax - input.New_Admin_Fee;
			// 		input.New_Total_Payable_Premium_after_tax = MinusValue;
		}
		// adjustable premium
		if(input.Admin_Fee != null)
		{
			NewTotalBeforeTax = input.Prorated;
			NewTaxPercent = input.New_Tax_Percent;
			totalTax = (NewTotalBeforeTax * NewTaxPercent) / 100;
			if(totalTax.contains("-") == true)
			{
				input.Tax = totalTax * -1;
			}
			else
			{
				input.Tax = totalTax;
			}
			input.Total = NewTotalBeforeTax + totalTax;
			// 		tot = input.Total;
			// 		if(tot.contains("-") == true)
			// 		{
			// 			NewTotalBeforeTax = input.Prorated;
			// 			NewTaxPercent = input.New_Tax_Percent;
			// 			totalTax = (NewTotalBeforeTax * NewTaxPercent) / 100;
			// 			if(totalTax.contains("-") == true)
			// 			{
			// 				TotalPremium = NewTotalBeforeTax + totalTax;
			// 				input.Tax = totalTax * -1;
			// 				input.Total = TotalPremium;
			// 			}
			// 			else
			// 			{
			// 				TotalPremium = NewTotalBeforeTax + totalTax;
			// 				input.Tax = totalTax;
			// 				input.Total = TotalPremium;
			// 			}
			// 			// 			newTot = input.Admin_Fee * -1;
			// 			// 			AdminfeeMinus = input.Total - newTot;
			// 			// 			input.Total = AdminfeeMinus;
			// 		}
			// 		else
			// 		{
			// 			NewTotalBeforeTax = input.Prorated;
			// 			NewTaxPercent = input.New_Tax_Percent;
			// 			totalTax = (NewTotalBeforeTax * NewTaxPercent) / 100;
			// 			TotalPremium = NewTotalBeforeTax + totalTax;
			// 			input.Tax = totalTax;
			// 			input.Total = TotalPremium;
			// 			// 			AdminfeeMinus = input.Total - input.Admin_Fee;
			// 			// 			input.Total = AdminfeeMinus;
			// 		}
		}
	}
	else if(input.Waive_Free == false)
	{
		if(input.New_Admin_Fee != null)
		{
			NewTotalBeforeTax = input.New_Total_Premium_before_tax + input.New_Admin_Fee;
			NewTaxPercent = input.New_Tax_Percent;
			totalTax = (NewTotalBeforeTax * NewTaxPercent) / 100;
			TotalPremium = NewTotalBeforeTax + totalTax;
			input.New_Total_Payable_Premium_after_tax = TotalPremium;
			if(totalTax >= 0)
			{
				input.New_Total_Tax = totalTax;
			}
			else
			{
				input.New_Total_Tax = totalTax * -1;
			}
			// 		AddValue = input.New_Total_Payable_Premium_after_tax + input.New_Admin_Fee;
			// 		input.New_Total_Payable_Premium_after_tax = AddValue;	
		}
		// adj
		if(input.Admin_Fee != null)
		{
			NewTotalBeforeTax = input.Prorated + input.Admin_Fee;
			NewTaxPercent = input.New_Tax_Percent;
			totalTax = (NewTotalBeforeTax * NewTaxPercent) / 100;
			TotalPremium = NewTotalBeforeTax + totalTax;
			input.Total = TotalPremium;
			if(totalTax >= 0)
			{
				input.Tax = totalTax;
			}
			else
			{
				input.Tax = totalTax * -1;
			}
			// 		tot = input.Total;
			// 		if(tot.contains("-") == true)
			// 		{
			// 			if(input.Prorated.contains("-") == true)
			// 			{
			// 				proValue = input.Prorated + input.Admin_Fee * -1;
			// 				NewTaxPercent = input.New_Tax_Percent;
			// 				totalTax = (proValue * NewTaxPercent) / 100;
			// 				input.Total = proValue + totalTax;
			// 				if(totalTax.contains("-") == true)
			// 				{
			// 					input.Tax = totalTax * -1;
			// 				}
			// 				else
			// 				{
			// 					input.Tax = totalTax;
			// 				}
			// 			}
			// 			else
			// 			{
			// 				NewTaxPercent = input.New_Tax_Percent;
			// 				totalTax = (input.Prorated * NewTaxPercent) / 100;
			// 				input.Total = input.Prorated + totalTax;
			// 				input.Tax = totalTax;
			// 			}
			// 		}
			// 		else
			// 		{
			// 			NewTotalBeforeTax = input.Prorated + input.Admin_Fee;
			// 			NewTaxPercent = input.New_Tax_Percent;
			// 			totalTax = (NewTotalBeforeTax * NewTaxPercent) / 100;
			// 			TotalPremium = NewTotalBeforeTax + totalTax;
			// 			input.Total = TotalPremium;
			// 			input.Tax = totalTax;
			// 			// 			newProratedValue = ifnull(input.Total,0) + input.Admin_Fee;
			// 			// 			input.Total = newProratedValue;
			// 		}
		}
	}
	