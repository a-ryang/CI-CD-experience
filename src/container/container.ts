import { Container } from "inversify";
import { IUserService } from "../module/user/interface/IUser.service";
import { UserService } from "../module/user/user.service";
import { IApiService } from "../shared/api/interface/IApi.service";
import { DiscordApiService } from "../shared/api/discord/discord-api.service";
import { TYPES } from "./types";
/* controller import */
import "../module/index.controller";

const container = new Container();

container.bind<IUserService>(TYPES.IUserService).to(UserService);
container.bind<IApiService>(TYPES.IApiService).to(DiscordApiService);

export default container;
