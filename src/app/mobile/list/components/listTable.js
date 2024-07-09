'use client'

import styles from '../list.module.css';
import { flexRender } from '@tanstack/react-table';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { activeId, activeMode, activeTarget } from '@/state/states';
import { useRouter } from 'next/navigation';

export default function ListTable(props) {
	const table = props.table;
	const id = props.id;
	const setActiveId = useSetRecoilState(activeId);
	const setActiveMode = useSetRecoilState(activeMode);
	const activeIdValue = useRecoilValue(activeId);
	const activeTargetValue = useRecoilValue(activeTarget)
	const router = useRouter();

	return (
		<table className={styles.table}>
			<thead>
				{table.getHeaderGroups().map(headerGroup => {
					return (
						<tr key={headerGroup.id} className={styles.header}>
							{headerGroup.headers.map(header => (
								<th key={header.id} colSpan={header.colSpan}>
									{flexRender(
										header.column.columnDef.header,
										header.getContext()
									)}
								</th>
							))}
						</tr>
					)
				})}
			</thead>
			<tbody>
				{table.getRowModel().rows.map((row) => {
					return (
						<tr
							key={row.id}
							className={row.getValue(id) === activeIdValue ? styles.record + ' ' + styles.active : styles.record}
							onClick={() => {
								setActiveId(row.getValue(id));
								setActiveMode('View');
								router.push(`/mobile/view/${activeTargetValue}/${row.getValue(id)}`);
							}}
							role='button'
							tabIndex={row.id}>
							{row.getVisibleCells().map((cell) => {			
								return (
									<td
										key={cell.id}
									>
										{flexRender(
											cell.column.columnDef.cell,
											cell.getContext()
										)}
									</td>
								);
							})}
						</tr>
					);
				})}
			</tbody>
		</table>
	)
}