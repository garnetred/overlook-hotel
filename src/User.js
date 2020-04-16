import domUpdates from './domUpdates'


class User {
  constructor(userData) {
    this.id = userData.id;
    this.name = userData.name;
    this.allBookings = [];
    this.currentBooking = null;
    this.username = `customer${userData.id}`
    this.password = overlook2020;

  }

  getFirstName() {
    //should figure out a user's first name in order to display a greeting on the DOM
  }

  calculateTotal() {
    //should calculate total spent on all reservations
    //should include new booking information
  }

  findAllBookings() {
    //should find past bookings for this user and add to the pastBookings array
  }

  findCurrentBooking() {
  //based on today's date, cycles through bookings array to check for a booking for this user that matches that date
  }

  findPastBookings() {
    //cycles through allBookings to create an array of all pastBookings
  }

}

export default User;
