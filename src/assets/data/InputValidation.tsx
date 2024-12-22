// export const validateName = (text: any) => {
//     if (text.trim() === '') {
//       return 'Name is required.';
//     }
//   };

//   export const validateEmail = (email: any) => {
//     if (!email) {
//       return 'Email is required.';
//     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
//       return 'Email is invalid.';
//     }
//     return null;
//   };

//   export const validatePassword = (password: any) => {
//     if (!password) {
//       password = 'Password is required.';
//       return password;
//     }
//   };
//   export const validatePasswordSignUp = (password: any, key: any) => {
//     if (!password && !key) {
//       password = 'Password is required.';
//       return password;
//     }
//     if (password && !key && password.length < 8) {
//       password = 'Password must be at least 8 characters.';
//       return password;
//     }
//     if (key && password !== key) {
//       password = 'Password mismatch.';
//       return password;
//     }
//     return null;
//   };

//   export const validateDob = (text: any) => {
//     if (text) {
//       console.log('text', text);
//       return 'Dob is required';
//     }
//   };

//   export const validatePassport = (text: any) => {
//     if (!text) {
//       return 'NationalID or Passport id is required';
//     }
//   };
//   export const validateEmpId = (text: any) => {
//     if (!text) {
//       return 'Employ ID or Passport id is required';
//     }
//   };
//   export const validatePhone = (text: any) => {
//     if (!text) {
//       return 'Phone No is required';
//     }
//   };

export const validateField = (fieldName: any, value: any) => {
  switch (fieldName) {
    case 'email':
      if (!value) {
        return 'Email is required.';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return 'Email is invalid.';
      }
      return 'true';
    case 'recoveryKey':
      if (!value) {
        return 'Code is required.';
      } else if (value.length < 6) {
        return 'key should be at least 6 characters.';
      }
      return 'true';
    case 'newPassword':
      if (!value) {
        return 'Password is required.';
      } else if (value.length < 6) {
        return 'Password should be at least 6 characters.';
      }
      return 'true';
    case 'password':
      if (!value) {
        return 'Password is required.';
      } else if (value.length < 6) {
        return 'Password should be at least 6 characters.';
      }
      return 'true';
    case 'passworda':
      if (!value) {
        return 'Password is required.';
      }
      return 'true';
    case 'confirmPassword':
      if (!value) {
        return 'Password is required.';
      }
      return 'true';
    case 'userName':
      if (!value) {
        return 'Username is required.';
      } else if (
        !/^(?!.*[&=_'\-+,.<>])(?=^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$).{3,20}$/i.test(
          value,
        )
      ) {
        return 'Invalid Username.';
      }

      return 'true';
    case 'name':
      if (!value) {
        return 'Name is required.';
      }
      return 'true';
    case 'nickName':
      if (!value) {
        return 'Nick name is required.';
      }
      return 'true';
    case 'phoneNumber':
      if (!value || value.length < 8) {
        return 'Phone Number is required.';
      }
      return 'true';
    case 'description':
      if (!value || value.length < 3) {
        return 'description should be more than 3 characters long.';
      }
      return 'true';
    case 'location':
      if (!value || value.length < 5) {
        return 'please type valid city...';
      }
      return 'true';
    default:
      return null;
  }
};

export function FirebaseError(error: any) {
  console.log('Function Firebase Error', error);

  let errorMessage = '';
  switch (error.code) {
    case 'auth/invalid-email':
      errorMessage = 'Incorrect Credential';
      break;
    case 'auth/wrong-password':
      errorMessage = 'Incorrect Credential';
      break;
    case 'auth/user-not-found':
      errorMessage = 'User not found.';
      break;
    case 'auth/email-already-in-use':
      errorMessage = 'Email is already in use.';
      break;
    case 'auth/weak-password':
      errorMessage = 'Password is too weak.';
      break;
    case 'auth/too-many-requests':
      errorMessage = 'Too many sign-in attempts. Try again later.';
      break;
    case 'auth/network-request-failed':
      errorMessage = 'Network error. Please check your internet connection.';
      break;
    case 'auth/user-disabled':
      errorMessage = 'Your account has been disabled. Please contact support.';
      break;
    case 'auth/invalid-credential':
      errorMessage = 'Incorrect Credential';
      break;
    default:
      errorMessage = 'An error occurred. Please try again later.' + error.code;
      break;
  }
  return errorMessage;
}
