import domUpdates from './domUpdates'


class UserRepository {
  constructor(users) {
    this.allUsers = users;
  }

  findUserByNameandDate(date, name) {
    //this method is one only a manager will have access to, but it will find a particular user by their name and the specified date
  }

}

export default UserRepository;
