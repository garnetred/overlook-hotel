import $ from 'jquery';
import './css/base.scss';

import domUpdates from './domUpdates';

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
//dropdown
// let user;
// let userRepository;
// let room;
// let booking;
// let bookingRepository;
// let currentDate = "2020/02/05";
// let currentUser;
console.log('The code is running.');

function getData() {
  Promise.all([
      fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users').then(response => response.json()),
      fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms').then(response => response.json()),
      fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings').then(response => response.json()),
    ]).then(data => domUpdates.instantiateData(data[0].users, data[1].rooms, data[2].bookings))
    .catch(err => console.error(err));
}

$('.login-form').submit(function(event) {
  event.preventDefault();
  domUpdates.login();
});
$(window).on("load", getData);
