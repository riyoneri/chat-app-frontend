export interface UserDto {
  _id: string;
  name: string;
  email: string;
  username: string;
  imageUrl: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthenticateUserDto {
  user: UserDto;
  token: string;
}
