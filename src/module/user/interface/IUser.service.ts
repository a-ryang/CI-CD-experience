export interface IUserService {
  create(): Promise<any>;
  find(): Promise<any>;
  update(): Promise<any>;
  remove(): Promise<any>;
}
