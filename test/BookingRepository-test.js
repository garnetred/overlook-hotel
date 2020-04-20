import chai from 'chai';
import BookingRepository from '../src/BookingRepository';
import bookingTestData from '../data/bookings-test-data'
import roomTestData from '../data/rooms-test-data'
const expect = chai.expect;
import spies from 'chai-spies';
import domUpdates from '../src/domUpdates'
chai.use(spies);

describe('BookingRepository', function() {
  let booking, booking2, currentDate, secondDate;
  //create variable for date

  beforeEach(() => {
    booking = new BookingRepository(bookingTestData);
    booking2 = new BookingRepository(bookingTestData);

    currentDate = '2020/02/05';
    secondDate = "2020/02/07";
    chai.spy.on(booking, ['deleteBooking'], () => true);
    chai.spy.on(booking2, ['deleteBooking'], () => true);
  });

  afterEach(() => {
    chai.spy.restore(booking);
    chai.spy.restore(booking2);
  });

  it('should be an instance of Booking Booking Repository', function() {
    expect(booking).to.be.an.instanceof(BookingRepository);
  });

  it('should store all bookings', function() {
    expect(booking.allBookings).to.deep.equal([{
        id: "5fwrgu4i7k55hl6t8",
        userID: 1,
        date: "2020/02/05",
        roomNumber: 12,
        roomServiceCharges: []
      },
      {
        id: "5fwrgu4i7k55hl6wc",
        userID: 4,
        date: "2020/02/05",
        roomNumber: 23,
        roomServiceCharges: []
      },
      {
        id: "5fwrgu4i7k55hl6ye",
        userID: 4,
        date: "2020/02/05",
        roomNumber: 8,
        roomServiceCharges: []
      },
      {
        id: "5fwrgu4i7k55hl6uf",
        userID: 2,
        date: "2020/01/09",
        roomNumber: 18,
        roomServiceCharges: []
      },
      {
        id: "5fwrgu4i7k55hl7cu",
        userID: 1,
        date: "2020/01/09",
        roomNumber: 5,
        roomServiceCharges: []
      },
      {
        id: "5fwrgu4i7k55hl6uy",
        userID: 2,
        date: "2020/01/24",
        roomNumber: 19,
        roomServiceCharges: []
      },
      {
        id: "5fwrgu4i7k55hl88k",
        userID: 2,
        date: "2020/01/24",
        roomNumber: 8,
        roomServiceCharges: []
      },
      {
        id: "5fwrgu4i7k55hl6v3",
        userID: 3,
        date: "2020/02/07",
        roomNumber: 23,
        roomServiceCharges: []
      },
      {
        id: "5fwrgu4i7k55hl7cd",
        userID: 4,
        date: "2020/02/07",
        roomNumber: 5,
        roomServiceCharges: []
      },
      {
        id: "5fwrgu4i7k55hl72u",
        userID: 3,
        date: "2020/02/17",
        roomNumber: 4,
        roomServiceCharges: []
      },
      {
        id: "5fwrgu4i7k55hl6zn",
        userID: 3,
        date: "2020/01/27",
        roomNumber: 14,
        roomServiceCharges: []
      },
      {
        id: "5fwrgu4i7k55hl6vc",
        userID: 4,
        date: "2020/01/18",
        roomNumber: 18,
        roomServiceCharges: []
      },
      {
        id: "5fwrgu4i7k55hl6vn",
        userID: 4,
        date: "2020/02/20",
        roomNumber: 1,
        roomServiceCharges: []
      },
      {
        id: "5fwrgu4i7k55hl6vr",
        userID: 5,
        date: "2020/01/19",
        roomNumber: 14,
        roomServiceCharges: []
      },
      {
        id: "5fwrgu4i7k55hl6xy",
        userID: 5,
        date: "2020/02/10",
        roomNumber: 16,
        roomServiceCharges: []
      },
      {
        id: "5fwrgu4i7k55hl6z1",
        userID: 5,
        date: "2020/02/12",
        roomNumber: 24,
        roomServiceCharges: []
      },
    ]);
  });

  it('should calculate daily revenue', function() {
    booking.findDailyBookings(currentDate);
    booking2.findDailyBookings(secondDate);

    expect(booking.calculateDailyRevenue(currentDate, roomTestData)).to.equal(609.71);

    expect(booking2.calculateDailyRevenue("2020/02/07", roomTestData)).to.equal(516.53);
  });

  it('should retrieve all daily bookings', function() {
    booking.findDailyBookings(currentDate);
    expect(booking.dailyBookings).to.deep.equal([{
        id: "5fwrgu4i7k55hl6t8",
        userID: 1,
        date: "2020/02/05",
        roomNumber: 12,
        roomServiceCharges: []
      },
      {
        id: "5fwrgu4i7k55hl6wc",
        userID: 4,
        date: "2020/02/05",
        roomNumber: 23,
        roomServiceCharges: []
      },
      {
        id: "5fwrgu4i7k55hl6ye",
        userID: 4,
        date: "2020/02/05",
        roomNumber: 8,
        roomServiceCharges: []
      }
    ]);
  });

  it('should calculate percentage of available rooms booked by day', function() {
    booking.findDailyBookings(currentDate);
    booking2.findDailyBookings(secondDate);

    expect(booking.findBookedRoomPercentagePerDay(roomTestData)).to.equal(23);
    expect(booking2.findBookedRoomPercentagePerDay(roomTestData)).to.equal(15)

  });

  it('should find available rooms by date', function() {
    booking.findDailyBookings(currentDate);
    booking2.findDailyBookings(secondDate);
    // console.log(booking2.dailyBookings)

    expect(booking.findAvailableRoomsByDateAndType(roomTestData, 'suite')).to.deep.equal([{
        number: 2,
        roomType: "suite",
        bidet: false,
        bedSize: "full",
        numBeds: 2,
        costPerNight: 477.38
      },
      {
        number: 24,
        roomType: "suite",
        bidet: false,
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 327.24
      }
    ]);

    expect(booking2.findAvailableRoomsByDateAndType(roomTestData, 'junior suite')).to.deep.equal([])

  });

  it('should successfully delete a booking', function() {
    expect(booking.deleteBooking('5fwrgu4i7k55hl72u')).to.equal(true);
    expect(booking2.deleteBooking('5fwrgu4i7k55hl88k')).to.equal(true);
  });

});
