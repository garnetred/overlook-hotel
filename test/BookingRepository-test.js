import chai from 'chai';
import BookingRepository from '../src/BookingRepository';
import bookingTestData from '../data/bookings-test-data'
const expect = chai.expect;
import spies from 'chai-spies';
import domUpdates from '../src/domUpdates'
chai.use(spies);

describe('See if the tests are running', function() {
  let booking;
  //create variable for date

  beforeEach(() => {
    booking = new BookingRepository();
  });

  it('should be an instance of Booking Booking Repository', function() {
    expect(booking).to.be.an.instanceof(BookingRepository);
  });


});
