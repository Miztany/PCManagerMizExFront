import { getSortIcon } from "./getSortIcon";

export const columnsUser = [
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