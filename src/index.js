import $ from 'jquery';
import './css/base.scss';

import domUpdates from './domUpdates';
import User from './User';
import UserRepository from './UserRepository';
import Room from './Room';
import Booking from './Booking';
import BookingRepository from './BookingRepository';


import './images/turing-logo.png';
import './images/hotel-login-page.jpg';
// import '../favicon.ico';


//variables
//currentDate variable
//user
//BookingRepository
//bookings
//rooms

//functions
//fetch data from users endpoint
//fetch data from bookings endpoint
//fetch data from rooms endpoint
//invoke function that will then instantiate all three items

//event listeners
//customer search button
//manager search button (to search through users)
//customer make booking button
//manager make booking button
//click handlers
//login button
//logout button
let user;
let allUsers = [];
let userRepository;
let room;
let allRooms;
let booking;
let bookingRepository;
let currentDate = "2020/02/05";
import { currentUser } from './domUpdates.js'
//dropdown
// let currentUser;
console.log('The code is running.');

function getData() {
  Promise.all([
      fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users').then(response => response.json()),
      fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms').then(response => response.json()),
      fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings').then(response => response.json()),
    ]).then(data => instantiateData(data[0].users, data[1].rooms, data[2].bookings))
    .then(data => findAllRoomsAndBookingsPerUser())
    .catch(err => console.error(err));
}

function instantiateData(users, rooms, bookings) {
  users.forEach(person => {
    user = new User(person)
    allUsers.push(user)
    return user;
  })
  console.log(allUsers)
  allRooms = rooms;
  rooms.forEach(place => {

    return room = new Room(place);
  })
  bookings.forEach(booking => {
    return booking = new Booking(booking);
  })

  bookingRepository = new BookingRepository(bookings);
  userRepository = new UserRepository(allUsers)
  console.log(userRepository);
}

function findAllRoomsAndBookingsPerUser() {
  userRepository.allUsers.forEach(user => {
    user.findAllBookings(bookingRepository.allBookings)
    user.findAllRooms(allRooms);
    // user.findFutureBookings(currentDate);
    // user.findCurrentBookings(currentDate);
    // user.findPastBookings(currentDate);
  })
}

export function deleteBookingRequest() {
  console.log('please delete ok')
}

  $('.login-form').submit(function(event) {
    event.preventDefault();
    console.log(userRepository);
    domUpdates.login(userRepository.allUsers)
    if (currentUser !== 'manager') {
      currentUser.findAllBookings(bookingRepository.allBookings);
      currentUser.findAllRooms(allRooms);
      currentUser.calculateTotal();
      currentUser.findFutureBookings(currentDate);
      currentUser.findPastBookings(currentDate);
    } else {
      bookingRepository.findBookedRoomPercentagePerDay(allRooms, currentDate);
      bookingRepository.calculateDailyRevenue(currentDate, allRooms);
      bookingRepository.findAllAvailableRooms(allRooms, currentDate);
    }
  });
  $('.account-text').click(function() {
    if (currentUser === 'manager') {
      bookingRepository.findBookedRoomPercentagePerDay(allRooms, currentDate);
      bookingRepository.calculateDailyRevenue(currentDate, allRooms);
      bookingRepository.findAllAvailableRooms(allRooms, currentDate);
      domUpdates.displayHomePage();
      console.log('in current user manager')
    } else {
      domUpdates.displayHomePage();
      currentUser.findFutureBookings(currentDate);
      currentUser.findPastBookings(currentDate);
    }
  });
  $('.logout-text').click(domUpdates.logout);
  $('#booking-search-page').click(domUpdates.displaySearchPage)
  $('.manager-search-guests-button').click(function() {
    // $('.search-guests-input').val().findPastBookings(currentDate);
    // $('.search-guests-input').val().findFutureBookings(current);
    // $('.search-guests-input').val().findCurrentBookings(current);
    userRepository.findUserByName($('.search-guests-input').val(), currentDate)
  })

// $('.delete-booking-button').click(function() {
//   console.log('please delete me')
// })
$('body').click(function() {
  if ($(event.target).hasClass('delete-booking-button')) {
    bookingRepository.deleteBooking(event.target.id, event);
    console.log(event.target.id)
  }
})

  $(window).on("load", getData);
