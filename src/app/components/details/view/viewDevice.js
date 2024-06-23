'use client'

import styles from '../detail.module.css'
import DetailHeader from '../detailHeader';
import DetailFooter from '../detailFooter';

export default function ViewDevice(props) {

	const dangerButtonClass = styles.detailButton + ' ' + styles.detailButtonDanger

	return (
		<>
			<DetailHeader title='機器詳細' buttons={<input type='button' value='編集' className={styles.detailButton} onClick={() => props.setMode('Edit')} />} />
			<div className={styles.detailBody}>
			<table className={styles.detailTable}>
				<tbody>
					<tr><th>資産番号</th><td>{props.detail.assetNum}</td></tr>
					<tr><th>メーカー</th><td>{props.detail.maker}</td></tr>
					<tr><th>OS</th><td>{props.detail.operatingSystem}</td></tr>
					<tr><th>メモリ</th><td>{props.detail.memory}GB</td></tr>
					<tr><th>容量</th><td>{props.detail.capacity}</td></tr>
					<tr><th>グラフィックボード</th><td>{props.detail.graphicsBoard ? 'あり' : 'なし'}</td></tr>
					<tr><th>保管場所</th><td>{props.detail.storageLocation}</td></tr>
					<tr><th>故障</th><td>{props.detail.failure ? '故障中' : ''}</td></tr>
					<tr><th>リース開始日</th><td>{props.detail.startDate}</td></tr>
					<tr><th>リース期限日</th><td>{props.detail.endDate}</td></tr>
					<tr><th>登録日</th><td>{props.detail.registerDate}</td></tr>
					<tr><th>更新日</th><td>{props.detail.updateDate}</td></tr>
					<tr><th>備考</th><td>{props.detail.remarks}</td></tr>
				</tbody>
			</table>
			</div>
		</>
	)
}