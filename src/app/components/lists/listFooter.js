import styles from './list.module.css'


export default function ListFooter(props) {
	return (
		<div className={styles.listFooter}>
			<h2>{props.title}</h2>
			{props.buttons}
		</div>
	)
}