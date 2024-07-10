import styles from './detail.module.css'
import { LuPlus } from "react-icons/lu";
import Link from 'next/link';

export default function ButtonRegister(props) {
	return (
		<Link href={props.url} className={styles.linkRegister}><LuPlus size='40px' className={styles.icon} /></Link>
	)
}