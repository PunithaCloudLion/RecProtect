if(row.Add_an_auxiliary_motor == "Yes")
	{
		show row.Aux_Engine_Model_Year;
		show row.Aux_Engine_HP_Thrust;
		show row.Aux_Engine_Value;
		show row.Auxiliary_Engine_Serial;
		show row.Aux_Engine_Manufacturer;
	}
	else
	{
		hide row.Aux_Engine_Model_Year;
		hide row.Aux_Engine_HP_Thrust;
		hide row.Aux_Engine_Value;
		hide row.Auxiliary_Engine_Serial;
		hide row.Aux_Engine_Manufacturer;
		row.Aux_Engine_Model_Year=null;
		row.Aux_Engine_HP_Thrust="";
		row.Aux_Engine_Value="";
		row.Auxiliary_Engine_Serial="";
		row.Aux_Engine_Manufacturer="";
	}
	