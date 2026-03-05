// Request body interface for user creation
export interface CreateUserRequest {
  name: string;
  email: string;
  age: number;
  password: string;
}

// Request body interface for user update
export interface UpdateUserRequest {
  name?: string;
  email?: string;
  age?: number;
  password?: string;
}

// Response shape for user data (without sensitive information)
export interface UserResponse {
  id: string;
  name: string;
  email: string;
  age: number;
  createdAt: string;
  updatedAt: string;
}

// Error response shape
export interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}

// Success response wrapper
export interface SuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

// API Response type (union of success and error)
export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;