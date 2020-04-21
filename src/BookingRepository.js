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
    return dailyRevenue;
  }

  //may need to be refactored so this value is always available to us
  // findDailyBookings(date = '2020/02/05') {
  //   this.dailyBookings =
  // }

  findBookedRoomPercentagePerDay(rooms, date) {
    let dailyBookings = this.allBookings.filter(booking => booking.date === date);
    let decimal = (dailyBookings.length/rooms.length * 100).toFixed(0);
    return Number(decimal);
  }

  findAllAvailableRooms(rooms, date) {
      let dailyBookings = this.allBookings.filter(booking => booking.date === date);
      let availableRooms = rooms.length - dailyBookings.length;
      return availableRooms;
      //add relevant test
  }

  findAvailableRoomsByDateAndType(rooms, type, date) {
    let availableRoomsByDate = [];
    let availableRoomsByDateAndType = [];
      let dailyBookings = this.allBookings.filter(booking => booking.date === date);
    let bookedRoomNumbers = dailyBookings.map(booking => booking.roomNumber)
    let unavailableRooms = this.allBookings.filter(booking => booking.date === date);
    console.log('unavailable', unavailableRooms)
    //this is in the regular bookings array though, would need to convert to the rooms one

    availableRoomsByDate = rooms.filter(room => unavailableRooms.includes(room));


    // rooms.forEach(room => {
    //   return bookedRoomNumbers.forEach(number => {
    //     if (room.number !== number) {
    //       availableRoomsByDate.push(room)
    //     }
    //   })
    // })
    console.log('available rooms', availableRoomsByDate)
    //maybe I should use all bookings and just pass in the date

    availableRoomsByDateAndType = availableRoomsByDate.filter(room => room.roomType.includes(type));

    // console.log(availableRoomsByDateAndType);
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
