import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";

import { AccountService, AlertService } from "../service";

@Component({ templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private accountService: AccountService,
        private alertService: AlertService,
        private formBuilder: FormBuilder
    ){}

    ngOnInit() {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    get f(){ return this.form.controls; }

    onSubmit(){
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        if(this.form.invalid){
            return;
        }

        this.loading = true;

        this.accountService.login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe({
            next: () => {
                const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                this.router.navigateByUrl(returnUrl);
            },
            error: error => {
                this.alertService.error(error);
                this.loading = false;
            }
                                  
        });

    }
}

