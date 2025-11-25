export interface Timestamp {
  createdAt: string;
  updatedAt: string;
}

export interface ResponseData<T> {
  success: boolean;
  message: string;
  data: T;
}
