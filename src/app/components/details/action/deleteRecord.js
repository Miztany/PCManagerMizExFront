import postAction from './postAction'

export default async function deleteRecord(deleteUrl,formDate, setActiveMode, setActiveId){
	const data = await postAction(deleteUrl, formDate);
	if(data.result){
		setActiveMode('View');
		setActiveId(null);
	}else{
		alert(data.message);
	}
}