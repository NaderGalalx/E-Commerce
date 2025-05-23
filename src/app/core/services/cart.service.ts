import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public clientToken:any
  private readonly _PLATFORM_ID = inject(PLATFORM_ID);

  constructor( private _HttpClient:HttpClient ) { 

    if(isPlatformBrowser(this._PLATFORM_ID)) {
      this.clientToken = { token : sessionStorage.getItem("token") }
      
    }
  }
  
  // proprty to be global --->
  cartCount:BehaviorSubject<number> = new BehaviorSubject(0) 

  // Properties
  getUserCart():Observable<any>{
    return this._HttpClient.get( `${environment.baseUrl}/api/v1/cart` , { headers  : this.clientToken } )
  }
  addUserCart( product_id:string ):Observable<any>{
    return this._HttpClient.post( `${environment.baseUrl}/api/v1/cart` , { "productId":product_id} , { headers : this.clientToken } )
  }
  removeItem( product_id:string ):Observable<any>{
    return this._HttpClient.delete( `${environment.baseUrl}/api/v1/cart/${product_id}` , { headers : this.clientToken } )
  }
  clearCart():Observable<any>{
    return this._HttpClient.delete( `${environment.baseUrl}/api/v1/cart` , { headers : this.clientToken } )
  }
  updateCart( product_id:string , p_count:number ):Observable<any>{
    return this._HttpClient.put( `${environment.baseUrl}/api/v1/cart/${product_id}`, {'count': p_count } ,{ headers : this.clientToken } )
  }
}
