import { Component,EventEmitter,OnDestroy,OnInit,Output } from '@angular/core';
import { Yemek } from './yemek.model';
import { YemekService } from '../yemek.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { UserStoreService } from 'src/app/auth/user-store.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-yemek-liste',
  templateUrl: './yemek-liste.component.html',
  styleUrls: ['./yemek-liste.component.css']
})
export class YemekListeComponent implements OnInit,OnDestroy {
  
  yemekler:Yemek[];
  subscription : Subscription;
  public role:string = "";
  selectedKategori: number = 0;
  private selectedKategoriSubscription: Subscription;
  constructor(private yemekService : YemekService,private router: Router, private route: ActivatedRoute,private dataStorage: DataStorageService,private userStore:UserStoreService,private authService:AuthService) {

  }

  ngOnInit(){
    this.dataStorage.getAllYemekler().
      subscribe(
        (yemekler: Yemek[]) => {
          this.yemekService.setYemekler(yemekler);
          //this.filterByKategori();
        }
      );
      this.selectedKategoriSubscription = this.yemekService.selectedKategori$.subscribe((kategori) => {
        this.selectedKategori = kategori;
        this.filterByKategori(kategori);
      });
    this.subscription = this.yemekService.yemeklerChanged
      .subscribe(
        (yemekler: Yemek[]) => {
          this.yemekler = yemekler;
          //this.filterByKategori();
        }
      );
    this.yemekler = this.yemekService.getYemekler();
    //this.filterByKategori();
    this.userStore.getRoleFromStore()
      .subscribe(val=>{
          var roleFromToken = this.authService.getRoleFromToken();
          this.role = val || roleFromToken
          console.log(this.role)
      });
  }


  filterByKategori(kategori:number): void {
    
    console.log(kategori + "filter")
    if (kategori >= 0) {
      
      console.log(this.yemekler + "filter")
      this.yemekler = this.yemekService.filterByKategori(kategori);
    } else {
      this.yemekler = this.yemekService.getYemekler();
      
    }
  }

  onNewYemek() {
    this.router.navigate(['new'], {relativeTo: this.route})

  }
  onNewKategori() {
    this.router.navigate(['kategori'], {relativeTo: this.route})

  }
  onFilterYemek(){
    this.router.navigate(['yemek-filtre'],{relativeTo: this.route})
  }

  onUpdateKategori(){
    this.router.navigate(['kategori-update'],{relativeTo: this.route})
  }
  ngOnDestroy(): void {
    if(this.selectedKategoriSubscription)
      this.selectedKategoriSubscription.unsubscribe();
    
  }



}
