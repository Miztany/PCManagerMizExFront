import styles from "./header.module.css";

export default function Header(){
	return(
		<div className={styles.windowHeader}>
		<h1 className={styles.windowTitle}>PC貸出管理</h1>
		</div>
	)
}