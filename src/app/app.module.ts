import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Components
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavBarComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
