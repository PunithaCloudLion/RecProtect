void match_quotation()
{
	getcancellationmigration = Cancellation_Migration[ID != null && Policy_Number != ""];
	info getcancellationmigration.count();
	for each  _rec in getcancellationmigration
	{
		var = startsWith(_rec.Policy_Number,"RECB");
		// 		info var;
		if(startsWith(_rec.Policy_Number,"RECB") == true)
		{
			getboatmigration = Boat_Migration[ID != null && Policy_Number == _rec.Policy_Number && Imported_Month = "Feb Data" && Imported_Year = "2024"];
			if(getboatmigration.count() > 0)
			{
				info "boat migration ID -- >" + getboatmigration.ID + "  - Policy_Number -- >" + getboatmigration.Policy_Number;
			}
		}
		else if(startsWith(_rec.Policy_Number,"REC") == true)
		{
			gettrailermigration = Trailer_Migration[ID != null && Policy_Number == _rec.Policy_Number && Imported_Month = "Feb Data" && Imported_Year = "2024"];
			if(gettrailermigration.count() > 0)
			{
				info "trailer migration ID -- >" + gettrailermigration.ID + "  - Policy_Number -- >" + gettrailermigration.Policy_Number;
			}
		}
		else
		{
			info "No rec";
		}
	}
}