import { TiArrowSortedDown, TiArrowSortedUp, TiArrowUnsorted, } from "react-icons/ti";
import styles from '../list.module.css'

export const getSortIcon = (sortDirection) => {
	switch (sortDirection) {
		case "asc":
			return <TiArrowSortedUp className={styles.sorticon} />;
		case "desc":
			return <TiArrowSortedDown className={styles.sorticon} />;
		default:
			return <TiArrowUnsorted className={styles.sorticon} />;
	}
};
