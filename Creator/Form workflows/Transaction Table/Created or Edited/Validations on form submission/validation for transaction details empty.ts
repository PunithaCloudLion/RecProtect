if(input.Transaction_Details == null || input.Transaction_Details.Amount == null)
    {
        alert "Please select the Transaction Details line items";
        cancel submit;
    }
    