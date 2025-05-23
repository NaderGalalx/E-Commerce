import { AuhService } from './../../core/services/auh.service';
import { Subscription } from 'rxjs';
import { Iproduct } from '../../core/interfaces/iproduct';
import { ProductsService } from './../../core/services/products.service';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategory } from '../../core/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule , RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit,OnDestroy {
  constructor( public _ProductsService:ProductsService , private _AuhService:AuhService ){}
  // DI---------------------------
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _CartService       = inject(CartService);
  private readonly _ToastrService     = inject(ToastrService);
  // -----------------------------

  getProductsSub!:Subscription
  catSub!:Subscription

  productsData!: Iproduct[]
  catData!: Icategory[]
  pageNumber:number= 1 ;
  numberOfPages: number[] =[]
  currentPage!:number

  cateLoading:boolean = true
  
  // Carsoul Slider Obj
  cateOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout:2000,
    autoplaySpeed:1500,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }
  mainOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout:2000,
    autoplaySpeed:1500,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: false
  }
  
  //Methods
  getAndDisplayProducts( pageNumber : number){
    this.getProductsSub = this._ProductsService.getProducts(pageNumber).subscribe({
      next:(res)=>{
        this.productsData = res.data.slice(0,10);
        this.currentPage  = res.metadata.currentPage            
        // pages no.
        // Creating an array of pages index
        this.numberOfPages =  Array.from({ length: res.metadata.numberOfPages }, (_, i) => i + 1);
        
        // scrolling behavior
        window.scrollTo({'top': 0 , "behavior": 'smooth'})
      },
      error:(error)=>{
        console.log(error);
        
      }
    })
  }
  ngOnInit(): void {
   this.getAndDisplayProducts( this.pageNumber );
   this.catSub = this._CategoriesService.getCategories().subscribe({
    next:(res)=>{
      this.catData = res.data 
      this.cateLoading = false
    },
    error:(err)=>{console.log(err);
    }
   })
   this._AuhService.saveDecodedInfo()
  }
  ngOnDestroy(): void {
    this.getProductsSub?.unsubscribe()
    this.catSub?.unsubscribe()
  } 
  addToCart(p_id:string){
    this._CartService.addUserCart(p_id).subscribe({
      next:(res)=>{
        this._CartService.cartCount.next(res.numOfCartItems)        
      }
    })
    this._ToastrService.success("Added Successfully","Fresh Cart" ,{closeButton:true});
  }
 
}
