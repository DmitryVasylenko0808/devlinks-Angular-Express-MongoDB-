import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {LinksService} from "../services/links.service";
import {CanActivateFn, CanDeactivateFn} from "@angular/router";
import {ProfileDetailsPageComponent} from "../pages/profile-details-page/profile-details-page.component";
import {LinksPageComponent} from "../pages/links-page/links-page.component";

@Injectable({
  providedIn: 'root'
})
export class UnsavedChangesGuard {
  constructor(private authService: AuthService,
              private linksService: LinksService) {
  }

  checkUserChanges(component: ProfileDetailsPageComponent): boolean {
    const user = this.authService.getUser();
    const form = component.formModel.value;
    console.log(component.avatarFile, user?.avatarFile);
    if (user?.firstName !== form.firstName || user?.secondName !== form.secondName
        || user?.email !== form.email || component.avatarFile !== `${this.authService.getAvatarSrc()}/${user?.avatarFile}`) {
      if (window.confirm('Save?')) {
        if (component.formModel.valid) {
          component.onSubmit();
          return true;
        } else {
          alert('Invalid data to save changes');
          return false;
        }
      }
    }
    return true;
  }

  checkLinksChanges(component: LinksPageComponent): boolean {
    const links = this.linksService.getLinks();
    const { linksFormItems } = component;

    const equalLinks = () => {
      for(let i = 0; i < links.length; i++) {
        if (links[i].platform !== linksFormItems.value[i].platform
          || links[i].link !== linksFormItems.value[i].link) {
          return false;
        }
      }
      return true;
    }

    if (linksFormItems.value.length !== links.length || !equalLinks()) {
      if (window.confirm('Save changes links?')) {
        if (component.form.valid) {
          component.onSubmit();
          return true;
        } else {
          alert('Invalid data to save changes');
          return false;
        }
      }
    }
    return true;
  }
}
