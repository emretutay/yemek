import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import { HttpRequest,HttpHandler,HttpEvent,HttpInterceptor, HttpErrorResponse } from "@angular/common/http";
import { Observable, catchError, throwError,switchMap } from "rxjs";
import { NgToastService } from "ng-angular-popup";
import { Router } from "@angular/router";
import { TokenApiModel } from "./token-api.model";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
    constructor(private authService: AuthService, private toast: NgToastService,private router: Router){}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const myToken = this.authService.getToken();

        if(myToken){
            request = request.clone ({
                setHeaders: {Authorization:'Bearer ${myToken}'}
            })
        }

        return next.handle(request).pipe(
            catchError((err:any)=>{
                if(err instanceof HttpErrorResponse){
                    if(err.status === 401){
                        //this.toast.warning({detail:"Warning",summary:"Token is expired,login again"});
                        //this.router.navigate(['auth'])
                    }
                }
                return throwError(()=> new Error("Some other error occured"))
            })
        );
        
    }
    handleUnAuthorizedError(req: HttpRequest<any>, next: HttpHandler){
        let tokeApiModel = new TokenApiModel();
        tokeApiModel.accessToken = this.authService.getToken()!;
        tokeApiModel.refreshToken = this.authService.getRefreshToken()!;
        return this.authService.renewToken(tokeApiModel)
        .pipe(
          switchMap((data:TokenApiModel)=>{
            this.authService.storeRefreshToken(data.refreshToken);
            this.authService.storeToken(data.accessToken);
            req = req.clone({
              setHeaders: {Authorization:`Bearer ${data.accessToken}`}  // "Bearer "+myToken
            })
            return next.handle(req);
          }),
          catchError((err)=>{
            return throwError(()=>{
              this.toast.warning({detail:"Warning", summary:"Token is expired, Please Login again"});
              this.router.navigate(['/auth'])
            })
          })
        )
      }
}