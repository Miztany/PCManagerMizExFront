import axios from "axios";

export default async function postAction(url, formData){
	let params = new URLSearchParams(formData);
	const res = await axios.post(url, params);
	return res.data;
}