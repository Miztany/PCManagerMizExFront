import postAction from './postAction'
import { mutate } from 'swr';

export default async function saveRecord(saveUrl, formDate, setActiveMode) {
	const data = await postAction(saveUrl, formDate);

	if (data.result) {
		setActiveMode('View');
		mutate(() => true, undefined, { revalidate: true });
	} else {
		alert(data.message);
	}

}
