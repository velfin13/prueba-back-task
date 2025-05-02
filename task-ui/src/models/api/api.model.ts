export interface FieldError {
  field?: string;
  message: string;
}

export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T | null;
  errors?: FieldError[];
}
