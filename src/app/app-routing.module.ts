import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KundenComponent } from './pages/kunden/kunden.component';
import { KundenverwaltungComponent } from './pages/kundenverwaltung/kundenverwaltung.component';
import { LoginComponent } from './login/login.component';
import { AuftragComponent } from './pages/auftrag/auftrag.component';
import { RequestsComponent } from './pages/requests/requests.component';
import { KundenDetailComponent } from './pages/kunden-detail/kunden-detail.component';
import { AppRoles } from './app.roles';
import { appCanActivate } from './guard/app.auth.guard';

const routes: Routes = [
  {
    path: '', component: KundenverwaltungComponent 
  },
  {
    path: 'kunden', component: KundenComponent, pathMatch: 'full', canActivate: [appCanActivate], data: {roles: [AppRoles.Admin]}
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'auftrag', component: AuftragComponent, pathMatch: 'full',canActivate: [appCanActivate], data: {roles: [AppRoles.Admin, AppRoles.User]}
  },
  {
    path: 'requests', component: RequestsComponent, pathMatch: 'full'
  },
  {
    path: 'kunde/:id', component: KundenDetailComponent, pathMatch: 'full',canActivate: [appCanActivate], data: {roles: [AppRoles.Admin]}
  },
  {
    path: 'kunde', component: KundenDetailComponent, pathMatch: 'full' ,canActivate: [appCanActivate], data: {roles: [AppRoles.Admin]}
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
