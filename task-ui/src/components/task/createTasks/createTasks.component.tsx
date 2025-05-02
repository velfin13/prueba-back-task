import { createTaskAPI } from "@/api";
import { DynamicForm, FormField } from "@/components";
import { TaskCreateDTO, TaskStatus, TaskStatusOptions } from "@/models";
import { AppStore, setReload } from "@/redux";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as yup from "yup";

export const CreateTasks = () => {
  const [resetForm, setResetForm] = useState<boolean>(false);
  const token = useSelector((store: AppStore) => store.auth.token);
  const dispatch = useDispatch();

  const fields: FormField<TaskCreateDTO>[] = [
    {
      name: "title",
      label: "Titulo",
      required: true,
      type: "text",
      md: 12,
      validationSchema: yup.string().required("El Título es obligatorio"),
    },
    {
      name: "status",
      required: true,
      label: "Estado",
      defaultValue: TaskStatus.PENDING,
      md: 12,
      validationSchema: yup.string().required("Por favor selecciona un estado"),
      type: "select",
      options: TaskStatusOptions,
    },
    {
      name: "dueDate",
      label: "Fecha de vencimiento",
      type: "date",
      md: 12,
      validationSchema: yup.string().optional().nullable(),
    },
    {
      name: "description",
      label: "Descripción",
      required: true,
      type: "textarea",
      md: 12,
      validationSchema: yup.string().required("La descripción es obligatoria"),
    },

  ];

  const onSubmit = async (data: TaskCreateDTO) => {
    try {
      const res = await createTaskAPI(data, token ?? "");
  
      if (res.status) {
        toast.success(res.message || "Tarea creada correctamente");
        dispatch(setReload(true));
        setResetForm(true);
      } else {
        toast.error(res.message || "Hubo un error al crear la tarea");
  
        res.errors?.forEach((err) => {
          toast.error(err.message);
        });
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Hubo un error al crear la tarea";
      toast.error(errorMessage);
    }
  };
  


  return (
    <div>
      <DynamicForm
        setResetForm={setResetForm}
        resetForm={resetForm}
        fields={fields}
        onSubmit={onSubmit}
      />
    </div>
  )
}
