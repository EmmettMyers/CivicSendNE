let loggedIn: boolean = false;

export const isLoggedIn = ():boolean => {
  return loggedIn;
}

export const setLoggedIn = (newLoggedIn: boolean):void => {
  loggedIn = newLoggedIn;
}

export const checkLoggedIn = ():void => {
    // fetch loggedIn variable from mongo database (assuming db value is false here)
    loggedIn = false;
}