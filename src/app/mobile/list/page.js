'use client'

import styles from './list.module.css'
import Header from './components/header'
import Footer from './components/footer'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { activeTarget, listUrl, activeMode } from '@/state/states'
import useSWR from 'swr'
import ListRental from './listRental'
import ListDevice from './listDevice'
import ListUser from './listUser'
import { useEffect } from 'react'

const fetcher = url => fetch(url).then(r => r.json());

export default function List(){

	const activeTargetValue = useRecoilValue(activeTarget);
	const listUrlValue = useRecoilValue(listUrl);
	const setActiveMode = useSetRecoilState(activeMode);

	useEffect(() => {
		setActiveMode('View')
	}, [])

	// 通信して一覧を取得
	const { data, error, isLoading } = useSWR(listUrlValue, fetcher);
	if (error) return <div>failed to load</div>;
	if (isLoading) return <div>loading...</div>;
	if (!data) return <div>please try again later.</div>;
	const list = data;

	switch (activeTargetValue) {
		case 'Rental':
			return <div className={styles.windowContainer}><Header /><ListRental list={list} /><Footer /></div>;
		case 'Device':
			return <div className={styles.windowContainer}><Header /><ListDevice list={list} /><Footer /></div>;
		case 'User':
			return <div className={styles.windowContainer}><Header /><ListUser list={list} /><Footer /></div>;
		default:
			return <></>;
	}
}