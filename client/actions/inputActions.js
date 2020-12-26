const nameAction = (value) => {
  return { type: "SET_NAME", payload: value };
};
const emailAction = (value) => {
  return { type: "SET_EMAIL", payload: value };
};
const passwordAction = (value) => {
  return { type: "SET_PASSWORD", payload: value };
};
const makeRequest = () => {
  return { type: "MAKE" };
};
const resetRequestState = () => {
  return { type: "RESET" };
};

export {
  nameAction,
  emailAction,
  passwordAction,
  makeRequest,
  resetRequestState,
};
