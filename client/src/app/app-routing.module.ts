import {inject, NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainLayoutComponent} from "./pages/layouts/main-layout/main-layout.component";
import {LinksPageComponent} from "./pages/links-page/links-page.component";
import {ProfileDetailsPageComponent} from "./pages/profile-details-page/profile-details-page.component";
import {PreviewPageComponent} from "./pages/preview-page/preview-page.component";
import {AuthLayoutComponent} from "./pages/layouts/auth-layout/auth-layout.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {RegisterPageComponent} from "./pages/register-page/register-page.component";
import {canActivatePreview, canActivateProfileDetails} from "./classes/AuthGuard";
import {UnsavedChangesGuard} from "./classes/UnsavedChangesGuard";

const routes: Routes = [
  {
    path: 'auth', component: AuthLayoutComponent, children: [
      { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
      { path: 'login', component: LoginPageComponent },
      { path: 'register', component: RegisterPageComponent }
    ]
  },
  {
    path: '', component: MainLayoutComponent, children: [
      { path: '', redirectTo: '/links', pathMatch: 'full' },
      { path: 'links',
        component: LinksPageComponent,
        canDeactivate: [(component: LinksPageComponent) => inject(UnsavedChangesGuard).checkLinksChanges(component)]
      },
      { path: 'profile-details',
        component: ProfileDetailsPageComponent,
        canActivate: [canActivateProfileDetails],
        canDeactivate: [(component: ProfileDetailsPageComponent) => inject(UnsavedChangesGuard).checkUserChanges(component)]
      }
    ]
  },
  { path: 'preview', component: PreviewPageComponent, canActivate: [canActivatePreview] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
