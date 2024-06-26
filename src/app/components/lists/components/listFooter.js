import styles from '../list.module.css'
import ListButtonNew from './listButtonNew';


export default function ListFooter(props) {
	return (
		<div className={styles.listFooter}>
			<div></div>
			<ListButtonNew />
		</div>
	)
}