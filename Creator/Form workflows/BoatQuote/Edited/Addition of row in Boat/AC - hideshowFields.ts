new_List = List();
current_year = zoho.currentdate.getYear();
next_Year = current_year + 1;
new_List.add(next_Year);
//new_List.add(current_year);
numbers = {1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30};
for each  rec in numbers
{
	new_List.add(next_Year - rec);
}
row.Boat_Model_Year:ui.add(new_List);
year_List = List();
year_List.add(next_Year);
numbers = {1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35};
for each  rec in numbers
{
	year_List.add(next_Year - rec);
}
// row.Model_Year:ui.add(year_List);
// row.Model_Year1:ui.add(year_List);
// row.Trailer_Model_Year:ui.add(year_List);
// row.Tender_Model_Year:ui.add(year_List);
// row.Aux_Engine_Model_Year:ui.add(year_List);
if(input.Quote_Status == "Referral")
{
	show row.Underwritting_Approved;
}
else
{
	hide row.Underwritting_Approved;
}
