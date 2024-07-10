'use client'

import styles from '../register.module.css'
import DetailHeader from '../../compnents/detailHeader';
import DetailFooter from '../../compnents/detailFooter';
import registerRecord from '@/app/desktop/action/registerRecord';
import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { activeId, activeMode, registerUrl, activeTarget } from '@/state/states';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RegisterUser(props) {

	const setActiveMode = useSetRecoilState(activeMode);
	const setActiveId = useSetRecoilState(activeId);
	const registerUrlValue = useRecoilValue(registerUrl);
	const setActiveTarget = useSetRecoilState(activeTarget);
	const router = useRouter();

	const [formData, setFormData] = useState({
		employeeNum: '',
		name: '',
		nameKana: '',
		department: '',
		telNum: '',
		mailAddress: '',
		age: '',
		gender: 2,
		position: '',
		accountLevel: '',
		registerDate: (new Date()).toLocaleDateString('sv-SE'),
		updateDate: (new Date()).toLocaleDateString('sv-SE'),
		retireDate: '',
		deleteFlag: false,
	});

	useEffect(() => {
		setActiveTarget('User');
		setActiveMode('Register');
	}, []);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};


	const buttons = <>
		<input
			type='button'
			value='キャンセル'
			className={styles.detailButton}
			onClick={() => router.push(`/mobile/list`)} />
		<input
			type='button'
			value='完了'
			className={styles.detailButton}
			onClick={() => {
				registerRecord(registerUrlValue, formData, setActiveMode, () => {
					setActiveId(formData.assetNum);
					router.push(`/mobile/view/User/${formData.employeeNum}`);
				})
			}} />
	</>

	return (
		<div className={styles.registerContainer}>
			<DetailHeader title='ユーザー登録' buttons={buttons} />
			<div className={styles.detailBody}>
				<table className={styles.editTable}>
					<tbody>
						<tr><th>社員番号</th><td><input type='text' name='employeeNum' value={formData.employeeNum} onChange={handleInputChange} /></td></tr>
						<tr><th>氏名</th><td><input type='text' name='name' value={formData.name} onChange={handleInputChange} /></td></tr>
						<tr><th>氏名（カタカナ）</th><td><input type='text' name='nameKana' value={formData.nameKana} onChange={handleInputChange} /></td></tr>
						<tr><th>所属部署</th><td><input type='text' name='department' value={formData.department} onChange={handleInputChange} /></td></tr>
						<tr><th>電話番号</th><td><input type='text' name='telNum' value={formData.telNum} onChange={handleInputChange} /></td></tr>
						<tr><th>メールアドレス</th><td><input type='text' name='mailAddress' value={formData.mailAddress} onChange={handleInputChange} /></td></tr>
						<tr><th>年齢</th><td><input type='number' name='age' value={formData.age} onChange={handleInputChange} /></td></tr>
						<tr><th>性別</th><td>
							<select name='gender' value={formData.gender} onChange={handleInputChange}>
								<option value={0}>男</option>
								<option value={1}>女</option>
								<option value={2}>その他</option>
							</select>
						</td></tr>
						<tr><th>役職</th><td><input type='text' name='position' value={formData.position} onChange={handleInputChange} /></td></tr>
						<tr><th>PCアカウント権限</th><td>
							<select name='accountLevel' value={formData.accountLevel} onChange={handleInputChange}>
								<option value='利用者'>利用者</option>
								<option value='管理者'>管理者</option>
							</select>
						</td></tr>
						<tr><th>登録日</th><td><input type='date' name='registerDate' value={formData.registerDate} onChange={handleInputChange} /></td></tr>
						<tr><th>更新日</th><td><input type='date' name='updateDate' value={formData.updateDate} onChange={handleInputChange} /></td></tr>
						<tr><th>退職日</th><td><input type='date' name='retireDate' value={formData.retireDate} onChange={handleInputChange} /></td></tr>
					</tbody>
				</table>
			</div>
			<DetailFooter />
		</div>
	)
}