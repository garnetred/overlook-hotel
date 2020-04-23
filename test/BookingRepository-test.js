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
    chai.spy.on(domUpdates, ['displayManagerInfo', 'displayAvailableRooms', 'displayBookedRoomPercentagePerDay', 'displayRoomsAvailableForBooking'], () => true);
  });

  afterEach(() => {
    chai.spy.restore(booking);
    chai.spy.restore(booking2);
    chai.spy.restore(domUpdates);
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
        id: "5fwrgu4i7k55hl88k",
        userID: 3,
        date: "2020/02/07",
        roomNumber: 2,
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
        date: "2020/02/07",
        roomNumber: 24,
        roomServiceCharges: []
      }
    ]);
  });

  it('should calculate daily revenue', function() {

    expect(booking.calculateDailyRevenue(currentDate, roomTestData)).to.equal(609.71);

    expect(booking2.calculateDailyRevenue("2020/02/07", roomTestData)).to.equal(1321.15);
    expect(domUpdates.displayManagerInfo).to.have.been.called(2);
  });



  it('should calculate percentage of available rooms booked by day', function() {

    expect(booking.findBookedRoomPercentagePerDay(roomTestData, currentDate)).to.equal(23);
    expect(booking2.findBookedRoomPercentagePerDay(roomTestData, secondDate)).to.equal(31)
    expect(domUpdates.displayBookedRoomPercentagePerDay).to.have.been.called(2);

  });

  it('should find all available rooms per day', function() {


    expect(booking.findAllAvailableRooms(roomTestData, currentDate)).to.equal(10);
    expect(booking2.findAllAvailableRooms(roomTestData, secondDate)).to.equal(9)
    expect(domUpdates.displayAvailableRooms).to.have.been.called(2);

  });

  it('should find available rooms by date and type', function() {

    expect(booking.findAvailableRoomsByDateAndType(roomTestData, 'suite', currentDate)).to.deep.equal([{
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

    expect(booking2.findAvailableRoomsByDateAndType(roomTestData, 'suite', secondDate)).to.deep.equal([]);
    expect(domUpdates.displayRoomsAvailableForBooking).to.have.been.called(2);

  });

  it('should successfully delete a booking', function() {
    expect(booking.deleteBooking('5fwrgu4i7k55hl72u')).to.equal(true);
    expect(booking2.deleteBooking('5fwrgu4i7k55hl88k')).to.equal(true);
  });

});
