import chai from 'chai';
import Room from '../src/Room';
import roomTestData from '../data/rooms-test-data'
const expect = chai.expect;

describe('See if the tests are running', function() {
  let room1, room2, room3;
  //create variable for date;

  beforeEach(() => {
    room1 = new Room();
    room2 = new Room();
    room3 = new Room();
  });

  it('should be an instance of Room', function() {
    expect(room1).to.be.an.instanceof(Room);
    expect(room2).to.be.an.instanceof(Room);
    expect(room3).to.be.an.instanceof(Room);
  });
});
