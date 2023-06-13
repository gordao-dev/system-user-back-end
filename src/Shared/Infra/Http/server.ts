import "reflect-metadata";
import express from "express";

import { errors as CelebrateErrors } from "celebrate";
import { configure, getLogger } from "log4js";
import { PrismaClient } from "@prisma/client";

import Injections from "../Injections";
import http from "http";
import UsersRoutes from "../../../Modules/Users/Infra/Routes/Users.routes";

configure({
  appenders: {
    stdout: {
      type: "stdout",
    },
  },
  categories: {
    default: {
      appenders: ["stdout"],
      level: "debug",
    },
  },
});

const prisma = new PrismaClient();

const logger = getLogger("server");
const usersRoutes = new UsersRoutes();

const main = async () => {
  const app = express();

  const injections = new Injections();
  injections.register();

  const httpServer = http.createServer(app);

  app.use(express.json());
  app.use("/users", usersRoutes.register());

  app.use(CelebrateErrors());

  const port = process.env.PORT || 3000;

  httpServer.listen(port, () => {
    logger.info(`Server running in http://localhost:${port}`);
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
