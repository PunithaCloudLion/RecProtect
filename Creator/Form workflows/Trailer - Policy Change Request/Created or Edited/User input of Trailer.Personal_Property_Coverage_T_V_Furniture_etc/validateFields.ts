if(row.Personal_Property_Coverage_T_V_Furniture_etc != "" && row.Personal_Property_Coverage_T_V_Furniture_etc != null)
	{
		if(row.Personal_Property_Coverage_T_V_Furniture_etc.isNumber() == false)
		{
			alert "Please enter only Numbers";
			row.Personal_Property_Coverage_T_V_Furniture_etc="";
		}
	}
	