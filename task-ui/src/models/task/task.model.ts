export interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
    createdAt: string;
    dueDate: string;
}


export interface TaskCreateDTO {
    title: string;
    description: string;
    status: string;
    dueDate:string | null;
}

export interface TaskEditDTO {
    title: string;
    description: string;
    status: string;
    dueDate:string | null;
}
