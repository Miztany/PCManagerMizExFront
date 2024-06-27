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

	// 通信して一覧を取得
	const { data, error, isLoading, mutate } = useSWR(useRecoilValue(listUrl), fetcher);
	// setRefreshList(mutate);
	if (error) return <div>failed to load</div>;
	if (isLoading) return <div>loading...</div>;
	const list = data;

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