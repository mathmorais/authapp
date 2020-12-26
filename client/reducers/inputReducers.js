function nameFieldReducer(state = "", action) {
  switch (action.type) {
    case "SET_NAME":
      return (state = action.payload);
    default:
      return state;
  }
}
function emailFieldReducer(state = "", action) {
  switch (action.type) {
    case "SET_EMAIL":
      return (state = action.payload);
    default:
      return state;
  }
}
function passwordFieldReducer(state = "", action) {
  switch (action.type) {
    case "SET_PASSWORD":
      return (state = action.payload);
    default:
      return state;
  }
}
function makeARequest(state = false, action) {
  switch (action.type) {
    case "MAKE":
      return (state = true);
    case "RESET":
      return (state = false);
    default:
      return state;
  }
}

export {
  nameFieldReducer,
  emailFieldReducer,
  passwordFieldReducer,
  makeARequest,
};
