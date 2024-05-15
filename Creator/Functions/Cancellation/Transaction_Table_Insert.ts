string Cancellation.Transaction_Table_Insert(int recid, float amount, int tax, string payment_id)
{
	try 
	{
		thisapp.Cancellation.Add_Audit_Log("Transaction Table Insert",recid.toString(),"","Transaction Table Record Create Function Starts");
		cancellationInfo = Cancellation[ID == recid];
		cancellation_commission_value = cancellationInfo.Return_Premium_Without_Tax;
		//	info cancellationInfo.Select_Charge_Type;
		if(cancellationInfo.Select_Charge_Type == "Manual")
		{
			tracking_of_creation_of_Charge = "Manual";
		}
		else if(cancellationInfo.Select_Charge_Type == "Auto Credit")
		{
			tracking_of_creation_of_Charge = "Auto-Credit";
		}
		//	info tracking_of_creation_of_Charge;
		get_product = Product[Product_Name == "Policy Cancellation"];
		if(get_product.count() > 0)
		{
			Product_Name = get_product.ID;
		}
		if(cancellationInfo.Quote_Type == "Trailer")
		{
			Policy_Type = "Trailer Policy";
		}
		else if(cancellationInfo.Quote_Type == "Boat")
		{
			Policy_Type = "Boat Policy";
		}
		getTax = Tax_Lists[ID == tax];
		itemcollection = Collection();
		row1 = Transaction_Table.Transaction_Details();
		row1.Product_Name=Product_Name;
		row1.Description="Policy Number :" + cancellationInfo.Policy_Number + " , Effective Date :" + cancellationInfo.Effective_Date + " , Expiry Date :" + cancellationInfo.Expiry_Date + " , Carrier :" + cancellationInfo.Carrier;
		row1.Amount=amount;
		row1.Tax=getTax.ID;
		row1.Tax_Amount=ifnull(amount,0) * ifnull(getTax.Tax,0) / 100;
		row1.Amount_With_Tax=amount + ifnull(amount,0) * ifnull(getTax.Tax,0) / 100;
		//-----------------Commission Calculation------------
		//-----------------Commission Calculation------------
		//--------------Policy Commission----------------
		get_policy_commission = Commissions_Configuration[Commision == "Commission on Policy"].Percent;
		policy_commsission = ifnull(cancellation_commission_value,0) * ifnull(get_policy_commission,0) / 100;
		row1.Commission_on_Policy=policy_commsission;
		//-------------Commission to Sales Rep----------------
		salesrepcommission = 0;
		//------------Check NB Business Source-----------
		if(cancellationInfo.Quote_Type == "Trailer")
		{
			get_trailer = TrailerQuote[Policy_Number == cancellationInfo.Policy_Number];
			if(get_trailer.count() > 0)
			{
				business_source = get_trailer.Business_Source;
			}
		}
		if(cancellationInfo.Quote_Type == "Boat")
		{
			get_boat = BoatQuote[Policy_Number == cancellationInfo.Policy_Number];
			if(get_boat.count() > 0)
			{
				business_source = get_boat.Business_Source;
			}
		}
		if(business_source == "SalesRep")
		{
			get_crm_owner = zoho.crm.getRecordById("Deals",cancellationInfo.Crm_Deal_ID.toLong());
			if(get_crm_owner.size() > 0)
			{
				owner_id = get_crm_owner.get("Owner").get("id");
				get_salesrep_commission = Commissions_for_Sales_Rep[Sales_Rep.CRM_ID == owner_id];
				if(get_salesrep_commission.count() > 0)
				{
					if(get_salesrep_commission.Select_Type_of_Commision == "Flat Rate")
					{
						salesrepcommission = get_salesrep_commission.Flat_Commision;
					}
					else
					{
						salesrepcommission = ifnull(cancellation_commission_value,0) * ifnull(get_salesrep_commission.Commission,0) / 100;
					}
					row1.Commission_to_SalesRep=salesrepcommission;
				}
			}
		}
		//-------------Commission with RecProtect---------------
		row1.Commission_with_RecProtect=ifnull(policy_commsission,0) - ifnull(salesrepcommission,0);
		//-----------------Commission Calculation End------------	
		//-----------------Commission Calculation End------------	
		//-----subform calc-----
		itemcollection.insert(row1);
		resp = insert into Transaction_Table
		[
			Policy_Number=cancellationInfo.Policy_Number
			Deal_Name=cancellationInfo.Crm_Deal_ID
			Customer_Name=cancellationInfo.Insured_Contact_Name
			Date_field=zoho.currentdate
			Business_Process="Policy Cancellation"
			Type_of_Transaction="Credit Note"
			Tracking_of_creation_of_Charge=tracking_of_creation_of_Charge
			Policy_Type=Policy_Type
			Total_Amount_Without_Tax=amount
			Tax_Amount=ifnull(amount,0) * ifnull(getTax.Tax,0) / 100
			Total_Amount_With_Tax=amount + ifnull(amount,0) * ifnull(getTax.Tax,0) / 100
			CRM_ID=cancellationInfo.Crm_Deal_ID
			Transaction_Details=itemcollection
			Payment_ID=payment_id
			Added_User=zoho.loginuser
		];
		thisapp.Cancellation.Add_Audit_Log("Transaction Table Insert",recid.toString(),resp.toString(),"Transaction Table Record Create Function Response");
	}
	catch (e)
	{
		thisapp.Developer.addDeveloperLog("Cancellation","Transaction_Table_Insert","Create Transaction for Credit Note",recid.toString(),e,"creator");
	}
	return resp;
}