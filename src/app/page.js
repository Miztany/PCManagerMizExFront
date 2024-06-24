'use client'
import List from '@/app/components/lists/list';
import Detail from '@/app/components/details/detail';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
import { useState } from 'react';
import styles from './page.module.css';
import Sider from "@/app/components/sider";
import Header from "@/app/components/header";

export default function Home() {

  // ID: レコードのID
  // target: Rental, Device, User
  // mode: View, Edit, Register, Rental, Return, Inventory 
  const [activeId, setActiveId] = useState(null);
  const [activeTarget, setActiveTarget] = useState('Rental');
  const [mode, setMode] = useState('View');
  let listUrl = process.env.NEXT_PUBLIC_SPRING_URL + '/get' + activeTarget + 'List' + '?mode=' + mode 
  let detailUrl = process.env.NEXT_PUBLIC_SPRING_URL + '/get' + activeTarget + 'Detail?id=' + activeId + '&mode=' + mode;
  let saveUrl = process.env.NEXT_PUBLIC_SPRING_URL + '/post' + activeTarget + 'Save';
  let deleteUrl = process.env.NEXT_PUBLIC_SPRING_URL + '/post' + activeTarget + 'Delete';
  let registerUrl = process.env.NEXT_PUBLIC_SPRING_URL + '/post' + activeTarget + 'Register';
  let formUrl = process.env.NEXT_PUBLIC_SPRING_URL + '/post' + activeTarget + 'mode';

  return (
    <div className={styles.windowContainer}>
      <div className={styles.windowHeader}><Header /></div>
      <div className={styles.windowNonheader}>
        <div className={styles.windowSider}><Sider activeTarget={activeTarget} setActiveTarget={setActiveTarget} setActiveId={setActiveId} setMode={setMode} /></div>
        <div className={styles.windowNonsider}>
          <PanelGroup direction="horizontal" className={styles.panelGroup}>
            <Panel defaultSize={40} minSize={20} maxSize={60}>
              <List listUrl={listUrl} setActiveId={setActiveId} activeId={activeId} activeTarget={activeTarget} setMode={setMode} />
            </Panel>
            <PanelResizeHandle className={styles.resizeHandle} />
            <Panel defaultSize={60}>
              <Detail detailUrl={detailUrl} saveUrl={saveUrl} deleteUrl={deleteUrl} formUrl={formUrl} registerUrl={registerUrl} activeTarget={activeTarget} mode={mode} setMode={setMode} setActiveId={setActiveId} />
            </Panel>
          </PanelGroup>
        </div>
      </div>
    </div>
  )

}
