import postAction from './postAction'

export default async function saveRecord(saveUrl, formDate, setMode){
	const data = await postAction(saveUrl, formDate);
	if(data.result){
		setMode('View');
	}else{
		alert(data.message);
	}

}