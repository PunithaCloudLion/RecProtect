void Migration.RenewalBoatMigration()
{
	getBoatMigration = Boat_Migration[ID == 4564627000002125339];
	if(getBoatMigration.count() > 0)
	{
		for each  migRec in getBoatMigration
		{
			creatorQuoteMigratedStatusList = List();
			creatorContactMigratedStatusList = List();
			creatorQuoteMigratedStatusList.add("Renewal Updated");
			getBoat = BoatQuote[Policy_Number == migRec.Policy_Number];
			customerID = null;
			if(getBoat.count() > 0)
			{
				if(migRec.Phone != null && migRec.Phone != "")
				{
					formattedPhoneNumber = migRec.Phone.replaceAll("[/\-\(\)_@#\^!\$%\&\*:;`~ ]","");
					formattedPhoneNumber = "+1" + formattedPhoneNumber;
				}
				else
				{
					formattedPhoneNumber = "";
				}
				if(migRec.Were_you_referred_by_a_friend_or_business1 == true)
				{
					referraltype = "Friend or Family";
					referralName = migRec.Enter_the_friend_s_name;
				}
				else
				{
					referraltype = "";
					referralName = "";
				}
				if(migRec.Email1 == getBoat.Email)
				{
					fetCreatorContact = Customer[ID == getBoat.Customer_ID];
					creatorContactMigratedStatusList.add("Updated Contact");
					creatorID = fetCreatorContact.ID;
					fetCreatorContact.Email=migRec.Email1;
					fetCreatorContact.First_Name=migRec.Insured_First_Name;
					fetCreatorContact.Last_Name=migRec.Insured_Last_Name;
					fetCreatorContact.City=migRec.City;
					fetCreatorContact.Country=migRec.Country;
					fetCreatorContact.Province=migRec.Province_State;
					fetCreatorContact.Postal_Code=migRec.Postal_Zip_Code;
					fetCreatorContact.Phone_Number=formattedPhoneNumber;
					fetCreatorContact.Address_Line1=migRec.Address;
					fetCreatorContact.Address_Line2=migRec.Suite_Apt;
					fetCreatorContact.Customer_Type="Contact";
					fetCreatorContact.Where_Did_You_Find_Us=referraltype;
					fetCreatorContact.Name=referralName;
					// 							Migration Section
					fetCreatorContact.Migrated=true;
					fetCreatorContact.Migrated_Status=creatorContactMigratedStatusList;
					fetCreatorContact.Trailer_Migration_ID=migRec.ID.tostring();
					fetCreatorContact.Contact_Type="Master";
					// 							fetCreatorContact.Customer_Type1="Contact";
					// 							Update Boat Migration Contact Module Section
					migRec.Contact_Type="Master";
					migRec.Valid_emailID="YES";
					migRec.Creator_Status="Success";
					migRec.Customer_Creator_ID=fetCreatorContact.ID;
					migRec.CRM_Contact_ID=fetCreatorContact.Zoho_Crm_ID.toString();
					migRec.CRM_Contact_Status="Success";
					migRec.Contact_Migrated_Status=creatorContactMigratedStatusList;
					updatecontactMap = Map();
					ContactlayoutMap = Map();
					ContactlayoutMap.put("id",5778486000007674550);
					emailUnique = zoho.crm.searchRecords("Contacts","(Email:equals:" + migRec.Email1 + ")");
					if(emailUnique.size() > 0)
					{
						updatecontactMap.put("Layout",ContactlayoutMap);
						updatecontactMap.put("Migrated_Status",creatorContactMigratedStatusList);
						updatecontactMap.put("Zoho_Creator_ID",creatorID.toString());
						updatecontactMap.put("Migrated",true);
						updatecontactMap.put("Contact_Type","Master");
						//Phone
						if(migRec.Phone != null && migRec.Phone != "")
						{
							// 								info "Phone " + formattedPhoneNumber;
							updatecontactMap.put("Phone",formattedPhoneNumber);
						}
						else
						{
							updatecontactMap.put("Phone",ifnull(emailUnique.get(0).get("Phone"),""));
						}
						//Mailing Country
						if(migRec.Country != null && migRec.Country != "")
						{
							updatecontactMap.put("Mailing_Country",migRec.Country);
						}
						else
						{
							updatecontactMap.put("Mailing_Country",ifnull(emailUnique.get(0).get("Mailing_Country"),""));
						}
						//Mailing Address
						if(migRec.Address != null && migRec.Address != "")
						{
							updatecontactMap.put("Mailing_Address",migRec.Address);
						}
						else
						{
							updatecontactMap.put("Mailing_Address",ifnull(emailUnique.get(0).get("Mailing_Address"),""));
						}
						//Mailing Street
						if(migRec.Suite_Apt != null && migRec.Suite_Apt != "")
						{
							// 								info "Suite_Apt  " + getBoat.Suite_Apt;
							updatecontactMap.put("Mailing_Street",migRec.Suite_Apt);
						}
						else
						{
							updatecontactMap.put("Mailing_Street",ifnull(emailUnique.get(0).get("Mailing_Street"),""));
						}
						//Mailing City
						if(migRec.City != null && migRec.City != "")
						{
							updatecontactMap.put("Mailing_City",migRec.City);
						}
						else
						{
							updatecontactMap.put("Mailing_City",ifnull(emailUnique.get(0).get("Mailing_City"),""));
						}
						//Mailing State
						if(migRec.Province_State != null && migRec.Province_State != "")
						{
							updatecontactMap.put("Mailing_State",migRec.Province_State);
						}
						else
						{
							updatecontactMap.put("Mailing_State",ifnull(emailUnique.get(0).get("Mailing_State"),""));
						}
						//Mailing Zip
						if(migRec.Postal_Zip_Code != null && migRec.Postal_Zip_Code != "")
						{
							updatecontactMap.put("Mailing_Zip",migRec.Postal_Zip_Code);
						}
						else
						{
							updatecontactMap.put("Mailing_Zip",ifnull(emailUnique.get(0).get("Mailing_Zip"),""));
						}
						// 						Referral Type
						if(referraltype != "" && referraltype != null)
						{
							updatecontactMap.put("Referral_Type",referraltype);
						}
						else
						{
							updatecontactMap.put("Referral_Type",ifnull(emailUnique.get(0).get("Referral_Type"),""));
						}
						// 						Referral Name
						if(referralName != "" && referralName != null)
						{
							updatecontactMap.put("Referral_Friend",referralName);
						}
						else
						{
							updatecontactMap.put("Referral_Friend",ifnull(emailUnique.get(0).get("Referral_Friend"),""));
						}
						// 							info "updatecontactMap " + updatecontactMap;
						updatecontactMap.put("Status1","Active");
						updatecontactMap.put("Owner",emailUnique.get(0).get("Owner").get("id"));
						updateCRMContact = zoho.crm.updateRecord("Contacts",emailUnique.get(0).get("id").toLong(),updatecontactMap,{"trigger":{"workflow"}});
						// 							info "updateCRMContact: " + updateCRMContact;
						if(updateCRMContact.containKey("id") == true && updateCRMContact.get("id") != null && updateCRMContact.get("id") != "")
						{
							migRec.CRM_Contact_ID=updateCRMContact.get("id").toString();
							migRec.CRM_Contact_Status="Success";
							migRec.Contact_Error_Msg="";
						}
						else
						{
							info "update contact error";
							info updateCRMContact;
							migRec.CRM_Contact_ID="";
							migRec.CRM_Contact_Status="Fail";
							migRec.Contact_Error_Msg=updateCRMContact.toString();
						}
					}
				}
				else
				{
					if(migRec.Insured_First_Name == getBoat.Insured_First_Name && migRec.Insured_Last_Name == getBoat.Insured_Last_Name)
					{
						fetCreatorContact = Customer[ID == getBoat.Customer_ID];
						creatorContactMigratedStatusList.add("Updated Contact");
						creatorID = fetCreatorContact.ID;
						fetCreatorContact.Email=migRec.Email1;
						fetCreatorContact.First_Name=migRec.Insured_First_Name;
						fetCreatorContact.Last_Name=migRec.Insured_Last_Name;
						fetCreatorContact.City=migRec.City;
						fetCreatorContact.Country=migRec.Country;
						fetCreatorContact.Province=migRec.Province_State;
						fetCreatorContact.Postal_Code=migRec.Postal_Zip_Code;
						fetCreatorContact.Phone_Number=formattedPhoneNumber;
						fetCreatorContact.Address_Line1=migRec.Address;
						fetCreatorContact.Address_Line2=migRec.Suite_Apt;
						fetCreatorContact.Customer_Type="Contact";
						fetCreatorContact.Where_Did_You_Find_Us=referraltype;
						fetCreatorContact.Name=referralName;
						// 							Migration Section
						fetCreatorContact.Migrated=true;
						fetCreatorContact.Migrated_Status=creatorContactMigratedStatusList;
						fetCreatorContact.Trailer_Migration_ID=migRec.ID.tostring();
						fetCreatorContact.Contact_Type="Master";
						// 							fetCreatorContact.Customer_Type1="Contact";
						// 							Update Boat Migration Contact Module Section
						migRec.Contact_Type="Master";
						migRec.Valid_emailID="YES";
						migRec.Creator_Status="Success";
						migRec.Customer_Creator_ID=fetCreatorContact.ID;
						migRec.CRM_Contact_ID=fetCreatorContact.Zoho_Crm_ID.toString();
						migRec.CRM_Contact_Status="Success";
						migRec.Contact_Migrated_Status=creatorContactMigratedStatusList;
						updatecontactMap = Map();
						ContactlayoutMap = Map();
						ContactlayoutMap.put("id",5778486000007674550);
						emailUnique = zoho.crm.searchRecords("Contacts","(Email:equals:" + migRec.Email1 + ")");
						if(emailUnique.size() > 0)
						{
							updatecontactMap.put("Layout",ContactlayoutMap);
							updatecontactMap.put("Migrated_Status",creatorContactMigratedStatusList);
							updatecontactMap.put("Zoho_Creator_ID",creatorID.toString());
							updatecontactMap.put("Migrated",true);
							updatecontactMap.put("Contact_Type","Master");
							//Phone
							if(migRec.Phone != null && migRec.Phone != "")
							{
								// 								info "Phone " + formattedPhoneNumber;
								updatecontactMap.put("Phone",formattedPhoneNumber);
							}
							else
							{
								updatecontactMap.put("Phone",ifnull(emailUnique.get(0).get("Phone"),""));
							}
							//Mailing Country
							if(migRec.Country != null && migRec.Country != "")
							{
								updatecontactMap.put("Mailing_Country",migRec.Country);
							}
							else
							{
								updatecontactMap.put("Mailing_Country",ifnull(emailUnique.get(0).get("Mailing_Country"),""));
							}
							//Mailing Address
							if(migRec.Address != null && migRec.Address != "")
							{
								updatecontactMap.put("Mailing_Address",migRec.Address);
							}
							else
							{
								updatecontactMap.put("Mailing_Address",ifnull(emailUnique.get(0).get("Mailing_Address"),""));
							}
							//Mailing Street
							if(migRec.Suite_Apt != null && migRec.Suite_Apt != "")
							{
								// 								info "Suite_Apt  " + getBoat.Suite_Apt;
								updatecontactMap.put("Mailing_Street",migRec.Suite_Apt);
							}
							else
							{
								updatecontactMap.put("Mailing_Street",ifnull(emailUnique.get(0).get("Mailing_Street"),""));
							}
							//Mailing City
							if(migRec.City != null && migRec.City != "")
							{
								updatecontactMap.put("Mailing_City",migRec.City);
							}
							else
							{
								updatecontactMap.put("Mailing_City",ifnull(emailUnique.get(0).get("Mailing_City"),""));
							}
							//Mailing State
							if(migRec.Province_State != null && migRec.Province_State != "")
							{
								updatecontactMap.put("Mailing_State",migRec.Province_State);
							}
							else
							{
								updatecontactMap.put("Mailing_State",ifnull(emailUnique.get(0).get("Mailing_State"),""));
							}
							//Mailing Zip
							if(migRec.Postal_Zip_Code != null && migRec.Postal_Zip_Code != "")
							{
								updatecontactMap.put("Mailing_Zip",migRec.Postal_Zip_Code);
							}
							else
							{
								updatecontactMap.put("Mailing_Zip",ifnull(emailUnique.get(0).get("Mailing_Zip"),""));
							}
							// 						Referral Type
							if(referraltype != "" && referraltype != null)
							{
								updatecontactMap.put("Referral_Type",referraltype);
							}
							else
							{
								updatecontactMap.put("Referral_Type",ifnull(emailUnique.get(0).get("Referral_Type"),""));
							}
							// 						Referral Name
							if(referralName != "" && referralName != null)
							{
								updatecontactMap.put("Referral_Friend",referralName);
							}
							else
							{
								updatecontactMap.put("Referral_Friend",ifnull(emailUnique.get(0).get("Referral_Friend"),""));
							}
							// 							info "updatecontactMap " + updatecontactMap;
							updatecontactMap.put("Status1","Active");
							updatecontactMap.put("Owner",emailUnique.get(0).get("Owner").get("id"));
							updateCRMContact = zoho.crm.updateRecord("Contacts",emailUnique.get(0).get("id").toLong(),updatecontactMap,{"trigger":{"workflow"}});
							// 							info "updateCRMContact: " + updateCRMContact;
							if(updateCRMContact.containKey("id") == true && updateCRMContact.get("id") != null && updateCRMContact.get("id") != "")
							{
								migRec.CRM_Contact_ID=updateCRMContact.get("id").toString();
								migRec.CRM_Contact_Status="Success";
								migRec.Contact_Error_Msg="";
							}
							else
							{
								info "update contact error";
								info updateCRMContact;
								migRec.CRM_Contact_ID="";
								migRec.CRM_Contact_Status="Fail";
								migRec.Contact_Error_Msg=updateCRMContact.toString();
							}
						}
					}
					else
					{
						creatorContactMigratedStatusList.add("New Contact");
						createContact = insert into Customer
						[
							Email=getBoat.Email
							First_Name=migRec.Insured_First_Name
							Last_Name=migRec.Insured_Last_Name
							Added_User=zoho.loginuser
							City=migRec.City
							Country=migRec.Country
							Province=migRec.Province_State
							Postal_Code=migRec.Postal_Zip_Code
							Phone_Number=formattedPhoneNumber
							Address_Line1=migRec.Address
							Address_Line2=migRec.Suite_Apt
							Customer_Type="Contact"
							Where_Did_You_Find_Us=referraltype
							Name=referralName
							Migrated=true
							Migrated_Status=creatorContactMigratedStatusList
							Trailer_Migration_ID=migRec.ID.tostring()
							Contact_Type="Master"
						];
						//Customer_Type1="Contact"
						creatorID = createContact;
						migRec.Contact_Type="Master";
						migRec.Valid_emailID="NO";
						// 							customerUpdate = createContact;
						createContactCreator = Customer[ID == createContact];
						if(createContactCreator.count() > 0)
						{
							migRec.Creator_Status="Success";
							migRec.Customer_Creator_ID=createContact;
							migRec.Creator_Error_Msg="";
						}
						else
						{
							migRec.Creator_Status="Fail";
							migRec.Creator_Error_Msg=createContact.toString();
						}
						migRec.Contact_Migrated_Status=creatorContactMigratedStatusList;
						contactMap = Map();
						ContactlayoutMap = Map();
						ContactlayoutMap.put("id",5778486000007674550);
						contactMap.put("Layout",ContactlayoutMap);
						if(migRec.Assigned_Name1 != "" && migRec.Assigned_Name1 != "Unassigned" && migRec.Assigned_Email != "")
						{
							searchRec = zoho.crm.searchRecords("users","(full_name:equals:" + migRec.Assigned_Name1 + ")",1,1,Map(),"cl_workdrive");
							if(searchRec.size() > 0 && searchRec.contains("users") && searchRec.getJson("users") != null && searchRec.getJson("users") != null && searchRec.getJson("users").get(0) != null && searchRec.getJson("users").get(0).get("id") != null)
							{
								contactMap.put("Owner",searchRec.getJson("users").get(0).get("id"));
							}
							else
							{
								contactMap.put("Owner",5778486000000414001);
							}
						}
						else
						{
							contactMap.put("Owner",5778486000000414001);
						}
						contactMap.put("First_Name",ifnull(migRec.Insured_First_Name,"N/A"));
						contactMap.put("Last_Name",ifnull(migRec.Insured_Last_Name,"N/A"));
						contactMap.put("Middel_Name",ifnull(migRec.Middle_Name,"N/A"));
						contactMap.put("Email",ifnull(migRec.Email1,""));
						contactMap.put("Phone",formattedPhoneNumber);
						contactMap.put("Status1","Active");
						contactMap.put("Mailing_Country",migRec.Country);
						contactMap.put("Mailing_Address",migRec.Address);
						contactMap.put("Mailing_Street",migRec.Suite_Apt);
						contactMap.put("Mailing_Zip",migRec.Postal_Zip_Code);
						contactMap.put("Mailing_City",migRec.City);
						contactMap.put("Mailing_State",migRec.Province_State);
						contactMap.put("Referral_Type",referraltype);
						contactMap.put("Referral_Friend",referralName);
						contactMap.put("Zoho_Creator_ID",createContactCreator.ID.toString());
						contactMap.put("Contact_Type","Master");
						contactMap.put("Migrated_Status",creatorContactMigratedStatusList);
						contactMap.put("Migrated",true);
						createCRMContact = zoho.crm.createRecord("Contacts",contactMap);
						// 							info "createCRMContact: " + createCRMContact;
						if(createCRMContact.containKey("id") == true && createCRMContact.get("id") != null)
						{
							migRec.CRM_Contact_ID=createCRMContact.get("id").toString();
							migRec.CRM_Contact_Status="Success";
							createContactCreator.Zoho_Crm_ID=createCRMContact.get("id");
							migRec.Contact_Error_Msg="";
						}
						else
						{
							info "create contact error";
							info createCRMContact;
							migRec.CRM_Contact_Status="Fail";
							migRec.Contact_Error_Msg=createCRMContact.toString();
							migRec.CRM_Contact_ID="";
						}
					}
				}
				cusFetch = Customer[ID == creatorID.toLong()];
				if(cusFetch.count() > 0)
				{
					if(cusFetch.Server_Customer_ID != "")
					{
						thisapp.Server_Side.Latest_Customer_Sync_Update(cusFetch.ID);
					}
					else
					{
						thisapp.Server_Side.Latest_Customer_Sync_Create(cusFetch.ID);
					}
				}
				// 		LienHolders
				SelectAFinancier = null;
				NameofFinancier = "";
				if(migRec.Do_you_have_any_lienholders == true)
				{
					IsThisBoatFinanced = true;
					FinancierName = migRec.Loss_Payees_Name.toUpperCase();
					getLein = Lein_holder_Details[ID != 0].distinct(Name_of_Financier);
					if(getLein.toList(",").contains(migRec.Loss_Payees_Name.toUpperCase()) == false)
					{
						SelectAFinancier = 4564627000000514015;
						NameofFinancier = migRec.Loss_Payees_Name.toUpperCase();
					}
					else
					{
						getLein = Lein_holder_Details[Name_of_Financier == FinancierName];
						SelectAFinancier = getLein.ID;
						NameofFinancier = "";
					}
					LossPayAddressLine1 = migRec.Loss_Payees_Unit_Suite;
					LossPayAddressLine2 = migRec.Loss_Payees_Address;
					LossPayCity = migRec.Loss_Payees_City;
					LossPayProvince = migRec.Loss_Payees_Province;
					LossPayPostalCode = migRec.Loss_Payees_Postal_Code;
					LossPayCountry = migRec.Loss_Payees_Country;
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
				// 		Tax Percentage
				taxPercentage = 0.00;
				if(migRec.Please_select_the_province_your_boat_is_used_in == "Alberta")
				{
					taxPercentage = 0.00;
				}
				else if(migRec.Please_select_the_province_your_boat_is_used_in == "British Columbia")
				{
					taxPercentage = 0.00;
				}
				else if(migRec.Please_select_the_province_your_boat_is_used_in == "Saskatchewan")
				{
					taxPercentage = 6.00;
				}
				else if(migRec.Please_select_the_province_your_boat_is_used_in == "Ontario")
				{
					taxPercentage = 8.00;
				}
				else
				{
					taxPercentage = 0.00;
				}
				creatorQuoteID = getBoat.ID;
				PolicyNumber = ifnull(migRec.Policy_Number,"") + " - FUTURE";
				QuoteID = ifnull(migRec.Reference_Number,"") + " - FUTURE";
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
					Payment_Date=migRec.Payment_Date
					Sales_Date=getBoat.Sales_Date
					Customer_ID=customerID
					Insured_First_Name=migRec.Insured_First_Name
					Insured_Last_Name=migRec.Insured_Last_Name
					Insured_Middle_Name=getBoat.Insured_Middle_Name
					Email=migRec.Email1
					Link_Customer=getBoat.Link_Customer
					Phone_Number=formattedPhoneNumber
					Date_of_Birth=migRec.Date_of_Birth
					Where_Did_You_Find_Us=referraltype
					Name=migRec.Enter_the_friend_s_name
					Name_of_Dealership=getBoat.Name_of_Dealership
					Name_of_Campground=getBoat.Name_of_Campground
					Name_of_Marina=getBoat.Name_of_Marina
					Tell_us_more=getBoat.Tell_us_more
					Are_there_any_additional_names_on_the_boat_ownership=if(migRec.Additional_Insured_First_Name != "" || migRec.Additional_Insured_Last_Name != "","Yes","No")
					Please_select_the_province_your_boat_is_used_in=migRec.Please_select_the_province_your_boat_is_used_in
					How_many_boats_would_you_like_to_insure=getBoat.How_many_boats_would_you_like_to_insure
					Expiry_Date=migRec.End_Date
					Inception_Date=migRec.Effective_Date
					Last_Modified=migRec.Last_Modified
					Bind_Date=migRec.Bind_Date
					Country=migRec.Country
					Address=migRec.Address
					Suite_Apt=migRec.Suite_Apt
					City=migRec.City
					Province=migRec.Province_State
					Postal_code_ZIP_Code=migRec.Postal_Zip_Code
					Override_Tax_by_Admin=getBoat.Override_Tax_by_Admin
					Override_Tax=getBoat.Override_Tax
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
					Tax=migRec.Tax
					Total=migRec.Total
					Prorate_From=getBoat.Prorate_From
					Waive_Free=getBoat.Waive_Free
					Reason_For_Rejection1=getBoat.Reason_For_Rejection1
					Is_Watercraft_Ineligible_For_Coverage=migRec.Is_Watercraft_Ineligible_For_Coverage
					Does_Watercraft_Meet_Safety_And_Usage_Requirements=migRec.Does_Watercraft_Meet_Safety_And_Usage_Requirements
					Is_Applicant_Ineligible_For_Coverage=migRec.Is_Applicant_Ineligible_For_Coverage
					Is_Operator_Ineligible_For_Coverage=migRec.Is_Operator_Ineligible_For_Coverage
					Combined_Doc_Status_Check_On=getBoat.Combined_Doc_Status_Check_On
					Combined_Doc_Download_URL=getBoat.Combined_Doc_Download_URL
					Combined_Doc_Response=getBoat.Combined_Doc_Response
					Email_List=getBoat.Email_List
					Select_Rate=getBoat.Select_Rate
					Signature_Accept_Text=getBoat.Signature_Accept_Text
					Zoho_Crm_ID=getBoat.Zoho_Crm_ID
					Quote_Policy_Type="Renewal"
					Slave_Customer=getBoat.Slave_Customer
					Renewal_From_Old_Policy_ID=creatorQuoteID
					Were_you_referred_by_a_friend_or_business=getBoat.Were_you_referred_by_a_friend_or_business
					Product_Package=getBoat.Product_Package
					Agree_to_terms_and_conditions=getBoat.Agree_to_terms_and_conditions
					Financier_Information=getBoat.Financier_Information
					Is_your_boat_financed=getBoat.Is_your_boat_financed
					Other_Financier_Information=getBoat.Other_Financier_Information
					Section_Type=getBoat.Section_Type
					UPO_Data=getBoat.UPO_Data
					Total_Premium_before_tax=migRec.Premium
					Tax_Precent=taxPercentage
					Fee=migRec.Fee
					Tax_Province=migRec.Please_select_the_province_your_boat_is_used_in
					Total_Tax=migRec.Tax
					Total_Payable_Premium_after_tax=migRec.Total
					Migrated=true
					Boat_Migration_ID=migRec.ID.toString()
					Migrated_Status=creatorQuoteMigratedStatusList
				];
				// Additional Names subform
				getAllCustomers = Additional_Names_Policy_Premium_Boat[Boats == creatorQuoteID];
				if(getAllCustomers.count() > 0)
				{
					for each  cus in getAllCustomers
					{
						getCust = Additional_Names_Policy_Premium_Boat[ID == cus.ID];
						if(getCust.count() > 0)
						{
							additionalnamescus = insert into Additional_Names_Policy_Premium_Boat
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
				selectTypeofWaterCraft = null;
				if(migRec.Select_the_type_of_watercraft1 != null && migRec.Select_the_type_of_watercraft1 != "")
				{
					if(migRec.Select_the_type_of_watercraft1 == "Runabout")
					{
						selectTypeofWaterCraft = "Runabout/Deck/Bowrider";
					}
					else if(migRec.Select_the_type_of_watercraft1 == "Wake Board Boat")
					{
						selectTypeofWaterCraft = "Ski/Wake Boat";
					}
					else if(migRec.Select_the_type_of_watercraft1 == "JetSki")
					{
						selectTypeofWaterCraft = "SeaDoo/JetSki";
					}
					else
					{
						selectTypeofWaterCraft = migRec.Select_the_type_of_watercraft1;
					}
				}
				else
				{
					selectTypeofWaterCraft = null;
				}
				if(migRec.Product_Package == "Replacement Value")
				{
					prodPackage = "Replacement Value Coverage";
				}
				else if(migRec.Product_Package == "Current Market Value")
				{
					prodPackage = "Current Market Value Coverage";
				}
				//Deductible
				Deductiblevalue = "";
				if(migRec.Deductible != null && migRec.Deductible != "")
				{
					deductible = migRec.Deductible.remove("$").remove(",").toDecimal().round(0);
					Deductiblevalue = deductible;
				}
				else
				{
					Deductiblevalue = null;
				}
				// Personal Effects Coverage
				PersonalEffectsCoverageValue = "";
				if(migRec.Personal_Effects_Coverage != null && migRec.Personal_Effects_Coverage != "")
				{
					PersonalEffectsCoverageValue = migRec.Personal_Effects_Coverage.remove("$").remove(",").toDecimal().round(0);
					PersonalEffectsCoverageValue = "$" + PersonalEffectsCoverageValue;
				}
				else
				{
					PersonalEffectsCoverageValue = null;
				}
				// Navigational Equipment Coverage
				NavigationalEquipmentCoverageValue = "";
				if(migRec.Navigational_Equipment_Coverage != null && migRec.Navigational_Equipment_Coverage != "")
				{
					NavigationalEquipmentCoverageValue = migRec.Navigational_Equipment_Coverage.remove("$").remove(",").toDecimal().round(0);
					NavigationalEquipmentCoverageValue = "$" + NavigationalEquipmentCoverageValue;
				}
				getAllBoatLines = Boat[BoatQuote == creatorQuoteID];
				for each  boat in getAllBoatLines
				{
					getBoatFromCreator = Boat[ID == boat.ID];
					BoatsSubform = insert into Boat
					[
						Added_User=zoho.loginuser
						Premium_Per_Year=migRec.Premium
						Select_the_type_of_watercraft=selectTypeofWaterCraft
						Boat_Model_Year=migRec.Boat_Model_Year
						Override_For_Age_15_Or_More=getBoatFromCreator.Override_For_Age_15_Or_More
						Boat_Manufacturer=migRec.Boat_Manufacturer
						Boat_Model=migRec.Boat_Model
						Replacement_Cost=migRec.Current_cost_of_a_brand_new_watercraft
						Actual_Cash_Value=migRec.Fair_Market_Value
						Is_the_Principal_Operator_the_same_as_the_Applicant_Owner=if(migRec.Is_the_Principal_Operator_the_same_as_the_Applicant_Owner == true,"Yes","No")
						First_Name=migRec.Operator_First_Name
						Last_Name=migRec.Operator_Last_Name
						Date_of_Birth=migRec.Date_of_Birth
						Principal_operator_s_years_of_boating_experience_with_vessels_of_a_similar_size_and_type=migRec.Principal_operator_s_years_of_boating_experience_with_vessels_of_a_similar_size_and_type
						Does_the_operator_hold_a_Pleasure_Craft_Operator_s_Card_PCOC=if(migRec.Does_the_operator_hold_a_Pleasure_Craft_Operator_s_Card_PCOC == true,"Yes","No")
						Select_coverage_for_policy=prodPackage
						Liability_coverage=getBoatFromCreator.Liability_coverage
						Deductible=Deductiblevalue
						Boat_Coverage=migRec.Boat_Coverage1
						Personal_Effects_Coverage=PersonalEffectsCoverageValue
						Salvage=migRec.Salvage
						Navigational_Equipment_Coverage=NavigationalEquipmentCoverageValue
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
						Lengths=migRec.Length_field1
						Hull_ID_Serial=migRec.ID_Serial
						Hull_ID_Optional=migRec.Hull_ID_optional
						Hull_Type=migRec.Hull_Type
						Other_Hull_Type=getBoatFromCreator.Other_Hull_Type
						Estimated_max_speed=migRec.Estimated_max_speed1
						Types=migRec.Type_field
						Enter_the_type=getBoatFromCreator.Enter_the_type
						Fuel_Type=migRec.Fuel_Type
						Model_Year=migRec.Model_Year
						Manufacturer=migRec.Manufacturer
						Serial=migRec.Serial
						Horsepower=migRec.HP1
						Types1=migRec.Type_21
						Enter_the_type1=getBoatFromCreator.Enter_the_type1
						Fuel_Type1=migRec.Fuel_Type_21
						Model_Year1=migRec.Model_Year_21
						Manufacturer1=migRec.Manufacturer_2
						Serial1=migRec.Serial_2
						Horsepower1=migRec.HP_21
						Add_a_trailer=if(migRec.Add_a_trailer == true,"Yes","No")
						Trailer_Value=migRec.Trailer_Value
						Trailer_Model_Year=migRec.Trailer_Model_Year
						Trailer_Manufacturer=migRec.Trailer_Manufacturer
						Trailer_VIN=getBoatFromCreator.Trailer_VIN
						Trailer_Length=migRec.Trailer_Length
						Add_a_tender=if(migRec.Add_a_tender == true,"Yes","No")
						Tender_Value=migRec.Tender_Value
						Tender_Model_Year=migRec.Tender_Model_Year
						Tender_Manufacturer=migRec.Tender_Manufacturer
						Tender_Serial=migRec.Tender_Serial
						Tender_Length=migRec.Tender_Length1
						Add_an_auxiliary_motor=if(migRec.Add_an_auxiliary_motor == true,"Yes","No")
						Aux_Engine_Value=migRec.Aux_Engine_Value
						Aux_Engine_Model_Year=migRec.Aux_Engine_Model_Year
						Aux_Engine_Manufacturer=migRec.Aux_Engine_Manufacturer
						Auxiliary_Engine_Serial=migRec.Auxiliary_Engine_Serial
						Aux_Engine_HP_Thrust=migRec.Aux_Engine_HP1
						Is_this_boat_financed=if(IsThisBoatFinanced == true,"Yes","No")
						Opt_In_for_RCV=getBoatFromCreator.Opt_In_for_RCV
						Policy_Coverage_Type=getBoatFromCreator.Policy_Coverage_Type
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
						Boat_Migration_ID=migRec.ID.toString()
						Migrated=true
					];
					migRec.Subform_Record_Status="Success";
					migRec.Boat_subform_Creator_ID=BoatsSubform;
				}
				migRec.Quote_Record_Status="Success";
				migRec.Migrated=true;
				migRec.CRM_Deal_ID=getBoat.Zoho_Crm_ID;
				migRec.Migrated=true;
				migRec.Boat_Quote_Creator_ID=BoatData;
				migRec.Deal_Migrated_Status=creatorQuoteMigratedStatusList;
				renewalBoatQuote = BoatQuote[ID == BoatData];
				oldBoatQuote = BoatQuote[ID == renewalBoatQuote.Renewal_From_Old_Policy_ID];
				oldBoatQuote.Policy_Number=oldBoatQuote.Policy_Number + " - RENEWED";
				oldBoatQuote.Quote_ID=renewalBoatQuote.Quote_ID + " - RENEWED";
				renewalBoatQuote.Policy_Number=renewalBoatQuote.Policy_Number.remove(" - FUTURE");
				renewalBoatQuote.Quote_ID=renewalBoatQuote.Quote_ID.remove(" - FUTURE");
				oldBoatQuote.Policy_Status="INACTIVE - RENEWED";
				oldBoatQuote.Renewal_Stage="";
				renewalBoatQuote.Policy_Status="ACTIVE";
				thisapp.Renewal.Renewal_Update_To_CRM_Deal(renewalBoatQuote.ID,"Boat");
				thisapp.Server_Side.Latest_Boat_Quote_Sync_Create_and_Update(renewalBoatQuote.ID,"CREATE");
				thisapp.Server_Side.Latest_Boat_Quote_Sync_Create_and_Update(oldBoatQuote.ID,"UPDATE");
			}
		}
	}
}