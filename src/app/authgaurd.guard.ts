import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthService } from './service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthgaurdGuard implements CanActivate {
  constructor(private authservice: AuthService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // return this.authservice.login().pipe(
    //   take(1),
    //   map((s) => {
    //     if (!s) {
    //       this.router.navigate(['/']);
    //       return false;
    //     } else {
    //       return true;
    //     }
    //   })
    // );
    const user: any = localStorage.getItem('logged');
    const currentUser = JSON.parse(user);
    if (currentUser) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
