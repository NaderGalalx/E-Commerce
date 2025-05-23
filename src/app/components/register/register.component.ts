import { AuhService } from './../../core/services/auh.service';
import { NgClass } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ ReactiveFormsModule , NgClass ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnDestroy {
  constructor( private _AuhService:AuhService , private _Router:Router ){}
  
  loading:boolean = false
  resText!:String
  registerSub!:Subscription
  
  // form
  
  registerForm:FormGroup = new FormGroup({
    name       : new FormControl(null , [Validators.required , Validators.minLength(2)]),
    email      : new FormControl(null , [Validators.required , Validators.email]),
    password   : new FormControl(null , [Validators.required , Validators.pattern(/^.{6,}$/)]), //accept any language / any letter
    rePassword : new FormControl(null),
    phone      : new FormControl(null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]) //must be egy user !
  } , this.confirmPassword )
  // custome validator for repassword match
  confirmPassword( g:AbstractControl ){
    if( g.get("password")?.value === g.get("rePassword")?.value ){
      return null ;
    }else{
      return {misMatch:true}
    }
  }

  registerBtn(){
    if(this.registerForm.valid){
      this.loading = true

      this.registerSub = this._AuhService.register(this.registerForm.value).subscribe({
        next:(res)=>{  
          this.loading = false
          this._Router.navigate(["/auth/login"])
         } ,
        error:(error)=>{
           this.resText = error.error.message
           this.loading = false
           } ,
      })
    }
  }

  // on Destroy
  ngOnDestroy(): void {
    this.registerSub?.unsubscribe()
  }

}
