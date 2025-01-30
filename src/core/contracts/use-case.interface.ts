export interface IUseCase<RequestType, ResponseType> {
  execute(data: RequestType): Promise<ResponseType> | ResponseType;
}
