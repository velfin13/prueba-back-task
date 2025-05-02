import { Loading } from '@/components';
import { AppStore } from '@/redux';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from "@mui/material";
import { JSX, useEffect, useState } from "react";
import { TableColumn, TableStyles } from "react-data-table-component";
import { useSelector } from 'react-redux';
import TableDataWrapper from "./tableDataWrapper.component";
import styles from "./tableDinamic.module.css";

export interface TableAction<T> {
  icon: JSX.Element | ((row: T) => JSX.Element);
  handler: (row: T) => void;
}

export interface TableDinamicProps<T> {
  rows: T[];
  columns: TableColumn<T>[];
  actions?: TableAction<T>[];
  actionLabel?: string;
  placeholder?: string;
}

const customStyles: TableStyles = {
  table: {
    style: {
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    },
  },
  headRow: {
    style: {
      backgroundColor: "#f9fafb",
      color: "#111827",
      fontWeight: 600,
      fontSize: "14px",
      borderBottom: "1px solid #e5e7eb",
    },
  },
  headCells: {
    style: {
      padding: "12px 16px",
      textTransform: "uppercase",
    },
  },
  rows: {
    style: {
      backgroundColor: "#ffffff",
      minHeight: "48px",
      borderBottom: "1px solid #f1f1f1",
      transition: "all 0.2s ease-in-out",
      '&:hover': {
        backgroundColor: "#f3f4f6",
      },
    },
  },
  cells: {
    style: {
      padding: "12px 16px",
      fontSize: "14px",
    },
  },
  pagination: {
    style: {
      backgroundColor: "#fff",
      borderTop: "1px solid #f1f1f1",
      padding: "12px 16px",
      fontSize: "14px",
      justifyContent: "flex-end",
    },
    pageButtonsStyle: {
      borderRadius: "6px",
      padding: "6px 10px",
      margin: "0 4px",
      border: "1px solid #d1d5db",
      backgroundColor: "#f3f4f6",
      color: "#1f2937",
      "&:hover": {
        backgroundColor: "#e5e7eb",
      },
      "&:disabled": {
        color: "#9ca3af",
        backgroundColor: "#f9fafb",
      },
    },
  },
};

export const TableDinamic = <T extends Record<string, any>>({
  rows,
  columns,
  actions,
  actionLabel = "Acciones",
  placeholder = "Filtrar en tabla...",
}: TableDinamicProps<T>) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isClient, setIsClient] = useState(false);
  const stateLoading = useSelector((store: AppStore) => store.loading.loadingTable);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || stateLoading) return <Loading />;

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const actionColumn: TableColumn<T> = {
    name: actionLabel,
    cell: (row: T) => (
      <div className={styles.actions}>
        {actions?.map((action, idx) => (
          <div key={idx} onClick={() => action.handler(row)} style={{ cursor: "pointer", display: "inline-flex", alignItems: "center" }}>
            {typeof action.icon === "function" ? action.icon(row) : action.icon}
          </div>
        ))}
      </div>
    ),
    ignoreRowClick: true,
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerActions}>
        <TextField
          variant="outlined"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          sx={{
            width: "100%",
            maxWidth: 400,
            borderRadius: "50px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "30px",
              backgroundColor: "#fff",
              paddingRight: 1,
              boxShadow: "0 0 6px rgba(0,0,0,0.1)",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
      </div>

      <div className={styles.tableWrapper}>
        <TableDataWrapper
          columns={actions ? [...columns, actionColumn] : columns}
          data={filteredRows}
          pagination
          highlightOnHover
          fixedHeader
          fixedHeaderScrollHeight="calc(80vh - 100px)"
          customStyles={customStyles}
          className={styles.table}
          noDataComponent={<span>No hay registros para mostrar</span>}
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 20, 50]}
          paginationComponentOptions={{
            rowsPerPageText: "Filas por página:",
            rangeSeparatorText: "de",
            selectAllRowsItem: false,
            selectAllRowsItemText: "Todos",
          }}
        />
      </div>
    </div>
  );
};
