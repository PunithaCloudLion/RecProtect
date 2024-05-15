void Migration.fieldDataTypeUpdationTrailer()
{
	trailerMigration = Trailer_Migration[Migrated1 == true] range from 2601 to 2800;
	c = 0;
	for each  rec in trailerMigration
	{
		c = c + 1;
		getTrailerQuote = TrailerQuote[ID == rec.Trailer_Quote_Creator_ID.toLong()];
		additionalName = 0;
		for each  recAdditionalName in getTrailerQuote.Additional_Names
		{
			if(recAdditionalName.First_Name != "" || recAdditionalName.First_Name != "")
			{
				additionalName = additionalName + 1;
			}
		}
		if(additionalName > 0)
		{
			getTrailerQuote.Are_there_any_additional_names_on_the_trailer_ownership="Yes";
		}
		else
		{
			getTrailerQuote.Are_there_any_additional_names_on_the_trailer_ownership="No";
		}
		getTrailer = Trailer[ID == rec.Trailer_subform_Creator_ID.toLong()];
		if(rec.Are_you_the_original_owner_of_the_trailer == "Yes" || rec.Are_you_the_original_owner_of_the_trailer == "true")
		{
			getTrailer.Are_you_the_original_owner_of_the_trailer="Yes";
		}
		else if(rec.Are_you_the_original_owner_of_the_trailer == "No" || rec.Are_you_the_original_owner_of_the_trailer == "false")
		{
			getTrailer.Are_you_the_original_owner_of_the_trailer="No";
		}
		getTrailer.Is_your_trailer_parked_within_500_feet_of_a_body_of_water=if(rec.Is_your_trailer_parked_within_500_feet_of_a_body_of_water == true,"Yes","No");
		getTrailer.Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground=if(rec.Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground == true,"Yes","No");
		getTrailer.Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground=if(rec.Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground == true,"Yes","No");
		getTrailer.Do_you_have_a_deck=if(rec.Do_you_have_a_deck == true,"Yes","No");
		getTrailer.Do_you_have_a_screened_in_room_or_a_Florida_room=if(rec.Do_you_have_an_additional_room_or_structure == true,"Yes","No");
		getTrailer.Would_you_like_to_insure_a_golf_cart=if(rec.Would_you_like_to_Insure_a_Golf_Cart == true,"Yes","No");
		getTrailer.Do_you_live_in_the_trailer_full_time_all_year_round_as_a_principal_residence=if(rec.Do_you_live_in_the_trailer_full_time_all_year_round_as_a_principal_residence == true,"Yes","No");
		getTrailer.Is_the_unit_used_strictly_for_pleasure_purposes_with_no_rental_or_business_use_of_any_kind=if(rec.Is_the_unit_used_strictly_for_pleasure_purposes_with_no_rental_or_business_use_of_any_kind == true,"Yes","No");
		getTrailer.Is_there_any_heating_that_wasn_t_factory_installed_wood_stove_pellet_stove_etc=if(rec.Is_there_any_heating_that_wasn_t_factory_installed_wood_stove_space_heater_etc == true,"Yes","No");
		getTrailer.Is_this_a_dual_purpose_trailer_toy_hauler_horse_trailer=if(rec.Is_this_a_dual_purpose_trailer_toy_hauler_horse_trailer == true,"Yes","No");
		getTrailer.Are_there_any_modifications_to_the_trailer_ie_Addition_of_permanently_installed_solar_panels=if(rec.Are_there_any_modifications_to_the_trailer_ie_Addition_of_permanently_installed_solar_panels == true,"Yes","No");
		getTrailer.Is_there_any_pre_existing_damage_on_the_trailer=if(rec.Is_there_any_pre_existing_damage_on_the_trailer == true,"Yes","No");
		getTrailer.Is_the_trailer_motorized_and_able_to_travel_on_its_own_without_a_towing_vehicle=if(rec.Is_the_trailer_motorized_and_able_to_travel_on_its_own_without_a_towing_vehicle == true,"Yes","No");
	}
	info c;
}