const { Users } = require('./users.js')

let users

describe("Users class", () => {
  beforeEach(async () => {
    users = new Users()

    users.users = [
      {
        userID: 1,
        username: 'alex',
        room: 1
      },
      {
        userID: 2,
        username: 'brian',
        room: 2
      },
      {
        userID: 3,
        username: 'emo',
        room: 2
      },
    ]
  })
  
  it('should add a new user', () => {
    const mockUser = {
      userID: 10,
      username: 'test',
      room: 2
    }

    users.addUser(mockUser.userID, mockUser.username, mockUser.room)

    expect(users.users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          userID: mockUser.userID,
          username: mockUser.username,
          room: mockUser.room
        })
      ])
    )
  })

  it('should delete a given user', () => {
    users.removeUser(1)

    expect(users.users).toEqual(
      expect.not.arrayContaining([
        expect.objectContaining({
          userID: 1
        })
      ])
    )
  });

  it('return a user, given their ID', () => {
    const returnedUser = users.getUser(1)

    expect(returnedUser).toEqual(
      expect.objectContaining({
        userID: 1
      })
    )

    expect(returnedUser).toEqual({
      userID: 1,
      username: 'alex',
      room: 1
    })
  })

  it('should return a list of users in a given room', () => {
    const returnedUsers = users.getUsersInRoom(2)

    expect(returnedUsers).toEqual([
      "brian",
      "emo"
    ])
  })
})