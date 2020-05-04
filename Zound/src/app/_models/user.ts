export interface UserJson {
  id: number,
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

export class User {
  token?: string;

  constructor(private _id: number, private _username:string, private _email:string, private _firstName:string, private _lastName:string){

  }

  static fromJSON(json: UserJson): User {
    const user = new User(json.id, json.username, json.email, json.firstName, json.lastName);
    return user;
  }

  get username(): string{
    return this._username;
  }
  get firstName(): string{
    return this._firstName;
  }

  get lastName(): string{
    return this._lastName;
  }

  get email(): string{
    return this._email;
  }

  get id(): number{
    return this._id;
  }
}
