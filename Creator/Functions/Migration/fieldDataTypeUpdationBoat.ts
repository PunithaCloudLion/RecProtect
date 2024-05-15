void Migration.fieldDataTypeUpdationBoat()
{
	BoatMigration = Boat_Migration[Migrated == true] range from 801 to 1000;
	c = 0;
	for each  rec in BoatMigration
	{
		c = c + 1;
		getBoat = Boat[ID == rec.Boat_subform_Creator_ID.toLong()];
		info getBoat;
		getBoat.Is_the_Principal_Operator_the_same_as_the_Applicant_Owner=if(rec.Is_the_Principal_Operator_the_same_as_the_Applicant_Owner == true,"Yes","No");
		getBoat.Does_the_operator_hold_a_Pleasure_Craft_Operator_s_Card_PCOC=if(rec.Does_the_operator_hold_a_Pleasure_Craft_Operator_s_Card_PCOC == true,"Yes","No");
		getBoat.Add_a_trailer=if(rec.Add_a_trailer == true,"Yes","No");
		getBoat.Add_a_tender=if(rec.Add_a_tender == true,"Yes","No");
		getBoat.Add_an_auxiliary_motor=if(rec.Add_an_auxiliary_motor == true,"Yes","No");
		getBoat.Is_this_boat_financed=if(rec.Do_you_have_any_lienholders == true,"Yes","No");
	}
	info c;
}