import domUpdates from './domUpdates'


class BookingRepository {
  constructor(data) {
    this.allBookings = data;
  }

  calculateDailyRevenue() {
    //this will cycle through the allbookings array to grab room numbers for a particular day, then compare them against the price per room
  }

  calculateTotalBookingsPerDay() {

  }

  calculateRoomsBookedPerDay() {

  }
}

export default BookingRepository;
