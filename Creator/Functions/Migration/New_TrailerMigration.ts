void Migration.New_TrailerMigration()
{
	getBoatRec = Boat_Migration[ID == 4564627000000390607];
	for each  getBoat in getBoatRec
	{
		creatorQuoteMigratedStatusList = List();
		creatorQuoteMigratedStatusList.add("New Policy");
		if(getBoat.Phone != null && getBoat.Phone != "")
		{
			formattedPhoneNumber = getBoat.Phone.replaceAll("[/\-\(\)_@#\^!\$%\&\*:;`~ ]","");
			formattedPhoneNumber = "+1" + formattedPhoneNumber;
		}
		else
		{
			formattedPhoneNumber = "";
		}
		dealStatus = if(getBoat.Policy_Number != null && getBoat.Policy_Number != "","Policy",if(getBoat.Reference_Number != null && getBoat.Reference_Number != "","Quote",""));
		creatorID = 4564627000000553988;
		slaveCreatorID = null;
		Deductiblevalue = "";
		if(getBoat.Deductible != null && getBoat.Deductible != "")
		{
			deductible = getBoat.Deductible.remove("$").remove(",").toDecimal().round(0);
			Deductiblevalue = deductible;
		}
		else
		{
			Deductiblevalue = null;
		}
		PersonalEffectsCoverageValue = "";
		if(getBoat.Personal_Effects_Coverage != null && getBoat.Personal_Effects_Coverage != "")
		{
			PersonalEffectsCoverageValue = getBoat.Personal_Effects_Coverage.remove("$").remove(",").toDecimal().round(0);
			PersonalEffectsCoverageValue = "$" + PersonalEffectsCoverageValue;
		}
		else
		{
			PersonalEffectsCoverageValue = null;
		}
		// Navigational Equipment Coverage
		NavigationalEquipmentCoverageValue = "";
		if(getBoat.Navigational_Equipment_Coverage != null && getBoat.Navigational_Equipment_Coverage != "")
		{
			NavigationalEquipmentCoverageValue = getBoat.Navigational_Equipment_Coverage.remove("$").remove(",").toDecimal().round(0);
			NavigationalEquipmentCoverageValue = "$" + NavigationalEquipmentCoverageValue;
		}
		if(getBoat.Product_Package == "Replacement Value")
		{
			prodPackage = "Replacement Value Coverage";
		}
		else if(getBoat.Product_Package == "Current Market Value")
		{
			prodPackage = "Current Market Value Coverage";
		}
		SelectAFinancier = null;
		NameofFinancier = "";
		// 		if(getBoat.Do_you_have_any_lienholders == "Yes")
		if(getBoat.Do_you_have_any_lienholders == true)
		{
			IsThisBoatFinanced = true;
			FinancierName = getBoat.Loss_Payees_Name.toUpperCase();
			getLein = Lein_holder_Details[ID != 0].distinct(Name_of_Financier);
			if(getLein.toList(",").contains(getBoat.Loss_Payees_Name.toUpperCase()) == false)
			{
				SelectAFinancier = 4564627000000514015;
				NameofFinancier = getBoat.Loss_Payees_Name.toUpperCase();
			}
			else
			{
				getLein = Lein_holder_Details[Name_of_Financier == FinancierName];
				SelectAFinancier = getLein.ID;
				NameofFinancier = "";
			}
			LossPayAddressLine1 = getBoat.Loss_Payees_Unit_Suite;
			LossPayAddressLine2 = getBoat.Loss_Payees_Address;
			LossPayCity = getBoat.Loss_Payees_City;
			LossPayProvince = getBoat.Loss_Payees_Province;
			LossPayPostalCode = getBoat.Loss_Payees_Postal_Code;
			LossPayCountry = getBoat.Loss_Payees_Country;
		}
		else
		{
			IsThisBoatFinanced = false;
			SelectAFinancier = null;
			NameOfFinancier = "";
			LossPayAddressLine1 = "";
			LossPayAddressLine2 = "";
			LossPayCity = "";
			LossPayProvince = "";
			LossPayPostalCode = "";
			LossPayCountry = "";
		}
		createCreatorPolicy = insert into BoatQuote
		[
			Added_User=zoho.loginuser
			Migrated_Status=creatorQuoteMigratedStatusList
			Quote_ID=getBoat.Reference_Number
			Policy_Number=getBoat.Policy_Number
			Phone_Number=formattedPhoneNumber
			Email=getBoat.Email1
			Date_of_Birth=getBoat.Date_of_Birth
			Quote_Status="Completed"
			Deal_Type=dealStatus
			Total_Premium_before_tax=getBoat.Premium
			Fee=getBoat.Fee
			Total_Tax=getBoat.Tax
			Total_Payable_Premium_after_tax=getBoat.Total
			Please_select_the_province_your_boat_is_used_in=getBoat.Please_select_the_province_your_boat_is_used_in
			Is_Watercraft_Ineligible_For_Coverage=getBoat.Is_Watercraft_Ineligible_For_Coverage
			Does_Watercraft_Meet_Safety_And_Usage_Requirements=getBoat.Does_Watercraft_Meet_Safety_And_Usage_Requirements
			Is_Applicant_Ineligible_For_Coverage=getBoat.Is_Applicant_Ineligible_For_Coverage
			Is_Operator_Ineligible_For_Coverage=getBoat.Is_Operator_Ineligible_For_Coverage
			Name=getBoat.Enter_the_friend_s_name
			Insured_First_Name=getBoat.Insured_First_Name
			Insured_Last_Name=getBoat.Insured_Last_Name
			Country=getBoat.Country
			Address=getBoat.Address
			Suite_Apt=getBoat.Suite_Apt
			City=getBoat.City
			Province=getBoat.Province_State
			Postal_code_ZIP_Code=getBoat.Postal_Zip_Code
			Payment_Date=getBoat.Payment_Date
			Boat_Migration_ID=getBoat.ID.tostring()
			Migrated=true
			Product_Package=getBoat.Product_Package
			Policy_Status="ACTIVE"
			Bind_Date=getBoat.Bind_Date
			Last_Modified=getBoat.Last_Modified
			How_many_boats_would_you_like_to_insure="1"
			Quote_Status="Completed"
			Slave_Customer=slaveCreatorID
			Deal_Type=dealStatus
		];
		boatQuoteID = createCreatorPolicy;
		info "boatQuoteID  " + createCreatorPolicy;
		createBoat = insert into Boat
		[
			Added_User=zoho.loginuser
			BoatQuote=createCreatorPolicy
			Select_the_type_of_watercraft=getBoat.Select_the_type_of_watercraft1
			Boat_Model_Year=getBoat.Boat_Model_Year
			Boat_Manufacturer=getBoat.Boat_Manufacturer
			Replacement_Cost=getBoat.Current_cost_of_a_brand_new_watercraft
			Manufacturer1=getBoat.Manufacturer_2
			Boat_Model=getBoat.Boat_Model
			Horsepower=getBoat.HP1
			Horsepower1=getBoat.HP_21
			Aux_Engine_HP_Thrust=getBoat.Aux_Engine_HP1
			Is_the_Principal_Operator_the_same_as_the_Applicant_Owner=if(getBoat.Is_the_Principal_Operator_the_same_as_the_Applicant_Owner == true,"Yes","No")
			Principal_operator_s_years_of_boating_experience_with_vessels_of_a_similar_size_and_type=getBoat.Principal_operator_s_years_of_boating_experience_with_vessels_of_a_similar_size_and_type
			Does_the_operator_hold_a_Pleasure_Craft_Operator_s_Card_PCOC=if(getBoat.Does_the_operator_hold_a_Pleasure_Craft_Operator_s_Card_PCOC == true,"Yes","No")
			First_Name=getBoat.Operator_Last_Name
			Last_Name=getBoat.Operator_Last_Name
			Date_of_Birth=getBoat.Date_of_Birth
			Premium_Per_Year=getBoat.Premium
			Deductible=Deductiblevalue
			Lengths=getBoat.Length_field1
			Serial1=getBoat.Serial_2
			Actual_Cash_Value=getBoat.Fair_Market_Value
			Hull_ID_Serial=getBoat.ID_Serial
			Hull_ID_Optional=getBoat.Hull_ID_optional
			Boat_Coverage=getBoat.Boat_Coverage1
			Hull_Type=getBoat.Hull_Type
			Types=getBoat.Type_field
			Boat_Model_Age=getBoat.Boat_Model_Age
			Personal_Effects_Coverage=PersonalEffectsCoverageValue
			Navigational_Equipment_Coverage=NavigationalEquipmentCoverageValue
			Trailer_Manufacturer=getBoat.Trailer_Manufacturer
			Salvage=getBoat.Salvage
			Estimated_max_speed=getBoat.Estimated_max_speed1
			Fuel_Type=getBoat.Fuel_Type
			Model_Year=getBoat.Model_Year
			Manufacturer=getBoat.Manufacturer
			Serial=getBoat.Serial
			Add_a_trailer=if(getBoat.Add_a_trailer == true,"Yes","No")
			Trailer_Value=getBoat.Trailer_Value
			Tender_Value=getBoat.Tender_Value
			Trailer_Model_Year=getBoat.Trailer_Model_Year
			Trailer_Length=getBoat.Trailer_Length
			Tender_Model_Year=getBoat.Tender_Model_Year
			Tender_Serial=getBoat.Tender_Serial
			Trailer_VIN=getBoat.Trailer_Serial
			Add_a_tender=if(getBoat.Add_a_tender == true,"Yes","No")
			Trailer_Value=getBoat.Trailer_Value
			Tender_Length=getBoat.Tender_Length1
			Tender_Manufacturer=getBoat.Tender_Manufacturer
			Add_an_auxiliary_motor=if(getBoat.Add_an_auxiliary_motor == true,"Yes","No")
			Aux_Engine_Value=getBoat.Aux_Engine_Value
			Aux_Engine_Manufacturer=getBoat.Aux_Engine_Manufacturer
			Aux_Engine_Model_Year=getBoat.Aux_Engine_Model_Year
			Auxiliary_Engine_Serial=getBoat.Auxiliary_Engine_Serial
			Select_coverage_for_policy=prodPackage
			Fuel_Type1=getBoat.Fuel_Type_21
			Types1=getBoat.Type_21
			Model_Year1=getBoat.Model_Year_21
			Boat_Migration_ID=getBoat.ID.tostring()
			Migrated=true
			Is_this_boat_financed=if(IsThisBoatFinanced == true,"Yes","No")
			Lein_holder=SelectAFinancier
			Address_line1=LossPayAddressLine1
			Address_line2=LossPayAddressLine2
			City=LossPayCity
			Province=LossPayProvince
			Postal_Code=LossPayPostalCode
			Country=LossPayCountry
		];
		info "createBoat = " + createBoat;
		getBoatCustomer = BoatQuote[ID == createCreatorPolicy];
		getBoatCustomer.Customer_ID=creatorID;
	}
}