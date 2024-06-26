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

export default function ListRental(props) {

	let rentalData = [];
	props.list.forEach((r) => {


		// 状態の設定
		let status;
		let returnExpDate;
		if (r.free) {
			status = '貸出可'
		} else {
			status = '貸出中：' + r.user.name
			let dt = new Date(r.loanDate);
			dt.setMonth(dt.getMonth() + 3);
			returnExpDate = dt.toLocaleDateString('sv-SE')
		}

		rentalData.push({
			rentalId: r.rentalId,
			assetNum: r.device.assetNum,
			status: status,
			loanDate: r.loanDate,
			returnExpDate: returnExpDate,
		});
	})

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


	const DATA = rentalData
	const COLUMNS = [
		{
			header: ({ column }) => {
				return (
					<div
						style={{ flex: "auto", cursor: "pointer" }}
						onClick={column.getToggleSortingHandler()}
					>
						ID{getSortIcon(column.getIsSorted())}
					</div>
				);
			},
			accessorKey: 'rentalId'
		},
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
						状態{getSortIcon(column.getIsSorted())}
					</div>
				);
			},
			accessorKey: 'status'
		},
		{
			header: ({ column }) => {
				return (
					<div
						style={{ flex: "auto", cursor: "pointer" }}
						onClick={column.getToggleSortingHandler()}
					>
						貸出日{getSortIcon(column.getIsSorted())}
					</div>
				);
			},
			accessorKey: 'loanDate'
		},
		{
			header: ({ column }) => {
				return (
					<div
						style={{ flex: "auto", cursor: "pointer" }}
						onClick={column.getToggleSortingHandler()}
					>
						返却予定日{getSortIcon(column.getIsSorted())}
					</div>
				);
			},
			accessorKey: 'returnExpDate'
		},
	]

	const columns = useMemo(() => COLUMNS, []);
	const data = useMemo(() => DATA, []);


	const table = useReactTable({
		data,
		columns,
		initialState: {
			sorting: [{ id: "rentalId", desc: false }],
		},
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
	});

	const filter = <input type='text' className={styles.listFilter} placeholder="検索" onChange={(e) => table.setGlobalFilter(e.target.value)} /> 

	return (
		<div className={styles.listContainer}>
			<ListHeader title='貸出情報一覧' filter={filter} />
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
									className={row.getValue('rentalId') === props.activeId ? styles.record + ' ' + styles.active : styles.record}
									onClick={() => {
										props.setActiveId(row.getValue('rentalId'));
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
		</div>
	);

}