input.Total_Amount_With_Tax = ifnull(input.Total_Amount_With_Tax,0) - ifnull(row.Amount_With_Tax,0);
input.Total_Amount_Without_Tax = ifnull(input.Total_Amount_Without_Tax,0) - ifnull(row.Amount,0);
input.Tax_Amount = ifnull(input.Tax_Amount,0) - ifnull(row.Tax_Amount,0);
