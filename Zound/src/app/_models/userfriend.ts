export interface UserFriendJson {
  userId: number;
  friendId: number;
}

// public User RequestedTo { get; set; }
// public int RequestedToID { get; set; }

// public User RequestedFrom { get; set; }
// public int RequestedFromID { get; set; }
// public Guid Token { get; set; }

export class UserFriend {
  constructor(private _userId: number, private _friendId: number) {}

  static fromJSON(json: UserFriendJson): UserFriend {
    const userFriend = new UserFriend(json.userId, json.friendId);
    return userFriend;
  }

  static toJSON(userFriend: UserFriend): Object {
    var jsonData = {
      userId: userFriend._userId,
      friendId: userFriend._friendId,
    };
    console.log(jsonData);
    return jsonData;
  }

  get userId(): number {
    return this._userId;
  }

  get friendId(): number {
    return this._friendId;
  }
}
