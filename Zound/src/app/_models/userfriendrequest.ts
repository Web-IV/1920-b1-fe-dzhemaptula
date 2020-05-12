export interface UserFriendRequestJson {
  requestedToId: number;
  requestedFromId: number;
  token: string;
}

// public User RequestedTo { get; set; }
// public int RequestedToID { get; set; }

// public User RequestedFrom { get; set; }
// public int RequestedFromID { get; set; }
// public Guid Token { get; set; }

export class UserFriendRequest {
  constructor(
    private _requestedToId: number,
    private _requestedFromId: number,
    private _token: string
  ) {}

  static fromJSON(json: UserFriendRequestJson): UserFriendRequest {
    const user = new UserFriendRequest(
      json.requestedToId,
      json.requestedFromId,
      json.token
    );
    return user;
  }

  static toJSON(user: UserFriendRequest): Object {
    var jsonData = {
      requestedToId: user._requestedToId,
      requestedFromId: user._requestedFromId,
      token: user._token,
    };
    console.log(jsonData);
    return jsonData;
  }

  get requestedToId(): number {
    return this._requestedToId;
  }

  get requestedFromId(): number {
    return this._requestedFromId;
  }

  get token(): string {
    return this._token;
  }
}
