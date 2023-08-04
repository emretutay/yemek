import { Component, OnInit, Input } from '@angular/core';
import { Yemek } from '../yemek-liste/yemek.model';
import { YemekService } from '../yemek.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { UserStoreService } from 'src/app/auth/user-store.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Siparis } from 'src/app/siparis-liste/siparis.model';
import { SiparisService } from 'src/app/siparis-liste/siparis.service';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Kategori } from '../kategori.model';
@Component({
  selector: 'app-yemek-detay',
  templateUrl: './yemek-detay.component.html',
  styleUrls: ['./yemek-detay.component.css']
})
export class YemekDetayComponent implements OnInit {
  public role:string = "";
  yemek : Yemek;
  id: number;
  userId: number ;
  email:string;
  kategori: string;
  constructor(private yemekService: YemekService, private route: ActivatedRoute, private router: Router,private dataStorageService:DataStorageService, private userStore: UserStoreService, private authService : AuthService, private siparisService : SiparisService){



  }
  ngOnInit(){
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.yemek = this.yemekService.getYemek(this.id)
          this.checkKategori();
          
        }
      );
      this.userStore.getEmailFromStore()
            .subscribe(val=>{
                var emailFromToken = this.authService.getEmailFromToken();
                this.email = val || emailFromToken
                
            });
      this.userStore.getRoleFromStore()
            .subscribe(val=>{
                var roleFromToken = this.authService.getRoleFromToken();
                this.role = val || roleFromToken
                
            });
      this.userStore.getIdFromStore()
            .subscribe(val=>{
                var idFromToken = this.authService.getIdFromToken();
                this.userId= val || idFromToken
                
            })
      
  }
  checkKategori(){
    this.dataStorageService.getKategori(this.yemek.kategoriId).subscribe(
      (isim) => {
        this.kategori = isim;
        
      }
    );
  }
  onEditYemek(){
    this.router.navigate(['edit'],{relativeTo: this.route})

  }
  onDeleteYemek(){
    this.dataStorageService.deleteYemek(this.yemek.id);
    this.yemekService.deleteYemek(this.id);
    this.router.navigate(['/yemekler']);
  }

  onSiparisYemek(){
    
    console.log("email : " + this.email);
    this.userId = this.authService.getIdFromToken();
    
    
    const siparis = new Siparis(this.yemek.id,Number(this.userId),"Hazırlanıyor");
    
    this.dataStorageService.addSiparis(siparis)
    .subscribe((siparisler: Siparis[])=> this.siparisService.addSiparisler(siparisler));
  }

}
