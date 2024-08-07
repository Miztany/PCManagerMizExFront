import styles from './list.module.css';
import { getCoreRowModel, useReactTable, getSortedRowModel, getFilteredRowModel } from "@tanstack/react-table";
import { useMemo } from "react";
import { columnsUser } from './columns/columnsUser';
import ListTable from './components/listTable';
import ButtonRegister from '../compnents/buttonRegister';

export default function ListUser(props) {

	const columns = useMemo(() => columnsUser, []);
	const data = useMemo(() => props.list, []);

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
		<>
			<div className={styles.listContainer}>
				<ListTable table={table} id='employeeNum' />
			</div>
			<ButtonRegister url={'/mobile/register/User'} />
		</>
	);
}