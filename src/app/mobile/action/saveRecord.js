import postAction from './postAction'
import { mutate } from 'swr';


export default async function saveRecord(saveUrl, formDate, setActiveMode, backToDetail) {
	const data = await postAction(saveUrl, formDate);
	console.log('sample');
	
	if (data.result) {
		setActiveMode('View');
		mutate(() => true, undefined, { revalidate: true });
		backToDetail();
	} else {
		alert(data.message);
	}

}
