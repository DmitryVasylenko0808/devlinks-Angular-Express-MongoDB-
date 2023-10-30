import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthLayoutComponent } from './pages/layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './pages/layouts/main-layout/main-layout.component';
import { LinksPageComponent } from './pages/links-page/links-page.component';
import { ProfileDetailsPageComponent } from './pages/profile-details-page/profile-details-page.component';
import { PreviewPageComponent } from './pages/preview-page/preview-page.component';
import { PhoneSideComponent } from './components/phone-side/phone-side.component';
import { UserContentComponent } from './components/user-content/user-content.component';
import { LinkItemComponent } from './components/link-item/link-item.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    RegisterPageComponent,
    LoginPageComponent,
    AuthLayoutComponent,
    MainLayoutComponent,
    LinksPageComponent,
    ProfileDetailsPageComponent,
    PreviewPageComponent,
    PhoneSideComponent,
    UserContentComponent,
    LinkItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
