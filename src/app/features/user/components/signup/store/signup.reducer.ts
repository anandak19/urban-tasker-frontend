// import { createReducer, on } from '@ngrx/store';
// import { initialState } from './signup.store';
// import * as SignupActions from './signup.actions';

// export const signupReducer = createReducer(
//   initialState,

//   // basic data
//   on(SignupActions.submitBasicData, (state, { basicData }) => ({
//     ...state,
//     loading: true,
//     basicData,
//     error: null,
//   })),

//   on(SignupActions.submitBasicDataSuccess, (state) => ({
//     ...state,
//     loading: false,
//   })),

//   on(SignupActions.submitBasicDataFailure, (state, { error }) => ({
//     ...state,
//     loading: false,
//     error,
//   })),

//   // --- PASSWORD ---
//   on(SignupActions.submitPassword, (state, { password }) => ({
//     ...state,
//     loading: true,
//     password,
//     error: null,
//   })),

//   on(SignupActions.submitPasswordSuccess, (state) => ({
//     ...state,
//     loading: false,
//   })),

//   on(SignupActions.submitPasswordFailure, (state, { error }) => ({
//     ...state,
//     loading: false,
//     error,
//   })),

//   // --- COMPLETE SIGNUP ---
//   on(SignupActions.submitSignup, (state) => ({
//     ...state,
//     loading: true,
//     error: null,
//   })),

//   on(SignupActions.submitSignupSuccess, (state) => ({
//     ...state,
//     loading: false,
//   })),

//   on(SignupActions.submitSignupFailure, (state, { error }) => ({
//     ...state,
//     loading: false,
//     error,
//   })),
// );
