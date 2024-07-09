import styles from './detail.module.css'

export default function DetailFooter(props) {
	return (
		<div className={styles.detailFooter}>
			<div></div>
			{props.buttons}
		</div>
	)
}