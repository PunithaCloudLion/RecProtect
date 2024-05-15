if(row.Are_there_any_modifications_to_the_trailer_ie_Addition_of_permanently_installed_solar_panels == "Yes")
	{
		if(row.select_the_modification_trailer_type == "Interior Upgrades")
		{
			alert "This choice triggers a referral";
			row.Referalselect_the_modification_trailer_type=true;
		}
		else if(row.select_the_modification_trailer_type == "Solar panels")
		{
			if(row.Are_the_solar_panels_factory_dealer_installed == "No")
			{
				if(row.This_insurance_policy_does_not_cover_aftermarket_solar_panels_or_any_damage_arising_from_the_insta == "No")
				{
					alert "This choice triggers a referral";
					row.Referalselect_the_modification_trailer_type=true;
				}
				else
				{
					row.Referalselect_the_modification_trailer_type=false;
				}
			}
			else
			{
				row.Referalselect_the_modification_trailer_type=false;
			}
		}
		else
		{
			row.Referalselect_the_modification_trailer_type=false;
		}
	}
	else
	{
		row.Referalselect_the_modification_trailer_type=false;
	}
	