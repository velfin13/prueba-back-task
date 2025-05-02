import { updateTaskAPI } from '@/api';
import { DynamicForm, FormField, handleCloseDialog } from '@/components';
import { Task, TaskEditDTO, TaskStatus, TaskStatusOptions } from '@/models';
import { AppStore, setReload } from '@/redux';
import { Box } from '@mui/material';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import * as yup from "yup";

export type EditTaskProps = {
    task: Task;
};

export const EditTask: React.FC<EditTaskProps> = ({ task }) => {
    const [resetForm, setResetForm] = useState<boolean>(false);
    const dispatch = useDispatch();
    const token = useSelector((store: AppStore) => store.auth.token);

    const fields: FormField<TaskEditDTO>[] = [
        {
            name: "title",
            label: "Nombres",
            defaultValue: task.title,
            required: true,
            type: "text",
            md: 12,
            validationSchema: yup.string().required("El nombre es obligatorio"),
        },
        {
            name: "status",
            required: true,
            label: "Estado",
            defaultValue: task.status && TaskStatus.PENDING,
            md: 12,
            validationSchema: yup.string().required("Por favor selecciona un estado"),
            type: "select",
            options: TaskStatusOptions,
        },
        {
            name: "dueDate",
            label: "Fecha de vencimiento",
            defaultValue: task.dueDate,
            type: "date",
            md: 12,
            validationSchema: yup.string().optional().nullable(),
        },
        {
            name: "description",
            label: "Descripción",
            defaultValue: task.description,
            required: true,
            type: "textarea",
            md: 12,
            validationSchema: yup.string().required("La descripción es obligatoria"),
        }
    ];

    const onSubmit = async (data: TaskEditDTO) => {
        try {
            const res = await updateTaskAPI(task.id, data, token ?? "");

            if (res.status) {
                toast.success(res.message || "Tarea actualizada correctamente");
                dispatch(setReload(true));
                setResetForm(true);
                handleCloseDialog();
            } else {
                toast.error(res.message || "Ocurrió un error al actualizar la tarea");
            }
        } catch (err: any) {
            const message =
                err?.response?.data?.message || err?.message || "Error inesperado";
            toast.error(message);
        }
    };


    return (
        <Box sx={{ p: 6 }}>
            <DynamicForm
                setResetForm={setResetForm}
                resetForm={resetForm}
                fields={fields}
                labelButon='Actualizar'
                onSubmit={onSubmit}
            />
        </Box>
    );
}
