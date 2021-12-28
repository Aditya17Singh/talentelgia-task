import { createStore } from "redux";

function reducer(state = { isOpen: false }, action) {
  switch (action.type) {
    case "open":
      // console.log(state.isOpen, "opennnn");
      return { ...state, isOpen: true };
    default:
      return { ...state, isOpen: false };
  }
}

let store = createStore(reducer);
export default store;
