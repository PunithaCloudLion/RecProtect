if(input.Select_Charge_Type == "Send Payment/Deposit link")
    {
        show Generate_Payment_Link;
        show Payment_URL;
        disable Payment_URL;
    }
    else
    {
        hide Generate_Payment_Link;
        hide Payment_URL;
        input.Generate_Payment_Link = false;
    }
    