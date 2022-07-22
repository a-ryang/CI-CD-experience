import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import * as Sentry from "@sentry/node";
import container from "./container/container";
import { IApiService } from "./shared/api/interface/IApi.service";
import { TYPES } from "./container/types";
import { HttpException } from "./shared/error/http.exception";
import { pushError } from "./shared/api/discord/push-error";
import config from "./config";

Sentry.init({
  dsn: config.sentry.dsn,
});

const server = new InversifyExpressServer(container);

const apiWebhookService = container.get<IApiService>(TYPES.IApiService);

server
  .setConfig((app) => {
    app.use(Sentry.Handlers.requestHandler());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  })
  .setErrorConfig((app) => {
    // catch 404
    app.use((req: Request, res: Response, next: NextFunction) => {
      return res.status(404).end();
    });

    // sentry
    app.use(
      Sentry.Handlers.errorHandler({
        shouldHandleError(err) {
          if (!err.status) {
            return true;
          }
          return false;
        },
      })
    );

    // exception
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      if (err instanceof HttpException) {
        const { name, status, message, info } = err;
        return res.status(status).json({ name, message, info });
      }

      // server error
      apiWebhookService.pushError(err);
      pushError(err);
      return res.status(500).json({ message: "server error" });
    });
  })
  .build()
  .listen(config.port, () => console.log(`server on ${config.port}`));
