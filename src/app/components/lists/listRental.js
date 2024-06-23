import ListHeader from './listHeader';
import styles from './list.module.css';

export default function ListRental(props) {

	// 中身を作成
	const bodyEls = [];
	props.list.forEach((r) => {
		// 選択時のクラス
		const recordClass = r.rentalId === props.activeId ? styles.record + ' ' + styles.active : styles.record;

		// 状態の設定
		let status;
		let returnExpDate;
		if(r.free){
			status='貸出可'
		}else{
			status='貸出中：' + r.user.name
			let dt = new Date(r.loanDate);
			dt.setMonth(dt.getMonth() + 3);
			returnExpDate = dt.toLocaleDateString('sv-SE')
		}
		
		bodyEls.push(
		<tr
			key={r.rentalId} className={recordClass}
			onClick={() => {
				props.setActiveId(r.rentalId);
				props.setMode('View');
			}}
			role='button'
			tabIndex={r.rentalId}
		>
			<td>{r.rentalId}</td>
			<td>{r.device.assetNum}</td>
			<td>{status}</td>
			<td>{r.loanDate}</td>
			<td>{returnExpDate}</td>
		</tr>
		);
	})

	return (
		<div className={styles.listContainer}>
			<ListHeader title='貸出情報一覧' buttons={<></>} />
			<div className={styles.listBody}>
			<table className={styles.table}>
				<thead>
					<tr className={styles.header}>
						<th>ID</th>
						<th>資産番号</th>
						<th>状態</th>
						<th>貸出日</th>
						<th>返却予定日</th>
					</tr>
				</thead>
				<tbody>
					{bodyEls}
				</tbody>
			</table>
			</div>
		</div>
	)

}