import styles from './list.module.css';
import { getCoreRowModel, useReactTable, getSortedRowModel, getFilteredRowModel } from "@tanstack/react-table";
import { useMemo } from "react";
import { columnsDevice } from './columns/columnsDevice';
import ListTable from './components/listTable';


export default function ListDevice(props) {

	// データの加工
	const dataDevice = structuredClone(props.list)
	dataDevice.forEach((r) => {
		r.failure = r.failure ? '故障中' : ''
	})

	const columns = useMemo(() => columnsDevice, []);
	const data = useMemo(() => dataDevice, []);

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


	const filter = <input type='text' className={styles.listFilter} placeholder="検索" onChange={(e) => table.setGlobalFilter(e.target.value)} />;

	return (
		<div className={styles.listContainer}>
				<ListTable table={table} id='assetNum' />
		</div>

	);
}