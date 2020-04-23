import domUpdates from './domUpdates'
import User from './User'


class UserRepository {
  constructor(users) {
    this.allUsers = users;

  }

  findUserByName(person, date) {
    let foundUser = this.allUsers.find(user => user.name.toLowerCase().includes(person.toLowerCase()));
    foundUser.findPastBookings(date);
    foundUser.findCurrentBookings(date)
    foundUser.findFutureBookings(date);
    setTimeout(domUpdates.displayGuestsByNameAndDate(foundUser, date), 5000);
    return foundUser;
}

}

export default UserRepository;
