import $ from 'jquery';

export let currentUser = null;
let userID;
let allUsers = [];
let count = 0;

const domUpdates = {

  displayHomePage() {
    count++;
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
      // domUpdates.displayManagerInfo();
      return;
    } else if (currentUser !== 'manager') {
      $('.customer-dashboard').removeClass('hide');
      $('.customer-welcome-message').text(`Welcome, ${currentUser.firstName}`)
    }
  },

  displayManagerInfo(revenue) {
    $('.all-manager-daily-info').html(`<section class="manager-info">
      <p>Total Revenue: <span>$${revenue}</span></p>
      <p></p>
    </section>`)
  },

  displayAvailableRooms() {

  },

  displayDailyRevenue() {

  },

  displayBookedRoomPercentagePerDay() {

  },

//separate into three separate functions
  displayTotal(cost) {
    $('.customer-total').html(`<p>You have spent</p>
      <span> $${cost} </span>
      <p> in bookings </p>`)
  },
  //
  //    let pastBookings = currentUser.findPastBookings(currentDate);
  //
  //    let currentBookings = currentUser.findCurrentBookings(currentDate);
  //    console.log('future,past,current', futureBookings, pastBookings, currentBookings)
  //

  //
  //

       // displayPastBookings(past) {
       //   if (past !== 'undefined') {
       //        past.forEach(booking => {
       //          $('.past-bookings-info').append(`<section class="individual-booking-info">
       //            <p>Date: ${booking.date}</p>
       //            <p>Cost:</p>
       //            <p>Something:</p>`)
       //        })
       //      }
       // },
       //
       // displayFutureBookings(future) {
       //      if (future !== 'undefined' && $('.individual-booking-info')) {
       //        future.forEach(booking => {
       //          $('.upcoming-bookings-info').append(`<section class="individual-booking-info">
       //          <p>Date: ${booking.date}</p>
       //          <p>Room Number: ${booking.roomNumber}</p>
       //          </section>`)
       //        })
       //      }
       // },

       displayCurrentBookings() {

       },

       // if (currentBookings !== 'undefined') {
       //   currenBookings.forEach(booking => {
       //     $('.upcoming-bookings-info').append(`<section class="individual-booking-info">
       //       <p>Date: ${booking.date}</p>
       //       <p>Cost:</p>
       //       <p>Something:</p>`)
       //   })
       // }

      // $('.individual-booking-info').append(`<p>Date:</p>
      // <p>Cost:</p>
      // <p>Something:</p>`)

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

  displayGuestsByNameAndDate(user, date) {
    //maybe I shouldn't let this be invoked right away?
    //or maybe this function should do something else?
    //it could maybe find the user by name, but find an instantiated user?
    $('.manager-dashboard').addClass('hide');
    $('.manager-customer-search').removeClass('hide');
    $('.found-user-name').text(`${user.name}`)
    $('.customer-total-info').append(`
        <p>${user.getFirstName()} has spent</p>
        <span>${user.calculateTotal()}</span>
        <p>at Overlook Hotel</p>
    `)

    user.futureBookings.forEach(booking => {
      $('.upcoming-bookings-info').append(`
        <section class="individual-booking-info">
        <p>Date: ${booking.date}</p>
        <p>Room Number: ${booking.roomNumber}</p>
        </section>
          <button>Cancel</button>`)
          console.log('hey');
    })

    user.pastBookings.forEach(booking => {
      $('.past-bookings-info').append(`<section class="individual-booking-info">
                  <p>Date: ${booking.date}</p>
                  <p>Room Number: ${booking.roomNumber}</p>
                </section>`)
                console.log('hi');
    })
  },

  deleteBooking() {
    //should only work if current user's username is "manager"
  },

  login(userRepository) {
    if ($('#username').val() === 'manager' && $('#password').val() === 'overlook2020') {
      userID = null;
      currentUser = 'manager';
      domUpdates.displayHomePage();
      return;
    }

    userRepository.forEach(user => {
      if (user.username === $('#username').val() && $('#password').val() === 'overlook2020')  {
        currentUser = user;
        userID = user.id;
        domUpdates.displayHomePage();
        return;
      } else {
        console.log('incorrect login info')
      }
    })
  },

  logout() {
    currentUser = null;
    console.log(currentUser)
    let allPages = $('body').children().toArray()
    allPages.forEach(page => {
      $(page).addClass('hide')
    });
    $('.login-page').removeClass('hide');
  },

  addBookingForSpecifiedUser() {
    //should only work if username is "manager"
  }

}

export default domUpdates;
