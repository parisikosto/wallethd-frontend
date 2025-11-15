interface Pagination {
  next: {
    limit: number;
    page: number;
  };
  prev: {
    limit: number;
    page: number;
  };
}

export interface ApiGenericResponse<T> {
  count?: number;
  data?: T;
  error?: string;
  pagination?: Pagination;
  success: boolean;
}
