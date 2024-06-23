import styles from './list.module.css'


export default function ListHeader(props) {
	return (
		<div className={styles.listHeader}>
			<h2>{props.title}</h2>
			{props.buttons}
		</div>
	)
}