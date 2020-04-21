import chai from 'chai';
const expect = chai.expect;
import spies from 'chai-spies';

import User from '../src/User';
import userTestData from '../data/users-test-data'
import domUpdates from '../src/domUpdates'
import bookingTestData from '../data/bookings-test-data'
import roomTestData from '../data/rooms-test-data'

chai.use(spies);

describe('User', function() {
  let user1, user2, user3, user4, user6;
  let currentDate;

  beforeEach(() => {
    user1 = new User(userTestData[0]);
    user2 = new User(userTestData[1]);
    user3 = new User(userTestData[2]);
    user4 = new User(userTestData[3]);
    user6 = new User(userTestData[5])
    currentDate = "2020/02/05";
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

  it('should calculate total spent on all reservations', function() {

    expect(user1.calculateTotal()).to.equal(512.26);
    expect(user2.calculateTotal()).to.equal(1132.34);
    expect(user3.calculateTotal()).to.equal(1063.68);
    expect(user6.calculateTotal()).to.equal(0);
  })

  it('should be able to find all bookings', function() {
    user1.findAllBookings();
    user2.findAllBookings();
    user3.findAllBookings();

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

  })

  it('should be able to find all rooms in which a user has stayed', function() {
    user1.findAllRooms();

    expect(user1.allRooms).to.deep.equal([{
        number: 5,
        roomType: "single room",
        bidet: true,
        bedSize: "queen",
        numBeds: 2,
        costPerNight: 340.17
      },
      {
        number: 12,
        roomType: "single room",
        bidet: false,
        bedSize: "twin",
        numBeds: 2,
        costPerNight: 172.09
      }
    ])
  })

  it('should be able to find all current bookings for today\'s date', function() {
    user1.findCurrentBookings(currentDate);
    user4.findCurrentBookings(currentDate);

    expect(user1.currentBookings).to.deep.equal([{
      id: "5fwrgu4i7k55hl6t8",
      userID: 1,
      date: "2020/02/05",
      roomNumber: 12,
      roomServiceCharges: []
    }])

    expect(user4.currentBookings).to.deep.equal([{
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
    ])
  })

  it('should be able to find all past bookings', function() {
    expect(user1.findPastBookings(currentDate)).to.deep.equal([{
      id: "5fwrgu4i7k55hl7cu",
      userID: 1,
      date: "2020/01/09",
      roomNumber: 5,
      roomServiceCharges: []
    }])

    expect(user4.findPastBookings(currentDate)).to.deep.equal([{
        id: "5fwrgu4i7k55hl6vc",
        userID: 4,
        date: "2020/01/18",
        roomNumber: 18,
        roomServiceCharges: []
      }
    ])
  })

  it('should be able to find all future bookings', function() {
    expect(user3.findFutureBookings(currentDate)).to.deep.equal([  {
        id: "5fwrgu4i7k55hl6v3",
        userID: 3,
        date: "2020/02/07",
        roomNumber: 23,
        roomServiceCharges: []
      },
      {
        id: "5fwrgu4i7k55hl72u",
        userID: 3,
        date: "2020/02/17",
        roomNumber: 4,
        roomServiceCharges: []
      }
    ])

    expect(user4.findFutureBookings(currentDate)).to.deep.equal([{
        id: "5fwrgu4i7k55hl7cd",
        userID: 4,
        date: "2020/02/07",
        roomNumber: 5,
        roomServiceCharges: []
      },
      {
        id: "5fwrgu4i7k55hl6vn",
        userID: 4,
        date: "2020/02/20",
        roomNumber: 1,
        roomServiceCharges: []
      }
    ])
  })



});
