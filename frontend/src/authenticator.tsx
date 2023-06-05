
// keeps track of session user data

export const getUser = () => {
  const storedUserString = localStorage.getItem('user');
  if (storedUserString) {
    return JSON.parse(storedUserString);
  } else {
    return {};
  }
}

export const loggedIn = (): boolean => {
  if (localStorage.getItem('sessionToken')) {
    return true
  } 
  return false;
}