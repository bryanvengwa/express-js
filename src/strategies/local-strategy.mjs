import passport from 'passport';
import { Strategy } from 'passport-local';
import { mockUsers } from '../utils/constants.mjs';

passport.use(
  new Strategy((userName, password, done) => {
    try {
      const findUser = mockUsers.find((user) => userName === userName);
      if (!findUser) throw new Error('User not found');
      if (findUser.password !== password)
        throw new Error('Invalid Credentials');
      done(findUser, null);
    } catch (error) {
      done(error, null);
    }
  })
);
