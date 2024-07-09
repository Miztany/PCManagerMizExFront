import { getSortIcon } from "./getSortIcon";

export const columnsDevice = [
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