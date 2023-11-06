export type Response<T> = {
  code: HTTPSTATUS;
  status: string;
  message: string;
  data: T;
};

export enum HTTPSTATUS {
  success = 200,
  created = 201,
  badRequest = 400,
  unAuthorized = 401,
  forbidden = 403,
  notFound = 404,
}
