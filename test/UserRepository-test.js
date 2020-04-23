import chai from 'chai';
import UserRepository from '../src/UserRepository';
import User from '../src/User';
import userTestData from '../data/users-test-data'
const expect = chai.expect;
import spies from 'chai-spies';
import domUpdates from '../src/domUpdates'
chai.use(spies);


describe('UserRepository', function() {
  let users, currentDate;
  let foundUser;


  beforeEach(() => {
    users = new UserRepository(userTestData);
    foundUser = new User(userTestData[0]);
    currentDate = '2020/02/05';
    chai.spy.on(foundUser, ['findPastBookings', 'findCurrentBookings',
      'findFutureBookings'
    ], () => true);
    chai.spy.on(setTimeout, ['domUpdates.displayGuestsByNameAndDate'], () => true);

  });

  afterEach(() => {
    chai.spy.restore(domUpdates);
    chai.spy.restore(foundUser);
  })

  it('should be an instance of UserRepository', function() {
    expect(users).to.be.an.instanceof(UserRepository);

  });

  it('should hold all users', function() {
    expect(users.allUsers).to.deep.equal([{
        id: 1,
        name: "Leatha Ullrich",
      },
      {
        id: 2,
        name: "Rocio Schuster"
      },
      {
        id: 3,
        name: "Kelvin Schiller"
      },
      {
        id: 4,
        name: "Kennedi Emard"
      },
      {
        id: 5,
        name: "Rhiannon Little"
      },
      {
        id: 6,
        name: "Jimmy Kimmel"
      }
    ]);

  });

  it('should be able to find a specific user by their name', function() {

    expect(users.findUserByName('Leatha Ullrich', currentDate)).to.deep.equal({
      id: 1,
      name: "Leatha Ullrich"
    });
    expect(users.findUserByName('Kelvin', currentDate)).to.deep.equal({
      id: 3,
      name: "Kelvin Schiller"
    });

    expect(users.findUserByName('Emard', currentDate)).to.deep.equal({
      id: 4,

      name: "Kennedi Emard"
    });
    expect(foundUser.findPastBookings(currentDate)).to.have.been.called(3);
    expect(foundUser.findCurrentBookings).to.have.been.called(3);
    expect(foundUser.findFutureBookings).to.have.been.called(3);
    expect(foundUser.findPastBookings).to.equal(true);
    expect(foundUser.findCurrentBookings).to.equal(true);
    expect(foundUser.findFutureBookings).to.equal(true);
  });
});