import domUpdates from './domUpdates'


class BookingRepository {
  constructor(data) {
    this.allBookings = data;
    this.dailyBookings = null;
  }

  calculateDailyRevenue(date, rooms) {
    let bookedRooms = [];
    let dailyRevenue;
    let roomNumbers = this.dailyBookings.map(booking => booking.roomNumber);
    rooms.filter(room => {
      return roomNumbers.forEach(number => {
        if (room.number === number) {
          bookedRooms.push(room)
        }
      })
    })
    dailyRevenue = bookedRooms.reduce((total, room) => {
      total += room.costPerNight;
      return total;
    }, 0)
    return dailyRevenue;
  }

  //may need to be refactored so this value is always available to us
  findDailyBookings(date) {
    this.dailyBookings = this.allBookings.filter(booking => booking.date === date)
  }

  findBookedRoomPercentagePerDay(rooms) {
    let decimal = (this.dailyBookings.length/rooms.length * 100).toFixed(0);
    return Number(decimal);
  }

  findAvailableRoomsByDateAndType(rooms, type) {
    let availableRoomsByDate = [];
    let availableRoomsByDateAndType = [];
    let bookedRoomNumbers = this.dailyBookings.map(booking => booking.roomNumber)

    let totalRooms = rooms.filter(room => {
      return this.dailyBookings.forEach(number => {
        room.number !== number
      })
    });

    availableRoomsByDate.filter(room => {
      if (room.roomType === type) {
        availableRoomsByDateAndType.push(room)
      }
    });
    return availableRoomsByDateAndType;
  }

  deleteBooking(id) {
    let url = `https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings${id}`
    return fetch(url, {
        method: 'DELETE',
      })
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err))
  }
}


export default BookingRepository;
