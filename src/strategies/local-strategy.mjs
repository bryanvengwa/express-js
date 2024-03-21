import passport from 'passport';
import { Strategy } from 'passport-local';
import { mockUsers } from '../utils/constants.mjs';

export default passport.use(
  new Strategy({usernameField:'userName'},(username, password, done) => {
    console.log(`Password : ${password}`)
    console.log(`Username : ${username}}`)
    try {
      const findUser = mockUsers.find((user) => user.userName === username);
      if (!findUser) throw new Error('User not found');
      if (findUser.password !== password)
        throw new Error('Invalid Credentials');
      done(findUser, null);
    } catch (error) {
      done(error, null);
    }
  })
);

console.log('strategy file included')
