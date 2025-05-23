import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../core/services/payment.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{
 private readonly _FormBuilder    = inject(FormBuilder)
 private readonly _PaymentService = inject(PaymentService)
 private readonly _ActivatedRoute = inject(ActivatedRoute)
//  properties
  cartId!:string | null
  loading:boolean = false 
  errors:boolean  = false 

 shippingAddress:FormGroup = this._FormBuilder.group({
  details:[null , Validators.required],
  phone  :[null , Validators.required],
  city   :[null , Validators.required]
 })

 ngOnInit(): void {
   this._ActivatedRoute.paramMap.subscribe({
    next:(param)=>{
      this.cartId = param.get("cart_id")
    }
   })
 }
 payOrder():void{
  if(this.shippingAddress.valid){
    this.loading = true 
    this._PaymentService.payment(this.cartId , this.shippingAddress.value).subscribe({
      next:(res)=>{
        this.loading = false 
        window.open(res.session.url,"_self")     
      },
      error:(err)=>{
        this.loading = false 
        console.log(err);      
      }
    })
  }else{
    this.errors = true
  }
 }

}
