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
					保管場所{getSortIcon(column.getIsSorted())}
				</div>
			);
		},
		accessorKey: 'storageLocation'
	},
]