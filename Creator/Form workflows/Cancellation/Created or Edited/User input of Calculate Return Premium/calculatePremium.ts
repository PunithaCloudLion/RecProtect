if(input.Calculate_Return_Premium == true)
    {
        if(input.Crm_ID != null)
        {
            if(input.Quote_Type == "Trailer")
            {
                fetchTrailer = TrailerQuote[ID == input.Crm_ID.tolong()];
                if(fetchTrailer.count() > 0)
                {
                    // --------- Cancellation Premium Catelyst API - Start -------
                    fetchEndPoint = API_Configuration[Name_Process == "Cancellation Premium - Trailer"].End_Point;
                    daysDiff = daysBetween(input.Effective_Date,input.Expiry_Date);
                    daysRisk = daysBetween(input.Effective_Date,input.Cancellation_Date);
                    taxPrecent = ifnull(fetchTrailer.Tax_Precent,0);
                    parammap = Map();
                    parammap.put("organization_id",thisapp.Server_Side.org_info());
                    if(input.Select_Rate == "Short-Rate")
                    {
                        parammap.put("cancellation_type","ShortRate");
                    }
                    else if(input.Select_Rate == "Pro-Rate")
                    {
                        parammap.put("cancellation_type","ProRate");
                    }
                    parammap.put("paid_premium",ifnull(fetchTrailer.Total_Premium_before_tax,0));
                    parammap.put("no_of_days",ifnull(daysDiff,0));
                    parammap.put("days_on_risk",ifnull(daysRisk,0));
                    parammap.put("tax_percent",taxPrecent);
                    trailerPostData = thisapp.Server_Side.callServer("POST",fetchEndPoint,parammap);
                    // --------- Cancellation Premium Catelyst API - End -------
                    if(trailerPostData.get("success") == "true")
                    {
                        input.Tax_Province = fetchTrailer.Tax_Province;
                        input.Return_Permium = trailerPostData.get("data").get("return_premium");
                        input.Return_Premium_Without_Tax = trailerPostData.get("data").get("returnPremium_bf_tax");
                        input.Tax_Amount = trailerPostData.get("data").get("tax");
                        input.Tax_Precent = trailerPostData.get("data").get("tax_percent");
                        if(trailerPostData.get("data").get("return_premium") != 0 && trailerPostData.get("data").get("return_premium") != null)
                        {
                            input.Premium_Payable = "-" + input.Return_Permium;
                        }
                    }
                }
            }
            else
            {
                fetchBoat = BoatQuote[ID == input.Crm_ID.tolong()];
                if(fetchBoat.count() > 0)
                {
                    // --------- Cancellation Premium Catelyst API Boat - Start -------
                    fetchEndPoint = API_Configuration[Name_Process == "Cancellation Premium - Boat"].End_Point;
                    daysDiff = daysBetween(input.Effective_Date,input.Expiry_Date);
                    daysRisk = daysBetween(input.Effective_Date,input.Cancellation_Date);
                    taxPrecent = ifnull(fetchBoat.Tax_Precent,0);
                    parammap = Map();
                    parammap.put("organization_id",thisapp.Server_Side.org_info());
                    if(input.Select_Rate == "Short-Rate")
                    {
                        parammap.put("cancellation_type","ShortRate");
                    }
                    else if(input.Select_Rate == "Pro-Rate")
                    {
                        parammap.put("cancellation_type","ProRate");
                    }
                    parammap.put("paid_premium",ifnull(fetchBoat.Total_Premium_before_tax,0));
                    parammap.put("no_of_days",ifnull(daysDiff,0));
                    parammap.put("days_on_risk",ifnull(daysRisk,0));
                    parammap.put("tax_percent",taxPrecent);
                    boatPostData = thisapp.Server_Side.callServer("POST",fetchEndPoint,parammap);
                    info boatPostData;
                    info parammap;
                    // --------- Cancellation Premium Catelyst API - End -------
                    if(boatPostData.get("success") == "true")
                    {
                        input.Tax_Province = fetchBoat.Tax_Province;
                        input.Return_Permium = boatPostData.get("data").get("return_premium");
                        input.Return_Premium_Without_Tax = boatPostData.get("data").get("returnPremium_bf_tax");
                        input.Tax_Amount = boatPostData.get("data").get("tax");
                        input.Tax_Precent = boatPostData.get("data").get("tax_percent");
                        if(boatPostData.get("data").get("return_premium") != 0 && boatPostData.get("data").get("return_premium") != null)
                        {
                            input.Premium_Payable = "-" + input.Return_Permium;
                        }
                    }
                }
            }
        }
        input.Calculate_Return_Premium = false;
    }
    //input.Calculate_Return_Premium = false;
    // else
    // {
    // 	input.Return_Permium = null;
    // 	input.Premium_Payable = "";
    // 	input.Return_Premium_Without_Tax = null;
    // 	input.Tax_Amount = null;
    // 	input.Tax_Precent = null;
    // }
    