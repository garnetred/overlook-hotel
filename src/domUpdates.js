import $ from 'jquery';
import User from './User';
import UserRepository from './UserRepository';
import Room from './Room';
import Booking from './Booking';
import BookingRepository from './BookingRepository';

let user;
let userRepository;
let room;
let allRooms;
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

    allRooms = rooms;
    rooms.forEach(place => {

      return room = new Room(place);
      room;
    })
    bookings.forEach(booking => {
      return booking = new Booking(booking);
    })

    bookingRepository = new BookingRepository(bookings);
    userRepository = new UserRepository(users)
  },

  displayHomePage() {
    let allPages = $('body').children().toArray();
    allPages.forEach(page => {
      $(page).addClass('hide')
    })
    $('.navbar').removeClass('hide');
    console.log(currentUser)
    console.log('displaying home page');
    if (currentUser === 'manager') {
      $('.manager-dashboard').removeClass('hide');
      $('#booking-search-page').text('View All Rooms')
      domUpdates.displayManagerInfo();
    } else {
      $('.customer-dashboard').removeClass('hide');
      $('.customer-welcome-message').text(`Welcome, ${currentUser.firstName}`)
      domUpdates.displayCustomerInfo();
    }
  },

  displayManagerInfo() {
    console.log(allRooms)
    $('.all-manager-daily-info').html(`<section class="manager-info">
      <p>Available Rooms:<span>${bookingRepository.findAllAvailableRooms(allRooms, currentDate)}</span></p>
      <p>Total Revenue: <span>$${bookingRepository.calculateDailyRevenue(currentDate, allRooms)}</span></p>
      <p>Percentage of Rooms Occupied: <span>${bookingRepository.findBookedRoomPercentagePerDay(allRooms, currentDate)}%</span></p>
      <p></p>
    </section>`)
  },

  displayCustomerInfo() {
    $('.customer-total').html(`<p>You have spent</p>
      <span> $${currentUser.calculateTotal()} </span>
      <p> in bookings </p>`)
     let futureBookings = currentUser.findFutureBookings(currentDate);

     let pastBookings = currentUser.findPastBookings(currentDate);

     let currentBookings = currentUser.findCurrentBookings(currentDate);
     console.log(futureBookings);
     if (futureBookings !== 'undefined' && $('.individual-booking-info')) {
       futureBookings.forEach(booking => {
         $('.upcoming-bookings-info').append(`<section class="individual-booking-info">
         <p>Date: ${booking.date}</p>
         <p>Room Number: ${booking.roomNumber}</p>
         </section>`)

       })

       if (pastBookings !== 'undefined') {
         pastBookings.forEach(booking => {
           $('.past-bookings-info').append(`<section class="individual-booking-info">
             <p>Date: ${booking.date}</p>
             <p>Cost:</p>
             <p>Something:</p>`)
         })
       }

     }
      // $('.individual-booking-info').append(`<p>Date:</p>
      // <p>Cost:</p>
      // <p>Something:</p>`)
  },

  filterRoomByType() {
    //should filter room in the customer search page by type
  },

  displaySearchPage() {
    let allPages = $('body').children().toArray()
    allPages.forEach(page => {
      $(page).addClass('hide')
    })
    $('.booking-search').removeClass('hide');
    $('.navbar').removeClass('hide')
  },

  displayGuestsByNameAndDate() {
    //if the current user's username is
  },

  deleteBooking() {
    //should only work if current user's username is "manager"
  },

  login() {
    if ($('#username').val() === 'manager' && user.password === 'overlook2020') {
      userID = null;
      currentUser = 'manager';
      domUpdates.displayHomePage();
      return;
    }

    allUsers.forEach(user => {
      if (user.username === $('#username').val() && user.password === 'overlook2020')  {
        currentUser = user;
        domUpdates.displayHomePage();
        return;
      } else {
        console.log('incorrect login info')
      }
    })
  },

  logout() {
    let allPages = $('body').children().toArray()
    allPages.forEach(page => {
      $(page).addClass('hide')
    });
    $('.login-page').removeClass('hide');
    currentUser = null;
  },

  addBookingForSpecifiedUser() {
    //should only work if username is "manager"
  },

  changePageView() {
    //should change the page view depending on which page in the navbar has been clicked
  }

}

export default domUpdates;
