'use client'

import styles from './sideButton.module.css';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { activeTarget, activeMode, activeId } from '@/state/states'

export default function SideButton(props) {

	const setActiveId = useSetRecoilState(activeId);
	const setActiveMode = useSetRecoilState(activeMode);
	const setActiveTarget = useSetRecoilState(activeTarget);

	const buttonClass = props.target === useRecoilValue(activeTarget) ? styles.sideButton + ' ' + styles.activeButton : styles.sideButton

	return (
		<div
			className={buttonClass}
			onClick={() => {
				setActiveMode('View');
				setActiveId(null);
				setActiveTarget(props.target);
			}}
			role='button'
			tabIndex={props.id}
		>
			<div className={styles.icon}>{props.icon}</div>
			<div className={styles.text}>{props.text}</div>

		</div>
	)
}