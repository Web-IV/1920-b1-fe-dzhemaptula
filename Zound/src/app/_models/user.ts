export interface UserJson {
  userId: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

export class User {
  token?: string;

  constructor(
    private _userId: number,
    private _username: string,
    private _email: string,
    private _firstName: string,
    private _lastName: string
  ) {}

  static fromJSON(json: UserJson): User {
    const user = new User(
      json.userId,
      json.username,
      json.email,
      json.firstName,
      json.lastName
    );
    return user;
  }

  static toJSON(user: User): Object {
    var jsonData = {
      userId: user._userId,
      email: user._email,
      username: user._username,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    console.log(jsonData);
    return jsonData;
  }

  get username(): string {
    return this._username;
  }
  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  get email(): string {
    return this._email;
  }

  get userId(): number {
    return this._userId;
  }
}
