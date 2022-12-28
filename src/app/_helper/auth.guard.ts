import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

import { AccountService } from "../service/account.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate{
    constructor( private router: Router, private accountService: AccountService){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const user = this.accountService.userValue;
        if(user){
            return true;
        }else{
            this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url }});
            return false;
        }
    }
    
}