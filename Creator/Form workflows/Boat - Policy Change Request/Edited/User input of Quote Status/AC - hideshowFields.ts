if(input.Quote_Status == "Referral")
	{
		for each  trailerSubform in input.Boat
		{
			show Boat.Underwritting_Approved;
		}
		//show row.Underwritting_Approved;
	}
	else
	{
		for each  trailerSubform in input.Boat
		{
			hide Boat.Underwritting_Approved;
			input.Boat.Underwritting_Approved = null;
		}
	}
	