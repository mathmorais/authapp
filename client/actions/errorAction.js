const setError = () => {
  return { type: "SET_ERROR" };
};
const removeError = () => {
  return { type: "REMOVE_ERROR" };
};

export { setError, removeError };
