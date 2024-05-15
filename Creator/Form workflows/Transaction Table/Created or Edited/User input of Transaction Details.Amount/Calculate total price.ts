totTax = 0;
totalWitOutTax = 0;
totalWithTax = 0;
if(row.Amount != null)
{
	if(row.Tax != null)
	{
		var = ifnull(row.Amount,0) * ifnull(row.Tax.Tax,0) / 100;
		row.Tax_Amount=var;
		row.Amount_With_Tax=var + ifnull(row.Amount,0);
	}
	else
	{
		row.Tax_Amount=0.0;
		row.Amount_With_Tax=row.Amount;
	}
}
else
{
	row.Tax=null;
	row.Tax_Amount=0.0;
	row.Amount_With_Tax=0.0;
}
for each  items in input.Transaction_Details
{
	totTax = totTax + ifnull(items.Tax_Amount,0);
	totalWitOutTax = totalWitOutTax + ifnull(items.Amount,0);
	totalWithTax = totalWithTax + ifnull(items.Amount_With_Tax,0);
}
input.Tax_Amount = totTax;
input.Total_Amount_With_Tax = totalWithTax;
input.Total_Amount_Without_Tax = totalWitOutTax;
