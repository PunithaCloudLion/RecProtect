string Generic_Functions.Delay_Function(list duration)
{
	for each  Timerec in duration
	{
		delay = invokeurl
		[
			url :"https://httpstat.us/200?sleep=2000"
			type :POST
		];
	}
	return true;
}