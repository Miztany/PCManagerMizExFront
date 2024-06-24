import styles from './list.module.css';
import useSWR from 'swr';
import ListRental from './listRental';
import ListDevice from './listDevice';
import ListUser from './listUser';


const fetcher = url => fetch(url).then(r => r.json());

export default function List(props) {

	// 通信して一覧を取得
	const { data, error, isLoading } = useSWR(props.listUrl, fetcher);
	if (error) return <div>failed to load</div>;
	if (isLoading) return <div>loading...</div>;
	const list = data;

	let contents;
	switch (props.activeTarget) {
		case 'Rental':
			contents = <><ListRental list={list} activeId={props.activeId} setActiveId={props.setActiveId} setMode={props.setMode} /></>;
			break;
		case 'Device':
			contents = <><ListDevice list={list} activeId={props.activeId} setActiveId={props.setActiveId} setMode={props.setMode} /></>;
			break;
		case 'User':
			contents = <><ListUser list={list} activeId={props.activeId} setActiveId={props.setActiveId} setMode={props.setMode} /></>;
			break;
	}

	return (
		<div className={styles.listContainer}>
			{contents}
		</div>
	)
}