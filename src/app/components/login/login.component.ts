import { AuhService } from './../../core/services/auh.service';
import { NgClass } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'node:console';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ReactiveFormsModule , NgClass ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {

  constructor( private _FormBuilder : FormBuilder , private _AuhService:AuhService , private _Router:Router ){}
    
    // variables
    resText!:String
    loading:boolean      = false 
    showPassword:boolean = false 
    loginSub!:Subscription
    
    // form ([formBuilder])
    loginForm:FormGroup = this._FormBuilder.group({
      email    : [null , [Validators.required , Validators.email]],
      password : [null , [Validators.required , Validators.pattern(/^.{6,}$/)]]  // accept any language / any letter
    })


    // methods
    loginBtn(){
      if(this.loginForm.valid){
         this.loading  = true
         this.loginSub = this._AuhService.login(this.loginForm.value).subscribe({
          next:(res)=>{
            this.loading = false
            sessionStorage.setItem("token" , res.token)
            this._Router.navigate(["/main/home"])},
          error:(error)=>{
            this.loading = false
            this.resText = error.error.message},
         })
      }
    }
    forgetPassword(){
      this._AuhService.forgetPass(this.loginForm.value.email).subscribe({
        next:(res)=>{
          console.log(res);
          this.resText = res.message
          
        },
        error:(error)=>{
          console.log(error);
          this.resText = error.message
          
        }
      })
      
    }
    showPass(){
      this.showPassword = !this.showPassword;
    }

    // ONDESTROY
    ngOnDestroy(): void {
      this.loginSub?.unsubscribe()
      
    }
}
