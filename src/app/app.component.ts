import { Component } from '@angular/core';
import { User } from "./_models/user";
import { AccountService } from "./service/account.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-10-registration-login';
  user: User;

  constructor( private accountService: AccountService){
    accountService.user.subscribe( x => this.user = x );
  }
  
  logout(){
    this.accountService.logout();
}
}
