import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
//import { HeaderComponent } from './shared/components/header/header.component';
//import { FooterComponent } from './shared/components/footer/footer.component';
import { RegisterComponent } from './components/user-components/register/register.component';
import { SignInComponent } from './components/user-components/sign-in/sign-in.component';
import { LogoutComponent } from './components/user-components/logout/logout.component';

export const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'sign-in', component: SignInComponent },
    { path: 'logout', component: LogoutComponent },
];
