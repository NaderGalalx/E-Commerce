import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsComponent } from './components/products/products.component';
import { Routes } from '@angular/router';
import { AuthComponent } from './layout/auth/auth.component';
import { MainComponent } from './layout/main/main.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { authguardGuard } from './core/guards/authguard.guard';
import { AllordersComponent } from './components/allorders/allorders.component';

export const routes: Routes = [
    { path:"" , redirectTo:"auth" , pathMatch:'full' },
    { path:"auth" , component:AuthComponent , children : [
        { path:"" , redirectTo:"login" , pathMatch:'full', title:"Login" },
        { path:"login" , component:LoginComponent , title:"Login" },
        { path:"register" , loadComponent:()=>import('./components/register/register.component').then( (componentClass)=>componentClass.RegisterComponent ) , title:"Register" }
    ] },
    { path:"main" , component:MainComponent , canActivate:[authguardGuard] , children : [
        {path:"" , redirectTo:"home" , pathMatch:'full', title:"Home"},
        {path:"home" , component:HomeComponent , title:"Home"},
        {path:"brands" , loadComponent:()=>import('./components/brands/brands.component').then((componentClass)=>componentClass.BrandsComponent) , title:"Brands"},
        {path:"cart" , component:CartComponent , title:"Cart"},
        {path:"products" , component:ProductsComponent , title:"Products"},
        {path:"productDetails/:p_id" , component:ProductDetailsComponent , title:"Product Details"},
        {path:"checkout/:cart_id" ,  loadComponent:()=>import('./components/checkout/checkout.component').then((componentClass)=>componentClass.CheckoutComponent) , title:"Check out"},
        {path:"allorders" , component:HomeComponent , title:"Home"},
    ] },
    {path:"**"   , component:NotfoundComponent}

];

