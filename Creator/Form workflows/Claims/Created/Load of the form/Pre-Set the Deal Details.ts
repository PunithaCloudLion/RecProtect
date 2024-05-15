hide Third_Party;
hide Addition_Information;
hide Manual_Entry_Fields;
hide Internal_Claim_Number;
hide Image;
hide Claim_Loss_Damage_Photos.Thumbnail_ID;
hide Claim_Loss_Damage_Photos.Download_URL;
if(input.Deal_Name != null && input.Deal_Name != "")
{
	get_CRMDeals = zoho.crm.getRecordById("Deals",input.Deal_Name.toLong());
	if(get_CRMDeals.size() > 0)
	{
		if(get_CRMDeals.get("Deal_Status") == "Policy")
		{
			input.Creator_Policy_ID = get_CRMDeals.get("Creator_ID").toString();
			input.Policy_Expiry_Date = get_CRMDeals.get("Expiry_Date");
			input.Policy_Effective_Date = get_CRMDeals.get("Effective_Date");
			input.Total_Payout = get_CRMDeals.get("Total");
			Policy_Type = null;
			if(get_CRMDeals.get("Layout").get("name") == "Boat Policy")
			{
				Policy_Type = "Property - Boat";
			}
			if(get_CRMDeals.get("Layout").get("name") == "Trailer Policy")
			{
				Policy_Type = "Property - Trailer";
			}
			input.Type_of_Policy = Policy_Type;
			if(get_CRMDeals.get("Policy_Number") != null && get_CRMDeals.get("Policy_Number") != "")
			{
				input.Policy_Number = get_CRMDeals.get("Policy_Number");
			}
			else
			{
				input.Policy_Number = "";
			}
			if(get_CRMDeals.get("Contact_Name") != null)
			{
				get_CRMContactResp = zoho.crm.getRecordById("Contacts",get_CRMDeals.get("Contact_Name").get("id").toLong());
				if(get_CRMContactResp.size() > 0)
				{
					if(get_CRMContactResp.get("Email") != null && get_CRMContactResp.get("Email") != "")
					{
						input.Email = get_CRMContactResp.get("Email");
						input.Contact_Name = get_CRMDeals.get("Contact_Name").get("name");
						input.Residence_Phone = get_CRMContactResp.get("Phone").toNumber();
						Insured1 = "";
						Insured1 = get_CRMDeals.get("Contact_Name").get("name");
						if(get_CRMDeals.get("Additional_Insured") != null)
						{
							Insured1 = Insured1 + ", " + get_CRMDeals.get("Additional_Insured").get("name");
						}
						if(get_CRMDeals.get("Additional_Insured_Name") != null)
						{
							Insured1 = Insured1 + ", " + get_CRMDeals.get("Additional_Insured_Name").get("name");
						}
						input.Insured_Name = Insured1;
						input.Address_Line1 = get_CRMContactResp.get("Mailing_Address");
						input.City = get_CRMContactResp.get("Mailing_City");
						input.State = get_CRMContactResp.get("Mailing_State");
						input.ZIP_Code = get_CRMContactResp.get("Mailing_Zip");
						input.Country = get_CRMContactResp.get("Mailing_Country");
						input.Person_to_Contact = get_CRMDeals.get("Contact_Name").get("name");
						if(get_CRMContactResp.get("Lienholders") == "Yes")
						{
							input.Lienholder_Mortgage_Other_insurance = get_CRMContactResp.get("Lienholders");
						}
						else
						{
							input.Lienholder_Mortgage_Other_insurance = "N/A";
						}
					}
				}
			}
			if(get_CRMDeals.get("Creator_ID") != null && get_CRMDeals.get("Creator_ID") != "")
			{
				get_BoatQuote = BoatQuote[ID == get_CRMDeals.get("Creator_ID").toLong()];
				if(get_BoatQuote.count() > 0)
				{
					CombineBoat_List = List();
					for each  boatres in get_BoatQuote.Boat
					{
						if(boatres.Select_the_type_of_watercraft != null && boatres.Boat_Model_Year != "")
						{
							CombineBoat_List.add(boatres.Select_the_type_of_watercraft + " - " + boatres.Boat_Model_Year);
						}
					}
					input.Select_Type_of_Boat_or_Trailer:ui.add(CombineBoat_List);
				}
				get_TrailerQuote = TrailerQuote[ID == get_CRMDeals.get("Creator_ID").toLong()];
				if(get_TrailerQuote.count() > 0)
				{
					CombineTrailer_List = List();
					for each  traileres in get_TrailerQuote.Trailer
					{
						if(traileres.Select_Trailer_Type != null && traileres.Trailer_Model_Year != null)
						{
							CombineTrailer_List.add(traileres.Select_Trailer_Type + " - " + traileres.Trailer_Model_Year);
						}
					}
					input.Select_Type_of_Boat_or_Trailer:ui.add(CombineTrailer_List);
				}
			}
		}
		else
		{
			alert "Claims only for Policy Deals, not Quote Deals";
		}
	}
}
else
{
	input.Policy_Number = "";
	input.Email = "";
	input.Contact_Name = "";
	input.Phone = "";
	input.Policy_Expiry_Date = null;
	input.Policy_Effective_Date = null;
	input.Total_Payout = "";
	input.Insurer_name = "";
	input.Address_Line1 = "";
	input.City = "";
	input.State = "";
	input.ZIP_Code = "";
	input.Country = "";
	input.Person_to_Contact = "";
	input.Lienholder_Mortgage_Other_insurance = "";
}
if(zoho.loginuser == "Public")
{
	hide Approved;
}
