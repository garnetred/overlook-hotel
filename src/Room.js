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

  //could use booking data here as object literal without passing it in as a parameter
  createNewBooking() {
    //should create a new booking and send a post request to the bookings endpoint, while generating a random ID to use in this request
  }

  deleteBooking() {
    //maybe this goes here if the current user's username is actually "manager";
  }
}

export default Room;
