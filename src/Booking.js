import domUpdates from './domUpdates'


class Booking {
  constructor(bookingData) {
    this.id = bookingData.id;
    this.userID = bookingData.userID;
    this.date = bookingData.date;
    this.roomNumber = bookingData.roomNumber;
    this.roomServiceCharges = bookingData.roomServiceCharges;
  }

  deleteBooking() {
    let url = `https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings${this.id}`
    return fetch(url, {
        method: 'DELETE',
      })
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err))
  }
}

export default Booking;
