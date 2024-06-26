import ListHeader from './listHeader';
import styles from './list.module.css';
import {
	flexRender,
	getCoreRowModel,
	useReactTable,
	getSortedRowModel,
	getFilteredRowModel,
} from "@tanstack/react-table";
import { useMemo } from "react";
import {
	TiArrowSortedDown,
	TiArrowSortedUp,
	TiArrowUnsorted,
} from "react-icons/ti";
import ListFooter from './listFooter';

export default function ListUser(props) {

	const buttons = <input
		type='button'
		value='新規登録'
		className={styles.listButton}
		onClick={() => {
			props.setMode('Register');
			props.setActiveId(null);
		}} />

	const getSortIcon = (sortDirection) => {
		switch (sortDirection) {
			case "asc":
				return <TiArrowSortedUp className={styles.sorticon} />;
			case "desc":
				return <TiArrowSortedDown className={styles.sorticon} />;
			default:
				return <TiArrowUnsorted className={styles.sorticon} />;
		}
	};

	const DATA = props.list;
	const COLUMNS = [
		{
			header: ({ column }) => {
				return (
					<div
						style={{ flex: "auto", cursor: "pointer" }}
						onClick={column.getToggleSortingHandler()}
					>
						社員番号{getSortIcon(column.getIsSorted())}
					</div>
				);
			},
			accessorKey: 'employeeNum'
		},
		{
			header: ({ column }) => {
				return (
					<div
						style={{ flex: "auto", cursor: "pointer" }}
						onClick={column.getToggleSortingHandler()}
					>
						氏名{getSortIcon(column.getIsSorted())}
					</div>
				);
			},
			accessorKey: 'name'
		},
		{
			header: ({ column }) => {
				return (
					<div
						style={{ flex: "auto", cursor: "pointer" }}
						onClick={column.getToggleSortingHandler()}
					>
						所属部署{getSortIcon(column.getIsSorted())}
					</div>
				);
			},
			accessorKey: 'department'
		},
		{
			header: ({ column }) => {
				return (
					<div
						style={{ flex: "auto", cursor: "pointer" }}
						onClick={column.getToggleSortingHandler()}
					>
						年齢{getSortIcon(column.getIsSorted())}
					</div>
				);
			},
			accessorKey: 'age'
		},
		{
			header: ({ column }) => {
				return (
					<div
						style={{ flex: "auto", cursor: "pointer" }}
						onClick={column.getToggleSortingHandler()}
					>
						役職{getSortIcon(column.getIsSorted())}
					</div>
				);
			},
			accessorKey: 'position'
		},
		{
			header: ({ column }) => {
				return (
					<div
						style={{ flex: "auto", cursor: "pointer" }}
						onClick={column.getToggleSortingHandler()}
					>
						PCアカウント権限{getSortIcon(column.getIsSorted())}
					</div>
				);
			},
			accessorKey: 'accountLevel'
		},
	]

	const columns = useMemo(() => COLUMNS, []);
	const data = useMemo(() => DATA, []);


	const table = useReactTable({
		data,
		columns,
		initialState: {
			sorting: [{ id: "employeeNum", desc: false }],
		},
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
	});

	const filter = <input type='text' className={styles.listFilter} placeholder="検索" onChange={(e) => table.setGlobalFilter(e.target.value)} /> 
	

	return (
		<div className={styles.listContainer}>
			<ListHeader title='ユーザー一覧' buttons={buttons}  filter={filter} />
			<div className={styles.listBody}>
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
									className={row.getValue('employeeNum') === props.activeId ? styles.record + ' ' + styles.active : styles.record}
									onClick={() => {
										props.setActiveId(row.getValue('employeeNum'));
										props.setMode('View');
									}}
									role='button'
									tabIndex={row.id}>
									{row.getVisibleCells().map((cell) => {
										return (
											<td key={cell.id}>
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
			</div>
			<ListFooter title='' buttons={buttons} />
		</div>
	)

}