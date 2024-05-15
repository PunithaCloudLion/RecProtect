//--------Mandotary fields alert based on the save as draft false case------------------
//Date: 09/05/2024
//Written By : Arun
msg = "";
newString = ",";
newLine = hexToText("0A");
string = newString + newLine;
msg = msg + string + "The given field value is null, please enter the value";
// if(input.Source == "Creator" && input.Save_as_Draft == false)
// {
// 	if(input.Quote_ID == "")
// 	{
// 		msg = msg + string + "Quote ID";
// 	}
// 	if(input.Quote_ID.startswith("REFREC"))
// 	{
// 	}
// 	else
// 	{
// 		msg = msg + string + "The Quote ID Should Contains";
// 	}
// 	if(input.Carrier == "")
// 	{
// 		msg = msg + string + "Carrier";
// 	}
// 	if(input.Link_Customer == false)
// 	{
// 		msg = msg + string + "Link Customer";
// 	}
// 	if(input.Phone_Number == "")
// 	{
// 		msg = msg + string + "Phone Number";
// 	}
// 	if(input.Date_of_Birth == null)
// 	{
// 		msg = msg + string + "Date of Birth";
// 	}
// 	if(Where_Did_You_Find_Us != null)
// 	{
// 		if(input.Where_Did_You_Find_Us == "Friend or Family")
// 		{
// 			msg = msg + string + "Name of Friend/Family";
// 		}
// 		else if(input.Where_Did_You_Find_Us == "Dealership")
// 		{
// 			msg = msg + string + "Name of Dealership";
// 		}
// 		else if(input.Where_Did_You_Find_Us == "Marina")
// 		{
// 			msg = msg + string + "Name of Marina";
// 		}
// 		else if(input.Where_Did_You_Find_Us == "Other")
// 		{
// 			msg = msg + string + "Tell us more";
// 		}
// 	}
// 	if(input.Are_there_any_additional_names_on_the_trailer_ownership == "Yes")
// 	{
// 		msg = msg + string + "Add atleast 1 row Minimum and Maximum upto 2 rows";
// 	}
// 	if(input.Please_select_the_province_your_trailer_is_located_in == "")
// 	{
// 		msg = msg + string + "Province your trailer is located";
// 	}
// 	if(input.Inception_Date == null)
// 	{
// 		msg = msg + string + "Effective Date";
// 	}
// 	if(input.Country == "")
// 	{
// 		msg = msg + string + "Country";
// 	}
// 	if(input.Address == "")
// 	{
// 		msg = msg + string + "Address";
// 	}
// 	if(input.City == "")
// 	{
// 		msg = msg + string + "City";
// 	}
// 	if(input.Province == "")
// 	{
// 		msg = msg + string + "Province";
// 	}
// 	if(input.Postal_code_ZIP_Code == "")
// 	{
// 		msg = msg + string + "Postal/Zip Code";
// 	}
// 	if(input.Total_Premium_before_tax == null)
// 	{
// 		msg = msg + string + "Total Premium Before Tax";
// 	}
// 	if(input.Tax_Province == "")
// 	{
// 		msg = msg + string + "Tax Province";
// 	}
// 	if(input.Fee == null)
// 	{
// 		msg = msg + string + "Fee";
// 	}
// 	if(input.Tax_Precent == null)
// 	{
// 		msg = msg + string + "Tax Percent";
// 	}
// 	if(input.Total_Tax == null)
// 	{
// 		msg = msg + string + "Total Tax";
// 	}
// 	if(input.Total_Payable_Premium_after_tax == null)
// 	{
// 		msg = msg + string + "Total Payable Premium(after tax)";
// 	}
// 	if(input.Suite_Apt == "")
// 	{
// 		msg = msg + string + "Suite/Apt#";
// 	}
// 	if(input.Agree_to_terms_and_conditions == false)
// 	{
// 		msg = msg + string + "Agree to terms and conditions";
// 	}
// 	if(msg != "")
// 	{
// 		alert "Following details are Missing \n" + msg + "- Please Check and retry";
// 		cancel submit;
// 	}
// }



//Date: 13/05/2024
//Written By : Vignesh - Code Corrections and validation
validation_msg = "";
newString = ",";
newLine = hexToText("0A");
stringN = newString + newLine;
if(input.Source == "Creator")
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
		//--------------Trailer subform row count on save edit
		count = 0;
		if(input.Trailer != null)
		{
			for each  trailerInfo in input.Trailer
			{
				count = count + 1;
			}
		}
		if(input.How_many_trailers_would_you_like_to_insure == "" || input.How_many_trailers_would_you_like_to_insure.isEmpty() == true)
		{
			alert "Please enter the trailer insure count";
			cancel submit;
		}
		if(input.How_many_trailers_would_you_like_to_insure == "1" && count > 1)
		{
			alert "Sorry but only 1 row allowed in Trailer";
			cancel submit;
		}
		if(input.How_many_trailers_would_you_like_to_insure == "2" && count > 2)
		{
			alert "Sorry but only 2 row allowed in Trailer";
			cancel submit;
		}
	}
	else if(input.Save_as_Draft == false)
	{
		// ---------- Basic Validation Code Start here ------
		if(input.Quote_ID == "" || input.Carrier.isEmpty() == true)
		{
			validation_msg = validation_msg + stringN + "Quote ID";
		}
		else
		{
			if(input.Quote_ID.startswith("REFREC") == false)
			{
				validation_msg = validation_msg + stringN + "The Quote ID Should Contains";
			}
		}
		if(input.Carrier == "" || input.Carrier.isEmpty() == true)
		{
			validation_msg = validation_msg + stringN + "Carrier";
		}
		if(input.Insured_First_Name == "" || input.Insured_First_Name.isEmpty() == true)
		{
			validation_msg = validation_msg + stringN + "First Name";
		}
		if(input.Insured_Last_Name == "" || input.Insured_Last_Name.isEmpty() == true)
		{
			validation_msg = validation_msg + stringN + "Last Name";
		}
		if(input.Email == "" || input.Email.isEmpty() == true)
		{
			validation_msg = validation_msg + stringN + "Email";
		}
		if(input.Phone_Number == "" || input.Phone_Number.isEmpty() == true)
		{
			validation_msg = validation_msg + stringN + "Phone Number";
		}
		if(input.Date_of_Birth == null)
		{
			validation_msg = validation_msg + stringN + "Date of Birth";
		}
		if(input.Where_Did_You_Find_Us != null && input.Where_Did_You_Find_Us.isEmpty() == false)
		{
			if(input.Where_Did_You_Find_Us == "Friend or Family")
			{
				validation_msg = validation_msg + stringN + "Name of Friend/Family";
			}
			else if(input.Where_Did_You_Find_Us == "Dealership")
			{
				validation_msg = validation_msg + stringN + "Name of Dealership";
			}
			else if(input.Where_Did_You_Find_Us == "Marina")
			{
				validation_msg = validation_msg + stringN + "Name of Marina";
			}
			else if(input.Where_Did_You_Find_Us == "Other")
			{
				validation_msg = validation_msg + stringN + "Tell us more";
			}
		}
		else
		{
			validation_msg = validation_msg + stringN + "Where did you find us";
		}
		if(input.Are_there_any_additional_names_on_the_trailer_ownership == "Yes" || input.Are_there_any_additional_names_on_the_trailer_ownership.isEmpty() == true)
		{
			validation_msg = validation_msg + stringN + "Add atleast 1 row Minimum and Maximum upto 2 rows";
		}
		if(input.Please_select_the_province_your_trailer_is_located_in == "" || input.Please_select_the_province_your_trailer_is_located_in.isEmpty() == true)
		{
			validation_msg = validation_msg + stringN + "Province your trailer is located";
		}
		if(input.Inception_Date == null)
		{
			validation_msg = validation_msg + stringN + "Effective Date";
		}
		if(input.Country == "" || input.Country.isEmpty() == true)
		{
			validation_msg = validation_msg + stringN + "Country";
		}
		if(input.Address == "" || input.Address.isEmpty() == true)
		{
			validation_msg = validation_msg + stringN + "Address";
		}
		if(input.City == "" || input.City.isEmpty() == true)
		{
			validation_msg = validation_msg + stringN + "City";
		}
		if(input.Province == "" || input.Province.isEmpty() == true)
		{
			validation_msg = validation_msg + stringN + "Province";
		}
		if(input.Postal_code_ZIP_Code == "" || input.Postal_code_ZIP_Code.isEmpty() == true)
		{
			validation_msg = validation_msg + stringN + "Postal/Zip Code";
		}
		if(input.Total_Premium_before_tax == null)
		{
			validation_msg = validation_msg + stringN + "Total Premium Before Tax";
		}
		if(input.Tax_Province == "" || input.Tax_Province.isEmpty() == true)
		{
			validation_msg = validation_msg + stringN + "Tax Province";
		}
		if(input.Fee == null)
		{
			validation_msg = validation_msg + stringN + "Fee";
		}
		if(input.Tax_Precent == null)
		{
			validation_msg = validation_msg + stringN + "Tax Percent";
		}
		if(input.Total_Tax == null)
		{
			validation_msg = validation_msg + stringN + "Total Tax";
		}
		if(input.Total_Payable_Premium_after_tax == null)
		{
			validation_msg = validation_msg + stringN + "Total Payable Premium(after tax)";
		}
		if(input.Suite_Apt == "" || input.Suite_Apt.isEmpty() == true)
		{
			validation_msg = validation_msg + stringN + "Suite/Apt#";
		}
		if(input.Agree_to_terms_and_conditions == false)
		{
			validation_msg = validation_msg + stringN + "Agree to terms and conditions";
		}
		// --------- End -------------------------
		if(validation_msg != "")
		{
			validation_msg = "The given field value is null, please enter the value" + stringN + validation_msg;
			alert validation_msg;
			cancel submit;
		}
		else
		{
			if(input.Quote_Status == "Saved")
			{
				input.Quote_Status = "In Progress";
			}
			/// ----- Additional Insured Infromation Section ----------
			if(input.Are_there_any_additional_names_on_the_trailer_ownership == "Yes")
			{
				addcount = 0;
				for each  customers in input.Additional_Names
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
				validCount = 0;
				for each  customers in input.Additional_Names
				{
					if(customers.First_Name == null || customers.Last_Name == null || customers.Email == null)
					{
						validCount = validCount + 1;
					}
				}
				if(validCount > 0)
				{
					alert "Please Enter Missing Additional Insured Information";
					cancel submit;
				}
			}
			/// ----- End -- Additional Insured Infromation Section ----------
			// --------------- Subform Data Chceck ---------------
			count_trailer = 0;
			rowCount = 0;
			if(input.Trailer != null)
			{
				for each  trailerSubform in input.Trailer
				{
					rowCount = rowCount + 1;
					if(trailerSubform.Select_Trailer_Type == null || trailerSubform.Select_Trailer_Type.isEmpty() == true)
					{
						count_trailer = count_trailer + 1;
					}
					if(trailerSubform.Trailer_Model_Year == null || trailerSubform.Trailer_Model_Year.isEmpty() == true)
					{
						count_trailer = count_trailer + 1;
					}
					if(trailerSubform.Select_coverage_for_policy == null || trailerSubform.Select_coverage_for_policy.isEmpty() == true)
					{
						count_trailer = count_trailer + 1;
					}
					if(trailerSubform.Value_of_Golf_Cart_1 != null || trailerSubform.Value_of_Golf_Cart_2 != null)
					{
						if(trailerSubform.Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2 == "" || trailerSubform.Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2.isEmpty() == true)
						{
							count_trailer = count_trailer + 1;
						}
					}
				}
			}
			if(count_trailer > 0)
			{
				alert "Please Check Trailer Information(Trailer Type,Model Year,Coverage Policy,Golf Cart)";
				cancel submit;
			}
			// --------------- End - Subform Data Check --------------
			if(input.Please_select_the_province_your_trailer_is_located_in == "" || input.Please_select_the_province_your_trailer_is_located_in.isEmpty() == true)
			{
				alert "Please enter the Located Province";
				cancel submit;
			}
			if(input.How_many_trailers_would_you_like_to_insure == "" || input.How_many_trailers_would_you_like_to_insure.isEmpty() == true)
			{
				alert "Please enter the trailer insure count";
				cancel submit;
			}
			if(input.How_many_trailers_would_you_like_to_insure == "1" && rowCount > 1)
			{
				alert "Sorry but only 1 row allowed in Trailer";
				cancel submit;
			}
			if(input.How_many_trailers_would_you_like_to_insure == "2" && rowCount > 2)
			{
				alert "Sorry but only 2 row allowed in Trailer";
				cancel submit;
			}
		}
	}
}
