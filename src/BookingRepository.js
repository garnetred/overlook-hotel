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
    //should find the rooms that are currently available on a particular date based on the ones that have bookings
    //trying to find bookings that are past the current date
    //wait, we're just looking for a particular date that has passed, right? so this is stupid
    //maybe using this.daily bookings somehow to find those room numbers, then pull the rooms that don't have those numbers and put them in an array
    //maybe create the opposite of the daily bookings - the available rooms array for a specific date?
    //that's what I was trying to do....
    //can I just create an array of room numbers rather than filtering through everything?
    let availableRoomsByDate = [];
    let availableRoomsByDateAndType = [];
    let bookedRoomNumbers = this.dailyBookings.map(booking => booking.roomNumber)

    let totalRooms = rooms.filter(room => {
      this.dailyBookings.forEach(number => {        console.log(room.number !== number)
        room.number !== number
      })
    });

    console.log(totalRooms)
    // rooms.filter(room => {
    //   return bookedRoomNumbers.forEach(booking => {
    //     console.log(room.number, booking)
    //     if (room.number !== booking && !availableRoomsByDate.includes(room) && !availableRoomsByDate.includes(booking)) {
    //       availableRoomsByDate.push(room);
    //     }
    //   })
    // })
    //this logic is wrong - it'll always add all of the rooms to the array because when we're on room, say, 6, it won't match one of the items in the array (23), even if that is a different item that does have a match.
    // console.log('available rooms', availableRoomsByDate)
    availableRoomsByDate.filter(room => {
      if (room.roomType === type) {
        availableRoomsByDateAndType.push(room)
      }
    });
    // console.log('date and type', availableRoomsByDateAndType);
    return availableRoomsByDateAndType;
  }


}

export default BookingRepository;
