import postAction from './postAction'
import { mutate } from 'swr';

export default async function registerRecord(registerUrl,formDate, setActiveMode, doSetActiveId){
	const data = await postAction(registerUrl, formDate);
	if(data.result){
		setActiveMode('View');
		doSetActiveId();
		mutate(() => true, undefined, { revalidate: true });
	}else{
		alert(data.message);
	}

}
