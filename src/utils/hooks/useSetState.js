import { useReducer } from 'react';

const reducer = (prevState, updatedProperty) => ({
  ...prevState,
  ...updatedProperty,
});

export default function useSetState(initialState = {}) {
  return useReducer(reducer, initialState);
}
