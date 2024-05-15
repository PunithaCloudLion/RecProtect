if(row.Detached_Private_Structure_Coverage_Sheds_etc != "" && row.Detached_Private_Structure_Coverage_Sheds_etc != null)
	{
		if(row.Detached_Private_Structure_Coverage_Sheds_etc.isNumber() == false)
		{
			alert "Please enter only Numbers";
			row.Detached_Private_Structure_Coverage_Sheds_etc="";
		}
	}
	