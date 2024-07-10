'use client'

import styles from '../detail.module.css'
import DetailHeader from '../components/detailHeader';
import DetailFooter from '../components/detailFooter';
import registerRecord from '@/app/desktop/action/registerRecord';
import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { activeId, activeMode, registerUrl } from '@/state/states';

export default function RegisterDevice(props) {

	const setActiveId = useSetRecoilState(activeId);
	const setActiveMode = useSetRecoilState(activeMode);
	const registerUrlValue = useRecoilValue(registerUrl);

	const [assetNum, setAssetNum] = useState('');
	const [maker, setMaker] = useState('');
	const [operatingSystem, setOperatingSystem] = useState('');
	const [memory, setMemory] = useState(0);
	const [capacity, setCapacity] = useState('');
	const [graphicsBoard, setGraphicsBoard] = useState(false);
	const [storageLocation, setStorageLocation] = useState('');
	const [failure, setFailure] = useState(false);
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [registerDate, setRegisterDate] = useState((new Date()).toLocaleDateString('sv-SE'));
	const [updateDate, setUpdateDate] = useState((new Date()).toLocaleDateString('sv-SE'));
	const [remarks, setRemarks] = useState('');
	const [deleteFlag, setDeletaFlag] = useState(false);

	const formData = {
		assetNum: assetNum,
		maker: maker,
		operatingSystem: operatingSystem,
		memory: memory,
		capacity: capacity,
		graphicsBoard: graphicsBoard,
		storageLocation: storageLocation,
		failure: failure,
		startDate: startDate,
		endDate: endDate,
		registerDate: registerDate,
		updateDate: updateDate,
		remarks: remarks,
		deleteFlag: deleteFlag,
	}

	const buttons = <>
		<input type='button' value='キャンセル' className={styles.detailButton} onClick={() => setActiveMode('View')} />
	<input type='button' value='完了' className={styles.detailButton} onClick={() => { registerRecord(registerUrlValue, formData, setActiveMode, () => setActiveId(assetNum)) }} />
	</>

	return (
		<>
			<DetailHeader title='機器登録' buttons={buttons} />
			<div className={styles.detailBody}>
				<table className={styles.editTable}>
					<tbody>
						<tr><th>資産番号</th><td><input type='text' name='assetNum' value={assetNum} onChange={(e) => setAssetNum(e.target.value)} /></td></tr>
						<tr><th>メーカー</th><td><input type='text' name='maker' value={maker} onChange={(e) => setMaker(e.target.value)} /></td></tr>
						<tr><th>OS</th><td><input type='text' name='operatingSystem' value={operatingSystem} onChange={(e) => setOperatingSystem(e.target.value)} /></td></tr>
						<tr><th>メモリ</th><td><input type='number' name='memory' value={memory} onChange={(e) => setMemory(e.target.value)} />GB</td></tr>
						<tr><th>容量</th><td><input type='text' name='capacity' value={capacity} onChange={(e) => setCapacity(e.target.value)} /></td></tr>
						<tr><th>グラフィックボード</th><td>
							<select name='graphicsboard' value={graphicsBoard} onChange={(e) => setGraphicsBoard(e.target.value)}>
								<option value={true}>あり</option>
								<option value={false}>なし</option>
							</select>
						</td></tr>
						<tr><th>保管場所</th><td><input type='text' name='storageLocation' value={storageLocation} onChange={(e) => setStorageLocation(e.target.value)} /></td></tr>
						<tr><th>故障</th><td>
							<select name='failure' value={failure} onChange={(e) => setFailure(e.target.value)}>
								<option value={true}>あり</option>
								<option value={false}>なし</option>
							</select>
						</td></tr>
						<tr><th>リース開始日</th><td><input type='date' name='startDate' value={startDate} onChange={(e) => setStartDate(e.target.value)} /></td></tr>
						<tr><th>リース期限日</th><td><input type='date' name='endDate' value={endDate} onChange={(e) => setEndDate(e.target.value)} /></td></tr>
						<tr><th>登録日</th><td><input type='date' name='registerDate' value={registerDate} onChange={(e) => setRegisterDate(e.target.value)} /></td></tr>
						<tr><th>更新日</th><td><input type='date' name='updateDate' value={updateDate} onChange={(e) => setUpdateDate(e.target.value)} /></td></tr>
						<tr><th>備考</th><td><input type='text' name='remarks' value={remarks} onChange={(e) => setRemarks(e.target.value)} /></td></tr>
					</tbody>
				</table>
			</div>
			<DetailFooter />
		</>
	)
}