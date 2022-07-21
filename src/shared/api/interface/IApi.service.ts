export interface IApiService {
  pushError(err: Error): Promise<void>;
}
