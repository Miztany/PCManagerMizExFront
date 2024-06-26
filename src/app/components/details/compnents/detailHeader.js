import styles from '../detail.module.css'


export default function DetailHeader(props) {
	return (
		<div className={styles.detailHeader}>
			<h2>{props.title}</h2>
			{props.buttons}
		</div>
	)
}