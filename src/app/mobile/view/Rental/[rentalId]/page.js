'use client'
import { useRecoilValue, useSetRecoilState } from "recoil"
import { detailUrl, activeId, activeMode, activeTarget } from "@/state/states"
import DetailHeader from "@/app/mobile/compnents/detailHeader"
import useSWR from "swr"
import styles from '../../view.module.css'
import { useEffect } from "react"
import Link from "next/link"

const fetcher = url => fetch(url).then(r => r.json());

export default function ViewRental({ params }) {
	const setActiveId = useSetRecoilState(activeId);
	const setActiveTarget = useSetRecoilState(activeTarget);
	const setActiveMode = useSetRecoilState(activeMode);
	let detailUrlValue = useRecoilValue(detailUrl);

	useEffect(() => {
		setActiveId(params.rentalId);
		setActiveTarget('Rental');
		setActiveMode('View');
	}, [params.rentalId])

	// 通信して詳細を取得
	const { data, error, isLoading } = useSWR(detailUrlValue, fetcher);
	if (error) return <div>failed to load</div>;
	if (isLoading) return <></>;
	if (!data || !data.result) return <div>please try again later.</div>;

	const detail = data.content;

	let returnExpDate;
	let buttons;
	if (detail.free) {
		buttons = <>
			<Link href={`/mobile/manage/${params.rentalId}/manageRental`}><input type='button' value='貸出' className={styles.detailButton} /></Link>
			<Link href={`/mobile/manage/${params.rentalId}/manageInventory`}><input type='button' value='棚卸' className={styles.detailButton} onClick={() => setActiveMode('Inventory')} /></Link>
		</>
	} else {
		let dt = new Date(detail.loanDate);
		dt.setMonth(dt.getMonth() + 3);
		returnExpDate = dt.toLocaleDateString('sv-SE')
		buttons = <>
			<Link href={`/mobile/manage/${params.rentalId}/manageReturn`}><input type='button' value='返却' className={styles.detailButton} onClick={() => setActiveMode('Return')} /></Link>
			<Link href={`/mobile/manage/${params.rentalId}/manageInventory`}><input type='button' value='棚卸' className={styles.detailButton} onClick={() => setActiveMode('Inventory')} /></Link>
		</>

	}

	return (
		<div className={styles.detailContainer}>
			<DetailHeader title='貸出情報詳細'  buttons={buttons}/>
			<div className={styles.detailBody}>
				<table className={styles.detailTable}>
					<tbody>
						<tr><th>ID</th><td>{detail.rentalId}</td></tr>
						<tr><th>資産番号</th><td>{detail.device ? detail.device.assetNum : ''}</td></tr>
						<tr><th>メーカー</th><td>{detail.device ? detail.device.maker : ''}</td></tr>
						<tr><th>OS</th><td>{detail.device ? detail.device.operatingSystem : ''}</td></tr>
						<tr><th>保管場所</th><td>{detail.device ? detail.device.storageLocation : ''}</td></tr>
						<tr><th>状態</th><td>{detail.free ? '利用可' : '利用中'}</td></tr>
						<tr><th>使用者：社員番号</th><td>{detail.user ? detail.user.employeeNum : ''}</td></tr>
						<tr><th>使用者：氏名</th><td>{detail.user ? detail.user.name : ''}</td></tr>
						<tr><th>貸出日</th><td>{detail.user ? detail.loanDate : ''}</td></tr>
						<tr><th>返却予定日</th><td>{detail.user ? returnExpDate : ''}</td></tr>
						<tr><th>棚卸日</th><td>{detail.inventoryDate}</td></tr>
						<tr><th>備考</th><td>{detail.remarks}</td></tr>
					</tbody>
				</table>
			</div>
		</div>
	);

}