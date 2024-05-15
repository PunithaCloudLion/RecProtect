void Migration.slaveCustomerToCustomer()
{
	count = 0;
	fetCustomer = Customer[Email != "" && Customer_Type == null && Migrated == false];
	// 	info fetCustomer.count();
	// 	for each  rec in fetCustomer
	// 	{
	// 		fetSlaveCustomer = Slave_Customer[Email == "mammareeree@gmail.com"]sort by Modified_Time desc;
	// 		info fetSlaveCustomer.ID;
	// 		if(fetSlaveCustomer.count() > 0)
	// 		{
	// 			info fetSlaveCustomer.Email;
	// 			count = count + 1;
	// 			// 			info fetSlaveCustomer.Modified_Time;
	// 			// 			fetSlaveCustomer.Customer_ID = rec.ID;
	// 			// 			rec.Slave_Customer_ID = fetSlaveCustomer.ID;
	// 		}
	// 	}
	fetSlave = Slave_Customer[Customer_ID == "" && Duplicate_slave == false];
	info fetSlave.count();
	for each  rec in fetSlave
	{
		fetCus = Customer[Email == rec.Email];
		if(fetCus.count() > 0)
		{
			count = count + 1;
		}
		else
		{
			info rec.ID;
		}
	}
	info count;
}