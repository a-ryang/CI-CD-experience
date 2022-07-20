import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import container from "./container/container";
import { HttpException } from "./shared/error/http.exception";

const PORT = 8080;

const server = new InversifyExpressServer(container);

server
  .setConfig((app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  })
  .setErrorConfig((app) => {
    app.use((req: Request, res: Response, next: NextFunction) => {
      return res.status(404).end();
    });

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      if (err instanceof HttpException) {
        const { name, status, message, info } = err;
        return res.status(status).json({ name, message, info });
      }
      return res.status(500).json({ message: "server error" });
    });
  })
  .build()
  .listen(PORT, () => console.log(`server on ${PORT}`));
