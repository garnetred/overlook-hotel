import chai from 'chai';
import UserRepository from '../src/UserRepository';
import userTestData from '../data/users-test-data'
const expect = chai.expect;
import spies from 'chai-spies';
import domUpdates from '../src/domUpdates'
chai.use(spies);


describe('UserRepository', function() {
  let users, username;
  //create variable for date
  chai.spy.on(domUpdates, ['login'], () => true);
  beforeEach(() => {
    users = new UserRepository(userTestData);
    username = 'manager';
  });

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
    users.findUserByName('Kelvin');
    users.findUserByName("Emard");

    expect(users.findUserByName('Leatha Ullrich')).to.deep.equal({
        id: 1,
        name: "Leatha Ullrich"
      });
    expect(users.findUserByName('Kelvin')).to.deep.equal({
      id: 3,
      name: "Kelvin Schiller"
    });

    expect(users.findUserByName('Emard')).to.deep.equal({
        id: 4,
        name: "Kennedi Emard"
      });
    });

});
