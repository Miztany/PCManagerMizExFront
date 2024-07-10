'use client'
import styles from '../../manage.module.css'
import { useState } from 'react';
import saveRecord from '@/app/mobile/action/saveRecord';
import DetailHeader from '@/app/mobile/compnents/detailHeader';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { manageUrl, activeMode, activeId, activeTarget, detailUrl } from '@/state/states';
import { useEffect } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';

const fetcher = url => fetch(url).then(r => r.json());

export default function ManageInventory({ params }) {

	const manageUrlValue = useRecoilValue(manageUrl);
	const detailUrlValue = useRecoilValue(detailUrl);
	const setActiveMode = useSetRecoilState(activeMode);
	const setActiveId = useSetRecoilState(activeId);
	const setActiveTarget = useSetRecoilState(activeTarget);
	const router = useRouter();

	const [formData, setFormData] = useState({
		rentalId: params.rentalId,
		returnDate: (new Date()).toLocaleDateString('sv-SE'),
		remarks: '',
	});

	useEffect(() => {
		setActiveId(params.rentalId);
		setActiveTarget('Rental');
		setActiveMode('Return');
	}, [params.rentalId]);

	// 通信して詳細を取得
	const { data, error, isLoading } = useSWR(detailUrlValue, fetcher);

	useEffect(() => {
		if (data && data.result && data.content) {
			let fdc = structuredClone(formData);
			fdc.remarks = detail.remarks || ''
			setFormData(fdc);
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
			onClick={() => router.push(`/mobile/view/Rental/${params.rentalId}`)} />
		<input
			type='button'
			value='完了'
			className={styles.detailButton}
			onClick={() => saveRecord(manageUrlValue, formData, setActiveMode, () => router.push(`/mobile/view/Rental/${params.rentalId}`))} />
	</>

	return (
		<div className={styles.manageContainer}>
			<DetailHeader title='返却' buttons={buttons} />
			<table className={styles.editTable}>
				<tbody>
					<tr><th>ID</th><td><input className={styles.readOnly} type='number' name='rentalId' value={formData.rentalId} onChange={handleInputChange} readOnly inert='true' /></td></tr>
					<tr><th>返却日</th><td><input type='date' name='returnDate' value={formData.returnDate} onChange={handleInputChange} /></td></tr>
					<tr><th>備考</th><td><input type='text' name='remarks' value={formData.remarks} onChange={handleInputChange} /></td></tr>
				</tbody>
			</table>
		</div>
	)
}


