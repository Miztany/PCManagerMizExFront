'use client'
import List from '@/app/components/lists/list';
import Detail from '@/app/components/details/detail';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
import styles from './page.module.css';
import Sider from "@/app/components/sider";
import Header from "@/app/components/header";
import { useRecoilValue } from 'recoil';
import { activeId } from '@/state/states';


export default function Home() {

  const activeIdValue = useRecoilValue(activeId);

  return (

    <div className={styles.windowContainer}>
      <div className={styles.windowHeader}><Header /></div>
      <div className={styles.windowNonheader}>
        <div className={styles.windowSider}><Sider /></div>
        <div className={styles.windowNonsider}>
          <PanelGroup direction="horizontal" className={styles.panelGroup}>
            <Panel defaultSize={40} minSize={20} maxSize={60}>
                <List />
            </Panel>
            <PanelResizeHandle className={styles.resizeHandle} />
            <Panel defaultSize={60}>
              <div className={styles.detailContainer}>
                {activeIdValue === null ? <></> : <Detail />}
              </div>
            </Panel>
          </PanelGroup>
        </div>
      </div>
    </div>

  );
}
