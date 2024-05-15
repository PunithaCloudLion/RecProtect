void Migration.migrationCount()
{
	// 	getCust = Customer[ID != null && Migrated == true &&  (Email.contains("+1@") || Email.contains("+2@") )];
	getCust = Customer[Migrated == true && Boat_Migration_ID != "" || Trailer_Migration_ID != ""];
	info getCust.count();
	// 	c = 0;
	// 	for each  rec in getCust
	// 	{
	// 		emailget = rec.Email.getprefix("+1@");
	// 		trailer = Trailer_Migration[Email.contains(emailget) ];
	// 		if(trailer.count() == 0)
	// 		{
	// 			boat = Boat_Migration[Email1.contains(emailget)];
	// 			if(boat.count() == 0)
	// 			{
	// 				info rec.ID + "---------->" + rec.Email;
	// 			}
	// 		}
	// 	}
}