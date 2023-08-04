import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { KategoriService } from '../../kategori.service';
import { Subscription } from 'rxjs';
import { Kategori } from '../../kategori.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-yemek-kategori-duzenle',
  templateUrl: './yemek-kategori-duzenle.component.html',
  styleUrls: ['./yemek-kategori-duzenle.component.css']
})
export class YemekKategoriDuzenleComponent implements OnInit,OnDestroy{
  kategori:Kategori;
  selectedCategory: Kategori;
  kategoriler:Kategori[];
  private subscription : Subscription;
  kategoriduzenleForm: FormGroup;
  constructor(private router:Router,private route: ActivatedRoute,private dataStorage : DataStorageService,private kategoriService:KategoriService){}

  ngOnInit(): void {
    this.dataStorage.getKategoriler().
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
    this.initForm();
    
  }
  onSubmit(){
    var kategori = new Kategori(this.kategoriduzenleForm.value['isim']);
    kategori.setId(this.selectedCategory.id);
    this.dataStorage.updateKategori(kategori).subscribe(
      (kategoriler:Kategori[]) => {
        this.kategoriService.setKategoriler(kategoriler)})
    this.kategoriduzenleForm.reset();
    
    this.onCancel();


  }
  onDelete(){
    this.dataStorage.deleteKategori(this.selectedCategory.id).subscribe(
      (kategoriler:Kategori[]) => {
        this.kategoriService.setKategoriler(kategoriler)})
        this.kategoriduzenleForm.reset();
    
        this.onCancel();

  }
  onCancel(){
    this.router.navigate(['../'],{relativeTo: this.route});

  }
  private initForm(){
    
    
    this.kategoriduzenleForm= new FormGroup({
      'kategori': new FormControl("",Validators.required),
      'isim': new FormControl("",Validators.required)
      
    })
  }
  

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
