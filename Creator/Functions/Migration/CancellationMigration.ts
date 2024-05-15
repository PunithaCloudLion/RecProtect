void Migration.CancellationMigration()
{
	c = 0;
	// 	getCancellationRec = Cancellation_Migration[Migrated == false] range from 0 to 99;
	// 	getCancellationRec = Cancellation_Migration[Migration_Status == "No Trailer Quote" || Migration_Status == "No Boat Quote"];
	getCancellationRec = Cancellation_Migration[Imported_Month == "March" && Imported_Year == "2024"];
	info getCancellationRec.count();
	// 	4564627000000996071 - REC , 4564627000000996043 - RECB
	for each  getCancellation in getCancellationRec
	{
		info getCancellation.ID;
		MigratedStatusList = List();
		MigratedStatusList.clear();
		if(getCancellation.Reason_for_Cancellation == "No longer meets UW guidelines")
		{
			reaonForCancellation = "Underwriting";
		}
		else
		{
			reaonForCancellation = getCancellation.Reason_for_Cancellation;
		}
		if(getCancellation.Policy_Number != null && getCancellation.Policy_Number != "")
		{
			if(startsWith(getCancellation.Policy_Number,"RECB") == true)
			{
				info "RECB";
				getBoatQuote = BoatQuote[Policy_Number == getCancellation.Policy_Number];
				if(getBoatQuote.count() > 0)
				{
					MigratedStatusList.add("BoatQuote");
					fetchCancellation_t = Cancellation[Policy_Number == getCancellation.Policy_Number];
					if(fetchCancellation_t.count() > 0)
					{
						MigratedStatusList.add("Update Boat Cancellation");
						fetchCancellation_t.Policy_Number=getCancellation.Policy_Number;
						fetchCancellation_t.Carrier=getBoatQuote.Carrier;
						fetchCancellation_t.Effective_Date=getBoatQuote.Inception_Date;
						fetchCancellation_t.Expiry_Date=getBoatQuote.Expiry_Date;
						fetchCancellation_t.Insured_Contact_Name=getBoatQuote.Customer_ID;
						fetchCancellation_t.Email_of_Insured=getBoatQuote.Email;
						fetchCancellation_t.Spoke_With="service_recprotect";
						fetchCancellation_t.Confirmed_Email_Phone=true;
						fetchCancellation_t.Confirmed_Client=true;
						fetchCancellation_t.Reason_for_Cancellation=reaonForCancellation;
						fetchCancellation_t.Cancellation_Date=getCancellation.Cancellation_Date;
						fetchCancellation_t.Quote_Type="Boat";
						cancellationID = fetchCancellation_t.ID;
						fetchCancellation_t.Crm_ID=getBoatQuote.ID;
						fetchCancellation_t.Crm_Deal_ID=getBoatQuote.Zoho_Crm_ID;
					}
					else
					{
						MigratedStatusList.add("Create Boat Cancellation");
						createCancel_boat = insert into Cancellation
						[
							Added_User=zoho.loginuser
							Policy_Number=getCancellation.Policy_Number
							Carrier=getBoatQuote.Carrier
							Effective_Date=getBoatQuote.Inception_Date
							Expiry_Date=getBoatQuote.Expiry_Date
							Insured_Contact_Name=getBoatQuote.Customer_ID
							Email_of_Insured=getBoatQuote.Email
							Spoke_With="service_recprotect"
							Confirmed_Email_Phone=true
							Confirmed_Client=true
							Quote_Type="Boat"
							Reason_for_Cancellation=reaonForCancellation
							Cancellation_Date=getCancellation.Cancellation_Date
							Crm_ID=getBoatQuote.ID
							Crm_Deal_ID=getBoatQuote.Zoho_Crm_ID
						];
						cancellationID = createCancel_boat;
					}
					//--------- Policy status  field updation for Creator and CRM -----------
					getBoatQuote.Policy_Status="INACTIVE - CANCELLED";
					policyMap_boat = Map();
					policyMap_boat.put("Policy_Status","INACTIVE - CANCELLED");
					policyMap_boat.put("Cancellation",true);
					// 					policyMap_boat.put("Migration_Data_on","TrailersCleaned2024/02/07");
					policyMap_boat.put("Migration_Data_on","14/03/2024");
					updateCRMPolicy_boat = zoho.crm.updateRecord("Deals",getBoatQuote.Zoho_Crm_ID.toLong(),policyMap_boat);
				}
				else
				{
					MigratedStatusList.add("No Boat Quote");
					info "No Boat Quote";
				}
				getCancellation.Quote_Type="Boat";
			}
			else if(startsWith(getCancellation.Policy_Number,"REC") == true)
			{
				info "REC";
				getTrailerQuote = TrailerQuote[Policy_Number == getCancellation.Policy_Number];
				if(getTrailerQuote.count() > 0)
				{
					MigratedStatusList.add("TrailerQuote");
					fetchCancellation_b = Cancellation[Policy_Number == getCancellation.Policy_Number];
					if(fetchCancellation_b.count() > 0)
					{
						MigratedStatusList.add("Update Trailer Cancellation");
						fetchCancellation_b.Policy_Number=getCancellation.Policy_Number;
						fetchCancellation_b.Carrier=getTrailerQuote.Carrier;
						fetchCancellation_b.Effective_Date=getTrailerQuote.Inception_Date;
						fetchCancellation_b.Expiry_Date=getTrailerQuote.Expiry_Date;
						fetchCancellation_b.Insured_Contact_Name=getTrailerQuote.Customer_ID;
						fetchCancellation_b.Email_of_Insured=getTrailerQuote.Email;
						fetchCancellation_b.Spoke_With="service_recprotect";
						fetchCancellation_b.Confirmed_Email_Phone=true;
						fetchCancellation_b.Confirmed_Client=true;
						fetchCancellation_b.Reason_for_Cancellation=reaonForCancellation;
						fetchCancellation_b.Cancellation_Date=getCancellation.Cancellation_Date;
						fetchCancellation_b.Quote_Type="Trailer";
						cancellationID = fetchCancellation_b.ID;
						fetchCancellation_b.Crm_ID=getTrailerQuote.ID;
						fetchCancellation_b.Crm_Deal_ID=getTrailerQuote.Zoho_Crm_ID;
					}
					else
					{
						MigratedStatusList.add("Create Trailer Cancellation");
						createCancel_trailer = insert into Cancellation
						[
							Added_User=zoho.loginuser
							Policy_Number=getCancellation.Policy_Number
							Carrier=getTrailerQuote.Carrier
							Effective_Date=getTrailerQuote.Inception_Date
							Expiry_Date=getTrailerQuote.Expiry_Date
							Insured_Contact_Name=getTrailerQuote.Customer_ID
							Email_of_Insured=getTrailerQuote.Email
							Spoke_With="service_recprotect"
							Confirmed_Email_Phone=true
							Quote_Type="Trailer"
							Confirmed_Client=true
							Reason_for_Cancellation=reaonForCancellation
							Cancellation_Date=getCancellation.Cancellation_Date
							Crm_ID=getTrailerQuote.ID
							Crm_Deal_ID=getTrailerQuote.Zoho_Crm_ID
						];
						cancellationID = createCancel_trailer;
					}
					//--------- Policy status  field updation for Creator and CRM -----------
					getTrailerQuote.Policy_Status="INACTIVE - CANCELLED";
					policyMap_trailer = Map();
					policyMap_trailer.put("Policy_Status","INACTIVE - CANCELLED");
					policyMap_trailer.put("Cancellation",true);
					policyMap_trailer.put("Migration_Data_on","03/05/2024");
					updateCRMPolicy_trailer = zoho.crm.updateRecord("Deals",getTrailerQuote.Zoho_Crm_ID.toLong(),policyMap_trailer);
				}
				else
				{
					MigratedStatusList.add("No Trailer Quote");
					info "No Trailer Quote";
				}
				getCancellation.Quote_Type="Trailer";
			}
			else
			{
				MigratedStatusList.add("No Quote");
				info "No Policy Number";
			}
			getCancellation.Migrated=true;
			getCancellation.Cancellation_Record_ID=cancellationID;
			getCancellation.Migration_Status=MigratedStatusList;
		}
		c = c + 1;
	}
	info "c-----> " + c;
}