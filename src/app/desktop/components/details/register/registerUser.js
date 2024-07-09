'use client'

import styles from '../detail.module.css'
import DetailHeader from '../compnents/detailHeader';
import DetailFooter from '../compnents/detailFooter';
import registerRecord from '@/app/desktop/action/registerRecord';
import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { activeId, activeMode, registerUrl } from '@/state/states';

export default function RegisterUser(props) {

	const setActiveId = useSetRecoilState(activeId);
	const setActiveMode = useSetRecoilState(activeMode);
	const registerUrlValue = useRecoilValue(registerUrl);


	const [employeeNum, setEmployeeNum] = useState('');
	const [name, setName] = useState('');
	const [nameKana, setNameKana] = useState('');
	const [department, setDepartment] = useState('');
	const [telNum, setTelNum] = useState('');
	const [mailAddress, setMailAddress] = useState('');
	const [age, setAge] = useState(20);
	const [gender, setGender] = useState(2);
	const [position, setPosition] = useState('');
	const [accountLevel, setAccountLevel] = useState('利用者');
	const [registerDate, setRegisterDate] = useState((new Date()).toLocaleDateString('sv-SE'));
	const [updateDate, setUpdateDate] = useState((new Date()).toLocaleDateString('sv-SE'));
	const [retireDate, setRetireDate] = useState('');
	const [deleteFlag, setDeletaFlag] = useState(false);

	const formData = {
		employeeNum: employeeNum,
		name: name,
		nameKana: nameKana,
		department: department,
		telNum: telNum,
		mailAddress: mailAddress,
		age: age,
		gender: gender,
		position: position,
		accountLevel: accountLevel,
		registerDate: registerDate,
		updateDate: updateDate,
		retireDate: retireDate,
		deleteFlag: deleteFlag,
	}

	return (
		<>
			<DetailHeader title='ユーザー登録' buttons={<input type='button' value='完了' className={styles.detailButton} onClick={() => { registerRecord(registerUrlValue, formData, setActiveMode, () => setActiveId(employeeNum)) }} />} />
			<div className={styles.detailBody}>
				<table className={styles.editTable}>
					<tbody>
						<tr><th>社員番号</th><td><input type='text' name='employeeNum' value={employeeNum} onChange={(e) => setEmployeeNum(e.target.value)} /></td></tr>
						<tr><th>氏名</th><td><input type='text' name='name' value={name} onChange={(e) => setName(e.target.value)} /></td></tr>
						<tr><th>氏名（カタカナ）</th><td><input type='text' name='nameKana' value={nameKana} onChange={(e) => setNameKana(e.target.value)} /></td></tr>
						<tr><th>所属部署</th><td><input type='text' name='department' value={department} onChange={(e) => setDepartment(e.target.value)} /></td></tr>
						<tr><th>電話番号</th><td><input type='text' name='telNum' value={telNum} onChange={(e) => setTelNum(e.target.value)} /></td></tr>
						<tr><th>メールアドレス</th><td><input type='text' name='mailAddress' value={mailAddress} onChange={(e) => setMailAddress(e.target.value)} /></td></tr>
						<tr><th>年齢</th><td><input type='number' name='age' value={age} onChange={(e) => setAge(e.target.value)} /></td></tr>
						<tr><th>性別</th><td>
							<select name='gender' value={gender} onChange={(e) => setGender(e.target.value)}>
								<option value={0}>男</option>
								<option value={1}>女</option>
								<option value={2}>その他</option>
							</select>
						</td></tr>
						<tr><th>役職</th><td><input type='text' name='position' value={position} onChange={(e) => setPosition(e.target.value)} /></td></tr>
						<tr><th>PCアカウント権限</th><td>
							<select name='accountLevel' value={accountLevel} onChange={(e) => setAccountLevel(e.target.value)}>
								<option value='利用者'>利用者</option>
								<option value='管理者'>管理者</option>
							</select>
						</td></tr>
						<tr><th>登録日</th><td><input type='date' name='registerDate' value={registerDate} onChange={(e) => setRegisterDate(e.target.value)} /></td></tr>
						<tr><th>更新日</th><td><input type='date' name='updateDate' value={updateDate} onChange={(e) => setUpdateDate(e.target.value)} /></td></tr>
						<tr><th>退職日</th><td><input type='date' name='retireDate' value={retireDate} onChange={(e) => setRetireDate(e.target.value)} /></td></tr>
					</tbody>
				</table>
			</div>
			<DetailFooter />
		</>
	)
}