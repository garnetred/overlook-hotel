import chai from 'chai';
import User from '../src/User';
import userTestData from '../data/users-test-data'
const expect = chai.expect;

describe('See if the tests are running', function() {
let user1, user2 ,user3;


beforeEach(() => {
  user1 = new User();
  user2 = new User();
  user3 = new User();
});

it('should be an instance of User', function() {
  expect(user1).to.be.an.instanceof(User);
  expect(user2).to.be.an.instanceof(User);
  expect(user3).to.be.an.instanceof(User);
});

});
