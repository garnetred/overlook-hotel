import domUpdates from './domUpdates'


class UserRepository {
  constructor(users) {
    this.allUsers = users;
  }


  findUserByName(person) {
    console.log(this.allUsers)
    let foundUser = this.allUsers.find(user => user.name.toLowerCase().includes(person.toLowerCase()));
    console.log(foundUser);
    return foundUser;
}


}

export default UserRepository;
