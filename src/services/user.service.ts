import { CreateUserRequest, UpdateUserRequest, UserResponse } from "../types/user.types";



interface UserRecord extends UserResponse {
  password: string; 
}

class UserService {
  private users: Map<string, UserRecord> = new Map();
  private currentId: number = 1;

  async createUser(userData: CreateUserRequest): Promise<UserResponse> {
    const id = (this.currentId++).toString();
    const timestamp = new Date().toISOString();

    
    const userRecord: UserRecord = {
      id,
      ...userData,
      createdAt: timestamp,
      updatedAt: timestamp
    };
    
    this.users.set(id, userRecord);
    

    const { password, ...userWithoutPassword } = userRecord;
    return userWithoutPassword as UserResponse;
  }

  async getUserById(id: string): Promise<UserResponse | null> {
    const user = this.users.get(id);
    if (!user) return null;
    
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword as UserResponse;
  }

  async getAllUsers(): Promise<UserResponse[]> {
    const users: UserResponse[] = [];
    this.users.forEach(user => {
      const { password, ...userWithoutPassword } = user;
      users.push(userWithoutPassword as UserResponse);
    });
    return users;
  }

  async updateUser(id: string, updateData: UpdateUserRequest): Promise<UserResponse | null> {
    const existingUser = this.users.get(id);
    if (!existingUser) return null;
    
    const updatedUser: UserRecord = {
      ...existingUser,
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    
    this.users.set(id, updatedUser);
    
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword as UserResponse;
  }

  async deleteUser(id: string): Promise<boolean> {
    return this.users.delete(id);
  }
}

export default new UserService();