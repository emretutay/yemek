import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenApiModel } from './token-api.model';
import { Observable } from 'rxjs/internal/Observable';
import { HttpHeaders } from '@angular/common/http';

@Injectable({providedIn:'root'})
export class AuthService {
    private userPayload:any;
    userId:string;
    constructor(private http: HttpClient,private router : Router){
        this.userPayload = this.decodedToken();
    }
    
    signup(userObj:any) {
        return this.http.post<any>(
            "https://localhost:7211/api/User/register",
            userObj
        )
    }
    login(userObj:any) {
        return this.http.post<any>(
            "https://localhost:7211/api/User/authenticate",
            userObj
        )
    }
    signout(){
        localStorage.clear();
        this.router.navigate(['/yemekler']);
    }
    storeToken(tokenValue:string){
        localStorage.setItem('token',tokenValue)
    }

    storeRefreshToken(tokenValue:string){
        localStorage.setItem('refreshToken',tokenValue)

    }


    getToken(){
        return localStorage.getItem('token')
    }

    getRefreshToken(){
        return localStorage.getItem('refreshToken')
    }




    isLoggedIn(): boolean{
        return !!localStorage.getItem('token')
    }
    decodedToken(){
        const jwtHelper = new JwtHelperService();
        const token = this.getToken()!;
        console.log(jwtHelper.decodeToken(token))
        return jwtHelper.decodeToken(token)
    }

    getEmailFromToken(){
        if(this.userPayload)
        return this.userPayload.email;
    }
    getRoleFromToken(){
        if(this.userPayload)
        return this.userPayload.role;
    }
    getIdFromToken(){
        if(this.userPayload)
        return this.userPayload.nameid;
    }

    renewToken(tokenApi: TokenApiModel){
        return this.http.post<any>("https://localhost:7211/api/User/refresh",tokenApi)
    }

    setUserId(userId:string){
        this.userId = userId;
    }
    getEmail(id:number):Observable<any>{
        
        const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
        
        return this.http.post("https://localhost:7211/api/User/email",id,{  responseType: 'text'});
    }
    
    //getUserId(email:string):Observable<number>{
        //const headers = { 'content-type': 'application/json'};
       // const body=JSON.stringify(email);
        //console.log("em:" + email)
        //return this.http.post<number>("https://localhost:7211/api/User/ID", body,{'headers':headers})
    //}
}