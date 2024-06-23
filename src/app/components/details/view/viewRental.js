'use client'

import styles from '../detail.module.css'
import DetailHeader from '../detailHeader';
import DetailFooter from '../detailFooter';

export default function ViewRental(props) {
	let returnExpDate;
	if (!props.detail.free) {
		let dt = new Date(props.detail.loanDate);
		dt.setMonth(dt.getMonth() + 3);
		returnExpDate = dt.toLocaleDateString('sv-SE')
	}
	let buttons;
	if (props.detail.free) {
		buttons = <>
			<input type='button' value='貸出' className={styles.detailButton} onClick={() => props.setMode('Rental')} />
			<input type='button' value='棚卸' className={styles.detailButton} onClick={() => props.setMode('Inventory')}/>
		</>
	} else {
		buttons = <>
			<input type='button' value='返却' className={styles.detailButton} onClick={() => props.setMode('Return')} />
			<input type='button' value='棚卸' className={styles.detailButton} onClick={() => props.setMode('Inventory')}/>
		</>

	}

	return (
		<>
			<DetailHeader title='貸出情報詳細' buttons={buttons} />
			<div className={styles.detailBody}>
			<table className={styles.detailTable}>
				<tbody>
					<tr><th>ID</th><td>{props.detail.rentalId}</td></tr>
					<tr><th>資産番号</th><td>{props.detail.device ? props.detail.device.assetNum : ''}</td></tr>
					<tr><th>メーカー</th><td>{props.detail.device ? props.detail.device.maker : ''}</td></tr>
					<tr><th>OS</th><td>{props.detail.device ? props.detail.device.operatingSystem : ''}</td></tr>
					<tr><th>保管場所</th><td>{props.detail.device ? props.detail.device.storageLocation : ''}</td></tr>
					<tr><th>状態</th><td>{props.detail.free ? '利用可' : '利用中'}</td></tr>
					<tr><th>使用者：社員番号</th><td>{props.detail.user ? props.detail.user.employeeNum : ''}</td></tr>
					<tr><th>使用者：氏名</th><td>{props.detail.user ? props.detail.user.name : ''}</td></tr>
					<tr><th>貸出日</th><td>{props.detail.user ? props.detail.loanDate : ''}</td></tr>
					<tr><th>返却予定日</th><td>{props.detail.user ? returnExpDate : ''}</td></tr>
					<tr><th>棚卸日</th><td>{props.detail.inventoryDate}</td></tr>
					<tr><th>備考</th><td>{props.detail.remarks}</td></tr>
				</tbody>
			</table>
			</div>
		</>
	)
}