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

export default function ListDevice(props) {

	// 中身を作成
	const list = structuredClone(props.list)
	list.forEach((r) => {
		r.failure = r.failure ? '故障中' : ''
	})

	const buttons = <input
		type='button'
		value='新規登録'
		className={styles.listButton}
		onClick={() => {
			props.setMode('Register');
			props.setActiveId(null);
		}}
	/>

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

	const DATA = list
	const COLUMNS = [
		{
			header: ({ column }) => {
				return (
					<div
						style={{ flex: "auto", cursor: "pointer" }}
						onClick={column.getToggleSortingHandler()}
					>
						資産番号{getSortIcon(column.getIsSorted())}
					</div>
				);
			},
			accessorKey: 'assetNum'
		},
		{
			header: ({ column }) => {
				return (
					<div
						style={{ flex: "auto", cursor: "pointer" }}
						onClick={column.getToggleSortingHandler()}
					>
						メーカー{getSortIcon(column.getIsSorted())}
					</div>
				);
			},
			accessorKey: 'maker'
		},
		{
			header: ({ column }) => {
				return (
					<div
						style={{ flex: "auto", cursor: "pointer" }}
						onClick={column.getToggleSortingHandler()}
					>
						OS{getSortIcon(column.getIsSorted())}
					</div>
				);
			},
			accessorKey: 'operatingSystem'
		},
		{
			header: ({ column }) => {
				return (
					<div
						style={{ flex: "auto", cursor: "pointer" }}
						onClick={column.getToggleSortingHandler()}
					>
						保管場所{getSortIcon(column.getIsSorted())}
					</div>
				);
			},
			accessorKey: 'storageLocation'
		},
		{
			header: ({ column }) => {
				return (
					<div
						style={{ flex: "auto", cursor: "pointer" }}
						onClick={column.getToggleSortingHandler()}
					>
						故障{getSortIcon(column.getIsSorted())}
					</div>
				);
			},
			accessorKey: 'failure'
		},
	]

	const columns = useMemo(() => COLUMNS, []);
	const data = useMemo(() => DATA, []);


	const table = useReactTable({
		data,
		columns,
		initialState: {
			sorting: [{ id: "assetNum", desc: false }],
		},
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
	});


	const filter = <input type='text' className={styles.listFilter} placeholder="検索" onChange={(e) => table.setGlobalFilter(e.target.value)} /> 

	return (
		<div className={styles.listContainer}>
			<ListHeader title='機器一覧'  filter={filter} />
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
									className={row.getValue('assetNum') === props.activeId ? styles.record + ' ' + styles.active : styles.record}
									onClick={() => {
										props.setActiveId(row.getValue('assetNum'));
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