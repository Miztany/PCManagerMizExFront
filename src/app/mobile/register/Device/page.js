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

export default function RegisterDevice(props) {

	const setActiveMode = useSetRecoilState(activeMode);
	const setActiveId = useSetRecoilState(activeId);
	const registerUrlValue = useRecoilValue(registerUrl);
	const setActiveTarget = useSetRecoilState(activeTarget);
	const router = useRouter();

	const [formData, setFormData] = useState({
		assetNum: '',
		maker: '',
		operatingSystem: '',
		memory: '',
		capacity: '',
		graphicsBoard: false,
		storageLocation: '',
		failure: false,
		startDate: '',
		endDate: '',
		registerDate: (new Date()).toLocaleDateString('sv-SE'),
		updateDate: (new Date()).toLocaleDateString('sv-SE'),
		remarks: '',
		deleteFlag: false,
	});

	useEffect(() => {
		setActiveTarget('Device');
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
					router.push(`/mobile/view/Device/${formData.assetNum}`);
				})
			}} />
	</>

	return (
		<div className={styles.registerContainer}>
			<DetailHeader title='機器登録' buttons={buttons} />
			<div className={styles.detailBody}>
				<table className={styles.editTable}>
					<tbody>
						<tr><th>資産番号</th><td><input type='text' name='assetNum' value={formData.assetNum} onChange={handleInputChange} /></td></tr>
						<tr><th>メーカー</th><td><input type='text' name='maker' value={formData.maker} onChange={handleInputChange} /></td></tr>
						<tr><th>OS</th><td><input type='text' name='operatingSystem' value={formData.operatingSystem} onChange={handleInputChange} /></td></tr>
						<tr><th>メモリ</th><td><input type='number' name='memory' value={formData.memory} onChange={handleInputChange} />GB</td></tr>
						<tr><th>容量</th><td><input type='text' name='capacity' value={formData.capacity} onChange={handleInputChange} /></td></tr>
						<tr><th>グラフィックボード</th><td>
							<select name='graphicsboard' value={formData.graphicsBoard} onChange={handleInputChange}>
								<option value={true}>あり</option>
								<option value={false}>なし</option>
							</select>
						</td></tr>
						<tr><th>保管場所</th><td><input type='text' name='storageLocation' value={formData.storageLocation} onChange={handleInputChange} /></td></tr>
						<tr><th>故障</th><td>
							<select name='failure' value={formData.failure} onChange={handleInputChange}>
								<option value={true}>あり</option>
								<option value={false}>なし</option>
							</select>
						</td></tr>
						<tr><th>リース開始日</th><td><input type='date' name='startDate' value={formData.startDate} onChange={handleInputChange} /></td></tr>
						<tr><th>リース期限日</th><td><input type='date' name='endDate' value={formData.endDate} onChange={handleInputChange} /></td></tr>
						<tr><th>登録日</th><td><input type='date' name='registerDate' value={formData.registerDate} onChange={handleInputChange} /></td></tr>
						<tr><th>更新日</th><td><input type='date' name='updateDate' value={formData.updateDate} onChange={handleInputChange} /></td></tr>
						<tr><th>備考</th><td><input type='text' name='remarks' value={formData.remarks} onChange={handleInputChange} /></td></tr>
					</tbody>
				</table>
			</div>
			<DetailFooter />
		</div>
	)
}