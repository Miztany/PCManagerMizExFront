'use client'
import List from '@/app/desktop/components/lists/list';
import Detail from '@/app/desktop/components/details/detail';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
import styles from './page.module.css';
import Sider from "@/app/desktop/components/sider";
import Header from "@/app/desktop/components/header";
import { useRecoilValue } from 'recoil';
import { activeId, activeMode } from '@/state/states';

export default function DesktopPage(){

	const activeIdValue = useRecoilValue(activeId);
	const activeModeValue = useRecoilValue(activeMode);

	return (
		<div className={styles.windowContainer}>
		  <div className={styles.windowHeader}><Header /></div>
		  <div className={styles.windowNonHeader}>
			<div className={styles.windowSider}><Sider /></div>
			<div className={styles.windowNonSider}>
			  <PanelGroup direction="horizontal" className={styles.panelGroup}>
				<Panel defaultSize={40} minSize={20} maxSize={60}>
					<List />
				</Panel>
				<PanelResizeHandle className={styles.resizeHandle} />
				<Panel defaultSize={60}>
				  <div className={styles.detailContainer}>
					{activeIdValue === null && activeModeValue !== 'Register' ? <></> : <Detail />}
				  </div>
				</Panel>
			  </PanelGroup>
			</div>
		  </div>
		</div>
	
	  );
}