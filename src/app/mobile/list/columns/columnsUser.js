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
]