import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
//import { HeaderComponent } from './shared/components/header/header.component';
//import { FooterComponent } from './shared/components/footer/footer.component';
import { RegisterComponent } from './components/user-components/register/register.component';

export const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'register', component: RegisterComponent },
    
];
