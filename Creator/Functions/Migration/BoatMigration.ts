void Migration.BoatMigration()
{
	c = 0;
	getBoatRec = Boat_Migration[Migrated == false && Imported_Month == "Policy Changes - Mar" && Imported_Year == "2024"];
	info getBoatRec.count();
	// 	getBoatRec = Boat_Migration[ID == 4564627000000383647];
	// 	getBoatRec = Boat_Migration[CRM_Deal_Status == "Fail"] range from 0 to 50;
	for each  getBoat in getBoatRec
	{
		c = c + 1;
		info getBoat.ID;
		contactMap = Map();
		policyMap = Map();
		ContactlayoutMap = Map();
		boatQuoteID = "";
		ContactlayoutMap.put("id",5778486000007674550);
		contactMap.put("Layout",ContactlayoutMap);
		if(getBoat.Phone != null && getBoat.Phone != "")
		{
			formattedPhoneNumber = getBoat.Phone.replaceAll("[/\-\(\)_@#\^!\$%\&\*:;`~ ]","");
			formattedPhoneNumber = "+1" + formattedPhoneNumber;
		}
		else
		{
			formattedPhoneNumber = "";
		}
		if(getBoat.Product_Package == "Replacement Value")
		{
			prodPackage = "Replacement Value Coverage";
		}
		else if(getBoat.Product_Package == "Current Market Value")
		{
			prodPackage = "Current Market Value Coverage";
		}
		selectTypeofWaterCraft = null;
		if(getBoat.Select_the_type_of_watercraft1 != null && getBoat.Select_the_type_of_watercraft1 != "")
		{
			if(getBoat.Select_the_type_of_watercraft1 == "Runabout")
			{
				selectTypeofWaterCraft = "Runabout/Deck/Bowrider";
			}
			else if(getBoat.Select_the_type_of_watercraft1 == "Wake Board Boat")
			{
				selectTypeofWaterCraft = "Ski/Wake Boat";
			}
			else if(getBoat.Select_the_type_of_watercraft1 == "JetSki")
			{
				selectTypeofWaterCraft = "SeaDoo/JetSki";
			}
			else
			{
				selectTypeofWaterCraft = getBoat.Select_the_type_of_watercraft1;
			}
		}
		else
		{
			selectTypeofWaterCraft = null;
		}
		// 		LienHolders
		SelectAFinancier = null;
		NameofFinancier = "";
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
		// 		Tax Percentage
		taxPercentage = 0.00;
		if(getBoat.Please_select_the_province_your_boat_is_used_in == "Alberta")
		{
			taxPercentage = 0.00;
		}
		else if(getBoat.Please_select_the_province_your_boat_is_used_in == "British Columbia")
		{
			taxPercentage = 0.00;
		}
		else if(getBoat.Please_select_the_province_your_boat_is_used_in == "Saskatchewan")
		{
			taxPercentage = 6.00;
		}
		else if(getBoat.Please_select_the_province_your_boat_is_used_in == "Ontario")
		{
			taxPercentage = 8.00;
		}
		else
		{
			taxPercentage = 0.00;
		}
		// 		
		// 		info "NameofFinancier......................................." + NmeofFinancier;
		// 		
		// 		Assigned user
		if(getBoat.Assigned_Name1 != "" && getBoat.Assigned_Name1 != "Unassigned" && getBoat.Assigned_Email != "")
		{
			searchRec = zoho.crm.searchRecords("users","(full_name:equals:" + getBoat.Assigned_Name1 + ")",1,1,Map(),"cl_workdrive");
			// 			info "searchRec " + searchRec.size();
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
		policyMap.put("Postal_code_ZIP_Code_of_Mailing_address",getBoat.Postal_Zip_Code);
		// 		
		dealStatus = if(getBoat.Policy_Number != null && getBoat.Policy_Number != "","Policy",if(getBoat.Reference_Number != null && getBoat.Reference_Number != "","Quote",""));
		contactMap.put("First_Name",ifnull(getBoat.Insured_First_Name,"N/A"));
		contactMap.put("Last_Name",ifnull(getBoat.Insured_Last_Name,"N/A"));
		contactMap.put("Middel_Name",ifnull(getBoat.Middle_Name,"N/A"));
		contactMap.put("Email",ifnull(getBoat.Email1,""));
		contactMap.put("Phone",formattedPhoneNumber);
		contactMap.put("Mailing_Country",getBoat.Country);
		contactMap.put("Mailing_Address",getBoat.Address);
		contactMap.put("Mailing_Street",getBoat.Suite_Apt);
		contactMap.put("Mailing_City",getBoat.City);
		contactMap.put("Mailing_State",getBoat.Province_State);
		contactMap.put("Mailing_Zip",getBoat.Postal_Zip_Code);
		contactMap.put("Date_of_Birth",getBoat.Date_of_Birth);
		if(getBoat.Were_you_referred_by_a_friend_or_business1 == true)
		{
			if(getBoat.Enter_the_friend_s_name == "Google")
			{
				referraltype = "Google";
				referralName = "";
			}
			else
			{
				referraltype = "Friend or Family";
				referralName = getBoat.Enter_the_friend_s_name;
			}
		}
		contactMap.put("Lead_Source",referraltype);
		contactMap.put("Referral_Type",referraltype);
		contactMap.put("Referral_Friend",referralName);
		contactMap.put("Status1","Active");
		creatorContactMigratedStatusList = List();
		creatorContactMigratedStatusList.clear();
		creatorQuoteMigratedStatusList = List();
		creatorQuoteMigratedStatusList.clear();
		customerUpdate = null;
		creatorID = null;
		slaveCreatorID = null;
		if(getBoat.count() > 0)
		{
			if(getBoat.Email1 != null && getBoat.Email1 != "")
			{
				emailUnique = zoho.crm.searchRecords("Contacts","(Email:equals:" + getBoat.Email1 + ")");
				// 						info "emailUnique " + emailUnique.size();
				if(emailUnique.size() > 0)
				{
					fetCreatorContact = Customer[Email == getBoat.Email1];
					if(fetCreatorContact.count() > 0)
					{
						// 								update customer in creator
						creatorContactMigratedStatusList.add("Updated Contact");
						creatorID = fetCreatorContact.ID;
						fetCreatorContact.Email=getBoat.Email1;
						fetCreatorContact.First_Name=getBoat.Insured_First_Name;
						fetCreatorContact.Last_Name=getBoat.Insured_Last_Name;
						fetCreatorContact.City=getBoat.City;
						fetCreatorContact.Country=getBoat.Country;
						fetCreatorContact.Province=getBoat.Province_State;
						fetCreatorContact.Postal_Code=getBoat.Postal_Zip_Code;
						fetCreatorContact.Phone_Number=formattedPhoneNumber;
						fetCreatorContact.Address_Line1=getBoat.Address;
						fetCreatorContact.Address_Line2=getBoat.Suite_Apt;
						fetCreatorContact.DOB=getBoat.Date_of_Birth;
						fetCreatorContact.Customer_Type="Contact";
						fetCreatorContact.Where_Did_You_Find_Us=referraltype;
						fetCreatorContact.Name=referralName;
						// 							Migration Section
						fetCreatorContact.Migrated=true;
						fetCreatorContact.Migrated_Status=creatorContactMigratedStatusList;
						fetCreatorContact.Boat_Migration_ID=getBoat.ID.tostring();
						fetCreatorContact.Contact_Type="Master";
						// 							Developer Section
						fetCreatorContact.Zoho_Crm_ID=emailUnique.get(0).get("id");
						// 							fetCreatorContact.Customer_Type1="Contact";
						// 							Update Boat Migration Contact Module Section
						getBoat.Contact_Type="Master";
						getBoat.Valid_emailID="YES";
						getBoat.Creator_Status="Success";
						getBoat.Customer_Creator_ID=fetCreatorContact.ID;
						getBoat.CRM_Contact_ID=emailUnique.get(0).get("id").toString();
						getBoat.CRM_Contact_Status="Success";
						getBoat.Contact_Migrated_Status=creatorContactMigratedStatusList;
						// 							// 							customerUpdate = fetCreatorContact.ID;
					}
					else
					{
						creatorContactMigratedStatusList.add("New Contact");
						createMasterContact = insert into Customer
						[
							Email=getBoat.Email1
							First_Name=getBoat.Insured_First_Name
							Last_Name=getBoat.Insured_Last_Name
							Added_User=zoho.loginuser
							City=getBoat.City
							Country=getBoat.Country
							Province=getBoat.Province_State
							Postal_Code=getBoat.Postal_Zip_Code
							Phone_Number=formattedPhoneNumber
							Address_Line1=getBoat.Address
							Address_Line2=getBoat.Suite_Apt
							DOB=getBoat.Date_of_Birth
							Customer_Type="Contact"
							Where_Did_You_Find_Us=referraltype
							Name=referralName
							Migrated=true
							Migrated_Status=creatorContactMigratedStatusList
							Boat_Migration_ID=getBoat.ID.tostring()
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
							getBoat.Contact_Type="Master";
							getBoat.Valid_emailID="YES";
							getBoat.Creator_Status="Success";
							getBoat.Customer_Creator_ID=createMasterContact.toString();
							getBoat.Creator_Error_Msg="";
							getBoat.CRM_Contact_ID=emailUnique.get(0).get("id").toString();
							getBoat.CRM_Contact_Status="Success";
						}
						else
						{
							getBoat.Creator_Status="Fail";
							getBoat.Creator_Error_Msg=createMasterContact.toString();
						}
						getBoat.Contact_Migrated_Status=creatorContactMigratedStatusList;
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
					if(getBoat.Phone != null && getBoat.Phone != "")
					{
						// 								info "Phone " + formattedPhoneNumber;
						updatecontactMap.put("Phone",formattedPhoneNumber);
					}
					else
					{
						updatecontactMap.put("Phone",ifnull(emailUnique.get(0).get("Phone"),""));
					}
					//Mailing Country
					if(getBoat.Country != null && getBoat.Country != "")
					{
						updatecontactMap.put("Mailing_Country",getBoat.Country);
					}
					else
					{
						updatecontactMap.put("Mailing_Country",ifnull(emailUnique.get(0).get("Mailing_Country"),""));
					}
					//Mailing Address
					if(getBoat.Address != null && getBoat.Address != "")
					{
						updatecontactMap.put("Mailing_Address",getBoat.Address);
					}
					else
					{
						updatecontactMap.put("Mailing_Address",ifnull(emailUnique.get(0).get("Mailing_Address"),""));
					}
					//Mailing Street
					if(getBoat.Suite_Apt != null && getBoat.Suite_Apt != "")
					{
						// 								info "Suite_Apt  " + getBoat.Suite_Apt;
						updatecontactMap.put("Mailing_Street",getBoat.Suite_Apt);
					}
					else
					{
						updatecontactMap.put("Mailing_Street",ifnull(emailUnique.get(0).get("Mailing_Street"),""));
					}
					//Mailing City
					if(getBoat.City != null && getBoat.City != "")
					{
						updatecontactMap.put("Mailing_City",getBoat.City);
					}
					else
					{
						updatecontactMap.put("Mailing_City",ifnull(emailUnique.get(0).get("Mailing_City"),""));
					}
					//Mailing State
					if(getBoat.Province_State != null && getBoat.Province_State != "")
					{
						updatecontactMap.put("Mailing_State",getBoat.Province_State);
					}
					else
					{
						updatecontactMap.put("Mailing_State",ifnull(emailUnique.get(0).get("Mailing_State"),""));
					}
					//Mailing Zip
					if(getBoat.Postal_Zip_Code != null && getBoat.Postal_Zip_Code != "")
					{
						updatecontactMap.put("Mailing_Zip",getBoat.Postal_Zip_Code);
					}
					else
					{
						updatecontactMap.put("Mailing_Zip",ifnull(emailUnique.get(0).get("Mailing_Zip"),""));
					}
					//Date of Birth
					if(getBoat.Date_of_Birth != null)
					{
						updatecontactMap.put("Date_of_Birth",getBoat.Date_of_Birth);
					}
					else
					{
						updatecontactMap.put("Date_of_Birth",ifnull(emailUnique.get(0).get("Date_of_Birth"),""));
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
						getBoat.CRM_Contact_ID=updateCRMContact.get("id").toString();
						getBoat.CRM_Contact_Status="Success";
						getBoat.Contact_Error_Msg="";
					}
					else
					{
						info "update contact error";
						info updateCRMContact;
						getBoat.CRM_Contact_ID="";
						getBoat.CRM_Contact_Status="Fail";
						getBoat.Contact_Error_Msg=updateCRMContact.toString();
					}
				}
				else
				{
					// 					Create Contact in Creator
					creatorContactMigratedStatusList.add("New Contact");
					createContact = insert into Customer
					[
						Email=getBoat.Email1
						First_Name=getBoat.Insured_First_Name
						Last_Name=getBoat.Insured_Last_Name
						Added_User=zoho.loginuser
						City=getBoat.City
						Country=getBoat.Country
						Province=getBoat.Province_State
						Postal_Code=getBoat.Postal_Zip_Code
						Phone_Number=formattedPhoneNumber
						Address_Line1=getBoat.Address
						Address_Line2=getBoat.Suite_Apt
						DOB=getBoat.Date_of_Birth
						Customer_Type="Contact"
						Where_Did_You_Find_Us=referraltype
						Name=referralName
						Migrated=true
						Migrated_Status=creatorContactMigratedStatusList
						Boat_Migration_ID=getBoat.ID.tostring()
						Contact_Type="Master"
					];
					//Customer_Type1="Contact"
					creatorID = createContact;
					getBoat.Contact_Type="Master";
					getBoat.Valid_emailID="NO";
					// 							customerUpdate = createContact;
					createContactCreator = Customer[ID == createContact];
					if(createContactCreator.count() > 0)
					{
						getBoat.Creator_Status="Success";
						getBoat.Customer_Creator_ID=createContact;
						getBoat.Creator_Error_Msg="";
					}
					else
					{
						getBoat.Creator_Status="Fail";
						getBoat.Creator_Error_Msg=createContact.toString();
					}
					getBoat.Contact_Migrated_Status=creatorContactMigratedStatusList;
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
						getBoat.CRM_Contact_ID=createCRMContact.get("id").toString();
						getBoat.CRM_Contact_Status="Success";
						createContactCreator.Zoho_Crm_ID=createCRMContact.get("id");
						getBoat.Contact_Error_Msg="";
					}
					else
					{
						info "create contact error";
						info createCRMContact;
						getBoat.CRM_Contact_Status="Fail";
						getBoat.Contact_Error_Msg=createCRMContact.toString();
						getBoat.CRM_Contact_ID="";
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
				layoutMap.put("id",5778486000007672001);
				policyMap.put("Layout",layoutMap);
				policyMap.put("Imported_Month",getBoat.Imported_Month);
				policyMap.put("Imported_Year",getBoat.Imported_Year);
				policyMap.put("Deal_Status",dealStatus);
				policyMap.put("Stage","Won");
				// 				policyMap.put("Cleanup",true);
				policyMap.put("Agree_to_terms_and_conditions",true);
				policyMap.put("How_many_boats_would_you_like_to_insure","1");
				// 				policyMap.put("Please_select_the_province",getBoat.Please_select_the_province_your_boat_is_used_in);
				policyMap.put("Contact_Name",getBoat.CRM_Contact_ID);
				policyMap.put("Lead_Source",referraltype);
				policyMap.put("Product_Name",getBoat.Product_Name);
				policyMap.put("Type","Boat");
				policyMap.put("Carrier","Four Points Insurance");
				policyMap.put("Policy_AutoRenewal_Status","Active");
				policyMap.put("Migration_Data_on",getBoat.Imported_Month + "-" + getBoat.Imported_Year);
				// 				policyMap.put("Policy_Number",getBoat.Policy_Number);
				// 				policyMap.put("Quote_ID",getBoat.Reference_Number);
				policyMap.put("Phone",formattedPhoneNumber);
				policyMap.put("Additional_Insured_1",getBoat.Additional_Insured_First_Name);
				policyMap.put("Additional_Insured_2",getBoat.Additional_Insured_Last_Name);
				policyMap.put("Payment_Date",if(getBoat.Payment_Date != null,getBoat.Payment_Date.toTime("yyyy-MM-dd'T'HH:mm:ss").toString("yyyy-MM-dd'T'HH:mm:ss"),null));
				policyMap.put("Sales_Date_1",if(getBoat.Payment_Date != null,getBoat.Payment_Date.toTime("yyyy-MM-dd'T'HH:mm:ss").toString("yyyy-MM-dd'T'HH:mm:ss"),null));
				// 				policyMap.put("Bind_Date",if(getBoat.Bind_Date != null,getBoat.Bind_Date.toTime("yyyy-MM-dd'T'HH:mm:ss").toString("yyyy-MM-dd'T'HH:mm:ss"),null));
				policyMap.put("Inception_Date",getBoat.Effective_Date);
				// 				policyMap.put("End_Date",getBoat.End_Date);
				policyMap.put("Expiry_Date",getBoat.End_Date);
				policyMap.put("Premium",getBoat.Premium);
				policyMap.put("Fee",getBoat.Fee);
				policyMap.put("Total",getBoat.Total);
				policyMap.put("Tax",getBoat.Tax);
				policyMap.put("Last_Modified",if(getBoat.Last_Modified != null,getBoat.Last_Modified.toTime("yyyy-MM-dd'T'HH:mm:ss").toString("yyyy-MM-dd'T'HH:mm:ss"),null));
				if(getBoat.Please_select_the_province_your_boat_is_used_in == "Alberta")
				{
					policyMap.put("Province","AB");
				}
				else if(getBoat.Please_select_the_province_your_boat_is_used_in == "British Columbia")
				{
					policyMap.put("Province","BC");
				}
				else if(getBoat.Please_select_the_province_your_boat_is_used_in == "Ontario")
				{
					policyMap.put("Province","ON");
				}
				else if(getBoat.Please_select_the_province_your_boat_is_used_in == "Saskatchewan")
				{
					policyMap.put("Province","SK");
				}
				else
				{
					policyMap.put("Province",null);
				}
				// 				policyMap.put("Please_select_the_province_your_boat_is_used_in1",getBoat.Please_select_the_province_your_boat_is_used_in);
				// 				policyMap.put("Were_you_referred_by_a_friend_or_business",getBoat.Were_you_referred_by_a_friend_or_business1);
				// 				policyMap.put("Enter_the_friend_s_name",getBoat.Enter_the_friend_s_name);
				// 				policyMap.put("Select_the_type_of_watercraft",getBoat.Select_the_type_of_watercraft1);
				// 				policyMap.put("Boat_Model_Year",getBoat.Boat_Model_Year);
				// 			policyMap.put("Boat_Manufacturer",getBoat.Boat_Manufacturer);
				// 				policyMap.put("Boat_Coverage",getBoat.Boat_Coverage1);
				// 				policyMap.put("Boat_Model",getBoat.Boat_Model);
				// 				policyMap.put("Operator_First_Name",getBoat.Operator_First_Name);
				// 				policyMap.put("Operator_Last_Name",getBoat.Operator_Last_Name);
				// 				policyMap.put("Date_of_Birth",getBoat.Date_of_Birth);
				// 				policyMap.put("Current_Cost_of_Brand_New_Unit",getBoat.Current_cost_of_a_brand_new_watercraft);
				// 				policyMap.put("Fair_Market_Value",getBoat.Fair_Market_Value);
				// 				policyMap.put("Boat_Model_Age",getBoat.Boat_Model_Age);
				// 				policyMap.put("Product_Package",getBoat.Product_Package);
				// 				policyMap.put("Deductible",getBoat.Deductible);
				// 				policyMap.put("Personal_Effects_Coverage",getBoat.Personal_Effects_Coverage);
				// 				policyMap.put("Navigational_Equipment_Coverage",getBoat.Navigational_Equipment_Coverage);
				// 				policyMap.put("Salvage",getBoat.Salvage);
				// 			policyMap.put("Is_the_Principal_Operator_the_same_as_the_Applican", getBoat.Is_the_Principal_Operator_the_same_as_the_Applicant_Owner);
				// 				policyMap.put("Is_Watercraft_Ineligible_For_Coverage",getBoat.Is_Watercraft_Ineligible_For_Coverage);
				// 				policyMap.put("Does_Watercraft_Meet_Safety_And_Usage_Requirements",getBoat.Does_Watercraft_Meet_Safety_And_Usage_Requirements);
				// 				policyMap.put("Is_Applicant_Ineligible_For_Coverage",getBoat.Is_Applicant_Ineligible_For_Coverage);
				// 				policyMap.put("Is_Operator_Ineligible_For_Coverage",getBoat.Is_Operator_Ineligible_For_Coverage);
				// 				policyMap.put("Length",getBoat.Length_field1);
				// 				policyMap.put("Hull_ID_optional",getBoat.Hull_ID_optional);
				// 				// 			policyMap.put("Hull_type",getBoat.typ);
				// 				policyMap.put("Estimated_max_speed",getBoat.Estimated_max_speed1);
				// 				policyMap.put("Type",getBoat.Type_field);
				// 				policyMap.put("Fuel_Type",getBoat.Fuel_Type);
				// 				policyMap.put("Model_Year",getBoat.Model_Year);
				// 				policyMap.put("Manufacturer",getBoat.Manufacturer);
				// 				policyMap.put("Serial",getBoat.Serial);
				// 				policyMap.put("HP",getBoat.HP1);
				// 				policyMap.put("Type_2",getBoat.Type_2);
				// 				policyMap.put("Fuel_Type_2",getBoat.Fuel_Type_2);
				// 				policyMap.put("Model_Year_2",getBoat.Model_Year_2);
				// 				policyMap.put("Manufacturer_2",getBoat.Manufacturer_2);
				// 				policyMap.put("Serial_2",getBoat.Serial_2);
				// 				policyMap.put("HP_2",getBoat.HP_21);
				// 				policyMap.put("Add_a_trailer",getBoat.Add_a_trailer);
				// 				policyMap.put("Trailer_Value",getBoat.Trailer_Value);
				// 				policyMap.put("Trailer_Model_Year",getBoat.Trailer_Model_Year);
				// 				// 			policyMap.put("Trailer_Manufacturer",getBoat.tr);
				// 				// 			policyMap.put("Trailer_Serial",getBoat.tr);
				// 				policyMap.put("Trailer_Length",getBoat.Trailer_Length);
				// 				policyMap.put("Add_a_tender",getBoat.Add_a_tender);
				// 				policyMap.put("Trailer_Value",getBoat.Trailer_Value);
				// 				policyMap.put("Add_an_auxiliary_motor",getBoat.Add_an_auxiliary_motor);
				// 				policyMap.put("Aux_Engine_Value",getBoat.Aux_Engine_Value);
				// 				policyMap.put("Aux_Engine_Model_Year",getBoat.Aux_Engine_Model_Year);
				// 				// 	policyMap.put("Aux_Engine_Manufacturer",getBoat.aux);
				// 				policyMap.put("Auxiliary_Engine_Serial",getBoat.Auxiliary_Engine_Serial);
				// 				policyMap.put("	Aux_Engine_HP",getBoat.Aux_Engine_HP1);
				policyMap.put("Deal_Name",if(getBoat.Policy_Number != "",getBoat.Policy_Number,if(getBoat.Reference_Number != "",getBoat.Reference_Number,"N/A")));
				//Deductible
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
				// Personal Effects Coverage
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
				// 				if(getBoat.Product_Name != null && getBoat.Product_Name != "")
				// 				{
				if(getBoat.Policy_Number.tostring().len() > 0 && getBoat.Reference_Number.tostring().len() > 0)
				{
					info "All values present";
					policyMap.put("Policy_Number",getBoat.Policy_Number);
					policyMap.put("Quote_ID",getBoat.Reference_Number);
					crmPolicy = zoho.crm.searchRecords("Deals","((Policy_Number:equals:" + getBoat.Policy_Number + ") OR (Quote_ID:equals:" + getBoat.Reference_Number + "))");
					// 					info "crmPolicy = " + crmPolicy;
					// 					info "crmPolicy" + crmPolicy.size();
				}
				else if(getBoat.Policy_Number.tostring().len() > 0 && getBoat.Reference_Number.tostring().len() == 0)
				{
					info "Reference_Number is not present";
					policyMap.put("Policy_Number",getBoat.Policy_Number);
					crmPolicy = zoho.crm.searchRecords("Deals","(Policy_Number:equals:" + getBoat.Policy_Number + ")");
					info "crmPolicy " + crmPolicy.size();
				}
				else if(getBoat.Policy_Number.tostring().len() == 0 && getBoat.Reference_Number.tostring().len() > 0)
				{
					info "Policy_Number is not present";
					policyMap.put("Quote_ID",getBoat.Reference_Number);
					crmPolicy = zoho.crm.searchRecords("Deals","(Quote_ID:equals:" + getBoat.Reference_Number + ")");
					info "crmPolicy " + crmPolicy.size();
				}
				info "crmPolicy: " + crmPolicy;
				if(crmPolicy.size() > 0)
				{
					info "update Policy";
					creatorQuoteMigratedStatusList.add("Unique Key matched");
					creatorQuoteMigratedStatusList.add("Updated Deal");
					policyMap.put("Migrated_Status",creatorQuoteMigratedStatusList);
					policyMap.put("Migrated",true);
					// 				update policy in creator
					info "update policy in creator";
					getBoatQuote = BoatQuote[Policy_Number == getBoat.Policy_Number || Quote_ID == getBoat.Reference_Number];
					if(getBoatQuote.count() > 0)
					{
						// 						info "if";
						boatQuoteID = getBoatQuote.ID;
						getBoatQuote.Migrated=true;
						getBoat.Boat_Quote_Creator_ID=getBoatQuote.ID;
						// 						info "getBoatQuote..........." + getBoatQuote.ID;
						getBoatQuote.Migrated_Status=creatorQuoteMigratedStatusList;
						getBoatQuote.Zoho_Crm_ID=crmPolicy.get(0).get("id").toString();
						getBoatQuote.Quote_ID=getBoat.Reference_Number;
						getBoatQuote.Customer_ID=creatorID;
						getBoatQuote.Slave_Customer=slaveCreatorID;
						getBoatQuote.Policy_Number=getBoat.Policy_Number;
						getBoatQuote.Phone_Number=formattedPhoneNumber;
						getBoatQuote.Email=getBoat.Email1;
						getBoatQuote.Please_select_the_province_your_boat_is_used_in=getBoat.Please_select_the_province_your_boat_is_used_in;
						getBoatQuote.Where_Did_You_Find_Us=referraltype;
						getBoatQuote.Date_of_Birth=getBoat.Date_of_Birth;
						getBoatQuote.Agree_to_terms_and_conditions=true;
						getBoatQuote.Total_Premium_before_tax=getBoat.Premium;
						getBoatQuote.Fee=getBoat.Fee;
						getBoatQuote.Tax_Precent=taxPercentage;
						getBoatQuote.Tax_Province=getBoat.Please_select_the_province_your_boat_is_used_in;
						getBoatQuote.Organization_ID_Server="RECPROTECT1";
						getBoatQuote.Created_Source="CREATOR";
						getBoatQuote.Quote_Status="Completed";
						getBoatQuote.Deal_Type=dealStatus;
						getBoatQuote.Total_Tax=getBoat.Tax;
						getBoatQuote.Total_Payable_Premium_after_tax=getBoat.Total;
						getBoatQuote.Name=getBoat.Enter_the_friend_s_name;
						getBoatQuote.Insured_First_Name=getBoat.Insured_First_Name;
						getBoatQuote.Insured_Last_Name=getBoat.Insured_Last_Name;
						getBoatQuote.Country=getBoat.Country;
						getBoatQuote.Address=getBoat.Address;
						getBoatQuote.Suite_Apt=getBoat.Suite_Apt;
						getBoatQuote.City=getBoat.City;
						getBoatQuote.Province=getBoat.Province_State;
						getBoatQuote.Postal_code_ZIP_Code=getBoat.Postal_Zip_Code;
						// 													getBoatQuote.Fair_Market_Value=getBoat.Fair_Market_Value;
						getBoatQuote.Is_Watercraft_Ineligible_For_Coverage=getBoat.Is_Watercraft_Ineligible_For_Coverage;
						getBoatQuote.Does_Watercraft_Meet_Safety_And_Usage_Requirements=getBoat.Does_Watercraft_Meet_Safety_And_Usage_Requirements;
						getBoatQuote.Is_Applicant_Ineligible_For_Coverage=getBoat.Is_Applicant_Ineligible_For_Coverage;
						getBoatQuote.Is_Operator_Ineligible_For_Coverage=getBoat.Is_Operator_Ineligible_For_Coverage;
						getBoatQuote.Boat_Migration_ID=getBoat.ID.tostring();
						getBoatQuote.Migrated=true;
						getBoatQuote.Payment_Date=getBoat.Payment_Date;
						getBoatQuote.Sales_Date=if(getBoatQuote.Sales_Date != null,getBoatQuote.Sales_Date,getBoat.Payment_Date);
						getBoatQuote.Product_Package=getBoat.Product_Package;
						getBoatQuote.Bind_Date=getBoat.Bind_Date;
						getBoatQuote.Last_Modified=getBoat.Last_Modified;
						getBoatQuote.How_many_boats_would_you_like_to_insure="1";
						getBoatQuote.Policy_Status="ACTIVE";
						getBoatQuote.Policy_AutoRenewal_Status="Active";
						getBoatQuote.Quote_Policy_Type="New Business";
						getBoatQuote.Carrier="Four Points Insurance";
						getBoatQuote.Inception_Date=getBoat.Effective_Date;
						getBoatQuote.Expiry_Date=getBoat.End_Date;
						//additional Name Subform
						// 							if((getBoat.Additional_Insured_First_Name != null && getBoat.Additional_Insured_First_Name != "") || (getBoat.Additional_Insured_Last_Name != null && getBoat.Additional_Insured_Last_Name != ""))
						// 							{
						// 								fetchadditionalsubform = Additional_Names[Boats == getBoatQuote.ID];
						// 								if(fetchadditionalsubform.count() > 0)
						// 								{
						// 									fetchadditionalsubform.Additional_Insured_First_Name=getBoat.Additional_Insured_First_Name;
						// 									fetchadditionalsubform.Additional_Insured_Last_Name=getBoat.Additional_Insured_Last_Name;
						// // 									fetchadditionalsubform.Customer_ID=customerUpdate;
						// 								}
						// 								else
						// 								{
						// 									createaditionalname = insert into Additional_Names
						// 									[
						// 										Additional_Insured_First_Name=getBoat.Additional_Insured_First_Name
						// 										Additional_Insured_Last_Name=getBoat.Additional_Insured_Last_Name
						// 										Customer_ID=customerUpdate
						// 										Boats=getBoatQuote.ID
						// 										Added_User=zoho.loginuser
						// 									];
						// 								}
						// 							}
						getBoatsubform = Boat[BoatQuote == getBoatQuote.ID];
						if(getBoatsubform.count() > 0)
						{
							info "updated creator subform---->" + getBoatsubform;
							subFormBoatID = getBoatsubform.ID;
							getBoatsubform.Select_the_type_of_watercraft=selectTypeofWaterCraft;
							getBoatsubform.Boat_Model_Year=getBoat.Boat_Model_Year;
							getBoatsubform.Boat_Model=getBoat.Boat_Model;
							getBoatsubform.Aux_Engine_HP_Thrust=getBoat.Aux_Engine_HP1;
							getBoatsubform.Boat_Manufacturer=getBoat.Boat_Manufacturer;
							getBoatsubform.Replacement_Cost=getBoat.Current_cost_of_a_brand_new_watercraft;
							getBoatsubform.First_Name=getBoat.Operator_First_Name;
							getBoatsubform.Last_Name=getBoat.Operator_Last_Name;
							getBoatsubform.Date_of_Birth=getBoat.Date_of_Birth;
							getBoatsubform.Premium_Per_Year=getBoat.Premium;
							getBoatsubform.Deductible=Deductiblevalue;
							getBoatsubform.Lengths=getBoat.Length_field1;
							getBoatsubform.Hull_ID_Serial=getBoat.ID_Serial;
							getBoatsubform.Hull_ID_Optional=getBoat.Hull_ID_optional;
							getBoatsubform.Hull_Type=getBoat.Hull_Type;
							getBoatsubform.Is_the_Principal_Operator_the_same_as_the_Applicant_Owner=if(getBoat.Is_the_Principal_Operator_the_same_as_the_Applicant_Owner == true,"Yes","No");
							getBoatsubform.Principal_operator_s_years_of_boating_experience_with_vessels_of_a_similar_size_and_type=getBoatsubform.Principal_operator_s_years_of_boating_experience_with_vessels_of_a_similar_size_and_type;
							getBoatsubform.Does_the_operator_hold_a_Pleasure_Craft_Operator_s_Card_PCOC=if(getBoat.Does_the_operator_hold_a_Pleasure_Craft_Operator_s_Card_PCOC == true,"Yes","No");
							getBoatsubform.Boat_Model_Age=getBoat.Boat_Model_Age;
							getBoatsubform.Manufacturer1=getBoat.Manufacturer_2;
							getBoatsubform.Boat_Coverage=getBoat.Boat_Coverage1;
							getBoatsubform.Actual_Cash_Value=getBoat.Fair_Market_Value;
							getBoatsubform.Personal_Effects_Coverage=PersonalEffectsCoverageValue;
							getBoatsubform.Navigational_Equipment_Coverage=NavigationalEquipmentCoverageValue;
							getBoatsubform.Salvage=getBoat.Salvage;
							getBoatsubform.Estimated_max_speed=getBoat.Estimated_max_speed1;
							getBoatsubform.Fuel_Type=getBoat.Fuel_Type;
							getBoatsubform.Types=getBoat.Type_field;
							getBoatsubform.Model_Year=getBoat.Model_Year;
							getBoatsubform.Horsepower=getBoat.HP1;
							getBoatsubform.Manufacturer=getBoat.Manufacturer;
							getBoatsubform.Serial1=getBoat.Serial_2;
							getBoatsubform.Horsepower1=getBoat.HP_21;
							getBoatsubform.Serial=getBoat.Serial;
							getBoatsubform.Add_a_trailer=if(getBoat.Add_a_trailer == true,"Yes","No");
							getBoatsubform.Tender_Value=getBoat.Tender_Value;
							getBoatsubform.Trailer_Value=getBoat.Trailer_Value;
							getBoatsubform.Trailer_Model_Year=getBoat.Trailer_Model_Year;
							getBoatsubform.Trailer_Manufacturer=getBoat.Trailer_Manufacturer;
							getBoatsubform.Trailer_Length=getBoat.Trailer_Length;
							getBoatsubform.Trailer_Serial=getBoat.Trailer_Serial;
							getBoatsubform.Tender_Model_Year=getBoat.Tender_Model_Year;
							getBoatsubform.Tender_Manufacturer=getBoat.Tender_Manufacturer;
							getBoatsubform.Tender_Serial=getBoat.Tender_Serial;
							getBoatsubform.Add_a_tender=if(getBoat.Add_a_tender == true,"Yes","No");
							getBoatsubform.Trailer_Value=getBoat.Trailer_Value;
							getBoatsubform.Tender_Length=getBoat.Tender_Length1;
							getBoatsubform.Add_an_auxiliary_motor=if(getBoat.Add_an_auxiliary_motor == true,"Yes","No");
							getBoatsubform.Aux_Engine_Manufacturer=getBoat.Aux_Engine_Manufacturer;
							getBoatsubform.Aux_Engine_Value=getBoat.Aux_Engine_Value;
							getBoatsubform.Aux_Engine_Model_Year=getBoat.Aux_Engine_Model_Year;
							getBoatsubform.Auxiliary_Engine_Serial=getBoat.Auxiliary_Engine_Serial;
							getBoatsubform.Fuel_Type1=getBoat.Fuel_Type_21;
							getBoatsubform.Types1=getBoat.Type_21;
							getBoatsubform.Model_Year1=getBoat.Model_Year_21;
							getBoatsubform.Boat_Migration_ID=getBoat.ID;
							getBoatsubform.Migrated=true;
							getBoatsubform.Is_this_boat_financed=if(IsThisBoatFinanced == true,"Yes","No");
							getBoatsubform.Lein_holder=SelectAFinancier;
							getBoatsubform.Address_line1=LossPayAddressLine1;
							getBoatsubform.Address_line2=LossPayAddressLine2;
							getBoatsubform.City=LossPayCity;
							getBoatsubform.Province=LossPayProvince;
							getBoatsubform.Postal_Code=LossPayPostalCode;
							getBoatsubform.Country=LossPayCountry;
							getBoatsubform.Select_coverage_for_policy=prodPackage;
						}
						else
						{
							// 						insert subform Boat in BoatQuote
							createBoat = insert into Boat
							[
								Added_User=zoho.loginuser
								BoatQuote=getBoatQuote.ID
								Select_the_type_of_watercraft=selectTypeofWaterCraft
								Boat_Model_Year=getBoat.Boat_Model_Year
								Boat_Manufacturer=getBoat.Boat_Manufacturer
								Boat_Model=getBoat.Boat_Model
								Replacement_Cost=getBoat.Current_cost_of_a_brand_new_watercraft
								Aux_Engine_HP_Thrust=getBoat.Aux_Engine_HP1
								Is_the_Principal_Operator_the_same_as_the_Applicant_Owner=if(getBoat.Is_the_Principal_Operator_the_same_as_the_Applicant_Owner == true,"Yes","No")
								Principal_operator_s_years_of_boating_experience_with_vessels_of_a_similar_size_and_type=getBoatsubform.Principal_operator_s_years_of_boating_experience_with_vessels_of_a_similar_size_and_type
								Does_the_operator_hold_a_Pleasure_Craft_Operator_s_Card_PCOC=if(getBoat.Does_the_operator_hold_a_Pleasure_Craft_Operator_s_Card_PCOC == true,"Yes","No")
								First_Name=getBoat.Operator_First_Name
								Last_Name=getBoat.Operator_Last_Name
								Date_of_Birth=getBoat.Date_of_Birth
								Premium_Per_Year=getBoat.Premium
								Deductible=Deductiblevalue
								Lengths=getBoat.Length_field1
								Hull_ID_Serial=getBoat.ID_Serial
								Hull_ID_Optional=getBoat.Hull_ID_optional
								Hull_Type=getBoat.Hull_Type
								Types=getBoat.Type_field
								Horsepower1=getBoat.HP_21
								Types=getBoat.Type_field
								Actual_Cash_Value=getBoat.Fair_Market_Value
								Boat_Model_Age=getBoat.Boat_Model_Age
								Boat_Coverage=getBoat.Boat_Coverage1
								Personal_Effects_Coverage=PersonalEffectsCoverageValue
								Navigational_Equipment_Coverage=NavigationalEquipmentCoverageValue
								Salvage=getBoat.Salvage
								Estimated_max_speed=getBoat.Estimated_max_speed1
								Manufacturer1=getBoat.Manufacturer_2
								Horsepower=getBoat.HP1
								Fuel_Type=getBoat.Fuel_Type
								Model_Year=getBoat.Model_Year
								Manufacturer=getBoat.Manufacturer
								Tender_Value=getBoat.Tender_Value
								Serial1=getBoat.Serial_2
								Serial=getBoat.Serial
								Add_a_trailer=if(getBoat.Add_a_trailer == true,"Yes","No")
								Trailer_Value=getBoat.Trailer_Value
								Trailer_Model_Year=getBoat.Trailer_Model_Year
								Trailer_Length=getBoat.Trailer_Length
								Aux_Engine_Manufacturer=getBoat.Aux_Engine_Manufacturer
								Tender_Model_Year=getBoat.Tender_Model_Year
								Add_a_tender=if(getBoat.Add_a_tender == true,"Yes","No")
								Trailer_Value=getBoat.Trailer_Value
								Tender_Manufacturer=getBoat.Tender_Manufacturer
								Trailer_Manufacturer=getBoat.Trailer_Manufacturer
								Tender_Serial=getBoat.Tender_Serial
								Tender_Length=getBoat.Tender_Length1
								Add_an_auxiliary_motor=if(getBoat.Add_an_auxiliary_motor == true,"Yes","No")
								Aux_Engine_Value=getBoat.Aux_Engine_Value
								Aux_Engine_Model_Year=getBoat.Aux_Engine_Model_Year
								Auxiliary_Engine_Serial=getBoat.Auxiliary_Engine_Serial
								Select_coverage_for_policy=prodPackage
								Fuel_Type1=getBoat.Fuel_Type_21
								Types1=getBoat.Type_21
								Model_Year1=getBoat.Model_Year_21
								Trailer_Serial=getBoat.Trailer_Serial
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
							info "create creator subform---->" + createBoat;
							subFormBoatID = getBoatsubform.ID;
						}
						if(Boat[ID == subFormBoatID.toLong()].count() > 0)
						{
							getBoat.Subform_Record_Status="Success";
							getBoat.Deal_Migrated_Status=creatorQuoteMigratedStatusList;
							getBoat.Boat_subform_Creator_ID=subFormBoatID;
						}
						else
						{
							info "subform record status1";
							getBoat.Subform_Record_Status="Fail";
						}
						getBoat.Migrated=true;
						fetBoatQuote = BoatQuote[ID == getBoatQuote.ID];
						if(fetBoatQuote.count() > 0)
						{
							fetBoatQuote.Zoho_Crm_ID=crmPolicy.get(0).get("id");
							getBoat.Quote_Record_Status="Success";
							// 							info "status*****" + getBoat.Quote_Record_Status = "Success";
							getBoat.Boat_Quote_Creator_ID=getBoatQuote.ID;
							getBoat.Creator_Error_Msg1="";
						}
						else
						{
							getBoat.Quote_Record_Status="Fail";
							getBoat.Creator_Error_Msg1=getBoatQuote.toString();
						}
						getBoat.CRM_Deal_ID=crmPolicy.get(0).get("id");
						getBoat.CRM_Deal_Status="Success";
					}
					else
					{
						// 						info "else";
						// 						creatorQuoteMigratedStatusList.add("New Policy");
						// 				create policy in Creator
						createCreatorPolicy = insert into BoatQuote
						[
							Added_User=zoho.loginuser
							Migrated_Status=creatorQuoteMigratedStatusList
							Quote_ID=getBoat.Reference_Number
							Policy_Number=getBoat.Policy_Number
							Phone_Number=formattedPhoneNumber
							Email=getBoat.Email1
							Date_of_Birth=getBoat.Date_of_Birth
							Where_Did_You_Find_Us=referraltype
							Quote_Status="Completed"
							Deal_Type=dealStatus
							Agree_to_terms_and_conditions=true
							Total_Premium_before_tax=getBoat.Premium
							Fee=getBoat.Fee
							Tax_Precent=taxPercentage
							Tax_Province=getBoat.Please_select_the_province_your_boat_is_used_in
							Organization_ID_Server="RECPROTECT1"
							Created_Source="CREATOR"
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
							Sales_Date=getBoat.Payment_Date
							Boat_Migration_ID=getBoat.ID.tostring()
							Migrated=true
							Product_Package=getBoat.Product_Package
							Bind_Date=getBoat.Bind_Date
							Last_Modified=getBoat.Last_Modified
							How_many_boats_would_you_like_to_insure="1"
							Policy_Status="ACTIVE"
							Policy_AutoRenewal_Status="Active"
							Quote_Policy_Type="New Business"
							Inception_Date=getBoat.Effective_Date
							Expiry_Date=getBoat.End_Date
							Carrier="Four Points Insurance"
							Quote_Status="Completed"
							Customer_ID=creatorID
							Slave_Customer=slaveCreatorID
							Deal_Type=dealStatus
							Zoho_Crm_ID=crmPolicy.get(0).get("id")
						];
						boatQuoteID = createCreatorPolicy;
						// 						if((getBoat.Additional_Insured_First_Name != null && getBoat.Additional_Insured_First_Name != "") || (getBoat.Additional_Insured_Last_Name != null && getBoat.Additional_Insured_Last_Name != ""))
						// 						{
						// 							createaditionalname = insert into Additional_Names
						// 							[
						// 								Additional_Insured_First_Name=getBoat.Additional_Insured_First_Name
						// 								Additional_Insured_Last_Name=getBoat.Additional_Insured_Last_Name
						// 								Customer_ID=customerUpdate
						// 								Boats=createCreatorPolicy
						// 								Added_User=zoho.loginuser
						// 							];
						// 						}
						createBoat = insert into Boat
						[
							Added_User=zoho.loginuser
							BoatQuote=createCreatorPolicy
							Select_the_type_of_watercraft=selectTypeofWaterCraft
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
							First_Name=getBoat.Operator_First_Name
							Last_Name=getBoat.Operator_Last_Name
							Date_of_Birth=getBoat.Date_of_Birth
							Premium_Per_Year=getBoat.Premium
							Actual_Cash_Value=getBoat.Fair_Market_Value
							Deductible=Deductiblevalue
							Lengths=getBoat.Length_field1
							Serial1=getBoat.Serial_2
							Hull_ID_Serial=getBoat.ID_Serial
							Hull_ID_Optional=getBoat.Hull_ID_optional
							Hull_Type=getBoat.Hull_Type
							Types=getBoat.Type_field
							Boat_Model_Age=getBoat.Boat_Model_Age
							Boat_Coverage=getBoat.Boat_Coverage1
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
							Trailer_Serial=getBoat.Trailer_Serial
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
						if(Boat[ID == createBoat].count() > 0)
						{
							getBoat.Subform_Record_Status="Success";
							getBoat.Deal_Migrated_Status=creatorQuoteMigratedStatusList;
							getBoat.Boat_subform_Creator_ID=createBoat;
						}
						else
						{
							info "Subform Record Status2";
							getBoat.Subform_Record_Status="Fail";
						}
						getBoat.Migrated=true;
						fetBoatQuote = BoatQuote[ID == createCreatorPolicy];
						if(fetBoatQuote.count() > 0)
						{
							fetBoatQuote.Zoho_Crm_ID=crmPolicy.get(0).get("id");
							getBoat.Quote_Record_Status="Success";
							// 							info "status*****" + getBoat.Quote_Record_Status = "Success";
							getBoat.Boat_Quote_Creator_ID=createCreatorPolicy;
							getBoat.Creator_Error_Msg1="";
						}
						else
						{
							getBoat.Quote_Record_Status="Fail";
							getBoat.Creator_Error_Msg1=createCreatorPolicy.toString();
						}
						getBoat.CRM_Deal_ID=crmPolicy.get(0).get("id");
						getBoat.CRM_Deal_Status="Success";
					}
					// 				update policy in CRM
					// 					info "update policy in CRM";
					policyMap.put("Creator_ID",boatQuoteID.toString());
					policyMap.put("Migrated",true);
					info crmPolicy.get(0).get("id");
					crmPolicyID = crmPolicy.get(0).get("id");
					if(crmPolicyID != null || crmPolicyID = "")
					{
						//Phone
						if(getBoat.Phone != null && getBoat.Phone != "")
						{
							policyMap.put("Phone",formattedPhoneNumber);
						}
						else
						{
							policyMap.put("Phone",crmPolicy.get(0).get("Phone"));
						}
						//Additional Insured First Name
						if(getBoat.Additional_Insured_First_Name != null && getBoat.Additional_Insured_First_Name != "")
						{
							policyMap.put("Additional_Insured_1",getBoat.Additional_Insured_First_Name);
						}
						else
						{
							policyMap.put("Additional_Insured_1",crmPolicy.get(0).get("Additional_Insured_1"));
						}
						//Additional Insured Last Name
						if(getBoat.Additional_Insured_Last_Name != null && getBoat.Additional_Insured_Last_Name != "")
						{
							policyMap.put("Additional_Insured_2",getBoat.Additional_Insured_Last_Name);
						}
						else
						{
							policyMap.put("Additional_Insured_2",crmPolicy.get(0).get("Additional_Insured_2"));
						}
						//Payment Date
						if(getBoat.Payment_Date != null)
						{
							policyMap.put("Payment_Date",if(getBoat.Payment_Date != null,getBoat.Payment_Date.toTime("yyyy-MM-dd'T'HH:mm:ss").toString("yyyy-MM-dd'T'HH:mm:ss"),null));
							policyMap.put("Sales_Date_1",if(getBoat.Payment_Date != null,getBoat.Payment_Date.toTime("yyyy-MM-dd'T'HH:mm:ss").toString("yyyy-MM-dd'T'HH:mm:ss"),null));
						}
						else
						{
							policyMap.put("Payment_Date",crmPolicy.get(0).get("Payment_Date"));
							policyMap.put("Sales_Date_1",crmPolicy.get(0).get("Sales_Date_1"));
						}
						// 							//Bind Date
						// 							if(getBoat.Bind_Date != null)
						// 							{
						// 								policyMap.put("Bind_Date",if(getBoat.Bind_Date != null,getBoat.Bind_Date.toTime("yyyy-MM-dd'T'HH:mm:ss").toString("yyyy-MM-dd'T'HH:mm:ss"),null));
						// 							}
						// 							else
						// 							{
						// 								policyMap.put("Bind_Date",crmPolicy.get(0).get("Bind_Date"));
						// 							}
						// 							Inception Date
						if(getBoat.Bind_Date != null)
						{
							policyMap.put("Inception_Date",getBoat.Effective_Date);
						}
						else
						{
							policyMap.put("Inception_Date",crmPolicy.get(0).get("Inception_Date"));
						}
						//Effective Date
						// 							End Date
						// 							if(getBoat.End_Date != null)
						// 							{
						// 								policyMap.put("End_Date",getBoat.End_Date);
						// 							}
						// 							else
						// 							{
						// 								policyMap.put("End_Date",crmPolicy.get(0).get("End_Date"));
						// 							}
						//End Date
						if(getBoat.End_Date != null)
						{
							policyMap.put("Expiry_Date",getBoat.End_Date);
						}
						else
						{
							policyMap.put("Expiry_Date",crmPolicy.get(0).get("Expiry_Date"));
						}
						//Premium
						if(getBoat.Premium != null)
						{
							policyMap.put("Premium",getBoat.Premium);
						}
						else
						{
							policyMap.put("Premium",crmPolicy.get(0).get("Premium"));
						}
						//Fee
						if(getBoat.Fee != null)
						{
							policyMap.put("Fee",getBoat.Fee);
						}
						else
						{
							policyMap.put("Fee",crmPolicy.get(0).get("Fee"));
						}
						//Total
						if(getBoat.Total != null)
						{
							policyMap.put("Total",getBoat.Total);
						}
						else
						{
							policyMap.put("Total",crmPolicy.get(0).get("Total"));
						}
						//Tax
						if(getBoat.Tax != null)
						{
							policyMap.put("Tax",getBoat.Tax);
						}
						else
						{
							policyMap.put("Tax",crmPolicy.get(0).get("Tax"));
						}
						//Last Modified Date Time
						if(getBoat.Last_Modified != null)
						{
							policyMap.put("Last_Modified",if(getBoat.Last_Modified != null,getBoat.Last_Modified.toTime("yyyy-MM-dd'T'HH:mm:ss").toString("yyyy-MM-dd'T'HH:mm:ss"),null));
						}
						else
						{
							policyMap.put("Last_Modified",crmPolicy.get(0).get("Last_Modified"));
						}
						policyMap.put("Owner",crmPolicy.get(0).get("Owner").get("id"));
						updateCRMPolicy = zoho.crm.updateRecord("Deals",crmPolicyID.toLong(),policyMap);
						info "updateCRMPolicy " + updateCRMPolicy;
						if(updateCRMPolicy.containKey("id") == true && updateCRMPolicy.get("id") != null && updateCRMPolicy.get("id") != "")
						{
							getBoat.CRM_Deal_ID=updateCRMPolicy.get("id").toString();
							getBoat.CRM_Deal_Status="Success";
							getBoat.Deal_Error_Msg="";
							getBoat.Deal_Migrated_Status=creatorQuoteMigratedStatusList;
							if(getBoat.Additional_Insured_First_Name != "" || getBoat.Additional_Insured_Last_Name != "")
							{
								newNote = Map();
								newNote.put("se_module","Deals");
								newNote.put("Parent_Id",updateCRMPolicy.get("id").toString());
								newNote.put("Note_Title","Additional Insured Name");
								newNote.put("Note_Content","Additional Insured available for this policy." + ifnull(getBoat.Additional_Insured_First_Name,"") + ifnull(getBoat.Additional_Insured_Last_Name,""));
								resp = zoho.crm.createRecord("Notes",newNote);
							}
						}
						else
						{
							info "update deal error";
							info updateCRMPolicy;
							getBoat.CRM_Deal_ID="";
							getBoat.CRM_Deal_Status="Fail";
							getBoat.Deal_Error_Msg=updateCRMPolicy.toString();
						}
						getBoat.Migrated=true;
					}
				}
				else
				{
					info "create Policy";
					creatorQuoteMigratedStatusList.add("New Policy");
					// 				create policy in Creator
					createCreatorPolicy = insert into BoatQuote
					[
						Added_User=zoho.loginuser
						Migrated_Status=creatorQuoteMigratedStatusList
						Quote_ID=getBoat.Reference_Number
						Policy_Number=getBoat.Policy_Number
						Phone_Number=formattedPhoneNumber
						Email=getBoat.Email1
						Date_of_Birth=getBoat.Date_of_Birth
						Where_Did_You_Find_Us=referraltype
						Quote_Status="Completed"
						Deal_Type=dealStatus
						Agree_to_terms_and_conditions=true
						Total_Premium_before_tax=getBoat.Premium
						Fee=getBoat.Fee
						Tax_Precent=taxPercentage
						Tax_Province=getBoat.Please_select_the_province_your_boat_is_used_in
						Organization_ID_Server="RECPROTECT1"
						Created_Source="CREATOR"
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
						Sales_Date=getBoat.Payment_Date
						Boat_Migration_ID=getBoat.ID.tostring()
						Migrated=true
						Product_Package=getBoat.Product_Package
						Policy_Status="ACTIVE"
						Policy_AutoRenewal_Status="Active"
						Quote_Policy_Type="New Business"
						Inception_Date=getBoat.Effective_Date
						Expiry_Date=getBoat.End_Date
						Carrier="Four Points Insurance"
						Bind_Date=getBoat.Bind_Date
						Last_Modified=getBoat.Last_Modified
						How_many_boats_would_you_like_to_insure="1"
						Quote_Status="Completed"
						Customer_ID=creatorID
						Slave_Customer=slaveCreatorID
						Deal_Type=dealStatus
					];
					boatQuoteID = createCreatorPolicy;
					info "boatQuoteID  " + createCreatorPolicy;
					// 						if((getBoat.Additional_Insured_First_Name != null && getBoat.Additional_Insured_First_Name != "") || (getBoat.Additional_Insured_Last_Name != null && getBoat.Additional_Insured_Last_Name != ""))
					// 						{
					// 							createaditionalname = insert into Additional_Names
					// 							[
					// 								Additional_Insured_First_Name=getBoat.Additional_Insured_First_Name
					// 								Additional_Insured_Last_Name=getBoat.Additional_Insured_Last_Name
					// 								Customer_ID=customerUpdate
					// 								Boats=createCreatorPolicy
					// 								Added_User=zoho.loginuser
					// 							];
					// 						}
					createBoat = insert into Boat
					[
						Added_User=zoho.loginuser
						BoatQuote=createCreatorPolicy
						Select_the_type_of_watercraft=selectTypeofWaterCraft
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
						First_Name=getBoat.Operator_First_Name
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
						Trailer_Serial=getBoat.Trailer_Serial
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
					info "createBoat" + createBoat;
					if(Boat[ID == createBoat].count() > 0)
					{
						getBoat.Subform_Record_Status="Success";
						getBoat.Deal_Migrated_Status=creatorQuoteMigratedStatusList;
						getBoat.Boat_subform_Creator_ID=createBoat;
					}
					else
					{
						info "Subform Record Status3";
						getBoat.Subform_Record_Status="Fail";
					}
					getBoat.Migrated=true;
					policyMap.put("Migrated_Status",creatorQuoteMigratedStatusList);
					policyMap.put("Migrated",true);
					// 				create policy in CRM with Boat layout
					policyMap.put("Creator_ID",boatQuoteID.toString());
					info "policyMap " + policyMap;
					createBoatPolicy = zoho.crm.createRecord("Deals",policyMap);
					info "createBoatPolicy: " + createBoatPolicy;
					if(createBoatPolicy.containKey("id") == true && createBoatPolicy.get("id") != null)
					{
						getBoat.CRM_Deal_ID=createBoatPolicy.get("id").toString();
						getBoat.CRM_Deal_Status="Success";
						getBoat.Deal_Error_Msg="";
						if((getBoat.Additional_Insured_First_Name != "" && getBoat.Additional_Insured_First_Name != null) || (getBoat.Additional_Insured_Last_Name != "" && getBoat.Additional_Insured_Last_Name != null))
						{
							newNote = Map();
							newNote.put("se_module","Deals");
							newNote.put("Parent_Id",createBoatPolicy.get("id").toString());
							newNote.put("Note_Title","Additional Insured Name");
							newNote.put("Note_Content","Additional Insured available for this policy." + ifnull(getBoat.Additional_Insured_First_Name,"") + ifnull(getBoat.Additional_Insured_Last_Name,""));
							resp = zoho.crm.createRecord("Notes",newNote);
						}
					}
					else
					{
						info "create deal error";
						info createBoatPolicy;
						getBoat.CRM_Deal_Status="Fail";
						getBoat.Deal_Error_Msg=createBoatPolicy.toString();
						getBoat.CRM_Deal_ID="";
					}
					fetBoatQuote = BoatQuote[ID == createCreatorPolicy];
					if(fetBoatQuote.count() > 0)
					{
						fetBoatQuote.Zoho_Crm_ID=createBoatPolicy.get("id");
						getBoat.Quote_Record_Status="Success";
						getBoat.Boat_Quote_Creator_ID=createCreatorPolicy;
						getBoat.Creator_Error_Msg1="";
					}
					else
					{
						getBoat.Quote_Record_Status="Fail";
						getBoat.Creator_Error_Msg1=createCreatorPolicy.toString();
					}
				}
				if(getBoat.Boat_subform_Creator_ID != "")
				{
					getBoatsub = Boat[ID == getBoat.Boat_subform_Creator_ID.toLong()];
					getBoatsub.Name_of_Financier=NameofFinancier;
				}
				if(getBoat.Boat_Quote_Creator_ID != "")
				{
					getBoatCustomer = BoatQuote[ID == getBoat.Boat_Quote_Creator_ID.toLong()];
					getBoatCustomer.Customer_ID=creatorID;
				}
				if(getBoat.Additional_Insured_First_Name != "" || getBoat.Additional_Insured_Last_Name != "")
				{
					if(getBoat.count() > 0 && boatQuoteID != null)
					{
						getBoatQuoteAdditional = BoatQuote[ID == boatQuoteID.tolong()];
						if(getBoatQuoteAdditional.count() > 0)
						{
							if(getBoatQuoteAdditional.Additional_Names == null)
							{
								CustomerEmail = getBoat.Email1;
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
								info "fetCustomerData--->" + fetCustomerData;
								addBoatAdditional = insert into Additional_Names
								[
									Added_User=zoho.loginuser
									Additional_Insured_First_Name=getBoat.Additional_Insured_First_Name
									Additional_Insured_Last_Name=getBoat.Additional_Insured_Last_Name
									Email=fetCustomerData
									Boats=boatQuoteID
								];
								customerResp = insert into Customer
								[
									Email=fetCustomerData
									First_Name=getBoat.Additional_Insured_First_Name
									Last_Name=getBoat.Additional_Insured_Last_Name
									Migrated_Additional_Insurer=true
									Migrated=true
									Quote_Type="Boat"
									Added_User=zoho.loginuser
									Customer_Type="Contact"
								];
								thisapp.Server_Side.Latest_Customer_Sync_Create(customerResp);
								fetchAdditionalName = Additional_Names[ID == addBoatAdditional.toLong()];
								fetchAdditionalName.Customer_ID=customerResp;
								additionaldataMap = Map();
								additionaldataMap.put("First_Name",getBoat.Additional_Insured_First_Name);
								additionaldataMap.put("Last_Name",getBoat.Additional_Insured_Last_Name);
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
								additionaldataMap.put("Quote_Type","Boat");
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
								fetchCustoer.Migrated_to_Server=true;
								fetchCustoer.Zoho_Crm_ID=createAdditionalContact.get("id");
								AdditonalupdateMap.put("Additional_Insured",createAdditionalContact.get("id"));
								updateDeal = zoho.crm.updateRecord("Deals",getBoatQuoteAdditional.Zoho_Crm_ID.toLong(),AdditonalupdateMap);
								// 								getBoatQuoteAdditional.Are_there_any_additional_names_on_the_boat_ownership1=true;
								getBoatQuoteAdditional.Are_there_any_additional_names_on_the_boat_ownership="Yes";
							}
						}
					}
				}
				getBoatQuoterec = BoatQuote[ID == boatQuoteID.toLong()];
				if(getBoatQuoterec.Quote_Record_ID_Server != null && getBoatQuoterec.Quote_Record_ID_Server != "")
				{
					serverStatus = "UPDATE";
				}
				else
				{
					serverStatus = "CREATE";
				}
				thisapp.Server_Side.Latest_Boat_Quote_Sync_Create_and_Update(boatQuoteID.toLong(),serverStatus);
				getBoatQuoterec.Migrated_to_Server=true;
			}
			// 				else
			// 				{
			// 					creatorQuoteMigratedStatusList.add("Exception");
			// 					getBoat.Deal_Migrated_Status=creatorQuoteMigratedStatusList;
			// 					info "invalid policy";
			// 					// 				Exception case
			// 				}
			// 			}
			else
			{
				creatorContactMigratedStatusList.add("Exception");
				getBoat.Contact_Migrated_Status=creatorContactMigratedStatusList;
				creatorQuoteMigratedStatusList.add("Exception");
				getBoat.Deal_Migrated_Status=creatorQuoteMigratedStatusList;
			}
		}
		else
		{
			creatorContactMigratedStatusList.add("Exception");
			getBoat.Contact_Migrated_Status=creatorContactMigratedStatusList;
			creatorQuoteMigratedStatusList.add("Exception");
			getBoat.Deal_Migrated_Status=creatorQuoteMigratedStatusList;
		}
		/* Want to remove this lines
			policyMap.put("Loss_Payees_Address",getBoat.Loss_Payees_Address);
			policyMap.put("Loss_Payees_City",getBoat.Loss_Payees_City);
			policyMap.put("Loss_Payees_Country",getBoat.Loss_Payees_Country);
			policyMap.put("Loss_Payees_Name",getBoat.Loss_Payees_Name);
			policyMap.put("Loss_Payees_Postal_Code",getBoat.Loss_Payees_Postal_Code);
			policyMap.put("Loss_Payees_Province",getBoat.Loss_Payees_Province);
			policyMap.put("Loss_Payees_State",getBoat.Loss_Payees_State);
			policyMap.put("Loss_Payees_Unit_Suite",getBoat.Loss_Payees_Unit_Suite);
			policyMap.put("Loss_Payees_Zip_Code",getBoat.Loss_Payees_Zip_Code);
	*/
		// 	}
	}
	info c;
	// 	}
}