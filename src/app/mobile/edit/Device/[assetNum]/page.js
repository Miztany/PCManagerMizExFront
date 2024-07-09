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

export default function EditDevice({ params }) {

	const dangerButtonClass = styles.detailButton + ' ' + styles.detailButtonDanger
	const setActiveMode = useSetRecoilState(activeMode);
	const setActiveId = useSetRecoilState(activeId);
	const saveUrlValue = useRecoilValue(saveUrl);
	const deleteUrlValue = useRecoilValue(deleteUrl);
	const setActiveTarget = useSetRecoilState(activeTarget);
	const detailUrlValue = useRecoilValue(detailUrl);
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
		registerDate: '',
		updateDate: '',
		remarks: '',
		deleteFlag: false,
	});

	useEffect(() => {
		setActiveId(params.assetNum);
		setActiveTarget('Device');
		setActiveMode('Edit');
	}, [params.assetNum]);

	// 通信して詳細を取得
	const { data, error, isLoading } = useSWR(detailUrlValue, fetcher);

	useEffect(() => {
		if (data && data.result && data.content) {
			detail.remarks = detail.remarks || '';
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
			onClick={() => router.push(`/mobile/view/Device/${params.assetNum}`)} />
		<input
			type='button'
			value='完了'
			className={styles.detailButton}
			onClick={() => {
				saveRecord(saveUrlValue, formData, setActiveMode, () => router.push(`/mobile/view/Device/${params.assetNum}`));

			}} />
	</>
	return (
		<div className={styles.editContainer}>
			<DetailHeader title='機器編集' buttons={buttons} />
			<div className={styles.detailBody}>
				<table className={styles.editTable}>
					<tbody>
						<tr><th>資産番号</th><td><input className={styles.readOnly} type='text' name='assetNum' value={formData.assetNum} onChange={handleInputChange} readOnly inert='true' /></td></tr>
						<tr><th>メーカー</th><td><input type='text' name='maker' value={formData.maker} onChange={handleInputChange} /></td></tr>
						<tr><th>OS</th><td><input type='text' name='operatingSystem' value={formData.operatingSystem} onChange={handleInputChange} /></td></tr>
						<tr><th>メモリ</th><td><input type='number' name='memory' value={formData.memory} onChange={handleInputChange} />GB</td></tr>
						<tr><th>容量</th><td><input type='text' name='capacity' value={formData.capacity} onChange={handleInputChange} /></td></tr>
						<tr><th>グラフィックボード</th><td>
							<select name='graphicsboard' value={formData.graphicsBoard} onChange={handleInputChange} >
								<option value={true}>あり</option>
								<option value={false}>なし</option>
							</select>
						</td></tr>
						<tr><th>保管場所</th><td><input type='text' name='storageLocation' value={formData.storageLocation} onChange={handleInputChange} /></td></tr>
						<tr><th>故障</th><td>
							<select name='failure' value={formData.failure} onChange={handleInputChange} >
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
			<DetailFooter buttons={<input type='button' value='削除' className={dangerButtonClass} onClick={() => deleteRecord(deleteUrlValue, formData, setActiveMode, setActiveId, () => router.push(`/mobile/list`))} />} />
		</div>
	);
}