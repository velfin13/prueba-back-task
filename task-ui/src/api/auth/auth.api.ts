import { httpClient } from "@/api";
import { ApiResponse, LoginResponse, LoginUserFormData, RegisterResponse, RegisterUserFormData } from "@/models";

const BASE_URL = "/auth";

export const loginAPI = async (payload: LoginUserFormData): Promise<ApiResponse<LoginResponse>> => {
  try {
    const response = await httpClient.post<ApiResponse<LoginResponse>>(
      `${BASE_URL}/login`,
      payload
    );
    return response.data;
  } catch (error: any) {
    console.error("Error in loginAPI:", error.response?.data || error.message);

    return {
      status: false,
      message: error.response?.data?.message || 'Login failed',
      data: { token: null }
    };
  }
};

export const registerAPI = async (payload: RegisterUserFormData): Promise<ApiResponse<RegisterResponse>> => {
  try {
    const response = await httpClient.post<ApiResponse<RegisterResponse>>(
      `${BASE_URL}/register`,
      payload
    );
    return response.data;
  } catch (error: any) {
    console.error("Error in loginAPI:", error.response?.data || error.message);

    return {
      status: false,
      message: error.response?.data?.message || 'register failed',
      data: null
    };
  }
};



