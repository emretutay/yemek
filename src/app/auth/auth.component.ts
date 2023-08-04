import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";
import { NgToastService } from "ng-angular-popup";
import { Router } from "@angular/router";
import { UserStoreService } from "./user-store.service";

@Component({
    selector:'app-auth',
    templateUrl:'./auth.component.html'
})
export class AuthComponent {
    isLoginMode = true;
    isLoading = false;
    error:string = null; 
    
    constructor(private authService: AuthService, private toast: NgToastService,private router: Router,private userStore: UserStoreService){}

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }
    onSubmit(form:NgForm){
        if(!form.valid){
            return;
        }
        this.isLoading = true;

        if (this.isLoginMode){
            this.authService.login(form.value).subscribe({
                next:(res=>{
                    
                    this.authService.storeToken(res.accessToken);
                    this.authService.storeRefreshToken(res.refreshToken);
                    const tokenPayload = this.authService.decodedToken();
                    this.userStore.setEmailForStore(tokenPayload.email);
                    this.userStore.setRoleForStore(tokenPayload.role);
                    this.userStore.setIdForStore(tokenPayload.nameid);
                    this.toast.success({detail:"SUCCESS",summary:res.message,duration:5000});
                    this.isLoading = false;
                    this.router.navigate(['/yemekler'])

                }),
                error:(err=>{
                    
                    this.toast.error({detail:"ERROR",summary:err.message,duration:5000});
                    this.error ="An error occurred";
                    this.isLoading = false;
                })
            })

        }
        else{
            let signUpObj = {
                ...form.value,
                role:'',
                token:''
              }
            this.authService.signup(signUpObj).subscribe({
            next:(res=>{
                form.reset();
                alert("Login your registered account")
                this.toast.success({detail:"SUCCESS",summary:res.message,duration:5000});
                this.isLoading = false;
                this.isLoginMode = true;
            }),
            error:(err=>{
                
                this.toast.error({detail:"ERROR",summary:err.message,duration:5000});
                this.error ="An error occurred";
                this.isLoading = false;
            })
        })
        }
        


         
        form.reset();
    }

}