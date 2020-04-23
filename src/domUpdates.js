import $ from 'jquery';

export let currentUser = null;
export let foundUser;
let allPages;
export let count = 0;

const domUpdates = {
  displayCorrectPage() {
    allPages = $('body').children().toArray()
  },

  displayHomePage() {
    count++;
    allPages.forEach(page => {
      $(page).addClass('hide')
    })
    $('.successful-booking-message').addClass('hide');
    $('.navbar').removeClass('hide');
    if (currentUser === 'manager') {
      $('.manager-dashboard').removeClass('hide');
      $('#booking-search-page').text('View All Rooms')
      return;
    } else if (currentUser !== 'manager') {
      $('.customer-dashboard').removeClass('hide');
      $('.customer-welcome-message').text(` Welcome to Overlook Hotel, ${currentUser.firstName}`)
    }
  },

  displayManagerInfo(revenue) {
    $('.manager-info').append(`
      <p class="revenue">Total Revenue: <span>$${revenue}</span></p>
      `)
  },

  displayAvailableRooms(rooms) {
    $('.manager-info').append(`
      <p class="revenue">Available Rooms: <span>${rooms}</span></p>
      `)
  },

  displayRoomsAvailableForBooking(rooms) {
    $('.search-results-message').text('Search Results');
    if (rooms.length === 0) {
      $('.booking-search-results').html(`<p>Unfortunately, there are no rooms available for the selected date and room type. Please try a different search. If you need further assistance, you are welcome to contact us at 1-800-555-5555.</p>`)
    } else {
      $('.booking-search-results').html('');
      rooms.forEach(room => {
        let type = room.roomType.split(' ').join('-');
        let beds = 'beds';
        let bidetInfo;
        if (room.numBeds === 1) {
          beds = 'bed'
        }
        if (room.bidet === true) {
          bidetInfo = 'This room also comes equipped with a bidet.'
        } else {
          bidetInfo = '';
        }
        $('.booking-search-results').append(`<section class="individual-search-results">
        <figure>
        <img alt="a thumbnail image of a ${room.roomType} in a hotel" src="./images/${type}.jpg">
        </figure>
        <article>
        <p>Room #${room.number} is a ${room.roomType} that offers ${room.numBeds} ${room.bedSize} ${beds} and a stunning ocean view when you just have to get away.  It is a quiet space tucked away on the first floor.${bidetInfo}</p>
        <p class="booking-price">$${room.costPerNight}/night</p>
        </article>
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

  displayTotal(cost) {
    $('.customer-total').html(`<p>You have spent</p>
      <span> $${cost} </span>
      <p> at Overlook Hotel </p>`)
  },

  displayPastBookings(past) {
    if (past !== 'undefined') {
      past.forEach(booking => {
        $('.past-bookings-info').append(`<section class="individual-booking-info">
                <p>Date: ${booking.date}</p>
                <p>Room Number:${booking.roomNumber}</p>`)
      })
    }
  },

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

  displayCurrentBookings(current) {
    if (current !== 'undefined' && $('.individual-booking-info')) {
      current.forEach(booking => {
        $('.current-bookings-info').append(`<section class="individual-booking-info">
                <p>Date: ${booking.date}</p>
                <p>Room Number: ${booking.roomNumber}</p>
                </section>`)
      })
    }
  },

  displaySearchPage() {
    allPages.forEach(page => {
      $(page).addClass('hide')
    })
    $('.booking-search').removeClass('hide');
    $('.navbar').removeClass('hide')
  },

  displayGuestsByNameAndDate(user) {
    foundUser = user;
    $('.manager-dashboard').addClass('hide');
    $('.manager-customer-search').removeClass('hide');
    $('.search-guests-input').val('');
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
  },

  deleteBooking(id, event) {
    $(event.target).parent().addClass('hide');
  },

  login(userRepository) {
    if ($('#username').val() === 'manager' && $('#password').val() === 'overlook2020') {
      currentUser = 'manager';
      domUpdates.displayHomePage();
      return;
    }

    userRepository.forEach(user => {
      if (user.username === $('#username').val() && $('#password').val() === 'overlook2020') {
        currentUser = user;
        domUpdates.displayHomePage();
        return;
      }
    })
  },

  logout() {
    currentUser = null;
    allPages.forEach(page => {
      $(page).addClass('hide')
    });
    $('.login-page').removeClass('hide');
  },

  displaySuccessfulBookingMesssage(user, date, roomNumber) {
    allPages.forEach(page => {
      $(page).addClass('hide')
    })
    $('.successful-booking-message').html('');
    $('.successful-booking-info').removeClass('hide');
    $('.successful-booking-info').addClass('flex');
    $('.successful-booking-message').removeClass('hide');
    if (currentUser !== 'manager') {
      $('.successful-booking-message').append(`<p>Room #${roomNumber} has been booked successfully for ${date}.`)
    } else {
      $('.successful-booking-message').append(`<p>Room #${roomNumber} has been booked successfully for ${user.name} for ${date}.`)
    }
    foundUser = null;
    setTimeout(domUpdates.displayHomePage, 3000);
  }

}

export default domUpdates;
