export const createUserValidationSchema = {
  userName: {
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage:
        'username must be at least 6 characters long and not more than 32 characters long',
    },
  },
  notEmpty: {
    errorMessage: 'username cannot be empty',
  },
  isString: {
    errorMessage: 'username must be a string',
  },
  displayName:{
    notEmpty:true,
  }
};
