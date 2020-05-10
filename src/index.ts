/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { usersRouter } from "./route/users.router";
import { eventsRouter } from "./route/events.router";

dotenv.config();

/**
 * App Variables
 */

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

// need to export it for jest tests
export const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

/*
The app.use() method can take as an argument an optional path and a callback function 
that represents one or more middleware functions. In this case, you tell your Express app 
to invoke the usersRouter middleware functions whenever the /users route path is requested.
*/
app.use("/users", usersRouter);
app.use("/events", eventsRouter);

// need to export for the jest tests to close it
export const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

type ModuleId = string | number;

interface WebpackHotModule {
  hot?: {
    data: any;
    accept(
      dependencies: string[],
      callback?: (updatedDependencies: ModuleId[]) => void
    ): void;
    accept(dependency: string, callback?: () => void): void;
    accept(errHandler?: (err: Error) => void): void;
    dispose(callback: (data: any) => void): void;
  };
}

declare const module: WebpackHotModule;

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.close());
}
