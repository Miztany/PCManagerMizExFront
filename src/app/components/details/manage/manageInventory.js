'use client'
import styles from '../detail.module.css'
import { useState } from 'react';
import saveRecord from '../saveRecord';
import DetailHeader from '../detailHeader';
import DetailFooter from '../detailFooter';

export default function ManageInventory(props) {

	const [rentalId, setRentalId] = useState(props.detail.rentalId);
	const [inventoryDate, setInventoryDate] = useState(props.detail.inventoryDate);


	let formData = {
		rentalId: rentalId,
		inventoryDate: inventoryDate,
	}

	return (
<>
	<DetailHeader title='棚卸' buttons={<input type='button' value='完了' className={styles.detailButton} onClick={() => saveRecord(props.manageUrl, formData, props.setMode)} />} />
	<div className={styles.detailBody}>
		<table className={styles.editTable}>
			<tbody>
				<tr><th>ID</th><td><input className={styles.readOnly} type='number' name='rentalId' value={rentalId} onChange={(e) => setRentalId(e.target.value)} readOnly inert='true' /></td></tr>
				<tr><th>棚卸日</th><td><input type='date' name='inventoryDate' value={inventoryDate} onChange={(e) => setInventoryDate(e.target.value)} /></td></tr>
			</tbody>
		</table>
	</div>
	<DetailFooter />
</>
	)
}


