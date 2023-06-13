import { User } from "@prisma/client";
import ICreateUser from "../@Types/ICreateUser";
import IFilterUsers from "../@Types/IFIlterUsers";

interface IUsersRepository {
  create(data: ICreateUser): Promise<User>;
  findById(id: string): Promise<User | null>;
  findOne(filter: IFilterUsers): Promise<User | null>;
}

export default IUsersRepository;
