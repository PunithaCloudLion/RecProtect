if(row.Are_the_solar_panels_factory_dealer_installed == "No")
	{
		show row.This_insurance_policy_does_not_cover_aftermarket_solar_panels_or_any_damage_arising_from_the_insta;
		row.This_insurance_policy_does_not_cover_aftermarket_solar_panels_or_any_damage_arising_from_the_insta="";
	}
	else
	{
		hide row.This_insurance_policy_does_not_cover_aftermarket_solar_panels_or_any_damage_arising_from_the_insta;
		row.This_insurance_policy_does_not_cover_aftermarket_solar_panels_or_any_damage_arising_from_the_insta="";
	}
	//-------------------------Referral Reasons – Trailer Start-----------
	if(row.Are_there_any_modifications_to_the_trailer_ie_Addition_of_permanently_installed_solar_panels == "Yes" && row.select_the_modification_trailer_type == "Solar panels" && row.Are_the_solar_panels_factory_dealer_installed == "No" && row.This_insurance_policy_does_not_cover_aftermarket_solar_panels_or_any_damage_arising_from_the_insta == "No")
	{
		alert "This choice triggers a referral";
		row.Referalselect_the_modification_trailer_type=true;
	}
	else
	{
		row.Referalselect_the_modification_trailer_type=false;
	}
	