import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, pipe } from "rxjs";
import { environment } from "src/environments/environment";
import { map } from "rxjs";
import { Department } from "../_models/department";

@Injectable({ providedIn: "root" })
export class DepartmentService {
    private departmentSubject: BehaviorSubject<Department>;
    public  department: Observable<Department>;

    constructor(private router: Router, private http: HttpClient){
       
    }
    
    create(params){
        return this.http.post(`${environment.apiUrl}/department/create`,params);
    }

    getAll() {
        return this.http.get<Department[]>(`${environment.apiUrl}/department`);
    }

    getById(id: string) {
        return this.http.get<Department>(`${environment.apiUrl}/department/${id}`);
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/department/${id}`, params)
            .pipe(map(x => {
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/department/${id}`)
            .pipe(map(x => {
                return x;
            }));
    }
}
