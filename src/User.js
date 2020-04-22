import domUpdates from './domUpdates';
import roomTestData from '../data/rooms-test-data'
import bookingTestData from '../data/bookings-test-data'


class User {
  constructor(userData) {
    this.id = userData.id;
    this.name = userData.name;
    this.firstName = this.getFirstName();
    this.currentBookings = null;
    this.username = `customer${userData.id}`
    this.password = 'overlook2020';

  }

  getFirstName() {
    return this.name.split(' ')[0];
  }

  calculateTotal() {
    if (this.allRooms === 0) {
      return 0;
    }
    let totalCost = this.allRooms.reduce((total, room) =>{
      total += room.costPerNight;
      return Number(total.toFixed(2));
    }, 0)
    domUpdates.displayTotal(totalCost)
    return totalCost;
  }

  findAllBookings(bookings) {
    this.allBookings = bookings.filter(booking => booking.userID === this.id);
    return this.allBookings;
  }

//needs refactoring to get rid of nested if statement
  findAllRooms(rooms) {
    let bookedRoomNumbers;
    let matchedRooms = [];
    if (this.allBookings.length > 0) {
      bookedRoomNumbers = this.allBookings.filter(booking => booking.roomNumber).map(booking => booking.roomNumber);
      rooms.map(room => {
        bookedRoomNumbers.forEach(number =>  {
          if (room.number === number) {
            matchedRooms.push(room)
          }
        });
      });
    }
    this.allRooms = matchedRooms;
    return matchedRooms;
  }

  findCurrentBookings(date) {
    this.currentBookings = this.allBookings.filter(booking => booking.date === date);

  }

  findPastBookings(date) {
    let pastBookings = this.allBookings.filter(booking => date > booking.date);
    domUpdates.displayPastBookings(pastBookings);
    return pastBookings;
  }

  findFutureBookings(date) {
    let futureBookings = this.allBookings.filter(booking => date < booking.date);
    domUpdates.displayFutureBookings(futureBookings);
    // domUpdates.displayCustomerInfo(futureBookings, this.currentBookings);
    return futureBookings;
  }

}
//how do I invoke methods in this class when current user is undefined in main.js? do I delete the class?

export default User;
