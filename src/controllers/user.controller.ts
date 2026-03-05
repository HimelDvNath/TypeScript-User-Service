import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import userService from '../services/user.service';
import { 
  CreateUserRequest, 
  UpdateUserRequest, 
  UserResponse, 
  ApiResponse,
  ErrorResponse 
} from '../types/user.types';

// Properly extending Express Request types
interface TypedRequestParams<T extends ParamsDictionary> extends Request {
  params: T;
}

interface TypedRequestBody<T> extends Request {
  body: T;
}

interface TypedRequest<TParams extends ParamsDictionary, TBody> extends Request {
  params: TParams;
  body: TBody;
}

// Alternative: Using Express's built-in types directly (simpler approach)
// This is often cleaner than creating custom interfaces
type CreateUserHandler = Request<{}, {}, CreateUserRequest>;
type GetUserHandler = Request<{ id: string }>;
type UpdateUserHandler = Request<{ id: string }, {}, UpdateUserRequest>;

// Controller function to create a user
export const createUser = async (
  req: Request<{}, {}, CreateUserRequest>,
  res: Response<ApiResponse<UserResponse>>
): Promise<void> => {
  try {
    const userData: CreateUserRequest = req.body;
    
    // Additional runtime validation
    if (!userData.name || !userData.email || !userData.age || !userData.password) {
      res.status(400).json({
        error: 'Validation Error',
        message: 'Missing required fields',
        statusCode: 400
      });
      return;
    }

    const newUser = await userService.createUser(userData);
    
    res.status(201).json({
      success: true,
      data: newUser,
      message: 'User created successfully'
    });
  } catch (error) {
    const errorResponse: ErrorResponse = {
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'Failed to create user',
      statusCode: 500
    };
    res.status(500).json(errorResponse);
  }
};

// Controller function to get user by ID
export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse<UserResponse>>
): Promise<void> => {
  try {
    const { id } = req.params;
    
    // Validate ID parameter
    if (!id) {
      res.status(400).json({
        error: 'Validation Error',
        message: 'User ID is required',
        statusCode: 400
      });
      return;
    }

    const user = await userService.getUserById(id);
    
    if (!user) {
      const errorResponse: ErrorResponse = {
        error: 'Not Found',
        message: `User with id ${id} not found`,
        statusCode: 404
      };
      res.status(404).json(errorResponse);
      return;
    }
    
    res.status(200).json({
      success: true,
      data: user,
      message: 'User retrieved successfully'
    });
  } catch (error) {
    const errorResponse: ErrorResponse = {
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'Failed to retrieve user',
      statusCode: 500
    };
    res.status(500).json(errorResponse);
  }
};

// Controller function to get all users
export const getAllUsers = async (
  req: Request,
  res: Response<ApiResponse<UserResponse[]>>
): Promise<void> => {
  try {
    const users = await userService.getAllUsers();
    
    res.status(200).json({
      success: true,
      data: users,
      message: 'Users retrieved successfully'
    });
  } catch (error) {
    const errorResponse: ErrorResponse = {
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'Failed to retrieve users',
      statusCode: 500
    };
    res.status(500).json(errorResponse);
  }
};

// Controller function to update user
export const updateUser = async (
  req: Request<{ id: string }, {}, UpdateUserRequest>,
  res: Response<ApiResponse<UserResponse>>
): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData: UpdateUserRequest = req.body;
    
    // Validate ID parameter
    if (!id) {
      res.status(400).json({
        error: 'Validation Error',
        message: 'User ID is required',
        statusCode: 400
      });
      return;
    }

    // Check if there's anything to update
    if (Object.keys(updateData).length === 0) {
      res.status(400).json({
        error: 'Validation Error',
        message: 'No update data provided',
        statusCode: 400
      });
      return;
    }
    
    const updatedUser = await userService.updateUser(id, updateData);
    
    if (!updatedUser) {
      const errorResponse: ErrorResponse = {
        error: 'Not Found',
        message: `User with id ${id} not found`,
        statusCode: 404
      };
      res.status(404).json(errorResponse);
      return;
    }
    
    res.status(200).json({
      success: true,
      data: updatedUser,
      message: 'User updated successfully'
    });
  } catch (error) {
    const errorResponse: ErrorResponse = {
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'Failed to update user',
      statusCode: 500
    };
    res.status(500).json(errorResponse);
  }
};

// Controller function to delete user
export const deleteUser = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse<null>>
): Promise<void> => {
  try {
    const { id } = req.params;
    
    // Validate ID parameter
    if (!id) {
      res.status(400).json({
        error: 'Validation Error',
        message: 'User ID is required',
        statusCode: 400
      });
      return;
    }
    
    const deleted = await userService.deleteUser(id);
    
    if (!deleted) {
      const errorResponse: ErrorResponse = {
        error: 'Not Found',
        message: `User with id ${id} not found`,
        statusCode: 404
      };
      res.status(404).json(errorResponse);
      return;
    }
    
    res.status(200).json({
      success: true,
      data: null,
      message: 'User deleted successfully'
    });
  } catch (error) {
    const errorResponse: ErrorResponse = {
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'Failed to delete user',
      statusCode: 500
    };
    res.status(500).json(errorResponse);
  }
};