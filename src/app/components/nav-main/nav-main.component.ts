import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-main',
  standalone: true,
  imports: [RouterLink , RouterLinkActive],
  templateUrl: './nav-main.component.html',
  styleUrl: './nav-main.component.css'
})
export class NavMainComponent implements OnInit ,OnDestroy {
  constructor( private _Router:Router , private _CartService:CartService ){}

  subCount!:Subscription
  cartConut!:number 

  ngOnInit(): void {
    this._CartService.getUserCart().subscribe({
      next:(res)=>{
        this.cartConut = res.numOfCartItems
      }
    })

    this.subCount = this._CartService.cartCount.subscribe({
      next:(value)=>{
        this.cartConut = value ;          
      }
    })     
  }
  ngOnDestroy(): void {
    this.subCount.unsubscribe()
  }
  logout():void{
    sessionStorage.removeItem("token")
    this._Router.navigate(["/auth/login"])
  }

}
