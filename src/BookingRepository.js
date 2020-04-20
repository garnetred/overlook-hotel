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

  findAvailableRoomsByDateAndType(rooms, type, date) {
    let availableRoomsByDate = [];
    let availableRoomsByDateAndType = [];
    let bookedRoomNumbers = this.dailyBookings.map(booking => booking.roomNumber)
    let unavailableRooms = this.allBookings.filter(booking => booking.date === date);
    console.log('unavailable', unavailableRooms)
    //this is in the regular bookings array though, would need to convert to the rooms one

    //need to iterate through both bookings and rooms by room number
    //because it's nested everything is added more than once
    // availableRoomsByDate = rooms.filter(room => {
    // return this.allBookings.filter(booking => {
    //     return booking.date !== date && room.number !== booking.roomNumber
    //   })
    // })

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
