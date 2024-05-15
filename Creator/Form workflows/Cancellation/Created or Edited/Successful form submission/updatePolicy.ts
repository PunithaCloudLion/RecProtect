//------------Check Tax Percent-----------
if(input.Quote_Type == "Trailer")
    {
        get_trailer = TrailerQuote[Policy_Number == input.Policy_Number];
        if(get_trailer.count() > 0)
        {
            if(get_trailer.Tax_Precent != input.Tax_Precent)
            {
                input.Payment_Status = "Failed - Tax Percent Mismatch";
            }
        }
    }
    else if(input.Quote_Type == "Boat")
    {
        get_boat = BoatQuote[Policy_Number == input.Policy_Number];
        if(get_boat.count() > 0)
        {
            if(get_boat.Tax_Precent != input.Tax_Precent)
            {
                input.Payment_Status = "Failed - Tax Percent Mismatch";
            }
        }
    }
    //------------Check Tax Percent End-----------
    updateMap = Map();
    if(input.Update_Email != null && input.Update_Email != "")
    {
        if(input.Insured_Contact_Name != null)
        {
            fetchCusotmer = Customer[ID == input.Insured_Contact_Name];
            if(fetchCusotmer.count() > 0)
            {
                fetchCusotmer.Email=input.Update_Email;
                updateMap.put("Email",input.Update_Email);
                // Code Command by Vasanth
                // Date: 06/05/2024
                // 			if(fetchCusotmer.Zoho_Crm_ID != "" && fetchCusotmer.Zoho_Crm_ID != null)
                // 			{
                // 				thisapp.CRM.CustomertoContactCrmSyncUpdate(input.Insured_Contact_Name.ID,input.Crm_Deal_ID.toLong());
                // 			}
                // 			else
                // 			{
                // 				thisapp.CRM.CustomertoContactCrmSyncCreate(input.Insured_Contact_Name.ID);
                // 			}
            }
        }
    }
    if(input.Update_Phone != null && input.Update_Phone != "")
    {
        if(input.Insured_Contact_Name != null)
        {
            fetchCusotmer = Customer[ID == input.Insured_Contact_Name];
            if(fetchCusotmer.count() > 0)
            {
                fetchCusotmer.Phone_Number=input.Update_Phone;
                updateMap.put("Phone",input.Update_Phone);
                // Code Command by Vasanth
                // Date: 06/05/2024
                // 			if(fetchCusotmer.Zoho_Crm_ID != "" && fetchCusotmer.Zoho_Crm_ID != null)
                // 			{
                // 				thisapp.CRM.CustomertoContactCrmSyncUpdate(input.Insured_Contact_Name.ID,input.Crm_Deal_ID.toLong());
                // 			}
                // 			else
                // 			{
                // 				thisapp.CRM.CustomertoContactCrmSyncCreate(input.Insured_Contact_Name.ID);
                // 			}
            }
        }
    }
    fetchCusotmer = Customer[ID == input.Insured_Contact_Name];
    if(fetchCusotmer.Zoho_Crm_ID != null && fetchCusotmer.Zoho_Crm_ID != "")
    {
        update_crm = zoho.crm.updateRecord("Contacts",fetchCusotmer.Zoho_Crm_ID.toLong(),updateMap);
    }
    /*
    Reason :Below Action are configured in button action
    Code Command by Vasanth
    Date: 22/03/2024
    */
    /*
    if(input.Cancellation_Approval_Status == "Approved")
    {
        if(input.Crm_ID != null)
        {
            if(input.Quote_Type == "Trailer")
            {
                fetchTrailer = TrailerQuote[ID == input.Crm_ID.tolong()];
                if(fetchTrailer.count() > 0)
                {
                    fetchTrailer.Policy_Status="INACTIVE - CANCELLED";
                    updateMap = Map();
                    updateMap.put("Policy_Status","INACTIVE - CANCELLED");
                    updateRes = zoho.crm.updateRecord("Deals",fetchTrailer.Zoho_Crm_ID.tolong(),updateMap);
                }
            }
            else
            {
                fetchBoat = BoatQuote[ID == input.Crm_ID.tolong()];
                if(fetchBoat.count() > 0)
                {
                    fetchBoat.Policy_Status="INACTIVE - CANCELLED";
                    updateMap = Map();
                    updateMap.put("Policy_Status","INACTIVE - CANCELLED");
                    updateRes = zoho.crm.updateRecord("Deals",fetchBoat.Zoho_Crm_ID.tolong(),updateMap);
                }
            }
        }
    }
    if(input.Payment_Status == "Paid")
    {
        if(input.Crm_ID != null)
        {
            if(input.Quote_Type == "Trailer")
            {
                fetchTrailer = TrailerQuote[ID == input.Crm_ID.tolong()];
                if(fetchTrailer.count() > 0)
                {
                    fetchTrailer.Policy_Status="INACTIVE - CANCELLED";
                    updateMap = Map();
                    updateMap.put("Policy_Status","INACTIVE - CANCELLED");
                    updateRes = zoho.crm.updateRecord("Deals",fetchTrailer.Zoho_Crm_ID.tolong(),updateMap);
                }
            }
            else
            {
                fetchBoat = BoatQuote[ID == input.Crm_ID.tolong()];
                if(fetchBoat.count() > 0)
                {
                    fetchBoat.Policy_Status="INACTIVE - CANCELLED";
                    updateMap = Map();
                    updateMap.put("Policy_Status","INACTIVE - CANCELLED");
                    updateRes = zoho.crm.updateRecord("Deals",fetchBoat.Zoho_Crm_ID.tolong(),updateMap);
                }
            }
        }
    }
    */
    openUrl("https://crm.zoho.com/crm/org810798353/tab/Potentials/" + input.Crm_Deal_ID.tolong(),"same window");
    