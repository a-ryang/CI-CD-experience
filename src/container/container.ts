import { Container } from "inversify";
import { IUserService } from "../module/user/interface/IUser.service";
import { UserService } from "../module/user/user.service";
import { TYPES } from "./types";
/* controller import */
import "../module/index.controller";

const container = new Container();

container.bind<IUserService>(TYPES.IUserService).to(UserService);

export default container;
