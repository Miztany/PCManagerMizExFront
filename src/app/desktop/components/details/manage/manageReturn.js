'use client'
import styles from '../detail.module.css'
import { useState } from 'react';
import saveRecord from '@/app/desktop/action/saveRecord';
import DetailHeader from '../components/detailHeader';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { manageUrl, activeMode } from '@/state/states';

export default function ManageReturn(props) {

	const manageUrlValue = useRecoilValue(manageUrl);
	const setActiveMode = useSetRecoilState(activeMode);


	const [rentalId, setRentalId] = useState(props.detail.rentalId);
	const [returnDate, setReturnDate] = useState((new Date()).toLocaleDateString('sv-SE'));
	const [remarks, setRemarks] = useState(props.detail.remarks || '');

	let formData = {
		rentalId: rentalId,
		returnDate: returnDate,
		remarks: remarks,
	}

	const buttons = <>
		<input type='button' value='キャンセル' className={styles.detailButton} onClick={() => setActiveMode('View')} />
		<input type='button' value='完了' className={styles.detailButton} onClick={() => saveRecord(manageUrlValue, formData, setActiveMode)} />
	</>

	return (
		<>
			<DetailHeader title='返却' buttons={buttons} />
			<div className={styles.detailBody}>
				<table className={styles.editTable}>
					<tbody>
						<tr><th>ID</th><td><input className={styles.readOnly} type='number' name='rentalId' value={rentalId} onChange={(e) => setRentalId(e.target.value)} readOnly inert='true' /></td></tr>
						<tr><th>返却日</th><td><input type='date' name='returnDate' value={returnDate} onChange={(e) => setReturnDate(e.target.value)} /></td></tr>
						<tr><th>備考</th><td><input type='text' name='remarks' value={remarks} onChange={(e) => setRemarks(e.target.value)} /></td></tr>
					</tbody>
				</table>
			</div>
		</>
	)
}


