import $ from 'jquery';
import User from './User';
import UserRepository from './UserRepository';
import Room from './Room';
import Booking from './Booking';
import BookingRepository from './BookingRepository';

let user;
let userRepository;
let room;
let booking;
let bookingRepository;
let currentDate = "2020/02/05";
let currentUser = null;
let userID;
let allUsers = [];

const domUpdates = {

  instantiateData(users, rooms, bookings) {
    users.forEach(person => {
      user = new User(person)
      allUsers.push(user)
      return user;
    })

    rooms.forEach(room => {
      return room = new Room(room);
    })
    bookings.forEach(booking => {
      return booking = new Booking(booking);
    })

    bookingRepository = new BookingRepository(bookings);
    userRepository = new UserRepository(users)
    console.log(userRepository);
    console.log(bookingRepository)
    bookingRepository.findDailyBookings(currentDate)
    console.log(bookingRepository.calculateDailyRevenue(currentDate, rooms));
  },

  displayHomePage() {

  },

  filterRoomByType() {
    //should filter room in the customer search page by type
  },

  displayGuestsByNameAndDate() {
    //if the current user's username is
  },

  deleteBooking() {
    //should only work if current user's username is "manager"
  },

  login() {
    if ($('#username').val() === 'manager' && user.password === 'overlook2020') {
      userID = 0;
      console.log('manager')
      return;
    }

    allUsers.forEach(user => {
      if (user.username === $('#username').val() && user.password === 'overlook2020')  {
        currentUser = user;
        console.log('success')
        return;
      } else {
        console.log('incorrect login info')
      }
    })
  },

  logout() {
    //should log a user out once they click on the "logout" option in the dropdown menu
  },

  addBookingForSpecifiedUser() {
    //should only work if username is "manager"
  },

  changePageView() {
    //should change the page view depending on which page in the navbar has been clicked
  }

}

export default domUpdates;
