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
chai.spy.on(domUpdates, ['login'], ()=>true);
beforeEach(() => {
  users = new UserRepository(userTestData);
  username = 'manager';
});

it('should be an instance of UserRepository', function() {
  expect(users).to.be.an.instanceof(UserRepository);

});

});
