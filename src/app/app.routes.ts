import { LoginGuard } from './helpers/login.guard.service';
import { ErrorsComponent } from './errors/errors.component';
import { AdminGuard } from './helpers/admin.guard.service';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
    { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
    { path: 'denied', component: ErrorsComponent, data: {code: 401, message: 'access denied!'} },
    { path: 'notfound', component: ErrorsComponent, data: {code: 404, message: 'page can\'t be found!'} },
    { path: '**', redirectTo: '/notfound' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRouter {}
