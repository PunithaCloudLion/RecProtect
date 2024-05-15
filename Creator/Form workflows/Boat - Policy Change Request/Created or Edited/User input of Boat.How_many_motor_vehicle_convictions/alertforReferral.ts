row.Referral_How_many_motor_vehicle_Convictions=false;
if(row.How_many_motor_vehicle_convictions != null && row.How_many_motor_vehicle_convictions != "")
{
	if(row.How_many_motor_vehicle_convictions.isNumber() == false)
	{
		alert "Enter only number";
		row.How_many_motor_vehicle_convictions="";
	}
	else
	{
		if(row.How_many_motor_vehicle_convictions.toNumber() > 1)
		{
			if(row.PO_admin_3year_Override != "Yes")
			{
				alert "This choice triggers a referral.";
				row.Referral_How_many_motor_vehicle_Convictions=true;
			}
		}
	}
}
