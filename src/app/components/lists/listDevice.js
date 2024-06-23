import ListHeader from './listHeader';
import styles from './list.module.css';

export default function ListDevice(props) {

	// 中身を作成
	const bodyEls = [];
	props.list.forEach((r, i) => {
		// 選択時のクラス
		const recordClass = r.assetNum === props.activeId ? styles.record + ' ' + styles.active : styles.record;

		bodyEls.push(
		<tr
			key={r.assetNum} className={recordClass}
			onClick={() => {
				props.setActiveId(r.assetNum);
				props.setMode('View');
			}}
			role='button'
			tabIndex={i}
		>
			<td>{r.assetNum}</td>
			<td>{r.maker}</td>
			<td>{r.operatingSystem}</td>
			<td>{r.storageLocation}</td>
			<td>{r.failure ? '故障中' : ''}</td>
		</tr>
		);
	})

	const buttons = <input type='button' value='新規登録' className={styles.listButton} />

	return (
		<div className={styles.listContainer}>
			<ListHeader title='機器一覧' buttons={buttons} />
			<div className={styles.listBody}>
			<table className={styles.table}>
				<thead>
					<tr className={styles.header}>
						<th>資産番号</th>
						<th>メーカー</th>
						<th>OS</th>
						<th>保管場所</th>
						<th>故障</th>
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