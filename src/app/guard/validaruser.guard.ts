// import { CanActivateFn } from '@angular/router';

// export const validaruserGuard: CanActivateFn = (route, state) => {
//   return true;
// };
import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, GuardResult, MaybeAsync } from "@angular/router";
import { Observable } from "rxjs";


@Injectable({
  providedIn:'root'
})
export class validaruserGuard implements CanActivate{
 id_user: any;
 constructor( private roueter:Router){}

  canActivate(
              route: ActivatedRouteSnapshot,
             state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
              this.id_user = sessionStorage.getItem('id');
              if (this.id_user == null || this.id_user==""){
                this.roueter.navigate(['login']);
                return false;
              }
              return true;
  }
}