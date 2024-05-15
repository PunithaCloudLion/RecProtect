void Migration_to_Server.Customer_Migrate()
{
	//customerall = Customer[Migrated == true && Migrated_to_Server != true] range from 0 to 50;
	customerall = Customer[ID == 4564627000002145767];
	count = 0;
	if(customerall.count() > 0)
	{
		for each  customer_data in customerall
		{
			count = count + 1;
			datamap = Map();
			bodymap = Map();
			datamap.put("action_type","CREATE");
			// 		if(actiontype == "UPDATE")
			// 		{
			// 			datamap.put("customer_id",customer_data.Server_Customer_ID);
			// 		}
			datamap.put("creator_record_id",customer_data.ID.toString());
			datamap.put("customer_type","Contact");
			datamap.put("email",customer_data.Email);
			if(!isNull(customer_data.First_Name))
			{
				datamap.put("first_name",customer_data.First_Name);
			}
			if(!isNull(customer_data.Last_Name))
			{
				datamap.put("last_name",customer_data.Last_Name);
			}
			if(!isNull(customer_data.Phone_Number))
			{
				datamap.put("phone",customer_data.Phone_Number);
				if(customer_data.Phone_Number.contains("+1") == true)
				{
					datamap.put("phone",customer_data.Phone_Number.getSuffix("+1"));
				}
			}
			if(!isNull(customer_data.DOB))
			{
				datamap.put("dob",customer_data.DOB);
			}
			if(!isNull(customer_data.Where_Did_You_Find_Us))
			{
				datamap.put("where_you_find_us",customer_data.Where_Did_You_Find_Us);
			}
			if(customer_data.Where_Did_You_Find_Us == "Friend or Family")
			{
				datamap.put("friend_option_name",customer_data.Name);
			}
			if(customer_data.Where_Did_You_Find_Us == "Dealership")
			{
				datamap.put("dealership_option_name",customer_data.Name_of_Dealership);
			}
			if(customer_data.Where_Did_You_Find_Us == "Campground")
			{
				datamap.put("campground_option_name",customer_data.Name_of_Campground);
			}
			if(customer_data.Where_Did_You_Find_Us == "Marina")
			{
				datamap.put("marina_option_name",customer_data.Name_of_Marina);
			}
			if(customer_data.Where_Did_You_Find_Us == "Other")
			{
				datamap.put("others_option_name",customer_data.Tell_us_more);
			}
			if(!isNull(customer_data.Address_Line1))
			{
				datamap.put("mailing_address_line1",customer_data.Address_Line1);
			}
			if(!isNull(customer_data.Address_Line2))
			{
				datamap.put("mailing_address_line2",customer_data.Address_Line2);
			}
			if(!isNull(customer_data.City))
			{
				datamap.put("mailing_city",customer_data.City);
			}
			if(!isNull(customer_data.Province))
			{
				datamap.put("mailing_province",customer_data.Province);
			}
			if(!isNull(customer_data.Postal_Code))
			{
				datamap.put("mailing_postalcode",customer_data.Postal_Code);
			}
			if(!isNull(customer_data.Country))
			{
				datamap.put("mailing_country",customer_data.Country);
			}
			if(customer_data.UPO_Data != null)
			{
				datamap.put("upo_data",customer_data.UPO_Data);
			}
			datamap.put("created_source","CREATOR");
			datamap.put("is_migrated_record",customer_data.Migrated);
			//		info datamap;
			headerMap = Map();
			headerMap.put("Content-Type","application/json");
			resp = invokeurl
			[
				url :"https://recprotectbackend-10073292108.development.catalystappsail.com/recprotect/api/customer/create_or_update_customer_data_from_creators"
				type :POST
				parameters:datamap.toString()
				headers:headerMap
			];
			//		info resp;
			if(resp.get("success") == "true")
			{
				customer_data.Server_Customer_ID=resp.get("data").get("customer_id");
				customer_data.Migrated_to_Server=true;
				//			info "Success";
			}
			else
			{
				customer_data.Server_Migrated_Error_Resp=resp.toString();
				//			info "Error";
			}
			//		info customer_data.Server_Customer_ID;
			//		info "End----" + count;
		}
		//		info count;
	}
}