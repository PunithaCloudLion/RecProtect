void Renewal.Duplicate_Trailer_Policy_Creation_Renewal(int TrailerID)
{
	try 
	{
		thisapp.Developer.addActivityLog("Renewal.Duplicate_Trailer_Policy_Creation_Renewal--" + TrailerID.toString(),"Create duplicate Trailer Quote" + TrailerID.toString(),"Funcation Call Start","");
		getTrailer = TrailerQuote[ID == TrailerID];
		if(getTrailer.count() > 0)
		{
			eligibleCount = 0;
			for each  recTrailerCount in Trailer[TrailerQuote == getTrailer.ID && Eligible_for_auto_Renewal == true]
			{
				eligibleCount = eligibleCount + 1;
			}
			if(eligibleCount > 0)
			{
				msg = "";
				creatorID = getTrailer.ID;
				TaxProvinceName = getTrailer.Tax_Province;
				getTaxRate = Tax_Lists[State_Province == TaxProvinceName];
				if(getTaxRate.count() > 0)
				{
					TaxPercentID = getTaxRate.ID;
					TaxPercent = getTaxRate.Tax;
				}
				PolicyNumber = ifnull(getTrailer.Policy_Number,"") + " - FUTURE";
				QuoteID = ifnull(getTrailer.Quote_ID,"") + " - FUTURE";
				// Basic Info
				TrailerData = insert into TrailerQuote
				[
					Added_User=zoho.loginuser
					Quote_ID=QuoteID
					Organization_ID=getTrailer.Organization_ID
					Policy_Number=PolicyNumber
					Quote_Status=getTrailer.Quote_Status
					Policy_Status="INACTIVE - RENEWAL PENDING"
					Policy_AutoRenewal_Status=getTrailer.Policy_AutoRenewal_Status
					Deal_Type=getTrailer.Deal_Type
					Referral_Reason=getTrailer.Referral_Reason
					Source=getTrailer.Source
					Created_Source="CREATOR"
					Carrier="Four Points Insurance"
					Customer_ID=getTrailer.Customer_ID
					Insured_First_Name=getTrailer.Insured_First_Name
					Insured_Middle_Name=getTrailer.Insured_Middle_Name
					Insured_Last_Name=getTrailer.Insured_Last_Name
					Email=getTrailer.Email
					Link_Customer=getTrailer.Link_Customer
					Phone_Number=getTrailer.Phone_Number
					Date_of_Birth=getTrailer.Date_of_Birth
					Where_Did_You_Find_Us=getTrailer.Where_Did_You_Find_Us
					Name=getTrailer.Name
					Name_of_Dealership=getTrailer.Name_of_Dealership
					Name_of_Campground=getTrailer.Name_of_Campground
					Name_of_Marina=getTrailer.Name_of_Marina
					Tell_us_more=getTrailer.Tell_us_more
					Are_there_any_additional_names_on_the_trailer_ownership=getTrailer.Are_there_any_additional_names_on_the_trailer_ownership
					Please_select_the_province_your_trailer_is_located_in=getTrailer.Please_select_the_province_your_trailer_is_located_in
					How_many_trailers_would_you_like_to_insure=getTrailer.How_many_trailers_would_you_like_to_insure
					Expiry_Date=getTrailer.Expiry_Date
					Inception_Date=getTrailer.Inception_Date
					Last_Modified_Date=getTrailer.Last_Modified_Date
					Sales_Date=getTrailer.Sales_Date
					Bind_Date=getTrailer.Bind_Date
					Country=getTrailer.Country
					Address=getTrailer.Address
					Suite_Apt=getTrailer.Suite_Apt
					City=getTrailer.City
					Province=getTrailer.Province
					Postal_code_ZIP_Code=getTrailer.Postal_code_ZIP_Code
					Override_Tax_by_Admin=getTrailer.Override_Tax_by_Admin
					Override_Tax=getTrailer.Override_Tax
					Enter_payment_info=getTrailer.Enter_payment_info
					Stripe_Payment_Method_ID=getTrailer.Stripe_Payment_Method_ID
					Stripe_Payment_Method_Details=getTrailer.Stripe_Payment_Method_Details
					Stripe_Customer_ID=getTrailer.Stripe_Customer_ID
					Payment_Status=getTrailer.Payment_Status
					Policy_UPO_Data=getTrailer.Policy_UPO_Data
					Nuvei_Transaction_ID=getTrailer.Nuvei_Transaction_ID
					OutStanding_Type=getTrailer.OutStanding_Type
					Outstanding=getTrailer.Outstanding
					Prorated=getTrailer.Prorated
					Tax=getTrailer.Tax
					Total=getTrailer.Total
					Prorate_From=getTrailer.Prorate_From
					Waive_Fee=getTrailer.Waive_Fee
					Reason_For_Rejection1=getTrailer.Reason_For_Rejection1
					Signature_Accept_Text=getTrailer.Signature_Accept_Text
					Email_List=getTrailer.Email_List
					Select_Rate=getTrailer.Select_Rate
					Zoho_Crm_ID=getTrailer.Zoho_Crm_ID
					Quote_Policy_Type="Renewal"
					Slave_Customer=getTrailer.Slave_Customer
					Renewal_From_Old_Policy_ID=creatorID
					Is_AutoCharge_Enabled=getTrailer.Is_AutoCharge_Enabled
					Nuvei_Unique_Payment_Option_ID=getTrailer.Nuvei_Unique_Payment_Option_ID
					Agree_to_terms_and_conditions=getTrailer.Agree_to_terms_and_conditions
					UPO_Data=getTrailer.UPO_Data
				];
				thisapp.Developer.addActivityLog("Renewal.Duplicate_Trailer_Policy_Creation_Renewal--" + TrailerID.toString(),"Create duplicate Trailer Quote" + TrailerID.toString(),"Record Created in Trailer",TrailerData.tostring());
				// Additional Names subform
				getAllCustomers = Additional_Names_Trailer[Trailer_Quotation == creatorID];
				if(getAllCustomers.count() > 0)
				{
					for each  cus in getAllCustomers
					{
						getCust = Additional_Names_Trailer[ID == cus.ID];
						if(getCust.count() > 0)
						{
							additionalnamescus = insert into Additional_Names_Trailer
							[
								Added_User=zoho.loginuser
								Customer_ID=getCust.Customer_ID
								First_Name=getCust.First_Name
								Last_Name=getCust.Last_Name
								Email=getCust.Email
								Link_Customer=getCust.Link_Customer
								Phone_Number=getCust.Phone_Number
								DOB=getCust.DOB
								Trailer_Quotation=TrailerData
							];
							thisapp.Developer.addActivityLog("Renewal.Duplicate_Trailer_Policy_Creation_Renewal--" + TrailerID.toString(),"Create duplicate Trailer Quote" + TrailerID.toString(),"Record Created in Additional Contacts",additionalnamescus.tostring());
						}
					}
				}
				// Trailer subform
				trailer_List = List();
				TotalTrailers = 0;
				PremiumAmount = 0;
				getAllTrailerLines = Trailer[TrailerQuote == creatorID];
				//		info "getAllTrailerLines -- > " + getAllTrailerLines;
				for each  trailer in getAllTrailerLines
				{
					getTrailerFromCreator = Trailer[ID == trailer.ID];
					//Email Content
					msg = msg + "<br>" + getTrailerFromCreator.Trailer_Model_Year + "," + getTrailerFromCreator.Trailer_Manufacturer + "," + getTrailerFromCreator.Trailer_Model + "," + getTrailerFromCreator.Select_Trailer_Type + "";
					//Subform Starts Here
					if(getTrailerFromCreator.Overland_Water_Protection == false)
					{
						OverlandWaterProtection = true;
					}
					else
					{
						OverlandWaterProtection = getTrailerFromCreator.Overland_Water_Protection;
					}
					if(getTrailerFromCreator.Premises_Liability < 2000000.00)
					{
						PremisesLiability = 2000000.00;
					}
					else
					{
						PremisesLiability = getTrailerFromCreator.Premises_Liability;
					}
					//			info "Eligible for_auto_Renewal " + getTrailerFromCreator.Eligible_for_auto_Renewal;
					if(getTrailerFromCreator.Eligible_for_auto_Renewal == true)
					{
						TotalTrailers = TotalTrailers + 1;
						// Calculate Coverage Premium
						getEndPointfromCreator = API_Configuration[Name_Process == "Calculate Coverage Premium - Trailer"];
						if(getEndPointfromCreator.count() > 0)
						{
							AutoChargeAPIENDPOINTPremium = getEndPointfromCreator.End_Point;
							parammap = Map();
							getOrg = invokeurl
							[
								url :"https://www.zohoapis.com/creator/custom/service_recprotect/Org_Info?publickey=UsNgXbMvJ3pYHuDGtsgdsbhCR"
								type :GET
							];
							// info "Org " + getOrg.get("result");
							parammap.put("organization_id",getOrg.get("result"));
							if(getTrailerFromCreator.Overland_Water_Protection == false)
							{
								parammap.put("is_ol_water_protection",true);
							}
							else
							{
								parammap.put("is_ol_water_protection",getTrailerFromCreator.Overland_Water_Protection);
							}
							if(!isNull(getTrailerFromCreator.Select_Trailer_Type))
							{
								parammap.put("trailer_type",getTrailerFromCreator.Select_Trailer_Type);
							}
							if(getTrailerFromCreator.Select_coverage_for_policy == "Replacement Value Coverage")
							{
								trailerValue = ifnull(getTrailerFromCreator.Replacement_Cost,0);
							}
							else if(getTrailerFromCreator.Select_coverage_for_policy == "Current Market Value Coverage")
							{
								trailerValue = ifnull(getTrailerFromCreator.Actual_Cash_Value,0);
							}
							else
							{
								trailerValue = 0;
							}
							parammap.put("trailer_value",trailerValue);
							deductiableValue = 0;
							if(!isNull(getTrailerFromCreator.Deductible))
							{
								deductiableValue = getTrailerFromCreator.Deductible;
								if(getTrailerFromCreator.Deductible.contains("$") == true)
								{
									deductiableValue = getTrailerFromCreator.Deductible.remove("$").toDecimal();
								}
							}
							parammap.put("deductible_value",deductiableValue);
							if(getTrailerFromCreator.Premises_Liability < 2000000.00)
							{
								parammap.put("liability_value",2000000.00);
							}
							else
							{
								parammap.put("liability_value",if(!isNull(getTrailerFromCreator.Premises_Liability),getTrailerFromCreator.Premises_Liability,0));
							}
							parammap.put("is_seasonally_parked",getTrailerFromCreator.Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground);
							parammap.put("is_preferred_parks",false);
							check25years = false;
							if(!isNull(getTrailerFromCreator.Trailer_Model))
							{
								calculate25Years = zoho.currentdate.getYear() - getTrailerFromCreator.Trailer_Model.toNumber();
								check25years = if(calculate25Years > 25,true,false);
							}
							parammap.put("is_trailer_over_25years",check25years);
							parammap.put("is_golf_cart_added",if(getTrailerFromCreator.Would_you_like_to_insure_a_golf_cart == "Yes",true,false));
							golfValue = (ifnull(getTrailerFromCreator.Value_of_Golf_Cart_1,0) + ifnull(getTrailerFromCreator.Value_of_Golf_Cart_2,0)).toDecimal();
							// 		info golfValue ;
							parammap.put("total_golf_cart_value",golfValue.toDecimal());
							personalPropcover = 0;
							if(getTrailerFromCreator.PP_Admin_Override == true)
							{
								if(!isNull(getTrailerFromCreator.Personal_Property_Coverage_T_V_Furniture_etc))
								{
									if(getTrailerFromCreator.Personal_Property_Coverage_T_V_Furniture_etc.isNumber() == true)
									{
										personalPropcover = getTrailerFromCreator.Personal_Property_Coverage_T_V_Furniture_etc;
									}
								}
							}
							parammap.put("overrided_personal_prop_cov_value",personalPropcover);
							detachVal = 0;
							if(getTrailerFromCreator.DPS_Coverage_Admin_Override == true)
							{
								if(!isNull(getTrailerFromCreator.Detached_Private_Structure_Coverage_Sheds_etc))
								{
									if(getTrailerFromCreator.Detached_Private_Structure_Coverage_Sheds_etc.isNumber() == true)
									{
										detachVal = getTrailerFromCreator.Detached_Private_Structure_Coverage_Sheds_etc;
									}
								}
							}
							parammap.put("overrided_detached_priv_stru_cov_value",detachVal);
							parammap.put("opted_snowbird_endorsement",getTrailerFromCreator.Add_Snowbird_Endorsement);
							if(!isNull(getTrailerFromCreator.Coverage_Type))
							{
								parammap.put("coverage_type",getTrailerFromCreator.Coverage_Type);
							}
							headerMap = Map();
							headerMap.put("Content-Type","application/json");
							trailerpost = invokeurl
							[
								url :AutoChargeAPIENDPOINTPremium
								type :POST
								parameters:parammap.toString()
								headers:headerMap
							];
							if(trailerpost.get("success") == true)
							{
								PremiumPerYear = ifnull(trailerpost.get("data").get("total_premium"),0);
								PremiumAmount = ifnull(trailerpost.get("data").get("total_premium"),0);
								auditTracking = insert into Renewals_Audit_Tracking
								[
									Added_User=zoho.loginuser
									Process="Coverage Premium API"
									In_Response=parammap.toString()
									Out_Response=trailerpost.tostring()
									Description="Coverage Premium  - Trailer - Success"
								];
							}
							else
							{
								PremiumPerYear = 0;
								PremiumAmount = 0;
								auditTracking = insert into Renewals_Audit_Tracking
								[
									Added_User=zoho.loginuser
									Process="Coverage Premium API"
									In_Response=parammap.toString()
									Out_Response=trailerpost.tostring()
									Description="Coverage Premium  - Trailer - failure"
								];
							}
						}
						TrailersSubform = insert into Trailer
						[
							Added_User=zoho.loginuser
							Premium_Per_Year=PremiumPerYear
							Select_Trailer_Type=getTrailerFromCreator.Select_Trailer_Type
							Trailer_Model_Year=getTrailerFromCreator.Trailer_Model_Year
							Are_you_the_original_owner_of_the_trailer=getTrailerFromCreator.Are_you_the_original_owner_of_the_trailer
							How_long_have_you_owned_this_trailer=getTrailerFromCreator.How_long_have_you_owned_this_trailer
							Replacement_Cost=getTrailerFromCreator.Replacement_Cost
							Actual_Cash_Value=getTrailerFromCreator.Actual_Cash_Value
							Is_your_trailer_parked_within_500_feet_of_a_body_of_water=getTrailerFromCreator.Is_your_trailer_parked_within_500_feet_of_a_body_of_water
							Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground=getTrailerFromCreator.Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground
							Where_is_the_trailer_stored_while_not_in_use=getTrailerFromCreator.Where_is_the_trailer_stored_while_not_in_use
							Is_the_trailer_taken_into_the_USA_for_more_than_180_days=getTrailerFromCreator.Is_the_trailer_taken_into_the_USA_for_more_than_180_days
							Is_the_trailer_removed_from_the_park_in_the_off_season=getTrailerFromCreator.Is_the_trailer_removed_from_the_park_in_the_off_season
							Please_provide_address_of_storage_location=getTrailerFromCreator.Please_provide_address_of_storage_location
							Do_you_have_a_deck=getTrailerFromCreator.Do_you_have_a_deck
							Do_you_have_a_screened_in_room_or_a_Florida_room=getTrailerFromCreator.Do_you_have_a_screened_in_room_or_a_Florida_room
							Do_you_have_a_hard_awning=getTrailerFromCreator.Do_you_have_a_hard_awning
							Would_you_like_to_insure_a_golf_cart=getTrailerFromCreator.Would_you_like_to_insure_a_golf_cart
							Number_of_Golf_Cart=getTrailerFromCreator.Number_of_Golf_Cart
							Value_of_Golf_Cart_1=getTrailerFromCreator.Value_of_Golf_Cart_1
							Value_of_Golf_Cart_2=getTrailerFromCreator.Value_of_Golf_Cart_2
							Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2=getTrailerFromCreator.Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2
							Select_a_Park=getTrailerFromCreator.Select_a_Park
							Select_a_Park1=getTrailerFromCreator.Select_a_Park1
							Park_Name=getTrailerFromCreator.Park_Name
							Address_Lines1=getTrailerFromCreator.Address_Lines1
							Address_line1=getTrailerFromCreator.Address_line1
							Address_line2=getTrailerFromCreator.Address_line2
							City=getTrailerFromCreator.City
							City1=getTrailerFromCreator.City1
							Province=getTrailerFromCreator.Province
							Province1=getTrailerFromCreator.Province1
							PostalCode=getTrailerFromCreator.PostalCode
							Postal_Code=getTrailerFromCreator.Postal_Code
							Country=getTrailerFromCreator.Country
							Site_Number=getTrailerFromCreator.Site_Number
							Select_coverage_for_policy=getTrailerFromCreator.Select_coverage_for_policy
							Coverage_Type=getTrailerFromCreator.Coverage_Type
							Trailer_Coverage=getTrailerFromCreator.Trailer_Coverage
							Overland_Water_Protection=OverlandWaterProtection
							Detached_Private_Structure_Coverage_Sheds_etc=getTrailerFromCreator.Detached_Private_Structure_Coverage_Sheds_etc
							DPS_Coverage_Admin_Override=getTrailerFromCreator.DPS_Coverage_Admin_Override
							PP_Admin_Override=getTrailerFromCreator.PP_Admin_Override
							Deductible=getTrailerFromCreator.Deductible
							Personal_Property_Coverage_T_V_Furniture_etc=getTrailerFromCreator.Personal_Property_Coverage_T_V_Furniture_etc
							Premises_Liability=PremisesLiability
							Golf_Cart=getTrailerFromCreator.Golf_Cart
							Recalculate=getTrailerFromCreator.Recalculate
							Show_Premium_Breakdown=getTrailerFromCreator.Show_Premium_Breakdown
							Trailer_Base_Premium=getTrailerFromCreator.Trailer_Base_Premium
							Liability_Prem=getTrailerFromCreator.Liability_Prem
							Trailer_over_25_years_sur=getTrailerFromCreator.Trailer_over_25_years_sur
							Preferred_Parks_Disc=getTrailerFromCreator.Preferred_Parks_Disc
							Seasonally_Parked_disc=getTrailerFromCreator.Seasonally_Parked_disc
							Personal_Prop_Cov=getTrailerFromCreator.Personal_Prop_Cov
							Detached_Priv_Stru_Cov=getTrailerFromCreator.Detached_Priv_Stru_Cov
							Golf_Excess_Prem=getTrailerFromCreator.Golf_Excess_Prem
							Golf_Prem_Base=getTrailerFromCreator.Golf_Prem_Base
							Ol_Water_Protection_Prem=getTrailerFromCreator.Ol_Water_Protection_Prem
							Add_Snowbird_Endorsement=getTrailerFromCreator.Add_Snowbird_Endorsement
							Do_you_live_in_the_trailer_full_time_all_year_round_as_a_principal_residence=getTrailerFromCreator.Do_you_live_in_the_trailer_full_time_all_year_round_as_a_principal_residence
							Non_Domestic_Address=getTrailerFromCreator.Non_Domestic_Address
							Is_the_unit_used_strictly_for_pleasure_purposes_with_no_rental_or_business_use_of_any_kind=getTrailerFromCreator.Is_the_unit_used_strictly_for_pleasure_purposes_with_no_rental_or_business_use_of_any_kind
							Is_there_any_heating_that_wasn_t_factory_installed_wood_stove_pellet_stove_etc=getTrailerFromCreator.Is_there_any_heating_that_wasn_t_factory_installed_wood_stove_pellet_stove_etc
							Heating_Type=getTrailerFromCreator.Heating_Type
							Is_this_a_dual_purpose_trailer_toy_hauler_horse_trailer=getTrailerFromCreator.Is_this_a_dual_purpose_trailer_toy_hauler_horse_trailer
							Trailer_Purpose_Type=getTrailerFromCreator.Trailer_Purpose_Type
							Please_select_which_items_are_being_hauled=getTrailerFromCreator.Please_select_which_items_are_being_hauled
							Are_there_any_modifications_to_the_trailer_ie_Addition_of_permanently_installed_solar_panels=getTrailerFromCreator.Are_there_any_modifications_to_the_trailer_ie_Addition_of_permanently_installed_solar_panels
							select_the_modification_trailer_type=getTrailerFromCreator.select_the_modification_trailer_type
							Are_the_solar_panels_factory_dealer_installed=getTrailerFromCreator.Are_the_solar_panels_factory_dealer_installed
							Please_add_details_on_interior_upgrades=getTrailerFromCreator.Please_add_details_on_interior_upgrades
							Is_there_any_pre_existing_damage_on_the_trailer=getTrailerFromCreator.Is_there_any_pre_existing_damage_on_the_trailer
							Describe_Damage=getTrailerFromCreator.Describe_Damage
							This_insurance_policy_does_not_cover_aftermarket_solar_panels_or_any_damage_arising_from_the_insta=getTrailerFromCreator.This_insurance_policy_does_not_cover_aftermarket_solar_panels_or_any_damage_arising_from_the_insta
							Describe_modifications=getTrailerFromCreator.Describe_modifications
							Is_the_trailer_motorized_and_able_to_travel_on_its_own_without_a_towing_vehicle=getTrailerFromCreator.Is_the_trailer_motorized_and_able_to_travel_on_its_own_without_a_towing_vehicle
							Is_this_trailer_financed=getTrailerFromCreator.Is_this_trailer_financed
							Lein_holder=getTrailerFromCreator.Lein_holder
							Name_of_Financier=getTrailerFromCreator.Name_of_Financier
							Trailer_Manufacturer=getTrailerFromCreator.Trailer_Manufacturer
							Trailer_Model=getTrailerFromCreator.Trailer_Model
							Trailer_Length=getTrailerFromCreator.Trailer_Length
							Trailer_Width=getTrailerFromCreator.Trailer_Width
							VIN=getTrailerFromCreator.VIN
							Deck_Length=getTrailerFromCreator.Deck_Length
							Deck_Width=getTrailerFromCreator.Deck_Width
							Screened_in_room_or_Florida_room_Length=getTrailerFromCreator.Screened_in_room_or_Florida_room_Length
							Screened_in_room_or_Florida_room_Width=getTrailerFromCreator.Screened_in_room_or_Florida_room_Width
							Hard_Awning_Length=getTrailerFromCreator.Hard_Awning_Length
							Hard_Awning_Width=getTrailerFromCreator.Hard_Awning_Width
							Trailer_Model_Age=getTrailerFromCreator.Trailer_Model_Age
							Referral_Status=getTrailerFromCreator.Referral_Status
							Referral_Replacement_cost=getTrailerFromCreator.Referral_Replacement_cost
							Referral_Actual_cash_value=getTrailerFromCreator.Referral_Actual_cash_value
							Referral_Is_the_trailer_taken_into_USA=getTrailerFromCreator.Referral_Is_the_trailer_taken_into_USA
							Referral_Golf_cart=getTrailerFromCreator.Referral_Golf_cart
							Referral_Do_you_live_in_the_trailer=getTrailerFromCreator.Referral_Do_you_live_in_the_trailer
							Referral_business_use_of_any_kind=getTrailerFromCreator.Referral_business_use_of_any_kind
							Referral_Is_this_a_dual_purpose_trailer=getTrailerFromCreator.Referral_Is_this_a_dual_purpose_trailer
							Referral_Are_the_any_modificationa_to_trailer=getTrailerFromCreator.Referral_Are_the_any_modificationa_to_trailer
							Referalselect_the_modification_trailer_type=getTrailerFromCreator.Referalselect_the_modification_trailer_type
							Referral_Is_there_any_heating=getTrailerFromCreator.Referral_Is_there_any_heating
							Referral_Is_there_any_pre_existing_damage_on_the_trailer=getTrailerFromCreator.Referral_Is_there_any_pre_existing_damage_on_the_trailer
							Referral_Is_the_trailer_motorized=getTrailerFromCreator.Referral_Is_the_trailer_motorized
							Referral_Reason=getTrailerFromCreator.Referral_Reason
							TrailerQuote=TrailerData
						];
						//					info "TrailersSubform -- > " + TrailersSubform;
					}
					//				info "test final";
				}
				//		info "Test Quote  --> " + TrailerData;
				TrailerQCreator = TrailerQuote[ID = TrailerData];
				//		info "TrailerQCreator -- > " + TrailerQCreator;
				if(TrailerQCreator.count() > 0)
				{
					if(getTrailer.Fee != null)
					{
						beforeAmnt = ifnull(PremiumAmount,0) + ifnull(getTrailer.Fee.toDecimal(),0);
						TaxAmnt = beforeAmnt * getTrailer.Tax_Precent.toDecimal() / 100;
						afterTax = ifnull(beforeAmnt,0) + ifnull(TaxAmnt,0);
					}
					else
					{
						beforeAmnt = (ifnull(PremiumAmount,0) + ifnull(getTrailer.Fee,0)).toDecimal();
						TaxAmnt = beforeAmnt * ifnull(getTrailer.Tax_Precent.toDecimal(),0) / 100;
						afterTax = ifnull(beforeAmnt,0) + ifnull(TaxAmnt,0);
					}
					TrailerQCreator.Total_Premium_before_tax=PremiumAmount;
					TrailerQCreator.Fee=getTrailer.Fee;
					TrailerQCreator.Tax_Province=getTrailer.Tax_Province;
					TrailerQCreator.Tax_Precent=getTrailer.Tax_Precent;
					TrailerQCreator.Total_Tax=ifnull(TaxAmnt.round(2),0);
					TrailerQCreator.Total_Payable_Premium_after_tax=ifnull(afterTax.round(2),0);
				}
				thisapp.Server_Side.Latest_Trailer_Quote_Sync_Create_and_Update(TrailerData.toLong(),"CREATE");
				getREnewal = TrailerQuote[ID == TrailerData];
				if(getREnewal.Stripe_Payment_Method_Details != "" || getREnewal.Stripe_Payment_Method_Details != null)
				{
					getEndPointfromCreator = API_Configuration[Name_Process == "Trailer AutoCharge API"];
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
						parammap.put("quote_record_id",ifNull(getREnewal.Quote_Record_ID_Server,""));
						parammap.put("policy_change_balance",getREnewal.Total_Payable_Premium_after_tax);
						parammap.put("payment_for","RENEWAL");
						parammap.put("stripe_customer_id",ifNull(getREnewal.Stripe_Customer_ID,""));
						parammap.put("payment_method_id",ifNull(getREnewal.Stripe_Payment_Method_ID,""));
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
							if(getREnewal.Zoho_Crm_ID != null && getREnewal.Zoho_Crm_ID != "")
							{
								updateRes = zoho.crm.updateRecord("Deals",getREnewal.Zoho_Crm_ID.tolong(),paymentStatusUpdateMap,{"trigger":{""}});
							}
							if(getREnewal.Total_Payable_Premium_after_tax > 0)
							{
								transacDetaSubform = Collection();
								totalAmnt = getREnewal.Total_Premium_before_tax;
								TaxAmnt = (totalAmnt.toDecimal() * TaxPercent.toDecimal()) / 100;
								AmntWithTax = totalAmnt + TaxAmnt;
								row1 = Transaction_Table.Transaction_Details();
								row1.Product_Name=5778486000017783010;
								row1.Amount=ifnull(getREnewal.Total_Premium_before_tax,null);
								row1.Tax=TaxPercentID;
								row1.Tax_Amount=TaxAmnt.round(2);
								row1.Amount_With_Tax=AmntWithTax.round(2);
								transacDetaSubform.insert(row1);
								TransactionTable = insert into Transaction_Table
								[
									Added_User=zoho.loginuser
									Total_Amount_With_Tax=AmntWithTax.round(2)
									Tax_Amount=TaxAmnt.round(2)
									Total_Amount_Without_Tax=getREnewal.Total_Premium_before_tax
									Customer_Name=getREnewal.Customer_ID
									Deal_Name=getREnewal.Zoho_Crm_ID
									Business_Process="Renewal"
									Type_of_Transaction="Invoice"
									Tracking_of_creation_of_Charge="Auto-Charge"
									Policy_Type="Trailer Policy"
									Date_field=zoho.currentdate.todate("dd-MMM-yyyy")
								];
							}
							else
							{
								transacDetaSubform = Collection();
								totalAmnt = getREnewal.Total_Premium_before_tax;
								TaxAmnt = (totalAmnt.toDecimal() * TaxPercent.toDecimal()) / 100;
								AmntWithTax = totalAmnt + TaxAmnt;
								row1 = Transaction_Table.Transaction_Details();
								row1.Product_Name=5778486000017783010;
								row1.Amount=ifnull(getREnewal.Total_Premium_before_tax,null);
								row1.Tax=TaxPercentID;
								row1.Tax_Amount=TaxAmnt.round(2);
								row1.Amount_With_Tax=AmntWithTax.round(2);
								transacDetaSubform.insert(row1);
								TransactionTable = insert into Transaction_Table
								[
									Added_User=zoho.loginuser
									Total_Amount_With_Tax=AmntWithTax.round(2)
									Tax_Amount=TaxAmnt.round(2)
									Total_Amount_Without_Tax=getREnewal.Total_Premium_before_tax
									Customer_Name=getREnewal.Customer_ID
									Deal_Name=getREnewal.Zoho_Crm_ID
									Business_Process="Renewal"
									Type_of_Transaction="Credit Note"
									Tracking_of_creation_of_Charge="Auto-Charge"
									Policy_Type="Trailer Policy"
									Date_field=zoho.currentdate.todate("dd-MMM-yyyy")
								];
							}
							auditTracking = insert into Renewals_Audit_Tracking
							[
								Added_User=zoho.loginuser
								Process="Auto Charge Api"
								In_Response=parammap.toString()
								Out_Response=resp.tostring()
								Description="Auto charge - Trailer - Success"
							];
						}
						else if(resp.get("success") == "false")
						{
							paymentStatusUpdateMap = Map();
							paymentStatusUpdateMap.put("Payment_Status","UnPaid");
							if(getREnewal.Zoho_Crm_ID != null && getREnewal.Zoho_Crm_ID != "")
							{
								updateRes = zoho.crm.updateRecord("Deals",getREnewal.Zoho_Crm_ID.tolong(),paymentStatusUpdateMap,{"trigger":{""}});
							}
							auditTracking = insert into Renewals_Audit_Tracking
							[
								Added_User=zoho.loginuser
								Process="Auto Charge Api"
								In_Response=parammap.toString()
								Out_Response=resp.tostring()
								Description="Auto charge - Trailer - failure"
							];
						}
					}
				}
			}
		}
		thisapp.Developer.addActivityLog("Renewal.Duplicate_Trailer_Policy_Creation_Renewal--" + TrailerID.toString(),"Create duplicate Trailer Quote" + TrailerID.toString(),"Funcation Call End","");
	}
	catch (e)
	{
		thisapp.Developer.addDeveloperLog("Trailer Quote","Trailer - Create Duplicate Record(Renewal.Duplicate_Trailer_Policy_Creation_Renewal)--" + TrailerID.toString(),"Trailer - Create Duplicate Record","",e,"creator");
	}
}