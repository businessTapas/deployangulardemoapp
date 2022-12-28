import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { AccountService } from "../service/account.service";

@Component({ templateUrl: 'layout.component.html'})
export class LayoutComponent{
    constructor( router: Router, accountService: AccountService){
        if(accountService.userValue){
            router.navigate(['/']);
        }
    }
}