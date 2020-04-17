import domUpdates from './domUpdates';
import bookingTestData from '../data/bookings-test-data'

class User {
  constructor(userData) {
    this.id = userData.id;
    this.name = userData.name;
    this.firstName = this.getFirstName();
    this.allBookings = [];
    this.currentBookings = null;
    this.username = `customer${userData.id}`
    this.password = 'overlook2020';

  }

  getFirstName() {
    this.firstName = this.name.split(' ')[0];
  }

  calculateTotal() {
    //should calculate total spent on all reservations
    //should include new booking information
    //should cycle through booking test data first to look for all bookings
    let bookedRoom;
    if (this.allBookings.length > 0) {
      console.log('in here')
      let bookedRoom = this.allBookings.filter(booking => booking.roomNumber);
      //I want the rooms that were booked so I can go through the array and look for them, they don't
      console.log(bookedRoom)
    }
    return bookedRoom
  }

  findAllBookings() {
    //should find past bookings for this user and add to the pastBookings array
    //needs to iterate through booking test data and retrieve all data with the correct userID
    this.allBookings = bookingTestData.filter(booking => booking.userID === this.id);
  }

  findCurrentBookings() {
  //based on today's date, cycles through bookings array to check for a booking for this user that matches that date
  }

  findPastBookings() {
    //cycles through allBookings to create an array of all pastBookings
  }

}

export default User;
