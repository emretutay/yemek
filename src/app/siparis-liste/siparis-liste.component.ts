import { Component,OnDestroy,OnInit } from '@angular/core';
import { Siparis } from './siparis.model';
import { SiparisService } from './siparis.service';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { UserStoreService } from '../auth/user-store.service';

@Component({
  selector: 'app-siparis-liste',
  templateUrl: './siparis-liste.component.html',
  styleUrls: ['./siparis-liste.component.css']
})
export class SiparisListeComponent implements OnInit, OnDestroy{
  siparisler: Siparis[];
  private subscription: Subscription;
  email:string;
  userId:number;
  
  constructor(private sService: SiparisService, private dataStorage:DataStorageService,private authService : AuthService,private userStore: UserStoreService){


  }
  ngOnInit(){
    this.userStore.getIdFromStore()
            .subscribe(val=>{
                var idFromToken = this.authService.getIdFromToken();
                this.userId = val || idFromToken
                console.log(this.userId)
            });
    
            
          
    this.dataStorage.getUserSiparisler(this.userId).
      subscribe((siparisler: Siparis[]) => {
        this.sService.setSiparisler(siparisler);
      })
    //this.siparisler = this.sService.getSiparisler();
    this.subscription = this.sService.siparislerChanged.subscribe((siparisler : Siparis[]) =>{
      this.siparisler = siparisler;
    }
    );
  }
  onEditItem(index: number){
    this.sService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    
    
    if(this.siparisler){
      this.siparisler.length = 0;
    }
  }

  



  

}
