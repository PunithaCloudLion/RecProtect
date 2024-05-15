if(row.Do_you_have_a_deck == "Yes")
	{
		show row.Deck_Length;
		show row.Deck_Width;
	}
	else
	{
		hide row.Deck_Length;
		hide row.Deck_Width;
	}
	