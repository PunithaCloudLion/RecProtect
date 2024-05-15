void CRM.Sync_slavecustomer()
{
	getslavecustomer = Slave_Customer[ID == 4564627000000399807];
	//	info getslavecustomer.count();
	// 	getcustomer = Customer[ID != null && Slave_Customer_ID != ""];
	// 		info getcustomer.count();
	c = 0;
	for each  slave_rec in getslavecustomer
	{
		//	info "slaveID----->" + slave_rec;
		getcustom = Customer[Email == slave_rec.Email];
		//	info getcustom.ID;
		if(getcustom.count() > 0)
		{
			c = c + 1;
			//	info "customerID---->" + getcustom.ID;
			getcustom.First_Name=slave_rec.First_Name;
			getcustom.Last_Name=slave_rec.Last_Name;
			getcustom.Email=slave_rec.Email;
			getcustom.Phone_Number=slave_rec.Phone_Number;
			getcustom.DOB=slave_rec.DOB;
			getcustom.Where_Did_You_Find_Us=slave_rec.Where_Did_You_Find_Us;
			getcustom.Name=slave_rec.Name;
			getcustom.Name_of_Dealership=slave_rec.Name_of_Dealership;
			getcustom.Name_of_Campground=slave_rec.Name_of_Campground;
			getcustom.Name_of_Marina=slave_rec.Name_of_Marina;
			getcustom.Tell_us_more=slave_rec.Tell_us_more;
			getcustom.Customer_Type=slave_rec.Customer_Type;
			getcustom.Address_Line1=slave_rec.Address_Line1;
			getcustom.Address_Line2=slave_rec.Address_Line2;
			getcustom.City=slave_rec.City;
			getcustom.Province=slave_rec.Province;
			getcustom.Country=slave_rec.Country;
			getcustom.Postal_Code=slave_rec.Postal_Code;
			getcustom.Workdrive_Folder_ID=slave_rec.Workdrive_Folder_ID;
			getcustom.Workdrive_URL=slave_rec.Workdrive_URL;
			getcustom.Zoho_Crm_ID=slave_rec.Zoho_Crm_ID;
			getcustom.Migrated=true;
			getcustom.UpdatedUsingSlaveData=true;
			getcustom.Boat_Migration_ID=slave_rec.Boat_Migration_ID;
			getcustom.Trailer_Migration_ID=slave_rec.Trailer_Migration_ID;
			getcustom.Contact_Type=slave_rec.Contact_Type;
			getcustom.Slave_Customer_ID=slave_rec.ID;
			if(slave_rec.Zoho_Crm_ID != null)
			{
				fetchLayout = Layout[Layout_Name == "Client Layout"];
				//client Layout
				customerMap = Map();
				layoutid = Map();
				layoutid.put("id",fetchLayout.Layout_ID.tolong());
				customerMap.put("Layout",layoutid);
				customerMap.put("First_Name",slave_rec.First_Name);
				customerMap.put("Last_Name",slave_rec.Last_Name);
				customerMap.put("Date_of_Birth",slave_rec.DOB);
				customerMap.put("Phone",slave_rec.Phone_Number);
				customerMap.put("Email",slave_rec.Email);
				customerMap.put("Mailing_Address",slave_rec.Address_Line1);
				customerMap.put("Mailing_Street",slave_rec.Address_Line2);
				customerMap.put("Mailing_City",slave_rec.City);
				customerMap.put("Mailing_Country",slave_rec.Country);
				customerMap.put("Mailing_State",slave_rec.Province);
				customerMap.put("Mailing_Zip",slave_rec.Postal_Code);
				customerMap.put("Status1","Active");
				if(slave_rec.Where_Did_You_Find_Us == "Friend or Family")
				{
					customerMap.put("Referral_Type","Friend or Family");
					customerMap.put("Referral_Friend",slave_rec.Name);
				}
				else if(slave_rec.Where_Did_You_Find_Us == "Dealership")
				{
					customerMap.put("Referral_Type","Dealership");
					customerMap.put("Referral_Friend",slave_rec.Name_of_Dealership);
				}
				else if(slave_rec.Where_Did_You_Find_Us == "Campground")
				{
					customerMap.put("Referral_Type","Campground");
					customerMap.put("Referral_Friend",slave_rec.Name_of_Campground);
				}
				else if(slave_rec.Where_Did_You_Find_Us == "Marina")
				{
					customerMap.put("Referral_Type","Marina");
					customerMap.put("Referral_Friend",slave_rec.Name_of_Marina);
				}
				else if(slave_rec.Where_Did_You_Find_Us == "Other")
				{
					customerMap.put("Referral_Type","Other");
					customerMap.put("Referral_Friend",slave_rec.Tell_us_more);
				}
				else
				{
					customerMap.put("Referral_Friend",slave_rec.Where_Did_You_Find_Us);
				}
				customerMap.put("Workdrive_Folder_ID",slave_rec.Workdrive_Folder_ID);
				customerMap.put("Workdrive_URL",slave_rec.Workdrive_URL);
				// 			customerMap.put("Referral_Type","Active");
				customerMap.put("Zoho_Creator_ID",getcustom.ID.tostring());
				if(slave_rec.Zoho_Crm_ID != null && slave_rec.Zoho_Crm_ID != "")
				{
					// 				update
					updateRes = zoho.crm.updateRecord("Contacts",slave_rec.Zoho_Crm_ID.tolong(),customerMap,{"trigger":{"workflow"}});
				}
			}
		}
		else
		{
			//	info slave_rec;
			//	info "not matched";
		}
	}
	//	info c;
}