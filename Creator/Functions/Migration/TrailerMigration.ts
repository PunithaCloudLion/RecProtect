void Migration.TrailerMigration()
{
	// 	getTrailerRec = Trailer_Migration[Migrated1 == false] range from 0 to 10;
	c = 0;
	// 		getTrailerRec = Trailer_Migration[Imported_Month == "Cleaned Data" && Migrated1 == false] range from 0 to 30;
	// 	getTrailerRec = Trailer_Migration[Migrated1 == false && Imported_Month == "Policy Changes - Feb"] range from 0 to 100;
	getTrailerRec = Trailer_Migration[Migrated1 == false && Imported_Month == "Policy Changes - Mar" && End_Date < zoho.currentdate.subMonth(1).subDay(5)];
	info getTrailerRec.count();
	for each  getTrailer in getTrailerRec
	{
		info getTrailer.ID;
		c = c + 1;
		// 	if(getTrailer.Migrated1 != true)
		// 	{
		contactMap = Map();
		policyMap = Map();
		ContactlayoutMap = Map();
		ContactlayoutMap.put("id",5778486000007674550);
		contactMap.put("Layout",ContactlayoutMap);
		if(getTrailer.Please_select_the_province_your_trailer_is_located_in == "Ontario")
		{
			carrierVal = "Germania Insurance";
		}
		else
		{
			carrierVal = "Four Points Insurance";
		}
		if(getTrailer.Phone != null && getTrailer.Phone != "")
		{
			formattedPhoneNumber = getTrailer.Phone.replaceAll("[/\-\(\)_@#\^!\$%\&\*:;`~ ]","");
			formattedPhoneNumber = "+1" + formattedPhoneNumber;
		}
		else
		{
			formattedPhoneNumber = "";
		}
		if(getTrailer.Product_Package == "Replacement Value")
		{
			prodPackage = "Replacement Value Coverage";
		}
		else if(getTrailer.Product_Package == "Current Market Value")
		{
			prodPackage = "Current Market Value Coverage";
		}
		// 		LienHolders
		SelectAFinancier = null;
		NameofFinancier = "";
		// 		if(getTrailer.Do_you_have_any_lienholders == true)
		// 		{
		IsThisBoatFinanced = true;
		FinancierName = getTrailer.Loss_Payees_Name.toUpperCase();
		getLein = Lein_holder_Details[ID != 0].distinct(Name_of_Financier);
		if(getLein.toList(",").contains(getTrailer.Loss_Payees_Name.toUpperCase()) == false)
		{
			SelectAFinancier = 4564627000000514015;
			NameofFinancier = getTrailer.Loss_Payees_Name.toUpperCase();
		}
		else
		{
			getLein = Lein_holder_Details[Name_of_Financier == FinancierName];
			SelectAFinancier = getLein.ID;
			NameofFinancier = "";
		}
		LossPayAddressLine1 = getTrailer.Loss_Payees_Unit_Suite;
		LossPayAddressLine2 = getTrailer.Loss_Payees_Address;
		LossPayCity = getTrailer.Loss_Payees_City;
		LossPayProvince = getTrailer.Loss_Payees_Province;
		LossPayPostalCode = getTrailer.Loss_Payees_Postal_Code;
		LossPayCountry = getTrailer.Loss_Payees_Country;
		// 		}
		// 		else
		// 		{
		// 			IsThisBoatFinanced = false;
		// 			SelectAFinancier = null;
		// 			NameOfFinancier = "";
		// 			LossPayAddressLine1 = "";
		// 			LossPayAddressLine2 = "";
		// 			LossPayCity = "";
		// 			LossPayProvince = "";
		// 			LossPayPostalCode = "";
		// 			LossPayCountry = "";
		// 		}
		// 		Tax Percentage
		taxPercentage = 0.00;
		if(getTrailer.Please_select_the_province_your_trailer_is_located_in == "Alberta")
		{
			taxPercentage = 0.00;
		}
		else if(getTrailer.Please_select_the_province_your_trailer_is_located_in == "British Columbia")
		{
			taxPercentage = 0.00;
		}
		else if(getTrailer.Please_select_the_province_your_trailer_is_located_in == "Saskatchewan")
		{
			taxPercentage = 6.00;
		}
		else if(getTrailer.Please_select_the_province_your_trailer_is_located_in == "Ontario")
		{
			taxPercentage = 8.00;
		}
		else
		{
			taxPercentage = 0.00;
		}
		// 		
		// 		
		// 		Park
		parkName = "";
		Select_a_Park = null;
		if(getTrailer.Select_a_Park != "")
		{
			if(getTrailer.Select_a_Park.contains("Other") == false)
			{
				if(getTrailer.Select_a_Park == "Woodland Park Campground")
				{
					selectPark = "Woodland Park";
				}
				else if(getTrailer.Select_a_Park == "Whispering Pines Campground")
				{
					selectPark = "Whispering Pines Family Campground";
				}
				else if(getTrailer.Select_a_Park == "Sherkston Shores RV Resort")
				{
					selectPark = "Sun Retreats Sherkston Shores";
				}
				else if(getTrailer.Select_a_Park == "Summer Place Park")
				{
					selectPark = "Summer Place Park";
				}
				else if(getTrailer.Select_a_Park == "Summerhouse Park")
				{
					selectPark = "Summer House Park";
				}
				else if(getTrailer.Select_a_Park == "Spring Valley Park")
				{
					selectPark = "Spring Valley | A Parkbridge Cottage & RV Resort";
				}
				else if(getTrailer.Select_a_Park == "Southampton Tourist Camp")
				{
					selectPark = "Southampton Tourist Camp";
				}
				else if(getTrailer.Select_a_Park == "Silent Valley Cottage & RV Resort")
				{
					selectPark = "Silent Valley | A Parkbridge Cottage & RV Resort";
				}
				else if(getTrailer.Select_a_Park == "Shamadon RV Resort")
				{
					selectPark = "Shamadon Resort";
				}
				else if(getTrailer.Select_a_Park == "Sauble River Family Camp")
				{
					selectPark = "Sauble River Campground";
				}
				else if(getTrailer.Select_a_Park == "Sauble Falls Tent and Trailer")
				{
					selectPark = "Sauble Falls Tent and Trailer";
				}
				else if(getTrailer.Select_a_Park == "River Place Campground")
				{
					selectPark = "River Place Campground";
				}
				else if(getTrailer.Select_a_Park == "Port Elgin Municipal Tourist Camp")
				{
					selectPark = "Port Elgin Municipal Tourist Camp";
				}
				else if(getTrailer.Select_a_Park == "Pike Lake Campground")
				{
					selectPark = "Pike Lake Campground";
				}
				else if(getTrailer.Select_a_Park == "New Fairway Park Campground")
				{
					selectPark = "New Fairway Park Campground";
				}
				else if(getTrailer.Select_a_Park == "Kenorus Campground and RV Resort")
				{
					selectPark = "Kenorus Campground & RV Resort";
				}
				else if(getTrailer.Select_a_Park == "Horseshoe Lake Campground")
				{
					selectPark = "Horseshoe Lake Camp & Cottages";
				}
				else if(getTrailer.Select_a_Park == "Green Acres Park (Kincardine)")
				{
					selectPark = "Green Acres Campground & RV Park (Kincardine)";
				}
				else if(getTrailer.Select_a_Park == "Green Acres Park (Waterloo)")
				{
					selectPark = "Green Acres Park (Waterloo)";
				}
				else if(getTrailer.Select_a_Park == "Fishermans Cove")
				{
					selectPark = "Fisherman’s Cove Tent and Trailer Park Resort";
				}
				else if(getTrailer.Select_a_Park == "Conestoga Family Campground")
				{
					selectPark = "Conestoga Family Campground";
				}
				else if(getTrailer.Select_a_Park == "Chesley Lake Campground")
				{
					selectPark = "Chesley Lake Camp";
				}
				else if(getTrailer.Select_a_Park == "Carsons Campground")
				{
					selectPark = "Carson’s Campground";
				}
				getPreferredPark = Preffered_Parks[Preffered_Park_Name == selectPark];
				selectPark = getPreferredPark.ID;
			}
			else
			{
				selectPark = 4564627000000511007;
				if(getTrailer.Park_or_Campground_Name.contains("Other") == false)
				{
					parkName = getTrailer.Park_or_Campground_Name;
				}
				else
				{
					parkName = "";
				}
			}
		}
		else
		{
			if(getTrailer.Park_or_Campground_Name != "" && getTrailer.Park_or_Campground_Name != null)
			{
				selectPark = 4564627000000511007;
				if(getTrailer.Park_or_Campground_Name.contains("Other") == false)
				{
					parkName = getTrailer.Park_or_Campground_Name;
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
		// 		
		// 		Assigned user
		if(getTrailer.Assigned_Name1 != "" && getTrailer.Assigned_Name1 != "Unassigned" && getTrailer.Assigned_Email != "")
		{
			searchRec = zoho.crm.searchRecords("users","(full_name:equals:" + getTrailer.Assigned_Name1 + ")",1,1,Map(),"cl_workdrive");
			if(searchRec.size() > 0 && searchRec.contains("users") && searchRec.getJson("users") != null && searchRec.getJson("users") != null && searchRec.getJson("users").get(0) != null && searchRec.getJson("users").get(0).get("id") != null)
			{
				contactMap.put("Owner",searchRec.getJson("users").get(0).get("id"));
				policyMap.put("Owner",searchRec.getJson("users").get(0).get("id"));
			}
			else
			{
				contactMap.put("Owner",5778486000000414001);
				policyMap.put("Owner",5778486000000414001);
			}
		}
		else
		{
			contactMap.put("Owner",5778486000000414001);
			policyMap.put("Owner",5778486000000414001);
		}
		policyMap.put("Policy_Status","ACTIVE");
		policyMap.put("Imported_Month",getTrailer.Imported_Month);
		policyMap.put("Imported_Year",getTrailer.Imported_Year);
		// 		
		dealStatus = if(getTrailer.Policy_Number != null && getTrailer.Policy_Number != "","Policy",if(getTrailer.Reference_Number != null && getTrailer.Reference_Number != "","Quote",""));
		contactMap.put("First_Name",ifnull(getTrailer.Insured_First_Name,"N/A"));
		contactMap.put("Last_Name",ifnull(getTrailer.Insured_Last_Name,"N/A"));
		contactMap.put("Middel_Name",ifnull(getTrailer.Middle_Name,"N/A"));
		contactMap.put("Email",ifnull(getTrailer.Email,""));
		contactMap.put("Phone",formattedPhoneNumber);
		contactMap.put("Status1","Active");
		contactMap.put("Mailing_Country",getTrailer.Country);
		contactMap.put("Mailing_Address",getTrailer.Address);
		contactMap.put("Mailing_Street",getTrailer.Suite_Apt);
		contactMap.put("Mailing_Zip",getTrailer.Postal_Zip_Code);
		contactMap.put("Mailing_City",getTrailer.City);
		contactMap.put("Mailing_State",getTrailer.Province_State);
		if(getTrailer.Were_you_referred_by_a_friend_or_business == true)
		{
			if(getTrailer.Enter_the_friend_s_name == "Google")
			{
				referraltype = "Google";
				referralName = "";
			}
			else
			{
				referraltype = "Friend or Family";
				referralName = getTrailer.Enter_the_friend_s_name;
			}
		}
		contactMap.put("Referral_Type",referraltype);
		contactMap.put("Referral_Friend",referralName);
		creatorContactMigratedStatusList = List();
		creatorContactMigratedStatusList.clear();
		creatorQuoteMigratedStatusList = List();
		creatorQuoteMigratedStatusList.clear();
		creatorID = null;
		if(getTrailer.count() > 0)
		{
			if(getTrailer.Email != null && getTrailer.Email != "")
			{
				emailUnique = zoho.crm.searchRecords("Contacts","(Email:equals:" + getTrailer.Email + ")");
				// 						info "emailUnique " + emailUnique.size();
				if(emailUnique.size() > 0)
				{
					fetCreatorContact = Customer[Email == getTrailer.Email];
					if(fetCreatorContact.count() > 0)
					{
						// 								update customer in creator
						creatorContactMigratedStatusList.add("Updated Contact");
						creatorID = fetCreatorContact.ID;
						fetCreatorContact.Email=getTrailer.Email;
						fetCreatorContact.First_Name=getTrailer.Insured_First_Name;
						fetCreatorContact.Last_Name=getTrailer.Insured_Last_Name;
						fetCreatorContact.City=getTrailer.City;
						fetCreatorContact.Country=getTrailer.Country;
						fetCreatorContact.Province=getTrailer.Province_State;
						fetCreatorContact.Postal_Code=getTrailer.Postal_Zip_Code;
						fetCreatorContact.Phone_Number=formattedPhoneNumber;
						fetCreatorContact.Address_Line1=getTrailer.Address;
						fetCreatorContact.Address_Line2=getTrailer.Suite_Apt;
						fetCreatorContact.Customer_Type="Contact";
						fetCreatorContact.Where_Did_You_Find_Us=referraltype;
						fetCreatorContact.Name=referralName;
						// 							Migration Section
						fetCreatorContact.Migrated=true;
						fetCreatorContact.Migrated_Status=creatorContactMigratedStatusList;
						fetCreatorContact.Boat_Migration_ID=getTrailer.ID.tostring();
						fetCreatorContact.Contact_Type="Master";
						// 							Developer Section
						fetCreatorContact.Zoho_Crm_ID=emailUnique.get(0).get("id");
						// 							fetCreatorContact.Customer_Type1="Contact";
						// 							Update Boat Migration Contact Module Section
						getTrailer.Contact_Type="Master";
						getTrailer.Valid_emailID="YES";
						getTrailer.Creator_Status="Success";
						getTrailer.Customer_Creator_ID=fetCreatorContact.ID;
						getTrailer.CRM_Contact_ID=emailUnique.get(0).get("id").toString();
						getTrailer.CRM_Contact_Status="Success";
						getTrailer.Contact_Migrated_Status=creatorContactMigratedStatusList;
						// 							// 							customerUpdate = fetCreatorContact.ID;
					}
					else
					{
						creatorContactMigratedStatusList.add("New Contact");
						createMasterContact = insert into Customer
						[
							Email=getTrailer.Email
							First_Name=getTrailer.Insured_First_Name
							Last_Name=getTrailer.Insured_Last_Name
							Added_User=zoho.loginuser
							City=getTrailer.City
							Country=getTrailer.Country
							Province=getTrailer.Province_State
							Postal_Code=getTrailer.Postal_Zip_Code
							Phone_Number=formattedPhoneNumber
							Address_Line1=getTrailer.Address
							Address_Line2=getTrailer.Suite_Apt
							Customer_Type="Contact"
							Where_Did_You_Find_Us=referraltype
							Name=referralName
							Migrated=true
							Migrated_Status=creatorContactMigratedStatusList
							Boat_Migration_ID=getTrailer.ID.tostring()
							Contact_Type="Master"
							Zoho_Crm_ID=emailUnique.get(0).get("id")
						];
						//Customer_Type1="Contact"
						creatorID = createMasterContact;
						info "creatorID = " + creatorID;
						// 							customerUpdate = createMasterContact;
						// 							Update Boat Migration Contact Module Section
						if(Customer[ID == createMasterContact].count() > 0)
						{
							getTrailer.Contact_Type="Master";
							getTrailer.Valid_emailID="YES";
							getTrailer.Creator_Status="Success";
							getTrailer.Customer_Creator_ID=createMasterContact.toString();
							getTrailer.Creator_Error_Msg="";
							getTrailer.CRM_Contact_ID=emailUnique.get(0).get("id").toString();
							getTrailer.CRM_Contact_Status="Success";
						}
						else
						{
							getTrailer.Creator_Status="Fail";
							getTrailer.Creator_Error_Msg=createMasterContact.toString();
						}
						getTrailer.Contact_Migrated_Status=creatorContactMigratedStatusList;
					}
					// 							info "masterCustomer " + masterCustomer;
					updatecontactMap = Map();
					ContactlayoutMap = Map();
					ContactlayoutMap.put("id",5778486000007674550);
					updatecontactMap.put("Layout",ContactlayoutMap);
					updatecontactMap.put("Migrated_Status",creatorContactMigratedStatusList);
					updatecontactMap.put("Zoho_Creator_ID",creatorID.toString());
					updatecontactMap.put("Migrated",true);
					updatecontactMap.put("Contact_Type","Master");
					// 							updatecontactMap.put("Phone",formattedPhoneNumber);
					// 							updatecontactMap.put("Mailing_Country",getBoat.Country);
					// 							updatecontactMap.put("Mailing_Address",getBoat.Address);
					// 							updatecontactMap.put("Mailing_City",getBoat.City);
					// 							updatecontactMap.put("Mailing_State",getBoat.Province_State);
					// 							updatecontactMap.put("Mailing_Zip",getBoat.Postal_Zip_Code);
					// 							updatecontactMap.put("Date_of_Birth",getBoat.Date_of_Birth);
					//Phone
					if(getTrailer.Phone != null && getTrailer.Phone != "")
					{
						// 								info "Phone " + formattedPhoneNumber;
						updatecontactMap.put("Phone",formattedPhoneNumber);
					}
					else
					{
						updatecontactMap.put("Phone",ifnull(emailUnique.get(0).get("Phone"),""));
					}
					//Mailing Country
					if(getTrailer.Country != null && getTrailer.Country != "")
					{
						updatecontactMap.put("Mailing_Country",getTrailer.Country);
					}
					else
					{
						updatecontactMap.put("Mailing_Country",ifnull(emailUnique.get(0).get("Mailing_Country"),""));
					}
					//Mailing Address
					if(getTrailer.Address != null && getTrailer.Address != "")
					{
						updatecontactMap.put("Mailing_Address",getTrailer.Address);
					}
					else
					{
						updatecontactMap.put("Mailing_Address",ifnull(emailUnique.get(0).get("Mailing_Address"),""));
					}
					//Mailing Street
					if(getTrailer.Suite_Apt != null && getTrailer.Suite_Apt != "")
					{
						// 								info "Suite_Apt  " + getBoat.Suite_Apt;
						updatecontactMap.put("Mailing_Street",getTrailer.Suite_Apt);
					}
					else
					{
						updatecontactMap.put("Mailing_Street",ifnull(emailUnique.get(0).get("Mailing_Street"),""));
					}
					//Mailing City
					if(getTrailer.City != null && getTrailer.City != "")
					{
						updatecontactMap.put("Mailing_City",getTrailer.City);
					}
					else
					{
						updatecontactMap.put("Mailing_City",ifnull(emailUnique.get(0).get("Mailing_City"),""));
					}
					//Mailing State
					if(getTrailer.Province_State != null && getTrailer.Province_State != "")
					{
						updatecontactMap.put("Mailing_State",getTrailer.Province_State);
					}
					else
					{
						updatecontactMap.put("Mailing_State",ifnull(emailUnique.get(0).get("Mailing_State"),""));
					}
					//Mailing Zip
					if(getTrailer.Postal_Zip_Code != null && getTrailer.Postal_Zip_Code != "")
					{
						updatecontactMap.put("Mailing_Zip",getTrailer.Postal_Zip_Code);
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
						getTrailer.CRM_Contact_ID=updateCRMContact.get("id").toString();
						getTrailer.CRM_Contact_Status="Success";
						getTrailer.Contact_Error_Msg="";
					}
					else
					{
						info "update contact error";
						info updateCRMContact;
						getTrailer.CRM_Contact_ID="";
						getTrailer.CRM_Contact_Status="Fail";
						getTrailer.Contact_Error_Msg=updateCRMContact.toString();
					}
				}
				else
				{
					// 					Create Contact in Creator
					creatorContactMigratedStatusList.add("New Contact");
					createContact = insert into Customer
					[
						Email=getTrailer.Email
						First_Name=getTrailer.Insured_First_Name
						Last_Name=getTrailer.Insured_Last_Name
						Added_User=zoho.loginuser
						City=getTrailer.City
						Country=getTrailer.Country
						Province=getTrailer.Province_State
						Postal_Code=getTrailer.Postal_Zip_Code
						Phone_Number=formattedPhoneNumber
						Address_Line1=getTrailer.Address
						Address_Line2=getTrailer.Suite_Apt
						Customer_Type="Contact"
						Where_Did_You_Find_Us=referraltype
						Name=referralName
						Migrated=true
						Migrated_Status=creatorContactMigratedStatusList
						Boat_Migration_ID=getTrailer.ID.tostring()
						Contact_Type="Master"
					];
					//Customer_Type1="Contact"
					creatorID = createContact;
					getTrailer.Contact_Type="Master";
					getTrailer.Valid_emailID="NO";
					// 							customerUpdate = createContact;
					createContactCreator = Customer[ID == createContact];
					if(createContactCreator.count() > 0)
					{
						getTrailer.Creator_Status="Success";
						getTrailer.Customer_Creator_ID=createContact;
						getTrailer.Creator_Error_Msg="";
					}
					else
					{
						getTrailer.Creator_Status="Fail";
						getTrailer.Creator_Error_Msg=createContact.toString();
					}
					getTrailer.Contact_Migrated_Status=creatorContactMigratedStatusList;
					// 					Create Contact in CRM
					// 							info "create contact in CRM";
					contactMap.put("Zoho_Creator_ID",createContactCreator.ID.toString());
					contactMap.put("Contact_Type","Master");
					contactMap.put("Migrated_Status",creatorContactMigratedStatusList);
					contactMap.put("Migrated",true);
					createCRMContact = zoho.crm.createRecord("Contacts",contactMap);
					// 							info "createCRMContact: " + createCRMContact;
					if(createCRMContact.containKey("id") == true && createCRMContact.get("id") != null)
					{
						getTrailer.CRM_Contact_ID=createCRMContact.get("id").toString();
						getTrailer.CRM_Contact_Status="Success";
						createContactCreator.Zoho_Crm_ID=createCRMContact.get("id");
						getTrailer.Contact_Error_Msg="";
					}
					else
					{
						info "create contact error";
						info createCRMContact;
						getTrailer.CRM_Contact_Status="Fail";
						getTrailer.Contact_Error_Msg=createCRMContact.toString();
						getTrailer.CRM_Contact_ID="";
					}
				}
				cusFetch = Customer[ID == creatorID.toLong()];
				if(cusFetch.Server_Customer_ID != "")
				{
					thisapp.Server_Side.Latest_Customer_Sync_Update(cusFetch.ID);
				}
				else
				{
					thisapp.Server_Side.Latest_Customer_Sync_Create(cusFetch.ID);
				}
				cusFetch.Migrated_to_Server=true;
				// 			policy
				layoutMap = Map();
				layoutMap.put("id",5778486000007672922);
				policyMap.put("Layout",layoutMap);
				// 				policyMap.put("Migration_Data_on",getTrailer.Imported_Month + "-" + getTrailer.Imported_Year);
				policyMap.put("Migration_Data_on","14/03/2024");
				policyMap.put("Deal_Status",dealStatus);
				policyMap.put("Contact_Name",getTrailer.CRM_Contact_ID);
				policyMap.put("Product_Name",getTrailer.Product_Name);
				policyMap.put("Lead_Source",referraltype);
				policyMap.put("Type","Trailer");
				policyMap.put("Carrier",carrierVal);
				policyMap.put("Policy_AutoRenewal_Status","Active");
				// 				policyMap.put("Policy_Number",getTrailer.Policy_Number);
				// 				policyMap.put("Quote_ID",getTrailer.Reference_Number);
				policyMap.put("Phone",formattedPhoneNumber);
				policyMap.put("Additional_Insured_1",getTrailer.Additional_Insured_First_Name);
				policyMap.put("Additional_Insured_2",getTrailer.Additional_Insured_Last_Name);
				policyMap.put("Payment_Date",if(getTrailer.Payment_Date1 != null,getTrailer.Payment_Date1.toTime("yyyy-MM-dd'T'HH:mm:ss").toString("yyyy-MM-dd'T'HH:mm:ss"),null));
				policyMap.put("Sales_Date_1",if(getTrailer.Payment_Date1 != null,getTrailer.Payment_Date1.toTime("yyyy-MM-dd'T'HH:mm:ss").toString("yyyy-MM-dd'T'HH:mm:ss"),null));
				// 				info "payment date: " + getTrailer.Payment_Date1;
				// 				policyMap.put("Bind_Date",if(getTrailer.Bind_Date != null,getTrailer.Bind_Date.toTime("yyyy-MM-dd'T'HH:mm:ss").toString("yyyy-MM-dd'T'HH:mm:ss"),null));
				policyMap.put("Inception_Date",getTrailer.Effective_Date);
				//if(getTrailer.Bind_Date != null,getTrailer.Bind_Date.toTime("yyyy-MM-dd'T'HH:mm:ss").toString("yyyy-MM-dd'T'HH:mm:ss")
				policyMap.put("Postal_code_ZIP_Code_of_Mailing_address",getTrailer.Postal_Zip_Code);
				// 				policyMap.put("End_Date",getTrailer.End_Date);
				policyMap.put("Expiry_Date",getTrailer.End_Date);
				policyMap.put("Premium",getTrailer.Premium);
				policyMap.put("Fee",getTrailer.Fee);
				policyMap.put("Total",getTrailer.Total1);
				policyMap.put("Tax",getTrailer.Tax);
				policyMap.put("Last_Modified",if(getTrailer.Last_Modified1 != null,getTrailer.Last_Modified1.toTime("yyyy-MM-dd'T'HH:mm:ss").toString("yyyy-MM-dd'T'HH:mm:ss"),null));
				if(getTrailer.Please_select_the_province_your_trailer_is_located_in == "Alberta")
				{
					policyMap.put("Province","AB");
				}
				else if(getTrailer.Please_select_the_province_your_trailer_is_located_in == "British Columbia")
				{
					policyMap.put("Province","BC");
				}
				else if(getTrailer.Please_select_the_province_your_trailer_is_located_in == "Ontario")
				{
					policyMap.put("Province","ON");
				}
				else if(getTrailer.Please_select_the_province_your_trailer_is_located_in == "Saskatchewan")
				{
					policyMap.put("Province","SK");
				}
				else
				{
					policyMap.put("Province",null);
				}
				// 			policyMap.put("Loss_Payees_Address",getTrailer.Loss_Payees_Address);
				// 			policyMap.put("Loss_Payees_City",getTrailer.Loss_Payees_City);
				// 			policyMap.put("Loss_Payees_Country",getTrailer.Loss_Payees_Country);
				// 			policyMap.put("Loss_Payees_Name",getTrailer.Loss_Payees_Name);
				// 			policyMap.put("Loss_Payees_Postal_Code",getTrailer.Loss_Payees_Postal_Code);
				// 			policyMap.put("Loss_Payees_Province",getTrailer.Loss_Payees_Province);
				// 			policyMap.put("Loss_Payees_State",getTrailer.Loss_Payees_State);
				// 			policyMap.put("Loss_Payees_Unit_Suite",getTrailer.Loss_Payees_Unit_Suite);
				// 			policyMap.put("Loss_Payees_Zip_Code",getTrailer.Loss_Payees_Zip_Code);
				// 				policyMap.put("Please_select_the_province_your_boat_is_used_in1",getTrailer.Please_select_the_province_your_trailer_is_located_in);
				// 				policyMap.put("Were_you_referred_by_a_friend_or_business",getTrailer.Were_you_referred_by_a_friend_or_business);
				// 				policyMap.put("Enter_the_friend_s_name",getTrailer.Enter_the_friend_s_name);
				// 				policyMap.put("Additional_outdoor_structure_width",getTrailer.Additional_outdoor_structure_width);
				// 				policyMap.put("Additional_outdoor_structure_length",getTrailer.Additional_outdoor_structure_length);
				// 			policyMap.put("Deck_Length",if(getTrailer.Deck_Length1 != null,getTrailer.Deck_Length1.toNumber(),null));
				// 			policyMap.put("Deck_Width",if(getTrailer.Deck_Width1 != null,getTrailer.Deck_Width1.toNumber(),null));
				// 			policyMap.put("Trailer_Length",if(getTrailer.Trailer_Length != null,getTrailer.Trailer_Length.toNumber(),null));
				// 			policyMap.put("Trailer_Width",if(getTrailer.Trailer_Width != null,getTrailer.Trailer_Width.toNumber(),null));
				// 				policyMap.put("ID_Serial",getTrailer.ID_Serial1);
				// 				policyMap.put("Describe_damage",getTrailer.Describe_damage);
				// 				policyMap.put("Describe_modifications",getTrailer.Describe_modifications);
				// 				policyMap.put("Current_Cost_of_Brand_New_Unit",getTrailer.Replacement_cost);
				// 				policyMap.put("Fair_Market_Value",getTrailer.Fair_Market_Value);
				// 				policyMap.put("Heating_type",getTrailer.Heating_type);
				// 				policyMap.put("Product_Package",getTrailer.Product_Package);
				// 				policyMap.put("Is_there_any_pre_existing_damage_on_the_trailer",getTrailer.Is_there_any_pre_existing_damage_on_the_trailer1);
				// 				policyMap.put("Trailer_Model_Year",getTrailer.Trailer_Model_Year);
				policyMap.put("Stage","Won");
				// 				policyMap.put("Cleanup",true);
				policyMap.put("Agree_to_terms_and_conditions",true);
				policyMap.put("How_many_trailers_would_you_like_to_insure","1");
				// 				policyMap.put("Please_select_the_province",getTrailer.Please_select_the_province_your_trailer_is_located_in);
				policyMap.put("Deal_Name",if(getTrailer.Policy_Number != "",getTrailer.Policy_Number,if(getTrailer.Reference_Number != "",getTrailer.Reference_Number,"N/A")));
				if(getTrailer.Deductible != "" && getTrailer.Deductible != null)
				{
					deductible = getTrailer.Deductible.remove("$").remove(",").toDecimal().round(0);
					deductible = deductible;
				}
				else
				{
					deductible = null;
				}
				SelectTrailerType = "";
				if(getTrailer.Select_the_type_of_trailer == "Recreational or Fifth Wheel Trailer")
				{
					SelectTrailerType = "Travel Trailer/Fifth Wheel Trailer";
				}
				else if(getTrailer.Select_the_type_of_trailer == "Park Model")
				{
					SelectTrailerType = "Park Model/Destination Trailer";
				}
				else
				{
					SelectTrailerType = "";
				}
				// 				if(getTrailer.Product_Name != null && getTrailer.Product_Name != "")
				// 				{
				// 					crmPolicy = zoho.crm.searchRecords("Deals","(((Product_Name:equals:" + getTrailer.Product_Name + ") AND ((Policy_Number:equals:" + getTrailer.Policy_Number + ") OR (Quote_ID:equals:" + getTrailer.Reference_Number + "))))");
				if(getTrailer.Policy_Number.tostring().len() > 0 && getTrailer.Reference_Number.tostring().len() > 0)
				{
					info "All values present";
					policyMap.put("Policy_Number",getTrailer.Policy_Number);
					policyMap.put("Quote_ID",getTrailer.Reference_Number);
					crmPolicy = zoho.crm.searchRecords("Deals","((Policy_Number:equals:" + getTrailer.Policy_Number + ") OR (Quote_ID:equals:" + getTrailer.Reference_Number + "))");
					// 					info "crmPolicy = " + crmPolicy;
					// 					info "crmPolicy" + crmPolicy.size();
				}
				else if(getTrailer.Policy_Number.tostring().len() > 0 && getTrailer.Reference_Number.tostring().len() == 0)
				{
					info "Reference_Number is not present";
					policyMap.put("Policy_Number",getTrailer.Policy_Number);
					crmPolicy = zoho.crm.searchRecords("Deals","(Policy_Number:equals:" + getTrailer.Policy_Number + ")");
					// 					info "crmPolicy " + crmPolicy.size();
				}
				else if(getTrailer.Policy_Number.tostring().len() == 0 && getTrailer.Reference_Number.tostring().len() > 0)
				{
					info "Policy_Number is not present";
					policyMap.put("Quote_ID",getTrailer.Reference_Number);
					crmPolicy = zoho.crm.searchRecords("Deals","(Quote_ID:equals:" + getTrailer.Reference_Number + ")");
					// 					info "crmPolicy " + crmPolicy.size();
				}
				// 				info "crmPolicy-->" + getTrailer.Product_Name + "sada" + getTrailer.Policy_Number;
				info "crmPolicy = " + crmPolicy;
				if(crmPolicy.size() > 0 && crmPolicy.get(0).get("id") != null && crmPolicy.get(0).get("id") != "")
				{
					info "exist deal in CRM";
					creatorQuoteMigratedStatusList.add("Unique Key matched");
					creatorQuoteMigratedStatusList.add("Updated Deal");
					policyMap.put("Migrated_Status",creatorQuoteMigratedStatusList);
					// 				update policy in creator
					// 					if(getTrailer.Policy_Number.tostring().len() > 0 && getTrailer.Reference_Number.tostring().len() > 0)
					// 					{
					// 						info "All values present";
					// 						// 						getTrailerQuote = TrailerQuote[Policy_Number == getTrailer.Policy_Number && Quote_ID == getTrailer.Reference_Number];
					// 						getTrailerQuote = TrailerQuote[Policy_Number == getTrailer.Policy_Number];
					// 					}
					// 					else if(getTrailer.Policy_Number.tostring().len() > 0 && getTrailer.Reference_Number.tostring().len() == 0)
					// 					{
					// 						info "Reference_Number is not present";
					// 						getTrailerQuote = TrailerQuote[Policy_Number == getTrailer.Policy_Number];
					// 					}
					// 					else if(getTrailer.Policy_Number.tostring().len() == 0 && getTrailer.Reference_Number.tostring().len() > 0)
					// 					{
					// 						info "Policy_Number is not present";
					// 						getTrailerQuote = TrailerQuote[Quote_ID == getTrailer.Reference_Number];
					// 					}
					// 					info "getTrailerQuote" + getTrailerQuote;
					getTrailerQuote = TrailerQuote[Policy_Number == getTrailer.Policy_Number || Quote_ID == getTrailer.Reference_Number];
					if(getTrailerQuote.count() > 0)
					{
						info "update creator trailer quote";
						quoteID = getTrailerQuote.ID;
						getTrailerQuote.Trailer_Migration_ID=getTrailer.ID;
						getTrailerQuote.Migrated=true;
						getTrailerQuote.Migrated_Status=creatorQuoteMigratedStatusList;
						getTrailerQuote.Zoho_Crm_ID=crmPolicy.get(0).get("id");
						getTrailerQuote.Customer_ID=creatorID;
						getTrailerQuote.Policy_Number=getTrailer.Policy_Number;
						getTrailerQuote.Quote_Status="Completed";
						getTrailerQuote.Deal_Type=dealStatus;
						getTrailerQuote.Quote_ID=getTrailer.Reference_Number;
						getTrailerQuote.Insured_First_Name=getTrailer.Insured_First_Name;
						getTrailerQuote.Insured_Last_Name=getTrailer.Insured_Last_Name;
						getTrailerQuote.Email=getTrailer.Email;
						getTrailerQuote.Phone_Number=formattedPhoneNumber;
						getTrailerQuote.Name=getTrailer.Enter_the_friend_s_name;
						getTrailerQuote.Carrier=carrierVal;
						getTrailerQuote.Please_select_the_province_your_trailer_is_located_in=getTrailer.Please_select_the_province_your_trailer_is_located_in;
						getTrailerQuote.Payment_Date=getTrailer.Payment_Date1;
						getTrailerQuote.Bind_Date=getTrailer.Bind_Date;
						getTrailerQuote.Last_Modified_Date=getTrailer.Last_Modified1;
						getTrailerQuote.How_many_trailers_would_you_like_to_insure="1";
						getTrailerQuote.Country=getTrailer.Country;
						getTrailerQuote.City=getTrailer.City;
						getTrailerQuote.Address=getTrailer.Address;
						getTrailerQuote.Suite_Apt=getTrailer.Suite_Apt;
						getTrailerQuote.Province=getTrailer.Province_State;
						getTrailerQuote.Postal_code_ZIP_Code=getTrailer.Postal_Zip_Code;
						getTrailerQuote.Total_Payable_Premium_after_tax=getTrailer.Total1;
						getTrailerQuote.Total_Tax=getTrailer.Tax;
						getTrailerQuote.Where_Did_You_Find_Us=referraltype;
						getTrailerQuote.Name=referralName;
						getTrailerQuote.Fee=getTrailer.Fee;
						getTrailerQuote.Tax_Precent=taxPercentage;
						getTrailerQuote.Payment_Date=getTrailer.Payment_Date1;
						getTrailerQuote.Sales_Date=if(getTrailerQuote.Sales_Date != null,getTrailerQuote.Sales_Date,getTrailer.Payment_Date1);
						getTrailerQuote.Tax_Province=getTrailer.Please_select_the_province_your_trailer_is_located_in;
						getTrailerQuote.Organization_ID="RECPROTECT1";
						getTrailerQuote.Created_Source="CREATOR";
						getTrailerQuote.Agree_to_terms_and_conditions=true;
						getTrailerQuote.Total_Premium_before_tax=getTrailer.Premium;
						getTrailerQuote.Policy_Status="ACTIVE";
						getTrailerQuote.Policy_AutoRenewal_Status="Active";
						getTrailerQuote.Inception_Date=getTrailer.Effective_Date;
						getTrailerQuote.Expiry_Date=getTrailer.End_Date;
						getTrailerQuote.Trailer_Migration_ID=getTrailer.ID.tostring();
						getTrailerQuote.Migrated=true;
						getTrailerQuote.Quote_Policy_Type="New Business";
						getTrailersubform = Trailer[TrailerQuote == getTrailerQuote.ID];
						if(getTrailersubform.count() > 0)
						{
							subFormTrailerID = getTrailersubform.ID;
							// 							getTrailersubform.Select_Trailer_Type=getTrailer.Select_the_type_of_trailer;
							getTrailersubform.Select_Trailer_Type=SelectTrailerType;
							getTrailersubform.Trailer_Model_Year=getTrailer.Trailer_Model_Year;
							if(getTrailer.Are_you_the_original_owner_of_the_trailer == "No" || getTrailer.Are_you_the_original_owner_of_the_trailer == "NO")
							{
								getTrailersubform.Are_you_the_original_owner_of_the_trailer="No";
							}
							else if(getTrailer.Are_you_the_original_owner_of_the_trailer == "Yes" || getTrailer.Are_you_the_original_owner_of_the_trailer == "YES")
							{
								getTrailersubform.Are_you_the_original_owner_of_the_trailer="Yes";
							}
							else
							{
								getTrailersubform.Are_you_the_original_owner_of_the_trailer=getTrailerQuote.Are_there_any_additional_names_on_the_trailer_ownership;
							}
							getTrailersubform.Replacement_Cost=getTrailer.Replacement_cost;
							getTrailersubform.Actual_Cash_Value=getTrailer.Fair_Market_Value;
							getTrailersubform.Is_your_trailer_parked_within_500_feet_of_a_body_of_water=if(getTrailer.Is_your_trailer_parked_within_500_feet_of_a_body_of_water == true,"Yes","No");
							getTrailersubform.Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground=if(getTrailer.Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground == true,"Yes","No");
							//						getTrailersubform.Is_the_trailer_taken_into_the_USA_for_more_than_180_days=getTrailer.Is_the_trailer_taken_into_the_United_States_for_more_than_90_Days;
							getTrailersubform.Do_you_have_a_deck=if(getTrailer.Do_you_have_a_deck == true,"Yes","No");
							getTrailersubform.Do_you_have_a_screened_in_room_or_a_Florida_room=if(getTrailer.Do_you_have_an_additional_room_or_structure == true,"Yes","No");
							getTrailersubform.Would_you_like_to_insure_a_golf_cart=if(getTrailer.Would_you_like_to_Insure_a_Golf_Cart == true,"Yes","No");
							getTrailersubform.Number_of_Golf_Cart=getTrailer.Number_of_Golf_Carts;
							getTrailersubform.Value_of_Golf_Cart_1=getTrailer.Value_of_Golf_Cart_1;
							getTrailersubform.Value_of_Golf_Cart_2=getTrailer.Value_of_Golf_Cart_2;
							getTrailersubform.Premium_Per_Year=getTrailer.Premium;
							getTrailersubform.Overland_Water_Protection=getTrailer.Overland_Water_Protection1;
							getTrailersubform.Trailer_Coverage=getTrailer.Trailer_Coverage1;
							getTrailersubform.Coverage_Type=getTrailer.Coverage_Type;
							getTrailersubform.Detached_Private_Structure_Coverage_Sheds_etc=getTrailer.Detached_Private_Structure_Coverage_Sheds_etc1;
							getTrailersubform.Personal_Property_Coverage_T_V_Furniture_etc=getTrailer.Personal_Property_Coverage_T_V_Furniture_etc1;
							getTrailersubform.Premises_Liability=getTrailer.Premises_Liability;
							getTrailersubform.Trailer_Migration_ID=getTrailer.ID.tostring();
							getTrailersubform.VIN=getTrailer.ID_Serial1;
							getTrailersubform.Select_coverage_for_policy=prodPackage;
							getTrailersubform.Migrated=true;
							// 							info "deductible: " + getTrailer.Deductible;
							getTrailersubform.Deductible=deductible.toString();
							getTrailersubform.Do_you_live_in_the_trailer_full_time_all_year_round_as_a_principal_residence=if(getTrailer.Do_you_live_in_the_trailer_full_time_all_year_round_as_a_principal_residence == true,"Yes","No");
							getTrailersubform.Is_the_unit_used_strictly_for_pleasure_purposes_with_no_rental_or_business_use_of_any_kind=if(getTrailer.Is_the_unit_used_strictly_for_pleasure_purposes_with_no_rental_or_business_use_of_any_kind == true,"Yes","No");
							getTrailersubform.Heating_Type=getTrailer.Heating_type;
							getTrailersubform.Is_this_a_dual_purpose_trailer_toy_hauler_horse_trailer=if(getTrailer.Is_this_a_dual_purpose_trailer_toy_hauler_horse_trailer == true,"Yes","No");
							getTrailersubform.Are_there_any_modifications_to_the_trailer_ie_Addition_of_permanently_installed_solar_panels=if(getTrailer.Are_there_any_modifications_to_the_trailer_ie_Addition_of_permanently_installed_solar_panels == true,"Yes","No");
							getTrailersubform.Is_there_any_pre_existing_damage_on_the_trailer=if(getTrailer.Is_there_any_pre_existing_damage_on_the_trailer == true,"Yes","No");
							getTrailersubform.Describe_Damage=getTrailer.Describe_damage;
							getTrailersubform.Is_the_trailer_motorized_and_able_to_travel_on_its_own_without_a_towing_vehicle=if(getTrailer.Is_the_trailer_motorized_and_able_to_travel_on_its_own_without_a_towing_vehicle == true,"Yes","No");
							getTrailersubform.Trailer_Manufacturer=getTrailer.Trailer_Manufacturer;
							getTrailersubform.Trailer_Length=getTrailer.Trailer_Length;
							getTrailersubform.Trailer_Model=getTrailer.Trailer_Model;
							getTrailersubform.Trailer_Width=getTrailer.Trailer_Width;
							getTrailersubform.Trailer_Model_Age=getTrailer.Trailer_Model_Age1;
							getTrailersubform.Deck_Length=getTrailer.Deck_Length1;
							getTrailersubform.Deck_Width=getTrailer.Deck_Width1;
							getTrailersubform.Is_there_any_heating_that_wasn_t_factory_installed_wood_stove_pellet_stove_etc=if(getTrailer.Is_there_any_heating_that_wasn_t_factory_installed_wood_stove_space_heater_etc == true,"Yes","No");
							getTrailersubform.Is_this_trailer_financed=if(IsThisBoatFinanced == true,"Yes","No");
							getTrailersubform.Screened_in_room_or_Florida_room_Length=if(getTrailer.Additional_outdoor_structure_length_1 != "",getTrailer.Additional_outdoor_structure_length_1.toNumber(),null);
							getTrailersubform.Screened_in_room_or_Florida_room_Width=if(getTrailer.Additional_outdoor_structure_width_1 != "",getTrailer.Additional_outdoor_structure_width_1.toNumber(),null);
							getTrailersubform.Lein_holder=SelectAFinancier;
							getTrailersubform.Address_line1=LossPayAddressLine1;
							getTrailersubform.Address_line2=LossPayAddressLine2;
							getTrailersubform.City1=LossPayCity;
							getTrailersubform.Province1=LossPayProvince;
							getTrailersubform.Postal_Code=LossPayPostalCode;
							getTrailersubform.Country=LossPayCountry;
							getTrailersubform.Select_a_Park1=selectPark;
							getTrailersubform.Park_Name=parkName;
							getTrailersubform.Address_Lines1=getTrailer.Address1;
							getTrailersubform.City=getTrailer.City1;
							getTrailersubform.Province=getTrailer.Province;
							getTrailersubform.PostalCode=getTrailer.Enter_your_postal_code_or_zip_code;
							getTrailersubform.Site_Number=getTrailer.Site_location_number;
						}
						else
						{
							// 						insert subform Trailer in TrailerQuote
							//Select_Trailer_Type=getTrailer.Select_the_type_of_trailer
							//Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground=getTrailer.Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground
							//Is_the_trailer_taken_into_the_USA_for_more_than_180_days=getTrailer.Is_the_trailer_taken_into_the_United_States_for_more_than_90_Days
							createTrailer = insert into Trailer
							[
								Added_User=zoho.loginuser
								TrailerQuote=getTrailerQuote.ID
								Trailer_Model_Year=getTrailer.Trailer_Model_Year
								Are_you_the_original_owner_of_the_trailer=getTrailer.Are_you_the_original_owner_of_the_trailer
								Select_Trailer_Type=SelectTrailerType
								Replacement_Cost=getTrailer.Replacement_cost
								Actual_Cash_Value=getTrailer.Fair_Market_Value
								Is_your_trailer_parked_within_500_feet_of_a_body_of_water=if(getTrailer.Is_your_trailer_parked_within_500_feet_of_a_body_of_water == true,"Yes","No")
								Do_you_have_a_deck=if(getTrailer.Do_you_have_a_deck == true,"Yes","No")
								Do_you_have_a_screened_in_room_or_a_Florida_room=getTrailer.Do_you_have_an_additional_room_or_structure
								Would_you_like_to_insure_a_golf_cart=if(getTrailer.Would_you_like_to_Insure_a_Golf_Cart == true,"Yes","No")
								Number_of_Golf_Cart=getTrailer.Number_of_Golf_Carts
								Value_of_Golf_Cart_1=getTrailer.Value_of_Golf_Cart_1
								Value_of_Golf_Cart_2=getTrailer.Value_of_Golf_Cart_2
								Premium_Per_Year=getTrailer.Premium
								Overland_Water_Protection=getTrailer.Overland_Water_Protection1
								Trailer_Coverage=getTrailer.Trailer_Coverage1
								Coverage_Type=getTrailer.Coverage_Type
								Detached_Private_Structure_Coverage_Sheds_etc=getTrailer.Detached_Private_Structure_Coverage_Sheds_etc1
								Personal_Property_Coverage_T_V_Furniture_etc=getTrailer.Personal_Property_Coverage_T_V_Furniture_etc1
								Premises_Liability=getTrailer.Premises_Liability
								VIN=getTrailer.ID_Serial1
								Select_coverage_for_policy=prodPackage
								Deductible=getTrailer.Deductible
								Do_you_live_in_the_trailer_full_time_all_year_round_as_a_principal_residence=if(getTrailer.Do_you_live_in_the_trailer_full_time_all_year_round_as_a_principal_residence == true,"Yes","No")
								Is_the_unit_used_strictly_for_pleasure_purposes_with_no_rental_or_business_use_of_any_kind=if(getTrailer.Is_the_unit_used_strictly_for_pleasure_purposes_with_no_rental_or_business_use_of_any_kind == true,"Yes","No")
								Heating_Type=getTrailer.Heating_type
								Is_this_a_dual_purpose_trailer_toy_hauler_horse_trailer=if(getTrailer.Is_this_a_dual_purpose_trailer_toy_hauler_horse_trailer == true,"Yes","No")
								Are_there_any_modifications_to_the_trailer_ie_Addition_of_permanently_installed_solar_panels=if(getTrailer.Are_there_any_modifications_to_the_trailer_ie_Addition_of_permanently_installed_solar_panels == true,"Yes","No")
								Is_there_any_pre_existing_damage_on_the_trailer=if(getTrailer.Is_there_any_pre_existing_damage_on_the_trailer == true,"Yes","No")
								Describe_Damage=getTrailer.Describe_damage
								Is_the_trailer_motorized_and_able_to_travel_on_its_own_without_a_towing_vehicle=if(getTrailer.Is_the_trailer_motorized_and_able_to_travel_on_its_own_without_a_towing_vehicle == true,"Yes","No")
								Trailer_Manufacturer=getTrailer.Trailer_Manufacturer
								Trailer_Length=getTrailer.Trailer_Length
								Trailer_Model=getTrailer.Trailer_Model
								Trailer_Width=getTrailer.Trailer_Width
								Trailer_Model_Age=getTrailer.Trailer_Model_Age1
								Deck_Length=getTrailer.Deck_Length1
								Deck_Width=getTrailer.Deck_Width1
								Is_there_any_heating_that_wasn_t_factory_installed_wood_stove_pellet_stove_etc=if(getTrailer.Is_there_any_heating_that_wasn_t_factory_installed_wood_stove_space_heater_etc == true,"Yes","No")
								Trailer_Migration_ID=getTrailer.ID.tostring()
								Migrated=true
								Screened_in_room_or_Florida_room_Length=if(getTrailer.Additional_outdoor_structure_length_1 != "",getTrailer.Additional_outdoor_structure_length_1.toNumber(),null)
								Screened_in_room_or_Florida_room_Width=if(getTrailer.Additional_outdoor_structure_width_1 != "",getTrailer.Additional_outdoor_structure_width_1.toNumber(),null)
								Is_this_trailer_financed=if(IsThisBoatFinanced == true,"Yes","No")
								Lein_holder=SelectAFinancier
								Address_line1=LossPayAddressLine1
								Address_line2=LossPayAddressLine2
								City1=LossPayCity
								Province1=LossPayProvince
								Postal_Code=LossPayPostalCode
								Country=LossPayCountry
								Select_a_Park1=selectPark
								Park_Name=parkName
								Address_Lines1=getTrailer.Address1
								City=getTrailer.City1
								Province=getTrailer.Province
								PostalCode=getTrailer.Enter_your_postal_code_or_zip_code
								Site_Number=getTrailer.Site_location_number
							];
							subFormTrailerID = getTrailersubform.ID;
						}
						// 								Trailer Migration Deal Module section
						getTrailer.Trailer_Quote_Creator_ID=getTrailerQuote.ID;
						getTrailer.Quote_Record_Status="Success";
						getTrailer.CRM_Deal_ID=crmPolicy.get(0).get("id");
						getTrailer.CRM_Deal_Status="Success";
						getTrailer.Migrated1=true;
						getTrailer.Deal_Migrated_Status=creatorQuoteMigratedStatusList;
						getTrailer.Trailer_subform_Creator_ID=subFormTrailerID.toString();
						getTrailer.Subform_Record_Status="Success";
					}
					else
					{
						info "create creator trailer quote";
						// 						creatorQuoteMigratedStatusList.add("New Policy");
						// 				create policy in Creator
						createCreatorPolicy = insert into TrailerQuote
						[
							Added_User=zoho.loginuser
							Migrated_Status=creatorQuoteMigratedStatusList
							Policy_Number=getTrailer.Policy_Number
							Quote_ID=getTrailer.Reference_Number
							Insured_First_Name=getTrailer.Insured_First_Name
							Insured_Last_Name=getTrailer.Insured_Last_Name
							Email=getTrailer.Email
							Phone_Number=formattedPhoneNumber
							Name=getTrailer.Enter_the_friend_s_name
							Carrier=carrierVal
							Please_select_the_province_your_trailer_is_located_in=getTrailer.Please_select_the_province_your_trailer_is_located_in
							Payment_Date=getTrailer.Payment_Date1
							Bind_Date=getTrailer.Bind_Date
							Last_Modified_Date=getTrailer.Last_Modified1
							How_many_trailers_would_you_like_to_insure="1"
							Country=getTrailer.Country
							City=getTrailer.City
							Address=getTrailer.Address
							Suite_Apt=getTrailer.Suite_Apt
							Province=getTrailer.Province_State
							Postal_code_ZIP_Code=getTrailer.Postal_Zip_Code
							Agree_to_terms_and_conditions=true
							Total_Premium_before_tax=getTrailer.Premium
							Total_Tax=getTrailer.Tax
							Total_Payable_Premium_after_tax=getTrailer.Total1
							Policy_Status="ACTIVE"
							Policy_AutoRenewal_Status="Active"
							Quote_Policy_Type="New Business"
							Inception_Date=getTrailer.Effective_Date
							Expiry_Date=getTrailer.End_Date
							Where_Did_You_Find_Us=referraltype
							Name=referralName
							Fee=getTrailer.Fee
							Tax_Precent=taxPercentage
							Payment_Date=getTrailer.Payment_Date1
							Sales_Date=getTrailer.Payment_Date1
							Organization_ID="RECPROTECT1"
							Tax_Province=getTrailer.Please_select_the_province_your_trailer_is_located_in
							Created_Source="CREATOR"
							Trailer_Migration_ID=getTrailer.ID.tostring()
							Migrated=true
							Quote_Status="Completed"
							Customer_ID=creatorID
							Deal_Type=dealStatus
							Zoho_Crm_ID=crmPolicy.get(0).get("id")
						];
						quoteID = createCreatorPolicy;
						// 					Select_Trailer_Type=getTrailer.Select_the_type_of_trailer
						//Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground=getTrailer.Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground
						//Is_the_trailer_taken_into_the_USA_for_more_than_180_days=getTrailer.Is_the_trailer_taken_into_the_United_States_for_more_than_90_Days
						addTrailer = insert into Trailer
						[
							Added_User=zoho.loginuser
							TrailerQuote=createCreatorPolicy
							Trailer_Model_Year=getTrailer.Trailer_Model_Year
							Select_Trailer_Type=SelectTrailerType
							Are_you_the_original_owner_of_the_trailer=getTrailer.Are_you_the_original_owner_of_the_trailer
							Replacement_Cost=getTrailer.Replacement_cost
							Actual_Cash_Value=getTrailer.Fair_Market_Value
							Do_you_have_a_deck=if(getTrailer.Do_you_have_a_deck == true,"Yes","No")
							Do_you_have_a_screened_in_room_or_a_Florida_room=getTrailer.Do_you_have_an_additional_room_or_structure
							Would_you_like_to_insure_a_golf_cart=if(getTrailer.Would_you_like_to_Insure_a_Golf_Cart == true,"Yes","No")
							Number_of_Golf_Cart=getTrailer.Number_of_Golf_Carts
							Value_of_Golf_Cart_1=getTrailer.Value_of_Golf_Cart_1
							Value_of_Golf_Cart_2=getTrailer.Value_of_Golf_Cart_2
							Premium_Per_Year=getTrailer.Premium
							Overland_Water_Protection=getTrailer.Overland_Water_Protection1
							Trailer_Coverage=getTrailer.Trailer_Coverage1
							Coverage_Type=getTrailer.Coverage_Type
							Detached_Private_Structure_Coverage_Sheds_etc=getTrailer.Detached_Private_Structure_Coverage_Sheds_etc1
							Personal_Property_Coverage_T_V_Furniture_etc=getTrailer.Personal_Property_Coverage_T_V_Furniture_etc1
							Premises_Liability=getTrailer.Premises_Liability
							VIN=getTrailer.ID_Serial1
							Select_coverage_for_policy=prodPackage
							Deductible=getTrailer.Deductible
							Do_you_live_in_the_trailer_full_time_all_year_round_as_a_principal_residence=if(getTrailer.Do_you_live_in_the_trailer_full_time_all_year_round_as_a_principal_residence == true,"Yes","No")
							Is_your_trailer_parked_within_500_feet_of_a_body_of_water=if(getTrailer.Is_your_trailer_parked_within_500_feet_of_a_body_of_water == true,"Yes","No")
							Is_the_unit_used_strictly_for_pleasure_purposes_with_no_rental_or_business_use_of_any_kind=if(getTrailer.Is_the_unit_used_strictly_for_pleasure_purposes_with_no_rental_or_business_use_of_any_kind == true,"Yes","No")
							Heating_Type=getTrailer.Heating_type
							Is_this_a_dual_purpose_trailer_toy_hauler_horse_trailer=if(getTrailer.Is_this_a_dual_purpose_trailer_toy_hauler_horse_trailer == true,"Yes","No")
							Are_there_any_modifications_to_the_trailer_ie_Addition_of_permanently_installed_solar_panels=if(getTrailer.Are_there_any_modifications_to_the_trailer_ie_Addition_of_permanently_installed_solar_panels == true,"Yes","No")
							Is_there_any_pre_existing_damage_on_the_trailer=if(getTrailer.Is_there_any_pre_existing_damage_on_the_trailer == true,"Yes","No")
							Describe_Damage=getTrailer.Describe_damage
							Is_the_trailer_motorized_and_able_to_travel_on_its_own_without_a_towing_vehicle=if(getTrailer.Is_the_trailer_motorized_and_able_to_travel_on_its_own_without_a_towing_vehicle == true,"Yes","No")
							Trailer_Manufacturer=getTrailer.Trailer_Manufacturer
							Trailer_Length=getTrailer.Trailer_Length
							Trailer_Model=getTrailer.Trailer_Model
							Trailer_Width=getTrailer.Trailer_Width
							Trailer_Model_Age=getTrailer.Trailer_Model_Age1
							Deck_Length=getTrailer.Deck_Length1
							Deck_Width=getTrailer.Deck_Width1
							Is_there_any_heating_that_wasn_t_factory_installed_wood_stove_pellet_stove_etc=if(getTrailer.Is_there_any_heating_that_wasn_t_factory_installed_wood_stove_space_heater_etc == true,"Yes","No")
							Trailer_Migration_ID=getTrailer.ID.tostring()
							Migrated=true
							Screened_in_room_or_Florida_room_Length=if(getTrailer.Additional_outdoor_structure_length_1 != "",getTrailer.Additional_outdoor_structure_length_1.toNumber(),null)
							Screened_in_room_or_Florida_room_Width=if(getTrailer.Additional_outdoor_structure_width_1 != "",getTrailer.Additional_outdoor_structure_width_1.toNumber(),null)
							Is_this_trailer_financed=if(IsThisBoatFinanced == true,"Yes","No")
							Lein_holder=SelectAFinancier
							Address_line1=LossPayAddressLine1
							Address_line2=LossPayAddressLine2
							City1=LossPayCity
							Province1=LossPayProvince
							Postal_Code=LossPayPostalCode
							Country=LossPayCountry
							Select_a_Park1=selectPark
							Park_Name=parkName
							Address_Lines1=getTrailer.Address1
							City=getTrailer.City1
							Province=getTrailer.Province
							PostalCode=getTrailer.Enter_your_postal_code_or_zip_code
							Site_Number=getTrailer.Site_location_number
						];
						if(Trailer[ID == addTrailer].count() > 0)
						{
							getTrailer.Subform_Record_Status="Success";
							getTrailer.Deal_Migrated_Status=creatorQuoteMigratedStatusList;
							getTrailer.Trailer_subform_Creator_ID=addTrailer;
						}
						else
						{
							getTrailer.Subform_Record_Status="Fail";
						}
						fetTrailerQuote = TrailerQuote[ID == createCreatorPolicy];
						if(fetTrailerQuote.count() > 0)
						{
							fetTrailerQuote.Zoho_Crm_ID=crmPolicy.get(0).get("id");
							fetTrailerQuote.Customer_ID=creatorID;
							getTrailer.Quote_Record_Status="Success";
							getTrailer.Trailer_Quote_Creator_ID=createCreatorPolicy;
							getTrailer.Creator_Error_Msg1="";
						}
						else
						{
							getTrailer.Quote_Record_Status="Fail";
							getTrailer.Creator_Error_Msg1=createCreatorPolicy.toString();
						}
						getTrailer.CRM_Deal_ID=crmPolicy.get(0).get("id");
						getTrailer.CRM_Deal_Status="Success";
						getTrailer.Migrated1=true;
					}
					info "quoteID = " + quoteID;
					// 					// 				update policy in CRM
					policyMap.put("Creator_ID",quoteID.toString());
					policyMap.put("Migrated",true);
					// 					info crmPolicy.get(0).get("id");
					//Phone
					if(getTrailer.Phone != null && getTrailer.Phone != "")
					{
						policyMap.put("Phone",formattedPhoneNumber);
					}
					else
					{
						policyMap.put("Phone",crmPolicy.get(0).get("Phone"));
					}
					//Additional Insured First Name
					if(getTrailer.Additional_Insured_First_Name != null && getTrailer.Additional_Insured_First_Name != "")
					{
						policyMap.put("Additional_Insured_1",getTrailer.Additional_Insured_First_Name);
					}
					else
					{
						policyMap.put("Additional_Insured_1",crmPolicy.get(0).get("Additional_Insured_1"));
					}
					//Additional Insured Last Name
					if(getTrailer.Additional_Insured_Last_Name != null && getTrailer.Additional_Insured_Last_Name != "")
					{
						policyMap.put("Additional_Insured_2",getTrailer.Additional_Insured_Last_Name);
					}
					else
					{
						policyMap.put("Additional_Insured_2",crmPolicy.get(0).get("Additional_Insured_2"));
					}
					//Payment Date
					if(getTrailer.Payment_Date1 != null)
					{
						policyMap.put("Payment_Date",if(getTrailer.Payment_Date1 != null,getTrailer.Payment_Date1.toTime("yyyy-MM-dd'T'HH:mm:ss").toString("yyyy-MM-dd'T'HH:mm:ss"),null));
						policyMap.put("Sales_Date_1",if(getTrailer.Payment_Date1 != null,getTrailer.Payment_Date1.toTime("yyyy-MM-dd'T'HH:mm:ss").toString("yyyy-MM-dd'T'HH:mm:ss"),null));
					}
					else
					{
						policyMap.put("Payment_Date",crmPolicy.get(0).get("Payment_Date"));
						policyMap.put("Sales_Date_1",crmPolicy.get(0).get("Sales_Date_1"));
					}
					//Bind Date
					// 						if(getTrailer.Bind_Date != null)
					// 						{
					// 							policyMap.put("Bind_Date",if(getTrailer.Bind_Date != null,getTrailer.Bind_Date.toTime("yyyy-MM-dd'T'HH:mm:ss").toString("yyyy-MM-dd'T'HH:mm:ss"),null));
					// 						}
					// 						else
					// 						{
					// 							policyMap.put("Bind_Date",crmPolicy.get(0).get("Bind_Date"));
					// 						}
					// 							Inception Date
					if(getTrailer.Effective_Date != null)
					{
						policyMap.put("Inception_Date",getTrailer.Effective_Date);
						//if(getTrailer.Bind_Date != null,getTrailer.Bind_Date.toTime("yyyy-MM-dd'T'HH:mm:ss").toString("yyyy-MM-dd'T'HH:mm:ss")
					}
					else
					{
						policyMap.put("Inception_Date",crmPolicy.get(0).get("Inception_Date"));
					}
					if(getTrailer.End_Date != null)
					{
						policyMap.put("Expiry_Date",getTrailer.End_Date);
					}
					else
					{
						policyMap.put("Expiry_Date",crmPolicy.get(0).get("Expiry_Date"));
					}
					//Premium
					if(getTrailer.Premium != null)
					{
						policyMap.put("Premium",getTrailer.Premium);
					}
					else
					{
						policyMap.put("Premium",crmPolicy.get(0).get("Premium"));
					}
					//Fee
					if(getTrailer.Fee != null)
					{
						policyMap.put("Fee",getTrailer.Fee);
					}
					else
					{
						policyMap.put("Fee",crmPolicy.get(0).get("Fee"));
					}
					//Total
					if(getTrailer.Total1 != null)
					{
						policyMap.put("Total",getTrailer.Total1);
					}
					else
					{
						policyMap.put("Total",crmPolicy.get(0).get("Total"));
					}
					//Tax
					if(getTrailer.Tax != null)
					{
						policyMap.put("Tax",getTrailer.Tax);
					}
					else
					{
						policyMap.put("Tax",crmPolicy.get(0).get("Tax"));
					}
					//Last Modified Date Time
					if(getTrailer.Last_Modified1 != null)
					{
						policyMap.put("Last_Modified",if(getTrailer.Last_Modified1 != null,getTrailer.Last_Modified1.toTime("yyyy-MM-dd'T'HH:mm:ss").toString("yyyy-MM-dd'T'HH:mm:ss"),null));
					}
					else
					{
						policyMap.put("Last_Modified",crmPolicy.get(0).get("Last_Modified"));
					}
					policyMap.put("Owner",crmPolicy.get(0).get("Owner").get("id"));
					updateCRMPolicy = zoho.crm.updateRecord("Deals",crmPolicy.get(0).get("id").toLong(),policyMap);
					info "updateCRMPolicy: " + updateCRMPolicy;
					if(updateCRMPolicy.containKey("id") == true && updateCRMPolicy.get("id") != null && updateCRMPolicy.get("id") != "")
					{
						getTrailer.CRM_Deal_ID=updateCRMPolicy.get("id").toString();
						getTrailer.CRM_Deal_Status="Success";
						getTrailer.Deal_Error_Msg="";
						getTrailer.Deal_Migrated_Status=creatorQuoteMigratedStatusList;
						if(getTrailer.Additional_Insured_First_Name != "" || getTrailer.Additional_Insured_Last_Name != "")
						{
							newNote = Map();
							newNote.put("se_module","Deals");
							newNote.put("Parent_Id",updateCRMPolicy.get("id").toString());
							newNote.put("Note_Title","Additional Insured Name");
							newNote.put("Note_Content","Additional Insured available for this policy." + ifnull(getTrailer.Additional_Insured_First_Name,"") + " " + ifnull(getTrailer.Additional_Insured_Last_Name,""));
							resp = zoho.crm.createRecord("Notes",newNote);
						}
					}
					else
					{
						info "deal create error";
						info updateCRMPolicy;
						getTrailer.CRM_Deal_Status="Fail";
						getTrailer.CRM_Deal_ID="";
						getTrailer.Deal_Error_Msg=updateCRMPolicy.toString();
					}
					getTrailer.Migrated1=true;
				}
				else
				{
					info "not exist deal in CRM";
					// 					info "creatorID = " + creatorID;
					creatorQuoteMigratedStatusList.add("New Policy");
					fetTrailerQuoteCreator = TrailerQuote[Policy_Number == getTrailer.Policy_Number || Quote_ID == getTrailer.Reference_Number];
					if(fetTrailerQuoteCreator.count() > 0)
					{
						quoteID = fetTrailerQuoteCreator.ID;
						fetTrailerQuoteCreator.Migrated_Status=creatorQuoteMigratedStatusList;
						fetTrailerQuoteCreator.Policy_Number=getTrailer.Policy_Number;
						fetTrailerQuoteCreator.Quote_ID=getTrailer.Reference_Number;
						fetTrailerQuoteCreator.Insured_First_Name=getTrailer.Insured_First_Name;
						fetTrailerQuoteCreator.Insured_Last_Name=getTrailer.Insured_Last_Name;
						fetTrailerQuoteCreator.Email=getTrailer.Email;
						fetTrailerQuoteCreator.Phone_Number=formattedPhoneNumber;
						fetTrailerQuoteCreator.Name=getTrailer.Enter_the_friend_s_name;
						fetTrailerQuoteCreator.Carrier=carrierVal;
						fetTrailerQuoteCreator.Please_select_the_province_your_trailer_is_located_in=getTrailer.Please_select_the_province_your_trailer_is_located_in;
						fetTrailerQuoteCreator.Payment_Date=getTrailer.Payment_Date1;
						fetTrailerQuoteCreator.Bind_Date=getTrailer.Bind_Date;
						fetTrailerQuoteCreator.Last_Modified_Date=getTrailer.Last_Modified1;
						fetTrailerQuoteCreator.How_many_trailers_would_you_like_to_insure="1";
						fetTrailerQuoteCreator.Country=getTrailer.Country;
						fetTrailerQuoteCreator.City=getTrailer.City;
						fetTrailerQuoteCreator.Address=getTrailer.Address;
						fetTrailerQuoteCreator.Suite_Apt=getTrailer.Suite_Apt;
						fetTrailerQuoteCreator.Province=getTrailer.Province_State;
						fetTrailerQuoteCreator.Postal_code_ZIP_Code=getTrailer.Postal_Zip_Code;
						fetTrailerQuoteCreator.Agree_to_terms_and_conditions=true;
						fetTrailerQuoteCreator.Total_Premium_before_tax=getTrailer.Premium;
						fetTrailerQuoteCreator.Total_Tax=getTrailer.Tax;
						fetTrailerQuoteCreator.Total_Payable_Premium_after_tax=getTrailer.Total1;
						fetTrailerQuoteCreator.Where_Did_You_Find_Us=referraltype;
						fetTrailerQuoteCreator.Name=referralName;
						fetTrailerQuoteCreator.Fee=getTrailer.Fee;
						fetTrailerQuoteCreator.Tax_Precent=taxPercentage;
						fetTrailerQuoteCreator.Payment_Date=getTrailer.Payment_Date1;
						fetTrailerQuoteCreator.Sales_Date=if(fetTrailerQuoteCreator.Sales_Date != null,fetTrailerQuoteCreator.Sales_Date,fetTrailerQuoteCreator.Payment_Date);
						fetTrailerQuoteCreator.Organization_ID="RECPROTECT1";
						fetTrailerQuoteCreator.Tax_Province=getTrailer.Please_select_the_province_your_trailer_is_located_in;
						fetTrailerQuoteCreator.Created_Source="CREATOR";
						fetTrailerQuoteCreator.Policy_Status="ACTIVE";
						fetTrailerQuoteCreator.Policy_AutoRenewal_Status="Active";
						fetTrailerQuoteCreator.Quote_Policy_Type="New Business";
						fetTrailerQuoteCreator.Inception_Date=getTrailer.Effective_Date;
						fetTrailerQuoteCreator.Expiry_Date=getTrailer.End_Date;
						fetTrailerQuoteCreator.Trailer_Migration_ID=getTrailer.ID.tostring();
						fetTrailerQuoteCreator.Migrated=true;
						fetTrailerQuoteCreator.Quote_Status="Completed";
						fetTrailerQuoteCreator.Deal_Type=dealStatus;
						getTrailersubform = Trailer[TrailerQuote == fetTrailerQuoteCreator.ID];
						if(getTrailersubform.count() > 0)
						{
							subFormTrailerID = getTrailersubform.ID;
							// 							getTrailersubform.Select_Trailer_Type=getTrailer.Select_the_type_of_trailer;
							getTrailersubform.Select_Trailer_Type=SelectTrailerType;
							getTrailersubform.Trailer_Model_Year=getTrailer.Trailer_Model_Year;
							if(getTrailer.Are_you_the_original_owner_of_the_trailer == "No" || getTrailer.Are_you_the_original_owner_of_the_trailer == "NO")
							{
								getTrailersubform.Are_you_the_original_owner_of_the_trailer="No";
							}
							else if(getTrailer.Are_you_the_original_owner_of_the_trailer == "Yes" || getTrailer.Are_you_the_original_owner_of_the_trailer == "YES")
							{
								getTrailersubform.Are_you_the_original_owner_of_the_trailer="Yes";
							}
							else
							{
								getTrailersubform.Are_you_the_original_owner_of_the_trailer=getTrailerQuote.Are_there_any_additional_names_on_the_trailer_ownership;
							}
							getTrailersubform.Replacement_Cost=getTrailer.Replacement_cost;
							getTrailersubform.Actual_Cash_Value=getTrailer.Fair_Market_Value;
							getTrailersubform.Is_your_trailer_parked_within_500_feet_of_a_body_of_water=if(getTrailer.Is_your_trailer_parked_within_500_feet_of_a_body_of_water == true,"Yes","No");
							getTrailersubform.Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground=if(getTrailer.Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground == true,"Yes","No");
							//							getTrailersubform.Is_the_trailer_taken_into_the_USA_for_more_than_180_days=getTrailer.Is_the_trailer_taken_into_the_United_States_for_more_than_90_Days;
							getTrailersubform.Do_you_have_a_deck=if(getTrailer.Do_you_have_a_deck == true,"Yes","No");
							getTrailersubform.Do_you_have_a_screened_in_room_or_a_Florida_room=if(getTrailer.Do_you_have_an_additional_room_or_structure == true,"Yes","No");
							getTrailersubform.Would_you_like_to_insure_a_golf_cart=if(getTrailer.Would_you_like_to_Insure_a_Golf_Cart == true,"Yes","No");
							getTrailersubform.Number_of_Golf_Cart=getTrailer.Number_of_Golf_Carts;
							getTrailersubform.Value_of_Golf_Cart_1=getTrailer.Value_of_Golf_Cart_1;
							getTrailersubform.Value_of_Golf_Cart_2=getTrailer.Value_of_Golf_Cart_2;
							getTrailersubform.Premium_Per_Year=getTrailer.Premium;
							getTrailersubform.Overland_Water_Protection=getTrailer.Overland_Water_Protection1;
							getTrailersubform.Trailer_Coverage=getTrailer.Trailer_Coverage1;
							getTrailersubform.Coverage_Type=getTrailer.Coverage_Type;
							getTrailersubform.Detached_Private_Structure_Coverage_Sheds_etc=getTrailer.Detached_Private_Structure_Coverage_Sheds_etc1;
							getTrailersubform.Personal_Property_Coverage_T_V_Furniture_etc=getTrailer.Personal_Property_Coverage_T_V_Furniture_etc1;
							getTrailersubform.Premises_Liability=getTrailer.Premises_Liability;
							getTrailersubform.Trailer_Migration_ID=getTrailer.ID.tostring();
							getTrailersubform.VIN=getTrailer.ID_Serial1;
							getTrailersubform.Select_coverage_for_policy=prodPackage;
							getTrailersubform.Migrated=true;
							// 							info "deductible: " + getTrailer.Deductible;
							getTrailersubform.Deductible=deductible.toString();
							getTrailersubform.Do_you_live_in_the_trailer_full_time_all_year_round_as_a_principal_residence=if(getTrailer.Do_you_live_in_the_trailer_full_time_all_year_round_as_a_principal_residence == true,"Yes","No");
							getTrailersubform.Is_the_unit_used_strictly_for_pleasure_purposes_with_no_rental_or_business_use_of_any_kind=if(getTrailer.Is_the_unit_used_strictly_for_pleasure_purposes_with_no_rental_or_business_use_of_any_kind == true,"Yes","No");
							getTrailersubform.Heating_Type=getTrailer.Heating_type;
							getTrailersubform.Is_this_a_dual_purpose_trailer_toy_hauler_horse_trailer=if(getTrailer.Is_this_a_dual_purpose_trailer_toy_hauler_horse_trailer == true,"Yes","No");
							getTrailersubform.Are_there_any_modifications_to_the_trailer_ie_Addition_of_permanently_installed_solar_panels=if(getTrailer.Are_there_any_modifications_to_the_trailer_ie_Addition_of_permanently_installed_solar_panels == true,"Yes","No");
							getTrailersubform.Is_there_any_pre_existing_damage_on_the_trailer=if(getTrailer.Is_there_any_pre_existing_damage_on_the_trailer == true,"Yes","No");
							getTrailersubform.Describe_Damage=getTrailer.Describe_damage;
							getTrailersubform.Is_the_trailer_motorized_and_able_to_travel_on_its_own_without_a_towing_vehicle=if(getTrailer.Is_the_trailer_motorized_and_able_to_travel_on_its_own_without_a_towing_vehicle == true,"Yes","No");
							getTrailersubform.Trailer_Manufacturer=getTrailer.Trailer_Manufacturer;
							getTrailersubform.Trailer_Length=getTrailer.Trailer_Length;
							getTrailersubform.Trailer_Model=getTrailer.Trailer_Model;
							getTrailersubform.Trailer_Width=getTrailer.Trailer_Width;
							getTrailersubform.Trailer_Model_Age=getTrailer.Trailer_Model_Age1;
							getTrailersubform.Deck_Length=getTrailer.Deck_Length1;
							getTrailersubform.Deck_Width=getTrailer.Deck_Width1;
							//getTrailersubform.Effective_Date=getTrailer.Effective_Date;
							getTrailersubform.Is_there_any_heating_that_wasn_t_factory_installed_wood_stove_pellet_stove_etc=if(getTrailer.Is_there_any_heating_that_wasn_t_factory_installed_wood_stove_space_heater_etc == true,"Yes","No");
							getTrailersubform.Is_this_trailer_financed=if(IsThisBoatFinanced == true,"Yes","No");
							getTrailersubform.Screened_in_room_or_Florida_room_Length=if(getTrailer.Additional_outdoor_structure_length_1 != "",getTrailer.Additional_outdoor_structure_length_1.toNumber(),null);
							getTrailersubform.Screened_in_room_or_Florida_room_Width=if(getTrailer.Additional_outdoor_structure_width_1 != "",getTrailer.Additional_outdoor_structure_width_1.toNumber(),null);
							getTrailersubform.Lein_holder=SelectAFinancier;
							getTrailersubform.Address_line1=LossPayAddressLine1;
							getTrailersubform.Address_line2=LossPayAddressLine2;
							getTrailersubform.City1=LossPayCity;
							getTrailersubform.Province1=LossPayProvince;
							getTrailersubform.Postal_Code=LossPayPostalCode;
							getTrailersubform.Country=LossPayCountry;
							getTrailersubform.Select_a_Park1=selectPark;
							getTrailersubform.Park_Name=parkName;
							getTrailersubform.Address_Lines1=getTrailer.Address1;
							getTrailersubform.City=getTrailer.City1;
							getTrailersubform.Province=getTrailer.Province;
							getTrailersubform.PostalCode=getTrailer.Enter_your_postal_code_or_zip_code;
							getTrailersubform.Site_Number=getTrailer.Site_location_number;
						}
						else
						{
							// 						insert subform Trailer in TrailerQuote
							//Select_Trailer_Type=getTrailer.Select_the_type_of_trailer
							//Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground=getTrailer.Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground
							//Is_the_trailer_taken_into_the_USA_for_more_than_180_days=getTrailer.Is_the_trailer_taken_into_the_United_States_for_more_than_90_Days
							createTrailer = insert into Trailer
							[
								Added_User=zoho.loginuser
								TrailerQuote=fetTrailerQuoteCreator.ID
								Trailer_Model_Year=getTrailer.Trailer_Model_Year
								Are_you_the_original_owner_of_the_trailer=getTrailer.Are_you_the_original_owner_of_the_trailer
								Select_Trailer_Type=SelectTrailerType
								Replacement_Cost=getTrailer.Replacement_cost
								Actual_Cash_Value=getTrailer.Fair_Market_Value
								Is_your_trailer_parked_within_500_feet_of_a_body_of_water=if(getTrailer.Is_your_trailer_parked_within_500_feet_of_a_body_of_water == true,"Yes","No")
								Do_you_have_a_deck=if(getTrailer.Do_you_have_a_deck == true,"Yes","No")
								Do_you_have_a_screened_in_room_or_a_Florida_room=getTrailer.Do_you_have_an_additional_room_or_structure
								Would_you_like_to_insure_a_golf_cart=if(getTrailer.Would_you_like_to_Insure_a_Golf_Cart == true,"Yes","No")
								Number_of_Golf_Cart=getTrailer.Number_of_Golf_Carts
								Value_of_Golf_Cart_1=getTrailer.Value_of_Golf_Cart_1
								Value_of_Golf_Cart_2=getTrailer.Value_of_Golf_Cart_2
								Premium_Per_Year=getTrailer.Premium
								Overland_Water_Protection=getTrailer.Overland_Water_Protection1
								Trailer_Coverage=getTrailer.Trailer_Coverage1
								Coverage_Type=getTrailer.Coverage_Type
								Detached_Private_Structure_Coverage_Sheds_etc=getTrailer.Detached_Private_Structure_Coverage_Sheds_etc1
								Personal_Property_Coverage_T_V_Furniture_etc=getTrailer.Personal_Property_Coverage_T_V_Furniture_etc1
								Premises_Liability=getTrailer.Premises_Liability
								VIN=getTrailer.ID_Serial1
								Select_coverage_for_policy=prodPackage
								Deductible=getTrailer.Deductible
								Do_you_live_in_the_trailer_full_time_all_year_round_as_a_principal_residence=if(getTrailer.Do_you_live_in_the_trailer_full_time_all_year_round_as_a_principal_residence == true,"Yes","No")
								Is_the_unit_used_strictly_for_pleasure_purposes_with_no_rental_or_business_use_of_any_kind=if(getTrailer.Is_the_unit_used_strictly_for_pleasure_purposes_with_no_rental_or_business_use_of_any_kind == true,"Yes","No")
								Heating_Type=getTrailer.Heating_type
								Is_this_a_dual_purpose_trailer_toy_hauler_horse_trailer=if(getTrailer.Is_this_a_dual_purpose_trailer_toy_hauler_horse_trailer == true,"Yes","No")
								Are_there_any_modifications_to_the_trailer_ie_Addition_of_permanently_installed_solar_panels=if(getTrailer.Are_there_any_modifications_to_the_trailer_ie_Addition_of_permanently_installed_solar_panels == true,"Yes","No")
								Is_there_any_pre_existing_damage_on_the_trailer=if(getTrailer.Is_there_any_pre_existing_damage_on_the_trailer == true,"Yes","No")
								Describe_Damage=getTrailer.Describe_damage
								Is_the_trailer_motorized_and_able_to_travel_on_its_own_without_a_towing_vehicle=if(getTrailer.Is_the_trailer_motorized_and_able_to_travel_on_its_own_without_a_towing_vehicle == true,"Yes","No")
								Trailer_Manufacturer=getTrailer.Trailer_Manufacturer
								Trailer_Length=getTrailer.Trailer_Length
								Trailer_Model=getTrailer.Trailer_Model
								Trailer_Width=getTrailer.Trailer_Width
								Trailer_Model_Age=getTrailer.Trailer_Model_Age1
								Deck_Length=getTrailer.Deck_Length1
								Deck_Width=getTrailer.Deck_Width1
								Is_there_any_heating_that_wasn_t_factory_installed_wood_stove_pellet_stove_etc=if(getTrailer.Is_there_any_heating_that_wasn_t_factory_installed_wood_stove_space_heater_etc == true,"Yes","No")
								Trailer_Migration_ID=getTrailer.ID.tostring()
								Migrated=true
								Screened_in_room_or_Florida_room_Length=if(getTrailer.Additional_outdoor_structure_length_1 != "",getTrailer.Additional_outdoor_structure_length_1.toNumber(),null)
								Screened_in_room_or_Florida_room_Width=if(getTrailer.Additional_outdoor_structure_width_1 != "",getTrailer.Additional_outdoor_structure_width_1.toNumber(),null)
								Is_this_trailer_financed=if(IsThisBoatFinanced == true,"Yes","No")
								Lein_holder=SelectAFinancier
								Address_line1=LossPayAddressLine1
								Address_line2=LossPayAddressLine2
								City1=LossPayCity
								Province1=LossPayProvince
								Postal_Code=LossPayPostalCode
								Country=LossPayCountry
								Select_a_Park1=selectPark
								Park_Name=parkName
								Address_Lines1=getTrailer.Address1
								City=getTrailer.City1
								Province=getTrailer.Province
								PostalCode=getTrailer.Enter_your_postal_code_or_zip_code
								Site_Number=getTrailer.Site_location_number
								Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground=if(getTrailer.Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground == true,"Yes","No")
							];
							subFormTrailerID = getTrailersubform.ID;
						}
						// 								Trailer Migration Deal Module section
						getTrailer.Trailer_Quote_Creator_ID=fetTrailerQuoteCreator.ID;
						getTrailer.Quote_Record_Status="Success";
						// 						getTrailer.CRM_Deal_ID=crmPolicy.get(0).get("id");
						getTrailer.CRM_Deal_Status="Success";
						getTrailer.Migrated1=true;
						getTrailer.Deal_Migrated_Status=creatorQuoteMigratedStatusList;
						getTrailer.Trailer_subform_Creator_ID=subFormTrailerID.toString();
						getTrailer.Subform_Record_Status="Success";
					}
					else
					{
						// 				create policy in Creator
						createCreatorPolicy = insert into TrailerQuote
						[
							Added_User=zoho.loginuser
							Migrated_Status=creatorQuoteMigratedStatusList
							Policy_Number=getTrailer.Policy_Number
							Quote_ID=getTrailer.Reference_Number
							Insured_First_Name=getTrailer.Insured_First_Name
							Insured_Last_Name=getTrailer.Insured_Last_Name
							Email=getTrailer.Email
							Phone_Number=formattedPhoneNumber
							Name=getTrailer.Enter_the_friend_s_name
							Carrier=carrierVal
							Please_select_the_province_your_trailer_is_located_in=getTrailer.Please_select_the_province_your_trailer_is_located_in
							Payment_Date=getTrailer.Payment_Date1
							Bind_Date=getTrailer.Bind_Date
							Last_Modified_Date=getTrailer.Last_Modified1
							How_many_trailers_would_you_like_to_insure="1"
							Country=getTrailer.Country
							City=getTrailer.City
							Address=getTrailer.Address
							Suite_Apt=getTrailer.Suite_Apt
							Province=getTrailer.Province_State
							Postal_code_ZIP_Code=getTrailer.Postal_Zip_Code
							Agree_to_terms_and_conditions=true
							Total_Premium_before_tax=getTrailer.Premium
							Total_Tax=getTrailer.Tax
							Total_Payable_Premium_after_tax=getTrailer.Total1
							Where_Did_You_Find_Us=referraltype
							Name=referralName
							Fee=getTrailer.Fee
							Tax_Precent=taxPercentage
							Payment_Date=getTrailer.Payment_Date1
							Sales_Date=getTrailer.Payment_Date1
							Organization_ID="RECPROTECT1"
							Tax_Province=getTrailer.Please_select_the_province_your_trailer_is_located_in
							Created_Source="CREATOR"
							Policy_Status="ACTIVE"
							Policy_AutoRenewal_Status="Active"
							Quote_Policy_Type="New Business"
							Inception_Date=getTrailer.Effective_Date
							Expiry_Date=getTrailer.End_Date
							Trailer_Migration_ID=getTrailer.ID.tostring()
							Migrated=true
							Quote_Status="Completed"
							Deal_Type=dealStatus
						];
						quoteID = createCreatorPolicy;
						// 					Select_Trailer_Type=getTrailer.Select_the_type_of_trailer
						//Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground=getTrailer.Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground
						//Is_the_trailer_taken_into_the_USA_for_more_than_180_days=getTrailer.Is_the_trailer_taken_into_the_United_States_for_more_than_90_Days
						addTrailer = insert into Trailer
						[
							Added_User=zoho.loginuser
							TrailerQuote=createCreatorPolicy
							Trailer_Model_Year=getTrailer.Trailer_Model_Year
							Select_Trailer_Type=SelectTrailerType
							Are_you_the_original_owner_of_the_trailer=getTrailer.Are_you_the_original_owner_of_the_trailer
							Replacement_Cost=getTrailer.Replacement_cost
							Actual_Cash_Value=getTrailer.Fair_Market_Value
							Screened_in_room_or_Florida_room_Length=if(getTrailer.Additional_outdoor_structure_length_1 != "",getTrailer.Additional_outdoor_structure_length_1.toNumber(),null)
							Screened_in_room_or_Florida_room_Width=if(getTrailer.Additional_outdoor_structure_width_1 != "" && getTrailer.Additional_outdoor_structure_width_1 != null,getTrailer.Additional_outdoor_structure_width_1.toNumber(),null)
							Do_you_have_a_deck=if(getTrailer.Do_you_have_a_deck == true,"Yes","No")
							Do_you_have_a_screened_in_room_or_a_Florida_room=if(getTrailer.Do_you_have_an_additional_room_or_structure == true,"Yes","No")
							Would_you_like_to_insure_a_golf_cart=if(getTrailer.Would_you_like_to_Insure_a_Golf_Cart == true,"Yes","No")
							Number_of_Golf_Cart=getTrailer.Number_of_Golf_Carts
							Value_of_Golf_Cart_1=getTrailer.Value_of_Golf_Cart_1
							Value_of_Golf_Cart_2=getTrailer.Value_of_Golf_Cart_2
							Premium_Per_Year=getTrailer.Premium
							Overland_Water_Protection=getTrailer.Overland_Water_Protection1
							Trailer_Coverage=getTrailer.Trailer_Coverage1
							Coverage_Type=getTrailer.Coverage_Type
							Detached_Private_Structure_Coverage_Sheds_etc=getTrailer.Detached_Private_Structure_Coverage_Sheds_etc1
							Personal_Property_Coverage_T_V_Furniture_etc=getTrailer.Personal_Property_Coverage_T_V_Furniture_etc1
							Premises_Liability=getTrailer.Premises_Liability
							VIN=getTrailer.ID_Serial1
							Select_coverage_for_policy=prodPackage
							Deductible=getTrailer.Deductible
							Do_you_live_in_the_trailer_full_time_all_year_round_as_a_principal_residence=if(getTrailer.Do_you_live_in_the_trailer_full_time_all_year_round_as_a_principal_residence == true,"Yes","No")
							Is_your_trailer_parked_within_500_feet_of_a_body_of_water=if(getTrailer.Is_your_trailer_parked_within_500_feet_of_a_body_of_water == true,"Yes","No")
							Is_the_unit_used_strictly_for_pleasure_purposes_with_no_rental_or_business_use_of_any_kind=if(getTrailer.Is_the_unit_used_strictly_for_pleasure_purposes_with_no_rental_or_business_use_of_any_kind == true,"Yes","No")
							Heating_Type=getTrailer.Heating_type
							Is_this_a_dual_purpose_trailer_toy_hauler_horse_trailer=if(getTrailer.Is_this_a_dual_purpose_trailer_toy_hauler_horse_trailer == true,"Yes","No")
							Are_there_any_modifications_to_the_trailer_ie_Addition_of_permanently_installed_solar_panels=if(getTrailer.Are_there_any_modifications_to_the_trailer_ie_Addition_of_permanently_installed_solar_panels == true,"Yes","No")
							Is_there_any_pre_existing_damage_on_the_trailer=if(getTrailer.Is_there_any_pre_existing_damage_on_the_trailer == true,"Yes","No")
							Describe_Damage=getTrailer.Describe_damage
							Is_the_trailer_motorized_and_able_to_travel_on_its_own_without_a_towing_vehicle=if(getTrailer.Is_the_trailer_motorized_and_able_to_travel_on_its_own_without_a_towing_vehicle == true,"Yes","No")
							Trailer_Manufacturer=getTrailer.Trailer_Manufacturer
							Trailer_Length=getTrailer.Trailer_Length
							Trailer_Model=getTrailer.Trailer_Model
							Trailer_Width=getTrailer.Trailer_Width
							Trailer_Model_Age=getTrailer.Trailer_Model_Age1
							Deck_Length=getTrailer.Deck_Length1
							Deck_Width=getTrailer.Deck_Width1
							Is_there_any_heating_that_wasn_t_factory_installed_wood_stove_pellet_stove_etc=if(getTrailer.Is_there_any_heating_that_wasn_t_factory_installed_wood_stove_space_heater_etc == true,"Yes","No")
							Trailer_Migration_ID=getTrailer.ID.tostring()
							Migrated=true
							Is_this_trailer_financed=if(IsThisBoatFinanced == true,"Yes","No")
							Lein_holder=SelectAFinancier
							Address_line1=LossPayAddressLine1
							Address_line2=LossPayAddressLine2
							City1=LossPayCity
							Province1=LossPayProvince
							Postal_Code=LossPayPostalCode
							Country=LossPayCountry
							Select_a_Park1=selectPark
							Park_Name=parkName
							Address_Lines1=getTrailer.Address1
							City=getTrailer.City1
							Province=getTrailer.Province
							PostalCode=getTrailer.Enter_your_postal_code_or_zip_code
							Site_Number=getTrailer.Site_location_number
							Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground=if(getTrailer.Is_the_trailer_permanently_or_seasonally_parked_at_an_accredited_campground == true,"Yes","No")
						];
						if(Trailer[ID == addTrailer].count() > 0)
						{
							getTrailer.Subform_Record_Status="Success";
							getTrailer.Deal_Migrated_Status=creatorQuoteMigratedStatusList;
							getTrailer.Trailer_subform_Creator_ID=addTrailer;
						}
						else
						{
							getTrailer.Subform_Record_Status="Fail";
						}
					}
					getTrailer.Migrated1=true;
					getTrailer.Deal_Migrated_Status=creatorQuoteMigratedStatusList;
					policyMap.put("Migrated_Status",creatorQuoteMigratedStatusList);
					policyMap.put("Migrated",true);
					// 				create policy in CRM with Trailer layout
					policyMap.put("Creator_ID",quoteID.toString());
					createTrailerPolicy = zoho.crm.createRecord("Deals",policyMap);
					if(createTrailerPolicy.containKey("id") == true && createTrailerPolicy.get("id") != null)
					{
						fetTrailerQuote = TrailerQuote[ID == quoteID.toLong()];
						if(fetTrailerQuote.count() > 0)
						{
							fetTrailerQuote.Zoho_Crm_ID=createTrailerPolicy.get("id");
							fetTrailerQuote.Customer_ID=creatorID;
							getTrailer.Quote_Record_Status="Success";
							getTrailer.Trailer_Quote_Creator_ID=createCreatorPolicy;
							getTrailer.Creator_Error_Msg1="";
						}
						else
						{
							getTrailer.Quote_Record_Status="Fail";
							getTrailer.Creator_Error_Msg1=createCreatorPolicy.toString();
						}
						getTrailer.CRM_Deal_ID=createTrailerPolicy.get("id");
						getTrailer.CRM_Deal_Status="Success";
						getTrailer.Deal_Error_Msg="";
						if((getTrailer.Additional_Insured_First_Name != "" && getTrailer.Additional_Insured_First_Name != null) || (getTrailer.Additional_Insured_Last_Name != "" && getTrailer.Additional_Insured_Last_Name != null))
						{
							newNote = Map();
							newNote.put("se_module","Deals");
							newNote.put("Parent_Id",createTrailerPolicy.get("id").toString());
							newNote.put("Note_Title","Additional Insured Name");
							newNote.put("Note_Content","Additional Insured available for this policy." + ifnull(getTrailer.Additional_Insured_First_Name,"") + " " + ifnull(getTrailer.Additional_Insured_Last_Name,""));
							resp = zoho.crm.createRecord("Notes",newNote);
						}
					}
					else
					{
						info "create deal error";
						info createTrailerPolicy;
						getTrailer.CRM_Deal_Status="Fail";
						getTrailer.CRM_Deal_ID="";
						getTrailer.Deal_Error_Msg=createTrailerPolicy.toString();
					}
				}
				if(getTrailer.Trailer_subform_Creator_ID != "")
				{
					getTrailersub = Trailer[ID == getTrailer.Trailer_subform_Creator_ID.toLong()];
					getTrailersub.Name_of_Financier=NameofFinancier;
				}
				if(getTrailer.Additional_Insured_First_Name != "" || getTrailer.Additional_Insured_Last_Name != "")
				{
					if(getTrailer.count() > 0 && quoteID != null)
					{
						getTrailerQuoteAdditional = TrailerQuote[ID == quoteID.tolong()];
						if(getTrailerQuoteAdditional.count() > 0)
						{
							if(getTrailerQuoteAdditional.Additional_Names == null)
							{
								CustomerEmail = getTrailer.Email;
								n = 50;
								counter = leftpad("1",n).replaceAll(" ","1,").toList();
								a = 1;
								li = List();
								for each index i in counter
								{
									li.add(a);
									a = a + 1;
								}
								li = li.toList();
								Emailcount = 0;
								info li;
								for each  recAdditional in li
								{
									customer = CustomerEmail.getprefix("@") + "+" + recAdditional + "@" + CustomerEmail.getsuffix("@");
									getcustomerData = Customer[Email == customer];
									if(getcustomerData.count() > 0)
									{
										// 			info "if";
									}
									else
									{
										// 			info "else";
										fetCustomerData = CustomerEmail.getprefix("@") + "+" + recAdditional + "@" + CustomerEmail.getsuffix("@");
										break;
									}
									Emailcount = Emailcount + 1;
								}
								addTrailerAdditional = insert into Additional_Names_Trailer
								[
									Added_User=zoho.loginuser
									First_Name=getTrailer.Additional_Insured_First_Name
									Last_Name=getTrailer.Additional_Insured_Last_Name
									Email=fetCustomerData
									Trailer_Quotation=quoteID
								];
								customerResp = insert into Customer
								[
									Email=fetCustomerData
									First_Name=getTrailer.Additional_Insured_First_Name
									Last_Name=getTrailer.Additional_Insured_Last_Name
									Migrated_Additional_Insurer=true
									Migrated=true
									Quote_Type="Trailer"
									Customer_Type="Contact"
									Added_User=zoho.loginuser
								];
								thisapp.Server_Side.Latest_Customer_Sync_Create(customerResp);
								fetchAdditionalName = Additional_Names_Trailer[ID == addTrailerAdditional.toLong()];
								fetchAdditionalName.Customer_ID=customerResp;
								additionaldataMap = Map();
								additionaldataMap.put("First_Name",getTrailer.Additional_Insured_First_Name);
								additionaldataMap.put("Last_Name",getTrailer.Additional_Insured_Last_Name);
								additionaldataMap.put("Email",fetCustomerData);
								additionaldataMap.put("Phone","0123456789");
								additionaldataMap.put("Status1","Active");
								additionaldataMap.put("Mailing_Address","No Email");
								additionaldataMap.put("Zoho_Creator_ID",customerResp.toString());
								additionaldataMap.put("Insurer_with_Invalid_Email","Yes");
								fetchLayout = Layout[Layout_Name == "Client Layout"];
								layoutid = Map();
								layoutid.put("id",fetchLayout.Layout_ID.tolong());
								additionaldataMap.put("Layout",layoutid);
								additionaldataMap.put("Migrated",true);
								additionaldataMap.put("Quote_Type","Trailer");
								//-------------------Create a Customer----------
								createAdditionalContact = zoho.crm.createRecord("Contacts",additionaldataMap);
								info "CRM COntact--->" + createAdditionalContact;
								AdditonalupdateMap = Map();
								updateMapList = list();
								updatesubformMap = Map();
								updatesubformMap.put("Additional_Insured",createAdditionalContact.get("id").tolong());
								updatesubformMap.put("Type","Additional Insured 1");
								updateMapList.add(updatesubformMap);
								AdditonalupdateMap.put("Subform_1",updateMapList);
								fetchCustoer = Customer[ID == customerResp];
								fetchCustoer.Zoho_Crm_ID=createAdditionalContact.get("id");
								fetchCustoer.Migrated_to_Server=true;
								AdditonalupdateMap.put("Additional_Insured",createAdditionalContact.get("id"));
								updateDeal = zoho.crm.updateRecord("Deals",getTrailerQuoteAdditional.Zoho_Crm_ID.toLong(),AdditonalupdateMap);
								getTrailerQuoteAdditional.Are_there_any_additional_names_on_the_trailer_ownership="Yes";
							}
							else
							{
								info "No-->" + getTrailer.ID;
							}
						}
					}
				}
				getTrailerQuoterec = TrailerQuote[ID == quoteID.toLong()];
				if(getTrailerQuoterec.Quote_Record_ID_Server != null && getTrailerQuoterec.Quote_Record_ID_Server != "")
				{
					serverStatus = "UPDATE";
				}
				else
				{
					serverStatus = "CREATE";
				}
				thisapp.Server_Side.Latest_Trailer_Quote_Sync_Create_and_Update(quoteID.toLong(),serverStatus);
				getTrailerQuoterec.Migrated_to_Server=true;
				// 				if(getTrailer.Trailer_Quote_Creator_ID != "")
				// 				{
				// 					getTrailerCust = TrailerQuote[ID == getTrailer.Trailer_Quote_Creator_ID.toLong()];
				// 					getTrailerCust.Customer_ID=creatorID;
				// 				}
				// 				}
				// 				else
				// 				{
				// 					creatorQuoteMigratedStatusList.add("Exception");
				// 					getTrailer.Deal_Migrated_Status=creatorQuoteMigratedStatusList;
				// 					info "invalid policy";
				// 					// 				Exception case
				// 				}
			}
			else
			{
				info "exception";
				creatorContactMigratedStatusList.add("Exception");
				getTrailer.Contact_Migrated_Status=creatorContactMigratedStatusList;
				creatorQuoteMigratedStatusList.add("Exception");
				getTrailer.Deal_Migrated_Status=creatorQuoteMigratedStatusList;
			}
		}
		else
		{
			creatorContactMigratedStatusList.add("Exception");
			getTrailer.Contact_Migrated_Status=creatorContactMigratedStatusList;
			creatorQuoteMigratedStatusList.add("Exception");
			getTrailer.Deal_Migrated_Status=creatorQuoteMigratedStatusList;
		}
		// 	}
	}
	info "c = " + c;
	// 		}
}