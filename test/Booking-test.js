import chai from 'chai';
import Booking from '../src/Booking';
import bookingTestData from '../data/bookings-test-data'
const expect = chai.expect;
import spies from 'chai-spies';
import domUpdates from '../src/domUpdates'
chai.use(spies);

describe('See if the tests are running', function() {
  let booking1;
  let booking2;
  //create variable for date

  beforeEach(() => {
    booking1 = new Booking();
    booking2 = new Booking();
  });

  it('should be an instance of Booking', function() {
    expect(booking1).to.be.an.instanceof(Booking);
    expect(booking2).to.be.an.instanceof(Booking);
  });


});
