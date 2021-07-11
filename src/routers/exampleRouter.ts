import {Router} from "express";
import exampleController from "../controllers/exampleController";
import routerAuthenticatedMiddleware from "../middlewares/routerAuthenticatedMiddleware";

const {view, update, list, remove, create} = exampleController
const exampleRouter = Router()

// [url]/example
exampleRouter.route("/").get(list)

// [url]/example/1
exampleRouter.get("/:id", view)

// [url]/example
exampleRouter.route("/").get(routerAuthenticatedMiddleware, create)

// [url]/example/1
exampleRouter.route("/:id").put(routerAuthenticatedMiddleware, update)

// [url]/example/1
exampleRouter.route("/:id").delete(routerAuthenticatedMiddleware, remove)

export default exampleRouter