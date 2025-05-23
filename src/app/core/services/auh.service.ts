import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuhService {

  constructor( private _HttpClient:HttpClient ) { }
  private readonly _PLATFORM_ID = inject(PLATFORM_ID);
  
  // Variables
  decodedInfo!:any

  register(userData:object):Observable<any>{
    return this._HttpClient.post( `${environment.baseUrl}/api/v1/auth/signup` , userData )
  }
  login(loginUserData:object):Observable<any>{
    return this._HttpClient.post( `${environment.baseUrl}/api/v1/auth/signin` , loginUserData )
  }
  forgetPass( userEmail:object ):Observable<any>{
    return this._HttpClient.post( `${environment.baseUrl}/api/v1/auth/forgotPasswords` , {email:userEmail} )
  }
  
  saveDecodedInfo(){
    if(isPlatformBrowser(this._PLATFORM_ID)){
          if( sessionStorage.getItem('token') ){
          this.decodedInfo = jwtDecode(sessionStorage.getItem('token')!)       
    }
    }
  }
}
