type IUser = {
  id: string;
  name: string;
  login: string;
};

class User {
  id: string;
  name: string;
  login: string;
  password: string;

  constructor({ id = '', name = '', login = '', password = '' } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user: IUser) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;
