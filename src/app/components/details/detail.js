'use client'

import styles from './detail.module.css';
import useSWR from 'swr';
import ViewRental from './view/viewRental';
import ViewDevice from './view/viewDevice';
import ViewUser from './view/viewUser';
import EditDevice from './edit/editDevice'

const fetcher = url => fetch(url).then(r => r.json());

export default function Detail(props) {
	if (props.detailId === null) return <></>;

	// 通信して詳細を取得
	const { data, error, isLoading } = useSWR(props.detailUrl, fetcher);
	if (error) return <div>failed to load</div>;
	if (isLoading) return <></>;
	const detail = data.content;

	let contents;
	if (data.result) {
		switch (props.activeTarget) {
			case 'Rental':
				switch (props.mode) {
					case 'View':
						contents = <><ViewRental detail={detail} setMode={props.setMode} /></>;
						break;
				}
				break;
			case 'Device':
				switch (props.mode) {
					case 'View':
						contents = <><ViewDevice detail={detail} setMode={props.setMode} /></>;
						break;
					case 'Edit':
						contents = <><EditDevice detail={detail} setMode={props.setMode} saveUrl={props.saveUrl} setActiveId={props.setActiveId} /></>
						break;
				}
				break;
			case 'User':
				switch (props.mode) {
					case 'View':
						contents = <><ViewUser detail={detail} setMode={props.setMode} /></>;
					case 'Edit':
						contents = <><EditDevice detail={detail} setMode={props.setMode} saveUrl={props.saveUrl} setActiveId={props.setActiveId} /></>
						break;
				}

				break;
		}
	} else {
		contents = <></>
	}

	return (
		<div className={styles.detailContainer}>
			{contents}
		</div>
	)
}