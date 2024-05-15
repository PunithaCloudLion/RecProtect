if(input.LPV_Document_status == "Signed")
    {
        show Cancellation_Approval_Status;
    }
    else
    {
        hide Cancellation_Approval_Status;
        input.Cancellation_Approval_Status = "";
    }
    if(input.LPV_Document_status == "Signed" && input.Cancellation_Approval_Status == "Approved")
    {
        show Payment_Status;
        show Payment_Date;
    }
    else
    {
        hide Payment_Status;
        hide Payment_Date;
        input.Payment_Status = "";
        input.Payment_Date = null;
    }
    