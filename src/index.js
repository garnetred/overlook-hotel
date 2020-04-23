import $ from 'jquery';
import './css/base.scss';

import domUpdates from './domUpdates';
import User from './User';
import UserRepository from './UserRepository';
import Room from './Room';
import BookingRepository from './BookingRepository';


import './images/hotel-background.jpg';
import './images/junior-suite.jpg';
import './images/suite.jpg';
import './images/residential-suite.jpg';
import './images/single-room.jpg';

let user;
let allUsers = [];
let userRepository;
let room;
let allRooms = [];
let bookingRepository;
let currentDate = "2020/02/05";
import {
  currentUser
} from './domUpdates.js'
import {
  count
} from './domUpdates.js'
import {
  foundUser
} from './domUpdates.js'

function getData() {
  Promise.all([
      fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users').then(response => response.json()),
      fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms').then(response => response.json()),
      fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings').then(response => response.json()),
    ]).then(data => instantiateData(data[0].users, data[1].rooms, data[2].bookings))
    .then(data => findAllRoomsAndBookingsPerUser())
    .then(data => domUpdates.displayCorrectPage())
    .catch(err => console.error(err));
}

function instantiateData(users, rooms, bookings) {
  users.forEach(person => {
    user = new User(person)
    allUsers.push(user)
    return user;
  })
  rooms.forEach(place => {

    room = new Room(place);
    allRooms.push(room);
    return rooms;
  })

  bookingRepository = new BookingRepository(bookings);
  userRepository = new UserRepository(allUsers)
}

function findAllRoomsAndBookingsPerUser() {
  userRepository.allUsers.forEach(user => {
    user.findAllBookings(bookingRepository.allBookings)
    user.findAllRooms(allRooms);
  })
}


$('.login-form').submit(function(event) {
  event.preventDefault();
  domUpdates.login(userRepository.allUsers)
  if (currentUser !== 'manager') {
    currentUser.findAllBookings(bookingRepository.allBookings);
    currentUser.findAllRooms(allRooms);
    currentUser.calculateTotal();
    currentUser.findFutureBookings(currentDate);
    currentUser.findPastBookings(currentDate);
    currentUser.findCurrentBookings(currentDate);
  } else if (currentUser === 'manager') {
    bookingRepository.findBookedRoomPercentagePerDay(allRooms, currentDate);
    bookingRepository.calculateDailyRevenue(currentDate, allRooms);
    bookingRepository.findAllAvailableRooms(allRooms, currentDate);
  }
});
$('.account-text').click(function() {
  if (currentUser === 'manager' && count < 1) {
    bookingRepository.findBookedRoomPercentagePerDay(allRooms, currentDate);
    bookingRepository.calculateDailyRevenue(currentDate, allRooms);
    bookingRepository.findAllAvailableRooms(allRooms, currentDate);
    domUpdates.displayHomePage();
  } else if (currentUser !== 'manager' && count < 1) {
    domUpdates.displayHomePage();
    currentUser.findFutureBookings(currentDate);
    currentUser.findPastBookings(currentDate);
  } else {
    domUpdates.displayHomePage();
  }
});
$('.logout-text').click(domUpdates.logout);
$('#booking-search-page').click(domUpdates.displaySearchPage)
$('.manager-search-guests-button').click(function() {
  userRepository.findUserByName($('.search-guests-input').val(), currentDate)
})

$('#booking-search-button').click(function(event) {
  event.preventDefault();
  let place;
  $('.room-type').each(function(i) {
    if ($(this).is(':checked')) {
      place = $(this).attr('id').split('-').join(' ');
    }
  })
  bookingRepository.findAvailableRoomsByDateAndType(allRooms, place, $('.date-search').val())
})

$('body').click(function(event) {
  if ($(event.target).hasClass('delete-booking-button')) {
    bookingRepository.deleteBooking(event.target.id, event);
  } else if ($(event.target).hasClass('customer-book-room-button') && currentUser !== 'manager') {
    let currentRoom =
      allRooms.find(room => room.number === Number(event.target.id))
    currentRoom.createNewBooking(currentUser, $('.date').val());
  } else if ($(event.target).hasClass('customer-book-room-button') && currentUser === 'manager') {
    let currentRoom =
      allRooms.find(room => room.number === Number(event.target.id))
    currentRoom.createNewBooking(foundUser, $('.date').val());
  } else if ($(event.target).hasClass('manager-book-room')) {
    domUpdates.displaySearchPage();
  }
})

$(window).on("load", getData);
