import domUpdates from './domUpdates'


class BookingRepository {
  constructor(data) {
    this.allBookings = data;
    // this.dailyBookings = null;
  }

  calculateDailyRevenue(date, rooms) {
    let bookedRooms = [];
    let dailyRevenue;
    let dailyBookings = this.allBookings.filter(booking => booking.date === date);
    let roomNumbers = dailyBookings.map(booking => booking.roomNumber);
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
    let roundedRevenue = Math.round(dailyRevenue);
    domUpdates.displayManagerInfo(roundedRevenue);
    return dailyRevenue;
  }

  //may need to be refactored so this value is always available to us
  // findDailyBookings(date = '2020/02/05') {
  //   this.dailyBookings =
  // }

  findBookedRoomPercentagePerDay(rooms, date) {
    let dailyBookings = this.allBookings.filter(booking => booking.date === date);
    let decimal = (dailyBookings.length / rooms.length * 100).toFixed(0);
    domUpdates.displayBookedRoomPercentagePerDay(Number(decimal))
    return Number(decimal);
  }

  findAllAvailableRooms(rooms, date) {
    let dailyBookings = this.allBookings.filter(booking => booking.date === date);
    let availableRooms = rooms.length - dailyBookings.length;
    domUpdates.displayAvailableRooms(availableRooms);
    return availableRooms;
    //add relevant test
  }

  findAvailableRoomsByDateAndType(rooms, type, date) {
    let availableRoomsByDate = [];
    let availableRoomsByDateAndType = [];
    let bookedRoomNumbers = this.allBookings.filter(booking => booking.date === date).map(booking => booking.roomNumber);

    let allRoomNumbers = rooms.map(room => room.number);

    let availableRoomNumbers = allRoomNumbers.filter(roomNum => !bookedRoomNumbers.includes(roomNum));

    rooms.filter(room => {
      return availableRoomNumbers.forEach(roomNum => {
        if (room.number === roomNum && !availableRoomsByDate.includes(room)) {
          availableRoomsByDate.push(room);
        }
      })
    })

    availableRoomsByDateAndType = availableRoomsByDate.filter(room => room.roomType === type);
    domUpdates.displayRoomsAvailableForBooking(availableRoomsByDateAndType)
    return availableRoomsByDateAndType;
  }

  deleteBooking(id, event) {
    let url = `https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings/`
    let newID = Number(id);
    console.log(newID)
    domUpdates.deleteBooking(newID, event);

    return fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'id': newID
        })
      })
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err))

  }
}


export default BookingRepository;
