'use client'
import styles from '../detail.module.css'
import { useState } from 'react';
import saveRecord from '@/app/desktop/action/saveRecord';
import DetailHeader from '../compnents/detailHeader';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { manageUrl, activeMode } from '@/state/states';

export default function ManageInventory(props) {

	const manageUrlValue = useRecoilValue(manageUrl);
	const setActiveMode = useSetRecoilState(activeMode);

	const [rentalId, setRentalId] = useState(props.detail.rentalId);
	const [inventoryDate, setInventoryDate] = useState(props.detail.inventoryDate);
	const [remarks, setRemarks] = useState(props.detail.remarks || '');

	let formData = {
		rentalId: rentalId,
		inventoryDate: inventoryDate,
		remarks: remarks,
	}

	return (
<>
	<DetailHeader title='棚卸' buttons={<input type='button' value='完了' className={styles.detailButton} onClick={() => saveRecord(manageUrlValue, formData, setActiveMode)} />} />
	<div className={styles.detailBody}>
		<table className={styles.editTable}>
			<tbody>
				<tr><th>ID</th><td><input className={styles.readOnly} type='number' name='rentalId' value={rentalId} onChange={(e) => setRentalId(e.target.value)} readOnly inert='true' /></td></tr>
				<tr><th>棚卸日</th><td><input type='date' name='inventoryDate' value={inventoryDate} onChange={(e) => setInventoryDate(e.target.value)} /></td></tr>
				<tr><th>備考</th><td><input type='text' name='remaks' value={remarks} onChange={(e) => setRemarks(e.target.value)} /></td></tr>
			</tbody>
		</table>
	</div>
</>
	)
}


