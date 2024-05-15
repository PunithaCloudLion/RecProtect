if(input.Where_was_the_new_trailer_purchased_from == "Dealer")
    {
        show Dealer_Info;
        hide Other;
        input.Dealer_Info = null;
    }
    else if(input.Where_was_the_new_trailer_purchased_from == "Other")
    {
        show Other;
        hide Dealer_Info;
        input.Other = null;
    }
    else if(input.Where_was_the_new_trailer_purchased_from == "Private Sale")
    {
        hide Other;
        hide Dealer_Info;
        input.Dealer_Info = null;
        input.Other = null;
    }
    else if(input.Where_was_the_new_trailer_purchased_from == "")
    {
        hide Other;
        hide Dealer_Info;
        input.Dealer_Info = null;
        input.Other = null;
    }
    