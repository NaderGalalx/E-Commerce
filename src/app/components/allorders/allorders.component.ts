import { Component, inject, OnInit } from '@angular/core';
import { PaymentService } from '../../core/services/payment.service';
import { AuhService } from '../../core/services/auh.service';
import { Allorders } from '../../core/interfaces/allorders';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css'
})
export class AllordersComponent implements OnInit {
  private readonly _PaymentService = inject(PaymentService)
  private readonly _AuhService = inject(AuhService)

  // Properties
  allOrders!:Allorders[]

  // Methods
  ngOnInit(): void {
    this._AuhService.saveDecodedInfo();
    this._PaymentService.getAllOrders(this._AuhService.decodedInfo.id).subscribe({
      next:(res)=>{
        this.allOrders = res 
        console.log(res);
             
      },
      error:(err)=>{console.log(err);
      }
    })
  }
}
