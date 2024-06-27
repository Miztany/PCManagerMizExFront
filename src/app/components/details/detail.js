'use client'
import useSWR from 'swr';
import ViewRental from './view/viewRental';
import ViewDevice from './view/viewDevice';
import ViewUser from './view/viewUser';
import EditDevice from './edit/editDevice'
import RegisterDevice from './register/registerDevice';
import EditUser from './edit/editUser';
import RegisterUser from './register/registerUser';
import ManageRental from './manage/manageRental';
import ManageInventory from './manage/manageInventory';
import ManageReturn from './manage/manageReturn';
import { useRecoilValue } from 'recoil';
import { detailtUrl, activeTarget, activeMode } from '@/state/states';

const fetcher = url => fetch(url).then(r => r.json());

export default function Detail(props) {
	const activeTargetValue = useRecoilValue(activeTarget);
	const activeModeValue = useRecoilValue(activeMode);


	// 通信して詳細を取得
	const { data, error, isLoading } = useSWR(useRecoilValue(detailtUrl), fetcher);
	if (error) return <div>failed to load</div>;
	if (isLoading) return <></>;
	if (!data) return <div>please try again later.</div>;

	const detail = data.content;

	switch (activeTargetValue) {
		case 'Rental':
			switch (activeModeValue) {
				case 'View':
					return data.result ? <><ViewRental detail={detail} /></> : <></>;
				case 'Rental':
					return <><ManageRental detail={detail} /></>
				case 'Return':
					return <><ManageReturn detail={detail} /></>
				case 'Inventory':
					return <><ManageInventory detail={detail} /></>
			}
			break;
		case 'Device':
			switch (activeModeValue) {
				case 'View':
					return data.result ? <><ViewDevice detail={detail} /></> : <></>;
				case 'Edit':
					return <><EditDevice detail={detail} /></>
				case 'Register':
					return <><RegisterDevice detail={detail} /></>
			}
			break;
		case 'User':
			switch (activeModeValue) {
				case 'View':
					return data.result ? <><ViewUser detail={detail} /></> : <></>;
				case 'Edit':
					return <><EditUser detail={detail} /></>
				case 'Register':
					return <><RegisterUser detail={detail} /></>
			}
			break;
	}
	return <></>;
}