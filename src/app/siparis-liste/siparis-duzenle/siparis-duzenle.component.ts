import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { SiparisService } from '../siparis.service';
import { Siparis } from '../siparis.model';

import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Router } from '@angular/router';
import { Kategori } from 'src/app/yemekler/kategori.model';
import { KategoriService } from 'src/app/yemekler/kategori.service';
import { Yemek } from 'src/app/yemekler/yemek-liste/yemek.model';
import { UserStoreService } from 'src/app/auth/user-store.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-siparis-duzenle',
  templateUrl: './siparis-duzenle.component.html',
  styleUrls: ['./siparis-duzenle.component.css']
})
export class SiparisDuzenleComponent implements OnInit,OnDestroy {
  @ViewChild('f') slForm:NgForm;
  subscription:Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Siparis = new Siparis(0,0,"");
  kategoriler:Kategori[];
  yemek : Yemek = new Yemek("","","",0,0);
  public role:string = "";
  public email:string = "";
  
  constructor(private sService: SiparisService, private dataStorage : DataStorageService,private router : Router,private userStore:UserStoreService,private authService : AuthService){}
  
  ngOnInit(){
    this.subscription = this.sService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true; 
          this.editedItem = this.sService.getSiparis(index);
          this.checkYemek();
          this.checkEmail();
          
        }
      )
      this.userStore.getRoleFromStore()
      .subscribe(val=>{
          var roleFromToken = this.authService.getRoleFromToken();
          this.role = val || roleFromToken
          
      });

      
      
      
        
    

    
    
      
  }
  checkEmail():void{
    const uid = this.editedItem.userId;
    console.log(uid)
    this.authService.getEmail(uid).subscribe((mail)=>{
        
        this.email = mail;
        
      }
      );
     
  }
  checkYemek(): void {
    this.dataStorage.getYemek(this.editedItem.yemekId).subscribe(
      (yemek:Yemek) => {
        this.yemek = yemek;
        
      }
    );
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  onSaveDurum(form:NgForm){
    const value = form.value;
    const newSiparis = new Siparis(this.editedItem.yemekId,this.editedItem.userId,value.durum);
    newSiparis.setId(this.editedItem.id);
    
    
    if(this.editMode){
      this.sService.UpdateDurum(this.editedItemIndex,newSiparis);
    }
    this.dataStorage.updateSiparis(newSiparis).subscribe
    ((siparisler: Siparis[]) => {
      this.sService.setSiparisler(siparisler);
    })
    this.editMode = false;
    form.reset();
    window.location.reload()
    
    
  }
  onDeleteSiparis(){
    this.slForm.reset();
    this.sService.deleteSiparis(this.editedItemIndex);
    this.slForm.reset();
    this.editMode = false;
    console.log(this.editedItem.id)
    this.dataStorage.deleteSiparis(this.editedItem.id)
    .subscribe((siparisler: Siparis[]) => {
      this.sService.setSiparisler(siparisler);
      
    }
    );

    

  }

}
