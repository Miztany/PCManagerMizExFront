'use client'

import styles from '../detail.module.css'
import DetailHeader from '../detailHeader';
import DetailFooter from '../detailFooter';

export default function ViewUser(props) {

	let gender;
	switch(props.detail.gender){
		case 0: 
			gender = '男';
			break; 
		case 1: 
			gender = '女';
			break; 
		case 2: 
			gender = 'その他';
			break; 
	}

	const dangerButtonClass = styles.detailButton + ' ' + styles.detailButtonDanger

	return (
		<>
			<DetailHeader title='ユーザー詳細' buttons={<input type='button' value='編集' className={styles.detailButton} onClick={() => props.setMode('Edit')} />} />
			<div className={styles.detailBody}>
			<table className={styles.detailTable}>
				<tbody>
					<tr><th>社員番号</th><td>{props.detail.employeeNum}</td></tr>
					<tr><th>氏名</th><td>{props.detail.name}</td></tr>
					<tr><th>氏名（カタカナ）</th><td>{props.detail.nameKana}</td></tr>
					<tr><th>所属部署</th><td>{props.detail.department}</td></tr>
					<tr><th>電話番号</th><td>{props.detail.telNum}</td></tr>
					<tr><th>メールアドレス</th><td>{props.detail.mailAddress}</td></tr>
					<tr><th>年齢</th><td>{props.detail.age}</td></tr>
					<tr><th>性別</th><td>{gender}</td></tr>
					<tr><th>役職</th><td>{props.detail.position}</td></tr>
					<tr><th>PCアカウント権限</th><td>{props.detail.accountLevel}</td></tr>
					<tr><th>登録日</th><td>{props.detail.registerDate}</td></tr>
					<tr><th>更新日</th><td>{props.detail.updateDate}</td></tr>
					<tr><th>退職日</th><td>{props.detail.retireDate}</td></tr>
				</tbody>
			</table>
			</div>
			<DetailFooter />
		</>
	)
}