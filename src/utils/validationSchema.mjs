export const createUserValidation = {
  username: {
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage:
        "Username must bt atleast 5 characters or 32 characters long",
    },
    notEmpty: {
      errorMessage: "Username must not be empty",
    },
    isString: {
      errorMessage: "Username must be string",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "Password must not be empty",
    },
  },
  
};
