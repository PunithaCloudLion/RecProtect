if(input.Tax_Name != null)
    {
        input.Tax = input.Tax_Name.Tax_Percent;
        input.Books_ID = input.Tax_Name.Book_ID;
    }
    else
    {
        input.Tax = null;
        input.Books_ID = null;
    }
    