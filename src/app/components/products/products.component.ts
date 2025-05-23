import { Subscription } from 'rxjs';
import { Iproduct } from '../../core/interfaces/iproduct';
import { ProductsService } from './../../core/services/products.service';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ RouterLink , FormsModule ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit , OnDestroy {
  constructor( private _ProductsService:ProductsService , private _CartService:CartService ){}
  // DI----------->
  private readonly _ToastrService = inject(ToastrService);
  
  // Var
  getProductsSub!:Subscription

  productsData!: Iproduct[]
  filterdData!: Iproduct[]
  searchItem!:string
  pageNumber:number = 1
  pagesNo!:number
  currentPage!:number

  placeholderArr:any[] = Array.from({length:40},(_,i)=>{i++})
  
  

  // Methods

  getAndDisplayProducts( pageNumber : number){
    this.getProductsSub = this._ProductsService.getProducts(pageNumber).subscribe({
      next:(res)=>{
        this.productsData = res.data;        
        this.pagesNo      = res.metadata.numberOfPages
        this.currentPage  = res.metadata.currentPage

        // scrolling behavior
        window.scrollTo({'top': 0 , "behavior": 'smooth'})
      },
      error:(error)=>{
        console.log(error);
        
      }
    })
  }

  addToCart(p_id:string){
    this._ToastrService.success("Added successfully","fresh cart",{closeButton:true})
    this._CartService.addUserCart(p_id).subscribe({
      next:(res)=>{
        this._CartService.cartCount.next(res.numOfCartItems)
      }
    })
  }

  ngOnInit(): void {
    this.getAndDisplayProducts( this.pageNumber )
  }
  searchProducts(){
    this.filterdData = this.productsData.filter(product=>
      product.title.toLowerCase().includes(this.searchItem.toLowerCase())
    );
    console.log(this.filterdData);  
  }
  emptySearch(){
    this.searchItem = "";
  }

  ngOnDestroy(): void {
    this.getProductsSub.unsubscribe()
  }
}
