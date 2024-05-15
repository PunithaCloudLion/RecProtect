if(input.Prorated != null)
	{
		AdjTaxPercentage = input.New_Tax_Percent;
		if(input.Admin_Fee != null)
		{
			ProAndAdmiValue = ifNull(input.Prorated,0) + input.Admin_Fee;
		}
		else
		{
			ProAndAdmiValue = ifNull(input.Prorated,0);
		}
		TaxAmount = (ProAndAdmiValue * AdjTaxPercentage) / 100;
		if(TaxAmount.contains("-") == true)
		{
			input.Tax = TaxAmount * -1;
		}
		else
		{
			input.Tax = TaxAmount;
		}
		if(input.Admin_Fee != null)
		{
			input.Total = ifNull(input.Prorated,0) + TaxAmount + input.Admin_Fee;
		}
		else
		{
			input.Total = ifNull(input.Prorated,0) + TaxAmount;
		}
	}
	