import {Router} from "express";
import routerAuthenticatedMiddleware from "../middlewares/routerAuthenticatedMiddleware";
import routerAdminMiddleware from "../middlewares/routerAdminMiddleware";
import userController from "../controllers/userController";

const {view, update, list, remove, create, info, register, login} = userController
const userRouter = Router()

// [url]/user/register
userRouter.route("/register").post(register)

// [url]/user/login
userRouter.route("/login").post(login)

// [url]/user/info
userRouter.route("/info").get(routerAuthenticatedMiddleware, info)

// [url]/user
userRouter.route("/").get(routerAuthenticatedMiddleware, routerAdminMiddleware, list)

// [url]/user/1
userRouter.route("/:id").get(routerAuthenticatedMiddleware, routerAdminMiddleware, view)

// [url]/user
userRouter.route("/").get(routerAuthenticatedMiddleware, routerAdminMiddleware, create)

// [url]/user/1
userRouter.route("/:id").put(routerAuthenticatedMiddleware, routerAdminMiddleware, update)

// [url]/user/1
userRouter.route("/:id").delete(routerAuthenticatedMiddleware, routerAdminMiddleware, remove)

export default userRouter