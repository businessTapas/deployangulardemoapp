import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { AccountService } from "../service/account.service";

@Component({ 
    templateUrl: 'layout.component.html',
    styleUrls: ['../app.component.css']
})
export class LayoutComponent{
    constructor( router: Router, accountService: AccountService){
        if(accountService.userValue){
            router.navigate(['/']);
        }
    }
}