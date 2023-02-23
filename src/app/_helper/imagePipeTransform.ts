import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Pipe, PipeTransform} from '@angular/core';
import { AccountService } from "../service/account.service";
import { JwtInterceptor, ErrorInterceptor } from '../_helper';
//import { Injectable } from "@angular/core";

@Pipe({
    name: 'authImage'
  })
  //@Injectable({ providedIn: "root" })
  export class AuthImagePipe implements PipeTransform {
  
    constructor(
      private http: HttpClient, private accountService: AccountService, private jwt: JwtInterceptor
    ) {}
  
    async transform(src: string): Promise<string> {
      //  try {
        const user = this.accountService.userValue;
        const headers = new HttpHeaders({'Authorization': `Bearer ${user.token}`});

        const imageBlob = await this.http.get(src, {headers, responseType: 'blob'}).toPromise();
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(imageBlob);
        });
   /*  } catch {

    } */
      }
  
  }