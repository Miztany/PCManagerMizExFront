import postAction from './postAction'

export default async function registerRecord(saveUrl, formDate, setMode, doSetActiveId){
	const data = await postAction(saveUrl, formDate);
	if(data.result){
		setMode('View');
		doSetActiveId();
	}else{
		alert(data.message);
	}

}