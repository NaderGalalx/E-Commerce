import { AuhService } from './../../core/services/auh.service';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Subscription, timeout } from 'rxjs';
import { Icart } from '../../core/interfaces/icart';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit , OnDestroy {
  constructor( private _CartService:CartService ){}
  // DI---------->
  private readonly _ToastrService = inject(ToastrService);
  private readonly _AuhService    = inject(AuhService);
  
  // Property
  userCartSub!:Subscription
  clinetData:Icart | null = null

  showFullTitle:boolean = false

  // Methods
  ngOnInit(): void {
    this._AuhService.saveDecodedInfo();
    this.userCartSub = this._CartService.getUserCart().subscribe({
      next:(res)=>{
        this.clinetData = res.data        
      },
      error:(err)=>{
        console.log(err.message);
      }
    })
  }
  removeCartItem(product_id:string){
    this._ToastrService.success("Removed Successfully" ,"fresh cart", {timeOut:1000})
    this._CartService.removeItem(product_id).subscribe({
      next:(res)=>{
        this.clinetData = res.data
        this._CartService.cartCount.next(res.numOfCartItems)
      },
      error:(err)=>{
        console.log(err.message);
      }
    })
  }
  clearCart(){
    
    this._CartService.clearCart().subscribe({
      next:(res)=>{
        
        window.location.reload();
        console.log( this._AuhService.decodedInfo);
      },
      error:(err)=>{
        console.log(err.message);
      }
    })
  }
  updateCart( p_id:string , count:number ){
    this._CartService.updateCart(p_id , count).subscribe({
      next:(res)=>{
        this.clinetData = res.data
        this._ToastrService.success("Updated successfully");  
      },
      error:(err)=>{
        console.log(err.message);
      }
    })
  }
  ngOnDestroy(): void {
    this.userCartSub.unsubscribe()
  }
  showFullTitleMethod(){
    this.showFullTitle = !this.showFullTitle    
  }
}
