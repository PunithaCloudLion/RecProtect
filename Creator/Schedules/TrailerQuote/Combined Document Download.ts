thisapp.Developer.addActivityLog("Combined Doc Status Check- Trailer_Policy ---" + input.ID,"Schedule Called --- " + input.Combined_Document_Process,input.ID.toString(),"null");
if(input.Combined_Document_Process == "Manualy Regenerated")
{
	thisapp.Developer.addActivityLog("Combined Doc Status Check- Trailer_Policy ---" + input.ID,"Schedule Triggered For --- " + input.Combined_Document_Process,input.ID.toString(),"null");
	thisapp.GenerateDocManual.Trailer_Status_Check(input.ID);
}
else
{
	thisapp.Developer.addActivityLog("Combined Doc Status Check- Trailer_Policy ---- " + input.ID,"Schedule Triggered For --- Normal Flow",input.ID.toString(),"null");
	thisapp.Combine_Document.Trailer_Doc_Status_New(input.ID);
}