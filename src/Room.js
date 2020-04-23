import domUpdates from './domUpdates'

class Room {
  constructor(roomData) {
    this.number = roomData.number;
    this.roomType = roomData.roomType;
    this.bidet = roomData.bidet;
    this.bedSize = roomData.bedSize;
    this.numBeds = roomData.numBeds;
    this.costPerNight = roomData.costPerNight;
  }

  createNewBooking(user, date) {
    let url = 'https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings';
    let newDate = date.split('-').join('/');
    let bookingInfo = {
      'userID': user.id,
      'date': newDate,
      'roomNumber': this.number
    }

    fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingInfo),
      }).then(response => response.json)
      .then(data => domUpdates.displaySuccessfulBookingMesssage(user, date, this.number))
      .catch(err => console.error(err))
  }

}

export default Room;