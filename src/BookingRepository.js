import domUpdates from './domUpdates'


class BookingRepository {
  constructor(data) {
    this.allBookings = data;
    this.dailyBookings = [];
  }

  calculateDailyRevenue(date) {
    //this will cycle through the daily bookings array and will retrieve room numbers, then compare them against the price per room
    //after getting room numbers, it will
  }

  calculateTotalBookingsPerDay() {

  }

  findAllBookedRoomsPerDay(date) {
    //will look through all of the rooms in the bookings array to find the ones for the current date
    //this may be needed to calculate the daily revenue
  }

  findAvailableRoomsByDateAndType() {
    //should find the rooms that are currently available on a particular date based on the ones that have bookings
  }

  deleteBooking() {
    //maybe you delete a booking here, because you need to see all bookings in order to do this
  }
}

export default BookingRepository;
