void Renewal.Duplicate_Boat_Policy_Creation_Renewal(int BoatID)
{
	getBoat = BoatQuote[ID == BoatID];
	if(getBoat.count() > 0)
	{
		eligibleCount = 0;
		for each  recBoatCount in Boat[BoatQuote == getBoat.ID && Eligible_for_Auto_Renewal == true]
		{
			eligibleCount = eligibleCount + 1;
		}
		//	info eligibleCount;
		if(eligibleCount > 0)
		{
			msg = "";
			creatorID = getBoat.ID;
			TaxProvinceName = getBoat.Tax_Province;
			getTaxRate = Tax_Lists[State_Province == TaxProvinceName];
			if(getTaxRate.count() > 0)
			{
				TaxPercentID = getTaxRate.ID;
				TaxPercent = getTaxRate.Tax;
			}
			PolicyNumber = ifnull(getBoat.Policy_Number,"") + " - FUTURE";
			QuoteID = ifnull(getBoat.Quote_ID,"") + " - FUTURE";
			// Basic Info
			BoatData = insert into BoatQuote
			[
				Added_User=zoho.loginuser
				Quote_ID=QuoteID
				Organization_ID_Server=getBoat.Organization_ID_Server
				Policy_Number=PolicyNumber
				Quote_Status=getBoat.Quote_Status
				Policy_Status="INACTIVE - RENEWAL PENDING"
				Policy_AutoRenewal_Status=getBoat.Policy_AutoRenewal_Status
				Deal_Type=getBoat.Deal_Type
				Referral_Reason=getBoat.Referral_Reason
				Source=getBoat.Source
				Created_Source="CREATOR"
				Carrier="Four Points Insurance"
				Customer_ID=getBoat.Customer_ID
				Insured_First_Name=getBoat.Insured_First_Name
				Insured_Last_Name=getBoat.Insured_Last_Name
				Insured_Middle_Name=getBoat.Insured_Middle_Name
				Email=getBoat.Email
				Link_Customer=getBoat.Link_Customer
				Phone_Number=getBoat.Phone_Number
				Date_of_Birth=getBoat.Date_of_Birth
				Where_Did_You_Find_Us=getBoat.Where_Did_You_Find_Us
				Name=getBoat.Name
				Name_of_Dealership=getBoat.Name_of_Dealership
				Name_of_Campground=getBoat.Name_of_Campground
				Name_of_Marina=getBoat.Name_of_Marina
				Tell_us_more=getBoat.Tell_us_more
				Are_there_any_additional_names_on_the_boat_ownership=getBoat.Are_there_any_additional_names_on_the_boat_ownership
				Please_select_the_province_your_boat_is_used_in=getBoat.Please_select_the_province_your_boat_is_used_in
				How_many_boats_would_you_like_to_insure=getBoat.How_many_boats_would_you_like_to_insure
				Expiry_Date=getBoat.Expiry_Date
				Inception_Date=getBoat.Inception_Date
				Last_Modified=getBoat.Last_Modified
				Bind_Date=getBoat.Bind_Date
				Country=getBoat.Country
				Address=getBoat.Address
				Suite_Apt=getBoat.Suite_Apt
				City=getBoat.City
				Province=getBoat.Province
				Postal_code_ZIP_Code=getBoat.Postal_code_ZIP_Code
				Override_Tax_by_Admin=getBoat.Override_Tax_by_Admin
				Override_Tax=getBoat.Override_Tax
				Tax_Province=getBoat.Tax_Province
				Fee=getBoat.Fee
				Tax_Precent=getBoat.Tax_Precent
				Total_Tax=getBoat.Total_Tax
				Total_Payable_Premium_after_tax=getBoat.Total_Payable_Premium_after_tax
				Enter_payment_info=getBoat.Enter_payment_info
				Stripe_Payment_Method_Details=getBoat.Stripe_Payment_Method_Details
				Stripe_Payment_Method_ID=getBoat.Stripe_Payment_Method_ID
				Stripe_Customer_ID=getBoat.Stripe_Customer_ID
				Payment_Status=getBoat.Payment_Status
				Nuvei_Transaction_ID=getBoat.Nuvei_Transaction_ID
				Policy_UPO_Data=getBoat.Policy_UPO_Data
				Outstanding=getBoat.Outstanding
				OutStanding_Type=getBoat.OutStanding_Type
				Prorated=getBoat.Prorated
				Tax=getBoat.Tax
				Total=getBoat.Total
				Prorate_From=getBoat.Prorate_From
				Waive_Free=getBoat.Waive_Free
				Reason_For_Rejection1=getBoat.Reason_For_Rejection1
				Is_Watercraft_Ineligible_For_Coverage=getBoat.Is_Watercraft_Ineligible_For_Coverage
				Does_Watercraft_Meet_Safety_And_Usage_Requirements=getBoat.Does_Watercraft_Meet_Safety_And_Usage_Requirements
				Is_Applicant_Ineligible_For_Coverage=getBoat.Is_Applicant_Ineligible_For_Coverage
				Is_Operator_Ineligible_For_Coverage=getBoat.Is_Operator_Ineligible_For_Coverage
				Combined_Doc_Status_Check_On=getBoat.Combined_Doc_Status_Check_On
				Combined_Doc_Download_URL=getBoat.Combined_Doc_Download_URL
				Combined_Doc_Response=getBoat.Combined_Doc_Response
				Email_List=getBoat.Email_List
				Select_Rate=getBoat.Select_Rate
				Signature_Accept_Text=getBoat.Signature_Accept_Text
				Zoho_Crm_ID=getBoat.Zoho_Crm_ID
				Quote_Policy_Type="Renewal"
				Slave_Customer=getBoat.Slave_Customer
				Renewal_From_Old_Policy_ID=creatorID
				Were_you_referred_by_a_friend_or_business=getBoat.Were_you_referred_by_a_friend_or_business
				Product_Package=getBoat.Product_Package
				Agree_to_terms_and_conditions=getBoat.Agree_to_terms_and_conditions
				Financier_Information=getBoat.Financier_Information
				Is_your_boat_financed=getBoat.Is_your_boat_financed
				Other_Financier_Information=getBoat.Other_Financier_Information
				Section_Type=getBoat.Section_Type
				UPO_Data=getBoat.UPO_Data
			];
			// Additional Names subform
			getAllCustomers = Additional_Names[Boats == creatorID];
			if(getAllCustomers.count() > 0)
			{
				for each  cus in getAllCustomers
				{
					getCust = Additional_Names[ID == cus.ID];
					if(getCust.count() > 0)
					{
						additionalnamescus = insert into Additional_Names
						[
							Added_User=zoho.loginuser
							Customer_ID=getCust.Customer_ID
							Additional_Insured_First_Name=getCust.Additional_Insured_First_Name
							Additional_Insured_Last_Name=getCust.Additional_Insured_Last_Name
							Email=getCust.Email
							Link_Customer=getCust.Link_Customer
							Phone_Number=getCust.Phone_Number
							DOB=getCust.DOB
							Boats=BoatData
						];
					}
				}
			}
			// Boat subform
			boat_List = List();
			TotalBoats = 0;
			PremiumAmount = 0;
			PremiumPerYear = 0;
			getAllBoatLines = Boat[BoatQuote == creatorID];
			//		info "getAllBoatLines -- > " + getAllBoatLines;
			for each  boat in getAllBoatLines
			{
				getBoatFromCreator = Boat[ID == boat.ID];
				//Email Content
				msg = msg + "<br>" + getBoatFromCreator.Boat_Model_Year + "," + getBoatFromCreator.Boat_Manufacturer + "," + getBoatFromCreator.Boat_Model + "," + getBoatFromCreator.Select_the_type_of_watercraft + "";
				//Subform Starts Here
				if(getBoatFromCreator.Eligible_for_Auto_Renewal == true)
				{
					TotalBoats = TotalBoats + 1;
					getEndPointfromCreator = API_Configuration[Name_Process == "Calculate Coverage Premium - Boat"];
					if(getEndPointfromCreator.count() > 0)
					{
						CoveragePremiumAPIENDPOINT = getEndPointfromCreator.End_Point;
						parammap = Map();
						getOrg = invokeurl
						[
							url :"https://www.zohoapis.com/creator/custom/service_recprotect/Org_Info?publickey=UsNgXbMvJ3pYHuDGtsgdsbhCR"
							type :GET
						];
						parammap.put("organization_id",getOrg.get("result"));
						if(getBoatFromCreator.Select_coverage_for_policy == "Replacement Value Coverage")
						{
							boatvalue = ifnull(getBoatFromCreator.Replacement_Cost,0);
						}
						else if(getBoatFromCreator.Select_coverage_for_policy == "Current Market Value Coverage")
						{
							boatvalue = ifnull(getBoatFromCreator.Actual_Cash_Value,0);
						}
						else
						{
							boatvalue = 0;
						}
						parammap.put("boat_value",boatvalue);
						if(!isNull(getBoatFromCreator.Select_the_type_of_watercraft))
						{
							parammap.put("boat_type",getBoatFromCreator.Select_the_type_of_watercraft);
						}
						check15years = false;
						if(!isNull(getBoatFromCreator.Boat_Model_Year))
						{
							calculate25Years = zoho.currentdate.getYear() - getBoatFromCreator.Boat_Model_Year.toNumber();
							check15years = if(calculate25Years > 15,true,false);
						}
						parammap.put("is_boat_age_gt_15",check15years);
						agecheck = false;
						calculateAge = 0;
						if(!isNull(getBoatFromCreator.Date_of_Birth))
						{
							calculateAge = zoho.currentdate.getYear() - getBoatFromCreator.Date_of_Birth.toDate().getYear();
							agecheck = if(calculateAge >= 20 && calculateAge <= 25,true,false);
						}
						parammap.put("is_boat_operator_age_20_25",agecheck);
						expcheck = false;
						if(calculateAge > 25 && !isNull(getBoatFromCreator.Principal_operator_s_years_of_boating_experience_with_vessels_of_a_similar_size_and_type))
						{
							if(getBoatFromCreator.Principal_operator_s_years_of_boating_experience_with_vessels_of_a_similar_size_and_type == "0-3 Years")
							{
								expcheck = true;
							}
						}
						parammap.put("is_boat_operator_gt_25_lt_3years_exp",expcheck);
						if(!isNull(getBoatFromCreator.Navigational_Equipment_Coverage))
						{
							naviValue = getBoatFromCreator.Navigational_Equipment_Coverage;
							if(getBoatFromCreator.Navigational_Equipment_Coverage.contains("$") == true)
							{
								naviValue = getBoatFromCreator.Navigational_Equipment_Coverage.remove("$").toDecimal();
							}
							parammap.put("navi_eqip_value",naviValue);
						}
						if(!isNull(getBoatFromCreator.Personal_Effects_Coverage))
						{
							parammap.put("pers_eff_value",getBoatFromCreator.Personal_Effects_Coverage);
						}
						if(!isNull(getBoatFromCreator.Liability_coverage))
						{
							parammap.put("is_boat_liability_rate_2M",getBoatFromCreator.Liability_coverage);
						}
						if(!isNull(getBoatFromCreator.Deductible))
						{
							parammap.put("deductible_value",getBoatFromCreator.Deductible.toLong());
						}
						boatCoverage = if(getBoatFromCreator.Select_coverage_for_policy == "Replacement Value Coverage","RCV","ACV");
						parammap.put("coverage_type",boatCoverage);
						boatAgecheck = false;
						if(!isNull(getBoatFromCreator.Boat_Age))
						{
							boatAgecheck = if(getBoatFromCreator.Boat_Age >= 10 && getBoatFromCreator.Boat_Age <= 15,true,false);
						}
						parammap.put("is_boat_age_10_to_15",boatAgecheck);
						// 	boatPostData = thisapp.Server_Side.callServer("POST",fetchEndPoint,parammap);
						// serverside call server function
						headerMap = Map();
						headerMap.put("Content-Type","application/json");
						ServerResp = invokeurl
						[
							url :CoveragePremiumAPIENDPOINT
							type :POST
							parameters:parammap.toString()
							headers:headerMap
						];
						//				info "ServerResp " + ServerResp;
						// serverside function end
						if(ServerResp.get("success") == true)
						{
							PremiumAmount = ifnull(PremiumAmount,0) + ifnull(ServerResp.get("data").get("total_prem"),0);
							PremiumPerYear = ifnull(ServerResp.get("data").get("total_prem"),0);
						}
					}
					if(getBoatFromCreator.Boat_Age == 15)
					{
						option = "ACV";
					}
					else if(getBoatFromCreator.Boat_Age >= 10 || getBoatFromCreator.Boat_Age < 15 && getBoatFromCreator.Opt_In_for_RCV == false)
					{
						option = "ACV";
					}
					else
					{
						option = getBoatFromCreator.Policy_Coverage_Type;
					}
					BoatsSubform = insert into Boat
					[
						Added_User=zoho.loginuser
						Premium_Per_Year=PremiumPerYear
						Select_the_type_of_watercraft=getBoatFromCreator.Select_the_type_of_watercraft
						Boat_Model_Year=getBoatFromCreator.Boat_Model_Year
						Override_For_Age_15_Or_More=getBoatFromCreator.Override_For_Age_15_Or_More
						Boat_Manufacturer=getBoatFromCreator.Boat_Manufacturer
						Boat_Model=getBoatFromCreator.Boat_Model
						Replacement_Cost=getBoatFromCreator.Replacement_Cost
						Actual_Cash_Value=getBoatFromCreator.Actual_Cash_Value
						Is_the_Principal_Operator_the_same_as_the_Applicant_Owner=getBoatFromCreator.Is_the_Principal_Operator_the_same_as_the_Applicant_Owner
						First_Name=getBoatFromCreator.First_Name
						Last_Name=getBoatFromCreator.Last_Name
						Date_of_Birth=getBoatFromCreator.Date_of_Birth
						Principal_operator_s_years_of_boating_experience_with_vessels_of_a_similar_size_and_type=getBoatFromCreator.Principal_operator_s_years_of_boating_experience_with_vessels_of_a_similar_size_and_type
						Does_the_operator_hold_a_Pleasure_Craft_Operator_s_Card_PCOC=getBoatFromCreator.Does_the_operator_hold_a_Pleasure_Craft_Operator_s_Card_PCOC
						Select_coverage_for_policy=getBoatFromCreator.Select_coverage_for_policy
						Liability_coverage=getBoatFromCreator.Liability_coverage
						Deductible=getBoatFromCreator.Deductible
						Boat_Coverage=getBoatFromCreator.Boat_Coverage
						Personal_Effects_Coverage=getBoatFromCreator.Personal_Effects_Coverage
						Salvage=getBoatFromCreator.Salvage
						Navigational_Equipment_Coverage=getBoatFromCreator.Navigational_Equipment_Coverage
						Pollution=getBoatFromCreator.Pollution
						Emergency_Towing_Limit=getBoatFromCreator.Emergency_Towing_Limit
						Removal_of_Wreckage=getBoatFromCreator.Removal_of_Wreckage
						Loss_of_Use_Limit=getBoatFromCreator.Loss_of_Use_Limit
						Uninsured_Underinsured_Boater_Endorsement=getBoatFromCreator.Uninsured_Underinsured_Boater_Endorsement
						Recalculate=getBoatFromCreator.Recalculate
						Show_Premium_Breakdown=getBoatFromCreator.Show_Premium_Breakdown
						Boat_Liability_Prem=getBoatFromCreator.Boat_Liability_Prem
						Boat_Base_Premium=getBoatFromCreator.Boat_Base_Premium
						Boat_Operator_age_20_25_prem=getBoatFromCreator.Boat_Operator_age_20_25_prem
						Boat_age_gt_15_prem=getBoatFromCreator.Boat_age_gt_15_prem
						Deductible_Prem=getBoatFromCreator.Deductible_Prem
						Boat_operator_gt_25_lt_3years_exp_prem=getBoatFromCreator.Boat_operator_gt_25_lt_3years_exp_prem
						Pers_eff_prem=getBoatFromCreator.Pers_eff_prem
						Navi_eqip_prem=getBoatFromCreator.Navi_eqip_prem
						Total_Prem=getBoatFromCreator.Total_Prem
						Endorsement_prem=getBoatFromCreator.Endorsement_prem
						Do_any_of_the_above_statements_apply_to_the_watercraft_engine_Parasailing_propane=getBoatFromCreator.Do_any_of_the_above_statements_apply_to_the_watercraft_engine_Parasailing_propane
						Do_any_of_the_above_statements_apply_to_the_watercraft_Atlantic_Pacific=getBoatFromCreator.Do_any_of_the_above_statements_apply_to_the_watercraft_Atlantic_Pacific
						Do_any_of_the_above_apply_to_the_watercraft_safety_requirements=getBoatFromCreator.Do_any_of_the_above_apply_to_the_watercraft_safety_requirements
						Do_any_of_the_above_apply_to_the_applicant_Owner_primary_residence=getBoatFromCreator.Do_any_of_the_above_apply_to_the_applicant_Owner_primary_residence
						Has_the_principal_operator_had_their_driver_s_license_suspended=getBoatFromCreator.Has_the_principal_operator_had_their_driver_s_license_suspended
						Has_the_principal_operator_had_any_motor_vehicle_convictions_in_the_last_3_years=getBoatFromCreator.Has_the_principal_operator_had_any_motor_vehicle_convictions_in_the_last_3_years
						Has_the_principal_operator_had_any_motor_vehicle_claims_in_the_last_5_years=getBoatFromCreator.Has_the_principal_operator_had_any_motor_vehicle_claims_in_the_last_5_years
						How_many_motor_vehicle_claims=getBoatFromCreator.How_many_motor_vehicle_claims
						How_many_motor_vehicle_convictions=getBoatFromCreator.How_many_motor_vehicle_convictions
						PO_admin_3year_Override=getBoatFromCreator.PO_admin_3year_Override
						Tell_us_more=getBoatFromCreator.Tell_us_more
						Lengths=getBoatFromCreator.Lengths
						Hull_ID_Serial=getBoatFromCreator.Hull_ID_Serial
						Hull_ID_Optional=getBoatFromCreator.Hull_ID_Optional
						Hull_Type=getBoatFromCreator.Hull_Type
						Other_Hull_Type=getBoatFromCreator.Other_Hull_Type
						Estimated_max_speed=getBoatFromCreator.Estimated_max_speed
						Types=getBoatFromCreator.Types
						Enter_the_type=getBoatFromCreator.Enter_the_type
						Fuel_Type=getBoatFromCreator.Fuel_Type
						Model_Year=getBoatFromCreator.Model_Year
						Manufacturer=getBoatFromCreator.Manufacturer
						Serial=getBoatFromCreator.Serial
						Horsepower=getBoatFromCreator.Horsepower
						Types1=getBoatFromCreator.Types1
						Enter_the_type1=getBoatFromCreator.Enter_the_type1
						Fuel_Type1=getBoatFromCreator.Fuel_Type1
						Model_Year1=getBoatFromCreator.Model_Year1
						Manufacturer1=getBoatFromCreator.Manufacturer1
						Serial1=getBoatFromCreator.Serial1
						Horsepower1=getBoatFromCreator.Horsepower1
						Add_a_trailer=getBoatFromCreator.Add_a_trailer
						Trailer_Value=getBoatFromCreator.Trailer_Value
						Trailer_Model_Year=getBoatFromCreator.Trailer_Model_Year
						Trailer_Manufacturer=getBoatFromCreator.Trailer_Manufacturer
						Trailer_VIN=getBoatFromCreator.Trailer_VIN
						Trailer_Length=getBoatFromCreator.Trailer_Length
						Add_a_tender=getBoatFromCreator.Add_a_tender
						Tender_Value=getBoatFromCreator.Tender_Value
						Tender_Model_Year=getBoatFromCreator.Tender_Model_Year
						Tender_Manufacturer=getBoatFromCreator.Tender_Manufacturer
						Tender_Serial=getBoatFromCreator.Tender_Serial
						Tender_Length=getBoatFromCreator.Tender_Length
						Add_an_auxiliary_motor=getBoatFromCreator.Add_an_auxiliary_motor
						Aux_Engine_Value=getBoatFromCreator.Aux_Engine_Value
						Aux_Engine_Model_Year=getBoatFromCreator.Aux_Engine_Model_Year
						Aux_Engine_Manufacturer=getBoatFromCreator.Aux_Engine_Manufacturer
						Auxiliary_Engine_Serial=getBoatFromCreator.Auxiliary_Engine_Serial
						Aux_Engine_HP_Thrust=getBoatFromCreator.Aux_Engine_HP_Thrust
						Is_this_boat_financed=getBoatFromCreator.Is_this_boat_financed
						Opt_In_for_RCV=getBoatFromCreator.Opt_In_for_RCV
						Policy_Coverage_Type=option
						Referral_Status=getBoatFromCreator.Referral_Status
						Referral_Replacement_cost=getBoatFromCreator.Referral_Replacement_cost
						Referral_Actual_Cash_Value=getBoatFromCreator.Referral_Actual_Cash_Value
						Referral_Boat_Model_Year=getBoatFromCreator.Referral_Boat_Model_Year
						Referral_Principal_operator_20_years=getBoatFromCreator.Referral_Principal_operator_20_years
						Referral_Principal_Operator=getBoatFromCreator.Referral_Principal_Operator
						Referral_Does_the_operator_hold_a_Pleasure_Craft_Operator_Card_PCOC=getBoatFromCreator.Referral_Does_the_operator_hold_a_Pleasure_Craft_Operator_Card_PCOC
						Referral_Watercraft_Type=getBoatFromCreator.Referral_Watercraft_Type
						Referral_How_many_motor_vehicle_Convictions=getBoatFromCreator.Referral_How_many_motor_vehicle_Convictions
						Referral_How_many_motor_vehicle_claims=getBoatFromCreator.Referral_How_many_motor_vehicle_claims
						Referral_Has_the_principal_operator_had_their_driver_s_license_suspended=getBoatFromCreator.Referral_Has_the_principal_operator_had_their_driver_s_license_suspended
						Referral_Hull_Type=getBoatFromCreator.Referral_Hull_Type
						Referral_Tender_lenght=getBoatFromCreator.Referral_Length
						Referral_Length=getBoatFromCreator.Referral_Length
						Referral_Trailer_Length=getBoatFromCreator.Referral_Trailer_Length
						Referral_Main_Engine=getBoatFromCreator.Referral_Main_Engine
						Referral_Do_any_of_the_above_statements_apply_to_the_watercraft1=getBoatFromCreator.Referral_Do_any_of_the_above_statements_apply_to_the_watercraft1
						Referral_Do_any_of_the_above_apply_to_the_watercraft=getBoatFromCreator.Referral_Do_any_of_the_above_apply_to_the_watercraft
						Referral_Do_any_of_the_above_statements_apply_to_the_watercraft=getBoatFromCreator.Referral_Do_any_of_the_above_statements_apply_to_the_watercraft
						Referral_Do_any_of_the_above_apply_to_the_Applicant=getBoatFromCreator.Referral_Do_any_of_the_above_apply_to_the_Applicant
						Referral_Reason=getBoatFromCreator.Referral_Reason
						BoatQuote=BoatData
					];
				}
			}
			BoatQCreator = BoatQuote[ID = BoatID];
			if(BoatQCreator.count() > 0)
			{
				if(getBoat.Fee != null)
				{
					beforeAmnt = ifnull(PremiumAmount,0) + ifnull(getBoat.Fee.toDecimal(),0);
					TaxAmnt = beforeAmnt * getBoat.Tax_Precent.toDecimal() / 100;
					afterTax = ifnull(beforeAmnt,0) + ifnull(TaxAmnt,0);
				}
				else
				{
					beforeAmnt = (ifnull(PremiumAmount,0) + ifnull(getBoat.Fee,0)).toDecimal();
					TaxAmnt = beforeAmnt * ifnull(getBoat.Tax_Precent.toDecimal(),0) / 100;
					afterTax = ifnull(beforeAmnt,0) + ifnull(TaxAmnt,0);
				}
				BoatQCreator.Total_Premium_before_tax=PremiumAmount;
				BoatQCreator.Fee=getBoat.Fee;
				BoatQCreator.Tax_Province=getBoat.Tax_Province;
				BoatQCreator.Tax_Precent=getBoat.Tax_Precent;
				BoatQCreator.Total_Tax=ifnull(TaxAmnt.round(2),0);
				BoatQCreator.Total_Payable_Premium_after_tax=ifnull(afterTax.round(2),0);
			}
			thisapp.Server_Side.Latest_Boat_Quote_Sync_Create_and_Update(BoatData.toLong(),"CREATE");
			getRenewal = BoatQuote[ID == BoatData];
			if(getRenewal.Stripe_Payment_Method_Details != "" || getRenewal.Stripe_Payment_Method_Details != null)
			{
				getEndPointfromCreator = API_Configuration[Name_Process == "Boat AutoCharge API"];
				if(getEndPointfromCreator.count() > 0)
				{
					AutoChargeAPIENDPOINT = getEndPointfromCreator.End_Point;
					parammap = Map();
					getOrg = invokeurl
					[
						url :"https://www.zohoapis.com/creator/custom/service_recprotect/Org_Info?publickey=UsNgXbMvJ3pYHuDGtsgdsbhCR"
						type :GET
					];
					parammap.put("organization_id",getOrg.get("result"));
					// 				parammap.put("organization_id","RECPROTECT1");
					parammap.put("quote_record_id",ifNull(getRenewal.Quote_Record_ID_Server,""));
					parammap.put("policy_change_balance",getRenewal.Total_Payable_Premium_after_tax);
					parammap.put("payment_for","RENEWAL");
					parammap.put("stripe_customer_id",ifNull(getRenewal.Stripe_Customer_ID,""));
					parammap.put("payment_method_id",ifNull(getRenewal.Stripe_Payment_Method_ID,""));
					apiMethod = "POST";
					if(apiMethod == "POST")
					{
						headerMap = Map();
						headerMap.put("Content-Type","application/json");
						resp = invokeurl
						[
							url :AutoChargeAPIENDPOINT
							type :POST
							parameters:parammap.toString()
							headers:headerMap
						];
					}
					if(resp.get("success") == "true")
					{
						paymentStatusUpdateMap = Map();
						paymentStatusUpdateMap.put("Payment_Status","Paid");
						if(getRenewal.Zoho_Crm_ID != null && getRenewal.Zoho_Crm_ID != "")
						{
							updatePaymentStatusUpdate = zoho.crm.updateRecord("Deals",getRenewal.Zoho_Crm_ID.toLong(),paymentStatusUpdateMap);
						}
						if(getBoat.Total_Payable_Premium_after_tax > 0)
						{
							transacDetaSubform = Collection();
							totalAmnt = getRenewal.Total_Premium_before_tax;
							TaxAmnt = (totalAmnt.toDecimal() * TaxPercent.toDecimal()) / 100;
							AmntWithTax = totalAmnt + TaxAmnt;
							row1 = Transaction_Table.Transaction_Details();
							row1.Product_Name=5778486000017783005;
							row1.Amount=ifnull(getBoat.Total_Premium_before_tax,null);
							row1.Tax=TaxPercentID;
							row1.Tax_Amount=TaxAmnt.round(2);
							row1.Amount_With_Tax=AmntWithTax.round(2);
							transacDetaSubform.insert(row1);
							TransactionTable = insert into Transaction_Table
							[
								Added_User=zoho.loginuser
								Total_Amount_With_Tax=AmntWithTax.round(2)
								Tax_Amount=TaxAmnt.round(2)
								Total_Amount_Without_Tax=getRenewal.Total_Premium_before_tax
								Customer_Name=getRenewal.Customer_ID
								Deal_Name=getRenewal.Zoho_Crm_ID
								Business_Process="Renewal"
								Type_of_Transaction="Invoice"
								Tracking_of_creation_of_Charge="Auto-Charge"
								Policy_Type="Boat Policy"
								Date_field=zoho.currentdate.todate("dd-MMM-yyyy")
							];
						}
						else
						{
							transacDetaSubform = Collection();
							totalAmnt = getRenewal.Total_Premium_before_tax;
							TaxAmnt = (totalAmnt.toDecimal() * TaxPercent.toDecimal()) / 100;
							AmntWithTax = totalAmnt + TaxAmnt;
							row1 = Transaction_Table.Transaction_Details();
							row1.Product_Name=5778486000017783005;
							row1.Amount=ifnull(getRenewal.Total_Premium_before_tax,null);
							row1.Tax=TaxPercentID;
							row1.Tax_Amount=TaxAmnt.round(2);
							row1.Amount_With_Tax=AmntWithTax.round(2);
							transacDetaSubform.insert(row1);
							TransactionTable = insert into Transaction_Table
							[
								Added_User=zoho.loginuser
								Total_Amount_With_Tax=AmntWithTax.round(2)
								Tax_Amount=TaxAmnt.round(2)
								Total_Amount_Without_Tax=getRenewal.Total_Premium_before_tax
								Customer_Name=getRenewal.Customer_ID
								Deal_Name=getRenewal.Zoho_Crm_ID
								Business_Process="Renewal"
								Type_of_Transaction="Credit Note"
								Tracking_of_creation_of_Charge="Auto-Charge"
								Policy_Type="Boat Policy"
								Date_field=zoho.currentdate.todate("dd-MMM-yyyy")
							];
						}
						auditTracking = insert into Renewals_Audit_Tracking
						[
							Added_User=zoho.loginuser
							Process="Auto Charge Api"
							In_Response=parammap.toString()
							Out_Response=resp.tostring()
							Description="Auto charge - Boat - Success"
						];
					}
					else if(resp.get("success") == "false")
					{
						paymentStatusUpdateMap = Map();
						paymentStatusUpdateMap.put("Payment_Status","UnPaid");
						if(getBoat.Zoho_Crm_ID != null && getBoat.Zoho_Crm_ID != "")
						{
							updateRes = zoho.crm.updateRecord("Deals",getRenewal.Zoho_Crm_ID.tolong(),paymentStatusUpdateMap,{"trigger":{""}});
						}
						auditTracking = insert into Renewals_Audit_Tracking
						[
							Added_User=zoho.loginuser
							Process="Auto Charge Api"
							In_Response=parammap.toString()
							Out_Response=resp.tostring()
							Description="Auto charge - Boat - failure"
						];
					}
				}
			}
		}
	}
}