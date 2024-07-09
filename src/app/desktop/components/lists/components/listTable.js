import styles from '../list.module.css';
import { flexRender } from '@tanstack/react-table';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { activeId, activeMode } from '@/state/states';

export default function ListTable(props) {
	const table = props.table;
	const id = props.id
	const setActiveId = useSetRecoilState(activeId);
	const setActiveMode = useSetRecoilState(activeMode);
	const activeIdValue = useRecoilValue(activeId);

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
							}}
							role='button'
							tabIndex={row.id}>
							{row.getVisibleCells().map((cell) => {			
								return (
									<td
										key={cell.id}
										className={cell.column.id === 'returnExpDate' && new Date(cell.getValue()) < new Date() ? styles.textDanger : ''}
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