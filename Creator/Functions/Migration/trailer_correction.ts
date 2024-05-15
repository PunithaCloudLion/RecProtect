void Migration.trailer_correction()
{
	getTrailer = BoatQuote[Migrated == true && Please_select_the_province_your_boat_is_used_in == "Alberta" && Tax_Precent == 0.0];
	info getTrailer.count();
	// 	if(getTrailer.count() > 0)
	// 	{
	// 		for each  rec in getTrailer
	// 		{
	// 			if(rec.Please_select_the_province_your_boat_is_used_in != "" && rec.Please_select_the_province_your_boat_is_used_in != null)
	// 			{
	// 				if(rec.Please_select_the_province_your_boat_is_used_in == "Saskatchewan")
	// 				{
	// 					rec.Tax_Precent=6.00;
	// 				}
	// 				else if(rec.Please_select_the_province_your_boat_is_used_in == "Ontario")
	// 				{
	// 					rec.Tax_Precent=8.00;
	// 				}
	// 				else if(rec.Please_select_the_province_your_boat_is_used_in == "British Columbia")
	// 				{
	// 					rec.Tax_Precent=0.00;
	// 				}
	// 				else if(rec.Please_select_the_province_your_boat_is_used_in == "Alberta")
	// 				{
	// 					rec.Tax_Precent=0.00;
	// 				}
	// 			}
	// 		}
	// 	}
}