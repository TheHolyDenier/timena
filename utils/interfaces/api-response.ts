export interface ApiResponse<T> {
  data: T | T[];
  statusCode: number;
  statusMessage: string;
  page?: number;
  total?: number;
}
