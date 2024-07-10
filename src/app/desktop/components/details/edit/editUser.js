'use client'

import styles from '../detail.module.css'
import DetailHeader from '../components/detailHeader';
import DetailFooter from '../components/detailFooter';
import deleteRecord from '@/app/desktop/action/deleteRecord';
import saveRecord from '@/app/desktop/action/saveRecord';
import { useState } from 'react';
import { useRecoilValue, useSetRecoilState} from 'recoil';
import { saveUrl,activeMode, activeId, deleteUrl } from '@/state/states';

export default function EditUser(props) {

	const dangerButtonClass = styles.detailButton + ' ' + styles.detailButtonDanger
	const setActiveMode = useSetRecoilState(activeMode);
	const setActiveId = useSetRecoilState(activeId);
	const saveUrlValue = useRecoilValue(saveUrl);
	const deleteUrlValue = useRecoilValue(deleteUrl);


	const [employeeNum, setEmployeeNum] = useState(props.detail.employeeNum);
	const [name, setName] = useState(props.detail.name);
	const [nameKana, setNameKana] = useState(props.detail.nameKana);
	const [department, setDepartment] = useState(props.detail.department);
	const [telNum, setTelNum] = useState(props.detail.telNum);
	const [mailAddress, setMailAddress] = useState(props.detail.mailAddress);
	const [age, setAge] = useState(props.detail.age);
	const [gender, setGender] = useState(props.detail.gender);
	const [position, setPosition] = useState(props.detail.position);
	const [accountLevel, setAccountLevel] = useState(props.detail.accountLevel);
	const [registerDate, setRegisterDate] = useState(props.detail.registerDate);
	const [updateDate, setUpdateDate] = useState(props.detail.updateDate);
	const [retireDate, setRetireDate] = useState(props.detail.retireDate || '');
	const [deleteFlag, setDeletaFlag] = useState(props.detail.deleteFlag);

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

	const buttons = <>
	<input type='button' value='キャンセル' className={styles.detailButton} onClick={() => setActiveMode('View')} />
	<input type='button' value='完了' className={styles.detailButton} onClick={() => saveRecord(saveUrlValue, formData, setActiveMode)} />
	</>

	return (
		<>
			<DetailHeader title='ユーザー編集' buttons={buttons} />
			<div className={styles.detailBody}>
				<table className={styles.editTable}>
					<tbody>
						<tr><th>社員番号</th><td><input className={styles.readOnly} type='text' name='employeeNum' value={employeeNum} onChange={(e) => setEmployeeNum(e.target.value)} readOnly inert='true' /></td></tr>
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
			<DetailFooter buttons={<input type='button' value='削除' className={dangerButtonClass} onClick={() => deleteRecord(deleteUrlValue, formData, setActiveMode, setActiveId)} />} />
		</>
	);
}