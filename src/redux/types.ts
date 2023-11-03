export interface IUser {
  id: number;
  name: string;
  email: string;
}

export interface IMainState {
  users: Array<IUser>;
  isLoading: boolean;
  error: string;
  count: number;
}

export enum HttpMethodsEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}