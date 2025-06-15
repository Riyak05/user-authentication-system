export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface UserWithPassword extends User {
  password: string;
}

export interface AuthResponse {
  message: string;
  user?: User;
  token?: string;
}

export interface ApiError {
  message: string;
  status: number;
}
