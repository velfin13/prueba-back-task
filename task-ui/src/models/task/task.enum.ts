export enum TaskStatus {
    PENDING = "PENDING",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
}
export const TaskStatusOptions = [
    { value: TaskStatus.PENDING, label: "Pendiente" },
    { value: TaskStatus.IN_PROGRESS, label: "En Proceso" },
    { value: TaskStatus.COMPLETED, label: "Completada" },
];  