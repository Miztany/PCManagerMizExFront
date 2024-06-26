import postAction from './postAction'

export default async function saveRecord(saveUrl, formDate, setActiveMode){
	const data = await postAction(saveUrl, formDate);
	if(data.result){
		setActiveMode('View');
	}else{
		alert(data.message);
	}

}
