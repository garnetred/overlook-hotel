import domUpdates from './domUpdates'


class UserRepository {
  constructor(users) {
    this.allUsers = users;
  }


  findUserByName(name) {
    return this.allUsers.find(user => user.name.includes(name));
  }


}

export default UserRepository;
