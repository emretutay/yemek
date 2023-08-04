import { CanActivate,ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { NgToastService } from "ng-angular-popup";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{
    constructor(private authService: AuthService,private router: Router,private toast: NgToastService){}
    canActivate(): boolean {
        if (this.authService.isLoggedIn()){
            return true
        }
        else{
            this.toast.error({detail:"ERROR",summary:"You have to login"});
            this.router.navigate(['auth'])
            return false;
        }
        
    }
}