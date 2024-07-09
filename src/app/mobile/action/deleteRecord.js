import postAction from './postAction'
import { mutate } from 'swr';

export default async function deleteRecord(deleteUrl,formDate, setActiveMode, setActiveId, backToList){
	const data = await postAction(deleteUrl, formDate);
	if(data.result){
		setActiveMode('View');
		setActiveId(null);
		mutate(() => true, undefined, { revalidate: true });
		backToList();
	}else{
		alert(data.message);
	}
}