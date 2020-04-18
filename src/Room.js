import domUpdates from './domUpdates'

class Room {
  constructor(roomData) {
    this.number = roomData.number;
    this.roomType = roomData.roomType;
    this.bidet = roomData.bidet;
    this.bedSize = roomData.bedSize;
    this.numBeds = roomData.numBeds;
    this.costPerNight = roomData.costPerNight;
    this.isAvailable = null;
  }

  //could use booking data here as object literal without passing it in as a parameter
  createNewBooking(user, date) {
    //should create a new booking and send a post request to the bookings endpoint, while generating a random ID to use in this request
    let url = 'https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings'
    let bookingInfo = {
      'id': Math.floor(Math.random() * 1000000000000),
      'userID': user.id,
      'date': date,
      'roomNumber': this.number
    }

    fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingInfo),
      }).then(response => response.json)
      .then(data => console.log(data))
      .catch(err => console.error(err))
  }

  checkifAvailable(bookings, date) {
    let matchedBookings = bookings.filter(booking => {
      return booking.date === date && booking.roomNumber === this.number
    })

    if (matchedBookings.length > 0) {
      this.isAvailable = false;
    } else {
      this.isAvailable = true;
    }

  }
}

export default Room;
