import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { Observable } from "rxjs";

import { AccountService } from "../service/account.service";
import { environment } from "src/environments/environment";

@Injectable()
export class JwtInterceptor implements HttpInterceptor{
    constructor( private accountService: AccountService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('inside-->'+' ====== jwt interseptor');
        const user = this.accountService.userValue;
        const isLoggedIn = user && user[0].token;
        const isApiUrl = req.url.startsWith(environment.apiUrl);
        if( isLoggedIn && isApiUrl ){
            console.log('token created-->'+user[0].token);
            req = req.clone({
                setHeaders:{
                    Authorization: `Bearer ${user[0].token}`
                } 
            });
        }
        return next.handle(req);        
    }
}