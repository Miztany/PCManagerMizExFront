'use client'
import styles from '../detail.module.css'
import { useState } from 'react';
import saveRecord from '@/app/desktop/action/saveRecord';
import DetailHeader from '../compnents/detailHeader';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { manageUrl,activeMode } from '@/state/states';

export default function ManageRental(props) {

	const manageUrlValue = useRecoilValue(manageUrl);
	const setActiveMode = useSetRecoilState(activeMode);


	const [rentalId, setRentalId] = useState(props.detail.rentalId);
	const [employeeNum, setEmployeeNum] = useState("");
	const [loanDate, setLoanDate] = useState((new Date()).toLocaleDateString('sv-SE'));
	const [inventoryDate, setInventoryDate] = useState(props.detail.inventoryDate);
	const [remarks, setRemarks] = useState(props.detail.remarks || '');

	let formData = {
		rentalId: rentalId,
		employeeNum: employeeNum,
		loanDate: loanDate,
		inventoryDate: inventoryDate,
		remarks: remarks,
	}

	return (
<>
	<DetailHeader title='貸出' buttons={<input type='button' value='完了' className={styles.detailButton} onClick={() => saveRecord(manageUrlValue, formData, setActiveMode)} />} />
	<div className={styles.detailBody}>
		<table className={styles.editTable}>
			<tbody>
				<tr><th>ID</th><td><input className={styles.readOnly} type='number' name='rentalId' value={rentalId} onChange={(e) => setRentalId(e.target.value)} readOnly inert='true' /></td></tr>
				<tr><th>社員番号</th><td><input type='text' name='employeeNum' value={employeeNum} onChange={(e) => setEmployeeNum(e.target.value)} /></td></tr>
				<tr><th>貸出日</th><td><input type='date' name='loanDate' value={loanDate} onChange={(e) => setLoanDate(e.target.value)} /></td></tr>
				<tr><th>棚卸日</th><td><input type='date' name='inventoryDate' value={inventoryDate} onChange={(e) => setInventoryDate(e.target.value)} /></td></tr>
				<tr><th>備考</th><td><input type='text' name='remaks' value={remarks} onChange={(e) => setRemarks(e.target.value)} /></td></tr>
			</tbody>
		</table>
	</div>
</>
	)
}


