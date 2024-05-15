if(input.Effective_Date != null)
    {
        nextDay = zoho.currentdate.addDay(30);
        if(input.Effective_Date < zoho.currentdate || input.Effective_Date > nextDay)
        {
            input.Effective_Date = null;
            alert "Please Enter Correct Date";
        }
    }
    