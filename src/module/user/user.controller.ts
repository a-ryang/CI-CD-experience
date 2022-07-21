import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet } from "inversify-express-utils";
import { TYPES } from "../../container/types";
import { IUserService } from "./interface/IUser.service";

@controller("/user")
export class UserController {
  constructor(
    @inject(TYPES.IUserService) private readonly userService: IUserService
  ) {}

  @httpGet("/error")
  async errorForTest(req: Request, res: Response) {
    throw new Error("test error for sentry");
  }
}
