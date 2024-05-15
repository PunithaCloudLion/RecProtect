//-------------------------Referral Reasons – Trailer Start-----------
if(row.Is_there_any_heating_that_wasn_t_factory_installed_wood_stove_pellet_stove_etc == "Yes")
	{
		if(row.Heating_Type != "Electric space heater" && row.Heating_Type != "" && row.Heating_Type != null)
		{
			alert "This choice triggers a referral";
			row.Referral_Is_there_any_heating=true;
		}
		else
		{
			row.Referral_Is_there_any_heating=false;
		}
	}
	//-------------------------Referral Reasons – Trailer End-----------
	