import styles from "./footer.module.css";
import { LuBookOpenCheck } from "react-icons/lu";
import { LuMonitor } from "react-icons/lu";
import { LuUsers } from "react-icons/lu";
import ButtonFooter from "./buttonFooter";

export default function Footer(){

	const iconSize = '30px'
	const menu = [
		{ id: 0, icon: <LuBookOpenCheck size={iconSize} title='rental' />, text: <p>rental</p>, target: 'Rental' },
		{ id: 1, icon: <LuMonitor size={iconSize} title='device' />, text: <p>device</p>, target: 'Device' },
		{ id: 2, icon: <LuUsers size={iconSize} title='user' />, text: <p>user</p>, target: 'User' },
	];

	const elsButtons = [];
	menu.forEach((e) => {
		elsButtons.push(<ButtonFooter key={e.id} id={e.id} icon={e.icon} text={e.text} target={e.target} />);
	});


	return(
		<div className={styles.windowFooter}>
		{elsButtons}
		</div>
	)
}