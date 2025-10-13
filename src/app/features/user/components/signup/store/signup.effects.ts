// import { inject, Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { SignupService } from '../services/signup.service';
// import { mergeMap, map, catchError, of, withLatestFrom } from 'rxjs';
// import * as SignupActions from './signup.actions';
// import { Store } from '@ngrx/store';
// import { selectBasicData } from './signup.selectors';

// @Injectable()
// export class SignupEffects {
//   private actions$ = inject(Actions);
//   private signupService = inject(SignupService);
//   private store = inject(Store)

//   // basic data
//   submitBasicData$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(SignupActions.submitBasicData),
//       mergeMap(({ basicData }) =>
//         this.signupService.submitBasicData(basicData).pipe(
//           map(() => SignupActions.submitBasicDataSuccess()),
//           catchError((error) => of(SignupActions.submitBasicDataFailure({ error }))),
//         ),
//       ),
//     ),
//   );

//   // --- PASSWORD EFFECT ---
//   submitPassword$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(SignupActions.submitPassword),
//       withLatestFrom(this.store.select(selectBasicData)),
//       mergeMap(([{ password }, basicData]) => {
//         const signupPayload = { ...basicData, password };

//         return this.signupService.completeSignup(signupPayload).pipe(
//           map(() => SignupActions.submitSignupSuccess()),
//           catchError((error) => of(SignupActions.submitSignupFailure({ error }))),
//         );
//       }),
//     ),
//   );
// }
