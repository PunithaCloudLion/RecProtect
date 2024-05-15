if(input.Quote_Status == "Referral")
	{
		show row.Underwritting_Approved;
	}
	else
	{
		hide row.Underwritting_Approved;
	}

	new_List = List();
current_year = zoho.currentdate.getYear();
next_Year = current_year + 1;
new_List.add(next_Year);
//new_List.add(current_year);
numbers = {1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35};
for each  rec in numbers
{
	new_List.add(next_Year - rec);
}
row.Trailer_Model_Year:ui.add(new_List);
// fetchLeinholders = Lein_holder_Details[ID != null];
// LeinList = List();
// for each  lienHolders in fetchLeinholders
// {
// 	LeinList.add(lienHolders.Name_of_Financier);
// }
// info "name" + LeinList;
// row.Select_a_Financier:ui.add(LeinList);
