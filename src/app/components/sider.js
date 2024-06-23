'use client'

import { LuBookOpenCheck } from "react-icons/lu";
import { LuMonitor } from "react-icons/lu";
import { LuUsers } from "react-icons/lu";
import SideButton from "./sideButton";
import { useState } from "react";
import styles from "./sider.module.css"

export default function Sider(props) {
	const iconSize = '30px'
	const menu = [
		{ id: 0, icon: <LuBookOpenCheck size={iconSize} title='rental' />, text: <p>rental</p>, target:'Rental'},
		{ id: 1, icon: <LuMonitor size={iconSize} title='device' />, text: <p>device</p>, target:'Device'},
		{ id: 2, icon: <LuUsers size={iconSize} title='user' />, text: <p>user</p>, target:'User'},

	];

	const elsButtons = [];
	menu.forEach((e) => {
		elsButtons.push(<SideButton key={e.id} id={e.id} icon={e.icon} text={e.text} target={e.target} activeTarget={props.activeTarget} setActiveTarget={props.setActiveTarget} setActiveId={props.setActiveId} setMode={props.setMode} />);
	});

	return (
		<div className={styles.siderContainer}>
			{elsButtons}
		</div>

	)
}