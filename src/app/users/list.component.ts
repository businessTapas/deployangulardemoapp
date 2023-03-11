import { Component, OnInit, ViewChild } from '@angular/core';
import { map, first } from 'rxjs/operators';

import { AccountService } from '../service';
import { environment } from "src/environments/environment";
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddEditComponent } from './add-edit.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({ templateUrl: 'list.component.html'})
export class ListComponent implements OnInit {
    users = null;
    displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

    constructor(private accountService: AccountService, public dialog: MatDialog) {}

    ngOnInit() {
        this.accountService.getAll()
            .pipe(map((res) => {
                const source = { departmentId: { departmentname: '' }};
                for ( const key in res) {
                    if ('imagefile' in res[key] == true && res[key].imagefile != '') {
                    res[key].imagefile = `${environment.apiUrl}/`+res[key].imagefile;
                    }
                    if ('departmentId' in res[key] !== true) {      // ( in or hasOwnProperty )
                        Object.assign(res[key], source);
                    }
                }
            //    console.log(res)
                return res;
            }))
            .subscribe(users => this.users = users);
    }

    deleteUser(id: string) {
        const user = this.users.find(x => x.id === id);
        user.isDeleting = true;
        this.accountService.delete(id)
            .pipe(first())
            .subscribe(() => this.users = this.users.filter(x => x.id !== id));
    }

    openDialog() {
        this.dialog.open(AddEditComponent, {
          width: "40%"
        });
      }
}