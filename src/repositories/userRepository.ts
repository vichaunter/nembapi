import {IUserDocument} from "../models/UserModel";
import ROLES from "../constants/ROLES";

export const isAdmin = (user: IUserDocument) => {
    return user.role === ROLES.admin
}