void Migration.AddtrailerMigration()
{
	// 	for each getTrailerQuote in TrailerQuote [ ID != null ]range from 2001 to 3000 
	//     {
	// 		if(getTrailerQuote.Additional_Names !=null)
	// 		{
	// 			getTrailerQuote.Are_there_any_additional_names_on_the_trailer_ownership =true;
	// 		}
	//     } 
	// 	for each getTrailer in Trailer_Migration [ Additional_Insured_First_Name != "" || Additional_Insured_Last_Name != "" ] range from 2001 to 3000 
	//     {
	// if (getTrailer.count() > 0  && getTrailer.Trailer_Quote_Creator_ID != null) 
	//     {
	// 		getTrailerQuote = TrailerQuote [ ID == 4564627000000578158];
	// 		if(getTrailerQuote.Additional_Names !=null)
	// 		{
	// 			getTrailerQuote.Are_there_any_additional_names_on_the_trailer_ownership =true;
	// 		}
	// 		else 
	//         {
	// 			info "b" ;
	//         }
	// 		if ( getTrailerQuote.count() > 0 ) 
	//         {
	// 			if(getTrailerQuote.Additional_Names ==null)
	// 			{
	// // 				info "s" ;
	// 				addAdditonal = insert into Additional_Names_Trailer
	// 				[
	// 					Added_User = zoho.loginuser
	// 					First_Name = getTrailer.Additional_Insured_First_Name
	// 					Last_Name = getTrailer.Additional_Insured_Last_Name
	// 					Trailer_Quotation =getTrailerQuote.ID
	// 				];
	// 				info addAdditonal ;
	// 			}
	// 			else 
	//             {
	// 				info "Subform is present-->"+getTrailer.ID;
	//             }
	//         }
	//     }
	//     } 
	// 	getBoat = Boat_Migration [ Additional_Insured_First_Name != "" || Additional_Insured_Last_Name != "" ].count();
	for each  getBoat in Boat_Migration[Additional_Insured_First_Name != "" || Additional_Insured_Last_Name != ""] range from 1001 to 2000
	{
		if(getBoat.count() > 0 && getBoat.Boat_Quote_Creator_ID != null)
		{
			getBoatQuote = BoatQuote[ID == getBoat.Boat_Quote_Creator_ID.tolong()];
			if(getBoatQuote.count() > 0)
			{
				if(getBoatQuote.Additional_Names == null)
				{
					addBoat = insert into Additional_Names
					[
						Added_User=zoho.loginuser
						Additional_Insured_First_Name=getBoat.Additional_Insured_First_Name
						Additional_Insured_Last_Name=getBoat.Additional_Insured_Last_Name
						Boats=getBoatQuote.ID
					];
					info addBoat;
					// 					getBoatQuote.Are_there_any_additional_names_on_the_boat_ownership1=true;
					getBoatQuote.Are_there_any_additional_names_on_the_boat_ownership="Yes";
				}
				else
				{
					info "No-->" + getBoat.ID;
				}
			}
		}
	}
}