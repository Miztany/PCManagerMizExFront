'use client'

import styles from '../../view.module.css'
import DetailHeader from "@/app/mobile/compnents/detailHeader"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { detailUrl, activeId, activeMode,activeTarget } from "@/state/states"
import useSWR from "swr"
import { useEffect } from "react"
import Link from 'next/link'

const fetcher = url => fetch(url).then(r => r.json());

export default function ViewUser({params}) {

	const setActiveId = useSetRecoilState(activeId);
	const setActiveMode = useSetRecoilState(activeMode);
	const setActiveTarget = useSetRecoilState(activeTarget)
	let detailUrlValue = useRecoilValue(detailUrl);

	useEffect(() => {
		setActiveId(params.employeeNum);
		setActiveTarget('User');
		setActiveMode('View');
	}, [params.rentalId])

	// 通信して詳細を取得
	const { data, error, isLoading } = useSWR(detailUrlValue, fetcher);
	if (error) return <div>failed to load</div>;
	if (isLoading) return <></>;
	if (!data || !data.result) return <div>please try again later.</div>;

	const detail = data.content;

	let gender;
	switch(detail.gender){
		case 0: 
			gender = '男';
			break; 
		case 1: 
			gender = '女';
			break; 
		case 2: 
			gender = 'その他';
			break; 
	}

	return (
		<div className={styles.detailContainer}>
			<DetailHeader title='ユーザー詳細' buttons={<Link href={`/mobile/edit/User/${params.employeeNum}`}><input type='button' value='編集' className={styles.detailButton} /></Link>} />
			<div className={styles.detailBody}>
			<table className={styles.detailTable}>
				<tbody>
					<tr><th>社員番号</th><td>{detail.employeeNum}</td></tr>
					<tr><th>氏名</th><td>{detail.name}</td></tr>
					<tr><th>氏名（カタカナ）</th><td>{detail.nameKana}</td></tr>
					<tr><th>所属部署</th><td>{detail.department}</td></tr>
					<tr><th>電話番号</th><td>{detail.telNum}</td></tr>
					<tr><th>メールアドレス</th><td>{detail.mailAddress}</td></tr>
					<tr><th>年齢</th><td>{detail.age}</td></tr>
					<tr><th>性別</th><td>{gender}</td></tr>
					<tr><th>役職</th><td>{detail.position}</td></tr>
					<tr><th>PCアカウント権限</th><td>{detail.accountLevel}</td></tr>
					<tr><th>登録日</th><td>{detail.registerDate}</td></tr>
					<tr><th>更新日</th><td>{detail.updateDate}</td></tr>
					<tr><th>退職日</th><td>{detail.retireDate}</td></tr>
				</tbody>
			</table>
			</div>
		</div>


	);
}