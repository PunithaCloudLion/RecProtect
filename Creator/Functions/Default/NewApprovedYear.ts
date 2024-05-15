string NewApprovedYear(int BoatModelYear)
{
	getCurrentYr = zoho.currentdate.getYear();
	// info "getCurrentYr ==>"+getCurrentYr ;
	add1yr = getCurrentYr + 1 - BoatModelYear;
	add2yr = getCurrentYr + 2 - BoatModelYear;
	add3yr = getCurrentYr + 3 - BoatModelYear;
	add4yr = getCurrentYr + 4 - BoatModelYear;
	add5yr = getCurrentYr + 5 - BoatModelYear;
	// info "add5yr ==>"+ add5yr ;
	// info "add4yr ==>"+ add4yr ;
	// info "add3yr ==>"+ add3yr ;
	// info "add2yr ==>"+ add2yr ;
	// info "add1yr ==>"+ add1yr ;
	newApproved_Year = "";
	getYear = getCurrentYr - BoatModelYear;
	// info "getYear ==>"+getYear ;
	if(getYear < 15)
	{
		if(add5yr < 15)
		{
			newApproved_Year = getCurrentYr + 5;
		}
		else if(add4yr < 15)
		{
			newApproved_Year = getCurrentYr + 4;
		}
		else if(add3yr < 15)
		{
			newApproved_Year = getCurrentYr + 3;
		}
		else if(add2yr < 15)
		{
			newApproved_Year = getCurrentYr + 2;
		}
		else if(add1yr <= 15)
		{
			newApproved_Year = getCurrentYr + 1;
		}
	}
	else if(getYear >= 15 && getYear < 20)
	{
		if(add5yr < 20)
		{
			newApproved_Year = getCurrentYr + 5;
		}
		else if(add4yr < 20)
		{
			newApproved_Year = getCurrentYr + 4;
		}
		else if(add3yr < 20)
		{
			newApproved_Year = getCurrentYr + 3;
		}
		else if(add2yr < 20)
		{
			newApproved_Year = getCurrentYr + 2;
		}
		else if(add1yr < 20)
		{
			newApproved_Year = getCurrentYr + 1;
		}
	}
	else if(getYear >= 20 && getYear < 25)
	{
		if(add5yr < 25)
		{
			newApproved_Year = getCurrentYr + 5;
		}
		else if(add4yr < 25)
		{
			newApproved_Year = getCurrentYr + 4;
		}
		else if(add3yr < 25)
		{
			newApproved_Year = getCurrentYr + 3;
		}
		else if(add2yr < 25)
		{
			newApproved_Year = getCurrentYr + 2;
		}
		else if(add1yr <= 25)
		{
			newApproved_Year = getCurrentYr + 1;
		}
	}
	// info "newApproved_Year ==>"+newApproved_Year ;
	return newApproved_Year;
}