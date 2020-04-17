import chai from 'chai';
import User from '../src/User';
import userTestData from '../data/users-test-data'
const expect = chai.expect;
import spies from 'chai-spies';
import domUpdates from '../src/domUpdates'
import bookingTestData from '../data/bookings-test-data'
chai.use(spies);

describe('See if the tests are running', function() {
  let user1, user2, user3;
  //create variable for date

  beforeEach(() => {
    user1 = new User(userTestData[0]);
    user2 = new User(userTestData[1]);
    user3 = new User(userTestData[2]);
  });

  it('should be an instance of User', function() {
    expect(user1).to.be.an.instanceof(User);
    expect(user2).to.be.an.instanceof(User);
    expect(user3).to.be.an.instanceof(User);
  });

  it('should have a userID', function() {
    expect(user1.id).to.equal(1);
    expect(user2.id).to.equal(2);
    expect(user3.id).to.equal(3);
  });

  it('should have a name', function() {
    expect(user1.name).to.equal("Leatha Ullrich");
    expect(user2.name).to.equal("Rocio Schuster");
    expect(user3.name).to.equal("Kelvin Schiller");
  });

  it('should have their currentBookings set to null by default', function() {
    expect(user1.currentBookings).to.equal(null);
    expect(user2.currentBookings).to.equal(null);
    expect(user3.currentBookings).to.equal(null);
  });

  it('should have a unique username', function() {
    expect(user1.username).to.equal('customer1');
    expect(user2.username).to.equal('customer2');
    expect(user3.username).to.equal('customer3');
  });

  it('should have a password', function() {
    expect(user1.password).to.equal('overlook2020');
    expect(user2.password).to.equal('overlook2020');
    expect(user3.password).to.equal('overlook2020');
  });

  it('should be able to retrieve a user\'s first name', function() {
    user1.getFirstName();
    user2.getFirstName();
    user3.getFirstName();

    expect(user1.firstName).to.equal("Leatha");
    expect(user2.firstName).to.equal("Rocio");
    expect(user3.firstName).to.equal("Kelvin");
  })

  it.only('should calculate total spent on all reservations', function() {
    user1.findAllBookings();
    // user1.calculateTotal();
    // user2.calculateTotal();
    // user3.calculateTotal();

    expect(user1.calculateTotal()).to.equal(512.26);
    // expect(user2.firstName).to.equal("Rocio");
    // expect(user3.firstName).to.equal("Kelvin");
  })

  it('should be able to find all bookings', function() {
    user1.findAllBookings();
    // user2.calculateTotal();
    // user3.calculateTotal();

    expect(user1.allBookings).to.deep.equal([{
        id: "5fwrgu4i7k55hl6t8",
        userID: 1,
        date: "2020/02/05",
        roomNumber: 12,
        roomServiceCharges: []
      },
      {
        id: "5fwrgu4i7k55hl7cu",
        userID: 1,
        date: "2020/01/09",
        roomNumber: 5,
        roomServiceCharges: []
      }
    ]);
    // expect(user2.firstName).to.equal("Rocio");
    // expect(user3.firstName).to.equal("Kelvin");
  })



});
