import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private _HttpClient:HttpClient) { }

  clientToken:any = { token : sessionStorage.getItem("token") }

  payment(cartId:string | null , shippingData:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=${environment.url}`,
      {
        shippingAddress : shippingData
      },
    {
      headers : this.clientToken
    })
  }
  getAllOrders(user_id:string | null):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/orders/user/${user_id}`)
  }
}
