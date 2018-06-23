import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/security/login/login.component';
import { ModuleWithProviders } from '@angular/core';
import { AuthService } from './services/auth.service';
import { AdminComponent } from './component/admin/admin.component';

export const ROUTES: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'admin', component: AdminComponent},
    {path: '', component: HomeComponent, canActivate: [AuthService]}
]

export const routes: ModuleWithProviders = RouterModule.forRoot(ROUTES);