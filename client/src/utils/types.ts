import { UploadFile } from "antd";

export interface ILoginValues {
  email: string;
  password: string,
}

export interface ISignUpValues {
  name: string;
  email: string;
  password:string;
}

export interface DeleteDirectoryParams {
    id: number;
    type: string;
}

export interface UserProfile {
  name: string;
  email: string;
  bio: string;
  gender: string;
  avatar: UploadFile[];
}