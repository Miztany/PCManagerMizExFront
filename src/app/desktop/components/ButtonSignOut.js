import { signOut } from "next-auth/react"
import { LuLogOut } from "react-icons/lu";
import styles from './sider.module.css';

 
export default function ButtonSignOut() {
  return (
     	<div
			className={styles.logoutButton}
			onClick = {async () => {
        await signOut()
      }}
			role='button'
			tabIndex={3}
		>
			<div className={styles.icon}><LuLogOut size='30px' /></div>
			<div className={styles.text}>Logout</div>
		</div> 
  )


}