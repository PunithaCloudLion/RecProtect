// - -------------- Calculate Outstanding
if(input.Total_Premium_before_tax != null && input.New_Total_Premium_before_tax != null)
	{
		input.Outstanding = input.New_Total_Premium_before_tax - input.Total_Premium_before_tax;
	}
	