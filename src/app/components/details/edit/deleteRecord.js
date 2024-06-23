import postAction from '../postAction'

export default async function deleteRecord(saveUrl, formDate, setMode, setActiveId){
	formDate.deleteFlag = true;
	const data = await postAction(saveUrl, formDate);
	if(data.result){
		setMode('View');
		setActiveId(null);
	}else{
		alert(data.message);
	}
}