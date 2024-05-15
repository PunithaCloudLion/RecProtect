/*
Ranjith
08/03/24
*/
if(input.Admin_Fee != null)
	{
		AdjTaxPercentage = input.New_Tax_Percent;
		PreAmount = ifNull(input.Prorated,0) + input.Admin_Fee;
		TaxAmount = (PreAmount * AdjTaxPercentage) / 100;
		if(TaxAmount.contains("-") == true)
		{
			input.Tax = TaxAmount * -1;
		}
		else
		{
			input.Tax = TaxAmount;
		}
		input.Total = ifNull(input.Prorated,0) + TaxAmount + input.Admin_Fee;
		// 	Tot = input.Total;
		// 	if(Tot.contains("-") == true)
		// 	{
		// 		AdjTaxPercentage = input.New_Tax_Percent;
		// 		PreAmount = ifNull(input.Prorated,0) + input.Admin_Fee * -1;
		// 		TaxAmount = (PreAmount * AdjTaxPercentage) / 100;
		// 		if(TaxAmount.contains("-") == true)
		// 		{
		// 			input.Tax = TaxAmount * -1;
		// 		}
		// 		else
		// 		{
		// 			input.Tax = TaxAmount;
		// 		}
		// 		input.Total = ifNull(input.Prorated,0) + TaxAmount + input.Admin_Fee * -1;
		// 		// 		newTot = input.Admin_Fee * -1;
		// 		// 		input.Total = Tot + newTot;
		// 	}
		// 	else
		// 	{
		// 		AdjTaxPercentage = input.New_Tax_Percent;
		// 		PreAmount = ifNull(input.Prorated,0) + input.Admin_Fee;
		// 		TaxAmount = (PreAmount * AdjTaxPercentage) / 100;
		// 		input.Tax = TaxAmount;
		// 		input.Total = ifNull(input.Prorated,0) + TaxAmount + input.Admin_Fee;
		// 		// 		input.Total = Tot + input.Admin_Fee;
		// 		info TaxAmount + " " + input.New_Tax_Percent;
		// 	}
	}
	else if(input.Admin_Fee == null)
	{
		AdjTaxPercentage = input.New_Tax_Percent;
		TaxAmount = (ifNull(input.Prorated,0) * AdjTaxPercentage) / 100;
		input.Tax = TaxAmount;
		input.Total = ifNull(input.Prorated,0) + TaxAmount;
	}
	