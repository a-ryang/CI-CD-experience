import { inject } from "inversify";
import { controller } from "inversify-express-utils";
import { TYPES } from "../../container/types";
import { IUserService } from "./interface/IUser.service";

@controller("/user")
export class UserController {
  constructor(
    @inject(TYPES.IUserService) private readonly userService: IUserService
  ) {}
}
