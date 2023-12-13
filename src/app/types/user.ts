export interface CreateUserRequest {
  email: string
  username: string
  password: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface UserResponse {
  email: string
  username: string
  token: string
  image: string
}
