export type PaginatedRequest = {
  page?: number;
  language?: string;
  region?: string;
};

export type PaginatedResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};
