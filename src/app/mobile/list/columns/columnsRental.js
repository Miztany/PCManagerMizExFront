import { getSortIcon } from "./getSortIcon";

export const columnsRental = [
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
]