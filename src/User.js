import domUpdates from './domUpdates';
import * as moment from 'moment';



class User {
  constructor(userData) {
    this.id = userData.id;
    this.name = userData.name;
    this.firstName = this.getFirstName();
    this.currentBookings = null;
    this.username = `customer${userData.id}`
    this.password = 'overlook2020';
    this.futureBookings = null;
    this.pastBookings = null;

  }

  getFirstName() {
    return this.name.split(' ')[0];
  }

  calculateTotal() {
    if (this.allRooms === 0) {
      return 0;
    }
    let totalCost = this.allRooms.reduce((total, room) => {
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

  findAllRooms(rooms) {
    let bookedRoomNumbers;
    let matchedRooms = [];
    if (this.allBookings.length > 0) {
      bookedRoomNumbers = this.allBookings.filter(booking => booking.roomNumber).map(booking => booking.roomNumber);
      rooms.map(room => {
        bookedRoomNumbers.forEach(number => {
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
    this.currentBookings = this.allBookings.filter(booking => {
      return moment(booking.date).format('YYYYMMDD') === moment(date).format('YYYYMMDD');
    });
    domUpdates.displayCurrentBookings(this.currentBookings);
  }

  findPastBookings(date) {
    let sortedBookings = this.allBookings.sort((a, b) => {
        return moment(a.date).format('YYYYMMDD') - moment(b.date).format('YYYYMMDD')
      });


    this.pastBookings = sortedBookings.filter(booking => {
      return moment(booking.date).format('YYYYMMDD') < moment(date).format('YYYYMMDD');
    });
    domUpdates.displayPastBookings(this.pastBookings);
    return this.pastBookings;
  }

  findFutureBookings(date) {
  let sortedBookings = this.allBookings.sort((a, b) => {
      return moment(a.date).format('YYYYMMDD') - moment(b.date).format('YYYYMMDD')
    })

    this.futureBookings = sortedBookings.filter(booking => {
    return moment(booking.date).format('YYYYMMDD') >
    moment(date).format('YYYYMMDD');
  })

    domUpdates.displayFutureBookings(this.futureBookings);
    return this.futureBookings;
  }
}

export default User;
