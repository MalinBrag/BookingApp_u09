import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { RegisterComponent } from './components/user-components/register/register.component';
import { SignInComponent } from './components/user-components/sign-in/sign-in.component';
import { ProfileComponent } from './components/user-components/profile/profile.component';

import { userAuthGuard } from './core/guards/user-auth.guard';

export const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'sign-in', component: SignInComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [userAuthGuard] },
    
];
