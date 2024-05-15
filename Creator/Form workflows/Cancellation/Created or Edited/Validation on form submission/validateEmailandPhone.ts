if(input.Update_Email != "" && input.Update_Email != null)
    {
        Coremail = input.Update_Email.trim();
        emailAdd = Coremail.replaceAll("^[A-Za-z0-9._-]+@[A-Za-z0-9._-]+\.[A-Za-z]{2,}$","valid");
        if(emailAdd != "valid")
        {
            alert "Email not in correct format";
            cancel submit;
        }
    }
    if(input.Update_Phone != "" && input.Update_Phone != null)
    {
        if(input.Update_Phone.length() != 10)
        {
            alert "Enter Phone in Correct Format";
            cancel submit;
        }
        if(input.Update_Phone.isNumber() == false)
        {
            alert "Enter Phone in Correct Format";
            cancel submit;
        }
    }
    