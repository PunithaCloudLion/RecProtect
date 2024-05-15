if(row.Number_of_Golf_Cart != null)
	{
		if(row.Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2 == "No" || row.Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2 == null)
		{
			row.Number_of_Golf_Cart="";
			row.Value_of_Golf_Cart_1=null;
			row.Value_of_Golf_Cart_2=null;
			hide row.Number_of_Golf_Cart;
			hide row.Value_of_Golf_Cart_1;
			hide row.Value_of_Golf_Cart_2;
		}
	}
	if(row.Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2 != "" && row.Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2 != null)
	{
		show row.Override_Preferred_Park_Discount;
	}
	else
	{
		hide row.Override_Preferred_Park_Discount;
		//	row.Override_Preferred_Park_Discount=null;
	}
	