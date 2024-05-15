void BoatQuote.mainFormUpdateOfBoatFromPolicyGenerating(int id)
{
	try 
	{
		fetchPremium = Boat_Policy_change_Request[ID == id];
		if(fetchPremium.count() > 0)
		{
			fetchBoat = BoatQuote[ID == fetchPremium.BoatQuote_ID];
			if(fetchBoat.count() > 0)
			{
				//--------------------------Basic Info-----------------------------
				fetchBoat.Quote_ID=fetchPremium.Quote_ID;
				fetchBoat.Policy_Number=fetchPremium.Policy_Number;
				fetchBoat.Quote_Status=fetchPremium.Quote_Status;
				fetchBoat.Deal_Type=fetchPremium.Deal_Type;
				fetchBoat.Referral_Reason=fetchPremium.Referral_Reason;
				//--------------------------Customer Information-----------------------------
				fetchBoat.Customer_ID=fetchPremium.Customer_ID;
				fetchBoat.Insured_First_Name=fetchPremium.Insured_First_Name;
				fetchBoat.Insured_Last_Name=fetchPremium.Insured_Last_Name;
				fetchBoat.Email=fetchPremium.Email;
				//-------------------Updating Phone and Email to customer---------------
				customInfo = Customer[ID == fetchPremium.Customer_ID];
				if(fetchPremium.Update_Email != null && fetchPremium.Update_Email != "")
				{
					customInfo.Email=fetchPremium.Update_Email;
					//fetchBoat.Email=fetchPremium.Update_Email;
				}
				if(fetchPremium.Update_Phone != null && fetchPremium.Update_Phone != "")
				{
					customInfo.Phone_Number=fetchPremium.Update_Phone;
					//fetchBoat.Phone_Number=fetchPremium.Update_Phone;
				}
				fetchBoat.Phone_Number=fetchPremium.Phone_Number;
				fetchBoat.Link_Customer=fetchPremium.Link_Customer;
				fetchBoat.Date_of_Birth=fetchPremium.Date_of_Birth;
				fetchBoat.Where_Did_You_Find_Us=fetchPremium.Where_Did_You_Find_Us;
				fetchBoat.Name=fetchPremium.Name;
				fetchBoat.Name_of_Dealership=fetchPremium.Name_of_Dealership;
				fetchBoat.Name_of_Campground=fetchPremium.Name_of_Campground;
				fetchBoat.Name_of_Marina=fetchPremium.Name_of_Marina;
				fetchBoat.Tell_us_more=fetchPremium.Tell_us_more;
				fetchBoat.Are_there_any_additional_names_on_the_boat_ownership=fetchPremium.Are_there_any_additional_names_on_the_boat_ownership;
				//--------------------------Quote Information-----------------------------
				fetchBoat.Boat_approve_for_being_over_15_years_old=fetchPremium.Boat_approve_for_being_over_15_years_old;
				fetchBoat.Please_select_the_province_your_boat_is_used_in=fetchPremium.Please_select_the_province_your_boat_is_used_in;
				fetchBoat.How_many_boats_would_you_like_to_insure=fetchPremium.How_many_boats_would_you_like_to_insure;
				//--------------Additional Names Subform-----------------
				additional_names = Collection();
				for each  rec in fetchPremium.Additional_Names
				{
					Row1 = BoatQuote.Additional_Names();
					Row1.Customer_ID=rec.Customer_ID;
					Row1.Email=rec.Email;
					Row1.Link_Customer=rec.Link_Customer;
					Row1.Phone_Number=rec.Phone_Number;
					Row1.DOB=rec.DOB;
					additional_names.insert(Row1);
				}
				fetchBoat.Additional_Names.clear();
				fetchBoat.Additional_Names.insert(additional_names);
				//--------------Boat subform -----------------
				// 	for each  row2 in fetchBoat.Boat
				// 	{
				boatCollection = Collection();
				for each  boatPremiumSubform in fetchPremium.Boat
				{
					row2 = BoatQuote.Boat();
					row2.Select_the_type_of_watercraft=boatPremiumSubform.Select_the_type_of_watercraft;
					row2.Boat_Model_Year=boatPremiumSubform.Boat_Model_Year;
					row2.Boat_Manufacturer=boatPremiumSubform.Boat_Manufacturer;
					row2.Boat_Model=boatPremiumSubform.Boat_Model;
					row2.Replacement_Cost=boatPremiumSubform.Replacement_Cost;
					row2.Actual_Cash_Value=boatPremiumSubform.Actual_Cash_Value;
					row2.Is_the_Principal_Operator_the_same_as_the_Applicant_Owner=boatPremiumSubform.Is_the_Principal_Operator_the_same_as_the_Applicant_Owner;
					row2.First_Name=boatPremiumSubform.First_Name;
					row2.Last_Name=boatPremiumSubform.Last_Name;
					row2.Date_of_Birth=boatPremiumSubform.Date_of_Birth;
					row2.Principal_operator_s_years_of_boating_experience_with_vessels_of_a_similar_size_and_type=boatPremiumSubform.Principal_operator_s_years_of_boating_experience_with_vessels_of_a_similar_size_and_type;
					row2.Does_the_operator_hold_a_Pleasure_Craft_Operator_s_Card_PCOC=boatPremiumSubform.Does_the_operator_hold_a_Pleasure_Craft_Operator_s_Card_PCOC;
					row2.Select_coverage_for_policy=boatPremiumSubform.Select_coverage_for_policy;
					row2.Premium_Per_Year=boatPremiumSubform.Premium_Per_Year;
					row2.Deductible=boatPremiumSubform.Deductible;
					row2.Personal_Effects_Coverage=boatPremiumSubform.Personal_Effects_Coverage;
					row2.Navigational_Equipment_Coverage=boatPremiumSubform.Navigational_Equipment_Coverage;
					row2.Emergency_Towing_Limit=boatPremiumSubform.Emergency_Towing_Limit;
					row2.Loss_of_Use_Limit=boatPremiumSubform.Loss_of_Use_Limit;
					row2.Recalculate=boatPremiumSubform.Recalculate;
					row2.Liability_coverage=boatPremiumSubform.Liability_coverage;
					row2.Boat_Coverage=boatPremiumSubform.Boat_Coverage;
					row2.Salvage=boatPremiumSubform.Salvage;
					row2.Pollution=boatPremiumSubform.Pollution;
					row2.Removal_of_Wreckage=boatPremiumSubform.Removal_of_Wreckage;
					row2.Uninsured_Underinsured_Boater_Endorsement=boatPremiumSubform.Uninsured_Underinsured_Boater_Endorsement;
					row2.Do_any_of_the_above_statements_apply_to_the_watercraft_Atlantic_Pacific=boatPremiumSubform.Do_any_of_the_above_statements_apply_to_the_watercraft_Atlantic_Pacific;
					row2.Do_any_of_the_above_statements_apply_to_the_watercraft_engine_Parasailing_propane=boatPremiumSubform.Do_any_of_the_above_statements_apply_to_the_watercraft_engine_Parasailing_propane;
					row2.Do_any_of_the_above_apply_to_the_watercraft_safety_requirements=boatPremiumSubform.Do_any_of_the_above_apply_to_the_watercraft_safety_requirements;
					row2.Do_any_of_the_above_apply_to_the_applicant_Owner_primary_residence=boatPremiumSubform.Do_any_of_the_above_apply_to_the_applicant_Owner_primary_residence;
					row2.Has_the_principal_operator_had_any_motor_vehicle_claims_in_the_last_5_years=boatPremiumSubform.Has_the_principal_operator_had_any_motor_vehicle_claims_in_the_last_5_years;
					row2.How_many_motor_vehicle_claims=boatPremiumSubform.How_many_motor_vehicle_claims;
					row2.Has_the_principal_operator_had_any_motor_vehicle_convictions_in_the_last_3_years=boatPremiumSubform.Has_the_principal_operator_had_any_motor_vehicle_convictions_in_the_last_3_years;
					row2.How_many_motor_vehicle_convictions=boatPremiumSubform.How_many_motor_vehicle_convictions;
					row2.Has_the_principal_operator_had_their_driver_s_license_suspended=boatPremiumSubform.Has_the_principal_operator_had_their_driver_s_license_suspended;
					row2.Tell_us_more=boatPremiumSubform.When;
					row2.Lengths=boatPremiumSubform.Lengths;
					row2.Hull_ID_Serial=boatPremiumSubform.Hull_ID_Serial;
					row2.Hull_Type=boatPremiumSubform.Hull_Type;
					row2.Other_Hull_Type=boatPremiumSubform.Other_Hull_Type;
					row2.Estimated_max_speed=boatPremiumSubform.Estimated_max_speed;
					row2.Types=boatPremiumSubform.Types;
					row2.Enter_the_type=boatPremiumSubform.Enter_the_type;
					row2.Fuel_Type=boatPremiumSubform.Fuel_Type;
					row2.Model_Year=boatPremiumSubform.Model_Year;
					row2.Manufacturer=boatPremiumSubform.Manufacturer;
					row2.Serial=boatPremiumSubform.Serial;
					row2.Horsepower=boatPremiumSubform.Horsepower;
					row2.Horsepower=boatPremiumSubform.Types1;
					row2.Horsepower=boatPremiumSubform.Enter_the_type1;
					row2.Horsepower=boatPremiumSubform.Fuel_Type1;
					row2.Horsepower=boatPremiumSubform.Model_Year1;
					row2.Horsepower=boatPremiumSubform.Manufacturer1;
					row2.Horsepower=boatPremiumSubform.Serial1;
					row2.Horsepower=boatPremiumSubform.Horsepower1;
					row2.Horsepower=boatPremiumSubform.Add_a_trailer;
					row2.Horsepower=boatPremiumSubform.Trailer_Value;
					row2.Horsepower=boatPremiumSubform.Trailer_Model_Year;
					row2.Horsepower=boatPremiumSubform.Trailer_Manufacturer;
					row2.Horsepower=boatPremiumSubform.Trailer_VIN;
					row2.Horsepower=boatPremiumSubform.Trailer_Length;
					row2.Horsepower=boatPremiumSubform.Add_a_tender;
					row2.Tender_Value=boatPremiumSubform.Tender_Value;
					row2.Tender_Model_Year=boatPremiumSubform.Tender_Model_Year;
					row2.Tender_Manufacturer=boatPremiumSubform.Tender_Manufacturer;
					row2.Tender_Serial=boatPremiumSubform.Tender_Serial;
					row2.Tender_Length=boatPremiumSubform.Tender_Length;
					row2.Add_an_auxiliary_motor=boatPremiumSubform.Add_an_auxiliary_motor;
					row2.Aux_Engine_Value=boatPremiumSubform.Aux_Engine_Value;
					row2.Aux_Engine_Model_Year=boatPremiumSubform.Aux_Engine_Model_Year;
					row2.Aux_Engine_Manufacturer=boatPremiumSubform.Aux_Engine_Manufacturer;
					row2.Auxiliary_Engine_Serial=boatPremiumSubform.Auxiliary_Engine_Serial;
					row2.Aux_Engine_HP_Thrust=boatPremiumSubform.Aux_Engine_HP_Thrust;
					row2.BoatQuote=boatPremiumSubform.BoatQuote;
					row2.Is_this_boat_financed=boatPremiumSubform.Is_this_boat_financed;
					fetchLein = Lein_holder_Details[ID == boatPremiumSubform.Lein_holder];
					row2.Lein_holder=fetchLein.ID;
					row2.Name_of_Financier=boatPremiumSubform.Name_of_Financier;
					row2.Address_line1=boatPremiumSubform.Address_line1;
					row2.Address_line2=boatPremiumSubform.Address_line2;
					row2.City=boatPremiumSubform.City;
					row2.Province=boatPremiumSubform.Province;
					row2.Postal_Code=boatPremiumSubform.Postal_Code;
					row2.Country=boatPremiumSubform.Country;
					row2.Boat_Model_Age=boatPremiumSubform.Boat_Model_Age;
					row2.Eligible_for_Auto_Renewal=boatPremiumSubform.Eligible_for_Auto_Renewal;
					row2.Underwritting_Approved=boatPremiumSubform.Underwritting_Approved;
					row2.Is_auto_approved_for_next_5_years=boatPremiumSubform.Is_auto_approved_for_next_5_years;
					row2.Approved_Year=boatPremiumSubform.Approved_Year;
					row2.Boat_Status=boatPremiumSubform.Boat_Status;
					row2.Opt_In_for_RCV=boatPremiumSubform.Opt_In_for_RCV;
					//New fields for admin related changes
					row2.Admin_Override=boatPremiumSubform.Admin_Override;
					row2.PO_admin_3year_Override=boatPremiumSubform.PO_admin_3year_Override;
					row2.PO_admin_License_Override=boatPremiumSubform.PO_admin_License_Override;
					//
					row2.Boat_Migration_ID=boatPremiumSubform.Boat_Migration_ID;
					row2.Migrated=boatPremiumSubform.Migrated;
					boatCollection.insert(row2);
				}
				fetchBoat.Boat.clear();
				fetchBoat.Boat.insert(boatCollection);
				//------------------Policy Details----------------------------
				fetchBoat.Inception_Date=fetchPremium.Inception_Date;
				fetchBoat.Expiry_Date=fetchPremium.Expiry_Date;
				//---------------------------Terms-------------------------
				fetchBoat.Agree_to_terms_and_conditions=fetchPremium.Agree_to_terms_and_conditions;
				fetchBoat.Enter_payment_info=fetchPremium.Enter_payment_info;
				//---------------------------Payment-------------------------
				fetchBoat.Payment_Date=fetchPremium.Payment_Date;
				fetchBoat.Enter_payment_info=fetchPremium.Enter_payment_info;
				fetchBoat.Total_Premium_before_tax=fetchPremium.Total_Premium_before_tax;
				fetchBoat.Fee=fetchPremium.Fee;
				fetchBoat.Tax_Province=fetchPremium.Tax_Province;
				fetchBoat.Tax_Precent=fetchPremium.Tax_Precent;
				fetchBoat.Total_Tax=fetchPremium.Total_Tax;
				fetchBoat.Total_Payable_Premium_after_tax=fetchPremium.Total_Payable_Premium_after_tax;
				//---------------------------Mailing Address-------------------------
				fetchBoat.Country=fetchPremium.Country;
				fetchBoat.Address=fetchPremium.Address;
				fetchBoat.Suite_Apt=fetchPremium.Suite_Apt;
				fetchBoat.Country=fetchPremium.Country;
				fetchBoat.City=fetchPremium.City;
				fetchBoat.Province=fetchPremium.Province;
				fetchBoat.Postal_code_ZIP_Code=fetchPremium.Postal_code_ZIP_Code;
				//---------------------------Adjusted Premium-------------------------
				fetchBoat.Outstanding=fetchPremium.Outstanding;
				fetchBoat.Prorated=fetchPremium.Prorated;
				fetchBoat.Tax=fetchPremium.Tax;
				fetchBoat.Total=fetchPremium.Total;
				fetchBoat.Tax=fetchPremium.Tax;
				fetchBoat.Prorate_From=fetchPremium.Prorate_From;
				fetchBoat.Waive_Free=fetchPremium.Waive_Free;
				fetchBoat.Reason_For_Rejection1=fetchPremium.Reason_For_Rejection1;
				//---------------------------Other Information-------------------------
				fetchBoat.Is_Watercraft_Ineligible_For_Coverage=fetchPremium.Is_Watercraft_Ineligible_For_Coverage;
				fetchBoat.Does_Watercraft_Meet_Safety_And_Usage_Requirements=fetchPremium.Does_Watercraft_Meet_Safety_And_Usage_Requirements;
				fetchBoat.Is_Applicant_Ineligible_For_Coverage=fetchPremium.Is_Applicant_Ineligible_For_Coverage;
				fetchBoat.Is_Operator_Ineligible_For_Coverage=fetchPremium.Is_Operator_Ineligible_For_Coverage;
				//---------------------------Document Generation Section-------------------------
				fetchBoat.Combined_Doc_Status_Check_On=fetchPremium.Combined_Doc_Status_Check_On;
				fetchBoat.Is_Applicant_Ineligible_For_Coverage=fetchPremium.Is_Applicant_Ineligible_For_Coverage;
				fetchBoat.Combined_Doc_Download_URL=fetchPremium.Combined_Doc_Download_URL;
				fetchBoat.Combined_Doc_Response=fetchPremium.Combined_Doc_Response;
				fetchBoat.Boat_quote_Page_View=fetchPremium.Boat_quote_Page_View;
				//---------------------------Developer Section-------------------------
				fetchBoat.Zoho_Crm_ID=fetchPremium.Zoho_Crm_ID;
				fetchBoat.Migrated_Status=fetchPremium.Migrated_Status;
				fetchBoat.Boat_Migration_ID=fetchPremium.Boat_Migration_ID;
				fetchBoat.Migrated=fetchPremium.Migrated;
				//---------------------------Admin Changes-------------------------
				//fetchBoat.Select_Rate=fetchPremium.Select_Rate;
				fetchBoat.Override_Tax_by_Admin=fetchPremium.Override_Tax_by_Admin;
				//fetchBoat.Overriden_Tax=fetchPremium.Overriden_Tax;
				fetchBoat.Override_Tax=ifnull(fetchPremium.Override_Tax,null);
				//---------------------------Missing Fields-------------------------
				fetchBoat.Were_you_referred_by_a_friend_or_business=fetchPremium.Were_you_referred_by_a_friend_or_business;
				fetchBoat.Product_Package=fetchPremium.Product_Package;
				fetchBoat.Bind_Date=fetchPremium.Bind_Date;
				fetchBoat.Last_Modified=fetchPremium.Last_Modified;
			}
		}
	}
	catch (e)
	{
		thisapp.Developer.addDeveloperLog("BoateQoute","mainFormUpdateOfBoatFromPolicyGenerating:" + fetchBoat.ID.tostring(),"Update Boat Premium generation to Boat Mainform in creator",fetchPremium.ID.tostring(),e,"creator");
	}
}