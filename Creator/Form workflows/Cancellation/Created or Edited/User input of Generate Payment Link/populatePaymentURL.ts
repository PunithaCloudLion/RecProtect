if(input.Generate_Payment_Link == true)
    {
        if(input.Crm_ID != null)
        {
            if(input.Quote_Type == "Trailer")
            {
                fetchEndPoint = API_Configuration[Name_Process == "Cancellation Payment Url - Trailer"].End_Point;
                fetchTrailer = TrailerQuote[ID == input.Crm_ID.tolong()];
                if(fetchTrailer.count() > 0)
                {
                    paramMapp = Map();
                    paymentMap = Map();
                    paymentMap.put("total_premium",if(fetchTrailer.Total_Premium_before_tax != null,fetchTrailer.Total_Premium_before_tax,0));
                    paymentMap.put("total_tax",if(fetchTrailer.Tax != null,fetchTrailer.Tax,0));
                    paymentMap.put("admin_fee",if(fetchTrailer.Fee != null,fetchTrailer.Fee,0));
                    paramMapp.put("amount_payable",paymentMap);
                    paramMapp.put("trailer_quote_record_id",fetchTrailer.Quote_Record_ID_Server);
                    uniqID = if(fetchTrailer.Policy_Number != null,fetchTrailer.Policy_Number,fetchTrailer.Quote_ID);
                    paramMapp.put("unique_id",uniqID);
                    paramMapp.put("payment_for","Cancellation");
                    paramMapp.put("payment_type","Debit To Company");
                    paramMapp.put("payment_method","Credit Card");
                    //--#Doubt - How to Pass Value for This
                    paramMapp.put("organization_id",thisapp.Server_Side.org_info());
                    if(!isNull(fetchTrailer.Customer_ID))
                    {
                        if(!isNull(fetchTrailer.Customer_ID.Server_Customer_ID))
                        {
                            paramMapp.put("customer_id",fetchTrailer.Customer_ID.Server_Customer_ID);
                        }
                    }
                    resp = thisapp.Server_Side.callServer("POST",fetchEndPoint,paramMapp);
                }
            }
            else
            {
                fetchEndPoint = API_Configuration[Name_Process == "Cancellation Payment Url - Boat"].End_Point;
                fetchBoat = BoatQuote[ID == input.Crm_ID.tolong()];
                if(fetchBoat.count() > 0)
                {
                    paymentMap = Map();
                    paramMapp = Map();
                    paymentMap.put("total_premium",if(fetchBoat.Total_Premium_before_tax != null,fetchBoat.Total_Premium_before_tax,0));
                    paymentMap.put("total_tax",if(fetchBoat.Tax != null,fetchBoat.Tax,0));
                    paymentMap.put("admin_fee",if(fetchBoat.Fee != null,fetchBoat.Fee,0));
                    paramMapp.put("amount_payable",paymentMap);
                    if(!isNull(fetchBoat.Quote_Record_ID_Server))
                    {
                        paramMapp.put("boat_quote_record_id",fetchBoat.Quote_Record_ID_Server);
                    }
                    uniqID = if(fetchBoat.Policy_Number != null && fetchBoat.Policy_Number != "",fetchBoat.Policy_Number,fetchBoat.Quote_ID);
                    paramMapp.put("unique_id",uniqID);
                    paramMapp.put("payment_for","Cancellation");
                    paramMapp.put("payment_type","Debit To Company");
                    paramMapp.put("payment_method","Credit Card");
                    //--#Doubt - How to Pass Value for This
                    paramMapp.put("organization_id",thisapp.Server_Side.org_info());
                    if(!isNull(fetchBoat.Customer_ID))
                    {
                        if(!isNull(fetchBoat.Customer_ID.Server_Customer_ID))
                        {
                            paramMapp.put("customer_id",fetchBoat.Customer_ID.Server_Customer_ID);
                        }
                    }
                    resp = thisapp.Server_Side.callServer("POST",fetchEndPoint,paramMapp);
                }
            }
        }
    }
    