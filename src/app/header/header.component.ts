import { Component,OnInit,OnDestroy } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { UserStoreService } from "../auth/user-store.service";
import { AppComponent } from "../app.component";


@Component({
    selector:"app-header",
    templateUrl:"./header.component.html"
})

export class HeaderComponent implements OnInit{
    public email:string = "";
    public role:string = "";
    

    constructor(private dataStorageService: DataStorageService,
        private authService: AuthService, private userStore: UserStoreService,private appComponent: AppComponent) {}
    
        ngOnInit() {
            this.userStore.getEmailFromStore()
            .subscribe(val=>{
                var emailFromToken = this.authService.getEmailFromToken();
                this.email = val || emailFromToken
                console.log(this.email)
            })

            this.userStore.getRoleFromStore()
            .subscribe(val=>{
                var roleFromToken = this.authService.getRoleFromToken();
                this.role = val || roleFromToken
                console.log(this.role)
            })
            
        }
    
    
    onSignout(){
        this.authService.signout();
        this.role = "";
        this.email = "";
        this.appComponent.logout();
        
    }
    
    
}