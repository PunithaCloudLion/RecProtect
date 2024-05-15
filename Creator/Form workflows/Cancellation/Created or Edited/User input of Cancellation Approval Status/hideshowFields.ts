// if(input.Cancellation_Approval_Status == "Approved")
// {
// 	show Calculate_Return_Premium;
// }
// else
// {
// 	hide Calculate_Return_Premium;
// }
if(input.LPV_Document_status == "Signed" && input.Cancellation_Approval_Status == "Approved")
    {
        hide Payment_Status;
        hide Payment_Date;
    }
    else
    {
        hide Payment_Status;
        hide Payment_Date;
        input.Payment_Status = "";
        input.Payment_Date = null;
    }
    