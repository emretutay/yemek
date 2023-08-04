import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { YemekService } from '../yemek.service';
import { Yemek } from '../yemek-liste/yemek.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Kategori } from '../kategori.model';
import { KategoriService } from '../kategori.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-yemek-duzenle',
  templateUrl: './yemek-duzenle.component.html',
  styleUrls: ['./yemek-duzenle.component.css']
})
export class YemekDuzenleComponent implements OnInit,OnDestroy{
  
  id:number;
  kategoriler:Kategori[];
  private subscription : Subscription;
  
  editMode = false;
  yemekForm: FormGroup;
  constructor( private dataStorageService: DataStorageService,private route: ActivatedRoute, private yemekService: YemekService, private router: Router,private kategoriService:KategoriService){

  }
  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) =>{
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          
          this.initForm();

        }
      );
    this.dataStorageService.getKategoriler().
      subscribe(
        (kategoriler: Kategori[]) => {
          this.kategoriService.setKategoriler(kategoriler);
        }
      );
    this.subscription = this.kategoriService.kategorilerChanged
      .subscribe(
        (kategoriler:Kategori[]) => {
          this.kategoriler = kategoriler;
        }
      );
    this.kategoriler = this.kategoriService.getKategoriler(); 
    
  }

  private initForm(){
    
    let yemekIsim = '';
    let yemekResimPath = '';
    let yemekAciklama = '';
    let yemekFiyat = 0;
    let yemekKategoriId = 0;
    if(this.editMode){
      const yemek  = this.yemekService.getYemek(this.id);
     
      yemekIsim = yemek.isim;
      yemekResimPath = yemek.resimPath;
      yemekAciklama = yemek.aciklama;
      yemekFiyat = yemek.fiyat;
      yemekKategoriId = yemek.kategoriId;
    }
    this.yemekForm= new FormGroup({
      
      'isim': new FormControl(yemekIsim,Validators.required),
      'resimPath': new FormControl(yemekResimPath,Validators.required),
      'aciklama': new FormControl(yemekAciklama,Validators.required),
      'fiyat': new FormControl(yemekFiyat,Validators.required),
      'kategori': new FormControl(yemekKategoriId,Validators.required)
    })

  
}
  onSubmit(){
    
    
    
   
    if(this.editMode){
      const newYemek  = this.yemekService.getYemek(this.id);

      var ymk = new Yemek(this.yemekForm.value['isim'],this.yemekForm.value['aciklama'],this.yemekForm.value['resimPath'],this.yemekForm.value['fiyat'],this.yemekForm.value['kategori'].id);
      console.log(ymk);
      ymk.setId(newYemek.id);
      this.yemekService.updateYemek(this.id,ymk);
      this.dataStorageService.updateYemek(ymk);
    }
    else{
      
      var ymk = new Yemek(this.yemekForm.value['isim'],this.yemekForm.value['aciklama'],this.yemekForm.value['resimPath'],this.yemekForm.value['fiyat'],this.yemekForm.value['kategori'].id);
      this.dataStorageService.addYemek(ymk)
      .subscribe((yemek: Yemek)=> this.yemekService.addYemek(yemek));
     

    }
    this.onCancel();

  }
  onCancel(){
    this.router.navigate(['../'],{relativeTo: this.route});

  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}