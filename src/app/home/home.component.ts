import { Component } from "@angular/core";
import { User } from "../_models";
import { AccountService } from "../service/account.service";

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent{
    user: User;

    constructor(private accountService: AccountService){
        this.user = this.accountService.userValue;
        //console.log(this.user[0].firstname);
    }

}