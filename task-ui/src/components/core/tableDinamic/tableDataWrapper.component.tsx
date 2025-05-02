import { JSX } from "react";
import DataTableWrapper, { TableColumn, TableProps, TableStyles } from "react-data-table-component";

interface Props<T> extends Partial<TableProps<T>> {
  columns: TableColumn<T>[];
  data: T[];
  customStyles?: TableStyles;
}

export function TableDataWrapper<T extends Record<string, any>>(props: Props<T>): JSX.Element {
  return <DataTableWrapper {...props} />;
}

export default TableDataWrapper;
