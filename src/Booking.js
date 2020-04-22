import domUpdates from './domUpdates'


class Booking {
  constructor(bookingData) {
    this.id = bookingData.id;
    this.userID = bookingData.userID;
    this.date = bookingData.date;
    this.roomNumber = bookingData.roomNumber;
    this.roomServiceCharges = bookingData.roomServiceCharges;
  }

findRoomPricePerBooking() {
  //iterate through booking data then iterate through room data using find and retrieve cost per night
  //why am I iterating through all booking data? 

}
}



export default Booking;
