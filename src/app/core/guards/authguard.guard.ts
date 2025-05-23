import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authguardGuard: CanActivateFn = (route, state) => {

  const _Router      = inject(Router);
  const _PLATFORM_ID = inject(PLATFORM_ID);

  if(isPlatformBrowser(_PLATFORM_ID)){

    if( sessionStorage.getItem("token") ){ return true; }
    else{ 
      _Router.navigate(["auth/login"])
      return false;
    }

  }
  else{
    return true ;
  }

};
