import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user/user.component';
import { PostComponent } from './post/post.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserModule } from './user/user.module';
import { MaterialModule } from './material/material.module';
//import { fakeBackendProvider } from './_helpers/fake-backend';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    UserModule,
    MaterialModule,
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    PostComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    //fakeBackendProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
