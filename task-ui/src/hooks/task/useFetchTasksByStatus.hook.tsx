import { getAllTaskByStatusAPI } from "@/api";
import { Task } from "@/models";
import { AppStore, setLoadingTable, setReload } from "@/redux";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useFetchTasksByStatus = (status: string) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [error, setError] = useState<string | null>(null);
    const reload = useSelector((store: AppStore) => store.reload);
    const token = useSelector((store: AppStore) => store.auth.token);
    const dispatch = useDispatch();

    const fetchTasks = useCallback(async () => {
        try {
            dispatch(setLoadingTable(true));
            const result = await getAllTaskByStatusAPI(status, token ?? "");
            setTasks(result.data ?? []);
            dispatch(setReload(false));
        } catch {
            setError("Error al cargar las tareas");
        } finally {
            dispatch(setLoadingTable(false));
        }
    }, [dispatch, status]);


    useEffect(() => {
        fetchTasks();
    }, [fetchTasks, reload]);

    return {
        tasks,
        error,
        refetch: fetchTasks,
    };
};
