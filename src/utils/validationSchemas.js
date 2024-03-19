export const createUserValidationSchema = {
  userName: {
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage: 'username should be between 5-10 messages',
    },
  },
  notEmpty: true,
  isString: true,
};
