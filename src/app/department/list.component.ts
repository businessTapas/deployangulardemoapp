import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { DepartmentService } from '../service';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    departments = null;

    constructor(private departmentService: DepartmentService) {}

    ngOnInit() {
        this.departmentService.getAll()
            .pipe(first())
            .subscribe(department => this.departments = department);
    }

    deleteDepartment(id: string) {
        const user = this.departments.find(x => x.id === id);
        user.isDeleting = true;
        this.departmentService.delete(id)
            .pipe(first())
            .subscribe(() => this.departments = this.departments.filter(x => x.id !== id));
    }
}