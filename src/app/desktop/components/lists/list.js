'use client'
import useSWR from 'swr';
import ListRental from './listRental';
import ListDevice from './listDevice';
import ListUser from './listUser';
import { useRecoilValue } from 'recoil';
import { listUrl, activeTarget } from '@/state/states';


const fetcher = url => fetch(url).then(r => r.json());

export default function List(props) {

	const activeTargetValue = useRecoilValue(activeTarget);
	const listUrlValue = useRecoilValue(listUrl);

	// 通信して一覧を取得
	const { data, error, isLoading } = useSWR(listUrlValue, fetcher);
	if (error) return <div>failed to load</div>;
	if (isLoading) return <div>loading...</div>;
	if (!data) return <div>please try again later.</div>;
	const list = data;

	console.log(listUrlValue);

	switch (activeTargetValue) {
		case 'Rental':
			return <><ListRental list={list} /></>;
		case 'Device':
			return <><ListDevice list={list} /></>;
		case 'User':
			return <><ListUser list={list} /></>;
		default:
			return <></>;
	}


}