'use client'

import styles from '../../edit.module.css'
import DetailHeader from '../../../compnents/detailHeader';
import DetailFooter from '../../../compnents/detailFooter';
import deleteRecord from '@/app/mobile/action/deleteRecord';
import saveRecord from '@/app/mobile/action/saveRecord';
import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { saveUrl, activeMode, activeId, deleteUrl, activeTarget, detailUrl } from '@/state/states';
import { useEffect } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';

const fetcher = url => fetch(url).then(r => r.json());

export default function EditUser({params}) {

	const dangerButtonClass = styles.detailButton + ' ' + styles.detailButtonDanger
	const setActiveMode = useSetRecoilState(activeMode);
	const setActiveId = useSetRecoilState(activeId);
	const saveUrlValue = useRecoilValue(saveUrl);
	const deleteUrlValue = useRecoilValue(deleteUrl);
	const setActiveTarget = useSetRecoilState(activeTarget);
	const detailUrlValue = useRecoilValue(detailUrl);
	const router = useRouter();

	const [formData, setFormData] = useState({
		employeeNum: '',
		name: '',
		nameKana: '',
		department: '',
		telNum: '',
		mailAddress: '',
		age: '',
		gender: '',
		position: '',
		accountLevel: '',
		registerDate: '',
		updateDate: '',
		retireDate: '',
		deleteFlag: false,
	});


	useEffect(() => {
		setActiveId(params.employeeNum);
		setActiveTarget('User');
		setActiveMode('Edit');
	}, [params.employeeNum]);

	// 通信して詳細を取得
	const { data, error, isLoading } = useSWR(detailUrlValue, fetcher);

	useEffect(() => {
		if (data && data.result && data.content) {
			detail.retireDate = detail.retireDate || '';
			setFormData(detail);
		}
	}, [data]);

	if (error) return <div>failed to load</div>;
	if (isLoading) return <></>;
	if (!data || !data.result) return <div>please try again later.</div>;

	const detail = data.content;

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	
	const buttons = <>
		<input
			type='button'
			value='キャンセル'
			className={styles.detailButton}
			onClick={() => router.push(`/mobile/view/User/${params.employeeNum}`)} />
		<input
			type='button'
			value='完了'
			className={styles.detailButton}
			onClick={() => {
				saveRecord(saveUrlValue, formData, setActiveMode, () => router.push(`/mobile/view/User/${params.employeeNum}`));

			}} />
	</>
	
	return (
		<div className={styles.editContainer}>
			<DetailHeader title='ユーザー編集' buttons={buttons} />
			<div className={styles.detailBody}>
				<table className={styles.editTable}>
					<tbody>
						<tr><th>社員番号</th><td><input className={styles.readOnly} type='text' name='employeeNum' value={formData.employeeNum} onChange={handleInputChange} readOnly inert='true' /></td></tr>
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
			<DetailFooter buttons={<input type='button' value='削除' className={dangerButtonClass} onClick={() => deleteRecord(deleteUrlValue, formData, setActiveMode, setActiveId,  () => router.push(`/mobile/list`))} />} />
		</div>
	);
}