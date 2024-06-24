import postAction from './postAction'

export default async function deleteRecord(deleteUrl, formDate, setMode, setActiveId){
	const data = await postAction(deleteUrl, formDate);
	if(data.result){
		setMode('View');
		setActiveId(null);
	}else{
		alert(data.message);
	}
}