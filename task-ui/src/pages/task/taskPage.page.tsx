import { deleteTaskAPI } from "@/api";
import {
  CreateTasks,
  CustomDialog,
  EditTask,
  ErrorMessage,
  handleOpenDialog,
  StatusFilter,
  TableAction,
  TableDinamic
} from "@/components";
import { useFetchTasksByStatus } from "@/hooks";
import { Task, TaskStatus, TaskStatusOptions } from "@/models";
import { AppStore, setReload } from "@/redux";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { Box, IconButton, Tooltip } from "@mui/material";
import Grid from "@mui/material/Grid";
import { JSX, useCallback, useMemo, useState } from "react";
import { TableColumn } from "react-data-table-component";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import styles from "./style.module.css";

import AutorenewIcon from '@mui/icons-material/Autorenew';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import { useSelector } from "react-redux";


const statusIconMap: Record<TaskStatus, JSX.Element> = {
  [TaskStatus.PENDING]: <HourglassEmptyIcon sx={{ color: "#9e9e9e" }} fontSize="small" />,
  [TaskStatus.IN_PROGRESS]: <AutorenewIcon sx={{ color: "#4caf50" }} fontSize="small" />,
  [TaskStatus.COMPLETED]: <CheckCircleIcon sx={{ color: "#2196f3" }} fontSize="small" />,
};


interface TableData {
  id: number;
  title: string;
  status: string;
  createdAt: string;
  dueDate: string;
}

const columns: TableColumn<TableData>[] = [
  {
    name: "Título",
    selector: (row) => row.title,
    sortable: true,
  },
  {
    name: "Estado",
    sortable: true,
    cell: (row) => {
      const icon = statusIconMap[row.status as TaskStatus];
      const label = TaskStatusOptions.find(opt => opt.value === row.status)?.label ?? row.status;

      return (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {icon}
          <span>{label}</span>
        </div>
      );
    }
  },
  {
    name: "Creado",
    selector: (row) => row.createdAt,
    sortable: true,
  },
  {
    name: "Vence",
    sortable: true,
    cell: (row) => (
      <span>
        {row.dueDate ? row.dueDate : "Sin fecha"}
      </span>
    ),
  },
];

export const TaskPage = () => {
  const [formModal, setFormModal] = useState<JSX.Element>();
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((store: AppStore) => store.auth.token);

  const { tasks, error } = useFetchTasksByStatus(status);

  const dataTable = useMemo(
    () => tasks.map(({ id, title, status, createdAt, dueDate }) => ({
      id,
      title,
      status,
      createdAt: new Date(createdAt).toISOString().split('T')[0],
      dueDate
    })),
    [tasks]
  );

  const formModalEditTask = useCallback(
    (task: Task) => <EditTask task={task} />, []
  );

  const handleEdit = useCallback(
    (row: TableData) => {
      const task = tasks.find((i) => i.id === row.id);
      if (task) {
        setFormModal(formModalEditTask(task));
        handleOpenDialog();
      }
    },
    [tasks, formModalEditTask]
  );

  const handleDelete = useCallback(
    (row: TableData) => {
      Swal.fire({
        title: "¿Estás seguro de querer eliminar esta tarea?",
        showCancelButton: true,
        confirmButtonText: "Sí",
        confirmButtonColor: "#f62020",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await deleteTaskAPI(row.id, token ?? "");
            toast.success(res.message ?? "Tarea eliminada");
            dispatch(setReload(true));
          } catch {
            toast.error("Error eliminando tarea");
          }
        }
      });
    },
    [dispatch]
  );

  const actions: TableAction<TableData>[] = useMemo(() => [
    {
      icon: (
        <Tooltip title="Editar">
          <IconButton size="small">
            <BorderColorRoundedIcon />
          </IconButton>
        </Tooltip>
      ),
      handler: handleEdit,
    },
    {
      icon: (
        <Tooltip title="Eliminar">
          <IconButton size="small" color="error">
            <DeleteRoundedIcon />
          </IconButton>
        </Tooltip>
      ),
      handler: handleDelete,
    },
  ], [handleEdit, handleDelete]);

  if (error) return <ErrorMessage message={error} />;

  return (
    <>
      <CustomDialog>{formModal}</CustomDialog>
      <div className={styles.container}>
        <Grid container spacing={6} sx={{
          mt: 6,
          flexDirection: {
            xs: "column-reverse",
            md: "row",
          },
        }}>
          <Grid size={{ xs: 12, md: 8 }}>
            <div className={styles.tableContainer}>
              <StatusFilter setStatus={setStatus} status={status} />
              <TableDinamic columns={columns} rows={dataTable} actions={actions} />
            </div>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ maxWidth: 400, mx: "auto" }}>
              <CreateTasks />
            </Box>
          </Grid>
        </Grid>
      </div>
    </>
  );
}