import styles from '../list.module.css'
import { useSetRecoilState } from 'recoil';
import { activeId, activeMode } from '@/state/states';

export default function ListButtonNew() {

	const setActiveMode = useSetRecoilState(activeMode);
	const setActiveId = useSetRecoilState(activeId);

	return (
		<input
			type='button'
			value='新規登録'
			className={styles.listButton}
			onClick={() => {
				setActiveMode('Register');
				setActiveId(null);
			}}
		/>
	)
}