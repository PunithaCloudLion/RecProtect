if(input.Status == "1st follow-up mail sent")
    {
        input.First_Status_Update_Time = zoho.currenttime;
        input.Last_Status_Update_Time = zoho.currenttime;
    }
    if(input.Status == "2nd follow-up mail sent" || input.Status == "3rd follow-up mail sent" || input.Status == "Manual follow-up mail sent" || input.Status == "Payment Updated")
    {
        input.Last_Status_Update_Time = zoho.currenttime;
    }
    