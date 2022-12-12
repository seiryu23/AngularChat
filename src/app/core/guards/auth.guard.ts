import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';

@Injectable
(
  {
    providedIn: 'root'
  }
)

export class AuthGuard implements CanActivate
{
  constructor
  (
    private afAuth: AngularFireAuth,
    private router: Router
  )
  {
  }

  canActivate
  (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    return this.afAuth.authState.pipe
    (
      map
      (
        (user : firebase.default.User | null) =>
        {
          if(!user)
          {
            return true;
          }
          else
          {
            return this.router.parseUrl('/');
          }
        }
      )
    );
  }
}
