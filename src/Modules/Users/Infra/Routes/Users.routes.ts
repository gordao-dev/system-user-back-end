import { Router } from "express";
import UserController from "../Controllers/UsersControllers";
import { Segments, celebrate } from "celebrate";
import {
  RequiredAnyString,
  RequiredEmail,
  RequiredTextString,
} from "../../../../Shared/Infra/Http/Validators/Joi";

class UsersRoutes {
  public register(): Router {
    const usersRoutes = Router();

    const usersControllers = new UserController();

    usersRoutes.post(
      "/create",
      celebrate({
        [Segments.BODY]: {
          firstName: RequiredTextString,
          lastName: RequiredTextString,
          email: RequiredEmail,
          phoneNumber: RequiredAnyString,
          password: RequiredAnyString,
        },
      }),
      usersControllers.create
    );

    return usersRoutes;
  }
}

export default UsersRoutes;
