import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { RegisterComponent } from './components/user-components/register/register.component';
import { SignInComponent } from './components/user-components/sign-in/sign-in.component';
import { ProfileComponent } from './components/user-components/profile/profile.component';
import { AdminDashboardComponent } from './components/admin-components/admin-dashboard/admin-dashboard.component';
import { ManageUsersComponent } from './components/admin-components/manage-users/manage-users.component';
import { EditComponent } from './components/user-components/edit/edit.component';
import { DeleteComponent } from './components/user-components/delete/delete.component';

import { UserAuthGuard } from './core/guards/user-auth.guard';
import { AdminAuthGuard } from './core/guards/admin-auth.guard';

export const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'sign-in', component: SignInComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [UserAuthGuard] },
    { path: 'dashboard', component: AdminDashboardComponent, canActivate: [AdminAuthGuard] },
    { path: 'manage', component: ManageUsersComponent, canActivate: [AdminAuthGuard] },
    { path: 'edit/:id', component: EditComponent, canActivate: [AdminAuthGuard] },
    { path: 'delete/:id', component: DeleteComponent, canActivate: [AdminAuthGuard] },
];
