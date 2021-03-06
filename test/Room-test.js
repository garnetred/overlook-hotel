import chai from 'chai';
import Room from '../src/Room';
import User from '../src/User';
import roomTestData from '../data/rooms-test-data'
import userTestData from '../data/users-test-data'

const expect = chai.expect;

describe('Room', function() {
  let room1, room2, room3, currentDate, finalDate, user1, user2;

  beforeEach(() => {

    room1 = new Room(roomTestData[0]);
    room2 = new Room(roomTestData[1]);
    room3 = new Room(roomTestData[2]);
    user1 = new User(userTestData[0]);
    user2 = new User(userTestData[1]);
    currentDate = "2020/02/05";
    finalDate = '2020/02/17';
    chai.spy.on(room1, ['createNewBooking'], () => true);
    chai.spy.on(room2, ['createNewBooking'], () => true);
  });


  afterEach(() => {
    chai.spy.restore(room1);
    chai.spy.restore(room2);
  });

  it('should be an instance of Room', function() {
    expect(room1).to.be.an.instanceof(Room);
    expect(room2).to.be.an.instanceof(Room);
    expect(room3).to.be.an.instanceof(Room);
  });

  it('should have a room number', function() {
    expect(room1.number).to.equal(1);
    expect(room2.number).to.equal(2);
    expect(room3.number).to.equal(3);
  });

  it('should have a room type', function() {
    expect(room1.roomType).to.equal('residential suite');
    expect(room2.roomType).to.equal('suite');
    expect(room3.roomType).to.equal('single room');
  });

  it('should indicate whether a room has a bidet', function() {
    expect(room1.bidet).to.equal(true);
    expect(room2.bidet).to.equal(false);
    expect(room3.bidet).to.equal(false);
  });

  it('should indicate the size of the bed', function() {
    expect(room1.bedSize).to.equal('queen');
    expect(room2.bedSize).to.equal('full');
    expect(room3.bedSize).to.equal('king');
  });

  it('should indicate the number of beds in a room', function() {
    expect(room1.numBeds).to.equal(1);
    expect(room2.numBeds).to.equal(2);
    expect(room3.numBeds).to.equal(1);
  });

  it('should indicate the cost per night of a room', function() {
    expect(room1.costPerNight).to.equal(358.4);
    expect(room2.costPerNight).to.equal(477.38);
    expect(room3.costPerNight).to.equal(491.14);
  });


  it('should create a new booking for a particular user and date', function() {

    expect(room1.createNewBooking(user1, currentDate)).to.equal(true);
    expect(room2.createNewBooking(user2, finalDate)).to.equal(true);
  })

});