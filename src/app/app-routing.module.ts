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
import { KundenserviceComponent } from './pages/kundenservice/kundenservice.component';
import { KundenserviceDetailComponent } from './pages/kundenservice-detail/kundenservice-detail.component';
import { RequestsDetailComponent } from './pages/requests-detail/requests-detail.component';
import { AuftragDetailComponent } from './pages/auftrag-detail/auftrag-detail.component';

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
    path: 'auftrage', component: AuftragComponent, pathMatch: 'full',canActivate: [appCanActivate], data: {roles: [AppRoles.Admin, AppRoles.Read]}
  },
  {
    path: 'services', component: KundenserviceComponent, pathMatch: 'full',canActivate: [appCanActivate], data: {roles: [AppRoles.Admin, AppRoles.Read]}
  },
  {
    path: 'service', component: KundenserviceDetailComponent, pathMatch: 'full',canActivate: [appCanActivate], data: {roles: [AppRoles.Admin, AppRoles.Read]}
  },
  {
    path: 'service/:id', component: KundenserviceDetailComponent, pathMatch: 'full',canActivate: [appCanActivate], data: {roles: [AppRoles.Admin, AppRoles.Read]}
  },
  {
    path: 'requests', component: RequestsComponent, pathMatch: 'full'
  },
  {
    path: 'request', component: RequestsDetailComponent, pathMatch: 'full'
  },
  {
    path: 'request/:id', component: RequestsDetailComponent, pathMatch: 'full'
  },
  {
    path: 'kunde/:id', component: KundenDetailComponent, pathMatch: 'full',canActivate: [appCanActivate], data: {roles: [AppRoles.Admin]}
  },
  {
    path: 'kunde', component: KundenDetailComponent, pathMatch: 'full' ,canActivate: [appCanActivate], data: {roles: [AppRoles.Admin]}
  },
  {
    path: 'auftrag', component: AuftragDetailComponent, pathMatch: 'full',canActivate: [appCanActivate], data: {roles: [AppRoles.Admin]}
  },
  {
    path: 'auftrag/:id', component: AuftragDetailComponent, pathMatch: 'full',canActivate: [appCanActivate], data: {roles: [AppRoles.Admin]}
  }
  ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
