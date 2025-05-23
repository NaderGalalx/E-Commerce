import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Iproduct } from '../../core/interfaces/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [ CarouselModule ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit,OnDestroy {
  constructor( private _ProductsService:ProductsService , private _ActivatedRoute:ActivatedRoute ){}
  private readonly _CartService= inject(CartService)

  //Var
  productData!:Iproduct
  productID!:string|null
  productDeailsSub!:Subscription

  // Owl Slider
    Slider: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: false,
      pullDrag: false,
      autoplay:false,
      autoplayTimeout:2000,
      autoplaySpeed:1500,
      dots: true,
      navSpeed: 700,
      navText: ['', ''],
      items:1,
      nav: false
    }

  // METHODS

  addToCart(p_id:string){
    this._CartService.addUserCart(p_id).subscribe({
      next:(res)=>{this._CartService.cartCount.next(res.numOfCartItems)},
      error:(err)=>{return false}
    })
  }

  ngOnInit(): void {

    this._ActivatedRoute.paramMap.subscribe({
      next:(pInfo)=>{         
        this.productID = pInfo.get("p_id") }
    })

    this.productDeailsSub = this._ProductsService.getProductDetails(this.productID).subscribe({
      next:(res)=>{ 
        this.productData = res.data
      },
      error:(err)=>{ console.log(err);
       }
    })

  }

  ngOnDestroy(): void {
    this.productDeailsSub.unsubscribe()
  }
}
