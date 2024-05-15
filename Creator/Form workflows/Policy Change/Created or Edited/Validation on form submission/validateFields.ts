if(input.Where_was_the_new_trailer_purchased_from == "Dealer")
    {
        if(input.Dealer_Info == "")
        {
            alert "Please Enter Dealer Info";
            cancel submit;
        }
    }
    if(input.Where_was_the_new_boat_purchased_from == "Dealer")
    {
        if(input.Dealer_Info == "")
        {
            alert "Please Enter Dealer Info";
            cancel submit;
        }
    }
    if(input.Type_field == "Trailer")
    {
        if(input.Change_Request_Type == "Trailer Substitution")
        {
            if(input.Effective_Date == null)
            {
                alert "Please Enter Effective Date";
                cancel submit;
            }
            if(input.Trailer_Coming_off_Reason == null)
            {
                alert "Please Enter Trailer coming off reason";
                cancel submit;
            }
            if(input.Where_was_the_new_trailer_purchased_from == null)
            {
                alert "Please Enter Where was the new trailer";
                cancel submit;
            }
            if(input.New_Trailers_Manufacturer == "")
            {
                alert "Please Enter new trailer manufacturer";
                cancel submit;
            }
            if(input.New_Trailers_Year == null)
            {
                alert "Please Enter New Trailer year";
                cancel submit;
            }
            if(input.New_Trailers_Model == null)
            {
                alert "Please Enter New Trailer Mode";
                cancel submit;
            }
            if(input.Trailer_Type == null)
            {
                alert "Please Enter  Trailer Type";
                cancel submit;
            }
            if(input.Trailer_Length == null)
            {
                alert "Please Enter  Trailer Length";
                cancel submit;
            }
            if(input.Trailer_width == null)
            {
                alert "Please Enter  Trailer Width";
                cancel submit;
            }
            if(input.VIN == null)
            {
                alert "Please Enter Vin";
                cancel submit;
            }
            if(input.Value == null)
            {
                alert "Please Enter Value";
                cancel submit;
            }
            if(input.Is_your_trailer_financed == "")
            {
                alert "Please Enter IS you Trailer Financed";
                cancel submit;
            }
            if(input.Lien_Holder_Address == "")
            {
                alert "Please Enter Lien Holder Address";
                cancel submit;
            }
            // 		if(input.Is_this_trailer_permanently_parked == false)
            // 		{
            // 			alert "Please Enter IS you Trailer Permanently Parked";
            // 			cancel submit;
            // 		}
            if(input.Park_Name == "")
            {
                alert "Please Enter Park";
                cancel submit;
            }
            if(input.Park_Address == "")
            {
                alert "Please Enter Park Address";
                cancel submit;
            }
            if(input.Site_Number == "")
            {
                alert "Please Enter Site Number";
                cancel submit;
            }
            if(input.Screened_in_room_Florida_room_length == null)
            {
                alert "Please Enter Screen in room in Florida room Length";
                cancel submit;
            }
            if(input.Screened_in_room_Florida_room_width == null)
            {
                alert "Please Enter Screen in room in Florida room Width";
                cancel submit;
            }
            if(input.Deck_Length_Ft == null)
            {
                alert "Please Enter Deck Length Ft";
                cancel submit;
            }
            if(input.Deck_Width_Ft == null)
            {
                alert "Please Enter Deck Width Ft";
                cancel submit;
            }
            if(input.Hard_Awning_Length == null)
            {
                alert "Please Enter Hard Awing Length";
                cancel submit;
            }
            if(input.Hard_Awning_Width == null)
            {
                alert "Please Enter Hard Awning Width";
                cancel submit;
            }
            // 		if(input.Add_a_golf_Cart == false)
            // 		{
            // 			alert "Please Enter Add a Golf Cart";
            // 			cancel submit;
            // 		}
            if(input.Golf_Cart_Value == null)
            {
                alert "Please Enter Golf Cart Value";
                cancel submit;
            }
            // 		if(input.Is_the_site_within_500ft_of_a_body_of_water == false)
            // 		{
            // 			alert "Please Enter IS the Site within 500ft of a body water";
            // 			cancel submit;
            // 		}
            // 		if(input.Eligible_for_WPP == false)
            // 		{
            // 			alert "Please Enter Eligible for WPP";
            // 			cancel submit;
            // 		}
            // 		if(input.Business_Rental_Exposure == false)
            // 		{
            // 			alert "Please Enter Business Rental Exposure";
            // 			cancel submit;
            // 		}
            // 		if(input.Less_than_90_days_US_Expoure == false)
            // 		{
            // 			alert "Please Enter Less than 90 days of us Expoure";
            // 			cancel submit;
            // 		}
            if(input.Coverages == null && input.Coverages == "")
            {
                alert "Please Enter Coverages";
                cancel submit;
            }
            if(input.X_Sell == null)
            {
                alert "Please Enter x-shell";
                cancel submit;
            }
            if(input.Highlights_Comments == null)
            {
                alert "Please Enter Highlights/Comments";
                cancel submit;
            }
        }
        if(input.Change_Request_Type == "Add Golf Cart")
        {
            if(input.Effective_Date == null)
            {
                alert "Please Enter Effective Date";
                cancel submit;
            }
            if(input.Value == null)
            {
                alert "Please Enter Value";
                cancel submit;
            }
            // 		if(input.X_Sell == false)
            // 		{
            // 			alert "Please Enter x-shell";
            // 			cancel submit;
            // 		}
            if(input.Highlights_Comments == "")
            {
                alert "Please Enter Highlights/Comments";
                cancel submit;
            }
        }
        if(input.Change_Request_Type == "Amend Risk Location")
        {
            if(input.Effective_Date == null)
            {
                alert "Please Enter Effective Date";
                cancel submit;
            }
            if(input.Site == "")
            {
                alert "Please Enter Site#";
                cancel submit;
            }
            if(input.New_Park_Name == "")
            {
                alert "Please Enter New Park Name";
                cancel submit;
            }
            if(input.New_Park_Address == "")
            {
                alert "Please Enter New Park Address";
                cancel submit;
            }
            if(input.Screened_in_room_Florida_room_length == null)
            {
                alert "Please Enter Screen in room in Florida room Length";
                cancel submit;
            }
            if(input.Screened_in_room_Florida_room_width == null)
            {
                alert "Please Enter Screen in room in Florida room Width";
                cancel submit;
            }
            if(input.Deck_Length_Ft == null)
            {
                alert "Please Enter Deck Length Ft";
                cancel submit;
            }
            if(input.Deck_Width_Ft == null)
            {
                alert "Please Enter Deck Width Ft";
                cancel submit;
            }
            if(input.Hard_Awning_Length == null)
            {
                alert "Please Enter Hard Awing Length";
                cancel submit;
            }
            if(input.Hard_Awning_Width == null)
            {
                alert "Please Enter Hard Awning Width";
                cancel submit;
            }
            // 		if(input.X_Sell == false)
            // 		{
            // 			alert "Please Enter x-shell";
            // 			cancel submit;
            // 		}
            if(input.Highlights_Comments == "")
            {
                alert "Please Enter Highlights/Comments";
                cancel submit;
            }
            // 		if(input.Is_the_site_within_500ft_of_a_body_of_water == false)
            // 		{
            // 			alert "Please Enter IS the Site within 500ft of a body of water ";
            // 			cancel submit;
            // 		}
        }
        if(input.Change_Request_Type == "Amend Mailing Location")
        {
            if(input.Effective_Date == null)
            {
                alert "Please Enter Effective Date";
                cancel submit;
            }
            // 		if(input.X_Sell == false)
            // 		{
            // 			alert "Please Enter x-shell";
            // 			cancel submit;
            // 		}
            if(input.Highlights_Comments == "")
            {
                alert "Please Enter Highlights/Comments";
                cancel submit;
            }
            if(input.New_Mailing_Address == "")
            {
                alert "Please Enter New Mailing Address";
                cancel submit;
            }
            // 		if(input.Confirmed_Trailer_address == false)
            // 		{
            // 			alert "Please Enter Confirmed Trailer Address";
            // 			cancel submit;
            // 		}
        }
        if(input.Change_Request_Type == "Trailer Addition")
        {
            if(input.Effective_Date == null)
            {
                alert "Please Enter Effective Date";
                cancel submit;
            }
            if(input.Trailer_Coming_off_Reason == null)
            {
                alert "Please Enter Trailer coming off reason";
                cancel submit;
            }
            if(input.Where_was_the_new_trailer_purchased_from == null)
            {
                alert "Please Enter Where was the new trailer";
                cancel submit;
            }
            if(input.New_Trailer_Make == "")
            {
                alert "Please Enter new trailer make";
                cancel submit;
            }
            if(input.New_Trailers_Year == null)
            {
                alert "Please Enter New Trailer year";
                cancel submit;
            }
            if(input.New_Trailers_Model == "")
            {
                alert "Please Enter New Trailer Mode";
                cancel submit;
            }
            if(input.Trailer_Type == null)
            {
                alert "Please Enter  Trailer Type";
                cancel submit;
            }
            if(input.Trailer_Length == null)
            {
                alert "Please Enter  Trailer Length";
                cancel submit;
            }
            if(input.Trailer_width == null)
            {
                alert "Please Enter  Trailer Width";
                cancel submit;
            }
            if(input.VIN == null)
            {
                alert "Please Enter Vin";
                cancel submit;
            }
            if(input.Value == null)
            {
                alert "Please Enter Value";
                cancel submit;
            }
            if(input.Is_your_trailer_financed == "")
            {
                alert "Please Enter IS you Trailer Financed";
                cancel submit;
            }
            if(input.Lien_Holder_Address == null || input.Lien_Holder_Address == "")
            {
                alert "Please Enter Lien Holder Address";
                cancel submit;
            }
            // 		if(input.Is_this_trailer_permanently_parked == false)
            // 		{
            // 			alert "Please Enter IS you Trailer Permanently Parked";
            // 			cancel submit;
            // 		}
            if(input.Park_Name == "")
            {
                alert "Please Enter Park";
                cancel submit;
            }
            if(input.Park_Address == "")
            {
                alert "Please Enter Park Address";
                cancel submit;
            }
            if(input.Site_Number == "")
            {
                alert "Please Enter Site Number";
                cancel submit;
            }
            if(input.Add_a_room_Length == null)
            {
                alert "Please Enter Add a Room Length";
                cancel submit;
            }
            if(input.Add_a_room_Width == null)
            {
                alert "Please Enter Add a Room Width";
                cancel submit;
            }
            // 		if(input.Add_a_golf_Cart == false)
            // 		{
            // 			alert "Please Enter Add a Golf Cart";
            // 			cancel submit;
            // 		}
            if(input.Golf_Cart_Value == null)
            {
                alert "Please Enter Golf Cart Value";
                cancel submit;
            }
            // 		if(input.Is_the_site_within_500ft_of_a_body_of_water == false)
            // 		{
            // 			alert "Please Enter IS the Site within 500ft of a body water";
            // 			cancel submit;
            // 		}
            // 		if(input.Eligible_for_WPP == false)
            // 		{
            // 			alert "Please Enter Eligible for WPP";
            // 			cancel submit;
            // 		}
            // 		if(input.Business_Rental_Exposure == false)
            // 		{
            // 			alert "Please Enter Business Rental Exposure";
            // 			cancel submit;
            // 		}
            // 		if(input.Less_than_90_days_US_Expoure == false)
            // 		{
            // 			alert "Please Enter Less than 90 days of us Expoure";
            // 			cancel submit;
            // 		}
            if(input.Coverages == null || input.Coverages == "")
            {
                alert "Please Enter Coverages";
                cancel submit;
            }
            // 		if(input.X_Sell == false)
            // 		{
            // 			alert "Please Enter x-shell";
            // 			cancel submit;
            // 		}
        }
        if(input.Change_Request_Type == "Add Snow Bird")
        {
            if(input.Effective_Date == null)
            {
                alert "Please Enter Effective Date";
                cancel submit;
            }
            // 		if(input.Do_you_live_in_the_trailer_full_time_all_year_round_as_a_principal_residence == false)
            // 		{
            // 			alert "Please Enter Do you live";
            // 			cancel submit;
            // 		}
            if(input.Non_Domestic_Address == "")
            {
                alert "Please Enter Non Domestic Address";
                cancel submit;
            }
            // 		if(input.Add_Snowbird_Endorsement == false)
            // 		{
            // 			alert "Please Enter Add Snowbird Endorsement";
            // 			cancel submit;
            // 		}
        }
    }
    if(input.Type_field == "Boat")
    {
        if(input.Change_Request_Type == "Boat Substitution")
        {
            if(input.Effective_Date == null)
            {
                alert "Please Enter Effective Date";
                cancel submit;
            }
            if(input.Boat_coming_off_reason == null)
            {
                alert "Please enter Boat Coming off reason";
                cancel submit;
            }
            if(input.Where_was_the_new_boat_purchased_from == null)
            {
                alert "Please enter Where was the new Boat purchased";
                cancel submit;
            }
            if(input.Boat_type == null)
            {
                alert "Please Enter Boat Type";
                cancel submit;
            }
            if(input.New_Boats_Year == null)
            {
                alert "Please Enter New Boat year";
                cancel submit;
            }
            if(input.Boat_Make == "")
            {
                alert "Please Enter Boat make";
                cancel submit;
            }
            if(input.Boat_Model == "")
            {
                alert "Please Enter Boat model";
                cancel submit;
            }
            if(input.Total_Value_boat_motor_s_trailer_tender_inclusive_of_tax == null)
            {
                alert "Please Enter Total Value boat motor";
                cancel submit;
            }
            if(input.Coverages == null)
            {
                alert "Please Enter Coverages";
                cancel submit;
            }
            if(input.What_province_is_the_boat_used_in == null)
            {
                alert "Please Enter What Provinces is boat used";
                cancel submit;
            }
            // 		if(input.Has_the_PO_of_the_boat_changed_Y_N == false)
            // 		{
            // 			alert "Please Enter Has the PO of the Boat changed YN";
            // 			cancel submit;
            // 		}
            // 		if(input.Usage_of_boat_changed_Y_N == false)
            // 		{
            // 			alert "Please Enter usage of boat changed yn";
            // 			cancel submit;
            // 		}
            if(input.Boat_Length == null)
            {
                alert "Please Enter Boat Length";
                cancel submit;
            }
            if(input.Hull_ID_Serial == null)
            {
                alert "Please Enter Hull ID Serial";
                cancel submit;
            }
            if(input.Hull_Type == null)
            {
                alert "Please Enter Hull Type";
                cancel submit;
            }
            if(input.Max_speed_MPH == null)
            {
                alert "Please Enter Max Speed MPH";
                cancel submit;
            }
            if(input.Main_engine_type == null)
            {
                alert "Please Enter Main Engine type";
                cancel submit;
            }
            if(input.Fuel_Type == null)
            {
                alert "Please Enter Fuel Type";
                cancel submit;
            }
            if(input.Engine_model_year == null)
            {
                alert "Please Enter Engine model year";
                cancel submit;
            }
            if(input.Engine_manufacturer == "")
            {
                alert "Please Enter Engine Manufacturer";
                cancel submit;
            }
            if(input.Engine_serial == "")
            {
                alert "Please Enter Engine Serial";
                cancel submit;
            }
            if(input.HP == null)
            {
                alert "Please Enter HP";
                cancel submit;
            }
            // 		if(input.Is_your_boat_financed == false)
            // 		{
            // 			alert "Please Enter Is Your boat Financed";
            // 			cancel submit;
            // 		}
            // 		if(input.Business_Rental_Exposure == false)
            // 		{
            // 			alert "Please Enter Business Rental Exposure";
            // 			cancel submit;
            // 		}
            if(input.X_Sell == null)
            {
                alert "Please Enter x-shell";
                cancel submit;
            }
            if(input.Highlights_Comments == null)
            {
                alert "Please Enter Highlights/Comments";
                cancel submit;
            }
        }
        if(input.Change_Request_Type == "Add Auxillary Engine")
        {
            if(input.Effective_Date == null)
            {
                alert "Please Enter Effective Date";
                cancel submit;
            }
            if(input.Aux_Engine_Value == null)
            {
                alert "Please Enter Aux Engine Value";
                cancel submit;
            }
            if(input.Aux_Engine_Model_Year == null)
            {
                alert "Please Enter Aux Engine Model Year";
                cancel submit;
            }
            if(input.Aux_Engine_Manufacturer == "")
            {
                alert "Please Enter Aux Engine Manufacturer";
                cancel submit;
            }
            if(input.Auxiliary_Engine_Serial == null)
            {
                alert "Please Enter Aux Engine Serial";
                cancel submit;
            }
            if(input.Aux_Engine_HP_Thrust == null)
            {
                alert "Please Enter Aux Engine HP Thurst";
                cancel submit;
            }
            if(input.New_value_insured_for_boat_motor_s_trailer_tender_inclusive_of_tax == null)
            {
                alert "Please Enter New value insured for boat motor";
                cancel submit;
            }
            // 		if(input.X_Sell == false)
            // 		{
            // 			alert "Please Enter x-shell";
            // 			cancel submit;
            // 		}
            if(input.Highlights_Comments == "")
            {
                alert "Please Enter Highlights/Comments";
                cancel submit;
            }
        }
        if(input.Change_Request_Type == "Add Tender")
        {
            if(input.Effective_Date == null)
            {
                alert "Please Enter Effective Date";
                cancel submit;
            }
            if(input.Tender_Value == null)
            {
                alert "Please Enter Tender Value";
                cancel submit;
            }
            if(input.Tender_Model_Year == null)
            {
                alert "Please Enter Tender Model Year";
                cancel submit;
            }
            if(input.Tender_Manufacturer == "")
            {
                alert "Please Enter Tender Manufacturer";
                cancel submit;
            }
            if(input.Tender_Serial == null)
            {
                alert "Please Enter Tender Serial";
                cancel submit;
            }
            if(input.Tender_Length == null)
            {
                alert "Please Enter Tender Length";
                cancel submit;
            }
            if(input.New_value_insured_for_boat_motor_s_trailer_tender_inclusive_of_tax == null)
            {
                alert "Please Enter New Value insured for boat mototrs";
                cancel submit;
            }
            // 		if(input.X_Sell == false)
            // 		{
            // 			alert "Please Enter Xshell";
            // 			cancel submit;
            // 		}
            if(input.Highlights_Comments == "")
            {
                alert "Please Enter Highlights Comments";
                cancel submit;
            }
            if(input.What_Iam_Waiting_for == "")
            {
                alert "Please Enter What Iam Waiting For";
                cancel submit;
            }
        }
        if(input.Change_Request_Type == "Add Boat Trailer")
        {
            if(input.Effective_Date == null)
            {
                alert "Please Enter Effective Date";
                cancel submit;
            }
            if(input.Trailer_Model_Year == null)
            {
                alert "Please Enter Trailer Model Year";
                cancel submit;
            }
            if(input.Trailer_Manufacturer == "")
            {
                alert "Please Enter Trailer manufacturer";
                cancel submit;
            }
            if(input.Trailer_VIN == null)
            {
                alert "Please Enter Trailer VIN";
                cancel submit;
            }
            if(input.Trailer_Length == null)
            {
                alert "Please Enter Trailer Length";
                cancel submit;
            }
            if(input.New_value_insured_for_boat_motor_s_trailer_tender_inclusive_of_tax == null)
            {
                alert "Please Enter New Value insured for boat mototrs";
                cancel submit;
            }
            // 		if(input.X_Sell == false)
            // 		{
            // 			alert "Please Enter Xshell";
            // 			cancel submit;
            // 		}
            if(input.Highlights_Comments == "")
            {
                alert "Please Enter Highlights Comments";
                cancel submit;
            }
        }
        if(input.Change_Request_Type == "Add Boat")
        {
            if(input.Effective_Date == null)
            {
                alert "Please Enter Effective Date";
                cancel submit;
            }
            if(input.Where_was_the_new_boat_purchased_from == null)
            {
                alert "Please enter Where was the new Boat purchased";
                cancel submit;
            }
            if(input.Boat_type == null)
            {
                alert "Please Enter Boat Type";
                cancel submit;
            }
            if(input.New_Boats_Year == null)
            {
                alert "Please Enter New Boat year";
                cancel submit;
            }
            if(input.Boat_Make == "")
            {
                alert "Please Enter Boat make";
                cancel submit;
            }
            if(input.Boat_Model == "")
            {
                alert "Please Enter Boat model";
                cancel submit;
            }
            if(input.Total_Value_boat_motor_s_trailer_tender_inclusive_of_tax == null)
            {
                alert "Please Enter Total Value boat motor";
                cancel submit;
            }
            if(input.Coverages == null)
            {
                alert "Please Enter Coverages";
                cancel submit;
            }
            if(input.What_province_is_the_boat_used_in == null)
            {
                alert "Please Enter What Provinces is boat used";
                cancel submit;
            }
            // 		if(input.Has_the_PO_of_the_boat_changed_Y_N == false)
            // 		{
            // 			alert "Please Enter Has the PO of the Boat changed YN";
            // 			cancel submit;
            // 		}
            // 		if(input.Usage_of_boat_changed_Y_N == false)
            // 		{
            // 			alert "Please Enter usage of boat changed yn";
            // 			cancel submit;
            // 		}
            if(input.Boat_Length == null)
            {
                alert "Please Enter Boat Length";
                cancel submit;
            }
            if(input.Hull_ID_Serial == null)
            {
                alert "Please Enter Hull ID Serial";
                cancel submit;
            }
            if(input.Hull_Type == null)
            {
                alert "Please Enter Hull Type";
                cancel submit;
            }
            if(input.Max_speed_MPH == null)
            {
                alert "Please Enter Max Speed MPH";
                cancel submit;
            }
            if(input.Main_engine_type == null)
            {
                alert "Please Enter Main Engine type";
                cancel submit;
            }
            if(input.Fuel_Type == null)
            {
                alert "Please Enter Fuel Type";
                cancel submit;
            }
            if(input.Engine_model_year == null)
            {
                alert "Please Enter Engine model year";
                cancel submit;
            }
            if(input.Engine_manufacturer == "")
            {
                alert "Please Enter Engine Manufacturer";
                cancel submit;
            }
            if(input.Engine_serial == "")
            {
                alert "Please Enter Engine Serial";
                cancel submit;
            }
            if(input.HP == null)
            {
                alert "Please Enter HP";
                cancel submit;
            }
            // 		if(input.Is_your_boat_financed == false)
            // 		{
            // 			alert "Please Enter Is Your boat Financed";
            // 			cancel submit;
            // 		}
            // 		if(input.Business_Rental_Exposure == false)
            // 		{
            // 			alert "Please Enter Business Rental Exposure";
            // 			cancel submit;
            // 		}
            // 		if(input.X_Sell == false)
            // 		{
            // 			alert "Please Enter x-shell";
            // 			cancel submit;
            // 		}
            if(input.Highlights_Comments == "")
            {
                alert "Please Enter Highlights/Comments";
                cancel submit;
            }
        }
        if(input.Change_Request_Type == "Change Principal Operator")
        {
            if(input.Effective_Date == null)
            {
                alert "Please Enter Effective Date";
                cancel submit;
            }
            // 		if(input.Has_the_PO_of_the_boat_changed_Y_N == false)
            // 		{
            // 			alert "Please Enter Has the PO of the Boat changed YN";
            // 			cancel submit;
            // 		}
            // 		if(input.X_Sell == false)
            // 		{
            // 			alert "Please Enter x-shell";
            // 			cancel submit;
            // 		}
            if(input.Highlights_Comments == "")
            {
                alert "Please Enter Highlights/Comments";
                cancel submit;
            }
            if(input.Does_the_operator_hold_a_Pleasure_Craft_Operators_Card_PCOC == false)
            {
                alert "Please Select Does the operator hold a pleasure craft operators card PCOC";
                cancel submit;
            }
        }
    }
    