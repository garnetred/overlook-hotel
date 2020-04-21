import chai from 'chai';
import Booking from '../src/Booking';
import bookingTestData from '../data/bookings-test-data'
const expect = chai.expect;
import spies from 'chai-spies';
import domUpdates from '../src/domUpdates'
chai.use(spies);

describe('Booking', function() {
  let booking1;
  let booking2;
  //create variable for date

  beforeEach(() => {
    booking1 = new Booking(bookingTestData[0]);
    booking2 = new Booking(bookingTestData[1]);

  });



  it('should be an instance of Booking', function() {
    expect(booking1).to.be.an.instanceof(Booking);
    expect(booking2).to.be.an.instanceof(Booking);
  });

  it('should have an id', function() {
    expect(booking1.id).to.equal("5fwrgu4i7k55hl6t8");
    expect(booking2.id).to.equal("5fwrgu4i7k55hl6wc");
  });

  it('should have a userID', function() {
    expect(booking1.userID).to.equal(1);
    expect(booking2.userID).to.equal(4);
  });

  it('should have a date', function() {
    expect(booking1.date).to.equal("2020/02/05");
    expect(booking2.date).to.equal("2020/02/05");
  });

  it('should have a room number', function() {
    expect(booking1.roomNumber).to.equal(12);
    expect(booking2.roomNumber).to.equal(23);
  });

  it('should have room service charges', function() {
    expect(booking1.roomServiceCharges).to.deep.equal([]);
    expect(booking2.roomServiceCharges).to.deep.equal([]);
  });




});
