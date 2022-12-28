import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse  } from "@angular/common/http";
import { throwError, Observable } from "rxjs";
import { catchError } from "rxjs/operators";

import { AlertService } from '../service/alert.service';
import { AccountService } from "../service/account.service";
import { environment } from "src/environments/environment";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
    constructor( private accountService: AccountService , private alertService: AlertService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError((err: HttpErrorResponse) => {
            if([401, 403].includes(err.status) && this.accountService.userValue){
                console.log('ERROR FOUND === inside error inspector');
                this.accountService.logout();
            }
            const error = err.error?.message || err.statusText;
           // this.alertService.error(error);
            return throwError(() => error); 
            //return throwError(() => new Error(error));
        }
            ));
    }
}