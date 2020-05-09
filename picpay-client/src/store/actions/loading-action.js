export const SET_LOADING = 'SET_LOADING';

export const setLoading = isLoading => {
  return {
    type: SET_LOADING,
    payload: isLoading
  };
}