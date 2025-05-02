import { httpClient } from "@/api";
import { ApiResponse, Task, TaskCreateDTO, TaskEditDTO } from "@/models";

export const getAllTaskAPI = async (
  token: string
): Promise<ApiResponse<Task[]>> => {
  try {
    const response = await httpClient.get<ApiResponse<Task[]>>("/tareas", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error in getAllTaskAPI:", error.response?.data || error.message);
    return {
      status: false,
      message: error.response?.data?.message || "Error al obtener tareas",
      data: [],
      errors: error.response?.data?.errors || [],
    };
  }
};

export const getAllTaskByStatusAPI = async (
  statusParams: string,
  token: string
): Promise<ApiResponse<Task[]>> => {
  try {
    const response = await httpClient.get<ApiResponse<Task[]>>(
      `/tareas?status=${statusParams}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error in getAllTaskByStatusAPI:", error.response?.data || error.message);
    return {
      status: false,
      message:
        error.response?.data?.message || "Error al obtener tareas por estado",
      data: [],
      errors: error.response?.data?.errors || [],
    };
  }
};


export const createTaskAPI = async (
  payload: TaskCreateDTO,
  token: string
): Promise<ApiResponse<Task>> => {
  try {
    const response = await httpClient.post<ApiResponse<Task>>("/tareas", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    const fallbackMessage = "Error al crear tarea";

    const responseData = error.response?.data;
    console.error("Error in createTaskAPI:", responseData || error.message);

    return {
      status: false,
      message: responseData?.message || fallbackMessage,
      data: null,
      errors: responseData?.errors ?? [],
    };
  }
};


export const updateTaskAPI = async (
  id: number,
  payload: Partial<TaskEditDTO>,
  token: string
): Promise<ApiResponse<Task>> => {
  try {
    const response = await httpClient.put<ApiResponse<Task>>(
      `/tareas/${id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error in updateTaskAPI:", error.response?.data || error.message);
    return {
      status: false,
      message: error.response?.data?.message || "Error al actualizar tarea",
      data: null,
      errors: error.response?.data?.errors || [],
    };
  }
};

export const deleteTaskAPI = async (
  id: number,
  token: string
): Promise<ApiResponse<null>> => {
  try {
    const response = await httpClient.delete<ApiResponse<null>>(
      `/tareas/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error in deleteTaskAPI:", error.response?.data || error.message);
    return {
      status: false,
      message: error.response?.data?.message || "Error al eliminar tarea",
      data: null,
      errors: error.response?.data?.errors || [],
    };
  }
};
