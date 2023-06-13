import { User } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { PhoneNumberUtil } from "google-libphonenumber";

import ICreateUser from "../@Types/ICreateUser";
import HttpError from "../../../Shared/Infra/Http/Errors/HttpErrors";
import IUsersRepository from "../Repositories/IUsersRepository";

interface ICreateUserRequest {
  createUser: ICreateUser;
}

interface IResponse {
  user: User;
}

@injectable()
class CreateUserService {
  constructor(
    @inject("userRepository")
    private userRepository: IUsersRepository
  ) {}

  public async execute({ createUser }: ICreateUserRequest): Promise<IResponse> {
    // Validação dos dados do usuário
    if (
      !createUser.firstName ||
      createUser.firstName.length < 4 ||
      /\d/.test(createUser.firstName)
    ) {
      console.error("O firstName deve ter no mínimo 4 caracteres!");
      throw new HttpError("O firstName deve ter no mínimo 4 caracteres!");
    }

    if (
      !createUser.lastName ||
      createUser.lastName.length < 4 ||
      /\d/.test(createUser.lastName)
    ) {
      console.error("O lastName deve ter no mínimo 4 caracteres!");
      throw new HttpError("O lastName deve ter no mínimo 4 caracteres!");
    }

    if (
      !createUser.email ||
      !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(createUser.email)
    ) {
      console.error("O email é inválido");
      throw new HttpError("O email é inválido");
    }

    if (!createUser.phoneNumber) {
      console.error("O phoneNumber é obrigatório!");
      throw new HttpError("O phoneNumber é obrigatório!");
    }

    const phoneNumberUtil = PhoneNumberUtil.getInstance();
    let parsedPhoneNumber;

    try {
      parsedPhoneNumber = phoneNumberUtil.parseAndKeepRawInput(
        createUser.phoneNumber,
        "BR"
      );
    } catch (error) {
      console.error("O phoneNumber é inválido!");
      throw new HttpError("O phoneNumber é inválido!");
    }

    if (!phoneNumberUtil.isValidNumber(parsedPhoneNumber)) {
      console.error("O phoneNumber é inválido!");
      throw new HttpError("O phoneNumber é inválido!");
    }

    if (!createUser.password || createUser.password.length < 8) {
      console.error("A senha deve ter no mínimo 8 caracteres!");
      throw new HttpError("A senha deve ter no mínimo 8 caracteres!");
    }

    try {
      const emailInUse = await this.userRepository.findOne({
        email: createUser.email,
      });

      const numberInUse = await this.userRepository.findOne({
        phoneNumber: createUser.phoneNumber,
      });

      if (emailInUse) {
        console.error(
          "Este email já está em uso por outro usuário:",
          createUser.email
        );
        throw new HttpError("Este email já está em uso por outro usuário");
      }

      if (numberInUse) {
        console.error(
          "Este número já está em uso por outro usuário:",
          createUser.phoneNumber
        );
        throw new HttpError("Este número já está em uso por outro usuário");
      }

      const user = await this.userRepository.create(createUser);

      return {
        user,
      };
    } catch (error) {
      console.error("Erro ao salvar o usuário:", error);

      if (error instanceof HttpError) {
        throw error;
      } else {
        throw new HttpError("Erro interno do servidor");
      }
    }
  }
}

export default CreateUserService;
