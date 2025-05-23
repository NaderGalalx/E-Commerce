import { Ibrand } from './../../core/interfaces/ibrand';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit , OnDestroy{
 private readonly _BrandsService = inject(BrandsService)
  // Var
  getBrandsSub!:Subscription
  brandsData!:Ibrand[]

  // Methods
  ngOnInit(): void {
    this.getBrandsSub = this._BrandsService.getBrands().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.brandsData = res.data
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  ngOnDestroy(): void {
    this.getBrandsSub.unsubscribe()
  }
}
