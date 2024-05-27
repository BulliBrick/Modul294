import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KundenComponent } from './pages/kunden/kunden.component';
import { KundenverwaltungComponent } from './pages/kundenverwaltung/kundenverwaltung.component';
import { LoginComponent } from './pages/login/login.component';
import { AuftragComponent } from './pages/auftrag/auftrag.component';
import { RequestsComponent } from './pages/requests/requests.component';

const routes: Routes = [
  {
    path: '', component: KundenverwaltungComponent 
  },
  {
    path: 'kunden', component: KundenComponent, pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent, pathMatch: 'full'
  },
  {
    path: 'auftrag', component: AuftragComponent, pathMatch: 'full'
  },
  {
    path: 'requests', component: RequestsComponent, pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
