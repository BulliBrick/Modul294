import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KundenverwaltungComponent } from './pages/kundenverwaltung/kundenverwaltung.component';
import { KundenComponent } from './pages/kunden/kunden.component';
import { AuftragComponent } from './pages/auftrag/auftrag.component';
import { RequestsComponent } from './pages/requests/requests.component';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { OAuthModule, AuthConfig, OAuthStorage } from 'angular-oauth2-oidc'; // Import AuthConfig
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpXSRFInterceptor } from './interceptor/http.csrf.interceptor';
import { MatToolbarModule } from '@angular/material/toolbar'; // Import MatToolbarModule
import { AppAuthService } from './service/app.auth.service';
import { MatDialogModule } from '@angular/material/dialog'; // Import MatDialogModule
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { KundenDetailComponent } from './pages/kunden-detail/kunden-detail.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NavbarComponent } from './components/navbar/navbar.component'; // Import MatSnackBarModule
import { MatMenuModule } from '@angular/material/menu';
import { KundenserviceComponent } from './pages/kundenservice/kundenservice.component';
import { AuftragDetailComponent } from './pages/auftrag-detail/auftrag-detail.component';
import { RequestsDetailComponent } from './pages/requests-detail/requests-detail.component'; // Import MatMenuModule
import { KundenserviceDetailComponent } from './pages/kundenservice-detail/kundenservice-detail.component';

export const authConfig: AuthConfig = {
  issuer: 'http://localhost:8080/realms/M295',
  requireHttps: false,
  redirectUri: 'http://localhost:4200', 
  postLogoutRedirectUri: 'http://localhost:4200',
  clientId: 'kundenverwaltung',
  scope: 'openid profile roles offline_access',
  responseType: 'code',
  showDebugInformation: true,
  requestAccessToken: true,
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  silentRefreshTimeout: 500,
  clearHashAfterLogin: true,
};

export function storageFactory(): OAuthStorage {
  return sessionStorage;
}
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}



@NgModule({
  declarations: [
    AppComponent,
    KundenverwaltungComponent,
    KundenComponent,
    AuftragComponent,
    RequestsComponent,
    LoginComponent,
    ConfirmDialogComponent,
    KundenDetailComponent,
    NavbarComponent,
    KundenserviceComponent,
    KundenserviceDetailComponent,
    AuftragDetailComponent,
    RequestsDetailComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    OAuthModule.forRoot({resourceServer: {sendAccessToken: true}}),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MatToolbarModule,
    MatDialogModule,
    MatSnackBarModule,
    MatMenuModule,
    
    
    
  ],
  providers: [
    provideAnimationsAsync(),
    {provide: AuthConfig, useValue: authConfig},
    {provide: HTTP_INTERCEPTORS, useClass: HttpXSRFInterceptor, multi: true},
    {
      provide: OAuthStorage, useFactory: storageFactory
    },
    Location, {provide: LocationStrategy, useClass: PathLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(authService: AppAuthService) {
    authService.initAuth().finally();
  }
}
