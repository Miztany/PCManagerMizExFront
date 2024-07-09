import styles from './list.module.css';
import { getCoreRowModel, useReactTable, getSortedRowModel, getFilteredRowModel } from "@tanstack/react-table";
import { useMemo } from "react";
import { columnsRental } from './columns/columnsRental';
import ListTable from './components/listTable';

export default function ListRental(props) {

	let dataRental = [];
	props.list.forEach((r) => {
		// データの加工
		let status;
		let returnExpDate;
		if (r.free) {
			status = '貸出可'
		} else {
			status = '貸出中：' + r.user.name;
			let dt = new Date(r.loanDate);
			dt.setMonth(dt.getMonth() + 3);
			if(dt < new Date()){
				status = '期限超過：' + r.user.name;
			}
			returnExpDate = dt.toLocaleDateString('sv-SE')
		}
		dataRental.push({
			rentalId: r.rentalId,
			assetNum: r.device.assetNum,
			status: status,
			loanDate: r.loanDate,
			returnExpDate: returnExpDate,
		});
	})

	const columns = useMemo(() => columnsRental, []);
	const data = useMemo(() => dataRental, []);

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
				<ListTable table={table} id='rentalId' />
		</div>
	);
}