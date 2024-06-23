'use client'

import { useRouter } from 'next/navigation';
import styles from './sideButton.module.css';

export default function SideButton(props) {

	const router = useRouter();
	const buttonClass = props.target === props.activeTarget ? styles.sideButton + ' ' + styles.activeButton : styles.sideButton
	
	return (
		<div
			className={buttonClass}
			onClick={() => {
				props.setActiveId(null);
				props.setMode('View');
				props.setActiveTarget(props.target);
			}}
			role='button'
			tabIndex={props.id}
		>
			<div className={styles.icon}>{props.icon}</div>
			<div className={styles.text}>{props.text}</div>

		</div>
	)
}