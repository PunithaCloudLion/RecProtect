if(input.Quote_Status == "Referral")
	{
		for each  trailerSubform in input.Trailer
		{
			show Trailer.Underwritting_Approved;
		}
		//show row.Underwritting_Approved;
	}
	else
	{
		for each  trailerSubform in input.Trailer
		{
			hide Trailer.Underwritting_Approved;
			input.Trailer.Underwritting_Approved=null;
		}
	}
	