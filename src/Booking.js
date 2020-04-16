import domUpdates from './domUpdates'


class Booking {
  constructor(bookingData) {
    this.id = bookingData.id;
    this.userID = bookingData.userID;
    this.date = bookingData.date;
    this.roomNumber = bookingData.roomNumber;
    this.roomServiceCharges = bookingData.roomServiceCharges;
  }

  //could iterate through user array rather than passing everything in
  
  matchUser() {
    //maybe this looks through all of the users to find the object that contains the user who actually made the booking
  }
}

export default Booking;
