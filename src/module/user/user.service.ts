import { injectable } from "inversify";
import { IUserService } from "./interface/IUser.service";

@injectable()
export class UserService implements IUserService {
  constructor() {}

  create(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  find(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  update(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  remove(): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
