import UsersInjections from "../../../Modules/Users/Infra/Injections/UsersInjections";

class Injections {
  public register() {
    const usersInjections = new UsersInjections();
    usersInjections.register();
  }
}

export default Injections;
