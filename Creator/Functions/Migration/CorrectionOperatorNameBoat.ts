void Migration.CorrectionOperatorNameBoat()
{
	getBoatMigration = Boat_Migration[ID == 4564627000000874003];
	for each  rec in getBoatMigration
	{
		info "Boat Migration = " + rec.ID;
		getBoat = Boat[ID == rec.Boat_subform_Creator_ID.toLong()];
		info "Boat = " + getBoat.ID;
		getBoat.First_Name=rec.Operator_First_Name;
		getBoat.Last_Name=rec.Operator_Last_Name;
		getBoatQuote = BoatQuote[ID == rec.Boat_Quote_Creator_ID.toLong()];
		getBoatQuote.Inception_Date=rec.Effective_Date;
		info "BoatQuote = " + getBoatQuote.ID;
	}
}