void Migration.RenewalTrailerMigration()
{
	getTrailerMigration = Trailer_Migration[ID == 4564627000002125339];
	if(getTrailerMigration.count() > 0)
	{
		for each  migRec in getTrailerMigration
		{
			creatorQuoteMigratedStatusList = List();
			creatorContactMigratedStatusList = List();
			creatorQuoteMigratedStatusList.add("Renewal");
			getTrailer = TrailerQuote[Policy_Number == migRec.Policy_Number];
			customerID = null;
			creatorQuoteID = getTrailer.ID;
			if(getTrailer.count() > 0)
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
				if(migRec.Were_you_referred_by_a_friend_or_business == true)
				{
					referraltype = "Friend or Family";
					referralName = migRec.Enter_the_friend_s_name;
				}
				else
				{
					referraltype = "";
					referralName = "";
				}
				if(migRec.Email == getTrailer.Email)
				{
					fetCreatorContact = Customer[ID == getTrailer.Customer_ID];
					creatorContactMigratedStatusList.add("Updated Contact");
					creatorID = fetCreatorContact.ID;
					fetCreatorContact.Email=migRec.Email;
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
					emailUnique = zoho.crm.searchRecords("Contacts","(Email:equals:" + migRec.Email + ")");
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
					if(migRec.Insured_First_Name == getTrailer.Insured_First_Name && migRec.Insured_Last_Name == getTrailer.Insured_Last_Name)
					{
						fetCreatorContact = Customer[ID == getTrailer.Customer_ID];
						creatorContactMigratedStatusList.add("Updated Contact");
						creatorID = fetCreatorContact.ID;
						fetCreatorContact.Email=migRec.Email;
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
						emailUnique = zoho.crm.searchRecords("Contacts","(Email:equals:" + migRec.Email + ")");
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
							Email=getTrailer.Email
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
						contactMap.put("Email",ifnull(migRec.Email,""));
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
				// 		Tax Percentage
				taxPercentage = 0.00;
				if(migRec.Please_select_the_province_your_trailer_is_located_in == "Alberta")
				{
					taxPercentage = 0.00;
				}
				else if(migRec.Please_select_the_province_your_trailer_is_located_in == "British Columbia")
				{
					taxPercentage = 0.00;
				}
				else if(migRec.Please_select_the_province_your_trailer_is_located_in == "Saskatchewan")
				{
					taxPercentage = 6.00;
				}
				else if(migRec.Please_select_the_province_your_trailer_is_located_in == "Ontario")
				{
					taxPercentage = 8.00;
				}
				else
				{
					taxPercentage = 0.00;
				}
				PolicyNumber = ifnull(migRec.Policy_Number,"") + " - FUTURE";
				QuoteID = ifnull(migRec.Reference_Number,"") + " - FUTURE";
				TrailerData = insert into TrailerQuote
				[
					Added_User=zoho.loginuser
					Quote_ID=QuoteID
					Organization_ID=getTrailer.Organization_ID
					Policy_Number=PolicyNumber
					Quote_Status=getTrailer.Quote_Status
					Policy_Status="INACTIVE - RENEWAL PENDING"
					Payment_Date=migRec.Payment_Date1
					Sales_Date=getTrailer.Sales_Date
					Policy_AutoRenewal_Status=getTrailer.Policy_AutoRenewal_Status
					Deal_Type=getTrailer.Deal_Type
					Referral_Reason=getTrailer.Referral_Reason
					Source=getTrailer.Source
					Created_Source="CREATOR"
					Carrier=getTrailer.Carrier
					Customer_ID=customerID
					Insured_First_Name=migRec.Insured_First_Name
					Insured_Middle_Name=getTrailer.Insured_Middle_Name
					Insured_Last_Name=migRec.Insured_Last_Name
					Email=migRec.Email
					Link_Customer=getTrailer.Link_Customer
					Phone_Number=formattedPhoneNumber
					Date_of_Birth=getTrailer.Date_of_Birth
					Where_Did_You_Find_Us=referraltype
					Name=referralName
					Name_of_Dealership=getTrailer.Name_of_Dealership
					Name_of_Campground=getTrailer.Name_of_Campground
					Name_of_Marina=getTrailer.Name_of_Marina
					Tell_us_more=getTrailer.Tell_us_more
					Are_there_any_additional_names_on_the_trailer_ownership=if(migRec.Additional_Insured_First_Name != "" || migRec.Additional_Insured_Last_Name != "","Yes","No")
					Please_select_the_province_your_trailer_is_located_in=migRec.Please_select_the_province_your_trailer_is_located_in
					How_many_trailers_would_you_like_to_insure=getTrailer.How_many_trailers_would_you_like_to_insure
					Expiry_Date=migRec.End_Date
					Inception_Date=migRec.Effective_Date
					Last_Modified_Date=migRec.Last_Modified1
					Bind_Date=migRec.Bind_Date
					Country=migRec.Country
					Address=migRec.Address
					Suite_Apt=migRec.Suite_Apt
					City=migRec.City1
					Province=migRec.Province
					Postal_code_ZIP_Code=migRec.Postal_Zip_Code
					Override_Tax_by_Admin=getTrailer.Override_Tax_by_Admin
					Override_Tax=getTrailer.Override_Tax
					Enter_payment_info=getTrailer.Enter_payment_info
					Stripe_Payment_Method_ID=getTrailer.Stripe_Payment_Method_ID
					Stripe_Payment_Method_Details=getTrailer.Stripe_Payment_Method_Details
					Payment_Status=getTrailer.Payment_Status
					Policy_UPO_Data=getTrailer.Policy_UPO_Data
					Nuvei_Transaction_ID=getTrailer.Nuvei_Transaction_ID
					OutStanding_Type=getTrailer.OutStanding_Type
					Outstanding=getTrailer.Outstanding
					Prorated=getTrailer.Prorated
					Tax=migRec.Tax
					Total=migRec.Total1
					Prorate_From=getTrailer.Prorate_From
					Waive_Fee=getTrailer.Waive_Fee
					Reason_For_Rejection1=getTrailer.Reason_For_Rejection1
					Signature_Accept_Text=getTrailer.Signature_Accept_Text
					Email_List=getTrailer.Email_List
					Select_Rate=getTrailer.Select_Rate
					Zoho_Crm_ID=getTrailer.Zoho_Crm_ID
					Quote_Policy_Type="Renewal"
					Slave_Customer=getTrailer.Slave_Customer
					Renewal_From_Old_Policy_ID=creatorQuoteID
					Is_AutoCharge_Enabled=getTrailer.Is_AutoCharge_Enabled
					Nuvei_Unique_Payment_Option_ID=getTrailer.Nuvei_Unique_Payment_Option_ID
					Agree_to_terms_and_conditions=getTrailer.Agree_to_terms_and_conditions
					UPO_Data=getTrailer.UPO_Data
					Total_Premium_before_tax=migRec.Premium
					Tax_Precent=taxPercentage
					Fee=migRec.Fee
					Tax_Province=migRec.Please_select_the_province_your_trailer_is_located_in
					Total_Tax=migRec.Tax
					Total_Payable_Premium_after_tax=migRec.Total1
					Migrated=true
					Trailer_Migration_ID=migRec.ID.toString()
					Migrated_Status=creatorQuoteMigratedStatusList
				];
				// 				Additional Names Subform
				getAllCustomers = Additional_Names_Trailer[Trailer_Quotation == creatorQuoteID];
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
						}
					}
				}
				SelectTrailerType = "";
				if(migRec.Select_the_type_of_trailer == "Recreational or Fifth Wheel Trailer")
				{
					SelectTrailerType = "Travel Trailer/Fifth Wheel Trailer";
				}
				else if(migRec.Select_the_type_of_trailer == "Park Model")
				{
					SelectTrailerType = "Park Model/Destination Trailer";
				}
				else
				{
					SelectTrailerType = "";
				}
				// 		Park
				parkName = "";
				Select_a_Park = null;
				if(migRec.Select_a_Park != "")
				{
					if(migRec.Select_a_Park.contains("Other") == false)
					{
						if(migRec.Select_a_Park == "Woodland Park Campground")
						{
							selectPark = "Woodland Park";
						}
						else if(migRec.Select_a_Park == "Whispering Pines Campground")
						{
							selectPark = "Whispering Pines Family Campground";
						}
						else if(migRec.Select_a_Park == "Sherkston Shores RV Resort")
						{
							selectPark = "Sun Retreats Sherkston Shores";
						}
						else if(migRec.Select_a_Park == "Summer Place Park")
						{
							selectPark = "Summer Place Park";
						}
						else if(migRec.Select_a_Park == "Summerhouse Park")
						{
							selectPark = "Summer House Park";
						}
						else if(migRec.Select_a_Park == "Spring Valley Park")
						{
							selectPark = "Spring Valley | A Parkbridge Cottage & RV Resort";
						}
						else if(migRec.Select_a_Park == "Southampton Tourist Camp")
						{
							selectPark = "Southampton Tourist Camp";
						}
						else if(migRec.Select_a_Park == "Silent Valley Cottage & RV Resort")
						{
							selectPark = "Silent Valley | A Parkbridge Cottage & RV Resort";
						}
						else if(migRec.Select_a_Park == "Shamadon RV Resort")
						{
							selectPark = "Shamadon Resort";
						}
						else if(migRec.Select_a_Park == "Sauble River Family Camp")
						{
							selectPark = "Sauble River Campground";
						}
						else if(migRec.Select_a_Park == "Sauble Falls Tent and Trailer")
						{
							selectPark = "Sauble Falls Tent and Trailer";
						}
						else if(migRec.Select_a_Park == "River Place Campground")
						{
							selectPark = "River Place Campground";
						}
						else if(migRec.Select_a_Park == "Port Elgin Municipal Tourist Camp")
						{
							selectPark = "Port Elgin Municipal Tourist Camp";
						}
						else if(migRec.Select_a_Park == "Pike Lake Campground")
						{
							selectPark = "Pike Lake Campground";
						}
						else if(migRec.Select_a_Park == "New Fairway Park Campground")
						{
							selectPark = "New Fairway Park Campground";
						}
						else if(migRec.Select_a_Park == "Kenorus Campground and RV Resort")
						{
							selectPark = "Kenorus Campground & RV Resort";
						}
						else if(migRec.Select_a_Park == "Horseshoe Lake Campground")
						{
							selectPark = "Horseshoe Lake Camp & Cottages";
						}
						else if(migRec.Select_a_Park == "Green Acres Park (Kincardine)")
						{
							selectPark = "Green Acres Campground & RV Park (Kincardine)";
						}
						else if(migRec.Select_a_Park == "Green Acres Park (Waterloo)")
						{
							selectPark = "Green Acres Park (Waterloo)";
						}
						else if(migRec.Select_a_Park == "Fishermans Cove")
						{
							selectPark = "Fisherman’s Cove Tent and Trailer Park Resort";
						}
						else if(migRec.Select_a_Park == "Conestoga Family Campground")
						{
							selectPark = "Conestoga Family Campground";
						}
						else if(migRec.Select_a_Park == "Chesley Lake Campground")
						{
							selectPark = "Chesley Lake Camp";
						}
						else if(migRec.Select_a_Park == "Carsons Campground")
						{
							selectPark = "Carson’s Campground";
						}
						getPreferredPark = Preffered_Parks[Preffered_Park_Name == selectPark];
						selectPark = getPreferredPark.ID;
					}
					else
					{
						selectPark = 4564627000000511007;
						if(migRec.Park_or_Campground_Name.contains("Other") == false)
						{
							parkName = migRec.Park_or_Campground_Name;
						}
						else
						{
							parkName = "";
						}
					}
				}
				else
				{
					if(migRec.Park_or_Campground_Name != "" && migRec.Park_or_Campground_Name != null)
					{
						selectPark = 4564627000000511007;
						if(migRec.Park_or_Campground_Name.contains("Other") == false)
						{
							parkName = migRec.Park_or_Campground_Name;
						}
						else
						{
							parkName = "";
						}
					}
					else
					{
						parkName = "";
						selectPark = null;
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
				prodPackage = "";
				if(migRec.Product_Package == "Replacement Value")
				{
					prodPackage = "Replacement Value Coverage";
				}
				else if(migRec.Product_Package == "Current Market Value")
				{
					prodPackage = "Current Market Value Coverage";
				}
				getAllTrailerLines = Trailer[TrailerQuote == creatorQuoteID];
				for each  trailer in getAllTrailerLines
				{
					getTrailerFromCreator = Trailer[ID == trailer.ID];
					TrailersSubform = insert into Trailer
					[
						Added_User=zoho.loginuser
						Premium_Per_Year=migRec.Premium
						Select_Trailer_Type=SelectTrailerType
						Trailer_Model_Year=migRec.Trailer_Model_Year
						Are_you_the_original_owner_of_the_trailer=migRec.Are_you_the_original_owner_of_the_trailer
						How_long_have_you_owned_this_trailer=getTrailerFromCreator.How_long_have_you_owned_this_trailer
						Replacement_Cost=migRec.Replacement_cost
						Actual_Cash_Value=migRec.Fair_Market_Value
						Is_your_trailer_parked_within_500_feet_of_a_body_of_water=migRec.Is_your_trailer_parked_within_500_feet_of_a_body_of_water
						Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground=if(migRec.Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground == true,"Yes","No")
						Where_is_the_trailer_stored_while_not_in_use=getTrailerFromCreator.Where_is_the_trailer_stored_while_not_in_use
						Is_the_trailer_taken_into_the_USA_for_more_than_180_days=getTrailerFromCreator.Is_the_trailer_taken_into_the_USA_for_more_than_180_days
						Is_the_trailer_removed_from_the_park_in_the_off_season=getTrailerFromCreator.Is_the_trailer_removed_from_the_park_in_the_off_season
						Please_provide_address_of_storage_location=getTrailerFromCreator.Please_provide_address_of_storage_location
						Do_you_have_a_deck=if(migRec.Do_you_have_a_deck == true,"Yes","No")
						Do_you_have_a_screened_in_room_or_a_Florida_room=if(migRec.Do_you_have_an_additional_room_or_structure == true,"Yes","No")
						Do_you_have_a_hard_awning=getTrailerFromCreator.Do_you_have_a_hard_awning
						Would_you_like_to_insure_a_golf_cart=if(migRec.Would_you_like_to_Insure_a_Golf_Cart == true,"Yes","No")
						Number_of_Golf_Cart=migRec.Number_of_Golf_Carts
						Value_of_Golf_Cart_1=migRec.Value_of_Golf_Cart_1
						Value_of_Golf_Cart_2=migRec.Value_of_Golf_Cart_2
						Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2=getTrailerFromCreator.Should_golf_cart_coverage_remain_for_golf_cart_1_and_golf_cart_2
						Select_a_Park=getTrailerFromCreator.Select_a_Park
						Select_a_Park1=selectPark
						Park_Name=parkName
						Address_Lines1=migRec.Address1
						Address_line1=LossPayAddressLine1
						Address_line2=LossPayAddressLine2
						City=migRec.City1
						City1=LossPayCity
						Province=migRec.Province
						Province1=LossPayProvince
						PostalCode=migRec.Enter_your_postal_code_or_zip_code
						Postal_Code=LossPayPostalCode
						Country=LossPayCountry
						Site_Number=migRec.Site_location_number
						Select_coverage_for_policy=prodPackage
						Coverage_Type=migRec.Coverage_Type
						Trailer_Coverage=migRec.Trailer_Coverage1
						Overland_Water_Protection=migRec.Overland_Water_Protection1
						Detached_Private_Structure_Coverage_Sheds_etc=migRec.Detached_Private_Structure_Coverage_Sheds_etc1
						Deductible=migRec.Deductible
						Personal_Property_Coverage_T_V_Furniture_etc=migRec.Personal_Property_Coverage_T_V_Furniture_etc1
						Premises_Liability=migRec.Premises_Liability
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
						Do_you_live_in_the_trailer_full_time_all_year_round_as_a_principal_residence=if(migRec.Do_you_live_in_the_trailer_full_time_all_year_round_as_a_principal_residence == true,"Yes","No")
						Non_Domestic_Address=getTrailerFromCreator.Non_Domestic_Address
						Is_the_unit_used_strictly_for_pleasure_purposes_with_no_rental_or_business_use_of_any_kind=if(migRec.Is_the_unit_used_strictly_for_pleasure_purposes_with_no_rental_or_business_use_of_any_kind == true,"Yes","No")
						Is_there_any_heating_that_wasn_t_factory_installed_wood_stove_pellet_stove_etc=if(migRec.Is_there_any_heating_that_wasn_t_factory_installed_wood_stove_space_heater_etc == true,"Yes","No")
						Heating_Type=migRec.Heating_type
						Is_this_a_dual_purpose_trailer_toy_hauler_horse_trailer=if(migRec.Is_this_a_dual_purpose_trailer_toy_hauler_horse_trailer == true,"Yes","No")
						Trailer_Purpose_Type=getTrailerFromCreator.Trailer_Purpose_Type
						Please_select_which_items_are_being_hauled=getTrailerFromCreator.Please_select_which_items_are_being_hauled
						Are_there_any_modifications_to_the_trailer_ie_Addition_of_permanently_installed_solar_panels=if(migRec.Are_there_any_modifications_to_the_trailer_ie_Addition_of_permanently_installed_solar_panels == true,"Yes","No")
						select_the_modification_trailer_type=getTrailerFromCreator.select_the_modification_trailer_type
						Are_the_solar_panels_factory_dealer_installed=getTrailerFromCreator.Are_the_solar_panels_factory_dealer_installed
						Please_add_details_on_interior_upgrades=getTrailerFromCreator.Please_add_details_on_interior_upgrades
						Is_there_any_pre_existing_damage_on_the_trailer=if(migRec.Is_there_any_pre_existing_damage_on_the_trailer == true,"Yes","No")
						Describe_Damage=migRec.Describe_damage
						This_insurance_policy_does_not_cover_aftermarket_solar_panels_or_any_damage_arising_from_the_insta=getTrailerFromCreator.This_insurance_policy_does_not_cover_aftermarket_solar_panels_or_any_damage_arising_from_the_insta
						Describe_modifications=getTrailerFromCreator.Describe_modifications
						Is_the_trailer_motorized_and_able_to_travel_on_its_own_without_a_towing_vehicle=if(migRec.Is_the_trailer_motorized_and_able_to_travel_on_its_own_without_a_towing_vehicle == true,"Yes","No")
						Is_this_trailer_financed=if(IsThisBoatFinanced == true,"Yes","No")
						Lein_holder=SelectAFinancier
						Name_of_Financier=NameofFinancier
						Trailer_Manufacturer=migRec.Trailer_Manufacturer
						Trailer_Model=migRec.Trailer_Model
						Trailer_Length=migRec.Trailer_Length
						Trailer_Width=migRec.Trailer_Width
						VIN=migRec.ID_Serial1
						Deck_Length=migRec.Deck_Length1
						Deck_Width=migRec.Deck_Width1
						Screened_in_room_or_Florida_room_Length=if(migRec.Additional_outdoor_structure_length_1 != "",migRec.Additional_outdoor_structure_length_1.toNumber(),null)
						Screened_in_room_or_Florida_room_Width=if(migRec.Additional_outdoor_structure_width_1 != "",migRec.Additional_outdoor_structure_width_1.toNumber(),null)
						Hard_Awning_Length=getTrailerFromCreator.Hard_Awning_Length
						Hard_Awning_Width=getTrailerFromCreator.Hard_Awning_Width
						Trailer_Model_Age=migRec.Trailer_Model_Age1
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
						Trailer_Migration_ID=migRec.ID.toString()
						Migrated=true
					];
					migRec.Subform_Record_Status="Success";
					migRec.Trailer_subform_Creator_ID=TrailersSubform;
				}
				migRec.Quote_Record_Status="Success";
				migRec.Migrated1=true;
				migRec.CRM_Deal_ID=getTrailer.Zoho_Crm_ID;
				migRec.Migrated1=true;
				migRec.Trailer_Quote_Creator_ID=TrailerData;
				migRec.Deal_Migrated_Status=creatorQuoteMigratedStatusList;
				renewalTrailQuote = TrailerQuote[ID == TrailerData];
				oldTrailerQuote = TrailerQuote[ID == renewalTrailQuote.Renewal_From_Old_Policy_ID.toLong()];
				info "old---->" + oldTrailerQuote;
				oldTrailerQuote.Policy_Number=oldTrailerQuote.Policy_Number + " - RENEWED";
				oldTrailerQuote.Quote_ID=renewalTrailQuote.Quote_ID + " - RENEWED";
				renewalTrailQuote.Policy_Number=renewalTrailQuote.Policy_Number.remove(" - FUTURE");
				renewalTrailQuote.Quote_ID=renewalTrailQuote.Quote_ID.remove(" - FUTURE");
				oldTrailerQuote.Policy_Status="INACTIVE - RENEWED";
				oldTrailerQuote.Renewal_Stage="";
				renewalTrailQuote.Policy_Status="ACTIVE";
				thisapp.Renewal.Renewal_Update_To_CRM_Deal(renewalTrailQuote.ID,"Trailer");
				thisapp.Server_Side.Latest_Trailer_Quote_Sync_Create_and_Update(renewalTrailQuote.ID,"CREATE");
				thisapp.Server_Side.Latest_Trailer_Quote_Sync_Create_and_Update(oldTrailerQuote.ID,"UPDATE");
			}
		}
	}
}