import postAction from './postAction'
import { mutate } from 'swr';

export default async function deleteRecord(deleteUrl,formDate, setActiveMode, setActiveId){
	const data = await postAction(deleteUrl, formDate);
	if(data.result){
		setActiveMode('View');
		setActiveId(null);
		mutate(() => true, undefined, { revalidate: true });
	}else{
		alert(data.message);
	}
}