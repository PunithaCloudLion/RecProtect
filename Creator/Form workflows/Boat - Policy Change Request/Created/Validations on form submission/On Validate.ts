if(input.Select_Type != null && input.Select_Type != "")
	{
		if(input.Are_there_any_additional_names_on_the_boat_ownership == "Yes")
		{
			addcount = 0;
			for each  eachcustomer in input.Additional_Names
			{
				addcount = addcount + 1;
			}
			if(addcount == 0)
			{
				alert "Please give the Additional names atleast one";
				cancel submit;
			}
		}
		if(input.Additional_Names != null)
		{
			for each  customers in input.Additional_Names
			{
				if(customers.Customer_ID == null && customers.Additional_Insured_First_Name == null)
				{
					alert "Please Enter Additional insured First Name for ";
					cancel submit;
				}
			}
		}
		count = 0;
		mailsent = false;
		if(input.Boat != null)
		{
			for each  boatSubform in input.Boat
			{
				count = count + 1;
				newmap = boatSubform.Old_Data_of_Trailer_Tender_Aux.toMap();
				if(newmap.get("Add_a_trailer") != boatSubform.Add_a_trailer)
				{
					mailsent = true;
				}
				if(newmap.get("Trailer_Serial") != boatSubform.Trailer_Serial)
				{
					mailsent = true;
				}
				if(newmap.get("Trailer_Value") != boatSubform.Trailer_Value)
				{
					mailsent = true;
				}
				if(newmap.get("Trailer_Model_Year") != boatSubform.Trailer_Model_Year)
				{
					mailsent = true;
				}
				if(newmap.get("Trailer_Manufacturer") != boatSubform.Trailer_Manufacturer)
				{
					mailsent = true;
				}
				if(newmap.get("Trailer_VIN") != boatSubform.Trailer_VIN)
				{
					mailsent = true;
				}
				if(newmap.get("Trailer_Length") != boatSubform.Trailer_Length)
				{
					mailsent = true;
				}
				if(newmap.get("Add_a_tender") != boatSubform.Add_a_tender)
				{
					mailsent = true;
				}
				if(newmap.get("Tender_Value") != boatSubform.Tender_Value)
				{
					mailsent = true;
				}
				if(newmap.get("Tender_Model_Year") != boatSubform.Tender_Model_Year)
				{
					mailsent = true;
				}
				if(newmap.get("Tender_Manufacturer") != boatSubform.Tender_Manufacturer)
				{
					mailsent = true;
				}
				if(newmap.get("Tender_Serial") != boatSubform.Tender_Serial)
				{
					mailsent = true;
				}
				if(newmap.get("Tender_Length") != boatSubform.Tender_Length)
				{
					mailsent = true;
				}
				if(newmap.get("Add_an_auxiliary_motor") != boatSubform.Add_an_auxiliary_motor)
				{
					mailsent = true;
				}
				if(newmap.get("Aux_Engine_Value") != boatSubform.Aux_Engine_Value)
				{
					mailsent = true;
				}
				if(newmap.get("Aux_Engine_Model_Year") != boatSubform.Aux_Engine_Model_Year)
				{
					mailsent = true;
				}
				if(newmap.get("Aux_Engine_Manufacturer") != boatSubform.Aux_Engine_Manufacturer)
				{
					mailsent = true;
				}
				if(newmap.get("Auxiliary_Engine_Serial") != boatSubform.Auxiliary_Engine_Serial)
				{
					mailsent = true;
				}
				if(newmap.get("Aux_Engine_HP_Thrust") != boatSubform.Aux_Engine_HP_Thrust)
				{
					mailsent = true;
				}
			}
		}
		if(mailsent == true)
		{
			emailConfigure = Email_Configuration[Process == "Boat - Re-asses Value"];
			recDefault = thisapp.General.emailFormation(emailConfigure.Email_Data.trim(),"Boat",input.ID);
			sendmail
			[
				from :zoho.adminuserid
				to :recDefault
				cc:"service@recprotect.ca"
				subject :emailConfigure.Subject_field
				message :"Hi Team,<p>Kindly reassess the Policy - " + input.Policy_Number + " as there are changes done to Trailer/Aux/Tender. <p><a href=https://crm.zoho.com/crm/org810798353/tab/Potentials/" + input.Zoho_Crm_ID + ">View Deal</a></p><p>Thanks.</p>"
			]
		}
		if(input.Please_select_the_province_your_boat_is_used_in == "" || input.Please_select_the_province_your_boat_is_used_in == null)
		{
			alert(Please_select_the_province_your_boat_is_used_in,"Please enter the value");
			cancel submit;
		}
		if(input.How_many_boats_would_you_like_to_insure == "" || input.How_many_boats_would_you_like_to_insure == null)
		{
			alert(How_many_boats_would_you_like_to_insure,"Please enter the value");
			cancel submit;
		}
		if(input.How_many_boats_would_you_like_to_insure == "1" && count > 1)
		{
			alert "Sorry but only 1 row allowed in Boat";
			cancel submit;
		}
		else if(input.How_many_boats_would_you_like_to_insure == "2" && count > 2)
		{
			alert "Sorry but only 2 row allowed in Boat";
			cancel submit;
		}
		else if(input.How_many_boats_would_you_like_to_insure == "3" && count > 3)
		{
			alert "Sorry but only 3 row allowed in Boat";
			cancel submit;
		}
		else if(input.How_many_boats_would_you_like_to_insure == "4" && count > 4)
		{
			alert "Sorry but only 4 row allowed in Boat";
			cancel submit;
		}
		else if(input.How_many_boats_would_you_like_to_insure == "5" && count > 5)
		{
			alert "Sorry but only 5 row allowed in Boat";
			cancel submit;
		}
		//---------------------Effective Date Validation----------------
		effective_date_higher = zoho.currentdate.addDay(30);
		effective_date_lesser = zoho.currentdate.subDay(14);
		if(input.Effective_Date > effective_date_higher)
		{
			alert "Invalid Effective Date";
			cancel submit;
		}
		else if(input.Effective_Date < effective_date_lesser)
		{
			alert "Invalid Effective Date";
			cancel submit;
		}
		//----------code added by nambi for additional insured validation
		FirstName = List();
		LastName = List();
		Email_list = List();
		for each  rec in input.Additional_Names
		{
			if(rec.Additional_Insured_First_Name != "" && rec.Additional_Insured_First_Name != null)
			{
				FirstName.add(rec.Additional_Insured_First_Name.toLowerCase());
			}
			if(rec.Additional_Insured_Last_Name != "" && rec.Additional_Insured_Last_Name != null)
			{
				LastName.add(rec.Additional_Insured_Last_Name.toLowerCase());
			}
			if(rec.Email != "" && rec.Email != null)
			{
				Email_list.add(rec.Email);
			}
		}
		distinct_firstname = FirstName.distinct();
		distinct_lastname = LastName.distinct();
		distinct_email = Email_list.distinct();
		if(distinct_firstname.size() != FirstName.size() && distinct_lastname.size() != LastName.size() && distinct_email.size() != Email_list.size())
		{
			alert "Duplicate Additional Insured Cannot Be Accepted!!";
			cancel submit;
		}
		if(distinct_email.size() != Email_list.size())
		{
			alert "Duplicates Additional Insured Email Cannot Be Accepted!!";
			cancel submit;
		}
	}
	else
	{
		alert "Please Choose Premium Generating Type";
		cancel submit;
	}
	