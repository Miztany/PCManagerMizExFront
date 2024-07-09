'use client'

import styles from '../detail.module.css'
import DetailHeader from '../compnents/detailHeader';
import DetailFooter from '../compnents/detailFooter';
import deleteRecord from '@/app/desktop/action/deleteRecord';
import saveRecord from '@/app/desktop/action/saveRecord';
import { useState } from 'react';
import { useRecoilValue, useSetRecoilState} from 'recoil';
import { saveUrl,activeMode, activeId, deleteUrl } from '@/state/states';

export default function EditDevice(props) {

	const dangerButtonClass = styles.detailButton + ' ' + styles.detailButtonDanger
	const setActiveMode = useSetRecoilState(activeMode);
	const setActiveId = useSetRecoilState(activeId);
	const saveUrlValue = useRecoilValue(saveUrl);
	const deleteUrlValue = useRecoilValue(deleteUrl);



	const [assetNum, setAssetNum] = useState(props.detail.assetNum);
	const [maker, setMaker] = useState(props.detail.maker);
	const [operatingSystem, setOperatingSystem] = useState(props.detail.operatingSystem);
	const [memory, setMemory] = useState(props.detail.memory);
	const [capacity, setCapacity] = useState(props.detail.capacity);
	const [graphicsBoard, setGraphicsBoard] = useState(props.detail.graphicsBoard);
	const [storageLocation, setStorageLocation] = useState(props.detail.storageLocation);
	const [failure, setFailure] = useState(props.detail.failure);
	const [startDate, setStartDate] = useState(props.detail.startDate);
	const [endDate, setEndDate] = useState(props.detail.endDate);
	const [registerDate, setRegisterDate] = useState(props.detail.registerDate);
	const [updateDate, setUpdateDate] = useState(props.detail.updateDate);
	const [remarks, setRemarks] = useState(props.detail.remarks || '');
	const [deleteFlag, setDeletaFlag] = useState(props.detail.deleteFlag);

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

	return (
		<>
			<DetailHeader title='機器編集' buttons={<input type='button' value='完了' className={styles.detailButton} onClick={() => saveRecord(saveUrlValue, formData, setActiveMode)} />} />
			<div className={styles.detailBody}>
				<table className={styles.editTable}>
					<tbody>
						<tr><th>資産番号</th><td><input className={styles.readOnly} type='text' name='assetNum' value={assetNum} onChange={(e) => setAssetNum(e.target.value)} readOnly inert='true' /></td></tr>
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
			<DetailFooter buttons={<input type='button' value='削除' className={dangerButtonClass} onClick={() => deleteRecord(deleteUrlValue, formData, setActiveMode, setActiveId)} />} />
		</>
	);
}