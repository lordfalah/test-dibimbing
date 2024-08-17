export type TResponse<TData> = {
  status: string;
  data?: TData;
  message: string;
  errors?: TData;
};

export type TErrorApiRoute = {
  status: string;
  message: string;
  errors: {
    code: number;
    description: string;
  };
};
