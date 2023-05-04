export interface ITableCellProps {
  cellData?: string;
}

export default function TableCell({ cellData }: ITableCellProps) {
  return (
    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
      <div className="flex px-2 py-1">
        <div className="flex flex-col justify-center">
          <h6 className="mb-0 leading-normal text-sm">{cellData}</h6>
        </div>
      </div>
    </td>
  );
}
