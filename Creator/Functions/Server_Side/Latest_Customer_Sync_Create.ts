void Server_Side.Latest_Customer_Sync_Create(int customer_id)
{
	try 
	{
		thisapp.Developer.addActivityLog("Server_Side.Latest_Customer_Sync_Create--" + customer_id.toString(),"Create Customer in server--" + customer_id.toString(),"Start","");
		customer_data = Customer[ID == customer_id];
		fetchEndPoint = API_Configuration[Name_Process == "Customer Sync to Webapp - Create or Update"].End_Point;
		if(customer_data.count() > 0)
		{
			actiontype = "CREATE";
			datamap = Map();
			bodymap = Map();
			datamap.put("action_type",actiontype);
			datamap.put("customer_type",ifNull(customer_data.Customer_Type,'Lead'));
			if(actiontype == "UPDATE")
			{
				datamap.put("customer_id",customer_data.Server_Customer_ID);
			}
			if(!isNull(customer_data.First_Name))
			{
				datamap.put("first_name",customer_data.First_Name);
			}
			if(!isNull(customer_data.Last_Name))
			{
				datamap.put("last_name",customer_data.Last_Name);
			}
			datamap.put("email",customer_data.Email);
			datamap.put("creator_record_id",customer_id.toString());
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
				datamap.put("dob",customer_data.DOB.toString("dd/MM/yyyy"));
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
			datamap.put("created_source","CREATOR");
			datamap.put("modified_source",customer_data.Modified_Source);
			datamap.put("is_migrated_record",customer_data.Migrated);
			//UPO data not needed in Create scenario
			// 		upoMap = Map();
			// 		upoMap.put("vqve",customer_data.UPO_Data);
			// 		datamap.put("upo_data",upoMap);
			//----------------------Sync to Server------------
			headerMap = Map();
			resp = thisapp.Server_Side.callServer("POST",fetchEndPoint,datamap);
			//	info "resp-->" + resp;
			if(resp.get("success") == "true")
			{
				customer_data.Server_Customer_ID=resp.get("data").get("customer_id");
				thisapp.Developer.addActivityLog("Server_Side.Latest_Customer_Sync_Create--" + customer_id.toString(),"Create Cusotmer in Server calling server ","Customer Create" + resp,"");
			}
			else
			{
				thisapp.Developer.addDeveloperLog(customer_id.tostring(),"Server_Side.Latest_Customer_Sync_Create:" + "Customer Sync","Customer ID-response",customer_id.tostring(),resp.toString(),"creator");
				if(resp.get("message") == "Customer with same email found.Use UPDATE instead of CREATE")
				{
					serverCustomerID = resp.get("data").get("customer_id");
					customer_data.Server_Customer_ID=resp.get("data").get("customer_id");
					thisapp.Server_Side.Latest_Customer_Sync_Update(input.customer_id);
				}
			}
		}
		thisapp.Developer.addActivityLog("Server_Side.Latest_Customer_Sync_Create--" + customer_id.toString(),"Function Call End ","","");
	}
	catch (e)
	{
		thisapp.Developer.addDeveloperLog(customer_id.tostring(),"Server_Side.Latest_Customer_Sync_Create:" + "Customer Sync","Customer Sync Create response",resp.tostring(),e,"creator");
	}
}