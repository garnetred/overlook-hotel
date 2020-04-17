import domUpdates from './domUpdates';
import roomTestData from '../data/rooms-test-data'
import bookingTestData from '../data/bookings-test-data'


class User {
  constructor(userData) {
    this.id = userData.id;
    this.name = userData.name;
    this.firstName = this.getFirstName();
    this.allBookings = this.findAllBookings();
    this.currentBookings = null;
    this.username = `customer${userData.id}`
    this.password = 'overlook2020';
    this.allRooms = this.findAllRooms();

  }

  getFirstName() {
    this.firstName = this.name.split(' ')[0];
  }

  calculateTotal() {
    if (this.allRooms === 0) {
      return 0;
    }
    let totalCost = this.allRooms.reduce((total, room) =>{
      total += room.costPerNight;
      return Number(total.toFixed(2));
    }, 0)

    return totalCost;
  }

  findAllBookings() {
    return bookingTestData.filter(booking => booking.userID === this.id);
  }

//needs refactoring to get rid of nested if statement
  findAllRooms() {
    let bookedRoomNumbers;
    let matchedRooms = [];
    if (this.allBookings.length > 0) {
      bookedRoomNumbers = this.allBookings.filter(booking => booking.roomNumber).map(booking => booking.roomNumber);
      roomTestData.map(room => {
        bookedRoomNumbers.forEach(number =>  {
          if (room.number === number) {
            matchedRooms.push(room)
          }
        });
      });
    }
    return matchedRooms;
  }

  findCurrentBookings(date) {
    this.currentBookings = this.allBookings.filter(booking => booking.date === date);

  }

  findPastBookings(date) {
    let pastBookings = this.allBookings.filter(booking => booking.date !== date);
    return pastBookings;
  }

}

export default User;
