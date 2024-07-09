import Link from 'next/link';
import styles from './detail.module.css'
import { IoIosArrowBack } from "react-icons/io";

export default function DetailHeader(props) {

	return (
		<div className={styles.detailHeader}>
			<Link href='/mobile/list'><IoIosArrowBack size='30px' className={styles.backIcon} /></Link>
			<h2>{props.title}</h2>
			{props.buttons}
		</div>
	)
}