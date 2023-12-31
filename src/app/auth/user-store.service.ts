import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
@Injectable({
    providedIn:'root'
})

export class UserStoreService {
    private email$ = new BehaviorSubject<string>("");
    private role$ = new BehaviorSubject<string>("");
    private nameid$ = new BehaviorSubject<string>("");

    constructor(){}

    public getRoleFromStore(){
        return this.role$.asObservable();
    }
    public setRoleForStore(role:string){
        this.role$.next(role);
    }
    public getEmailFromStore(){
        return this.email$.asObservable();
    }
    public setEmailForStore(email:string){
        this.email$.next(email);
    }
    public getIdFromStore(){
        return this.nameid$.asObservable();
    }
    public setIdForStore(nameid:string){
        this.nameid$.next(nameid);
    }
}