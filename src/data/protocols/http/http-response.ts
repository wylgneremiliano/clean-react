export enum HttpStatusCode {
  noContent = 204,
  unathorided = 401,
}
export type HttpResponse = {
  statusCode: HttpStatusCode
  body?: any
}
