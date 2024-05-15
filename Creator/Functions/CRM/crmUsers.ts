void CRM.crmUsers()
{
	users = invokeurl
	[
		url :"https://www.zohoapis.com/crm/v6/users?type=AllUsers"
		type :GET
		connection:"zcrm"
	];
	//	info users;
	for each  Allusers in users.get("users")
	{
		get_user = Zoho_CRM_User[CRM_ID == Allusers.get("id")];
		get_user.Email=Allusers.get("email");
		// 		insertUsers = insert into Zoho_CRM_User
		// 		[
		// 			Added_User=zoho.loginuser
		// 			User_Name=Allusers.get("full_name")
		// 			CRM_ID=Allusers.get("id")
		// 		];
		// 		info insertUsers;
	}
}