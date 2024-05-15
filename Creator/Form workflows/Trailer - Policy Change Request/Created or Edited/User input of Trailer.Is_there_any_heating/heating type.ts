if(row.Is_there_any_heating_that_wasn_t_factory_installed_wood_stove_pellet_stove_etc == "Yes")
	{
		show row.Heating_Type;
	}
	else
	{
		hide row.Heating_Type;
		row.Heating_Type=null;
		row.Referral_Is_there_any_heating=false;
		//---------referral section ----
		// 	hide row.Referral_Status;
		// 	hide row.Referral_Actual_cash_value;
		// 	hide row.Referral_Is_this_a_dual_purpose_trailer;
		// 	hide row.Referral_Replacement_cost;
		// 	hide row.Referral_Is_there_any_pre_existing_damage_on_the_trailer;
		// 	hide row.Referral_Reason;
		// 	hide row.Referral_Golf_cart;
		// 	hide row.Referral_Are_the_Solar_panels;
		// 	hide row.Referral_Are_the_any_modificationa_to_trailer;
		// 	hide row.Referral_Do_you_live_in_the_trailer;
		// 	hide row.Referral_business_use_of_any_kind;
		// 	hide row.Referral_Is_the_trailer_taken_into_USA;
		// 	hide row.Referral_Is_the_trailer_motorized;
		// 	hide row.Referral_Is_there_any_heating;
		// 	hide row.Referral_Section;
	}
	//-------------------------Referral Reasons – Trailer Start-----------
	if(row.Is_there_any_heating_that_wasn_t_factory_installed_wood_stove_pellet_stove_etc == "Yes")
	{
		if(row.Heating_Type != "Electric space heater" && row.Heating_Type != "" && row.Heating_Type != null)
		{
			alert "This choice triggers a referral";
			row.Referral_Is_there_any_heating=true;
			// 		show row.Referral_Status;
			// 		show row.Referral_Actual_cash_value;
			// 		show row.Referral_Is_this_a_dual_purpose_trailer;
			// 		show row.Referral_Replacement_cost;
			// 		show row.Referral_Is_there_any_pre_existing_damage_on_the_trailer;
			// 		show row.Referral_Reason;
			// 		show row.Referral_Golf_cart;
			// 		show row.Referral_Are_the_Solar_panels;
			// 		show row.Referral_Are_the_any_modificationa_to_trailer;
			// 		show row.Referral_Do_you_live_in_the_trailer;
			// 		show row.Referral_business_use_of_any_kind;
			// 		show row.Referral_Is_the_trailer_taken_into_USA;
			// 		show row.Referral_Is_the_trailer_motorized;
			// 		show row.Referral_Is_there_any_heating;
			// 		show row.Referral_Section;
		}
		else
		{
			row.Referral_Is_there_any_heating=false;
			//---------referral section ----
			// 		hide row.Referral_Status;
			// 		hide row.Referral_Actual_cash_value;
			// 		hide row.Referral_Is_this_a_dual_purpose_trailer;
			// 		hide row.Referral_Replacement_cost;
			// 		hide row.Referral_Is_there_any_pre_existing_damage_on_the_trailer;
			// 		hide row.Referral_Reason;
			// 		hide row.Referral_Golf_cart;
			// 		hide row.Referral_Are_the_Solar_panels;
			// 		hide row.Referral_Are_the_any_modificationa_to_trailer;
			// 		hide row.Referral_Do_you_live_in_the_trailer;
			// 		hide row.Referral_business_use_of_any_kind;
			// 		hide row.Referral_Is_the_trailer_taken_into_USA;
			// 		hide row.Referral_Is_the_trailer_motorized;
			// 		hide row.Referral_Is_there_any_heating;
			// 		hide row.Referral_Section;
		}
	}
	//-------------------------Referral Reasons – Trailer End-----------
	