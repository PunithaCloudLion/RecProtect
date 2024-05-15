if(row.select_the_modification_trailer_type == "Solar panels")
	{
		show row.Are_the_solar_panels_factory_dealer_installed;
		hide row.Please_add_details_on_interior_upgrades;
		row.Please_add_details_on_interior_upgrades="";
		// 	hide row.Describe_modifications;
		// 	row.Describe_modifications="";
	}
	else if(row.select_the_modification_trailer_type == "Interior Upgrades")
	{
		//show row.Describe_modifications;
		show row.Please_add_details_on_interior_upgrades;
		row.Referalselect_the_modification_trailer_type=false;
		hide row.Are_the_solar_panels_factory_dealer_installed;
		row.Are_the_solar_panels_factory_dealer_installed="";
		hide row.This_insurance_policy_does_not_cover_aftermarket_solar_panels_or_any_damage_arising_from_the_insta;
		row.This_insurance_policy_does_not_cover_aftermarket_solar_panels_or_any_damage_arising_from_the_insta="";
		//---------referral section ----
	}
	else
	{
		hide row.Please_add_details_on_interior_upgrades;
		row.Please_add_details_on_interior_upgrades="";
		row.Referalselect_the_modification_trailer_type=false;
		hide row.Are_the_solar_panels_factory_dealer_installed;
		row.Are_the_solar_panels_factory_dealer_installed="";
		hide row.This_insurance_policy_does_not_cover_aftermarket_solar_panels_or_any_damage_arising_from_the_insta;
		row.This_insurance_policy_does_not_cover_aftermarket_solar_panels_or_any_damage_arising_from_the_insta="";
		//---------referral section ----
	}
	if(row.Are_there_any_modifications_to_the_trailer_ie_Addition_of_permanently_installed_solar_panels == "Yes" && row.select_the_modification_trailer_type == "Interior Upgrades")
	{
		row.Referalselect_the_modification_trailer_type=true;
		alert "This choice triggers a referral";
	}
	