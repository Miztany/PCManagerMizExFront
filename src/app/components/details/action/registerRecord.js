import postAction from './postAction'

export default async function registerRecord(registerUrl,formDate, setActiveMode, doSetActiveId){
	const data = await postAction(registerUrl, formDate);
	if(data.result){
		setActiveMode('View');
		doSetActiveId();
	}else{
		alert(data.message);
	}

}
