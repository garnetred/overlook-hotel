import $ from 'jquery';

export let currentUser = null;
let userID;
let allUsers = [];
export let count = 0;

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
      return;
    } else if (currentUser !== 'manager') {
      $('.customer-dashboard').removeClass('hide');
      $('.customer-welcome-message').text(`Welcome, ${currentUser.firstName}`)
    }
  },

  displayManagerInfo(revenue) {
    $('.manager-info').append(`
      <p class="revenue">Total Revenue: <span>$${revenue}</span></p>
      `)
    //finish this method
  },

  displayAvailableRooms(rooms) {
    $('.manager-info').append(`
      <p class="revenue">Available Rooms: <span>${rooms}</span></p>
      `)
  },

  displayRoomsAvailableForBooking(rooms) {
    $('.search-results-message').text('Search Results');
    //must iterate through all rooms and display a message, so it'll have to be generic.
    if (rooms.length === 0) {
      $('.booking-search-results').html(`<p>Unfortunately, there are no rooms available for the selected date and room type. Please try a different search. If you need further assistance, you are welcome to contact us at 1-800-555-5555.</p>`)
    } else {
      $('.booking-search-results').html('');
      rooms.forEach(room => {
        $('.booking-search-results').append(`<section class="individual-search-results">
        <figure>
        ...
        </figure>
        <article>
        <p>This lovely ${room.roomType} offers ${room.numBeds} beds and a stunning ocean view when you just have to get away. Located at ${room.number}, it is a quiet space tucked away on the first floor.</p>
        <p class="booking-price">$${room.costPerNight} per night</p>
        <button class="customer-book-room-button" id=${room.number}>Book</button>
        </section>`);
      })
    }
  },


  displayBookedRoomPercentagePerDay(value) {
    $('.manager-info').append(`
      <p class="occupied-rooms">Percentage Of Rooms Occupied: <span>${value}%</span></p>
      `)
  },

  //separate into three separate functions
  displayTotal(cost) {
    $('.customer-total').html(`<p>You have spent</p>
      <span> $${cost} </span>
      <p> in bookings </p>`)
  },

  displayPastBookings(past) {
    if (past !== 'undefined') {
      past.forEach(booking => {
        $('.past-bookings-info').append(`<section class="individual-booking-info">
                <p>Date: ${booking.date}</p>
                <p>Cost:</p>
                <p>Something:</p>`)
      })
    }
  },
  //
  displayFutureBookings(future) {
    if (future !== 'undefined' && $('.individual-booking-info')) {
      future.forEach(booking => {
        $('.upcoming-bookings-info').append(`<section class="individual-booking-info">
                <p>Date: ${booking.date}</p>
                <p>Room Number: ${booking.roomNumber}</p>
                </section>`)
      })
    }
  },

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
    $('.manager-dashboard').addClass('hide');
    $('.manager-customer-search').removeClass('hide');
    $('.search-guests-input').val('');
    // $('.found-user-name').text('');
    $('.found-user-name').text(`${user.name}`)
    $('.customer-total-info').html('');
    $('.customer-total-info').append(`
        <p>${user.getFirstName()} has spent</p>
        <span>$${user.calculateTotal()}</span>
        <p>at Overlook Hotel</p>
    `)
    $('.upcoming-bookings-info').html('');
    user.futureBookings.forEach(booking => {
      $('.upcoming-bookings-info').append(`
        <section class="individual-booking-info">
        <p>Date: ${booking.date}</p>
        <p>Room Number: ${booking.roomNumber}</p>
        <button class="delete-booking-button" id=${booking.id}>Cancel</button>
        </section>
          `)
    })
    // $('.delete-booking-button').click(function() {
    //   deleteBookingRequest();
    // })

    $('.past-bookings-info').html('');
    user.pastBookings.forEach(booking => {
      $('.past-bookings-info').append(`<section class="individual-booking-info">
                  <p>Date: ${booking.date}</p>
                  <p>Room Number: ${booking.roomNumber}</p>
                </section>`)
      console.log('hi');
    })
  },

  deleteBooking(id, event) {
    //should only work if current user's username is "manager"
    console.log(event.target)
    // console.log(.parent())
    $(event.target).parent().addClass('hide');
    //how do I delete this though?
  },

  login(userRepository) {
    if ($('#username').val() === 'manager' && $('#password').val() === 'overlook2020') {
      userID = null;
      currentUser = 'manager';
      domUpdates.displayHomePage();
      return;
    }

    userRepository.forEach(user => {
      if (user.username === $('#username').val() && $('#password').val() === 'overlook2020') {
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
