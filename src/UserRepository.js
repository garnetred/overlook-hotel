import domUpdates from './domUpdates'
import User from './User'


class UserRepository {
  constructor(users) {
    this.allUsers = users;

  }

  // createUsers(users) {
  //   this.allUsers = users.forEach(user => {
  //     user = new User(user)
  //   })
  // }


  findUserByName(person, date) {
    let foundUser = this.allUsers.find(user => user.name.toLowerCase().includes(person.toLowerCase()));
    console.log('user in userrepository', foundUser);
    // foundUser.findAllBookings(date);
    // foundUser.findAllRooms(date)
    foundUser.findPastBookings(date);
    foundUser.findCurrentBookings(date)
    foundUser.findFutureBookings(date);
    setTimeout(domUpdates.displayGuestsByNameAndDate(foundUser, date), 5000);
    return foundUser;
}
  //these tests fail but the code works because the instantiated users now have different information, need to pull this from user class
    // getUserName() {
    //   // console.log(this.allUsers[0].firstName);
    //   // //I want this to determine a particular users user name so I can pass it in as a value
    //   let usernames;
    //   usernames = this.allUsers.map(user => user.username);
    //   console.log(usernames)
    //   domUpdates.login()
    //   return
    //     //maybe it just creates an array of usernames and tests each value against that
    // }


}

export default UserRepository;
