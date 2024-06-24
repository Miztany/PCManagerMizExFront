import ListHeader from './listHeader';
import styles from './list.module.css';

export default function ListUser(props) {

	// 中身を作成
	const bodyEls = [];
	props.list.forEach((r, i) => {
		// 選択時のクラス
		const recordClass = r.employeeNum === props.activeId ? styles.record + ' ' + styles.active : styles.record;

		bodyEls.push(
			<tr
				key={r.employeeNum} className={recordClass}
				onClick={() => {
					props.setActiveId(r.employeeNum);
					props.setMode('View');
				}}
				role='button'
				tabIndex={i}
			>
				<td>{r.employeeNum}</td>
				<td>{r.name}</td>
				<td>{r.department}</td>
				<td>{r.age}</td>
				<td>{r.position}</td>
				<td>{r.accountLevel}</td>
			</tr>
		);
	})

	const buttons = <input
		type='button'
		value='新規登録'
		className={styles.listButton}
		onClick={() => {
			props.setMode('Register');
			props.setActiveId(null);
		}} />

	return (
		<div className={styles.listContainer}>
			<ListHeader title='ユーザー一覧' buttons={buttons} />
			<div className={styles.listBody}>
				<table className={styles.table}>
					<thead>
						<tr className={styles.header}>
							<th>社員番号</th>
							<th>氏名</th>
							<th>初速部署</th>
							<th>年齢</th>
							<th>役職</th>
							<th>PCアカウント権限</th>
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