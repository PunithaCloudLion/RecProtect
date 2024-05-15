tax = 0;
if(input.Override_Tax_by_Admin == "Yes" && input.Override_Tax != null)
{
	f_tax = Tax_Lists[ID == input.Override_Tax];
	tax = ifnull(f_tax.Tax,0);
}
else
{
	fetchTax = Tax_Lists[State_Province == input.Please_select_the_province_your_boat_is_used_in];
	tax = ifnull(fetchTax.Tax,0);
}
premiumTotal = 0;
for each  premium in input.Boat
{
	premiumTotal = premiumTotal + ifnull(premium.Premium_Per_Year,0);
}
fetchAdminFeePer = Commissions_Configuration[Commision == "Policy Change - Admin Fee"];
if(fetchAdminFeePer.count() > 0)
{
	input.New_Admin_Fee = ifnull(premiumTotal,0) * ifnull(fetchAdminFeePer.Percent,0) / 100;
}
input.New_Total_Premium_before_tax = premiumTotal - ifnull(row.Premium_Per_Year,0);
input.New_Tax_Percent = tax;
input.New_Tax_Province = input.Please_select_the_province_your_boat_is_used_in;
premiumandfee = ifnull(input.New_Total_Premium_before_tax,0) + ifnull(input.New_Admin_Fee,0);
totalTax = (premiumandfee * tax) / 100;
totalAftetTax = ifnull(totalTax,0) + premiumandfee;
input.New_Total_Tax = totalTax;
input.New_Total_Payable_Premium_after_tax = totalAftetTax;
