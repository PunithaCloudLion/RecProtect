if(input.Country == "Canada")
	{
		Canada_States = {"Alberta","British Columbia","Manitoba","New Brunswick","Newfoundland and Labrador","Nova Scotia","Northwest Territories","Nunavut","Ontario","Prince Edward Island","Quebec","Saskatchewan","Yukon"};
		input.Province:ui.add(Canada_States);
		input.Province = null;
		input.Address = null;
		input.Suite_Apt = null;
		input.City = null;
		input.Postal_code_ZIP_Code = null;
	}
	else if(input.Country == "US")
	{
		America_States = {"Alabama","AlaskaArizona","Arkansas","Armed Forces America","Armed Forces Europe","Armed Forces Pacific","California","Colorado","Connecticut","Delaware","District of Columbia","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"};
		input.Province:ui.add(America_States);
		input.Province = null;
		input.Address = null;
		input.Suite_Apt = null;
		input.City = null;
		input.Postal_code_ZIP_Code = null;
	}
	else
	{
		input.Province = null;
		input.Address = null;
		input.Suite_Apt = null;
		input.City = null;
		input.Postal_code_ZIP_Code = null;
		input.Province:ui.add({});
	}
	