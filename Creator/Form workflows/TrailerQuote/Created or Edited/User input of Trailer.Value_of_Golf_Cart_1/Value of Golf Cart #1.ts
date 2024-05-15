if(row.Value_of_Golf_Cart_1 != null)
	{
		if(row.Number_of_Golf_Cart == "1")
		{
			if(row.Value_of_Golf_Cart_1 > 15000)
			{
				alert "This choice triggers a referral";
				row.Referral_Golf_cart=true;
			}
			else
			{
				row.Referral_Golf_cart=false;
			}
		}
		else if(row.Number_of_Golf_Cart == "2")
		{
			if(row.Value_of_Golf_Cart_1 > 15000)
			{
				alert "This choice triggers a referral";
				row.Referral_Golf_cart=true;
			}
			else
			{
				if(row.Value_of_Golf_Cart_2 > 15000)
				{
					alert "This choice triggers a referral";
					row.Referral_Golf_cart=true;
				}
				else
				{
					row.Referral_Golf_cart=false;
				}
			}
		}
	}
	