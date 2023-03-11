import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService, DepartmentService } from '../service';
import { toFormData } from '../_helper/toFormData';
import { MatDialogRef } from '@angular/material/dialog';

@Component({ templateUrl: 'dialog-add-edit.component.html' })
export class AddEditComponent implements OnInit {
    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;
    departments = null;
    private file: File | null = null;
    hide = true;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private departmentService: DepartmentService,
        private alertService: AlertService,
        private _dialogRef: MatDialogRef<AddEditComponent>
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;
        // password not required in edit mode
        const passwordValidators = [Validators.minLength(6)];
        if (this.isAddMode) {
            passwordValidators.push(Validators.required);
        }

        this.form = this.formBuilder.group({
            departmentId: ['', Validators.required],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', passwordValidators],
            image:[]

        });

        this.departmentService.getAll()
        .pipe(first())
        .subscribe(department => this.departments = department);

        if (!this.isAddMode) {
            this.accountService.getById(this.id)
                .pipe(first())
                .subscribe(x => this.form.patchValue(x));
        }
    
}

selectImage(event) {
    if (event.target.files[0]) {
        this.file = event.target.files[0];
       // console.log(this.file);
    }
}

// convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.createUser();
        } else {
            this.updateUser();
        }
    }

    private createUser() {
       // console.log(this.form.value);
       var formdata = toFormData(this.form.value);
            //console.log(formdata);
            if (this.file) {
                formdata.append('imagefile', this.file);
            } else {
                formdata.append('imagefile', '');
            }
            //console.log(formdata);
        this.accountService.register(formdata)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('User added successfully', { keepAfterRouteChange: true });
                    this._dialogRef.close();
                   // this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    private updateUser() {
            var formdata = toFormData(this.form.value);
            //console.log(formdata);
            if (this.file) {
                formdata.append('imagefile', this.file);
            } else {
                formdata.append('imagefile', '');
            }
            //console.log(formdata);
         this.accountService.update(this.id, formdata)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Update successful', { keepAfterRouteChange: true });
                    this._dialogRef.close();
                //    this.router.navigate(['../../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            }); 
    }

    cancelDialog () {
        this._dialogRef.close();
    }
}