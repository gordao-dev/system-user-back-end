import { PrismaClient, User } from "@prisma/client";
import ICreateUser from "../../@Types/ICreateUser";
import IFilterUsers from "../../@Types/IFIlterUsers";
import IUsersRepository from "../../Repositories/IUsersRepository";

class UsersRepository implements IUsersRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id: id } });
    return user;
  }

  public async findOne(filter: IFilterUsers): Promise<User | null> {
    const { email, phoneNumber } = filter;

    if (phoneNumber !== null && phoneNumber !== undefined) {
      const user = await this.prisma.user.findFirst({ where: { phoneNumber } });
      return user;
    }

    const user = await this.prisma.user.findUnique({ where: { email } });
    return user;
  }

  public async create(data: ICreateUser): Promise<User> {
    const newUser = await this.prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber, // Fornecer o valor do phoneNumber
        password: data.password,
      },
    });
    return newUser;
  }
}

export default UsersRepository;
