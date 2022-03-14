import React from "react";
const initialState = {
  visible: false,
  ComponentContentDrawer: <p>Default content</p>,
  callBackSubmit: () => {
    alert("click demo");
  },
  title: {},
};

export const DrawerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_DRAWER":
      return { ...state, visible: true };
    case "CLOSE_DRAWER":
      return { ...state, visible: false };
    case "OPEN_FORM_EDIT_PROJECT": {
      state.title = action.title;
      return {
        ...state,
        visible: true,
        ComponentContentDrawer: action.Component,
      };
    }
    case "SET_SUBMIT_EDIT_PROJECT": {
      state.callBackSubmit = action.submitFunction;
      return { ...state };
    }
    case "OPEN_FORM_CREATE_TASK": {
      state.visible = true;
      state.title = action.title;
      state.ComponentContentDrawer = action.ComponentContentDrawer;
      return { ...state };
    }
    case "SET_SUBMIT_CREATE_TASK": {
      return { ...state, callBackSubmit: action.callBackSubmit };
    }
    case "SET_SUBMIT_EDIT_USER": {
      state.callBackSubmit = action.callBackSubmit;
      return { ...state };
    }
    case "OPEN_FORM_EDIT_USER": {
      return {
        ...state,
        visible: true,
        title: "Edit User",
        ComponentContentDrawer: action.ComponentContentDrawer,
        callBackSubmit: action.callBackSubmit,
      };
    }
    default:
      return state;
  }
};
