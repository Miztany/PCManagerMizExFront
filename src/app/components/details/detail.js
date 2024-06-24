'use client'

import styles from './detail.module.css';
import useSWR from 'swr';
import ViewRental from './view/viewRental';
import ViewDevice from './view/viewDevice';
import ViewUser from './view/viewUser';
import EditDevice from './edit/editDevice'
import RegisterDevice from './register/registerDevice';
import EditUser from './edit/editUser';
import RegisterUser from './register/registerUser';

const fetcher = url => fetch(url).then(r => r.json());

export default function Detail(props) {
	if (props.detailId === null) return <></>;

	// 通信して詳細を取得
	const { data, error, isLoading } = useSWR(props.detailUrl, fetcher);
	if (error) return <div>failed to load</div>;
	if (isLoading) return <></>;
	const detail = data.content;

	let contents;

	switch (props.activeTarget) {
		case 'Rental':
			switch (props.mode) {
				case 'View':
					contents = data.result ? <><ViewRental detail={detail} setMode={props.setMode} /></> : <></>;
					break;
			}
			break;
		case 'Device':
			switch (props.mode) {
				case 'View':
					contents = data.result ? <><ViewDevice detail={detail} setMode={props.setMode} /></> : <></>;
					break;
				case 'Edit':
					contents = <><EditDevice detail={detail} setMode={props.setMode} saveUrl={props.saveUrl} deleteUrl={props.deleteUrl} mode={props.mode} registerUrl={props.registerUrl} setActiveId={props.setActiveId} /></>
					break;
				case 'Register':
					contents = <><RegisterDevice detail={detail} setMode={props.setMode} saveUrl={props.saveUrl} deleteUrl={props.deleteUrl} mode={props.mode} registerUrl={props.registerUrl} setActiveId={props.setActiveId} /></>
					break;
			}
			break;
		case 'User':
			switch (props.mode) {
				case 'View':
					contents = data.result ? <><ViewUser detail={detail} setMode={props.setMode} /></> : <></>;
					break;
				case 'Edit':
					contents = <><EditUser detail={detail} setMode={props.setMode} saveUrl={props.saveUrl} deleteUrl={props.deleteUrl} mode={props.mode} registerUrl={props.registerUrl} setActiveId={props.setActiveId} /></>
					break;
				case 'Register':
					contents = <><RegisterUser detail={detail} setMode={props.setMode} saveUrl={props.saveUrl} deleteUrl={props.deleteUrl} mode={props.mode} registerUrl={props.registerUrl} setActiveId={props.setActiveId} /></>
					break;
			}
			break;
	}

	return (
		<div className={styles.detailContainer}>
			{contents}
		</div>
	)
}