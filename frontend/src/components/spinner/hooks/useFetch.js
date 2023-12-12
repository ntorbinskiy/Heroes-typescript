const useFetch = (func, action, payload = null, args) => {
  return (func = () => {
    return {
      type: action,
      payload: args,
    };
  });
};

export default useFetch;
