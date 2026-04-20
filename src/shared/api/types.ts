export interface ApiResponse<T> {
    success: boolean;
    data: T;
    error: {
      message: string;
      status: number;
    } | null;
  }