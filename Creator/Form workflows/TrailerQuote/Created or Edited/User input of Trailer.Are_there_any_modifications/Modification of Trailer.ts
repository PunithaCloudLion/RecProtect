if(row.Are_there_any_modifications_to_the_trailer_ie_Addition_of_permanently_installed_solar_panels == "Yes")
	{
		show row.select_the_modification_trailer_type;
	}
	else
	{
		row.Referalselect_the_modification_trailer_type=false;
		hide row.select_the_modification_trailer_type;
		row.select_the_modification_trailer_type=null;
		hide row.Are_the_solar_panels_factory_dealer_installed;
		row.Are_the_solar_panels_factory_dealer_installed="";
		hide row.Please_add_details_on_interior_upgrades;
		row.Please_add_details_on_interior_upgrades=null;
		hide row.This_insurance_policy_does_not_cover_aftermarket_solar_panels_or_any_damage_arising_from_the_insta;
		row.This_insurance_policy_does_not_cover_aftermarket_solar_panels_or_any_damage_arising_from_the_insta="";
		// 	hide row.Describe_modifications;
		// 	row.Describe_modifications="";
	}
	