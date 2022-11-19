class Users {
  constructor() {
    this.users = [];
  }

  getIndex(userID){
    // return the array index position of a given userID
    return this.users.findIndex(user => user.userID == userID);
  }

  addUser(userID, username, room) {
    this.users.push({
      userID: userID,
      username: username,
      room: room
    });
  }

  removeUser(userID) {
    this.users.splice(this.getIndex(userID), 1);
  }

  getUser(userID) {
    return this.users[this.getIndex(userID)];
  }

  getUsername(userID) {
    const user = this.getUser(userID);
    if (user) return user.username;
    else return null
  }

  getUsersInRoom(room){
    const users = this.users.filter(user => 
      user.room === room
    )

    return users.map(user => user.username)
  }
}

module.exports = { Users }