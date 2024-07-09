'use client'

import styles from '../../view.module.css'
import DetailHeader from "@/app/mobile/compnents/detailHeader"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { detailUrl, activeId, activeMode,activeTarget } from "@/state/states"
import useSWR from "swr"
import { useEffect } from "react"
import Link from 'next/link'

const fetcher = url => fetch(url).then(r => r.json());

export default function ViewDevice({params}) {

	const setActiveId = useSetRecoilState(activeId);
	const setActiveMode = useSetRecoilState(activeMode);
	const setActiveTarget = useSetRecoilState(activeTarget)
	let detailUrlValue = useRecoilValue(detailUrl);

	useEffect(() => {
		setActiveId(params.assetNum);
		setActiveTarget('Device');
		setActiveMode('View')
	}, [params.rentalId])

	// 通信して詳細を取得
	const { data, error, isLoading } = useSWR(detailUrlValue, fetcher);
	if (error) return <div>failed to load</div>;
	if (isLoading) return <></>;
	if (!data || !data.result) return <div>please try again later.</div>;

	const detail = data.content;

	return (
		<div className={styles.detailContainer}>
			<DetailHeader title='機器詳細' buttons={<Link href={`/mobile/edit/Device/${params.assetNum}`}><input type='button' value='編集' className={styles.detailButton} /></Link>} />
			<div className={styles.detailBody}>
			<table className={styles.detailTable}>
				<tbody>
					<tr><th>資産番号</th><td>{detail.assetNum}</td></tr>
					<tr><th>メーカー</th><td>{detail.maker}</td></tr>
					<tr><th>OS</th><td>{detail.operatingSystem}</td></tr>
					<tr><th>メモリ</th><td>{detail.memory}GB</td></tr>
					<tr><th>容量</th><td>{detail.capacity}</td></tr>
					<tr><th>グラフィックボード</th><td>{detail.graphicsBoard ? 'あり' : 'なし'}</td></tr>
					<tr><th>保管場所</th><td>{detail.storageLocation}</td></tr>
					<tr><th>故障</th><td>{detail.failure ? '故障中' : ''}</td></tr>
					<tr><th>リース開始日</th><td>{detail.startDate}</td></tr>
					<tr><th>リース期限日</th><td>{detail.endDate}</td></tr>
					<tr><th>登録日</th><td>{detail.registerDate}</td></tr>
					<tr><th>更新日</th><td>{detail.updateDate}</td></tr>
					<tr><th>備考</th><td>{detail.remarks}</td></tr>
				</tbody>
			</table>
			</div>
		</div>
	);
}