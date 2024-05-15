if(input.Source == "CREATOR")
	{
		if(input.Save_as_Draft == true)
		{
			if(input.Customer_ID == null)
			{
				if(input.Insured_First_Name == null || input.Insured_First_Name == "" || input.Insured_Last_Name == null || input.Insured_Last_Name == "" || input.Email == "" || input.Email == null || input.Phone_Number == null || input.Phone_Number == "" || input.Date_of_Birth == null || input.Where_Did_You_Find_Us == "" || input.Where_Did_You_Find_Us == null)
				{
					alert "Insured Deatils Should not be Empty";
					cancel submit;
				}
			}
		}
		else
		{
			if(input.Quote_Status == "Saved")
			{
				input.Quote_Status = "In Progress";
			}
			if(input.Agree_to_terms_and_conditions == false)
			{
				alert "Please Select the Agree to terms and conditions";
				cancel submit;
			}
			if(input.Customer_ID == null)
			{
				if(input.Insured_First_Name == null || input.Insured_First_Name == "" || input.Insured_Last_Name == null || input.Insured_Last_Name == "" || input.Email == "" || input.Email == null)
				{
					alert "Insured Deatils Should not be Empty";
					cancel submit;
				}
			}
			if(input.Are_there_any_additional_names_on_the_boat_ownership == "Yes")
			{
				addcount = 0;
				for each  eachcustomer in input.Additional_Names
				{
					addcount = addcount + 1;
				}
				if(addcount == 0)
				{
					alert "Please give the Additional names atleast one";
					cancel submit;
				}
			}
			if(input.Additional_Names != null)
			{
				for each  customers in input.Additional_Names
				{
					if(customers.Customer_ID == null && customers.Additional_Insured_First_Name == null)
					{
						alert "Please Enter Additional insured First Name for ";
						cancel submit;
					}
				}
			}
			count = 0;
			if(input.Boat != null)
			{
				for each  boatSubform in input.Boat
				{
					count = count + 1;
				}
			}
			if(input.Please_select_the_province_your_boat_is_used_in == "" || input.Please_select_the_province_your_boat_is_used_in == null)
			{
				alert(Please_select_the_province_your_boat_is_used_in,"Please enter the value");
				cancel submit;
			}
			if(input.How_many_boats_would_you_like_to_insure == "" || input.How_many_boats_would_you_like_to_insure == null)
			{
				alert(How_many_boats_would_you_like_to_insure,"Please enter the value");
				cancel submit;
			}
			if(input.How_many_boats_would_you_like_to_insure == "1" && count > 1)
			{
				alert "Sorry but only 1 row allowed in Boat";
				cancel submit;
			}
			else if(input.How_many_boats_would_you_like_to_insure == "2" && count > 2)
			{
				alert "Sorry but only 2 row allowed in Boat";
				cancel submit;
			}
			else if(input.How_many_boats_would_you_like_to_insure == "3" && count > 3)
			{
				alert "Sorry but only 3 row allowed in Boat";
				cancel submit;
			}
			else if(input.How_many_boats_would_you_like_to_insure == "4" && count > 4)
			{
				alert "Sorry but only 4 row allowed in Boat";
				cancel submit;
			}
			else if(input.How_many_boats_would_you_like_to_insure == "5" && count > 5)
			{
				alert "Sorry but only 5 row allowed in Boat";
				cancel submit;
			}
			if(input.Insured_First_Name == "")
			{
				alert "Please Enter Insured First Name";
				cancel submit;
			}
			if(input.Insured_Last_Name == "")
			{
				alert "Please Enter Insured Last Name";
				cancel submit;
			}
			if(input.Boat != null)
			{
				for each  boatSubform in input.Boat
				{
					if(boatSubform.Select_the_type_of_watercraft == null)
					{
						alert "Please Select the type of watercraft";
						cancel submit;
					}
					if(boatSubform.Boat_Model_Year == null)
					{
						alert "Please Select Boat Model Year";
						cancel submit;
					}
					if(boatSubform.Boat_Model == "")
					{
						alert "Please Enter Boat Model";
						cancel submit;
					}
					// 		if(boatSubform.Actual_Cash_Value == null)
					// 		{
					// 			alert "Please Enter Actual Cash Value";
					// 			cancel submit;
					// 		}
					// 		if(boatSubform.Boat_Model_Year != null)
					// 		{
					// 			if(boatSubform.Replacement_Cost == null)
					// 			{
					// 				alert "Please Enter Replacement Cost";
					// 				cancel submit;
					// 			}
					// 		}
					// 		if(boatSubform.Principal_operator_s_years_of_boating_experience_with_vessels_of_a_similar_size_and_type == null)
					// 		{
					// 			alert "Please Select Principal operator years of boating ecperience";
					// 			cancel submit;
					// 		}
					// 		if ( boatSubform.Does_the_operator_hold_a_Pleasure_Craft_Operator_s_Card_PCOC == false ) 
					//         {
					// 			alert "Please Select Does the operator hold a pleaseure craft operator card pcoc" ;
					// 			cancel submit;
					//         }
					// 		if(boatSubform.Is_the_Principal_Operator_the_same_as_the_Applicant_Owner == false)
					// 		{
					// 			if(boatSubform.First_Name == "")
					// 			{
					// 				alert "Please Enter First Name";
					// 				cancel submit;
					// 			}
					// 			if(boatSubform.Last_Name == "")
					// 			{
					// 				alert "Please Enter Last Name";
					// 				cancel submit;
					// 			}
					// 			if(boatSubform.Date_of_Birth == null)
					// 			{
					// 				alert "Please Enter Date of birth";
					// 				cancel submit;
					// 			}
					// 		}
					// 		if(boatSubform.Has_the_principal_operator_had_their_driver_s_license_suspended == true)
					// 		{
					// 			if(boatSubform.When == "")
					// 			{
					// 				alert "Please Enter When";
					// 				cancel submit;
					// 			}
					// 		}
					// 		if(boatSubform.Has_the_principal_operator_had_any_motor_vehicle_claims_in_the_last_5_years == true)
					// 		{
					// 			if(boatSubform.How_many_motor_vehicle_claims == "")
					// 			{
					// 				alert "Please Enter How many motor claims";
					// 				cancel submit;
					// 			}
					// 		}
					// 		if(boatSubform.Has_the_principal_operator_had_any_motor_vehicle_convictions_in_the_last_3_years == true)
					// 		{
					// 			if(boatSubform.How_many_motor_vehicle_convictions == "")
					// 			{
					// 				alert "Please Enter How many motor vehicle convictions";
					// 				cancel submit;
					// 			}
					// 		}
					// 		if(boatSubform.Hull_ID_Serial == "")
					// 		{
					// 			alert "Please enter Hull ID Serial";
					// 			cancel submit;
					// 		}
					// 		if(boatSubform.Lengths == null)
					// 		{
					// 			alert "Please Enter Length";
					// 			cancel submit;
					// 		}
					// 		if(boatSubform.Estimated_max_speed == null)
					// 		{
					// 			alert "Please Enter Estimated max speed";
					// 			cancel submit;
					// 		}
					// 		if(boatSubform.Manufacturer == "")
					// 		{
					// 			alert "Please Enter Manufacturer";
					// 			cancel submit;
					// 		}
					// 		if(boatSubform.Serial == "")
					// 		{
					// 			alert "Please enter serial";
					// 			cancel submit;
					// 		}
					// 		if(boatSubform.Horsepower == null)
					// 		{
					// 			alert "Please Enter Horsepower";
					// 			cancel submit;
					// 		}
					// 		if(boatSubform.Add_a_trailer == true)
					// 		{
					// 			if(boatSubform.Trailer_Length == null)
					// 			{
					// 				alert "Please Enter Trailer Length";
					// 				cancel submit;
					// 			}
					// 			if(boatSubform.Trailer_Value == null)
					// 			{
					// 				alert "Please Enter Trailer Value";
					// 				cancel submit;
					// 			}
					// 			if(boatSubform.Trailer_Model_Year == null)
					// 			{
					// 				alert "Please Enter Trailer Model Year";
					// 				cancel submit;
					// 			}
					// 			if(boatSubform.Trailer_Manufacturer == "")
					// 			{
					// 				alert "Please Enter Trailer Manufacturer";
					// 				cancel submit;
					// 			}
					// 			if(boatSubform.Trailer_VIN == "")
					// 			{
					// 				alert "Please Enter Trailer VIN";
					// 				cancel submit;
					// 			}
					// 		}
					// 		if(boatSubform.Add_a_tender == true)
					// 		{
					// 			if(boatSubform.Tender_Length == null)
					// 			{
					// 				alert "Please Enter Tender Length";
					// 				cancel submit;
					// 			}
					// 			if(boatSubform.Tender_Value == null)
					// 			{
					// 				alert "Please Enter Tender Value";
					// 				cancel submit;
					// 			}
					// 			if(boatSubform.Tender_Model_Year == null)
					// 			{
					// 				alert "Please Enter Tender Model Year";
					// 				cancel submit;
					// 			}
					// 			if(boatSubform.Tender_Manufacturer == "")
					// 			{
					// 				alert "Please Enter Tender Manufacturer";
					// 				cancel submit;
					// 			}
					// 			if(boatSubform.Tender_Serial == "")
					// 			{
					// 				alert "Please Enter Tender Serial";
					// 				cancel submit;
					// 			}
					// 		}
					// 		if(boatSubform.Add_an_auxiliary_motor == true)
					// 		{
					// 			if(boatSubform.Aux_Engine_Value == null)
					// 			{
					// 				alert "Please Enter Aux Engine Value";
					// 				cancel submit;
					// 			}
					// 			if(boatSubform.Aux_Engine_HP_Thrust == null)
					// 			{
					// 				alert "Please Enter Aux Engine HP trust";
					// 				cancel submit;
					// 			}
					// 			if(boatSubform.Aux_Engine_Model_Year == null)
					// 			{
					// 				alert "Please Enter Aux Engine Model Year";
					// 				cancel submit;
					// 			}
					// 			if(boatSubform.Aux_Engine_Manufacturer == "")
					// 			{
					// 				alert "Please Enter Aux Engine Manufacturer";
					// 				cancel submit;
					// 			}
					// 			if(boatSubform.Auxiliary_Engine_Serial == "")
					// 			{
					// 				alert "Please Enter Aux Engine Serial";
					// 				cancel submit;
					// 			}
					// 		}
					// 		if(boatSubform.Is_this_boat_financed == true)
					// 		{
					// 			if(boatSubform.Select_a_Financier == "")
					// 			{
					// 				alert "Please Select Leinholder";
					// 				cancel submit;
					// 			}
					// 			if(boatSubform.Select_a_Financier == "Others")
					// 			{
					// 				if(boatSubform.Address_line1 == "")
					// 				{
					// 					alert "Please Enter AddressLine1";
					// 					cancel submit;
					// 				}
					// 				if(boatSubform.Address_line2 == "")
					// 				{
					// 					alert "Please Enter AddressLine2";
					// 					cancel submit;
					// 				}
					// 				if(boatSubform.City == "")
					// 				{
					// 					alert "Please Enter City";
					// 					cancel submit;
					// 				}
					// 				if(boatSubform.Province == "")
					// 				{
					// 					alert "Please Enter Province";
					// 					cancel submit;
					// 				}
					// 				if(boatSubform.Postal_Code == "")
					// 				{
					// 					alert "Please Enter Postal Code";
					// 					cancel submit;
					// 				}
					// 				if(boatSubform.Country == "")
					// 				{
					// 					alert "Please Enter Country";
					// 					cancel submit;
					// 				}
					//			}
					//		}
				}
			}
		}
	}
	