import {  Routes } from "@angular/router";
import { SignupFormComponent } from "./pages/signup-form/signup-form.component";
import { OtpVarifyComponent } from "./pages/otp-varify/otp-varify.component";


export const signupRoutes: Routes = [
    {
        path: '',
        component: SignupFormComponent
    },
    {
        path: 'varify',
        component: OtpVarifyComponent
    }
]