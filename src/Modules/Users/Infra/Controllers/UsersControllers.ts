import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import CreateUserService from "../../Service/CeateUserService";
import HttpError from "../../../../Shared/Infra/Http/Errors/HttpErrors";

class UsersController {
  public create = async (
    request: Request,
    response: Response,
    _: NextFunction
  ): Promise<Response> => {
    const { firstName, lastName, email, phoneNumber, password } = request.body;

    const createUserService = container.resolve(CreateUserService);

    try {
      await createUserService.execute({
        createUser: { firstName, lastName, email, phoneNumber, password },
      });

      return response
        .status(201)
        .json({ message: "User created successfully" });
    } catch (error) {
      if (error instanceof HttpError) {
        return response
          .status(error.statusCode)
          .json({ message: error.message });
      }

      return response.status(500).json({ message: "Internal server error" });
    }
  };
}

export default UsersController;
