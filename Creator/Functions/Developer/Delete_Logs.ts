void Developer.Delete_Logs()
{
	delete from Developer_Logs[ID != null];
	delete from Activity_Logs[ID != null];
	delete from Cancellation_Audit_Tracking[ID != null];
	delete from Policy_Change_Audit_Tracking[ID != null];
	delete from Renewals_Audit_Tracking[ID != null];
}