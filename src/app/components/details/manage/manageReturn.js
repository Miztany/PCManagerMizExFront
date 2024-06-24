'use client'
import styles from '../detail.module.css'
import { useState } from 'react';
import saveRecord from '../saveRecord';
import DetailHeader from '../detailHeader';
import DetailFooter from '../detailFooter';

export default function ManageReturn(props) {

	const [rentalId, setRentalId] = useState(props.detail.rentalId);
	const [returnDate, setReturnDate] = useState('');


	let formData = {
		rentalId: rentalId,
		returnDate: returnDate,
	}

	return (
<>
	<DetailHeader title='返却' buttons={<input type='button' value='完了' className={styles.detailButton} onClick={() => saveRecord(props.manageUrl, formData, props.setMode)} />} />
	<div className={styles.detailBody}>
		<table className={styles.editTable}>
			<tbody>
				<tr><th>ID</th><td><input className={styles.readOnly} type='number' name='rentalId' value={rentalId} onChange={(e) => setRentalId(e.target.value)} readOnly inert='true' /></td></tr>
				<tr><th>返却日</th><td><input type='date' name='returnDate' value={returnDate} onChange={(e) => setReturnDate(e.target.value)} /></td></tr>
			</tbody>
		</table>
	</div>
	<DetailFooter />
</>
	)
}


