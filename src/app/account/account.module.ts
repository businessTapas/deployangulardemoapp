 import { NgModule } from "@angular/core";
 import { ReactiveFormsModule } from '@angular/forms';
 import { CommonModule } from '@angular/common';
 import { AccountRoutingModule } from "./account-routing.module";
 import { LayoutComponent } from './layout.component';
 import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';

@NgModule({
    declarations: [
        LayoutComponent,
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        AccountRoutingModule,
        ReactiveFormsModule,
        CommonModule
    ]
})

export class AccountModule { }