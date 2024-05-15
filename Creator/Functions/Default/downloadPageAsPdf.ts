void downloadPageAsPdf(int id)
{
	//pdfname = "CommercialInsuranceof-" + contactname.replaceAll(" ","");
	// 	https://creatorapp.zohopublic.com/service_recprotect/quotation/page-perma/Trailer_Policy_Declaraition/ROFPE5CUHaqRbCeW6DsQb0nSWbPJAWzORD0ajU9x3FQ7h8qxwyuH1xZ2QDsu53HHQQHDPGeNZb5T1jY1F4f20jSj9yOf5DXy1fQG
	urlLink = "https://creatorapp.zohopublic.com//export/service_recprotect/quotation/pdf/Trailer_Policy_Declaraition/ROFPE5CUHaqRbCeW6DsQb0nSWbPJAWzORD0ajU9x3FQ7h8qxwyuH1xZ2QDsu53HHQQHDPGeNZb5T1jY1F4f20jSj9yOf5DXy1fQG/?trailerID=" + id + "&isc5page=true&zc_PdfSize=A4";
	// 	urlLink = "https://creatorapp.zohopublic.com//export/service_recprotect/quotation/pdf/Boat_Policy_Declaration/C8ntC5vMF39GZXZn9jfNtM2vYTf9dgFh64x31Q4T0Ar0U2WTdS05YCe2C36RjKUuwEm6prVY01tSZzEUH8JMMrjGh0Td6YQ7s623/?recID=" + id + "&isc5page=true";
	// 	urlLink = "https://creatorapp.zohopublic.com//export/service_recprotect/quotation/pdf/Trailer_Subform_for_download/5U29mqbPPd5hkPFpEmYxNgn0JEvgVvdtZVwuB3dJ8NZJ9kJaJeJ6fu9jXf8sYXssyVwnEV2tbaqDkWarPD3KZSqZxK4kGSA5y30F/?recID=" + id + "&isc5page=true&zc_PdfSize=A4";
	// 	urlLink = "https://creatorapp.zohopublic.com//export/service_recprotect/quotation/pdf/Boat_Details_For_Download/zFAe2p3u4wjSyjf2rmqzMb6e7gkGawsmsppvvHd9tmzazQMPQAjFd9X3HDsAUu8jqFE5E4s88Hwfn66KU8pq0J98rfeg5BNpOUv3/?recID=" + id + "&isc5page=true&zc_PdfSize=A4";
	// 	urlLink = "https://creatorapp.zohopublic.com/service_recprotect/quotation/page-perma/Boat_Details_For_Download/zFAe2p3u4wjSyjf2rmqzMb6e7gkGawsmsppvvHd9tmzazQMPQAjFd9X3HDsAUu8jqFE5E4s88Hwfn66KU8pq0J98rfeg5BNpOUv3";
	// 	https://creatorapp.zohopublic.com/service_recprotect/quotation/page-perma/Trailer_Subform_for_download/5U29mqbPPd5hkPFpEmYxNgn0JEvgVvdtZVwuB3dJ8NZJ9kJaJeJ6fu9jXf8sYXssyVwnEV2tbaqDkWarPD3KZSqZxK4kGSA5y30F
	resp = invokeurl
	[
		url :urlLink
		type :GET
		response-format:FILE
	];
	info resp;
	// 	ananth@cloudlion.org
	sendmail
	[
		from :zoho.loginuserid
		to :"ananth@cloudlion.org"
		subject :"Test trailer"
		message :"test"
		Attachments :file:resp
	]
}